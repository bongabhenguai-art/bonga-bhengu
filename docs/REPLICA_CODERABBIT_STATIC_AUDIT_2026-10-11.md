# Replica AI + CodeRabbit — source audit, 2026-10-11

## Scope and evidence
Inspected GitHub default-branch source under `chatgpt-site/`, `chatgpt-site/worker/`, `agents/replica-ai-audit/`, and committed subscription and Fishing AI specifications. This is a partial static audit; no full build, runtime tests, production browser verification or CodeRabbit execution was performed.

## Findings
### BB-AUD-001 — Worker import target not present (HIGH; verify first)
`chatgpt-site/worker/index.mjs` imports `./podcasts.mjs`; directory listing of `chatgpt-site/worker/` does not include `podcasts.mjs`. Verify whether a generation step supplies it, whether the import is stale, or whether a missing file must be restored. Do not delete the podcast feature. Acceptance: Worker bundle builds and podcast routes work.

### BB-AUD-002 — Subscription catalog not yet wired (HIGH)
`chatgpt-site/worker/subscription-catalog.mjs` defines plan pricing and restrictions; static inspection of the beginning of `worker/index.mjs` does not show it imported. Trace full entrypoint and runtime consumers, integrate verified subscription enforcement and usage ledger. Acceptance: unauthorized requests are rejected server-side and allowances update atomically.

### BB-AUD-003 — Payments not connected (BLOCKER for live sales)
`chatgpt-site/worker/payment-connections.mjs` reports all payment providers unconnected and livePaymentsEnabled=false. No paid state should be activated until verified webhook processing and credentials are configured. Acceptance: sandbox lifecycle tests, signature and replay protection, production approval.

### BB-AUD-004 — Replica AI runtime not demonstrated (MEDIUM)
`agents/replica-ai-audit/README.md` explicitly identifies runtime wiring, scheduling, UI and CI as separate work. Do not label Replica active solely because documentation exists. Acceptance: an actual audit run produces evidence and reproducible findings.

### BB-AUD-005 — CodeRabbit execution unverified (MEDIUM)
No authorized CodeRabbit action was available in this session. Check installation and GitHub PR review automation before claiming review. Acceptance: review comments and resolved findings on an actual PR.

## Recommended work order
1. Resolve import/build integrity and run Node 24 `npm ci`, `npm run build`, all test suites.
2. Implement server-side subscription wallet and verified checkout without a second application.
3. Wire Fishing AI to lawful sources and CRM handoff.
4. Fix Android overflow, duplicated homepage layers, brand palette.
5. Run Replica evidence audit and CodeRabbit PR review, then validate deployment.

## Status
Findings are source-level; production behavior remains unverified. No live deployment or external agent execution has been performed.
