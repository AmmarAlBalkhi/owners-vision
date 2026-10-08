// Owner's Vision. Created by AmmarAlBalkhi.
// Editable vector animation: the check, PASS, and failed checks that require PAUSE.
const fs = require('node:fs');
const path = require('node:path');
const { spawn } = require('node:child_process');
const { once } = require('node:events');
const sharp = require('sharp');

const W = 1080, H = 1350, FPS = 24;
const outArg = process.argv.indexOf('--out');
if (outArg !== -1 && !process.argv[outArg + 1]) throw Error('--out needs a directory.');
const OUT = outArg === -1 ? __dirname : path.resolve(process.argv[outArg + 1]);
const scenes = [
  { name: '01-the-check', seconds: 5, sample: 4 },
  { name: '02-pass', seconds: 7, sample: 5.5 },
  { name: '03-fail', seconds: 7, sample: 5.5 },
  { name: '04-owners-vision', seconds: 5, sample: 4 },
];
const duration = scenes.reduce((n, s) => n + s.seconds, 0);
const C = {
  paper: '#F6F4EC', white: '#FFFFFF', ink: '#123F35', muted: '#52675C',
  line: '#CFD9CE', green: '#14654D', mint: '#DDF2D8', lime: '#D5F88B',
  red: '#A93631', blush: '#FCE8E3', dim: '#B6CBBE', darkLine: '#416557',
};
const esc = s => String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const clamp = x => Math.max(0, Math.min(1, x));
const ease = x => 1 - Math.pow(1 - clamp(x), 3);
let p;
function rect(x, y, w, h, fill, radius = 0, stroke = null) {
  p.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}" fill="${fill}"${stroke ? ` stroke="${stroke}" stroke-width="2"` : ''}/>`);
}
function txt(x, y, s, size = 38, weight = 400, fill = C.ink, extra = '') {
  p.push(`<text x="${x}" y="${y}" font-family="Arial, Helvetica, sans-serif" font-size="${size}" font-weight="${weight}" fill="${fill}" ${extra}>${esc(s)}</text>`);
}
function rows(x, y, content, size, weight, fill, leading = 1.2) {
  content.forEach((s, i) => txt(x, y + i * size * leading, s, size, weight, fill));
}
function line(x1, y1, x2, y2, color = C.line, width = 2) {
  p.push(`<path d="M${x1} ${y1} L${x2} ${y2}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round"/>`);
}
function reveal(t, at, fn) {
  const e = ease((t - at) / .45);
  p.push(`<g opacity="${e.toFixed(4)}" transform="translate(0 ${((1 - e) * 16).toFixed(2)})">`);
  fn(); p.push('</g>');
}
function icon(x, y, pass, color, scale = 1, progress = 1) {
  const shape = pass ? 'M-18 0 L-4 14 L22 -17' : 'M-15 -15 L15 15 M15 -15 L-15 15';
  p.push(`<path d="${shape}" transform="translate(${x} ${y}) scale(${scale})" fill="none" stroke="${color}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="${1 - clamp(progress)}"/>`);
}
function brand(dark = false) {
  const color = dark ? C.lime : C.green;
  p.push(`<path d="M92 116 L117 78 L126 87 Z M92 116 L106 102 L117 78 L113 104 Z" fill="${color}"/>`);
  txt(147, 111, "Owner's Vision", 32, 700, dark ? C.white : C.ink);
  txt(984, 108, 'AmmarAlBalkhi', 25, 400, dark ? C.dim : C.muted, 'text-anchor="end"');
}
function footer(n, t, dark = false) {
  const muted = dark ? C.dim : C.muted;
  line(96, 1210, 984, 1210, dark ? C.darkLine : C.line);
  txt(96, 1260, 'Before implementation', 25, 400, muted);
  txt(984, 1260, `${String(n + 1).padStart(2, '0')} / 04`, 25, 400, muted, 'text-anchor="end"');
  const elapsed = scenes.slice(0, n).reduce((sum, s) => sum + s.seconds, 0) + t;
  rect(96, 1293, 888, 4, dark ? C.darkLine : C.line, 2);
  rect(96, 1293, 888 * clamp(elapsed / duration), 4, dark ? C.lime : C.green, 2);
}
function label(x, y, copy, color = C.muted, size = 26) {
  txt(x, y, copy, size, 700, color, 'letter-spacing="1"');
}
function choice(x, y, pass, t, at) {
  reveal(t, at, () => {
    rect(x, y, 422, 182, pass ? C.mint : C.blush, 24);
    icon(x + 54, y + 91, pass, pass ? C.green : C.red, 1, ease((t - at) / .65));
    txt(x + 102, y + 113, pass ? 'PASS' : 'FAIL', 72, 700, pass ? C.green : C.red);
  });
}
function drawScene(n, t) {
  const dark = n === 3;
  rect(0, 0, W, H, dark ? C.ink : C.paper); brand(dark);
  if (n === 0) {
    label(96, 220, 'A SKILL FOR AI CODING AGENTS', C.green, 25);
    rows(96, 342, ['Before the AI builds,', 'check the next step.'], 78, 700, C.ink, 1.16);
    reveal(t, .15, () => {
      rect(96, 552, 888, 231, C.white, 24, C.line);
      label(132, 612, 'COMPARE THE PROPOSED WORK WITH', C.green, 24);
      rows(132, 685, ['Your vision', '+ your completed work'], 48, 700, C.ink, 1.25);
    });
    reveal(t, .65, () => {
      line(540, 808, 540, 846, C.muted, 3);
      line(307, 846, 773, 846, C.muted, 3);
      line(307, 846, 307, 887, C.muted, 3);
      line(773, 846, 773, 887, C.muted, 3);
    });
    choice(96, 910, true, t, .85); choice(562, 910, false, t, 1.05);
  } else if (n === 1) {
    label(96, 220, 'WHEN THE CHECK PASSES', C.green);
    txt(86, 455, 'PASS', 192, 700, C.green);
    p.push(`<circle cx="900" cy="381" r="64" fill="${C.mint}"/>`);
    icon(900, 381, true, C.green, 1.65, ease(t / .6));
    rows(96, 568, ['Fits your vision.', 'Preserves completed work.'], 49, 700, C.ink, 1.25);
    line(96, 687, 984, 687);
    reveal(t, .4, () => {
      icon(118, 758, true, C.green, .63);
      txt(160, 770, 'Vision integrity verified', 38, 400, C.ink);
    });
    reveal(t, .85, () => {
      icon(118, 838, true, C.green, .63);
      txt(160, 850, 'Alignment review passed', 38, 400, C.ink);
    });
    reveal(t, 1.3, () => {
      rect(96, 943, 888, 225, C.green, 24);
      label(132, 1003, 'CONTINUE', C.lime);
      rows(132, 1070, ['Already-authorized work', 'may proceed.'], 46, 700, C.white, 1.18);
    });
  } else if (n === 2) {
    label(96, 220, 'WHEN THE CHECK FAILS', C.red);
    txt(86, 455, 'FAIL', 192, 700, C.red);
    p.push(`<circle cx="900" cy="381" r="64" fill="${C.blush}"/>`);
    icon(900, 381, false, C.red, 1.65, ease(t / .6));
    rows(96, 568, ['Conflict, missing proof,', 'or incomplete review.'], 49, 700, C.ink, 1.25);
    line(96, 687, 984, 687);
    reveal(t, .45, () => {
      rect(96, 744, 888, 220, C.blush, 24);
      txt(132, 834, 'PAUSE', 68, 700, C.red);
      txt(132, 907, 'Implementation must stop.', 43, 700, C.red);
    });
    reveal(t, 1.05, () => {
      rows(96, 1064, ['Report the blocker to the owner.', 'Resolve it, then check again.'], 39, 400, C.ink, 1.4);
    });
  } else {
    rows(96, 334, ['Keep AI work', 'on your terms.'], 91, 700, C.white, 1.15);
    reveal(t, .15, () => {
      rect(96, 584, 422, 141, '#1C4D40', 22, C.darkLine);
      txt(128, 646, 'PASS', 46, 700, C.lime);
      txt(128, 695, 'Authorized work proceeds.', 27, 400, C.white);
      rect(562, 584, 422, 141, '#1C4D40', 22, C.darkLine);
      txt(594, 646, 'FAIL → PAUSE', 39, 700, '#FFC7BC');
      txt(594, 695, 'Resolve the blocker first.', 27, 400, C.white);
    });
    label(96, 850, 'GET OWNER’S VISION', C.lime);
    txt(96, 934, 'github.com/AmmarAlBalkhi', 45, 700, C.white);
    txt(96, 994, '/owners-vision', 45, 700, C.white);
    txt(96, 1110, 'Free to use · Open source · MIT', 33, 400, C.dim);
  }
  footer(n, t, dark);
}
function svgFrame(n, t) {
  p = [`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="title desc">`,
    `<title id="title">Owner's Vision — ${esc(scenes[n].name.slice(3))}</title>`,
    '<desc id="desc">Decision workflow for AI coding agents. PASS allows already-authorized work to continue after integrity and alignment checks. Review uses a fresh subagent when supported, or the same agent in the same session otherwise. A failed or incomplete check requires PAUSE: stop implementation and report the blocker.</desc>',
    "<metadata>Owner's Vision. Created by AmmarAlBalkhi.</metadata>"];
  drawScene(n, t); p.push('</svg>'); return p.join('\n');
}
function atTime(t) {
  let start = 0;
  for (let n = 0; n < scenes.length; n++) {
    if (t < start + scenes[n].seconds || n === scenes.length - 1) return { n, t: t - start };
    start += scenes[n].seconds;
  }
}
async function stills() {
  const dir = path.join(OUT, 'frames'); fs.mkdirSync(dir, { recursive: true });
  for (let i = 0; i < scenes.length; i++) {
    const svg = svgFrame(i, scenes[i].sample);
    fs.writeFileSync(path.join(dir, scenes[i].name + '.svg'), svg);
    await sharp(Buffer.from(svg)).png().toFile(path.join(dir, scenes[i].name + '.png'));
  }
  const cover = svgFrame(0, scenes[0].sample);
  fs.writeFileSync(path.join(OUT, 'owners-vision-cover.svg'), cover);
  await sharp(Buffer.from(cover), { density: 144 }).png().toFile(path.join(OUT, 'owners-vision-cover.png'));
  const panels = [];
  for (let i = 0; i < scenes.length; i++) {
    panels.push({ input: await sharp(path.join(dir, scenes[i].name + '.png')).resize(432, 540).toBuffer(), left: (i % 2) * 448 + 16, top: Math.floor(i / 2) * 556 + 16 });
  }
  await sharp({ create: { width: 912, height: 1128, channels: 3, background: '#D8DDD5' } }).composite(panels).png().toFile(path.join(OUT, 'storyboard.png'));
  fs.writeFileSync(path.join(OUT, 'storyboard.json'), JSON.stringify({ title: "Owner's Vision — PASS / FAIL", creator: 'AmmarAlBalkhi', format: '1080x1350', fps: FPS, duration, type: 'workflow explanation', scenes }, null, 2) + '\n');
  process.stdout.write(`Rendered ${scenes.length} scenes and cover. ${duration} seconds at ${FPS} fps.\n`);
}
async function video() {
  const ffmpeg = process.env.VISION_FFMPEG;
  if (!ffmpeg || !fs.existsSync(ffmpeg)) throw Error('Set VISION_FFMPEG to the FFmpeg executable.');
  const target = path.join(OUT, 'owners-vision-linkedin.mp4');
  const ff = spawn(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', '-f', 'image2pipe', '-vcodec', 'png', '-framerate', String(FPS), '-i', 'pipe:0', '-an', '-c:v', 'libx264', '-preset', 'medium', '-b:v', '1500k', '-minrate', '1500k', '-maxrate', '1500k', '-bufsize', '3000k', '-x264-params', 'nal-hrd=cbr:filler=1', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-metadata', "title=Owner's Vision — PASS / FAIL", '-metadata', 'artist=AmmarAlBalkhi', '-metadata', 'comment=Decision workflow. Created by AmmarAlBalkhi.', '-r', String(FPS), target], { windowsHide: true, stdio: ['pipe', 'ignore', 'pipe'] });
  let stderr = ''; ff.stderr.on('data', b => stderr += b); ff.stdin.on('error', () => {});
  const done = once(ff, 'close');
  const total = Math.round(duration * FPS);
  for (let i = 0; i < total; i++) {
    const { n, t } = atTime(i / FPS);
    const png = await sharp(Buffer.from(svgFrame(n, t))).png({ compressionLevel: 1 }).toBuffer();
    if (!ff.stdin.write(png)) await once(ff.stdin, 'drain');
    if (i % 120 === 0) process.stdout.write(`Rendered ${i}/${total} frames\n`);
  }
  ff.stdin.end();
  const [code] = await done; if (code !== 0) throw Error(stderr || `FFmpeg exit ${code}`);
  process.stdout.write(JSON.stringify({ file: path.basename(target), duration, width: W, height: H, fps: FPS, frames: total, bytes: fs.statSync(target).size }) + '\n');
}
(async () => { await stills(); if (!process.argv.includes('--stills')) await video(); })().catch(e => { process.stderr.write(e.stack + '\n'); process.exitCode = 1; });
