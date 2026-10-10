# Podcast App for Bonga Bhengu OS

Create a podcast experience inside the existing Bonga Bhengu OS at `bongabhenguos.online`, preserving the unified **Mall / Seller / Admin** interfaces and the upgraded Fukulisane Broadcast Studio.

## Product outcome

Creators record or upload audio, prepare an episode, review it, and publish it to a listener-facing show page. Listeners can browse and play published episodes. Admin retains owner-only controls. Keep drafts and recording files private until the creator explicitly publishes them.

## Acceptance criteria

- [ ] Reuse the existing Studio audio mode, microphone checks, pause/stop controls, private R2 media, creative jobs and D1 ownership checks.
- [ ] Seller: show and episode drafts with title, description, cover, audio source, duration and preview player; restore saved work without remounting an active recording.
- [ ] Mall: responsive show page and episode list with accessible play/pause, seeking, time, loading and failure states; only published episodes are visible.
- [ ] Admin: owner-only review, publication status and service health. Use measured data and explicit unavailable states.
- [ ] Support a validated RSS feed and public audio enclosure for published episodes. Validate MP3/AAC compatibility and byte-range serving; retain unsupported browser recording formats privately and provide a clear conversion/upload path.
- [ ] Publishing changes require an explicit creator action. Episode titles, descriptions and notes must be escaped safely. Private draft/media URLs must never appear in the public feed.
- [ ] Add a focused PostHog event plan for episode creation, recording completion, publication and listener playback; resolve the correct project and privacy settings before sending events. Exclude audio, notes, secrets and personal microphone content from analytics.
- [ ] Match the selected Studio reference for creator controls; Product Design must resolve a visual target for any new listener layout and pass browser design QA on desktop and phone.
- [ ] Test permissions, recording cancellation, save/retry, cross-user access, public/draft isolation, audio ranges, feed validation and navigation persistence. Run existing application checks as well.
- [ ] Prepare a feature branch and PR with a concise problem/behavior description, relevant tests and screenshots; complete code review and CI. Follow PR Completion's exact-head landing confirmation before merging.

## Selected plugins and work

| Plugin | Task scope |
| --- | --- |
| Product Design | Reference-based creator UI, listener visual selection, accessible controls and browser design QA. |
| Agent Reach | Use available native research tools for official podcast distribution requirements and public sources; cite primary sources. |
| PostHog | Resolve the Bonga Bhengu OS project, integration and event taxonomy; verify actual events before building a funnel. Current connection cannot read project skills without the `llm_skill:read` scope and needs reconnection. |
| Code Review | Run the connected CodeRabbit workflow before accepting the PR; CLI/authentication are prerequisites. No CodeRabbit review has been run for this task. |
| PR Completion | Commit on a feature branch, push, create/reuse the PR, monitor checks/reviews and repair failures. Request per-PR landing confirmation at verified readiness. |
| LinkedIn | Prepare a professional show/episode launch draft and, when requested, research public guest profiles using the connected search capability. Publishing/messages require separate explicit instructions. |
| AI Fashion Designer | Optional fashion-show editorial assets for episodes about design; use available garment/editorial tools only where they fit the episode brief, preserving the supplied Studio branding. |
| Voice Notify for Codex | Optional local completion/attention alerts on a supported macOS or Windows Codex installation. Linux Work Mode cannot perform the bundled setup. |
| Founder Pulse | Use GitHub issues, PR links and verified remote status to report delivery and open backlog; default reporting window is 30 days when requested. |

## Grounding and dependencies

Existing implementation: `chatgpt-site/dist/digital-studio.js`, `chatgpt-site/dist/studio-console.js`, `chatgpt-site/worker/digital-studio.mjs`, Studio jobs/media modules, and current D1/R2 authentication. Preserve the existing architecture instead of creating a disconnected replacement app.

Official distribution sources verified during task preparation:

- [Apple RSS feed requirements](https://podcasters.apple.com/support/823-podcast-requirements)
- [Apple audio requirements](https://podcasters.apple.com/support/893-audio-requirements): RSS distribution accepts MP3 or AAC, so browser WebM/Opus recording is not automatically distribution-ready.
- [Apple podcast validation](https://podcasters.apple.com/support/829-validate-your-podcast): validate enclosure hosting and byte-range support before submission.

Custom domain DNS/TLS validation is pending. Keep the existing published origin available during activation. External podcast-platform submission, paid services and automatic LinkedIn posting are outside task-creation authorization.

This is a durable implementation task. It is not a claim that a remote Codex worker has started; the Codex Tasks app is unavailable in this session.
