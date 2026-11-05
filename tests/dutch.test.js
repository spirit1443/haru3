import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

// dutch.html 안의 계산 스크립트만 꺼내서 실행한다.
const html = readFileSync(new URL('../dutch.html', import.meta.url), 'utf8');
const src = html.match(/<script id="calc">([\s\S]*?)<\/script>/)[1];
const ctx = {};
vm.runInNewContext(src + '; this.calcRound = calcRound; this.calcAll = calcAll;', ctx);
const { calcRound, calcAll } = ctx;

// 남자 4명×40,000 + 여자 3명×20,000 = 220,000원 걷고 187,000원 결제 → 33,000원 남음
const base = { m: 4, mAmt: 40000, w: 3, wAmt: 20000, bill: 187000 };

test('남은 돈 계산', () => {
  const x = calcRound({ ...base, split: 'eq' });
  assert.equal(x.collected, 220000);
  assert.equal(x.left, 33000);
});

test('남자만 환급: 8,250원 → 8,000원으로 내림, 나머지는 총무 몫', () => {
  const x = calcRound({ ...base, split: 'm' });
  assert.equal(x.mRefund, 8000);
  assert.equal(x.wRefund, 0);
  assert.equal(x.mNet, 32000);
  assert.equal(x.wNet, 20000);
  assert.equal(x.keep, 1000);
});

test('남녀 같게 환급: 4,714원 → 4,000원', () => {
  const x = calcRound({ ...base, split: 'eq' });
  assert.equal(x.mRefund, 4000);
  assert.equal(x.wRefund, 4000);
  assert.equal(x.refunded, 28000);
  assert.equal(x.keep, 5000);
});

test('남녀 낸 비율대로 환급: 2 대 1', () => {
  const x = calcRound({ ...base, split: 'ratio' });
  assert.equal(x.mRefund, 6000);
  assert.equal(x.wRefund, 3000);
  assert.equal(x.keep, 0);
});

test('여자만 환급', () => {
  const x = calcRound({ ...base, split: 'w' });
  assert.equal(x.wRefund, 11000);
  assert.equal(x.wNet, 9000);
  assert.equal(x.keep, 0);
});

test('돈이 모자라면 경고만', () => {
  const x = calcRound({ ...base, bill: 230000, split: 'eq' });
  assert.equal(x.error, '10000원 모자라요');
  assert.equal(x.mRefund, undefined);
});

test('돌려받을 사람이 없으면 경고', () => {
  assert.match(calcRound({ ...base, w: 0, bill: 150000, split: 'w' }).error, /여자가 없어요/);
});

test('남은 돈이 0이면 환급 없음', () => {
  const x = calcRound({ ...base, bill: 220000, split: 'm' });
  assert.equal(x.mRefund, 0);
  assert.equal(x.keep, 0);
});

test('다음 차수로 이월', () => {
  const s = calcAll([
    { ...base, mode: 'carry', split: 'eq' },
    { m: 4, mAmt: 10000, w: 3, wAmt: 5000, bill: 60000, split: 'eq' },
  ]);
  assert.ok(s.ok);
  const [r1, r2] = s.results;
  assert.equal(r1.carryOut, 33000);
  assert.equal(r1.mNet, 40000);
  assert.equal(r2.carryIn, 33000);
  assert.equal(r2.left, 55000 + 33000 - 60000);
  assert.equal(r2.mRefund, 4000);
  assert.equal(s.mTotal, 40000 + 6000);
  assert.equal(s.wTotal, 20000 + 1000);
  assert.equal(s.keep, 0);
});

test('이월금만으로 2차 결제', () => {
  const s = calcAll([
    { ...base, mode: 'carry' },
    { m: 4, w: 3, bill: 30000, split: 'eq' },
  ]);
  assert.equal(s.results[1].left, 3000);
  assert.equal(s.results[1].keep, 3000);
});

test('마지막 차수의 이월 선택은 환급으로 처리', () => {
  const x = calcAll([{ ...base, mode: 'carry', split: 'eq' }]).results[0];
  assert.equal(x.mode, 'refund');
  assert.equal(x.mRefund, 4000);
});
