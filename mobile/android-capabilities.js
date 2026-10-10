/* Bonga Bhengu Android smartphone capabilities.
   Additive module: no automatic permission prompts, no external upload. */
export const androidCapabilities = Object.freeze({
  camera: "mediaDevices",
  microphone: "mediaDevices",
  share: "share",
  files: "file",
  location: "geolocation",
  notifications: "Notification",
  install: "beforeinstallprompt",
});

export function detectAndroidCapabilities(env = globalThis) {
  const nav = env.navigator || {};
  return {
    android: /Android/i.test(nav.userAgent || ""),
    secure: Boolean(env.isSecureContext),
    camera: Boolean(nav.mediaDevices?.getUserMedia),
    microphone: Boolean(nav.mediaDevices?.getUserMedia),
    filePicker: Boolean(env.document?.createElement),
    share: typeof nav.share === "function",
    location: Boolean(nav.geolocation),
    notifications: typeof env.Notification !== "undefined",
    serviceWorker: Boolean(nav.serviceWorker),
  };
}

export async function requestCamera({ video = true, audio = false } = {}) {
  if (!globalThis.isSecureContext || !navigator.mediaDevices?.getUserMedia)
    throw new Error("Camera/microphone requires HTTPS and a supported browser");
  return navigator.mediaDevices.getUserMedia({ video, audio });
}

export function stopMedia(stream) {
  stream?.getTracks().forEach(track => track.stop());
}

export async function shareLink({ title, text, url }) {
  if (!navigator.share) throw new Error("Native sharing unavailable");
  await navigator.share({ title, text, url });
}

export function chooseFiles({ accept = "image/*,video/*,audio/*", multiple = false } = {}) {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = accept;
    input.multiple = multiple;
    input.addEventListener("change", () => resolve(Array.from(input.files || [])), { once: true });
    input.addEventListener("error", () => reject(new Error("File selection failed")), { once: true });
    input.click();
  });
}

export function requestLocation(options = { enableHighAccuracy: false, timeout: 10000 }) {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) return reject(new Error("Location unavailable"));
    navigator.geolocation.getCurrentPosition(
      position => resolve({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracyMeters: position.coords.accuracy,
      }),
      reject,
      options,
    );
  });
}
