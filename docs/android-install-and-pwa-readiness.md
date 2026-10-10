# Android installation for the existing Bonga Bhengu App

Live URL: https://bonga-bhenguai.donlegendwear.chatgpt.site/

## Install now
Open the live URL in Chrome on Android > menu (three dots) > Install app if offered, otherwise Add to Home screen > confirm. If opened in ChatGPT, first open the link in Chrome.

## Engineering requirements for native-feeling PWA installation
This is a checklist for the existing ChatGPT-site deployment, not a claim that it has been deployed.
- Inspect the actual site entrypoint and deployment source; do not create a second app.
- Serve a valid same-origin web app manifest linked from the HTML head, with app name, short_name, start_url, scope, display standalone, theme_color #0B0B0B and background_color #0B0B0B.
- Provide real 192x192 and 512x512 PNG icons, including a maskable icon; do not fabricate brand assets.
- Serve the app over HTTPS, ensure manifest and icons return 200 and match deployment origin.
- If offline features are needed, add a carefully scoped service worker that does not cache private CRM, payment, authentication or customer data.
- Verify Chrome installation prompt and home-screen launch on Android, plus update behavior.
- Keep notifications opt-in; site sound permission is not proof of push notification readiness.
- Test authentication, tenant isolation, payment return URLs and sales team dashboards in installed display mode.
- Publish through the existing ChatGPT-site deployment pipeline. GitHub pushes to the source mirror alone do not publish the live site.

## Activation gate
Installing the app does not start Jarvis or sales employees. Enable only after health checks, verified provider connections, consent and approvals, budget cap and kill switch. Never claim runtime activation based solely on an install shortcut.
