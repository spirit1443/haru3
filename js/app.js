import { WORDS } from '../data/words.js';
import { PATTERNS } from '../data/patterns.js';
import { ensureToday, markDone, currentStreak, localDateStr, WORDS_PER_DAY } from './daily.js';
import { buildQuiz, applyResult, makeChoices, tokenize, isSentenceCorrect, shuffle } from './quiz.js';
import { loadState, saveState } from './storage.js';
import { speak, canSpeak } from './speech.js';

const wordById = new Map(WORDS.map((w) => [w.id, w]));
const exampleById = new Map(PATTERNS.flatMap((p) => p.examples.map((e) => [e.id, { ...e, pattern: p.pattern }])));

// ?date=YYYY-MM-DD 로 날짜를 바꿔 테스트할 수 있다
const dateParam = new URLSearchParams(location.search).get('date');
const TODAY = /^\d{4}-\d{2}-\d{2}$/.test(dateParam ?? '') ? dateParam : localDateStr();

const keepKnown = (pool, known) => Object.fromEntries(Object.entries(pool).filter(([id]) => known.has(id)));

let state = loadState();
state = ensureToday(state, TODAY, WORDS.length, PATTERNS.length);
state = {
  ...state,
  wrongWords: keepKnown(state.wrongWords, wordById),
  wrongSentences: keepKnown(state.wrongSentences, exampleById),
};
saveState(state);

function commit(next) {
  state = next;
  saveState(state);
}

const todayWords = () => Array.from({ length: WORDS_PER_DAY }, (_, k) => WORDS[(state.wordIndex + k) % WORDS.length]);
const todayPattern = () => PATTERNS[state.patternIndex % PATTERNS.length];

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const speakBtn = (text, label = '발음 듣기') =>
  canSpeak ? `<button class="speak" data-action="speak" data-text="${esc(text)}" aria-label="${label}">${ICON_SPEAKER}</button>` : '';

const ICON_SPEAKER = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor"/><path d="M16 8.5a4.5 4.5 0 0 1 0 7M18.5 6a8 8 0 0 1 0 12" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/></svg>';
const ICON_BACK = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M15 5l-7 7 7 7" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';

function formatDate(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const day = '일월화수목금토'[new Date(y, m - 1, d).getDay()];
  return `${m}월 ${d}일 ${day}요일`;
}

const app = document.getElementById('app');
let view = { name: 'home' };

function go(next) {
  view = next;
  render();
  window.scrollTo(0, 0);
}

function nav(title, backAction = 'home') {
  return `<nav class="bar"><button class="icon-btn" data-action="${backAction}" aria-label="뒤로">${ICON_BACK}</button><span class="bar-title">${title}</span><span class="bar-spacer"></span></nav>`;
}

// ---------- 화면 ----------

function homeView() {
  const words = todayWords();
  const p = todayPattern();
  const streak = currentStreak(state, TODAY);
  const day = Math.floor(state.wordIndex / WORDS_PER_DAY) + 1;
  const totalDays = Math.ceil(WORDS.length / WORDS_PER_DAY);
  const wrongW = Object.keys(state.wrongWords).length;
  const wrongS = Object.keys(state.wrongSentences).length;
  const badge = (done) => (done ? '<span class="badge done">오늘 완료</span>' : '<span class="badge">시작하기</span>');
  return `
    <header class="home-head">
      <div>
        <p class="eyebrow">${formatDate(TODAY)}</p>
        <h1>하루에 세 단어</h1>
      </div>
      <div class="streak ${streak ? 'on' : ''}" aria-label="연속 학습 ${streak}일"><span>${streak}</span>일 연속</div>
    </header>

    <button class="card home-card" data-action="learn-words">
      <div class="card-top"><span class="label">오늘의 단어 · Day ${day}/${totalDays}</span>${badge(state.done.words)}</div>
      <ul class="word-preview">${words.map((w) => `<li>${esc(w.en)}</li>`).join('')}</ul>
      <p class="meta">${wrongW ? `복습할 단어 ${wrongW}개가 퀴즈에 섞여 나와요` : '틀린 단어는 다음 퀴즈에 다시 나와요'}</p>
    </button>

    <button class="card home-card" data-action="learn-sentences">
      <div class="card-top"><span class="label">오늘의 문장</span>${badge(state.done.sentences)}</div>
      <p class="pattern-preview">${esc(p.pattern)}</p>
      <p class="pattern-meaning">${esc(p.meaning)}</p>
      <p class="meta">${wrongS ? `복습할 문장 ${wrongS}개가 퀴즈에 섞여 나와요` : '상황별 예문 3개로 패턴을 익혀요'}</p>
    </button>

    ${state.done.words && state.done.sentences ? '<p class="footnote">오늘 분량을 다 끝냈어요. 내일 새 단어가 기다려요.</p>' : ''}
  `;
}

