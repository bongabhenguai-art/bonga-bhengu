# Bonga Bhengu App — File-by-file alignment contract

Primary repository: `bongabhenguai-art/bonga-bhengu`. Preserve existing modules and architecture. Zuxuru is a source of reusable capabilities, not permission to replace the Bonga Bhengu app.

## Source mapping
| Source document | Target | Implementation gate |
|---|---|---|
| Bonga_Bhengu_Fashion_OS.html | existing creative-studio and user-facing fashion experience | Preserve working HTML/brief workflows; separate enquiry from paid entitlement |
| ZUXURU_Master_App_Build_Alignment_Specification.md | business-system intelligence and orchestration | Adapt discovery, connection, execution, measurement without renaming existing Bonga components |
| Zuxuru_Master_Builder.txt | website-builder and business-system | Implement evidence-backed investigation and authenticated customer workflows; no mock results |
| Zuxuru_Shogo_Master_Build_Instructions.md | AI employee and adapter contracts | Each agent needs input, output, runtime, API boundary, storage, authorization and tests |
| Zuxuru_Fukulisane_Alignment_Master_File.md | historical requirements reference | Extract capabilities only; do not change main product identity |

## Existing modules — preserve
- `creative-studio/`: shared creative engine; agency/customer tenant isolation.
- `website-builder/`: add approved builder capabilities without rewriting existing work.
- `subscriptions/`: enforce actual server-side entitlements, not just displayed packages.
- `docker-compose.yml`: extend only after verifying dependencies and resource limits.
- `MODULES.md`: registry distinguishes installed services from candidate integrations.

## Required execution sequence
1. Inventory every existing source file and identify actual runtime behavior.
2. Read each source document completely; record requirement, destination, existing implementation, gap and test.
3. Implement small additive changes on separate branches; avoid replacing or duplicating working modules.
4. Protect admin override, tenant isolation, authentication, secret storage and explicit publishing approval.
5. Run unit/integration/security tests and provide evidence for each completed capability.
6. Open a pull request for CodeRabbit review. Resolve review findings before merge.
7. Never claim a deployment or working integration without verifying it.

## Acceptance
A real customer must be able to enter a business, see evidence-backed discovery, authorize an owned connection, receive recommendations, approve a creative or website action, execute it through a verified connector, and view measured results. Unsupported steps must show truthful unavailable/error states rather than simulated success.
