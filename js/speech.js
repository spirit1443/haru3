// 브라우저 내장 TTS로 영어 발음 듣기
export const canSpeak = typeof window !== 'undefined' && 'speechSynthesis' in window;

export function speak(text) {
  if (!canSpeak) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-US';
  u.rate = 0.9;
  const voice = speechSynthesis.getVoices().find((v) => v.lang === 'en-US');
  if (voice) u.voice = voice;
  speechSynthesis.speak(u);
}
