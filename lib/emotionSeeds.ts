/* ── 감정씨앗 + 퇴비화 시스템 ── */

export interface EmotionSeed {
  keyword: string;
  ugogitranslation: string; // 우걱이 번역 — 짧고 관찰적, 설교 없음
  compostNoun: string;      // 퇴비화 결과 (명사 한 단어): 기대, 걱정 등
  compostEmoji: string;     // 퇴비 이모지
  seedQuestion: string;     // 오늘의 감정씨앗 질문
  growthPct: number;        // 성장 가능성 %
  /* 하위 호환용 */
  compostName: string;
  compostDesc: string;
  ugogimemo: string;
}

export const EMOTION_SEEDS: EmotionSeed[] = [
  {
    keyword: "서운함",
    ugogitranslation: "서운함은 보통 기대가 있었던 자리에 남는다.",
    compostNoun: "기대",
    compostEmoji: "🌱",
    seedQuestion: "오늘 나는 무엇을 기대했을까?",
    growthPct: 78,
    compostName: "서운함 특화 퇴비",
    compostDesc: "관계를 소중하게 여긴 증거로 변환됨.",
    ugogimemo: "서운했다는 건 그 관계가 소중하다는 거임.",
  },
  {
    keyword: "외로움",
    ugogitranslation: "외로움은 연결되고 싶다는 마음이 밖으로 나온 것이다.",
    compostNoun: "연결되고 싶음",
    compostEmoji: "🌿",
    seedQuestion: "지금 내가 진짜로 원하는 연결은 어떤 종류일까?",
    growthPct: 72,
    compostName: "고독 숙성 퇴비",
    compostDesc: "혼자 버텨온 시간이 자기이해 성분으로 변환됨.",
    ugogimemo: "외로운 사람은 연결을 원하는 사람임.",
  },
  {
    keyword: "짜증",
    ugogitranslation: "짜증은 대부분 피곤함이 표면으로 올라온 것이다.",
    compostNoun: "피곤함",
    compostEmoji: "🍂",
    seedQuestion: "오늘 짜증 아래에 진짜 있었던 것은?",
    growthPct: 65,
    compostName: "짜증 발효 퇴비",
    compostDesc: "한계 신호가 자기 보호 성분으로 전환됨.",
    ugogimemo: "짜증 아래에 피로가 있었음.",
  },
  {
    keyword: "억울함",
    ugogitranslation: "억울함은 인정받고 싶었는데 그러지 못한 자리에 남는다.",
    compostNoun: "상처",
    compostEmoji: "🌾",
    seedQuestion: "오늘 내가 인정받고 싶었던 것은?",
    growthPct: 70,
    compostName: "억울함 정제 퇴비",
    compostDesc: "높은 밀도의 자기 존중 성분 추출 완료.",
    ugogimemo: "질겼음. 그만큼 진심이었다는 거임.",
  },
  {
    keyword: "불안",
    ugogitranslation: "불안은 아직 일어나지 않은 일에 미리 가있는 마음이다.",
    compostNoun: "걱정",
    compostEmoji: "🌱",
    seedQuestion: "지금 내가 준비할 수 있는 가장 작은 한 가지는?",
    growthPct: 68,
    compostName: "불안 에너지 변환 퇴비",
    compostDesc: "미래를 대비하려는 에너지가 준비 성분으로 변환됨.",
    ugogimemo: "불안은 대비하고 싶다는 신호임.",
  },
  {
    keyword: "질투",
    ugogitranslation: "질투는 내가 원하는 것이 무엇인지 알려주는 신호다.",
    compostNoun: "원함",
    compostEmoji: "🌿",
    seedQuestion: "내가 진짜 원하는 것은 무엇일까?",
    growthPct: 75,
    compostName: "질투 욕구 퇴비",
    compostDesc: "숨겨진 욕구가 방향성 성분으로 변환됨.",
    ugogimemo: "질투는 원하는 것을 알려주는 신호임.",
  },
  {
    keyword: "무기력",
    ugogitranslation: "무기력은 오래 버텨온 몸이 잠깐 멈추는 것이다.",
    compostNoun: "지침",
    compostEmoji: "🍂",
    seedQuestion: "지금 나에게 가장 필요한 것은 무엇일까?",
    growthPct: 60,
    compostName: "무기력 회복 퇴비",
    compostDesc: "장기 버팀의 흔적이 회복 촉진 성분으로 변환됨.",
    ugogimemo: "이거 게으름 아님. 너무 오래 버텨온 거임.",
  },
  {
    keyword: "후회",
    ugogitranslation: "후회는 그때 더 잘하고 싶었다는 마음이 남아있는 것이다.",
    compostNoun: "아쉬움",
    compostEmoji: "🌾",
    seedQuestion: "그 경험이 나에게 가르쳐준 것은 무엇일까?",
    growthPct: 73,
    compostName: "후회 숙성 퇴비",
    compostDesc: "과거 경험이 고밀도 학습 성분으로 변환됨.",
    ugogimemo: "후회는 배울 준비가 된 감정임.",
  },
  {
    keyword: "공허함",
    ugogitranslation: "공허함은 뭔가 채워지고 싶다는 신호가 조용히 온 것이다.",
    compostNoun: "채워지고 싶음",
    compostEmoji: "🌱",
    seedQuestion: "내 삶에 의미를 주는 것은 무엇일까?",
    growthPct: 62,
    compostName: "공허함 의미 퇴비",
    compostDesc: "비어있음이 새로운 것을 받아들이는 공간으로 변환됨.",
    ugogimemo: "비어있으면 채울 수 있음.",
  },
  {
    keyword: "죄책감",
    ugogitranslation: "죄책감은 괜찮은 사람이고 싶다는 마음에서 나온다.",
    compostNoun: "책임감",
    compostEmoji: "🌿",
    seedQuestion: "나는 어떻게 더 잘할 수 있을까?",
    growthPct: 71,
    compostName: "죄책감 책임 퇴비",
    compostDesc: "관계를 소중히 여기는 마음이 책임 성분으로 변환됨.",
    ugogimemo: "잘못을 인식하는 건 좋은 신호임.",
  },
  {
    keyword: "속상함",
    ugogitranslation: "속상함은 소중한 것이 있는데 그게 아파서 오는 감정이다.",
    compostNoun: "아픔",
    compostEmoji: "🌸",
    seedQuestion: "오늘 내가 소중하게 여기는 것이 뭔지 확인됐나요?",
    growthPct: 74,
    compostName: "속상함 진심 퇴비",
    compostDesc: "속상함이 소중함의 증거로 변환됨.",
    ugogimemo: "속상하다는 건 소중하게 여긴다는 거임.",
  },
  {
    keyword: "답답함",
    ugogitranslation: "답답함은 무언가 막혀서 나아가지 못하는 느낌이다.",
    compostNoun: "막힘",
    compostEmoji: "🌾",
    seedQuestion: "내가 바꿀 수 있는 것에 집중한다면?",
    growthPct: 66,
    compostName: "답답함 에너지 퇴비",
    compostDesc: "변화를 원하는 에너지가 행동 촉진 성분으로 변환됨.",
    ugogimemo: "답답한 건 바꾸고 싶다는 거임.",
  },
  {
    keyword: "부담감",
    ugogitranslation: "부담감은 대부분 책임감이 무거워진 것이다.",
    compostNoun: "책임감",
    compostEmoji: "🌱",
    seedQuestion: "혼자 들지 않아도 되는 것이 있을까?",
    growthPct: 67,
    compostName: "부담감 나눔 퇴비",
    compostDesc: "책임감이 나눔 촉진 성분으로 변환됨.",
    ugogimemo: "혼자 다 하려는 사람이 생산한 퇴비.",
  },
  {
    keyword: "긴장",
    ugogitranslation: "긴장은 그게 나한테 중요하다는 신호다.",
    compostNoun: "중요함",
    compostEmoji: "🌿",
    seedQuestion: "지금 긴장이 나에게 무엇이 중요하다고 알려주고 있나요?",
    growthPct: 72,
    compostName: "긴장 에너지 퇴비",
    compostDesc: "준비 신호가 집중 촉진 성분으로 변환됨.",
    ugogimemo: "긴장은 그게 중요하다는 뜻임.",
  },
  {
    keyword: "허탈함",
    ugogitranslation: "허탈함은 그만큼 진심이었다는 흔적이다.",
    compostNoun: "진심",
    compostEmoji: "🌾",
    seedQuestion: "진심이었던 그 마음, 어디로 이어갈 수 있을까?",
    growthPct: 69,
    compostName: "허탈함 진심 퇴비",
    compostDesc: "헛되지 않음. 진심의 흔적이 재도전 성분으로 변환됨.",
    ugogimemo: "허탈하다는 건 진심이었다는 거임.",
  },
  {
    keyword: "민망",
    ugogitranslation: "민망함은 그때의 내가 최선을 다했다는 흔적이다.",
    compostNoun: "부끄러움",
    compostEmoji: "🌸",
    seedQuestion: "그때의 나를 지금의 내가 뭐라고 말해줄 수 있을까?",
    growthPct: 73,
    compostName: "민망함 자기이해 퇴비",
    compostDesc: "과거 경험이 자기 수용 성분으로 변환됨.",
    ugogimemo: "걔 기억 못 함. 퇴비 자기수용 성분: 충분히 높음.",
  },
  {
    keyword: "괜찮은",
    ugogitranslation: "괜찮은 척은 참았다는 뜻이고, 참았다는 건 뭔가 있다는 뜻이다.",
    compostNoun: "참음",
    compostEmoji: "🌿",
    seedQuestion: "오늘 '괜찮아'라고 했지만, 진짜 감정은 무엇이었을까?",
    growthPct: 68,
    compostName: "괜찮은척 발효 퇴비",
    compostDesc: "오래 참아온 것이 자기 인식 성분으로 변환됨.",
    ugogimemo: "괜찮은 척 오래 하지 마. 안에 있는 거 꺼내. 우걱이가 받아줌.",
  },
];

