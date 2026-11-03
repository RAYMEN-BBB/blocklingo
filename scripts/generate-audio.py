"""Generate site-owned neural TTS files from the project's original public vocabulary.
Run: uv run --with edge-tts python scripts/generate-audio.py [--proxy URL]
No runtime cloud request or API key is required by the website.
"""
import asyncio, argparse, hashlib, json
from pathlib import Path
import edge_tts
VOICES={'andrew':('en-US-AndrewNeural','Andrew · 自然英语')}
async def main():
 parser=argparse.ArgumentParser();parser.add_argument('--proxy');args=parser.parse_args()
 rows=json.loads(Path('src/words.json').read_text());root=Path('src/audio');root.mkdir(exist_ok=True);staging=Path('.local/audio-staging');staging.mkdir(parents=True,exist_ok=True)
 old={}
 manifest_path=Path('src/audio-manifest.json')
 if manifest_path.exists():old=json.loads(manifest_path.read_text()).get('clips',{})
 clips={};sem=asyncio.Semaphore(3);completed=0;failed=[]
 async def generate(voice,text):
  nonlocal completed
  digest=hashlib.sha256(text.encode()).hexdigest();key=voice+':'+digest[:20];relative=f'audio/{voice}/{digest[:20]}.mp3';target=Path('src')/relative
  if target.exists() and target.stat().st_size>100:
   clips[key]={'voice':voice,'text':text,'file':relative};return
  async with sem:
   temp=staging/(key.replace(':','-')+'.mp3')
   for attempt in range(3):
    try:
     await asyncio.wait_for(edge_tts.Communicate(text,VOICES[voice][0],rate='-5%',proxy=args.proxy).save(str(temp)),timeout=45)
     if temp.stat().st_size<100:raise ValueError('Empty audio')
     target.parent.mkdir(parents=True,exist_ok=True);temp.replace(target);clips[key]={'voice':voice,'text':text,'file':relative};completed+=1
     if completed%20==0:print(f'Generated {completed} clips',flush=True)
     return
    except Exception as exc:
     if attempt==2:failed.append((voice,text,type(exc).__name__))
     else:await asyncio.sleep(1+attempt*2)
 tasks={(voice,text) for voice in VOICES for row in rows for text in (row[1],row[5])}
 await asyncio.gather(*(generate(v,t) for v,t in sorted(tasks)))
 if failed:
  print('Failed:',failed);raise SystemExit(1)
 manifest={'provider':'Microsoft Edge neural TTS','generatedRate':'-5%','defaultVoice':'andrew','voices':[{'id':k,'model':v[0],'label':v[1]} for k,v in VOICES.items()],'clips':clips}
 manifest_path.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n');print(f'Ready: {len(clips)} verified audio files',flush=True)
asyncio.run(main())
