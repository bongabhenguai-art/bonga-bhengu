# Chatbliz-9 OS — Chatboard-first operations contract
Status: product and engineering requirement; not proof of live deployment.

## Promise
Your business partner in the palm of your hand. Listen to the business owner's problem, understand the situation, propose a solution, request approval where necessary, execute with the authorized AI team, and report verified outcomes.

## Primary interaction
The chatboard is the default front door and primary operating surface. Never replace it with a formboard, separate dashboard, or a sequence of mandatory setup forms. Accept typed or voice requests, show conversational follow-ups and contextual quick actions. Use compact forms only for information that requires structured, secure collection (e.g. payment, regulated details, external authorization).

## Daily AI employee standup
At 04:00 Africa/Johannesburg every day, coordinate a business-operations standup across Jarvis, Mentor, Coach, Adviser, Assistant, Negotiator, Hunting, Fishing, Closer, Fixer, Studio and Website Builder. Review persisted task records, customer requests, approvals, overdue actions, errors and verified results. Produce a concise chatboard summary with today's priorities, assigned owners, blockers and approval requests. Do not invent work completion or claim external actions without evidence. Make scheduled runs idempotent and tenant-isolated. The external reminder automation is not a substitute for an in-app scheduler or task store.

## Canonical execution flow
Conversation -> Understand -> Investigate -> Plan -> Authorize -> Assign -> Execute -> Verify -> Save -> Report -> Follow up.
Persist command ID, tenant ID, actor, status, approval, assigned role, timestamps, input/output references, error and retry state. Provide visible pending/failed/needs-approval statuses. High-impact publishing, payment, refund and negotiation commitments require explicit approval.

## Customer-facing services
My Brand, My Website, My Content, My Business are four capabilities behind one conversation, not four isolated apps. Preserve existing Studio, website builder, routes, identity and Worker services.

## Acceptance tests
1. A customer can describe a business problem in chat and receive a useful diagnosis without completing an onboarding form.
2. Follow-up questions retain context and only ask for missing necessary details.
3. Approval is requested before consequential actions.
4. A task can be resumed after a failed execution without duplicate action.
5. The 04:00 standup summarizes real task records, with tenant isolation and evidence links.
6. Studio and website-builder flows remain reachable from the chatboard and existing routes.
7. A customer can see real results, outstanding actions and failures in the same conversation.
