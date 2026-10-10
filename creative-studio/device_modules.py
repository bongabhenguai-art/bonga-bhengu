"""Device and production capability registry for existing Fukulisane Studio.
Metadata is descriptive: it does not claim that streaming infrastructure is deployed.
"""
from fastapi import APIRouter
router = APIRouter(prefix="/studio/modules", tags=["studio-modules"])
MODULES = {
 "android_phone":{"title":"Android phone camera","capabilities":["browser-camera-preview","local-recording","front-back-switch"],"requires":["HTTPS","camera permission"],"transport":"local browser","implemented":True,"repository":"https://github.com/webrtc/samples"},
 "laptop":{"title":"Laptop camera and microphone","capabilities":["browser-camera-preview","local-recording"],"requires":["HTTPS or localhost","camera permission"],"transport":"local browser","implemented":True,"repository":"https://github.com/webrtc/samples"},
 "tv":{"title":"TV monitor output","capabilities":["HDMI display","browser cast receiver integration"],"requires":["external display or cast receiver"],"transport":"not_configured","implemented":False,"repository":"https://github.com/GoogleChrome/chromium-web-samples"},
 "livestream":{"title":"Livestream","capabilities":["WebRTC ingest","RTMP/SRT relay","multi-platform distribution"],"requires":["authorized media server","stream destination keys"],"transport":"not_configured","implemented":False,"repository":"https://github.com/bluenviron/mediamtx"},
 "podcast":{"title":"Podcast production","capabilities":["multi-microphone mix","recording","guest feeds"],"requires":["audio capture and routing"],"transport":"not_configured","implemented":False,"repository":"https://github.com/obsproject/obs-studio"},
 "record":{"title":"Local recording","capabilities":["MediaRecorder video capture","download recording"],"requires":["supported browser","camera permission"],"transport":"local browser","implemented":True,"repository":"https://github.com/webrtc/samples"},
}
@router.get("")
def list_studio_modules():
 """Return descriptive module metadata without claiming remote deployment."""
 return {"modules":MODULES,"remote_streaming":"not_configured","note":"Implemented means basic local browser functionality only, not full production capability."}
@router.get("/{module_id}")
def get_studio_module(module_id: str):
 """Return metadata for a known module, or raise 404 for an unknown ID."""
 from fastapi import HTTPException
 if module_id not in MODULES: raise HTTPException(404,"Studio module not found")
 return MODULES[module_id]
