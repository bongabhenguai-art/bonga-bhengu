/* Smart Android runtime: progressive enhancement without setup dialogs.
 * Sensitive permissions are NEVER requested automatically. Camera/mic/location
 * must be triggered by a user's explicit action and browser consent.
 */
import { detectAndroidCapabilities, requestCamera, stopMedia, shareLink, chooseFiles, requestLocation } from "./android-capabilities.js";

const FEATURES = Object.freeze({
  studio: ["camera", "microphone", "filePicker", "share"],
  website: ["filePicker", "share"],
  visibility: ["location", "share"],
  banner: ["filePicker", "share"],
});
export function getSmartPhoneMode(env = globalThis) {
  const caps = detectAndroidCapabilities(env);
  const width = env.innerWidth || 1024;
  return {
    device: caps.android ? "android" : width < 768 ? "mobile" : "desktop",
    compact: width < 768,
    capabilities: caps,
    modules: Object.fromEntries(Object.entries(FEATURES).map(([name, needs]) =>
      [name, Object.fromEntries(needs.map(key => [key, Boolean(caps[key])]))])),
  };
}
export function applySmartPhoneMode(root = document.documentElement) {
  const mode = getSmartPhoneMode();
  root.dataset.deviceMode = mode.device;
  root.dataset.layoutMode = mode.compact ? "compact" : "wide";
  root.style.setProperty("--phone-safe-top", "env(safe-area-inset-top, 0px)");
  root.style.setProperty("--phone-safe-bottom", "env(safe-area-inset-bottom, 0px)");
  return mode;
}
export function initSmartPhoneMode() {
  applySmartPhoneMode();
  const update = () => applySmartPhoneMode();
  globalThis.addEventListener?.("resize", update, { passive: true });
  globalThis.addEventListener?.("orientationchange", update, { passive: true });
  return () => {
    globalThis.removeEventListener?.("resize", update);
    globalThis.removeEventListener?.("orientationchange", update);
  };
}
/* Call these from actual user button clicks only. */
export const smartphoneActions = Object.freeze({
  openCamera: () => requestCamera({ video: { facingMode: "environment" }, audio: false }),
  openMicrophone: () => requestCamera({ video: false, audio: true }),
  stopMedia,
  selectDesignFiles: () => chooseFiles({ accept: "image/*", multiple: true }),
  selectStudioMedia: () => chooseFiles({ accept: "image/*,video/*,audio/*", multiple: true }),
  share: shareLink,
  getLocation: requestLocation,
});
