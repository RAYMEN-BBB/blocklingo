// Browser-independent study state. Existing quiz progress remains in its own key.
export const STUDY_KEY='blocklingo-study-v1';
export function localDay(now=new Date()){return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'}).format(now)}
const isDate=s=>/^\d{4}-\d{2}-\d{2}$/.test(s)&&Number.isFinite(Date.parse(s));
const ids=a=>Array.isArray(a)?[...new Set(a.filter(x=>typeof x==='string'&&/^[a-z]+(?:-[a-z]+)*$/.test(x)))]:[];
export function cleanState(input){
 const x=input&&typeof input==='object'?input:{};const days={};
 for(const [date,row]of Object.entries(x.days||{})){if(isDate(date)&&row&&typeof row==='object')days[date]={lesson:ids(row.lesson),words:ids(row.words),sentences:ids(row.sentences),review:ids(row.review),checked:row.checked===true}}
 return {goal:[5,10].includes(x.goal)?x.goal:5,rate:[.8,.9,1].includes(x.rate)?x.rate:1,voice:typeof x.voice==='string'?x.voice:'',stars:ids(x.stars),days};
}
export function lessonFor(state,words,date){
 if(state.days[date]?.lesson.length)return state.days[date].lesson.map(id=>words.find(w=>w.id===id)).filter(Boolean);
 const start=Object.entries(state.days).filter(([d,v])=>d<date&&v.checked).reduce((n,[,v])=>n+v.lesson.length,0);
 return Array.from({length:Math.min(state.goal,words.length)},(_,i)=>words[(start+i)%words.length]);
}
export function reviewFor(state,words,date){
 const past=Object.keys(state.days).filter(d=>d<date&&state.days[d].words.length).sort().reverse();
 const candidates=[...state.stars,...past.slice(0,2).flatMap(d=>state.days[d].words)];
 return [...new Set(candidates)].map(id=>words.find(w=>w.id===id)).filter(Boolean).slice(0,5);
}
export function readyToCheck(record,lesson,review){return !!lesson.length&&lesson.every(w=>record.words.includes(w.id))&&lesson.slice(0,2).every(w=>record.sentences.includes(w.id))&&review.every(w=>record.review.includes(w.id))}
export function streak(state,date){let count=0;let d=new Date(date+'T12:00:00Z');if(!state.days[date]?.checked)d.setUTCDate(d.getUTCDate()-1);while(state.days[d.toISOString().slice(0,10)]?.checked){count++;d.setUTCDate(d.getUTCDate()-1)}return count}
