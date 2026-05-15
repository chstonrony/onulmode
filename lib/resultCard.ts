function seededRng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}
function pick<T>(arr: readonly T[], rng: () => number): T {
  return arr[Math.floor(rng() * arr.length)];
}

const EXTRA_POOL = [
  "현타", "번아웃", "허무함", "외로움", "서운함",
  "막막함", "억울함", "무기력", "짜증", "불안감",
  "자책", "질림", "후회", "피곤함", "속상함", "답답함",
] as const;

export function generateIngredients(inputs: string[], rng: () => number) {
  const base  = inputs.slice(0, 2);
  const extra = pick(EXTRA_POOL, rng);
  const labels = [...new Set([...base, extra])].slice(0, 3);
  const r1 = Math.floor(rng() * 30 + 30);
  const r2 = Math.floor(rng() * 25 + 20);
  const r3 = Math.max(100 - r1 - r2, 5);
  return labels.map((label, i) => ({ label, pct: [r1, r2, r3][i] ?? 10 }));
}

// ── AI 판정 — 공유하고 싶어지는 병맛 ──────────────────────
const VERDICTS = [
  "오늘의 멘탈: 눅눅한 편의점 도시락 수준",
  "감정 상태: 재활용 불가 판정",
  "직장인 혈중 허무도: 임계치 초과",
  "인간관계 피로도: 회복 불명 상태",
  "뇌 용량 89%가 감정으로 낭비 중",
  "현 상태로 카톡 보내면 후회 가능성 91%",
  "오늘 당신은 국가 보호 대상임",
  "감정 잔류물: 씻지 않은 헬스 양말 수준",
  "사회성 현황: 임시 수리 중 (언제 완료될지 모름)",
  "퇴사 충동지수: 차트 초과로 측정 불가",
  "AI 판정: 그냥 힘든 거임, 네 탓 아님",
  "뇌 메모리 99%: 안 중요한 걱정으로 점유됨",
] as const;

// ── 잔류 감정 — 짧고 웃김 ─────────────────────────────────
const RESIDUALS = [
  "쉰내 나는 억울함 0.3g",
  "아직 덜 식은 분노 잔열",
  "퇴근 5분 전 허무감 농축액",
  "영수증 없는 짜증 2개",
  "정체 모를 찝찝함 (출처 불명)",
  "충전 중 방전된 멘탈 조각",
  "어젯밤 후회 잔여물 (재활용 불가)",
  "유통기한 지난 설렘 찌꺼기",
  "이름 모를 서운함 파편 3개",
  "퇴사 직전 감정 비슷한 것 약간",
] as const;

// ── 오늘의 처방 — 위로 아닌 공감 ────────────────────────────
const PRESCRIPTIONS = [
  "오늘은 치킨 먹고 자도 됨 (처방전)",
  "퇴근 후 유튜브 3시간 — 의학적 권고",
  "지금 먹고 싶은 거 하나 먹어 (진지하게)",
  "내일 일은 내일의 나한테 미뤄도 됨",
  "이불 속 5분 더 — 건강보험 미적용이지만 권장",
  "오늘은 착하게 살지 않아도 됨",
  "눈 감고 10초만 있어봐. 그게 다야.",
  "충전 필요: 좋아하는 노래 1곡 재생",
  "지금 이 상태, 완전히 정상임",
  "스스로한테 '오늘도 수고했어' 라고 말해줘",
  "지금 당장 아무것도 안 해도 됨",
  "이 정도면 꽤 버틴 거야, 진짜로",
] as const;

export interface ResultData {
  date: string;
  ingredients: { label: string; pct: number }[];
  intensity: number;
  residual: string;
  verdict: string;
  prescription: string;
  seed: number;
  serial: string;
  wasteCode: string;  // 폐기 코드
}

export function generateResult(emotions: string[], seed?: number): ResultData {
  const s   = seed ?? (Date.now() % 999983);
  const rng = seededRng(s);
  const now = new Date();
  const date = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, "0")}.${String(now.getDate()).padStart(2, "0")}`;
  const serial    = String(s).padStart(5, "0").slice(-5);
  const wasteCode = `EMO-${String(Math.floor(rng() * 9000) + 1000)}-${["A","B","C","D"][Math.floor(rng() * 4)]}`;

  const intensity = Math.min(98, Math.max(31,
    45 + emotions.length * 8 + Math.floor((rng() - 0.5) * 32)
  ));

  return {
    date, serial, wasteCode,
    ingredients: generateIngredients(emotions.length ? emotions : ["감정"], rng),
    intensity,
    residual:     pick(RESIDUALS,     rng),
    verdict:      pick(VERDICTS,      rng),
    prescription: pick(PRESCRIPTIONS, rng),
    seed: s,
  };
}

export function buildResultUrl(emotions: string[], seed: number): string {
  return `/result?${new URLSearchParams({ e: emotions.join("|"), s: String(seed) })}`;
}

export function parseResultUrl(search: string): { emotions: string[]; seed: number } | null {
  try {
    const p = new URLSearchParams(search);
    const e = p.get("e"); const s = p.get("s");
    if (!e || !s) return null;
    return { emotions: e.split("|").filter(Boolean), seed: Number(s) };
  } catch { return null; }
}
