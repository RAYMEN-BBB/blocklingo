// All pronunciation uses the same pre-generated Andrew neural audio.
let manifestPromise=null,current=null,finishCurrent=null,serial=0;
function loadManifest(){if(!manifestPromise)manifestPromise=fetch('/audio-manifest.json').then(r=>{if(!r.ok)throw Error('Audio manifest unavailable');return r.json()}).then(m=>new Map(Object.values(m.clips).filter(c=>c.voice==='andrew').map(c=>[c.text,c.file]))).catch(e=>{manifestPromise=null;throw e});return manifestPromise}
export function stopAudio(){serial++;if(current){current.pause();current.removeAttribute('src');current.load();current=null}if(finishCurrent){const f=finishCurrent;finishCurrent=null;f(false)}}
export async function playText(text,{rate=1}={}){
 stopAudio();const run=serial;
 try{const clips=await loadManifest();if(run!==serial)return false;const file=clips.get(text);if(!file)return false;
  return await new Promise(resolve=>{let settled=false;const player=new Audio('/'+file);current=player;player.preload='auto';player.playbackRate=rate;player.preservesPitch=true;const done=ok=>{if(settled)return;settled=true;clearTimeout(timeout);if(current===player){current=null;finishCurrent=null}resolve(ok)};const timeout=setTimeout(()=>{player.pause();done(false)},30000);finishCurrent=done;player.onended=()=>done(true);player.onerror=()=>done(false);player.play().catch(()=>done(false))});
 }catch{return false}
}
loadManifest().catch(()=>{});
document.addEventListener('visibilitychange',()=>{if(document.hidden)stopAudio()});
