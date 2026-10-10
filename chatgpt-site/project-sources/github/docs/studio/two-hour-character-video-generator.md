# Fukulisane Studio — Long-form AI Character Video Generator

## Integration boundary
Extend the existing Bonga Bhengu App Studio module. Do not create a new app, replace existing routes, or disconnect existing services. This document is an implementation specification, not a claim that rendering is operational.

## Product requirements
- Generate a complete video of up to 120 minutes from a script, storyboard, character assets, dialogue, reference images and selected style.
- Support reusable character profiles with consistent identity, wardrobe, voice, language and scene continuity; multiple characters and dialogue.
- Text-to-video, image-to-video, character animation, voice generation, lip synchronization, subtitles, background audio and music with appropriate rights.
- Timeline editing, per-scene regeneration, preview, pause/resume/cancel, progress reporting and MP4 export.
- Save projects and assets under the authenticated tenant; enforce quotas, permissions and consent for voice/likeness cloning.

## Architecture
1. Studio UI: project wizard, character library, storyboard, timeline, rendering queue, preview, exports.
2. API: validate job, authorize tenant, persist project, scenes, assets, status and provider configuration.
3. Storyboard planner: split 120 minutes into bounded scenes and shots; preserve continuity via character reference packs and scene metadata.
4. Provider adapters: approved video generation, speech, lip-sync and audio services; never assume a model supports two hours in one inference.
5. Durable workers: queue bounded jobs, retries with idempotency keys, checkpoint/resume, cancellation, cost estimates and provider rate limiting.
6. Assembly: normalize frame rate, aspect ratio, audio and captions; use FFmpeg to concatenate segments and mix soundtrack, then quality-check duration and output.
7. Storage: persist generated segments, manifests, previews and final renders in configured tenant storage with retention and signed access.
8. Publishing: user-approved export/share/publish through existing Studio connectors.

## Acceptance tests
- Authenticated user can create a project targeting 120 minutes and add two distinct persistent characters.
- Scene plan totals requested duration; interrupted generation resumes without duplicating completed segments.
- Failed scene can be regenerated without destroying unrelated scenes.
- Final export has verified audio/video sync, playable MP4, expected duration and accessible captions.
- User sees honest progress, cost/compute constraints and failure messages; no fake success or placeholder generation.
- Existing Studio recording, podcast, livestream and other app modules remain functional.

## Delivery sequence
First inspect existing Studio routes, persistence, job infrastructure, providers and test conventions. Implement behind a feature flag, wire real configured providers, test the pipeline end-to-end, review and deploy only after verification. Long-form rendering requires compute, storage and provider capacity and is not enabled by this specification alone.
