// 브라우저 내장 TTS로 영어 발음 듣기
export const canSpeak = typeof window !== 'undefined' && 'speechSynthesis' in window;

// 발음 속도 단계 (1 = 기본 속도)
export const RATES = [0.6, 0.8, 1, 1.2];
export const DEFAULT_RATE = 0.8;

export function nextRate(rate) {
  const i = RATES.indexOf(rate);
  return RATES[(i + 1) % RATES.length];
}

export function speak(text, rate = DEFAULT_RATE) {
  if (!canSpeak) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-US';
  u.rate = rate;
  const voice = speechSynthesis.getVoices().find((v) => v.lang === 'en-US');
  if (voice) u.voice = voice;
  speechSynthesis.speak(u);
}
