# Codex and AI Team — Bonga Bhengu OS

## Mission
Implement GitHub issue #13 and docs/studio-upgrade-implementation.md in this EXISTING repository. Preserve the working storefront, seller dashboard, admin dashboard, navigation, checkout, auth, and styling. Do not scaffold a second app or duplicate UI.

## Agent roles
- Codex (lead): inspect architecture and build incremental changes.
- Media engineering: browser camera/microphone, WebRTC, PGM/PVM, Web Audio, recording, FFmpeg and streaming ingest.
- Fixer/testing: reproduce defects and validate actual device/media output.
- Security reviewer: auth, roles, OAuth, stream keys, guest links, permissions, data retention.
- CodeRabbit/review: review PRs and require green tests before merge.

## Working method
1. Inspect existing files and deployment; document real implementation vs mocks.
2. Open a focused PR with the audit and the first functional vertical slice: permission -> camera preview -> audio preview -> record -> download playable media.
3. Test on Android Chrome and desktop; provide commands, screenshots, device support matrix, and failures.
4. Next PRs: scene switching and audio mix, live ingest, guest links, recording library, AI production tools.
5. Never claim an integration works without an actual end-to-end test. Missing keys/services must display actionable setup errors.
6. Do not commit credentials or modify production DNS, payments, or deployment without approval.

## Definition of done
Functional controls, observable states, secure endpoints, responsive UI, automated tests, and documented manual media smoke tests. Reference issue #13 in each PR.
