// Owner's Vision social demo. Created by AmmarAlBalkhi.
// Editable vector artwork with actual text, rendered directly to PNG and MP4.
const fs = require('node:fs');
const path = require('node:path');
const { spawn } = require('node:child_process');
const { once } = require('node:events');
const sharp = require('sharp');

const W = 1080, H = 1350, FPS = 24;
const OUT = __dirname;
const scenes = [
  { name: '01-your-request', seconds: 5, sample: 4 },
  { name: '02-the-conflict', seconds: 4, sample: 3 },
  { name: '03-the-check', seconds: 7, sample: 5.6 },
  { name: '04-your-permission', seconds: 7, sample: 5.5 },
  { name: '05-try-it', seconds: 4, sample: 3 },
];
const duration = scenes.reduce((n, s) => n + s.seconds, 0);
const C = { paper: '#F6F4EC', white: '#FFFFFF', ink: '#123F35', text: '#204D41',
  muted: '#52675C', line: '#CFD9CE', green: '#14654D', mint: '#DDF2D8',
  lime: '#D5F88B', amber: '#82451C', amberBg: '#FBE8D4', dim: '#A4BBAE' };
const esc = s => String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const clamp = x => Math.max(0, Math.min(1, x));
const ease = x => 1 - Math.pow(1 - clamp(x), 3);
let p;
function rect(x,y,w,h,fill,r=0,stroke=null,sw=2) { p.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}"${stroke?` stroke="${stroke}" stroke-width="${sw}"`:''}/>`); }
function txt(x,y,s,size=38,weight=400,fill=C.ink,extra='') { p.push(`<text x="${x}" y="${y}" font-family="Arial, Helvetica, sans-serif" font-size="${size}" font-weight="${weight}" fill="${fill}" ${extra}>${esc(s)}</text>`); }
function rows(x,y,a,size=38,weight=400,fill=C.ink,leading=1.25) { a.forEach((s,i)=>txt(x,y+i*size*leading,s,size,weight,fill)); }
function line(x1,y1,x2,y2,color=C.line,width=2,extra='') { p.push(`<path d="M${x1} ${y1} L${x2} ${y2}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" ${extra}/>`); }
function circle(x,y,r,fill,stroke=null,sw=2) { p.push(`<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"${stroke?` stroke="${stroke}" stroke-width="${sw}"`:''}/>`); }
function group(opacity,dy,fn) { p.push(`<g opacity="${Math.max(0,Math.min(1,opacity))}" transform="translate(0 ${dy.toFixed(2)})">`); fn(); p.push('</g>'); }
function reveal(t,at,fn) { const e=ease((t-at)/.48); group(e,(1-e)*20,fn); }
function check(x,y,color=C.green,scale=1) { p.push(`<path d="M${x} ${y+12*scale} l${9*scale} ${9*scale} l${21*scale} ${-24*scale}" fill="none" stroke="${color}" stroke-width="${4*scale}" stroke-linecap="round" stroke-linejoin="round"/>`); }
function lock(x,y,color=C.green,s=1) { p.push(`<g transform="translate(${x} ${y}) scale(${s})"><path d="M7 17 V10 a10 10 0 0 1 20 0 v7" fill="none" stroke="${color}" stroke-width="3.5"/><rect x="0" y="17" width="34" height="28" rx="6" fill="none" stroke="${color}" stroke-width="3.5"/><circle cx="17" cy="29" r="2.5" fill="${color}"/><path d="M17 30 v6" stroke="${color}" stroke-width="3"/></g>`); }
function arrow(x,y,color=C.muted) { p.push(`<path d="M${x} ${y} v34 m-9 -9 l9 9 9 -9" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`); }
function label(x,y,s,color=C.muted,size=24) { txt(x,y,s,size,700,color,'letter-spacing="1.2"'); }
function mark(x,y,fill=C.green) { p.push(`<path d="M${x-16} ${y+18} L${x+9} ${y-20} L${x+18} ${y-11} Z" fill="${fill}"/><path d="M${x-16} ${y+18} L${x-2} ${y+4} L${x+9} ${y-20} L${x+5} ${y+6} Z" fill="${fill}" opacity=".55"/>`); }
function brand(dark=false) {
  mark(108,100,dark?C.lime:C.green);
  txt(147,111,"Owner's Vision",32,700,dark?C.white:C.ink);
  txt(978,108,'AmmarAlBalkhi',25,400,dark?C.dim:C.muted,'text-anchor="end"');
}
function footer(n,dark=false) {
  const ink=dark?C.dim:C.muted;
  line(96,1210,984,1210,dark?'#345B4F':C.line);
  txt(96,1260,'Illustrated example',25,400,ink);
  txt(984,1260,`${String(n+1).padStart(2,'0')} / 05`,25,400,ink,'text-anchor="end"');
  for(let i=0;i<5;i++)rect(96+i*180,1293,168,4,i<=n?(dark?C.lime:C.green):(dark?'#345B4F':C.line),2);
}
function visionBox(y=386) {
  rect(96,y,888,195,C.white,22,C.line);
  lock(128,y+30,C.green,.72);
  label(173,y+52,'LOCKED OWNER’S VISION',C.green);
  rows(128,y+113,['Tasks stay local.','Saved tasks survive restarts.'],39,400,C.ink,1.25);
}
function verdict(y,pass,t) {
  const bg=pass?C.mint:C.amberBg, ink=pass?C.green:C.amber;
  rect(96,y,888,195,bg,22);
  label(128,y+45,'THE HAND OF THE OWNER',ink,23);
  if(pass)check(132,y+79,ink,1.4);
  else { rect(132,y+77,9,35,ink,3);rect(153,y+77,9,35,ink,3); }
  txt(187,y+115,pass?'PASS':'PAUSE',56,700,ink);
  txt(128,y+164,pass?'Already-authorized work may continue.':'This conflicts with the saved-task checkpoint.',31,400,ink);
}
// Owner's Vision: a plain-language illustrated example. Created by AmmarAlBalkhi.
function taskApp(y, mode, t=5) {
  const x=218,w=644,h=340;
  rect(x,y,w,h,C.white,25,C.line);
  txt(x+34,y+53,'MY TASKS',28,700,C.ink);
  rect(x+w-169,y+23,137,43,mode==='blocked'?C.amberBg:C.mint,21);
  txt(x+w-100,y+52,mode==='blocked'?'OFFLINE':'OFFLINE',22,700,mode==='blocked'?C.amber:C.green,'text-anchor="middle"');
  line(x+32,y+83,x+w-32,y+83,C.line);
  if(mode==='search') {
    rect(x+32,y+109,w-64,62,C.paper,13,C.line);
    circle(x+62,y+137,10,'none',C.muted,3);line(x+70,y+145,x+79,y+154,C.muted,3);
    txt(x+95,y+150,t>.9?'groceries':'Search tasks',30,400,C.muted);
    rect(x+33,y+203,24,24,'none',6,C.green);
    txt(x+80,y+229,'Buy groceries',34,400,C.ink);
    reveal(t,1.7,()=>{check(x+38,y+282,C.green,.75);txt(x+80,y+308,'Search works without internet.',29,400,C.green);});
  } else {
    ['Buy groceries','Read a book','Plan the weekend'].forEach((s,i)=>{
      const yy=y+136+i*66;
      rect(x+33,yy-23,24,24,'none',6,mode==='blocked'?C.line:C.green);
      txt(x+80,yy+1,s,33,400,mode==='blocked'?C.line:C.ink);
    });
    if(mode==='blocked') {
      rect(x+43,y+121,w-86,153,C.amberBg,17);
      circle(x+w/2,y+159,16,C.amber);
      txt(x+w/2,y+169,'!',27,700,C.white,'text-anchor="middle"');
      txt(x+w/2,y+216,'Internet required',40,700,C.amber,'text-anchor="middle"');
      txt(x+w/2,y+252,'Connect to open the app.',25,400,C.amber,'text-anchor="middle"');
    }
  }
}
function bubble(y,who,copy,t=5,at=0,fill=C.white) {
  reveal(t,at,()=>{
    rect(96,y,888,180,fill,24,fill===C.white?C.line:null);
    label(130,y+47,who,fill===C.ink?C.lime:C.green,25);
    rows(130,y+105,copy,42,400,fill===C.ink?C.white:C.ink,1.23);
  });
}
// Owner's Vision: 27-second introduction. Created by AmmarAlBalkhi.
function drawScene(n,t) {
  const dark=n===4;
  rect(0,0,W,H,dark?C.ink:C.paper);brand(dark);
  if(n===0) {
    label(96,245,'YOU ASK YOUR AI',C.green,28);
    rows(96,350,['“Build me an app','that works offline.”'],77,700,C.ink,1.15);
    reveal(t,.35,()=>taskApp(673,'normal'));
    txt(96,1130,'This is what you want to build.',42,400,C.muted);
  } else if(n===1) {
    label(96,245,'LATER, THE AI PROPOSES',C.amber,27);
    rows(96,350,['“Require internet','to open the app.”'],77,700,C.ink,1.15);
    reveal(t,.2,()=>taskApp(673,'blocked'));
    rows(96,1100,['That changes what','you asked for.'],43,700,C.amber,1.25);
  } else if(n===2) {
    rows(96,252,['Owner’s Vision tells','the AI to check first.'],68,700,C.ink,1.14);
    txt(96,411,'Instructions for your AI coding tool.',38,400,C.muted);
    rect(96,488,888,169,C.white,24,C.line);
    label(130,541,'YOUR SAVED REQUIREMENT',C.green,24);
    txt(130,610,'Works without internet.',47,700,C.ink);
    reveal(t,.6,()=>arrow(540,695));
    reveal(t,1.1,()=>{
      rect(96,776,888,247,C.amberBg,24);
      txt(132,852,'PAUSE',60,700,C.amber);
      rows(132,922,['This would break your','offline requirement.'],43,400,C.amber,1.25);
    });
    txt(96,1135,'Check before making the change.',41,700,C.ink);
  } else if(n===3) {
    rows(96,252,['Finished work.','Added with your permission.'],61,700,C.ink,1.18);
    rect(96,455,888,90,C.mint,20);
    check(130,487,C.green,.85);txt(180,511,'Offline search: built and tested.',35,400,C.green);
    reveal(t,.3,()=>{
      rect(96,596,888,161,C.ink,23);
      label(130,647,'YOU AUTHORIZE',C.lime,24);
      txt(130,708,'“Add the results to my vision.”',44,400,C.white);
    });
    reveal(t,.9,()=>{
      rect(96,795,888,281,C.white,24,C.line);
      label(130,852,'YOUR PROJECT RECORD',C.green,23);
      txt(130,910,'Works without internet.',38,400,C.ink);
    });
    reveal(t,2.2,()=>{
      rect(117,949,846,99,C.mint,14);
      txt(141,1012,'+',40,700,C.green);
      txt(191,1012,'Offline search built and tested.',37,400,C.ink);
    });
    txt(96,1150,'Earlier lines stay unchanged.',41,700,C.ink);
  } else {
    rows(96,300,['Keep the AI focused','on what you asked for.'],73,700,C.white,1.17);
    rect(96,611,888,357,'#1C4D40',27,'#416557');
    label(132,680,'OWNER’S VISION',C.lime,27);
    txt(132,762,'github.com/AmmarAlBalkhi',42,700,C.white);
    txt(132,821,'/owners-vision',42,700,C.white);
    txt(132,918,'Free to use · Open source · MIT',31,400,C.dim);
    txt(96,1115,'Built by AmmarAlBalkhi',36,700,C.white);
  }
  footer(n,dark);
}

