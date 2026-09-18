import { test } from 'node:test';
import assert from 'node:assert/strict';
import { WORDS } from '../data/words.js';
import { PATTERNS } from '../data/patterns.js';
import { tokenize } from '../js/quiz.js';

test('단어: 3의 배수, id와 뜻 중복 없음', () => {
  assert.equal(WORDS.length, 999);
  assert.equal(new Set(WORDS.map((w) => w.id)).size, WORDS.length);
  assert.equal(new Set(WORDS.map((w) => w.ko)).size, WORDS.length);
  for (const w of WORDS) assert.ok(w.en && w.ko && w.pos && w.example && w.exampleKo, w.en);
});

test('패턴: 예문 3개, 조각 맞추기에 알맞은 길이', () => {
  for (const p of PATTERNS) {
    assert.equal(p.examples.length, 3, p.pattern);
    for (const e of p.examples) {
      const n = tokenize(e.en).length;
      assert.ok(n >= 2 && n <= 10, `${e.en} (${n}조각)`);
    }
  }
  const ids = PATTERNS.flatMap((p) => p.examples.map((e) => e.id));
  assert.equal(new Set(ids).size, ids.length);
});
