// 앱 아이콘 PNG 생성: 초록 바탕에 단어 카드 3장이 쌓인 모양. 실행: node tools/make-icons.js
import { deflateSync } from 'node:zlib';
import { writeFileSync } from 'node:fs';

const BG = [31, 107, 87];
const CARD = [[246, 242, 234], [233, 160, 74], [246, 242, 234]];

// 0~1 좌표계의 둥근 사각형 카드 3장 (안전 영역 안쪽)
const cards = [
  { x: 0.24, y: 0.27, w: 0.52, h: 0.12 },
  { x: 0.24, y: 0.44, w: 0.52, h: 0.12 },
  { x: 0.24, y: 0.61, w: 0.36, h: 0.12 },
];

function inRoundRect(px, py, r) {
  const rad = r.h / 2;
  const cx = Math.min(Math.max(px, r.x + rad), r.x + r.w - rad);
  const cy = Math.min(Math.max(py, r.y + rad), r.y + r.h - rad);
  return (px - cx) ** 2 + (py - cy) ** 2 <= rad * rad;
}

function draw(size) {
  const SS = 4; // 안티앨리어싱용 슈퍼샘플링
  const rgb = Buffer.alloc(size * size * 3);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const acc = [0, 0, 0];
      for (let sy = 0; sy < SS; sy++) {
        for (let sx = 0; sx < SS; sx++) {
          const px = (x + (sx + 0.5) / SS) / size;
          const py = (y + (sy + 0.5) / SS) / size;
          const k = cards.findIndex((c) => inRoundRect(px, py, c));
          const col = k >= 0 ? CARD[k] : BG;
          for (let c = 0; c < 3; c++) acc[c] += col[c];
        }
      }
      for (let c = 0; c < 3; c++) rgb[(y * size + x) * 3 + c] = Math.round(acc[c] / (SS * SS));
    }
  }
  return rgb;
}

const CRC = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
const crc32 = (buf) => {
  let c = 0xffffffff;
  for (const b of buf) c = CRC[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
};
function chunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type), data]);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crc]);
}
function png(size) {
  const rgb = draw(size);
  const raw = Buffer.alloc(size * (size * 3 + 1));
  for (let y = 0; y < size; y++) rgb.copy(raw, y * (size * 3 + 1) + 1, y * size * 3, (y + 1) * size * 3);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0); ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; ihdr[9] = 2; // 8bit RGB
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr), chunk('IDAT', deflateSync(raw)), chunk('IEND', Buffer.alloc(0)),
  ]);
}

for (const [name, size] of [['icon-192.png', 192], ['icon-512.png', 512], ['apple-touch-icon.png', 180]]) {
  writeFileSync(new URL(`../icons/${name}`, import.meta.url), png(size));
}
console.log('icons written');
