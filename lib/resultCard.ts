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
  const base = inputs.slice(0, 2);
  const extra = pick(EXTRA_POOL, rng);
  const labels = [...new Set([...base, extra])].slice(0, 3);
  const r1 = Math.floor(rng() * 30 + 30);
  const r2 = Math.floor(rng() * 25 + 20);
  const r3 = Math.max(100 - r1 - r2, 5);
  return labels.map((label, i) => ({ label, pct: [r1, r2, r3][i] ?? 10 }));
}

const VERDICTS = [
  "오늘 감정 상태: 작동은 하고 있음",
  "뇌 과부하 감지됨, 그래도 운영 중",
  "감정이 너무 많아서 일부 유실됨",
  "오늘 마음 상태: 우그러진 캔 수준",
  "인간 맞음, 그냥 좀 힘든 거임",
  "감정 용량 87% 초과, 재시작 권장",
  "내부 오류 없음, 그냥 사람인 거임",
  "감정 처리 중 예외 발생: 버텼음",
  "에너지 부족, 충전 필요 (맛있는 거)",
  "출력 결과: 버텨왔음, 그거면 됨",
  "오늘 로그 분석 결과: 많이 쌓였었구나",
  "시스템 정상 — 그냥 사람인 거 맞음",
] as const;

const RESIDUALS = [
  "먼지 수준의 서운함",
  "어딘가 남은 억울함 0.3g",
  "유통기한 지난 현타",
  "고장난 기억 셀 3개",
  "영수증 없는 짜증",
  "원인 불명의 무기력",
  "어제꺼인 것 같은 허무감",
  "잘 안 지워지는 걱정 흔적",
  "정체불명의 찝찝함 약간",
  "식어버린 서운함 한 조각",
  "이름 모를 감정 파편 2개",
] as const;

const PRESCRIPTIONS = [
  "오늘은 뭐 먹고 싶은 거 하나 먹어",
  "지금 이 기분, 내일까지 안 들고 가도 됨",
  "아무것도 안 해도 되는 시간 30분 처방",
  "오늘치 버텼으면 충분함",
  "좋아하는 영상 보고 자도 됨",
  "이불 속 5분 더 있어도 됨 (진지하게)",
  "오늘 하루 수고했다고 스스로한테 말해줘",
  "자도 됨, 진짜로",
  "뭔가 잘못된 게 아니라 그냥 지친 거임",
  "좋아하는 음료 하나 사도 됨, 진짜로",
  "오늘은 여기까지만 해도 됨",
  "지금 이 상태, 뭔가 문제 있는 게 아님",
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
}

export function generateResult(emotions: string[], seed?: number): ResultData {
  const s = seed ?? (Date.now() % 999983);
  const rng = seededRng(s);
  const now = new Date();
  const date = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, "0")}.${String(now.getDate()).padStart(2, "0")}`;
  const serial = String(s).padStart(5, "0").slice(-5);

  const intensity = Math.min(98, Math.max(31,
    45 + emotions.length * 8 + Math.floor((rng() - 0.5) * 32)
  ));

  return {
    date,
    serial,
    ingredients: generateIngredients(emotions.length ? emotions : ["감정"], rng),
    intensity,
    residual: pick(RESIDUALS, rng),
    verdict: pick(VERDICTS, rng),
    prescription: pick(PRESCRIPTIONS, rng),
    seed: s,
  };
}

export function buildResultUrl(emotions: string[], seed: number): string {
  const params = new URLSearchParams({ e: emotions.join("|"), s: String(seed) });
  return `/result?${params.toString()}`;
}

export function parseResultUrl(search: string): { emotions: string[]; seed: number } | null {
  try {
    const p = new URLSearchParams(search);
    const e = p.get("e"); const s = p.get("s");
    if (!e || !s) return null;
    return { emotions: e.split("|").filter(Boolean), seed: Number(s) };
  } catch { return null; }
}
