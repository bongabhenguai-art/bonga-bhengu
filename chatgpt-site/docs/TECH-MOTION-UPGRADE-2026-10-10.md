# Technology and motion update

The single existing app now shares one small animation runtime across its storefront, app shell and admin platform. It uses browser-native Web Animations, IntersectionObserver and requestAnimationFrame, with no new paid service or framework dependency.

Cards and headings reveal as they enter the viewport. Desktop pointer movement adds bounded hover depth. Workspace changes animate the visible stage while retaining the existing forms, frames, camera session and route controller. The storefront adds a decorative gold and blue orbit with a finite entrance animation; there is no continuous background rendering loop.

The Motion on/off control persists the visitor's choice and respects the device's reduced-motion setting. Active animations cancel when motion is disabled or the page becomes hidden. Touch screens skip pointer tilt. Without supported animation APIs, content remains visible and functional. Removed cards are pruned from runtime state.

The integrated build includes the newer website-builder library improvements and the backend reliability update described in BACKEND-UPGRADE-2026-10-10.md. Automated motion verification is in tests/motion.mjs. Physical camera and visual browser checks require an available supported browser-control surface.
