# Chatbliz OS — Open-source multimedia repository evaluation
Status: candidate repositories; integration not implemented or deployed.

## Candidate upstream repositories
- FFmpeg — https://github.com/FFmpeg/FFmpeg — codec processing, transcoding, rendering; review LGPL/GPL build and codec patent implications.
- MLT Framework — https://github.com/mltframework/mlt — media editing and timeline processing; review license and embedding approach.
- Kdenlive — https://invent.kde.org/multimedia/kdenlive — desktop timeline editor; reference workflow or supported interop, not direct browser drop-in.
- OBS Studio — https://github.com/obsproject/obs-studio — production and recording; use supported interfaces and check distribution licenses.
- MediaMTX — https://github.com/bluenviron/mediamtx — streaming relay/server; secure ingest and publish.
- Real-ESRGAN — https://github.com/xinntao/Real-ESRGAN — image enhancement; model weights and runtime dependencies require separate review.
- Restic — https://github.com/restic/restic — encrypted backups with restore verification.

## Non-negotiable implementation rules
Integrate as capabilities of the existing Chatbliz Digital Studio in bongabhenguai-art/bonga-bhengu. No parallel app, no replacing existing routes, no unlicensed Nero commercial code. Check upstream license and versions before vendoring or distributing any code. Do not claim candidate repos are installed. Prefer APIs/process isolation for desktop-oriented tools. Audit tenant separation, file permissions, CPU/RAM usage, render queues, storage costs, backups, output validation and cancellation. Build smallest tested FFmpeg media conversion pipeline first and expose its actual job status in the chatboard.