function learnWordsView() {
  const words = todayWords();
  const w = words[view.i];
  const last = view.i === words.length - 1;
  return `
    ${nav(`오늘의 단어 ${view.i + 1}/${words.length}`)}
    <article class="study-card">
      <p class="pos">${esc(w.pos)}</p>
      <div class="word-row"><h2 class="word">${esc(w.en)}</h2>${speakBtn(w.en)}</div>
      <p class="ko">${esc(w.ko)}</p>
      <div class="example">
        <div class="example-row"><p class="en">${esc(w.example)}</p>${speakBtn(w.example, '예문 듣기')}</div>
        <p class="kr">${esc(w.exampleKo)}</p>
      </div>
    </article>
    <div class="dots" aria-hidden="true">${words.map((_, k) => `<span class="${k === view.i ? 'on' : ''}"></span>`).join('')}</div>
    <div class="actions">
      <button class="btn ghost" data-action="word-prev" ${view.i === 0 ? 'disabled' : ''}>이전</button>
      <button class="btn primary" data-action="${last ? 'quiz-words' : 'word-next'}">${last ? '퀴즈 풀기' : '다음'}</button>
    </div>
  `;
}

function learnSentencesView() {
  const p = todayPattern();
  return `
    ${nav('오늘의 문장')}
    <article class="study-card pattern-card">
      <p class="pos">오늘의 패턴</p>
      <h2 class="pattern">${esc(p.pattern)}</h2>
      <p class="ko">${esc(p.meaning)}</p>
      <p class="tip">${esc(p.tip)}</p>
    </article>
    <ol class="examples">
      ${p.examples.map((e) => `
        <li>
          <span class="situation">${esc(e.situation)}</span>
          <div class="example-row"><p class="en">${esc(e.en)}</p>${speakBtn(e.en, '예문 듣기')}</div>
          <p class="kr">${esc(e.ko)}</p>
        </li>`).join('')}
    </ol>
    <div class="actions single"><button class="btn primary" data-action="quiz-sentences">퀴즈 풀기</button></div>
  `;
}

function quizHeader() {
  const n = view.ids.length;
  const pct = Math.round((view.i / n) * 100);
  return `
    <nav class="bar">
      <button class="icon-btn" data-action="quit-quiz" aria-label="퀴즈 그만하기">${ICON_BACK}</button>
      <div class="progress" role="progressbar" aria-valuenow="${view.i}" aria-valuemax="${n}"><span style="width:${pct}%"></span></div>
      <span class="bar-count">${view.i + 1}/${n}</span>
    </nav>`;
}

function feedback(correct, body) {
  return `
    <div class="feedback ${correct ? 'good' : 'bad'}" role="status">
      <p class="fb-title">${correct ? '정답이에요' : '다음 퀴즈에 다시 나와요'}</p>
      ${body}
    </div>
    <div class="actions single"><button class="btn primary" data-action="next-q" autofocus>${view.i === view.ids.length - 1 ? '결과 보기' : '다음 문제'}</button></div>`;
}

