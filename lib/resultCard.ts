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
  "잘게 갈림",
  "반쯤 씹힘 (재파쇄 권장)",
  "아직 질김",
  "이빨에 꼈다 빠짐",
  "흔적 없이 사라짐",
  "감정 찌꺼기 남음",
  "빠각 완료, 단 여운 있음",
  "강제 분쇄됨",
  "눌려서 납작해짐",
] as const;

// ─── AI 판정 ──────────────────────────────────────────────
const VERDICTS = [
  "이 감정은 생각보다 질겼음.",
  "분노가 이빨 사이에 꼈음.",
  "서운함은 완전히 분해되지 않았음.",
  "오늘의 마음은 재활용 불가.",
  "혼자 참기엔 유통기한이 지났음.",
  "감정이 오래 묵었음. 10년산 추정.",
  "이 감정은 씹다 보니 맵더라.",
  "뭔가 더 있는 것 같은데 일단 완료.",
  "직장인 특유의 맛이 남.",
  "묵힌 감정이라 씹기 불편했음.",
] as const;

// ─── 우걱이 코멘트 ────────────────────────────────────────
const MACHINE_COMMENTS = [
  "우걱… 오늘 건 좀 질겼음.",
  "서운함 아직 이빨 사이에 있음.",
  "혼자 참기엔 너무 오래 묵혔음.",
  "감정 찌꺼기 조금 남아있음.",
  "오래된 감정이라 이빨에 꼈음.",
  "생각보다 탱탱했음.",
  "씹다가 매웠는데 결국 빠각.",
  "다음엔 더 빨리 가져와도 됨.",
  "이거 뭔가 아직 덜 씹힌 느낌인데 일단 완료.",
  "내일 또 가져오면 또 씹어줌.",
  "이 감정 이상한 맛 났음. 아무튼 완료.",
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

const STAMPS = [
  "질김", "눅눅함", "빠각 완료", "재파쇄", "감정 과식", "소화 실패", "이빨에 꼈음", "묵은 감정",
] as const;

const UG_MEMOS = [
  "이건 좀 매웠음",
  "다음엔 빨리 버리셈",
  "씹는데 오래 걸렸음",
  "좀 더 일찍 가져왔음 됐는데",
  "이거 이상한 맛 남",
  "씹다가 이빨에 꼈음",
  "묵은 감정이라 거의 돌덩이였음",
  "처리 완료긴 한데 별로였음",
] as const;

const BIZARRE_STATS_POOL = [
  { label: "감정 눅눅함",        value: "84%" },
  { label: "사회생활 찌꺼기",    value: "39%" },
  { label: "현타 농도",          value: "위험" },
  { label: "우울 숙성도",        value: "92%" },
  { label: "억울함 농도",        value: "67%" },
  { label: "멘탈 수분 함량",     value: "8%" },
  { label: "분노 발효도",        value: "77%" },
  { label: "허무함 축적량",      value: "초과" },
  { label: "귀찮음 포화도",      value: "88%" },
  { label: "혼자 참은 시간",     value: "너무 오래" },
  { label: "감정 곰팡이 지수",   value: "63%" },
  { label: "질긴 감정 섬유질",   value: "다량" },
] as const;

const RESULT_GRADES = [
  "빠각 완료",
  "질겅 처리중",
  "소화 실패",
  "감정 찌꺼기 남음",
  "재파쇄 권장",
  "이빨에 꼈음",
  "부분 분해 완료",
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
  // 새 필드
  cardStyle: 1 | 2 | 3 | 4 | 5 | 6;
  stamp: string;
  ugMemo: string;
  resultGrade: string;
  bizarreStats: { label: string; value: string }[];
}

export function generateResult(emotions: string[], seed?: number): ResultData {
  const s   = seed ?? (Date.now() % 999983);
  const rng = seededRng(s);
  const now = new Date();
  const date = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, "0")}.${String(now.getDate()).padStart(2, "0")}`;
  const serial    = String(s).padStart(5, "0").slice(-5);
  const wasteCode = `EMO-${String(Math.floor(rng() * 9000) + 1000)}-${["A","B","C","D"][Math.floor(rng() * 4)]}`;
  const intensity = Math.min(98, Math.max(31, 45 + emotions.length * 8 + Math.floor((rng() - 0.5) * 32)));

  // 이상한 수치 2-3개 랜덤 선택
  const statPool = [...BIZARRE_STATS_POOL].sort(() => rng() - 0.5);
  const bizarreStats = statPool.slice(0, 2 + Math.floor(rng() * 2));

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
    // 12% 확률로 소화 멈춤 스타일(6)
  // 12% 확률로 소화 멈춤 스타일(6), 나머지는 1-5 중 랜덤
  cardStyle:      (rng() < 0.12 ? 6 : (Math.floor(rng() * 5) + 1)) as 1|2|3|4|5|6,
    stamp:          pick(STAMPS,            rng),
    ugMemo:         pick(UG_MEMOS,          rng),
    resultGrade:    pick(RESULT_GRADES,     rng),
    bizarreStats,
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
