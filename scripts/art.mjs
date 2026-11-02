// Original voxel illustrations. No game textures or external image requests.
const tint=(hex,k)=>'#'+hex.replace('#','').match(/../g).map(v=>Math.max(0,Math.min(255,Math.round(parseInt(v,16)*k))).toString(16).padStart(2,'0')).join('');
const project=(x,y,z)=>[(x-z)*10,(x+z)*5-y*11];
export function illustration(id){
 if(id==='diamond'||id==='emerald'){
  const c=id==='diamond'?['#52e4e5','#b9ffef','#30b9ca','#17758d','#7cf4eb']:['#4edc95','#bdffcf','#23b980','#14745c','#7cf3af'];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 210"><ellipse cx="120" cy="184" rx="56" ry="10" fill="#000" opacity=".19"/><path d="M74 27h92v14h16v16h16v47h-16v17h-16v17h-16v17h-16v17h-28v-17H90v-17H74v-17H58v-17H42V57h16V41h16Z" fill="${c[3]}"/><path d="M78 37h84v14h16v16h10v28h-14v17h-16v17h-16v17h-15v17h-14v-17H98v-17H82v-17H66V95H52V67h10V51h16Z" fill="${c[0]}"/><path d="M78 37h84l-23 37h-40Z" fill="${c[1]}"/><path d="m52 67 26-16 21 23-22 27H52Z" fill="${c[4]}"/><path d="m162 51 26 16v28h-25l-24-21Z" fill="${c[2]}"/><path d="m99 74 40 0 24 27-43 62-43-62Z" fill="${c[0]}"/><path d="m139 74 24 27-43 62 13-65Z" fill="${c[2]}"/><path d="m62 67 16-16h12L74 76H62Z" fill="${c[1]}"/></svg>`;
 }

 const vox=new Map();
 const box=(x,y,z,w,h,d,c)=>{for(let a=x;a<x+w;a++)for(let b=y;b<y+h;b++)for(let v=z;v<z+d;v++)vox.set(`${a},${b},${v}`,c)};
 const pixel=(x,y,z,c)=>box(x,y,z,1,1,1,c);
 const legs=(c)=>{for(const x of [0,4])for(const z of [0,3])box(x,0,z,1,3,1,c)};
 const animal=(body,head=body)=>{legs(tint(body,.7));box(0,3,0,5,3,4,body);box(3,5,1,3,3,3,head);pixel(5,7,3,'#1d242a');pixel(5,7,1,'#1d242a');box(6,5,2,1,1,2,tint(head,.8))};
 const block=(top,side)=>{box(0,0,0,6,5,6,side);box(0,5,0,6,1,6,top);for(let i=0;i<20;i++){const x=(i*3+i%2)%6,y=(i*7)%5,z=(i*5)%6;pixel(x,y,5,tint(side,.7+(i%4)*.13));pixel(5,y,z,tint(side,.8+(i%3)*.15))}};
 const tool=(type,c)=>{for(let i=0;i<8;i++)box(i,i,0,1,1,1,'#a67b47');if(type==='pickaxe'){box(4,8,0,7,1,1,c);box(3,6,0,1,2,1,c);box(10,6,0,1,2,1,c);box(5,9,0,5,1,1,tint(c,1.2))}if(type==='axe'){box(6,7,0,4,4,1,c);box(8,6,0,3,3,1,c)}if(type==='shovel'){box(7,7,0,3,4,1,c);box(6,8,0,1,2,1,c)}};
 const gem=(c)=>{for(let y=0;y<7;y++){const r=y<3?y+1:Math.max(1,6-y);box(3-r,y,3-r,r*2,1,r*2,c)}box(2,6,2,2,1,2,tint(c,1.25))};
 switch(id){
 case 'grass-block':block('#77b64e','#8e6546');break;
 case 'dirt':block('#9c7652','#916747');break;
 case 'stone':block('#9ba7b1','#778590');break;
 case 'sand':block('#edda94','#cdb77b');break;
 case 'oak-log':block('#ceb584','#825e3d');box(1,6,1,4,1,4,'#a88555');box(2,7,2,2,1,2,'#d7bb83');for(const z of [1,3])box(5,1,z,1,4,1,'#66472d');break;
 case 'oak-planks':block('#c4a372','#a38053');for(const y of [1,3]){box(0,y,6,6,1,1,'#745834');box(6,y,0,1,1,6,'#86653e')}break;
 case 'water':box(0,0,0,7,2,7,'#3b92d4');box(1,2,1,5,1,5,'#69c9ec');box(0,3,3,3,1,1,'#a1eaff');box(4,3,5,3,1,1,'#a1eaff');break;
 case 'coal':gem('#46505c');break;
 case 'diamond':gem('#43d8dd');break;
 case 'emerald':gem('#43d984');break;
 case 'redstone-dust':box(0,0,0,6,1,5,'#8c233d');box(1,1,1,4,1,3,'#e74553');box(2,2,2,2,1,2,'#ff7a6e');break;
 case 'iron-ingot':box(0,0,0,7,2,4,'#a0b8c3');box(1,2,0,5,1,4,'#dce7e9');box(1,3,1,5,1,2,'#edf5f2');break;
 case 'pickaxe':tool('pickaxe','#5bcfd2');break;
 case 'axe':tool('axe','#c0d3d7');break;
 case 'shovel':tool('shovel','#bbcbd3');break;
 case 'sword':for(let i=0;i<8;i++){box(i+3,i+4,0,2,2,1,'#83d9dd');pixel(i+4,i+4,1,'#c2fcf5')}box(1,1,0,2,3,1,'#9b6a42');box(0,4,0,6,1,1,'#bd8e45');break;
 case 'shield':box(0,2,0,1,8,6,'#a47d50');box(1,2,0,1,8,1,'#c1d0cf');box(1,2,5,1,8,1,'#c1d0cf');box(1,9,1,1,1,4,'#c1d0cf');box(1,3,2,1,5,2,'#697d8a');box(0,0,2,1,2,2,'#a47d50');break;
 case 'torch':box(1,0,1,2,7,2,'#9f7548');box(0,7,0,4,2,4,'#f09337');box(1,9,1,2,3,2,'#ffcd5d');box(1,10,1,1,2,1,'#fff2ad');break;
 case 'crafting-table':block('#c09356','#956e46');for(const x of [1,3,5])box(x,6,0,1,1,6,'#60452e');for(const z of [1,3,5])box(0,6,z,6,1,1,'#60452e');box(6,1,2,1,3,1,'#cab995');break;
 case 'furnace':block('#9ba5aa','#7f8d98');box(6,1,1,1,3,4,'#26333d');box(7,1,2,1,1,2,'#e7913b');box(6,4,1,1,1,4,'#374650');break;
 case 'chest':box(0,0,0,7,5,5,'#b47f3c');box(0,5,0,7,1,5,'#d3a052');box(7,0,0,1,5,1,'#63492c');box(7,0,4,1,5,1,'#63492c');box(7,3,0,1,1,5,'#63492c');box(8,2,2,1,2,1,'#d9d6aa');break;
 case 'bed':box(0,1,0,9,1,5,'#885837');for(const x of [0,8])for(const z of [0,4])box(x,0,z,1,1,1,'#885837');box(0,2,0,7,2,5,'#dc5865');box(7,2,0,2,2,5,'#e9e5d4');break;
 case 'bread':box(0,0,0,7,2,3,'#c08d44');box(1,2,0,5,1,3,'#e8b860');for(const x of [1,3,5])box(x,3,1,1,1,2,'#ffe09b');break;
 case 'apple':box(1,0,1,4,1,4,'#b83246');box(0,1,0,6,4,6,'#e65459');box(1,5,1,4,1,4,'#f16b67');box(3,6,3,1,2,1,'#825b38');box(4,7,3,2,1,1,'#69b65a');pixel(0,4,4,'#ffc0a0');break;
 case 'sheep':animal('#e7e6d8','#ab9381');box(3,7,1,3,1,3,'#f1f2e5');pixel(5,6,3,'#27353b');pixel(5,6,1,'#27353b');break;
 case 'cow':animal('#87644e','#a08772');box(1,4,3,2,2,1,'#eee6d2');box(0,5,0,2,1,2,'#eee6d2');box(4,8,1,1,1,1,'#d9c59c');box(4,8,3,1,1,1,'#d9c59c');break;
 case 'pig':animal('#efa4ae');box(6,5,2,1,1,2,'#d98196');pixel(6,5,2,'#9a526b');break;
 case 'chicken':box(1,0,1,1,2,1,'#d8a64c');box(1,0,3,1,2,1,'#d8a64c');box(0,2,0,4,3,4,'#e8e7da');box(3,5,1,2,3,2,'#f2eee0');box(5,5,1,2,1,2,'#edc35a');pixel(4,7,2,'#26343a');box(3,8,1,2,1,1,'#d65b61');box(4,4,2,1,1,1,'#d65b61');break;
 case 'wolf':animal('#a9b5bd','#c7cdd0');box(3,8,1,1,2,1,'#9ba9b1');box(3,8,3,1,2,1,'#9ba9b1');box(6,5,2,1,1,1,'#293942');box(-2,4,1,2,1,1,'#b3bdc1');break;
 case 'villager':box(0,0,0,2,3,2,'#66534c');box(3,0,0,2,3,2,'#66534c');box(0,3,0,5,6,3,'#a17b58');box(0,7,2,5,1,2,'#866244');box(0,9,0,5,4,4,'#d7b18b');box(5,10,1,1,2,1,'#b38b69');pixel(4,11,3,'#4c7866');box(0,13,0,5,1,4,'#8d6c51');break;
 case 'creeper':box(0,0,0,2,2,2,'#5b984d');box(3,0,3,2,2,2,'#5b984d');box(1,2,1,3,5,3,'#72b65b');box(0,7,0,5,5,5,'#80c366');box(5,10,0,1,1,2,'#243c34');box(5,10,3,1,1,2,'#243c34');box(5,8,2,1,2,1,'#243c34');box(5,8,1,1,1,3,'#243c34');break;
 case 'zombie':box(0,0,0,2,4,2,'#586b91');box(3,0,0,2,4,2,'#586b91');box(0,4,0,5,4,3,'#4ba3a6');box(3,7,2,4,1,1,'#739f6b');box(0,8,0,5,4,4,'#85ae72');box(5,10,0,1,1,1,'#293f3a');box(5,10,3,1,1,1,'#293f3a');break;
 case 'build':box(0,0,0,8,1,7,'#729e64');box(0,1,0,6,4,1,'#be945b');box(0,1,0,1,4,6,'#be945b');box(1,1,5,2,3,1,'#be945b');box(4,1,5,2,4,1,'#be945b');box(0,5,0,6,1,6,'#ad6f4b');box(1,6,1,4,1,4,'#c68158');box(2,7,2,2,1,2,'#d49365');break;
 case 'dig':block('#80b266','#9e7853');box(2,6,2,3,1,3,'#3b463a');tool('shovel','#c0d2db');break;
 case 'mine':block('#929fa8','#6c7a84');for(const y of [1,3])pixel(6,y,3,'#72d4d5');tool('pickaxe','#82c7cd');break;
 case 'explore':box(0,0,0,8,1,7,'#75a568');box(2,1,2,2,5,2,'#916945');box(0,5,0,6,3,6,'#4d9463');box(1,8,1,4,2,4,'#77b16d');box(7,1,0,1,8,1,'#d5b779');box(8,7,0,3,2,1,'#edc76f');break;
 default:throw Error('Missing illustration: '+id);
 }
 const faces=[];const points=[];
 for(const [key,color]of vox){const [x,y,z]=key.split(',').map(Number);const adjacent=(a,b,c)=>vox.has(`${a},${b},${c}`);const face=(pts,k)=>{const p=pts.map(v=>project(...v));points.push(...p);faces.push({depth:x+z+y*.02,svg:`<polygon points="${p.map(v=>v.join(',')).join(' ')}" fill="${tint(color,k)}"/>`})};if(!adjacent(x,y+1,z))face([[x,y+1,z],[x+1,y+1,z],[x+1,y+1,z+1],[x,y+1,z+1]],1.12);if(!adjacent(x+1,y,z))face([[x+1,y,z],[x+1,y,z+1],[x+1,y+1,z+1],[x+1,y+1,z]],.8);if(!adjacent(x,y,z+1))face([[x,y,z+1],[x+1,y,z+1],[x+1,y+1,z+1],[x,y+1,z+1]],1)}
 const minX=Math.min(...points.map(p=>p[0])),maxX=Math.max(...points.map(p=>p[0])),minY=Math.min(...points.map(p=>p[1])),maxY=Math.max(...points.map(p=>p[1]));const scale=Math.min(190/(maxX-minX),160/(maxY-minY));const dx=120-(minX+maxX)/2*scale,dy=102-(minY+maxY)/2*scale;
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 210"><ellipse cx="120" cy="184" rx="63" ry="12" fill="#000" opacity=".19"/><g transform="translate(${dx.toFixed(2)} ${dy.toFixed(2)}) scale(${scale.toFixed(3)})" stroke-linejoin="round" shape-rendering="geometricPrecision">${faces.sort((a,b)=>a.depth-b.depth).map(f=>f.svg).join('')}</g></svg>`;
}