function wordQuizView() {
  const id = view.ids[view.i];
  const w = wordById.get(id);
  const review = !view.todayIds.includes(id);
  const a = view.answered;
  return `
    ${quizHeader()}
    <section class="question">
      ${review ? '<span class="tag">복습</span>' : ''}
      <div class="word-row center"><h2 class="word">${esc(w.en)}</h2>${speakBtn(w.en)}</div>
      <p class="q-hint">알맞은 뜻을 고르세요</p>
    </section>
    <div class="choices">
      ${view.choices.map((c, k) => {
        let cls = '';
        if (a) cls = c === w.ko ? 'correct' : k === a.pick ? 'wrong' : 'dim';
        return `<button class="choice ${cls}" data-action="choose" data-k="${k}" ${a ? 'disabled' : ''}>${esc(c)}</button>`;
      }).join('')}
    </div>
    ${a ? feedback(a.correct, `<div class="example-row"><p class="en">${esc(w.example)}</p>${speakBtn(w.example, '예문 듣기')}</div><p class="kr">${esc(w.exampleKo)}</p>`) : ''}
  `;
}

function sentenceQuizView() {
  const id = view.ids[view.i];
  const e = exampleById.get(id);
  const review = !view.todayIds.includes(id);
  const a = view.answered;
  const placed = view.picked.map((bi) => view.bank[bi]);
  return `
    ${quizHeader()}
    <section class="question">
      ${review ? '<span class="tag">복습</span>' : ''}
      <span class="situation">${esc(e.situation)}</span>
      <p class="q-ko">${esc(e.ko)}</p>
      <p class="q-hint">단어 조각을 순서대로 눌러 영어 문장을 만드세요</p>
    </section>
    <div class="answer-line ${a ? (a.correct ? 'correct' : 'wrong') : ''}" aria-label="내가 만든 문장">
      ${placed.length ? view.picked.map((bi, k) => `<button class="chip" data-action="unpick" data-k="${k}" ${a ? 'disabled' : ''}>${esc(view.bank[bi])}</button>`).join('') : '<span class="placeholder">여기에 문장이 만들어져요</span>'}
    </div>
    ${a ? '' : `
      <div class="bank">
        ${view.bank.map((t, bi) => `<button class="chip" data-action="pick" data-bi="${bi}" ${view.picked.includes(bi) ? 'disabled data-used' : ''}>${esc(t)}</button>`).join('')}
      </div>
      <div class="actions">
        <button class="btn ghost" data-action="reset-chips" ${view.picked.length ? '' : 'disabled'}>다시 놓기</button>
        <button class="btn primary" data-action="check-sentence" ${view.picked.length === view.bank.length ? '' : 'disabled'}>확인</button>
      </div>`}
    ${a ? feedback(a.correct, `<p class="fb-label">정답 문장</p><div class="example-row"><p class="en">${esc(e.en)}</p>${speakBtn(e.en, '정답 문장 듣기')}</div><p class="kr">패턴: ${esc(e.pattern)}</p>`) : ''}
  `;
}

function resultView() {
  const { total, correct, wrongIds, type } = view;
  const perfect = correct === total;
  const item = (id) => {
    if (type === 'words') {
      const w = wordById.get(id);
      return `<li><strong>${esc(w.en)}</strong><span>${esc(w.ko)}</span></li>`;
    }
    const e = exampleById.get(id);
    return `<li><strong>${esc(e.en)}</strong><span>${esc(e.ko)}</span></li>`;
  };
  return `
    ${nav('결과')}
    <section class="result">
      <p class="score"><span>${correct}</span> / ${total}</p>
      <p class="result-msg">${perfect ? '모두 맞혔어요!' : `틀린 ${wrongIds.length}개는 다음 퀴즈에 다시 나와요.`}</p>
    </section>
    ${wrongIds.length ? `<h3 class="section-title">다시 볼 ${type === 'words' ? '단어' : '문장'}</h3><ul class="review-list">${wrongIds.map(item).join('')}</ul>` : ''}
    <div class="actions">
      <button class="btn ghost" data-action="${type === 'words' ? 'quiz-words' : 'quiz-sentences'}">다시 풀기</button>
      <button class="btn primary" data-action="home">홈으로</button>
    </div>
  `;
}

