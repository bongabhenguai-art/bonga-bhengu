# 03 — AI Employees and Verified Execution

One orchestration layer assigns existing AI employees to tenant-scoped work.

Employee families:
- Business Scraper: evidence-backed business needs/problems and solution matching.
- Hunting/Fishing/Closer/Spy: listings, customer discovery, marketing, conversion and competitor intelligence.
- Coach/Mentor/Problem Resolver/Fixer: diagnosis, guidance and operational recovery.
- Engineer/Workflow/Assistant: development, workflows, calendars and authorized integration.
- Amplifier/Branding/DesignForge/Studio: brand, content, creative media and publishing.
- Money/Sourcing/Research/Storage/Connector: finance, suppliers, research, documents and approved tools.
- Academy/LMS: lessons, quizzes, tutoring, education support.

Execution contract: request -> tenant/session/role checks -> evidence -> plan -> budget/approval -> tool execution -> verified outcome -> ledger -> customer result.
Sensitive actions (financial transactions, publishing, outreach, production changes, account permissions) require explicit authorized approval.
Never substitute AI-generated text for provider-confirmed completion.
Current initial state machine is creative-studio/command_engine.py; not yet wired to authenticated routes or persistence.
