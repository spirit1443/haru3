import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

// gonggu.html 안의 계산 스크립트만 꺼내서 실행한다.
const html = readFileSync(new URL('../gonggu.html', import.meta.url), 'utf8');
const src = html.match(/<script id="calc">([\s\S]*?)<\/script>/)[1];
const ctx = {};
vm.runInNewContext(src + '; this.calcItem = calcItem; this.calcAll = calcAll;', ctx);
const { calcItem, calcAll } = ctx;

test('10,000원 팔면 1,500원: 매출 2,340,000원 → 351,000원', () => {
  const x = calcItem({ sellBase: 10000, receive: 1500, sales: 2340000 });
  assert.equal(x.rate, 0.15);
  assert.equal(x.earn, 351000);
});

test('원 미만은 버림', () => {
  assert.equal(calcItem({ sellBase: 30000, receive: 1000, sales: 50000 }).earn, 1666);
});

test('문자열과 빈칸 입력', () => {
  assert.equal(calcItem({ sellBase: '10000', receive: '1500', sales: '' }).earn, 0);
});

test('세금 3.3%는 10원 미만 버림', () => {
  const s = calcAll([{ sellBase: 10000, receive: 1500, sales: 2340000 }], true);
  assert.equal(s.tax, 11580);
  assert.equal(s.net, 339420);
});

test('세금 끄면 실수령액 = 번 돈', () => {
  const s = calcAll([{ sellBase: 10000, receive: 1500, sales: 2340000 }], false);
  assert.equal(s.tax, 0);
  assert.equal(s.net, 351000);
});

test('상품 여러 개 합계', () => {
  const s = calcAll([
    { sellBase: 10000, receive: 1500, sales: 2340000 },
    { sellBase: 10000, receive: 2000, sales: 1000000 },
  ], false);
  assert.equal(s.sales, 3340000);
  assert.equal(s.earn, 551000);
});

test('기준 금액이 없으면 경고, 합계에서 제외', () => {
  const s = calcAll([
    { sellBase: '', receive: 1500, sales: 100000 },
    { sellBase: 10000, receive: 1000, sales: 100000 },
  ], false);
  assert.match(s.results[0].error, /판매 기준/);
  assert.equal(s.ok, false);
  assert.equal(s.earn, 10000);
});

test('완전히 빈 상품은 경고 없음', () => {
  assert.equal(calcItem({ sellBase: '', receive: '', sales: '' }).error, undefined);
});

test('받는 돈이 판매액보다 크면 안내', () => {
  assert.match(calcItem({ sellBase: 1000, receive: 2000, sales: 1000 }).notice, /판매액보다/);
});
