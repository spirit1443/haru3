// 퀴즈 구성과 오답 목록 규칙. DOM에 의존하지 않는 순수 함수만 둔다.

export const MAX_QUESTIONS = 10;
export const GRADUATE_STREAK = 2; // 오답 목록에서 연속 N번 맞히면 졸업

// 테스트용 결정적 난수 (mulberry32)
export function seededRng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function shuffle(arr, rng = Math.random) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// 오늘 항목 + 오답 목록에서 랜덤으로 채워 최대 10문제
export function buildQuiz(todayIds, pool, rng = Math.random, max = MAX_QUESTIONS) {
  const today = new Set(todayIds);
  const review = shuffle(Object.keys(pool).filter((id) => !today.has(id)), rng)
    .slice(0, Math.max(0, max - todayIds.length));
  return shuffle([...todayIds, ...review], rng);
}

// 정답/오답을 오답 목록에 반영한 새 객체를 돌려준다
export function applyResult(pool, id, correct) {
  const next = { ...pool };
  if (!correct) {
    next[id] = 0;
  } else if (id in next) {
    next[id] += 1;
    if (next[id] >= GRADUATE_STREAK) delete next[id];
  }
  return next;
}

// 정답 1개 + 서로 다른 오답 보기 3개
export function makeChoices(answer, candidates, rng = Math.random, n = 4) {
  const others = shuffle([...new Set(candidates)].filter((c) => c !== answer), rng).slice(0, n - 1);
  return shuffle([answer, ...others], rng);
}

export function tokenize(sentence) {
  return sentence.trim().replace(/[.!?]+$/, '').split(/\s+/);
}

const normalize = (s) => s.toLowerCase().replace(/[^a-z0-9' ]/g, '').replace(/\s+/g, ' ').trim();

export function isSentenceCorrect(tokens, answer) {
  return normalize(tokens.join(' ')) === normalize(answer);
}
