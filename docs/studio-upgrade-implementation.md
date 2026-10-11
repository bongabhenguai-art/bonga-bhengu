# Bonga Bhengu OS — Digital Studio Upgrade

This is an additive integration specification for the existing Bonga Bhengu OS. Do not replace the storefront, seller dashboard, admin dashboard, authentication, checkout, or existing studio.

## Routes and products
- Expose Studio as a product on the existing storefront, with live demo and plan checkout through the existing billing system.
- Authorized customers open /studio (or the existing studio route); verify subscription and roles server-side.
- Preserve existing black #0B0B0B, gold #D4AF37, action blue #2F6BFF design tokens.

## Studio production interface
- PVM (preview) and PGM (program) monitors with explicit TAKE and CUT actions.
- Device wizard enumerates cameras/microphones only after permission. Allow USB cameras and Android/laptop cameras when browser/OS supports them.
- Scenes: podcast two-person, single presenter, classroom, fashion runway, product showcase, screen share, interview, and branded ad.
- Scene switching updates the program output, not just labels. Scene layouts support crop, position, fit, and branding overlays.
- Audio mixer with per-source gain, mute, peak meters, and clipping warnings.
- Record locally via MediaRecorder when supported; save through an explicit download action, or upload to authorized storage with progress and retry.
- Livestream requires a verified RTMP/SRT/WebRTC ingest backend, stream key stored server-side, connectivity checks, and actual start/stop status.
- Guest join uses expiring tokens and WebRTC with TURN; never expose private room credentials.
- Captions, AI script assistance, translation, background removal, and editing must show availability and only run with configured processing services.
- Post/share to authorized platform accounts; WhatsApp share is not equivalent to direct livestream broadcasting.

## Suggested architecture
Browser UI -> authenticated studio API -> scene/compositor service -> FFmpeg/OBS-compatible media pipeline -> MediaMTX or SRS ingest -> destinations.
WebRTC signaling + STUN/TURN for remote guests; Redis for ephemeral sessions; Postgres for recordings and production metadata; object storage for media.
Keep credentials encrypted and server-side. Do not clone proprietary platform interfaces or bypass official OAuth/API rules.

## Functional acceptance criteria
1. Device permissions granted: real camera and mic preview starts; denial shows actionable error.
2. TAKE switches PVM into PGM, with live frame output.
3. Record produces a playable media file with audio and video; Stop ends capture.
4. Audio mute/gain affects recorded/streamed audio.
5. Each configured destination passes connection verification before GO LIVE.
6. GO LIVE emits media and returns ingest health; STOP LIVE terminates stream.
7. Guest can join with expiring link and be placed in a scene.
8. Saved recording appears in library and can be exported.
9. Product purchase grants studio access through existing entitlements.
10. Android narrow viewport and laptop viewport have no overlaps, duplicate navigation, or forced zoom.
11. Unsupported hardware, missing permissions, unavailable backend and disconnected platforms never display fake success.
12. Automated browser/device tests and backend integration tests run in CI.

## Delivery sequence
P0: Audit existing studio routes and media services; preserve working code; fix broken controls.
P1: Real device wizard, PVM/PGM, local recording, audio controls, responsive UI.
P2: Remote guests, streaming ingest, recording library and export.
P3: AI director, backgrounds, subtitles, social scheduling, analytics and subscription integration.

Status: specification only; implementation, CI verification and deployment must be performed against the actual app source.
