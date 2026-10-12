# Chatbliz-9 OS — Evidence-Based Business Solution Engine
Status: engineering specification, not implemented or deployed.

## Promise
Listen to the business owner, understand their real need, research credible evidence and comparable case studies, recommend feasible solutions, ask approval before execution, and measure actual results. The primary UI is the existing conversational chatboard, with voice as an adapter—not a formboard or separate application.

## Canonical workflow
Listen -> Clarify -> Diagnose -> Research -> Evaluate evidence -> Compare options -> Recommend -> Approve -> Assign -> Execute -> Verify -> Measure -> Learn.

## Problem intake
Extract customer goal, symptoms, business context, market/location, audience, budget, constraints, urgency and desired measurable outcome from natural speech or text. Reuse authorized existing context; ask only for material gaps. Preserve the owner's words and allow correction. Never claim a diagnosis is proven without evidence.

## Research and evidence contract
- Researcher Agent retrieves dated, traceable primary sources, official data, relevant academic studies and documented business case studies; secondary sources are explicitly identified.
- Every material external factual claim stores source title, URL or document reference, publisher, publication/observation date, access date, quoted passage or verifiable data location, and confidence/limitations.
- Case study records include company/sector, location, starting problem, intervention, timeframe, measured outcome, baseline, study method, attribution caveats and transferability to this customer's circumstances.
- Distinguish facts, estimates, hypotheses, promotional claims and AI-generated ideas. Do not fabricate research, citations, ROI, customer counts or guaranteed outcomes.
- Present competing explanations, contrary evidence and uncertainty; check whether evidence is current and relevant to the user's market.
- Never send private business records to unapproved research tools. Require account permissions and tenant isolation.

## Solution decision record
Each proposed option contains diagnosis addressed, supporting and opposing evidence, likely benefits, estimated cost/resources, risks, prerequisites, timeframe, measurable KPIs, baseline, recommended first experiment, and confidence. Rank by feasibility and user goals, not by unsupported certainty. Clearly mark unverified estimates.

## Jarvis coordination
Mentor and Coach clarify business goals; Adviser and Researcher evaluate evidence; Spy/Hunting agents research competition and demand with lawful methods; Strategy, Branding, Website, Content and Sales employees prepare actionable options; Negotiator and Closer act only within explicit authority; Fixer checks failed workflows. Jarvis orchestrates through the canonical task interface with durable states and approval gates.

## Execution and feedback
Create approved tasks in the existing Task Engine, not separate agent task stores. Record task owner, tenant, evidence references, planned actions, approval, execution events, real provider receipts, measured KPI baseline and follow-up. Distinguish drafts from sent/published/completed work. Compare actual outcomes to forecasts and revise the recommendation; do not infer causation from correlation.

## Chatboard answer contract
Return: (1) what I understood, (2) likely causes and confidence, (3) evidence and case studies with clickable citations, (4) two or three feasible solutions with cost/risk trade-offs, (5) the recommended first action and why, (6) the precise approval needed, (7) how results will be measured. Speak a concise summary in voice mode and keep source links in the chat transcript.

## Verification gates
Test ambiguous and misleading user claims; fabricated/expired sources; conflicting case studies; no applicable studies; private data access denied; low-budget contexts; changing business goals; missing integration credentials; unauthorized external actions; duplicate tasks; measurement gaps; and attribution uncertainty. A recommendation without verifiable sources must explicitly say evidence is insufficient.

## Initial implementation sequence
1. Add typed problem, evidence, case-study and recommendation contracts plus validators and unit tests.
2. Connect authorized research retrieval with citation persistence and source freshness checks.
3. Expose a chat-first diagnostic/recommendation flow through existing Jarvis; preserve existing Studio, builder and service routes.
4. Add approval, task persistence and measured-outcome review, then run full regression and real provider tests.