function svgFrame(n,t) {
  p=[`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="title desc">`,
    `<title id="title">Owner's Vision — ${esc(scenes[n].name.slice(3))}</title>`,
    '<desc id="desc">Illustrative owner-controlled agent workflow: verify direction, pause conflicting work, remind about verified accomplishments, and append only with explicit owner permission. No people or faces.</desc>',
    '<metadata>Owner\'s Vision. Created by AmmarAlBalkhi.</metadata>'];
  drawScene(n,t);
  p.push('</svg>');return p.join('\n');
}
function atTime(t) {
  let start=0;
  for(let n=0;n<scenes.length;n++){ if(t<start+scenes[n].seconds||n===scenes.length-1)return{n,t:t-start};start+=scenes[n].seconds; }
}
async function stills() {
  const dir=path.join(OUT,'frames');fs.mkdirSync(dir,{recursive:true});
  for(let i=0;i<scenes.length;i++){
    const svg=svgFrame(i,scenes[i].sample);
    fs.writeFileSync(path.join(dir,scenes[i].name+'.svg'),svg);
    await sharp(Buffer.from(svg)).png().toFile(path.join(dir,scenes[i].name+'.png'));
  }
  const cover=svgFrame(0,scenes[0].sample);
  fs.writeFileSync(path.join(OUT,'owners-vision-cover.svg'),cover);
  await sharp(Buffer.from(cover),{density:144}).png().toFile(path.join(OUT,'owners-vision-cover.png'));
  const panels=[];
  for(let i=0;i<scenes.length;i++)panels.push({input:await sharp(path.join(dir,scenes[i].name+'.png')).resize(432,540).toBuffer(),left:(i%3)*448+16,top:Math.floor(i/3)*556+16});
  await sharp({create:{width:1360,height:1128,channels:3,background:'#D8DDD5'}}).composite(panels).png().toFile(path.join(OUT,'storyboard.png'));
  fs.writeFileSync(path.join(OUT,'storyboard.json'),JSON.stringify({title:"Owner's Vision",creator:'AmmarAlBalkhi',format:'1080x1350',fps:FPS,duration,synthetic:true,scenes},null,2)+'\n');
  process.stdout.write(`Rendered five simple scenes and cover. ${duration} seconds at ${FPS} fps.\n`);
}
async function video() {
  const ffmpeg=process.env.VISION_FFMPEG;
  if(!ffmpeg||!fs.existsSync(ffmpeg))throw Error('Set VISION_FFMPEG to the ffmpeg executable.');
  const target=path.join(OUT,'owners-vision-linkedin.mp4');
  const ff=spawn(ffmpeg,['-hide_banner','-loglevel','error','-y','-f','image2pipe','-vcodec','png','-framerate',String(FPS),'-i','pipe:0','-an','-c:v','libx264','-preset','medium','-b:v','1500k','-minrate','1500k','-maxrate','1500k','-bufsize','3000k','-x264-params','nal-hrd=cbr:filler=1','-pix_fmt','yuv420p','-movflags','+faststart','-metadata',"title=Owner's Vision — Keep the AI focused on what you asked for",'-metadata','artist=AmmarAlBalkhi','-metadata','comment=Illustrated example. Created by AmmarAlBalkhi.','-r',String(FPS),target],{windowsHide:true,stdio:['pipe','ignore','pipe']});
  let stderr='';ff.stderr.on('data',b=>stderr+=b);ff.stdin.on('error',()=>{});
  const done=once(ff,'close');
  const total=Math.round(duration*FPS);
  for(let i=0;i<total;i++){
    const {n,t}=atTime(i/FPS);
    const png=await sharp(Buffer.from(svgFrame(n,t))).png({compressionLevel:1}).toBuffer();
    if(!ff.stdin.write(png))await once(ff.stdin,'drain');
    if(i%120===0)process.stdout.write(`Rendered ${i}/${total} frames\n`);
  }
  ff.stdin.end();
  const [code]=await done;if(code!==0)throw Error(stderr||`ffmpeg exit ${code}`);
  process.stdout.write(JSON.stringify({file:path.basename(target),duration,width:W,height:H,fps:FPS,frames:total,bytes:fs.statSync(target).size})+'\n');
}
(async()=>{await stills();if(!process.argv.includes('--stills'))await video();})().catch(e=>{process.stderr.write(e.stack+'\n');process.exitCode=1;});