const VIEWS = {
  home: homeView,
  learnWords: learnWordsView,
  learnSentences: learnSentencesView,
  quiz: () => (view.type === 'words' ? wordQuizView() : sentenceQuizView()),
  result: resultView,
};

function render() {
  app.innerHTML = VIEWS[view.name]();
  app.querySelector('[autofocus]')?.focus({ preventScroll: true });
}

// ---------- 퀴즈 진행 ----------

function scrambled(tokens) {
  if (tokens.length < 2) return tokens;
  for (let t = 0; t < 10; t++) {
    const s = shuffle(tokens);
    if (s.join(' ') !== tokens.join(' ')) return s;
  }
  return [...tokens].reverse();
}

function prepareQuestion(v) {
  const id = v.ids[v.i];
  if (v.type === 'words') {
    return { ...v, answered: null, choices: makeChoices(wordById.get(id).ko, WORDS.map((w) => w.ko)) };
  }
  return { ...v, answered: null, bank: scrambled(tokenize(exampleById.get(id).en)), picked: [] };
}

function startQuiz(type) {
  const todayIds = type === 'words' ? todayWords().map((w) => w.id) : todayPattern().examples.map((e) => e.id);
  const pool = type === 'words' ? state.wrongWords : state.wrongSentences;
  const ids = buildQuiz(todayIds, pool);
  go(prepareQuestion({ name: 'quiz', type, todayIds, ids, i: 0, correct: 0, wrongIds: [] }));
}

function answer(correct) {
  const id = view.ids[view.i];
  const key = view.type === 'words' ? 'wrongWords' : 'wrongSentences';
  commit({ ...state, [key]: applyResult(state[key], id, correct) });
  view = {
    ...view,
    correct: view.correct + (correct ? 1 : 0),
    wrongIds: correct ? view.wrongIds : [...view.wrongIds, id],
  };
}

function nextQuestion() {
  if (view.i < view.ids.length - 1) {
    go(prepareQuestion({ ...view, i: view.i + 1 }));
    return;
  }
  commit(markDone(state, view.type, TODAY));
  go({ name: 'result', type: view.type, total: view.ids.length, correct: view.correct, wrongIds: view.wrongIds });
}

// ---------- 이벤트 ----------

app.addEventListener('click', (ev) => {
  const el = ev.target.closest('[data-action]');
  if (!el || el.disabled) return;
  switch (el.dataset.action) {
    case 'home': return go({ name: 'home' });
    case 'speak': return speak(el.dataset.text);
    case 'learn-words': return go({ name: 'learnWords', i: 0 });
    case 'word-prev': return go({ ...view, i: view.i - 1 });
    case 'word-next': return go({ ...view, i: view.i + 1 });
    case 'learn-sentences': return go({ name: 'learnSentences' });
    case 'quiz-words': return startQuiz('words');
    case 'quiz-sentences': return startQuiz('sentences');
    case 'quit-quiz':
      if (view.i === 0 && !view.answered) return go({ name: 'home' });
      if (confirm('퀴즈를 그만할까요? 지금까지 푼 문제는 기록돼요.')) go({ name: 'home' });
      return;
    case 'choose': {
      const k = Number(el.dataset.k);
      const correct = view.choices[k] === wordById.get(view.ids[view.i]).ko;
      answer(correct);
      view = { ...view, answered: { pick: k, correct } };
      return render();
    }
    case 'pick':
      view = { ...view, picked: [...view.picked, Number(el.dataset.bi)] };
      return render();
    case 'unpick':
      view = { ...view, picked: view.picked.filter((_, k) => k !== Number(el.dataset.k)) };
      return render();
    case 'reset-chips':
      view = { ...view, picked: [] };
      return render();
    case 'check-sentence': {
      const tokens = view.picked.map((bi) => view.bank[bi]);
      const correct = isSentenceCorrect(tokens, exampleById.get(view.ids[view.i]).en);
      answer(correct);
      view = { ...view, answered: { correct } };
      return render();
    }
    case 'next-q': return nextQuestion();
  }
});

render();

if ('serviceWorker' in navigator && location.protocol === 'https:') {
  navigator.serviceWorker.register('./sw.js');
}
