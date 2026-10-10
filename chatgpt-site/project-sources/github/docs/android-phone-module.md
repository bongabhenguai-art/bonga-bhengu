# Android Phone Integration Modules

Scope: extend the existing Bonga Bhengu App Creative Studio and Zuxuru builder; do not replace the platform.

## Recommended open-source components

- **Expo** — https://github.com/expo/expo — React Native Android client and device APIs.
- **react-native-vision-camera** — https://github.com/mrousavy/react-native-vision-camera — camera preview/capture within an authorized native client.
- **WebRTC** — https://github.com/webrtc-sdk/webrtc — real-time media transport reference implementation; choose an actively maintained Android/React Native binding after compatibility review.
- **scrcpy** — https://github.com/Genymobile/scrcpy — optional authorized Android screen mirroring from a desktop, not an embedded mobile SDK.
- **AndroidX Camera** — https://developer.android.com/media/camera/camerax — native Android CameraX integration (Android Jetpack, not a standalone drop-in application).

## Studio phone camera workflow

1. Pair a phone to the tenant's studio session using a short-lived authenticated pairing code.
2. Obtain explicit Android camera/microphone permission; show active capture status and a Stop button.
3. Capture video/audio locally, negotiate WebRTC over authenticated signaling and use STUN/TURN where required.
4. Display the incoming phone camera as a selectable source in the existing Studio preview/program interface.
5. Allow switch, mute, disconnect and reconnect without resetting the Studio workspace.
6. Apply tenant access controls, encrypted transport, short-lived credentials and server-side resource limits.
7. Test on real Android hardware, including network changes, permissions denial and backgrounding.

## Builder workflow

Expo projects can be created as tenant-owned outputs and built with authorized Android toolchains. Do not imply APK generation works until a real Android build succeeds.

## Delivery gates

- Audit current Studio framework, signaling, auth and media stack.
- Check upstream license and Android version compatibility.
- Implement pairing and a minimal camera adapter behind a feature flag.
- Add integration tests and a real-phone acceptance test.
- Obtain explicit deployment approval.

**Status:** dependency selection and implementation plan only; no packages installed or camera connection claimed.
