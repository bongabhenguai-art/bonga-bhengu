# Chatbliz OS — Nero-inspired Media Capabilities Integration
Status: design requirements; no Nero commercial software or license integrated.

## Intent
Extend the existing Digital Studio and shared media services in the single Chatbliz OS application. Preserve existing camera, podcast, livestream, editor, authentication, Jarvis, asset library, and publication routes. Do not create a separate app or overwrite the Studio.

## Capability mapping
- Video editing: multitrack timeline, trims, titles, transitions, overlays, captions, audio mixing and render/export jobs.
- Recode: inspect media codecs, transcode, compress, normalize audio, generate thumbnails and web-friendly exports.
- AI photo enhancement: optional image upscaling, denoise and background tools with original preservation and before/after review.
- Media library: user/tenant-owned catalog, metadata, search, tags, deduplication and access controls.
- Backup and recovery: versioned project files, scheduled backups, verified restore tests and retention policy.
- Disc authoring/burning: desktop-only optional capability; do not pretend browser can access optical burners without a supported native bridge.

## Implementation boundaries
- Nero is proprietary commercial software. Do not bundle, reverse-engineer, redistribute or call its internals without a valid license and documented supported integration method.
- Evaluate approved vendor APIs/SDKs if available; otherwise use appropriately licensed alternatives (e.g. FFmpeg for transcoding and OBS/MediaMTX for supported production pipelines).
- Existing Studio stays the front end; media processing is a backend job service with queues, progress, retries, output manifests and download/export links.
- Jarvis voice/chatboard can request 'trim podcast', 'enhance product photo', 'convert for WhatsApp', 'back up studio project'; present estimated cost, get approval for destructive/published actions, run a real job, and return verified output.
- Restrict access by account/tenant, enforce file limits and malware scanning, track storage and processing costs, and respect media ownership and copyright.

## Delivery order
1. Inventory existing Studio, asset storage, recording, editing and media processing routes.
2. Implement a minimal media job schema and verified conversion pipeline using existing services.
3. Connect Studio and Jarvis to jobs; expose status and failure recovery.
4. Add non-destructive timeline edits, library tagging and optional enhancement.
5. Add backup/restore verification, publish/export presets and automated tests.

## Acceptance criteria
A user can upload or record an authorized asset, request a conversion or edit via the existing Studio/chatboard, approve the job, observe persisted progress, receive a playable file and retry safely. Tests cover unsupported codecs, interrupted uploads, corrupt files, cross-tenant access, retries, storage quota and no fake success states.
