import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';

const SRC = 'public/images';
const OUT = 'public/img';
const WIDTHS = [480, 800, 1280, 1920];
const SKIP = new Set(['logo.webp']);

const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

const magick = (args) => execFileSync('magick', args, { encoding: 'utf8' }).trim();
const meta = {};

for (const file of walk(SRC).sort()) {
  const rel = relative(SRC, file).replace(/\\/g, '/');
  if (SKIP.has(rel) || !/\.(jpe?g|webp|png)$/i.test(rel)) continue;

  const [w0] = magick([file, '-format', '%w', 'info:']).split(' ').map(Number);
  const corner = magick([file, '-crop', `${Math.round(w0 / 50)}x${Math.round(w0 / 50)}+0+0`, '-colorspace', 'gray', '-format', '%[fx:mean]', 'info:']);
  const letterboxed = Number(corner) < 0.04;
  const prep = letterboxed ? ['-fuzz', '12%', '-trim', '+repage'] : [];
  const read = [file, '-auto-orient', ...prep];

  const [w, h] = magick([...read, '-format', '%w %h', 'info:']).split(' ').map(Number);
  const color = magick([...read, '-resize', '1x1!', '-format', '#%[hex:p{0,0}]', 'info:']).slice(0, 7).toLowerCase();
  const widths = [...new Set([...WIDTHS.filter((x) => x < w), Math.min(w, 2400)])];
  const base = rel.replace(/\.[^.]+$/, '');
  const lqip = execFileSync('magick', [...read, '-strip', '-resize', '20x', '-quality', '50', 'webp:-']).toString('base64');

  for (const width of widths) {
    const target = join(OUT, `${base}-${width}.webp`);
    if (existsSync(target)) continue;
    mkdirSync(dirname(target), { recursive: true });
    magick([...read, '-strip', '-resize', `${width}x`, '-unsharp', '0x0.6+0.6+0.01', '-quality', '80', '-define', 'webp:method=6', target]);
  }
  meta[`/images/${rel}`] = { w, h, c: color, s: widths, p: `data:image/webp;base64,${lqip}` };
}

writeFileSync('src/data/imageMeta.json', JSON.stringify(meta));
console.log(`Optimized ${Object.keys(meta).length} images`);
