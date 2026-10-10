// Device-only recording. Nothing is uploaded by this engine.
export class PhoneRecorder {
  constructor({mediaDevices=globalThis.navigator?.mediaDevices, Recorder=globalThis.MediaRecorder, onState=()=>{}, onFile=()=>{}, onTime=()=>{}, maxDuration=300000}={}) {
    this.mediaDevices=mediaDevices;this.Recorder=Recorder;this.onState=onState;this.onFile=onFile;this.onTime=onTime;this.maxDuration=maxDuration;
    this.state='idle';this.generation=0;this.stream=null;this.recorder=null;this.timer=null;this.limit=null;
  }
  get supported(){return Boolean(this.mediaDevices?.getUserMedia && this.Recorder);}
  release(){clearInterval(this.timer);clearTimeout(this.limit);this.timer=null;this.limit=null;this.stream?.getTracks().forEach(track=>track.stop());this.stream=null;}
  async start(){
    if(this.state!=='idle')return;
    if(!this.supported){this.onState('error','Recording is unavailable in this browser. Choose an audio file instead.');return;}
    const generation=++this.generation;this.state='requesting';this.onState(this.state,'Allow microphone access to start recording.');
    try{
      const stream=await this.mediaDevices.getUserMedia({audio:true});
      if(generation!==this.generation){stream.getTracks().forEach(track=>track.stop());return;}
      this.stream=stream;
      const mimeType=['audio/webm;codecs=opus','audio/mp4','audio/ogg;codecs=opus'].find(type=>this.Recorder.isTypeSupported?.(type));
      const recorder=this.recorder=new this.Recorder(stream,mimeType?{mimeType}:{}),chunks=[];
      recorder.ondataavailable=event=>{if(event.data.size)chunks.push(event.data);};
      recorder.onerror=()=>{if(generation!==this.generation)return;this.generation++;this.state='idle';this.release();this.onState('error','Recording failed. Please try again or choose an audio file.');};
      recorder.onstop=()=>{
        if(generation!==this.generation)return;
        this.release();this.state='idle';
        const type=recorder.mimeType || chunks[0]?.type || 'audio/webm',blob=new Blob(chunks,{type});
        if(!blob.size){this.onState('error','No audio was captured. Please try again.');return;}
        const extension=type.includes('mp4')?'m4a':type.includes('ogg')?'ogg':'webm';
        const file=new File([blob],`bonga-voice-${new Date().toISOString().replace(/[:.]/g,'-')}.${extension}`,{type});
        this.onFile(file);this.onState('idle','Voice note ready. Download it to keep it, or share it.');
      };
      recorder.start(1000);this.state='recording';this.startedAt=Date.now();this.onTime(0);this.onState(this.state,'Recording…');
      this.timer=setInterval(()=>this.onTime(Date.now()-this.startedAt),1000);
      this.limit=setTimeout(()=>this.stop(),this.maxDuration);
    }catch(error){
      if(generation!==this.generation)return;
      this.release();this.state='idle';this.onState('error',error.name==='NotAllowedError'?'Microphone permission was denied. Allow access in your browser settings, or choose an audio file.':'Could not open the microphone. Close other recording apps and try again.');
    }
  }
  stop(){
    if(this.state==='requesting'){this.generation++;this.state='idle';this.onState('idle','Recording cancelled.');return;}
    if(this.state!=='recording')return;
    this.state='stopping';clearInterval(this.timer);clearTimeout(this.limit);this.onState(this.state,'Finishing your voice note…');
    try{this.recorder.stop();}catch{this.generation++;this.release();this.state='idle';this.onState('error','Could not finish the recording. Please try again.');}
  }
  dispose(){this.generation++;this.release();if(this.recorder?.state==='recording'){try{this.recorder.stop();}catch{}}this.state='idle';}
}
export function canShareFile(file, navigator=globalThis.navigator) {
  try{return Boolean(navigator?.share && navigator?.canShare?.({files:[file]}));}catch{return false;}
}
