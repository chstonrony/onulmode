function seededRng(seed: number) {
  let s = seed;
  return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
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

// ─── 파쇄 상태 ────────────────────────────────────────────
const SHRED_STATUSES = [
  "잘게 갈림 ✓",
  "반쯤 씹힘 (재파쇄 권장)",
  "아직 질김 — 추가 처리 필요",
  "너무 눅눅해서 재파쇄 필요",
  "흔적 없이 사라짐",
  "감정 찌꺼기 17% 남음",
  "파쇄 완료, 단 여운 있음",
  "위험 수위 감정 → 강제 분쇄",
  "눌러서 납작하게 만듦",
] as const;

// ─── AI 병맛 판정 ──────────────────────────────────────────
const VERDICTS = [
  "이 감정은 생각보다 질겼습니다.",
  "분노가 이빨 사이에 꼈습니다.",
  "서운함은 완전히 분해되지 않았습니다.",
  "오늘의 마음은 재활용 불가입니다.",
  "혼자 참기에는 유통기한이 지났습니다.",
  "감정 섬유질이 너무 많아 걸렸음.",
  "이 감정은 씹다 보니 맵더라고요.",
  "뭔가 더 있는 것 같은데 일단 처리 완료.",
  "감정이 묵었습니다. 10년산 추정.",
  "직장인 특유의 맛이 납니다.",
] as const;

// ─── 파쇄기 코멘트 (캐릭터 있게) ─────────────────────────────
const MACHINE_COMMENTS = [
  "우걱이: 우걱우걱… 이건 좀 매웠다.",
  "우걱이: 다음엔 더 빨리 넣어주세요.",
  "우걱이: 이 감정, 오래 묵혔네요.",
  "우걱이: 내일도 가져오세요. 제가 씹어드림.",
  "우걱이: 생각보다 탱탱했습니다.",
  "우걱이: 씹다가 맵기도 했는데 빠각 완료.",
  "우걱이: 이 감정엔 이상한 맛이 납니다.",
  "우걱이: 혼자 들고 다니기엔 너무 무거웠죠?",
  "우걱이: 10초 걸렸음. 오래된 거 맞죠?",
  "우걱이: 이거 진짜 단단했는데 결국 갈았음.",
  "우걱이: 저도 좀 힘들었는데 아무튼 빠각.",
] as const;

// ─── 결과 등급 ────────────────────────────────────────────
const GRADES = [
  { text: "빠각 완료",       sub: "우걱이가 다 씹어먹음" },
  { text: "반빠각 완료",     sub: "찌꺼기 남음 — 재투입 권장" },
  { text: "빠각 실패",       sub: "너무 질겨서 우걱이도 포기" },
  { text: "오늘은 그냥 누워있기", sub: "우걱이 처방" },
  { text: "완전 빠각",       sub: "흔적 없이 갈렸음" },
  { text: "강제 빠각",       sub: "질겼지만 우걱이가 억지로 처리" },
  { text: "위험 감정 빠각",  sub: "우걱이도 매웠다고 함" },
] as const;

// ─── 오늘의 처방 ──────────────────────────────────────────
const PRESCRIPTIONS = [
  "오늘은 치킨 먹고 자도 됨 (처방전)",
  "퇴근 후 유튜브 3시간 — 의학적 권고",
  "지금 먹고 싶은 거 하나 먹어 (진지하게)",
  "내일 일은 내일의 나한테 미뤄도 됨",
  "이불 속 5분 더 — 권장",
  "오늘은 착하게 살지 않아도 됨",
  "눈 감고 10초만. 그게 다야.",
  "좋아하는 노래 1곡 재생하기",
  "지금 이 상태, 완전히 정상임",
  "오늘은 여기까지만 해도 됨",
  "이 정도면 꽤 버틴 거야, 진짜로",
] as const;

export interface ResultData {
  date: string;
  serial: string;
  wasteCode: string;
  ingredients: { label: string; pct: number }[];
  intensity: number;
  shredStatus: string;
  verdict: string;
  machineComment: string;
  grade: { text: string; sub: string };
  prescription: string;
  seed: number;
}

export function generateResult(emotions: string[], seed?: number): ResultData {
  const s   = seed ?? (Date.now() % 999983);
  const rng = seededRng(s);
  const now = new Date();
  const date = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, "0")}.${String(now.getDate()).padStart(2, "0")}`;
  const serial    = String(s).padStart(5, "0").slice(-5);
  const wasteCode = `EMO-${String(Math.floor(rng() * 9000) + 1000)}-${["A","B","C","D"][Math.floor(rng() * 4)]}`;
  const intensity = Math.min(98, Math.max(31, 45 + emotions.length * 8 + Math.floor((rng() - 0.5) * 32)));

  return {
    date, serial, wasteCode,
    ingredients:    generateIngredients(emotions.length ? emotions : ["감정"], rng),
    intensity,
    shredStatus:    pick(SHRED_STATUSES,    rng),
    verdict:        pick(VERDICTS,          rng),
    machineComment: pick(MACHINE_COMMENTS,  rng),
    grade:          pick(GRADES,            rng),
    prescription:   pick(PRESCRIPTIONS,    rng),
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
