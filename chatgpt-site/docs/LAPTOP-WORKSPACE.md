# Bonga Bhengu laptop workspace

Current entry: `/laptop.html` opens the Bonga Bhengu storefront at `/`. Its four workspaces and full module menu open the existing app. Explicit file, recorder and settings links remain available within the app. See `UNIFIED-APP-WORKSPACE.md`. The standalone launcher behavior below records version 111.

The existing app now has `/laptop.html`, a desktop home alongside `/phone.html`. `/app.html` chooses the laptop home for a viewport of at least 900 pixels with a fine pointer and otherwise opens the phone home. Both workspaces remain explicitly accessible. Existing app-entry links use this responsive entry; the installed phone app's identity and start URL remain intact. In desktop standalone mode, the phone start page opens the laptop home.

## Modules and navigation

The laptop directory reuses the 24 phone module definitions and adds one screen recorder. Device files open the laptop file manager; the camera shortcut opens the existing live Studio camera panel. Business, creative, device/system and owner filters share the same directory. This is an additive interface layer; designer records, D1/R2 storage, workflow review and access rules use the existing backend.

The shared desktop bar is loaded through `phone-shell.js`; it appears above existing pages on laptop-sized devices and is omitted from embedded studio pages. It provides home, business engine, Studio, files and a searchable module switcher. `Ctrl/Command K` opens the switcher; `/` searches modules while outside an editable control; `Alt 1/2/3` opens laptop home, business engine and Studio. Native dialog focus and Escape behavior apply. Pinned and recently opened module locations and compact density preferences are device-local; arbitrary locations from storage are discarded. No business data is copied into these preferences.

## Operational device functions

- File manager: multiple file selection, drag/drop, 20-item / 100 MB per file / 300 MB total limits, duplicate filtering, safe image/audio/video and plain-text previews, download, share-sheet capability checks and removable session entries. Removing an entry or clearing the list does not delete the original. Text is rendered as text, not HTML. Preview URLs are released on removal, clearing and page exit; browser back/forward restoration recreates them.
- Screen recorder: browser screen/tab/window picker, optional shared audio or microphone narration, pause/resume, stop, preview, download and sharing. It records video locally with MediaRecorder and stops after 15 minutes wall time or approximately 100 MB. Audio is limited to what the browser makes available. It does not stop when a shared tab is hidden; page exit disposes the capture. Ending screen sharing, delayed permission cancellation, microphone denial and recorder failures release capture tracks. No capture is uploaded automatically.
- Display: full-screen mode when available and compact module cards. Browser install support uses the existing app manifest and adds a laptop shortcut. Browsers without an install prompt show installation/bookmark guidance.
- Existing engines: business workflow, Studio, AI roles, media upload and owner tools retain their existing routes and sign-in. New launchers do not activate unconnected providers or bypass workflow review.

## Verification

`node tests/laptop-app.mjs` checks the built Worker routes, every module target, uniqueness, authentication gates, preference corruption/storage failure, real file-list limits/URL ownership, recording output, pause/resume, cancellation, screen-ending during a microphone request, permission denial, size/time limits and disposal. Existing phone, platform, business-engine and storefront checks cover regressions.

Browser visual QA, laptop hardware, operating-system share sheets and installation require device verification. The managed browser skill is unavailable in this environment. No new CodeRabbit review is claimed; local CodeRabbit authentication remains unavailable, as recorded in the existing verification document.
