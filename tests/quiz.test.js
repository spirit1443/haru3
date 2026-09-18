import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildQuiz, applyResult, makeChoices, tokenize, isSentenceCorrect, seededRng } from '../js/quiz.js';

const rng = seededRng(42);

test('buildQuiz: 오답이 없으면 오늘 3개만', () => {
  const q = buildQuiz(['a', 'b', 'c'], {}, rng);
  assert.deepEqual([...q].sort(), ['a', 'b', 'c']);
});

test('buildQuiz: 최대 10문제, 중복 없음, 오늘 항목 포함', () => {
  const pool = {};
  for (let i = 0; i < 20; i++) pool['w' + i] = 0;
  pool.a = 1; // 오늘 항목이 오답 목록에도 있어도 한 번만
  const q = buildQuiz(['a', 'b', 'c'], pool, rng);
  assert.equal(q.length, 10);
  assert.equal(new Set(q).size, 10);
  for (const id of ['a', 'b', 'c']) assert.ok(q.includes(id));
});

test('buildQuiz: 오답이 7개 미만이면 전부 포함', () => {
  const q = buildQuiz(['a', 'b', 'c'], { x: 0, y: 1 }, rng);
  assert.equal(q.length, 5);
  assert.ok(q.includes('x') && q.includes('y'));
});

test('applyResult: 틀리면 오답 목록에 streak 0으로', () => {
  assert.deepEqual(applyResult({}, 'a', false), { a: 0 });
  assert.deepEqual(applyResult({ a: 1 }, 'a', false), { a: 0 });
});

test('applyResult: 연속 2번 맞히면 빠짐', () => {
  let p = applyResult({}, 'a', false);
  p = applyResult(p, 'a', true);
  assert.deepEqual(p, { a: 1 });
  p = applyResult(p, 'a', true);
  assert.deepEqual(p, {});
});

test('applyResult: 목록에 없는 항목을 맞히면 변화 없음, 원본 불변', () => {
  const orig = { b: 0 };
  const p = applyResult(orig, 'a', true);
  assert.deepEqual(p, { b: 0 });
  applyResult(orig, 'b', true);
  assert.deepEqual(orig, { b: 0 });
});

test('makeChoices: 4개, 정답 포함, 중복 없음', () => {
  const c = makeChoices('예약', ['예약', '환불', '빌리다', '가능한', '예약', '편리한'], rng);
  assert.equal(c.length, 4);
  assert.ok(c.includes('예약'));
  assert.equal(new Set(c).size, 4);
});

test('tokenize: 끝 문장부호 제거 후 공백 분리', () => {
  assert.deepEqual(tokenize("Do you mind if I sit here?"), ['Do', 'you', 'mind', 'if', 'I', 'sit', 'here']);
});

test('isSentenceCorrect: 대소문자·문장부호 무시', () => {
  assert.ok(isSentenceCorrect(['do', 'you', 'mind', 'if', 'I', 'sit', 'here'], 'Do you mind if I sit here?'));
  assert.ok(isSentenceCorrect(['Sorry', "I'm", 'late'], "Sorry, I'm late."));
  assert.ok(!isSentenceCorrect(['you', 'do', 'mind'], 'Do you mind?'));
});