export const DEFAULT_SEED: EmotionSeed = {
  keyword: "감정",
  ugogitranslation: "감정은 다 이유가 있다. 지금 이 감정도.",
  compostNoun: "알아차림",
  compostEmoji: "🌱",
  seedQuestion: "오늘 이 감정을 통해 내가 알게 된 것은 무엇일까?",
  growthPct: 70,
  compostName: "복합 감정 퇴비",
  compostDesc: "다양한 감정이 섞여 자기이해 성분으로 변환됨.",
  ugogimemo: "복잡했지만 잘 처리됨.",
};

export function findSeedByEmotions(emotions: string[], text?: string): EmotionSeed {
  const combined = [...emotions, text ?? ""].join(" ");
  const match = EMOTION_SEEDS.find((s) => combined.includes(s.keyword));
  return match ?? DEFAULT_SEED;
}

/* 퇴비화 단계 */
export const COMPOST_STAGES = [
  { min: 0,  max: 50,  label: "초기 발효 단계", color: "#A89880" },
  { min: 50, max: 70,  label: "활성 퇴비화 중",  color: "#C4874A" },
  { min: 70, max: 85,  label: "고급 퇴비 완성",  color: "#6A9B7A" },
  { min: 85, max: 101, label: "최상급 퇴비",     color: "#C8607A" },
];

export function getCompostStage(pct: number) {
  return COMPOST_STAGES.find((s) => pct >= s.min && pct < s.max) ?? COMPOST_STAGES[0];
}

/* 정원 씨앗 통계용 — 전체 씨앗 목록 */
export const GARDEN_SEEDS = EMOTION_SEEDS.map(s => ({
  noun: s.compostNoun,
  emoji: s.compostEmoji,
}));
