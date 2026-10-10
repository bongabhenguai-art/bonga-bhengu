# Archival Photo to Fashion Show — Existing Studio Extension

Extend the existing Bonga Bhengu App Fukulisane Studio/Fashion Design workflow only. Do not create another application.

## Modes
1. Preservation: analyze an old image, restore degradation, preserve the original model, garment silhouette, colour, pattern, accessories and branding, then animate a runway sequence.
2. Recreation: analyze the original, optionally reconstruct missing details, and render a contemporary runway interpretation clearly labelled as AI recreation.

## Image analysis before animation
- Validate ownership/permission and likeness rights; accept scanned or digital vintage photos.
- Detect model, garment, accessories and background; identify visible construction features, fabric patterns, colour and silhouette.
- Capture reference crops/masks and structured visual descriptions; record uncertainty for obscured features rather than inventing them as historical facts.
- Offer original/restored/segmented previews and an explicit choice of preserve versus reinterpret.
- Produce a consistent character/outfit reference pack and scene storyboard.

## Candidate open-source adapters (verify licences, model weights and resource requirements)
- CodeFormer: https://github.com/sczhou/CodeFormer
- Real-ESRGAN: https://github.com/xinntao/Real-ESRGAN
- Segment Anything: https://github.com/facebookresearch/segment-anything
- Grounding DINO: https://github.com/IDEA-Research/GroundingDINO
- Wan 2.2: https://github.com/Wan-Video/Wan2.2
- FFmpeg: https://github.com/FFmpeg/FFmpeg

## Workflow
Upload -> analyze -> show preservation confidence and garment reference -> optional restore -> storyboard -> generate short clips -> compare against original -> selective regenerate -> join clips -> export MP4. Store original immutably; edits and outputs are versioned. Preserve tenant isolation, queued render jobs, resumability and existing Studio modules.

## Acceptance criteria
A single old photograph can produce a real short runway clip through configured providers. Original and restored images remain retrievable. User can compare garment colours/patterns and model identity with generated frames. Missing historical details are labelled inferred. Video output is validated before success. Long-form shows can assemble multiple clips subject to compute limits. Do not claim implementation is live until end-to-end tests and deployment succeed.
