// 기록은 이 브라우저의 localStorage에만 저장된다. 접근이 막혀도 앱은 동작해야 한다.
import { initialState } from './daily.js';

const KEY = 'haru3.state.v1';

export function loadState() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...initialState(), ...JSON.parse(raw) };
  } catch { /* 저장소 접근 불가 또는 손상된 데이터 */ }
  return initialState();
}

export function saveState(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch { /* 사생활 보호 모드 등 */ }
}
