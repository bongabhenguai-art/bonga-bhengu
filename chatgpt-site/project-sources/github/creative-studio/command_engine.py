"""Pure command planning and execution state contracts for the shared Bonga Bhengu backend.

No network calls, credentials, tenant authentication bypass, or live actions.
Wire into authenticated routes only after the existing identity service is connected.
"""
from dataclasses import dataclass, field
from enum import Enum
from typing import Optional
from uuid import uuid4
from datetime import datetime, timezone


class ExecutionStatus(str, Enum):
    DRAFT = "draft"
    AWAITING_APPROVAL = "awaiting_approval"
    APPROVED = "approved"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"


SENSITIVE_INTENTS = frozenset({
    "publish_campaign", "send_outreach", "issue_refund",
    "transfer_funds", "deploy_production", "change_account_permissions",
    "modify_business_profile", "place_order",
})

INTENT_EMPLOYEES = {
    "diagnose_business": ("business_scraper", "business_coach", "problem_resolver"),
    "build_website": ("engineer", "branding", "fixer"),
    "create_campaign": ("marketing", "branding", "amplifier"),
    "prepare_quote": ("closer", "money"),
    "investigate_orders": ("workflow", "problem_resolver"),
    "explain_finances": ("money", "business_coach"),
}


@dataclass
class Command:
    tenant_id: str
    requested_by: str
    intent: str
    instruction: str
    idempotency_key: str
    id: str = field(default_factory=lambda: str(uuid4()))
    status: ExecutionStatus = ExecutionStatus.DRAFT
    approved_by: Optional[str] = None
    result: Optional[str] = None
    events: list = field(default_factory=list)

    def __post_init__(self):
        if not all((self.tenant_id, self.requested_by, self.intent,
                    self.instruction.strip(), self.idempotency_key)):
            raise ValueError("Tenant, actor, intent, instruction and idempotency key are required")
        self.record("created")

    @property
    def employees(self):
        return INTENT_EMPLOYEES.get(self.intent, ("business_coach",))

    @property
    def requires_approval(self):
        return self.intent in SENSITIVE_INTENTS

    def record(self, event):
        self.events.append({
            "at": datetime.now(timezone.utc).isoformat(),
            "event": event, "status": self.status.value,
        })

    def prepare(self):
        if self.status != ExecutionStatus.DRAFT:
            raise ValueError("Only draft commands can be prepared")
        self.status = (ExecutionStatus.AWAITING_APPROVAL
                       if self.requires_approval else ExecutionStatus.APPROVED)
        self.record("prepared")

    def approve(self, actor, *, authorized=False):
        if self.status != ExecutionStatus.AWAITING_APPROVAL:
            raise ValueError("Command is not awaiting approval")
        if not actor or not authorized:
            raise PermissionError("Approval requires a verified authorized actor")
        self.approved_by = actor
        self.status = ExecutionStatus.APPROVED
        self.record("approved")

    def start(self, *, authenticated=False, tenant_authorized=False):
        if self.status != ExecutionStatus.APPROVED:
            raise ValueError("Command must be approved before execution")
        if not authenticated or not tenant_authorized:
            raise PermissionError("Verified tenant authorization is required")
        self.status = ExecutionStatus.RUNNING
        self.record("started")

    def finish(self, result, *, verified=False):
        if self.status != ExecutionStatus.RUNNING:
            raise ValueError("Command is not running")
        if not verified:
            raise ValueError("Verified execution evidence is required")
        self.result = result
        self.status = ExecutionStatus.COMPLETED
        self.record("completed")

    def fail(self, reason):
        if self.status not in (ExecutionStatus.RUNNING, ExecutionStatus.APPROVED):
            raise ValueError("Command cannot fail from current state")
        self.result = reason
        self.status = ExecutionStatus.FAILED
        self.record("failed")
