/**
 * Teaching & learning studio capabilities for existing Bonga Bhengu OS.
 * This is a declarative configuration, not a claim that PTZ hardware is connected.
 */
export const teachingStudio = Object.freeze({
  modes: ['teach-live','learn-live','record-lesson','practical-demonstration','podcast','livestream'],
  deviceLayouts: {
    android: {controlStyle:'touch',cameraSwitch:'tap',preview:'responsive',controls:['mute','camera','switch-camera','record-request','raise-hand','chat']},
    laptop: {controlStyle:'keyboard-mouse',cameraSwitch:'click-or-shortcut',preview:'multiview',controls:['preview','program','camera-grid','audio-mixer','lesson-notes','chat']}
  },
  cameras: {
    maxInvitedPhoneCameras:5,
    slots:['teacher-front','overhead-hands','side-view','close-up','room-wide'],
    localPhoneCameraSwitching:true,
    digitalPanZoom:'client-capability-dependent',
    physicalPTZ:'requires-supported-hardware-and-authorized-controller',
    network:'same-wifi-by-default; remote connections require approved ICE/TURN setup'
  },
  teaching: {
    roles:['instructor','learner','studio-director'],
    tools:['lesson-outline','screen-share-request','camera-cue-list','learner-questions','recording-consent','accessibility-captions-plan'],
    sessionRecording:'explicit-consent-and-implementation-required',
    learnerAttendance:'implementation-required',
    learnerPrivacy:'restricted-by-role'
  },
  status:'capability-plan; verify real devices, recording and classroom runtime before presenting as operational'
});
export function teachingStudioConfig(device='android'){
  if(!Object.hasOwn(teachingStudio.deviceLayouts,device))throw new RangeError('Unsupported device');
  return structuredClone({device,...teachingStudio.deviceLayouts[device],cameras:teachingStudio.cameras,teaching:teachingStudio.teaching,status:teachingStudio.status});
}
