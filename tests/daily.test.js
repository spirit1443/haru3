import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ensureToday, markDone, currentStreak, initialState, prevDate } from '../js/daily.js';

const W = 9, P = 4; // 단어 9개, 패턴 4개

test('처음 열면 0번부터', () => {
  const s = ensureToday(initialState(), '2026-09-18', W, P);
  assert.equal(s.wordIndex, 0);
  assert.equal(s.patternIndex, 0);
  assert.equal(s.lastDate, '2026-09-18');
});

test('같은 날 다시 열면 그대로', () => {
  let s = ensureToday(initialState(), '2026-09-18', W, P);
  s = markDone(s, 'words', '2026-09-18');
  s = ensureToday(s, '2026-09-18', W, P);
  assert.equal(s.wordIndex, 0);
});

test('완료한 뒤 다음 날(며칠 뒤여도) 다음 3개', () => {
  let s = ensureToday(initialState(), '2026-09-18', W, P);
  s = markDone(s, 'words', '2026-09-18');
  s = markDone(s, 'sentences', '2026-09-18');
  s = ensureToday(s, '2026-09-25', W, P);
  assert.equal(s.wordIndex, 3);
  assert.equal(s.patternIndex, 1);
  assert.deepEqual(s.done, { words: false, sentences: false });
});

test('완료하지 않은 세트는 다음 날에도 유지', () => {
  let s = ensureToday(initialState(), '2026-09-18', W, P);
  s = markDone(s, 'words', '2026-09-18');
  s = ensureToday(s, '2026-09-19', W, P);
  assert.equal(s.wordIndex, 3);
  assert.equal(s.patternIndex, 0);
});

test('목록 끝에서 처음으로', () => {
  let s = { ...initialState(), lastDate: '2026-09-18', wordIndex: 6, patternIndex: 3, done: { words: true, sentences: true } };
  s = ensureToday(s, '2026-09-19', W, P);
  assert.equal(s.wordIndex, 0);
  assert.equal(s.patternIndex, 0);
});

test('연속 학습일', () => {
  let s = initialState();
  s = markDone(s, 'words', '2026-09-18');
  assert.equal(s.streak, 1);
  s = markDone(s, 'sentences', '2026-09-18');
  assert.equal(s.streak, 1);
  s = markDone(s, 'words', '2026-09-19');
  assert.equal(s.streak, 2);
  assert.equal(currentStreak(s, '2026-09-20'), 2);
  assert.equal(currentStreak(s, '2026-09-21'), 0);
  s = markDone(s, 'words', '2026-09-22');
  assert.equal(s.streak, 1);
});

test('prevDate: 월 경계', () => {
  assert.equal(prevDate('2026-10-01'), '2026-09-30');
  assert.equal(prevDate('2026-01-01'), '2025-12-31');
});
