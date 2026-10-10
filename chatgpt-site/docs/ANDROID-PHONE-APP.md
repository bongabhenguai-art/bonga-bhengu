# Bonga Bhengu phone app

Current entry: `/` opens the Bonga Bhengu storefront. `/phone.html` and the installed app also start there; the existing installed app identity is retained. All four workspaces and device tools open from the storefront. See `UNIFIED-APP-WORKSPACE.md`. The launcher details below record the earlier phone release.

Open `/phone.html` for the phone app home. The 24 module shortcuts use the existing Bonga Bhengu routes, accounts and business engine. The module drawer and bottom navigation appear on small screens and in standalone mode. The designer workspace's full section menu remains available through **Workspace sections**.

Choose **Add app to your phone** to open the browser installation prompt when available. Otherwise the app explains the Android browser menu's **Install app** / **Add to Home screen** options. The manifest launches `/phone.html` in standalone mode and supplies 192 px, 512 px and maskable icons. This release is an installable web app.

`/phone-tools.html` provides device functions:

- Camera photo and video capture use the device's file capture picker.
- Voice notes use microphone permission and MediaRecorder. The engine stops after five minutes, releases microphone tracks, cancels delayed permission requests when leaving, and offers an audio-file alternative when recording is unavailable.
- Media previews and downloads use device-local object URLs. Selected files up to 100 MB can be shared through the system share sheet when the browser supports that file.
- Captures and recordings are held only for the current page session. Download or share them to keep a copy. Uploading to the existing signed-in media library is a separate action.

The Business engine tile opens the existing workflow engine. It does not bypass task review, provider connections or sign-in. Owner console and workroom remain owner-only. The camera joining page and embedded studio keep their existing interfaces. No service worker caches private workspaces or API responses; workspace operations require a connection.

Validation: `node tests/phone-app.mjs` exercises public assets, manifest MIME type and PNG dimensions, every module route and section target, access guards, recorder transitions, delayed permission cancellation, permission denial, duration limits, share capability and nested Jarvis navigation. Existing platform, alignment, brief-persistence and system-engine regression tests also pass. Physical Android installation, camera/microphone hardware, browser visual layout and the OS share sheet still require device verification.
