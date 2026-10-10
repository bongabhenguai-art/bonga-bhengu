// Screen capture stays on this device. Each start requires a browser selection.
export class LaptopRecorder {
  constructor({mediaDevices=globalThis.navigator?.mediaDevices, Recorder=globalThis.MediaRecorder, Stream=globalThis.MediaStream, onState=()=>{}, onFile=()=>{}, onTime=()=>{}, maxDuration=900000, maxBytes=100*1024*1024}={}) {
    Object.assign(this, {mediaDevices, Recorder, Stream, onState, onFile, onTime, maxDuration, maxBytes});
    this.state='idle'; this.generation=0; this.streams=[]; this.listeners=[];
  }
  get supported() { return Boolean(this.mediaDevices?.getDisplayMedia && this.Recorder && this.Stream); }
  release() {
    clearInterval(this.timer); clearTimeout(this.limit); this.timer=null; this.limit=null;
    for (const [track, listener] of this.listeners) track.removeEventListener('ended', listener);
    this.listeners=[];
    for (const stream of this.streams) for (const track of stream.getTracks()) track.stop();
    this.streams=[];
  }
  async start(audio='screen') {
    if (this.state !== 'idle') return;
    if (!this.supported) { this.onState('error','Screen recording is unavailable here. Open Digital studio for other recording tools.'); return; }
    const generation=++this.generation;
    this.state='requesting'; this.onState(this.state,'Choose a tab, window or screen in your browser.');
    const current=()=>generation===this.generation;
    try {
      const display=await this.mediaDevices.getDisplayMedia({video:{frameRate:30}, audio:audio==='screen'});
      if (!current()) { display.getTracks().forEach(track=>track.stop()); return; }
      this.streams.push(display);
      const video=display.getVideoTracks()[0];
      if (!video || video.readyState==='ended') throw new Error('No screen selected');
      const ended=()=>this.stop('Screen sharing ended.');
      video.addEventListener('ended', ended); this.listeners.push([video,ended]);
      let audioTracks=audio==='screen' ? display.getAudioTracks() : [];
      if (audio==='microphone') {
        this.onState('requesting','Allow microphone access for your narration.');
        const microphone=await this.mediaDevices.getUserMedia({audio:true});
        if (!current()) { microphone.getTracks().forEach(track=>track.stop()); return; }
        this.streams.push(microphone); audioTracks=microphone.getAudioTracks();
      }
      if (!current()) return;
      const combined=new this.Stream([...display.getVideoTracks(), ...audioTracks]);
      const mimeType=['video/webm;codecs=vp9,opus','video/webm;codecs=vp8,opus','video/webm','video/mp4'].find(type=>this.Recorder.isTypeSupported?.(type));
      const recorder=this.recorder=new this.Recorder(combined, mimeType ? {mimeType} : {}), chunks=[];
      let total=0; this.finishReason='';
      recorder.ondataavailable=event=>{
        if (!current()) return;
        if (event.data.size) { chunks.push(event.data); total+=event.data.size; }
        if (total>=this.maxBytes && ['recording','paused'].includes(this.state)) this.stop('File size limit reached.');
      };
      recorder.onerror=()=>{
        if (!current()) return;
        this.generation++; this.release(); this.state='idle'; this.onState('error','Screen recording failed. Choose your screen and try again.');
      };
      recorder.onstop=()=>{
        if (!current()) return;
        this.release(); this.state='idle';
        const type=recorder.mimeType || chunks[0]?.type || 'video/webm', blob=new Blob(chunks,{type});
        if (!blob.size) { this.onState('error','No video was captured. Try recording for a little longer.'); return; }
        const extension=type.includes('mp4')?'mp4':'webm';
        this.onFile(new File([blob],`bonga-screen-${new Date().toISOString().replace(/[:.]/g,'-')}.${extension}`,{type}));
        this.onState('idle',`${this.finishReason ? this.finishReason+' ' : ''}Recording ready. Download it before leaving this page.`);
      };
      recorder.start(1000); this.state='recording'; this.startedAt=Date.now(); this.pausedAt=0; this.pausedTotal=0;
      this.onTime(0); this.onState(this.state,audioTracks.length ? 'Recording with audio.' : 'Recording video without audio.');
      this.timer=setInterval(()=>{if(this.state==='recording')this.onTime(Date.now()-this.startedAt-this.pausedTotal);},1000);
      this.limit=setTimeout(()=>this.stop('15-minute session limit reached.'),this.maxDuration);
    } catch (error) {
      if (!current()) return;
      this.release(); this.state='idle'; this.onState('error',error.name==='NotAllowedError' ? 'Screen or microphone permission was cancelled or denied. Choose your screen to try again.' : 'Could not record your screen. Close other capture apps and try again.');
    }
  }
  pause() {
    if (!['recording','paused'].includes(this.state)) return;
    try {
      if (this.state==='recording') { this.recorder.pause(); this.pausedAt=Date.now(); this.state='paused'; this.onState('paused','Recording paused. Screen sharing is still active.'); }
      else { this.recorder.resume(); this.pausedTotal+=Date.now()-this.pausedAt; this.state='recording'; this.onState('recording','Recording resumed.'); }
    } catch { this.stop('Recording could not resume.'); }
  }
  stop(reason='') {
    if (this.state==='requesting') { this.generation++; this.release(); this.state='idle'; this.onState('idle','Screen recording cancelled.'); return; }
    if (!['recording','paused'].includes(this.state)) return;
    this.finishReason=reason; this.state='stopping'; clearInterval(this.timer); clearTimeout(this.limit); this.onState(this.state,'Finishing your recording…');
    try { this.recorder.stop(); } catch { this.generation++; this.release(); this.state='idle'; this.onState('error','Could not finish the recording. Try again.'); }
  }
  dispose() { this.generation++; this.release(); if (this.recorder && this.recorder.state!=='inactive') {try {this.recorder.stop();} catch {}} this.state='idle'; }
}
