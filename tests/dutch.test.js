import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

// dutch.html 안의 계산 스크립트만 꺼내서 실행한다.
const html = readFileSync(new URL('../dutch.html', import.meta.url), 'utf8');
const src = html.match(/<script id="calc">([\s\S]*?)<\/script>/)[1];
const ctx = {};
vm.runInNewContext(src + '; this.calcRound = calcRound; this.summarize = summarize;', ctx);
const { calcRound, summarize } = ctx;

const base = { total: 200000, m: 4, mAmt: 30000, w: 3, wAmt: 20000 };

test('남은 금액을 남자끼리 나눔', () => {
  const x = calcRound({ ...base, split: 'm' });
  assert.equal(x.rest, 20000);
  assert.equal(x.mFinal, 35000);
  assert.equal(x.wFinal, 20000);
  assert.equal(x.surplus, 0);
});

test('남녀 모두 나누면 1,000원 단위로 올림', () => {
  const x = calcRound({ ...base, split: 'all' });
  assert.equal(x.extra, 3000);
  assert.equal(x.mFinal, 33000);
  assert.equal(x.wFinal, 23000);
  assert.equal(x.surplus, 1000);
});

test('여자끼리 나눔', () => {
  const x = calcRound({ ...base, split: 'w' });
  assert.equal(x.mFinal, 30000);
  assert.equal(x.wFinal, 27000);
  assert.equal(x.surplus, 1000);
});

test('남은 금액이 0이면 추가분 없음', () => {
  const x = calcRound({ ...base, total: 180000, split: 'all' });
  assert.equal(x.extra, 0);
  assert.equal(x.mFinal, 30000);
  assert.equal(x.surplus, 0);
});

test('설정 금액이 총액보다 크면 경고', () => {
  const x = calcRound({ ...base, total: 150000, split: 'all' });
  assert.match(x.error, /많아요/);
  assert.equal(x.mFinal, undefined);
});

test('나눌 사람이 없으면 경고', () => {
  const x = calcRound({ ...base, w: 0, split: 'w' });
  assert.match(x.error, /나눌 사람/);
});

test('빈칸과 문자열 입력은 숫자로 처리', () => {
  const x = calcRound({ total: '100000', m: '2', mAmt: '', w: '', wAmt: '', split: 'm' });
  assert.equal(x.mFinal, 50000);
});

test('여러 차수 합산', () => {
  const s = summarize([
    { ...base, split: 'all' },
    { total: 60000, m: 3, mAmt: 10000, w: 2, wAmt: 5000, split: 'm' },
  ]);
  assert.ok(s.ok);
  // 2차: 남은 20,000원을 남자 3명이 나눔 → 6,667원 → 7,000원으로 올림
  assert.equal(s.mTotal, 33000 + 17000);
  assert.equal(s.wTotal, 23000 + 5000);
  assert.equal(s.surplus, 1000 + 1000);
});
