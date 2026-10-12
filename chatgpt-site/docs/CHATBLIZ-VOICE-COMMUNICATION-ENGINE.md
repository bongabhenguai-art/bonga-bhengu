# Chatbliz-9 OS — Voice and Customer Communication Engine
Status: engineering specification, not yet implemented or provider-verified.

## Product goal
A chatboard-first, hands-free business partner. A customer can speak live or send a voice recording; Chatbliz listens, transcribes, interprets, asks minimal clarifying questions, reads back the plan and, with appropriate permissions, arranges meetings, handles WhatsApp and email, schedules callbacks and speaks results aloud. Do not replace the chatboard with a formboard.

## Supported interaction modes
- Push-to-talk voice, voice-note upload and text chat, with explicit recording permission and clear microphone status.
- Speech-to-text with transcript review, language detection/selection and correction before consequential actions.
- Text-to-speech response with mute, playback and accessible text fallback.
- Foreground/background limitations on mobile must be clearly indicated; do not promise always-on listening without platform support.
- Voice recordings require consent, retention limits and deletion controls; never record calls or customer audio covertly.

## Example task
User: 'I'm at the gym. Arrange a meeting with my customer tomorrow at 10, WhatsApp them, email the details and remind me.'
1. Jarvis identifies customer, timezone, intended meeting length and calendar connection.
2. Check the user's calendar for conflicts and confirm contact identity; ask only for missing essentials.
3. Present an audible concise summary and obtain approval for external sends/invitations.
4. Persist an idempotent task with owner/tenant, authorization, scheduled time, recipient, channel and execution state.
5. Create the calendar event and invitation through an authorized calendar connector.
6. Send approved WhatsApp Business message through the official supported provider, respecting opt-in, approved templates and messaging windows.
7. Send approved email through authorized mail connector; schedule callback/reminder through Task Engine.
8. Read back provider-confirmed outcomes and report pending/failed actions accurately. Never mark a message sent based only on a generated draft.

## Required modules
- Voice Session Adapter: microphone/voice-note intake, STT, TTS, transcription review, audio permissions and error recovery.
- Jarvis Command Router: canonical request -> understand -> plan -> authorize -> assign -> execute -> verify -> save -> report contract. Local UI controls stay local.
- Task Engine: durable scheduled jobs, idempotency keys, retry/backoff, cancellation, execution logs and delivery receipts. Queue workers must be hosted in a runtime capable of executing at scheduled times.
- Authority Wizard: OAuth/official provider setup and token refresh, tenant isolation, revocation and clear connection state for calendar, Gmail/email, WhatsApp Business and approved calling provider.
- Customer CRM: contact matching, communication preferences, consent status, conversation history and follow-up schedule.
- Outbound Call Adapter: only where a legitimate telephony provider and permissions exist; otherwise create a human callback task. Never simulate an actual call.
- Notification and Approval Inbox: user approval for sending messages, invitations, calling, and external side effects; log exact content/recipients.

## Acceptance tests
- Voice recording permission denied, transcript correction, noisy audio and language mismatch.
- Calendar conflict, ambiguous customer name, different timezone, offline phone and duplicate spoken request.
- WhatsApp opt-out, template-required window, disconnected account, rate limit, provider failure and real delivery status.
- Email wrong-recipient prevention, draft-versus-send distinction, revoked authorization and duplicate-send protection.
- Callback scheduling, cancel/reschedule, DST/timezone handling, retries and human approval.
- Full account/tenant isolation, secrets redaction, auditability, accessibility and spoken/text status parity.

## Release slices
R1: chatboard voice input/transcription and spoken reply; draft task and approval; calendar availability and event creation when connected.
R2: WhatsApp Business and email outbound, verified receipts, follow-up scheduler.
R3: inbound customer communication summaries, CRM automation, optional consented telephony integration.
No release may claim real sending, calling or scheduling without provider evidence and verified task persistence.
