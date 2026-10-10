# Android mobile app compatibility (additive)

This directory provides **mobile web/PWA groundwork**, not an Android APK and not a live deployment.

## Integration into original site
1. Back up original editable Bonga Bhengu Sites project and inspect its real HTML/layout.
2. Copy `android-responsive.css` into the site's public assets and load it **after** existing CSS, without replacing any existing styles. Check selectors against actual original components.
3. Copy `manifest.webmanifest` to the same-origin public root and add `<link rel="manifest" href="/manifest.webmanifest">` in the original site's head. Use `<meta name="theme-color" content="#050507">`.
4. Provide real same-origin PNG icons at 192x192 and 512x512 and add their paths to the manifest before expecting install prompts. No placeholder icons are declared here.
5. Serve over HTTPS; test on Chrome for Android at 360px, 393px, 412px and tablet widths. Verify keyboard, touch targets, tabs, forms, scrolling and Android back behavior.
6. PWA installability and offline capability require additional platform checks. No service worker is shipped, to avoid caching private tenant data or stale account state.
7. For a native APK/AAB later, wrap the **verified, deployed** app with Trusted Web Activity or Capacitor, after auth, deep links, camera/mic permissions and Play Store policies are checked.

## Boundaries
The source in `project-sources/originals/Bonga_Bhengu_Fashion_OS.html` is preserved unchanged. This is an integration asset only; GitHub files do not automatically alter the original ChatGPT Sites project.
