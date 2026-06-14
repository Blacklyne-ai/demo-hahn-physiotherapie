import sharp from 'sharp';

// Proper freistellen: flood-fill transparency from the BORDER through connected
// near-white pixels only. The running figure is white but bounded by the blue
// cross + thin blue outlines, so it stays opaque white. Outer background -> transparent.
const SRC = 'docs/img-shot/home-00.png';
const trimmed = await sharp(SRC).trim({ threshold: 10 }).flatten({ background: '#ffffff' }).toBuffer();
const { data, info } = await sharp(trimmed).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H, channels: C } = info;

const isWhite = (i) => data[i] >= 222 && data[i + 1] >= 222 && data[i + 2] >= 222;
const transparent = new Uint8Array(W * H);
const stack = [];
const push = (x, y) => {
  if (x < 0 || y < 0 || x >= W || y >= H) return;
  const p = y * W + x;
  if (transparent[p]) return;
  if (!isWhite(p * C)) return;
  transparent[p] = 1; stack.push(p);
};
for (let x = 0; x < W; x++) { push(x, 0); push(x, H - 1); }
for (let y = 0; y < H; y++) { push(0, y); push(W - 1, y); }
while (stack.length) {
  const p = stack.pop();
  const x = p % W, y = (p / W) | 0;
  push(x + 1, y); push(x - 1, y); push(x, y + 1); push(x, y - 1);
}
// Apply: flooded -> alpha 0. Then soft-defringe the 1px boundary.
for (let p = 0; p < W * H; p++) if (transparent[p]) data[p * C + 3] = 0;
// Defringe: kept near-white pixels touching a transparent neighbour get reduced alpha
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
  const p = y * W + x; if (transparent[p]) continue;
  const i = p * C;
  const near = data[i] >= 210 && data[i + 1] >= 210 && data[i + 2] >= 210;
  if (!near) continue;
  let edge = false;
  for (const [dx, dy] of [[1,0],[-1,0],[0,1],[0,-1]]) {
    const nx = x + dx, ny = y + dy;
    if (nx < 0 || ny < 0 || nx >= W || ny >= H || transparent[ny * W + nx]) { edge = true; break; }
  }
  if (edge) data[i + 3] = 90;
}

const out = sharp(data, { raw: { width: W, height: H, channels: C } });
await out.clone().resize({ width: 1100 }).png({ compressionLevel: 9 }).toFile('public/logo.png');

// white version for dark footer (all opaque pixels -> white)
const { data: d2, info: i2 } = await sharp(data, { raw: { width: W, height: H, channels: C } })
  .resize({ width: 1100 }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
for (let k = 0; k < d2.length; k += i2.channels) if (d2[k + 3] > 10) { d2[k] = 255; d2[k + 1] = 255; d2[k + 2] = 255; }
await sharp(d2, { raw: { width: i2.width, height: i2.height, channels: i2.channels } }).png().toFile('public/logo-light.png');

console.log('freigestellt:', W + 'x' + H, '-> public/logo.png (1100w) + logo-light.png');
