// 오늘의 세트와 연속 학습일 계산. 진도는 날짜가 아니라 순서 기준이다.

export const WORDS_PER_DAY = 3;

export function initialState() {
  return {
    version: 1,
    lastDate: null,
    wordIndex: 0,
    patternIndex: 0,
    done: { words: false, sentences: false },
    wrongWords: {},
    wrongSentences: {},
    streak: 0,
    lastDoneDate: null,
    speechRate: 0.8,
  };
}

export function localDateStr(d = new Date()) {
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

export function prevDate(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  return localDateStr(new Date(y, m - 1, d - 1));
}

// 날짜가 바뀌었으면, 완료한 카테고리만 다음 세트로 넘긴다
export function ensureToday(state, dateStr, wordCount, patternCount) {
  if (state.lastDate === dateStr) return state;
  const s = { ...state, done: { words: false, sentences: false }, lastDate: dateStr };
  if (state.lastDate !== null) {
    if (state.done.words) s.wordIndex = (state.wordIndex + WORDS_PER_DAY) % wordCount;
    if (state.done.sentences) s.patternIndex = (state.patternIndex + 1) % patternCount;
  }
  return s;
}

export function markDone(state, category, dateStr) {
  let streak = state.streak;
  if (state.lastDoneDate !== dateStr) {
    streak = state.lastDoneDate === prevDate(dateStr) ? streak + 1 : 1;
  }
  return { ...state, done: { ...state.done, [category]: true }, streak, lastDoneDate: dateStr };
}

// 어제나 오늘 학습했을 때만 연속 기록이 살아 있다
export function currentStreak(state, dateStr) {
  if (state.lastDoneDate === dateStr || state.lastDoneDate === prevDate(dateStr)) return state.streak;
  return 0;
}
