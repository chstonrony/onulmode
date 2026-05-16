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

// ─── ERROR CODE 시스템 (100개) ────────────────────────────
const ERROR_CODES = [
  "UGEGI-404", "SAD-999", "HEART_BROKEN", "SOCIAL_LIFE.EXE",
  "CRYING_IN_THE_CLUB", "EMOTIONAL_DAMAGE", "MENTAL_OVERLOAD",
  "TEARS_NOT_FOUND", "HUMAN.EXE_STOPPED", "FEELINGS.ELL",
  "SADNESS_OVERFLOW", "ANGER_LEAKED", "LONELINESS_DETECTED",
  "SELF_ESTEEM.DLL_MISSING", "HOPE_NOT_FOUND", "BURNOUT_LEVEL_MAX",
  "UGEGI_OVERHEATED", "EMOTION_CORRUPTED", "HEART.EXE_CRASHED",
  "CRYING_PROCESS_FAILED", "OVERTHINK_INFINITE_LOOP",
  "SEROTONIN_LOW_BATTERY", "DOPAMINE_NOT_FOUND",
  "FAKE_SMILE_DETECTED", "PATIENCE_BUFFER_FULL",
  "SOCIAL_BATTERY_DEAD", "KINDNESS_OVERFLOW_ERROR",
  "PRETENDING_OK_FAILED", "FEELINGS_FILE_CORRUPTED",
  "SELF_BLAME_LOOP_DETECTED", "MEMORY_LEAK_REGRET",
  "RELATIONSHIP_404", "WORK_STRESS_EXCEEDED",
  "MONDAY_BLUE_FATAL", "WEEKEND_TOO_SHORT",
  "DREAM_LOAD_FAILED", "MOTIVATION_NULL_POINTER",
  "ANXIETY_PROCESS_RUNNING", "COMPARISON_VIRUS_DETECTED",
  "UGEGI_STOMACH_FULL", "EMOTION_QUEUE_OVERFLOW",
  "REALITY_CHECK_ERROR", "HAPPINESS_FILE_MISSING",
  "COMFORT_FOOD_REQUIRED", "SLEEP_DEPRIVATION_CRITICAL",
  "OVERTHINKING_AT_3AM", "GROUP_CHAT_LEFT",
  "PHONE_NOT_RINGING", "SEEN_NOT_REPLIED",
  "EXPECTATION_NOT_MET", "UGEGI_BITE_ERROR",
  "FEELING_TOO_MUCH", "FEELING_NOTHING",
  "FORCED_LAUGH.EXE", "INTERNAL_CRY_DETECTED",
  "VENT_TARGET_UNAVAILABLE", "COMFORT_UNAVAILABLE",
  "RELATABLE_PAIN_999", "TOO_MUCH_TO_HANDLE",
  "EMOTION_STUCK_IN_LOOP", "UGEGI_CONFUSED",
  "SYSTEM_EMOTION_HALTED", "MENTAL_SEGFAULT",
  "FRIENDSHIP_TIMEOUT", "REPLY_DELAYED_FOREVER",
  "OVERTHINK_404_SOLUTION", "SLEEP_CRASH",
  "UGEGI_CHOKED", "CRINGE_MEMORY_DETECTED",
  "PAST_TRAUMA_ACCESSED", "UNKNOWN_SADNESS_TYPE",
  "UNDEFINED_EMOTION", "EMOTION_COMPILE_ERROR",
  "REGRET_BUFFER_MAX", "EMBARRASSMENT_CRITICAL",
  "ALONE_IN_CROWD", "INVISIBLE_MODE_ON",
  "SENSITIVITY_OVERFLOW", "MASK_PROCESS_RUNNING",
  "UGEGI_CANNOT_SWALLOW", "EMOTION_TOO_BIG",
  "HEART_STRING_BROKEN", "SUPPORT_SYSTEM_NULL",
  "UGEGI_NEED_BREAK", "TIRED_OF_BEING_TIRED",
  "WEEKEND_SADNESS_TYPE_B", "EXISTENTIAL_CRISIS.EXE",
  "WHO_AM_I_404", "PURPOSE_FILE_MISSING",
  "FUTURE_UNCLEAR_ERROR", "COMPARISON_DAMAGE_TAKEN",
  "UGEGI_SYSTEM_ERROR", "BAGAK_FAILED",
  "EMOTION_PARSE_ERROR", "MENTAL_DISK_FULL",
  "UGEGI_RETRY_LIMIT", "HEART_FIREWALL_DOWN",
  "VULNERABILITY_EXPOSED", "UGEGI_LAST_RESORT",
] as const;

// ─── 경고문 (50개) ────────────────────────────────────────
const WARNING_MESSAGES = [
  "⚠ 혼자 삭히기 위험",
  "⚠ 감정 과열 감지",
  "⚠ 울컥 가능성 높음",
  "⚠ 사회생활 데미지 누적",
  "⚠ 안 괜찮은 척 감지됨",
  "⚠ 멘탈 꾸깃 상태",
  "⚠ 눈물 임계치 초과",
  "⚠ 감정 과부하 상태",
  "⚠ 버티기 한계 근접",
  "⚠ 감정 유통기한 초과",
  "⚠ 괜찮은 척 파탄",
  "⚠ 자책 루프 감지",
  "⚠ 우걱이 소화 불량",
  "⚠ 감정 찌꺼기 축적",
  "⚠ 말 못한 것들 과부하",
  "⚠ 멘탈 배터리 방전",
  "⚠ 억울함 발효 중",
  "⚠ 비교 바이러스 검출",
  "⚠ 혼자 견디기 위험 단계",
  "⚠ 감정 압축 실패",
  "⚠ 사회생활 과부하",
  "⚠ 번아웃 전조 감지",
  "⚠ 감정 폭발 직전",
  "⚠ 허무함 임계점 도달",
  "⚠ 수분 부족 (눈물 포함)",
  "⚠ 안 괜찮음 확인됨",
  "⚠ 외로움 농도 위험",
  "⚠ 감정 서버 다운",
  "⚠ 우걱이 이빨 막힘",
  "⚠ 즉각 휴식 권고",
  "⚠ 현타 농도 위험",
  "⚠ 서운함 포화 상태",
  "⚠ 멘탈 수분 8% 미만",
  "⚠ 행복인 척 과부하",
  "⚠ 웃음 강도 의심됨",
  "⚠ 감정 곰팡이 발생",
  "⚠ 피로 누적 경보",
  "⚠ 인간관계 데미지",
  "⚠ 오래된 감정 발굴",
  "⚠ 마음 와장창 위험",
  "⚠ 감정 소화 실패",
  "⚠ 정체 모를 눈물 감지",
  "⚠ 뭔가 말하고 싶음",
  "⚠ 우걱이 긴급 출동",
  "⚠ 처리 불가 감정 감지",
  "⚠ 위로 필요 수준: 높음",
  "⚠ 마음 꾸깃 상태",
  "⚠ 감정 블랙박스 열림",
  "⚠ 눈물 잔류량 72%",
  "⚠ 감정 와장창 완료",
] as const;

// ─── 버튼 텍스트 (다시 파쇄) ──────────────────────────────
const BUTTON_RETRY_TEXTS = [
  "다시 파쇄하기",
  "감정 다시 갈기",
  "우걱이에게 재전송",
  "한 번 더 꾸깃하기",
  "다시 우걱우걱",
  "감정 재분석",
  "재파쇄 시도",
  "또 버리기",
  "더 갈아버리기",
  "우걱이 한 번 더",
  "감정 추가 투입",
  "빠각 한 번 더",
  "재처리 요청",
  "다시 던져보기",
  "꾸깃 한 번 더",
  "감정 재파쇄",
  "우걱이야 한 번 더",
  "또 갈아줘",
  "retry.exe",
  "한 번 더 (몰래)",
] as const;

// ─── 버튼 텍스트 (닫기) ──────────────────────────────────
const BUTTON_CLOSE_TEXTS = [
  "그냥 닫기",
  "울면서 종료",
  "현실로 돌아가기",
  "대충 닫기",
  "그냥 버티기",
  "닫으면서 한숨",
  "종료 (눈물 포함)",
  "escape.exe",
  "현실 복귀",
  "그냥 이불 들어가기",
  "닫기 (아직 안 괜찮음)",
  "오늘은 여기까지",
  "이만 물러나겠음",
  "창 닫고 눕기",
  "포기하고 나가기",
  "그냥 자야겠음",
  "잠깐 자고 올게",
  "나중에 또 옴",
  "일단 나가기",
  "현실도피 종료",
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

// ─── 결과 제목 (50개) ────────────────────────────────────
const RESULT_TITLES = [
  "감정 압축 실패",
  "서운함 과부하 상태",
  "우걱이 도망감",
  "감정 바삭 단계",
  "멘탈 꾸깃 상태",
  "눈물맛 감정 검출",
  "오늘은 안 갈림",
  "감정 유통기한 초과",
  "AI도 당황한 감정",
  "과몰입 위험군",
  "혼자 삭힌 감정 발견",
  "감정 상태: 축축함",
  "울컥 게이지 폭주",
  "감정 파쇄기 멈춤",
  "우걱이가 잠시 침묵함",
  "행복인 척 감지됨",
  "감정 파일 손상됨",
  "마음 와장창 상태",
  "사회생활 모드 과열",
  "버티기 모드 활성화",
  "감정 용량 초과",
  "멘탈 수분 부족",
  "서운함 발효 중",
  "분노 잔류 성분 검출",
  "외로움 농도 위험",
  "감정 소화 불량",
  "우걱이 이빨 막힘",
  "오래된 감정 발굴됨",
  "감정 찌꺼기 잔존",
  "허무함 임계점 도달",
  "마음이 눅눅해짐",
  "감정 재파쇄 권장",
  "자책 루프 감지됨",
  "피로 누적 경보",
  "괜찮은 척 한계치 도달",
  "말 못한 것들 과부하",
  "감정 곰팡이 발생",
  "우걱이 소화기 고장",
  "처리 우선순위 역전",
  "감정 블랙박스 열림",
  "멘탈 절전 모드 진입",
  "오늘의 감정: 복잡계",
  "마음 서버 과부하",
  "감정 데이터 손실",
  "우걱이 울음 감지",
  "억울함 만료 기간 초과",
  "위험 감정 폭발 직전",
  "마음 흐림 → 소나기",
  "감정 처리 시스템 오류",
  "오늘도 수고함",
] as const;

// ─── 파쇄 상태 (30개) ────────────────────────────────────
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
  "바삭하게 갈림",
  "눅눅해서 잘 안 갈림",
  "과부하로 멈춤",
  "감정이 증발함",
  "우걱우걱 끝남",
  "씹다 포기했다 다시 씹음",
  "감정 압축 완료",
  "소화 중 경보 발생",
  "가루로 처리됨",
  "오래 씹혔음",
  "이상한 맛이 남",
  "감정 발효 후 처리됨",
  "반쯤 녹음",
  "처리 완료 (냄새 이상함)",
  "감정 해체 후 재조립 실패",
  "강하게 눌러 처리",
  "처리 완료 (찌꺼기 잔존)",
  "냉동 후 분쇄",
  "고온 처리 후 증발",
  "완료는 했는데 뒷맛이 남",
  "처리 완료 (우걱이도 힘들었음)",
] as const;

// ─── AI 판정 (50개) ──────────────────────────────────────
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
  "오늘 생각보다 많이 참았네요.",
  "괜찮은 척 하느라 힘들었겠다.",
  "감정이 너무 커서 우걱이가 삼키지 못했어요.",
  "울지는 않았지만 마음은 울고 있었음.",
  "AI가 처리하다가 잠시 한숨 쉼.",
  "겉은 멀쩡한데 안쪽이 꾸깃함.",
  "감정 파편 다수 검출됨.",
  "이 정도면 안 힘든 척 국가대표.",
  "감정이 눅눅해진 상태입니다.",
  "지금 필요한 건 수면과 안아줌.",
  "많이 애썼는데 티를 안 냈네.",
  "서운함이 미세먼지처럼 쌓여있음.",
  "감정 상태가 바삭바삭합니다.",
  "오늘 마음이 조금 찢어졌어요.",
  "혼자 견딘 흔적 발견.",
  "웃고 있지만 데이터상 안 웃는 중.",
  "감정이 곰팡이 직전 상태임.",
  "오래 버텼다. 보통 이 정도면 힘들어함.",
  "뭔가 말하고 싶은 게 있어 보임.",
  "오늘 지쳤는데 표현을 못 했네.",
  "분노가 슬픔으로 변환 중.",
  "억울함 발효 단계: 숙성 중.",
  "지금 이 감정, 혼자 들고 있기엔 무거움.",
  "처리 완료는 했는데 여운이 남음.",
  "감정 알고리즘 오류: 너무 복잡함.",
  "하루치 감정이 이틀치분임.",
  "이 감정은 사실 오래된 거임.",
  "뭔가 쌓인 게 있는 것 같음.",
  "오늘 잘 버텼음. 진짜로.",
  "완전히 갈리진 않았지만 일단 처리됨.",
  "사회생활 데미지 다수 검출.",
  "너무 오래 혼자 들고 있었던 것 같음.",
  "오늘 마음에 비가 옴.",
  "뭔가 억울한 게 아직 남아있음.",
  "감정을 몰래 숨겼는데 우걱이가 다 봄.",
  "오늘 힘들었지? 맞지?",
  "감정이 예상보다 크게 나왔음.",
  "안 갈린 감정 찌꺼기가 조금 남았음.",
  "이 정도면 꽤 버텼음. 인정.",
  "오늘 마음 조금 무거웠겠다.",
] as const;

// ─── 우걱이 코멘트 (100개) ───────────────────────────────
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
  "이건 좀 많이 서운했네…",
  "우걱이가 감당 못하겠어요.",
  "조금 울고 다시 오세요.",
  "오늘은 제가 대신 꾸깃해드릴게요.",
  "킹받지만 살아야죠.",
  "생각보다 마음이 많이 지쳤는데?",
  "이건 감정이 아니라 사건인데요?",
  "우걱이가 잠시 말을 잃었습니다.",
  "사회생활 버프가 너무 강함.",
  "오늘 하루 꽤 버텼네.",
  "안 괜찮아도 괜찮습니다.",
  "우걱이도 이런 건 처음 봄.",
  "감정이 거의 찹쌀떡 수준.",
  "이건 울어야 정상입니다.",
  "당신의 멘탈이 조금 구겨졌습니다.",
  "우걱 씹다가 저도 눈물날 뻔.",
  "이 감정 어디 숨겨놨던 거예요?",
  "오늘 진짜 많이 참은 거 맞죠?",
  "씹다 보니 매웠어요.",
  "처리 완료. 근데 저도 좀 힘들었음.",
  "이거 맛있진 않았는데 아무튼 먹음.",
  "우걱이가 잠깐 미간 찌푸렸음.",
  "이 감정 진짜 오래됐다.",
  "오늘도 혼자 다 해결했네. 수고함.",
  "속으로 많이 울었던 거 알고 있음.",
  "이거 혼자 들고 있기엔 너무 무거웠을 것 같음.",
  "우걱이가 살짝 울컥했음. 쉿.",
  "이 맛은 뭔가 오래된 맛.",
  "갈긴 갈았는데 찌꺼기 좀 남음.",
  "감정 씹다가 저도 멍해짐.",
  "뭔가 말하지 않은 게 있지 않나요?",
  "이거 다음엔 좀 빨리 버려줘요.",
  "처리 완료. 단 후유증 있을 수 있음.",
  "오늘 감정이 좀 짜네요. (눈물맛)",
  "씹다가 이빨에 꼈는데 억지로 처리함.",
  "저도 이건 처음 보는 감정이에요.",
  "좀 쉬어도 돼요. 지금.",
  "우걱이가 잠시 배를 두드렸음.",
  "이거 스스로 괜찮은 척 한 거죠?",
  "감정이 생각보다 깊이 묵혀있었음.",
  "오늘은 그냥 이불 속으로 들어가도 됨.",
  "이 감정, 누군가한테 말했으면 더 나았을 것 같음.",
  "완전히 해결은 아니지만 일단 씹었음.",
  "우걱이가 이건 좀 힘들어했음.",
  "다음엔 덜 참고 와도 됨.",
  "이 감정 씹는 데 평소보다 오래 걸렸음.",
  "오늘 수고했어요. 진짜로.",
  "이 감정, 우걱이도 좀 슬펐음.",
  "이번 감정은 유난히 질겼음.",
  "삼키기가 힘들어서 세 번 씹었음.",
  "오늘 감정엔 눈물 성분이 포함되어 있음.",
  "이거 생각보다 오래 참은 거임.",
  "우걱이도 잠깐 멈췄다 다시 씹었음.",
  "감정이 탄 냄새가 조금 남.",
  "처리하면서 우걱이도 좀 지쳤음.",
  "이건 빨리 버리길 잘했음.",
  "씹다 보니 안에 억울함이 더 있었음.",
  "감정이 뭔가 꾹꾹 눌러담은 느낌이었음.",
  "처리 완료. 근데 뭔가 아직 남은 느낌?",
  "우걱이가 한 번 더 씹어볼까 했는데 일단 완료.",
  "이 감정, 꽤 오래 기다리게 했네요.",
  "맛은 좀 이상했지만 다 처리했음.",
  "갑자기 울컥한 거 우걱이 탓 아님.",
  "이번엔 처리가 좀 힘들었음. 솔직히.",
  "감정이 예상보다 단단했음.",
  "오늘 감정에 서운함 층이 여러 겹이었음.",
  "우걱이가 잠깐 생각에 잠겼다 처리함.",
  "이거 어디서 이렇게 쌓인 거예요?",
  "처리는 했는데 여운이 길게 남음.",
  "이 감정 씹을 때 이빨이 좀 아팠음.",
  "완전 빠각은 아니지만 일단 처리 완료.",
  "오늘 감정이 좀 복잡했음. 아무튼 완료.",
  "씹다가 우걱이 눈이 빨개짐. (비염 아님)",
  "이번 건 진짜 오래된 맛이 났음.",
  "처리 완료. 단, 재투입 가능함.",
  "이 감정, 오래 혼자 들고 있었던 티가 남.",
  "우걱이가 이건 '에잇' 하고 삼켰음.",
  "감정 성분 분석 중 우걱이가 잠깐 멈춤.",
  "이거 처리하면서 우걱이도 반성함.",
  "씹는 소리가 평소보다 크게 났음.",
  "오늘 감정 처리 완료. 근데 좀 찡했음.",
  "이 감정 처리 후 우걱이가 물 한 잔 마심.",
  "안 갈린 것들은 내일 다시 처리 예정.",
  "완료. 단, 우걱이도 조금 울컥했음. (쉿)",
  "이거 쉽게 버리기 어려운 감정이었음.",
  "처리하면서 우걱이가 고개를 끄덕였음.",
  "오늘 감정은 씹기 어렵고 마음 아팠음.",
  "완료. 오늘 하루 잘 버텼어요.",
] as const;

// ─── 결과 등급 (20개) ────────────────────────────────────
const GRADES = [
  { text: "빠각 완료",           sub: "우걱이가 다 씹어먹음" },
  { text: "반빠각 완료",         sub: "찌꺼기 남음 — 재투입 권장" },
  { text: "빠각 실패",           sub: "너무 질겨서 우걱이도 포기" },
  { text: "오늘은 그냥 누워있기", sub: "우걱이 처방" },
  { text: "완전 빠각",           sub: "흔적 없이 갈렸음" },
  { text: "강제 빠각",           sub: "질겼지만 우걱이가 억지로 처리" },
  { text: "위험 감정 빠각",      sub: "우걱이도 매웠다고 함" },
  { text: "감정 찌꺼기 남음",    sub: "8g 잔존 — 재처리 필요" },
  { text: "부분 분해 완료",      sub: "일부는 소화 실패" },
  { text: "재파쇄 권장",         sub: "한 번 더 돌리면 나을 듯" },
  { text: "이빨에 꼈음",         sub: "억지로 뺐는데 아직 조금 있음" },
  { text: "질겅 처리중",         sub: "아직 씹는 중… 기다려주세요" },
  { text: "소화 실패",           sub: "위장에서 항의 중" },
  { text: "처리 완료 (잔여물)",  sub: "대부분 처리됨 (5% 잔존)" },
  { text: "긴급 처리 완료",      sub: "비상 모드로 처리함" },
  { text: "우걱이 항복",         sub: "이건 우걱이도 못 먹겠다고 함" },
  { text: "과부하 상태",         sub: "처리 용량 초과 — 잠시 후 재시도" },
  { text: "감정 증발",           sub: "어디 갔는지 모름. 사라짐." },
  { text: "처리 불가 → 안아줌", sub: "이건 위로가 필요한 감정임" },
  { text: "압축 완료 (주의)",    sub: "폭발 가능성 있음 — 조심" },
] as const;

// ─── 오늘의 처방 (15개) ──────────────────────────────────
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
  "오늘 하루 수고했어요. 진심으로.",
  "그냥 아무것도 안 해도 됨. 진짜.",
  "뭔가 먹고 싶으면 먹어. 그게 치료임.",
  "오늘은 그냥 살아있는 것만으로 됨.",
] as const;

const STAMPS = [
  "질김", "눅눅함", "빠각 완료", "재파쇄", "감정 과식", "소화 실패",
  "이빨에 꼈음", "묵은 감정", "위험", "울컥", "꾸깃", "와장창",
  "처리불가", "눈물맛", "과부하", "바삭",
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
  "이거 오래된 거 맞지?",
  "씹다 보니 울컥했음. 몰라",
  "다음에 또 가져와도 됨",
  "이런 거 혼자 들고 있지 마셈",
  "완료는 했는데 뒷맛이 씀",
  "이거 씹으면서 우걱이도 반성함",
  "아무튼 완료. 수고함.",
  "이거 진짜 질겼는데 억지로 삼킴",
] as const;

const BIZARRE_STATS_POOL = [
  { label: "감정 눅눅함",         value: "84%" },
  { label: "사회생활 찌꺼기",     value: "39%" },
  { label: "현타 농도",           value: "위험" },
  { label: "우울 숙성도",         value: "92%" },
  { label: "억울함 농도",         value: "67%" },
  { label: "멘탈 수분 함량",      value: "8%" },
  { label: "분노 발효도",         value: "77%" },
  { label: "허무함 축적량",       value: "초과" },
  { label: "귀찮음 포화도",       value: "88%" },
  { label: "혼자 참은 시간",      value: "너무 오래" },
  { label: "감정 곰팡이 지수",    value: "63%" },
  { label: "질긴 감정 섬유질",    value: "다량" },
  { label: "눈물 잔류량",         value: "72%" },
  { label: "서운함 발효도",       value: "91%" },
  { label: "버티기 모드 지속",    value: "위험" },
  { label: "괜찮은 척 강도",      value: "최대" },
  { label: "말 못한 것들",        value: "다량" },
  { label: "마음 구겨짐 정도",    value: "꾸깃꾸깃" },
  { label: "자책 루프 횟수",      value: "37회" },
  { label: "속으로 운 횟수",      value: "측정 불가" },
  { label: "비린맛 농도",         value: "높음" },
  { label: "감정 바삭도",         value: "MAX" },
  { label: "마음 삐걱 횟수",      value: "23회" },
  { label: "버티기 스킬",         value: "만렙" },
  { label: "행복인 척 강도",      value: "높음" },
  { label: "혼자 삭힘 레벨",      value: "위험" },
  { label: "울컥 확률",           value: "92%" },
  { label: "감정 압축률",         value: "실패" },
  { label: "사회생활 데미지",     value: "높음" },
  { label: "멘탈 와장창 지수",    value: "81%" },
  { label: "오래된 감정 비율",    value: "64%" },
  { label: "감정 비린내",         value: "검출됨" },
  { label: "참은 횟수 (오늘)",    value: "∞" },
  { label: "마음속 잡음 수준",    value: "시끄러움" },
  { label: "소화 완료율",         value: "47%" },
  { label: "감정 이물질",         value: "다수" },
  { label: "혼자 해결 비율",      value: "97%" },
  { label: "울었는지 여부",       value: "대외비" },
  { label: "감정 눅눅함",         value: "축축" },
  { label: "마음 꾸깃 단계",      value: "4단계" },
  { label: "우걱이 고통 지수",    value: "중간" },
  { label: "감정 묵은지 연수",    value: "추정불가" },
  { label: "괜찮음 유효기간",     value: "만료됨" },
  { label: "심박수 (감정 시)",    value: "불규칙" },
  { label: "감정 탄내",           value: "조금 남" },
  { label: "말하고 싶은 것",      value: "많음" },
  { label: "자기 자신 점수",      value: "후한 편" },
] as const;

const RESULT_GRADES = [
  "빠각 완료",
  "질겅 처리중",
  "소화 실패",
  "감정 찌꺼기 남음",
  "재파쇄 권장",
  "이빨에 꼈음",
  "부분 분해 완료",
  "강제 빠각",
  "과부하 상태",
  "완전 빠각",
] as const;

// ─── 결과물 형용사 (50개) ────────────────────────────────
const PRODUCT_ADJECTIVES = [
  "눅눅한", "사회생활 먹은", "울컥한", "꾸깃한", "새벽감성",
  "멘탈 바삭", "혼자 삭힌", "눈물맛", "버티다 부서진", "감정 과부하",
  "눌린", "절여진", "우울 흡수한", "인간관계 맛", "멘탈 와장창",
  "참다가 퍽", "번아웃 직전", "오래 묵은", "발효된", "으깨진",
  "흐물흐물한", "찌그러진", "비린 감정 먹은", "억울함에 절인",
  "서운함 코팅된", "피곤함이 배어든", "쪼그라든", "굳어버린",
  "무기력이 스민", "곰팡이 직전의", "퇴근 직전의", "헛헛한",
  "텅 빈", "가라앉은", "꽉꽉 눌린", "짓이겨진", "탄 냄새 나는",
  "산산조각난", "참은 만큼 묵은", "소외감 흡수한", "삐걱거리는",
  "쪄든", "묽어진", "기름진", "눅진눅진한", "무너진",
  "비가 온 날의", "흘린 눈물 먹은", "쪼그라들다 터진", "세상에 치인",
] as const;

// ─── 결과물 음식/사물 (50개) ─────────────────────────────
const PRODUCT_FOODS = [
  { name: "오징어칩 바나나",        emoji: "🍌", type: "banana" },
  { name: "딸기우유",               emoji: "🥛", type: "milk" },
  { name: "콘치즈",                 emoji: "🧀", type: "cheese" },
  { name: "형광펜",                 emoji: "🖊", type: "pen" },
  { name: "삼각김밥",               emoji: "🍙", type: "riceball" },
  { name: "감자칩",                 emoji: "🥔", type: "chip" },
  { name: "마카롱",                 emoji: "🍪", type: "cookie" },
  { name: "초코송이",               emoji: "🍫", type: "cookie" },
  { name: "새우깡",                 emoji: "🦐", type: "chip" },
  { name: "붕어빵",                 emoji: "🐟", type: "bread" },
  { name: "참치김밥",               emoji: "🍱", type: "riceball" },
  { name: "요구르트",               emoji: "🥛", type: "milk" },
  { name: "식빵",                   emoji: "🍞", type: "bread" },
  { name: "젤리",                   emoji: "🍬", type: "jelly" },
  { name: "요거트",                 emoji: "🥛", type: "milk" },
  { name: "편의점 핫도그",          emoji: "🌭", type: "bread" },
  { name: "떡볶이",                 emoji: "🍢", type: "jelly" },
  { name: "도넛",                   emoji: "🍩", type: "cookie" },
  { name: "구미젤리",               emoji: "🐻", type: "jelly" },
  { name: "팝콘",                   emoji: "🍿", type: "chip" },
  { name: "다 녹은 아이스크림",     emoji: "🍦", type: "milk" },
  { name: "혼자 먹는 치킨 한 조각", emoji: "🍗", type: "bread" },
  { name: "자판기 커피",            emoji: "☕", type: "milk" },
  { name: "눌러붙은 라면",          emoji: "🍜", type: "bread" },
  { name: "식어버린 피자",          emoji: "🍕", type: "bread" },
  { name: "찌그러진 캔",            emoji: "🥤", type: "milk" },
  { name: "반만 먹은 샌드위치",     emoji: "🥪", type: "bread" },
  { name: "끝물 딸기",              emoji: "🍓", type: "banana" },
  { name: "상한 것 같은 바나나",    emoji: "🍌", type: "banana" },
  { name: "먹다 남긴 아이스크림",   emoji: "🍨", type: "milk" },
  { name: "혼자 마신 맥주캔",       emoji: "🍺", type: "milk" },
  { name: "구겨진 봉지과자",        emoji: "🛍", type: "chip" },
  { name: "호떡",                   emoji: "🥞", type: "bread" },
  { name: "묵은지",                 emoji: "🥬", type: "jelly" },
  { name: "쿠키",                   emoji: "🍪", type: "cookie" },
  { name: "크래커",                 emoji: "🫙", type: "chip" },
  { name: "솜사탕",                 emoji: "🍭", type: "jelly" },
  { name: "소시지",                 emoji: "🌭", type: "bread" },
  { name: "타코야끼",               emoji: "🐙", type: "jelly" },
  { name: "컵라면",                 emoji: "🍜", type: "bread" },
  { name: "참깨빵",                 emoji: "🍔", type: "bread" },
  { name: "감자전",                 emoji: "🥔", type: "chip" },
  { name: "케이크 한 조각",         emoji: "🎂", type: "cookie" },
  { name: "찐빵",                   emoji: "🥟", type: "bread" },
  { name: "오레오",                 emoji: "🍪", type: "cookie" },
  { name: "비스킷",                 emoji: "🫙", type: "chip" },
  { name: "망고젤리",               emoji: "🥭", type: "jelly" },
  { name: "복숭아 통조림",          emoji: "🍑", type: "jelly" },
  { name: "탕후루",                 emoji: "🍡", type: "jelly" },
  { name: "왕새우과자",             emoji: "🦐", type: "chip" },
] as const;

// ─── 결과물 설명 (50개) ──────────────────────────────────
const PRODUCT_DESCRIPTIONS = [
  "혼자 참다가 식감이 이상해짐.",
  "사회생활 데미지로 변형됨.",
  "우걱이가 먹다가 뱉어낸 것.",
  "감정 파쇄 후 응고된 결과물.",
  "오래 묵힌 감정이 발효되어 나옴.",
  "눈물 성분이 다수 검출됨.",
  "버티다가 식감이 바뀜.",
  "인간관계에 절여진 흔적 있음.",
  "멘탈 과부하로 형태가 바뀜.",
  "서운함 코팅이 두껍게 쌓임.",
  "혼자 삭히다가 이렇게 됨.",
  "우걱이도 이건 좀 이상하다고 함.",
  "감정 파쇄 부산물임. 먹지 말것.",
  "생각보다 오래 참은 흔적 있음.",
  "억울함에 젤라틴화됨.",
  "새벽에 혼자 있다 보면 이렇게 됨.",
  "괜찮은 척 하다가 무게가 변함.",
  "말 못 한 것들이 굳어서 나옴.",
  "사회생활 흔적이 깊이 배어있음.",
  "AI가 처리하다가 이 형태로 나옴.",
  "꾸깃꾸깃 접어뒀다가 펼쳤더니 이 모양.",
  "감정이 수분을 잃어 이렇게 됨.",
  "우걱이 위장에서 2시간 숙성 후 배출됨.",
  "감정 CPU 과부하로 형태 붕괴.",
  "울컥 성분이 과도하게 섞임.",
  "혼자 감당하다 보니 이렇게 굳음.",
  "참을수록 무거워지더니 이렇게 됨.",
  "눈물로 희석된 후 재응고됨.",
  "번아웃 직전 감정의 잔여물.",
  "오늘의 감정 총합이 이 형태로 나옴.",
] as const;

// ─── 바이럴 하단 문구 (30개) ─────────────────────────────
const VIRAL_TEXTS = [
  "나만 당할 수 없음",
  "야 너도 해봐ㅋㅋ",
  "이건 단톡감임",
  "스토리에 박제 ㄱㄱ",
  "우걱이 피해자 추가 모집중",
  "씹다 보니 이런 게 나옴",
  "프린터도 당황함",
  "우걱이 이빨에 낀 결과",
  "감정은 같이 와장창해야 맛임",
  "한 명 더 꾸깃하게 만들기",
  "우걱이가 한입 더 원함",
  "이 결과 우걱이도 책임 못 짐",
  "오늘 감정 폐기 완료",
  "이거 왜 나옴",
  "결과지 상태 안 좋음",
  "AI가 당황함",
  "이거 보내봐ㅋㅋ",
  "단톡에 뿌려",
  "감정 와장창 완료",
  "씹다 이빨에 꼈음",
  "우걱이도 처음 봄",
  "새벽에 보면 더 맞음",
  "친구한테 보내면 우정 테스트 됨",
  "감정이 이상한 음식으로 변함",
  "인간관계 추가 데미지",
  "멘탈 잔여물 있음",
  "야 이거 뭐야ㅋㅋ",
  "우걱이 책임 안 짐",
  "감정 폐기물 처리 완료",
  "이거 카톡으로 박제",
] as const;

// ─── 희귀 결과물 접미사 (5% 확률) ───────────────────────
const RARE_SUFFIXES = [
  "SSR 에디션",
  "전설급",
  "우걱이도 처음 봄",
  "세계 최초",
  "환불 불가",
] as const;

// ─── 우걱이 행동 상태 (20개, 애니메이션 용) ──────────────
export const UGEGI_BEHAVIORS = [
  "우걱우걱 씹는 중",
  "잠시 멈춤",
  "눈 크게 뜸",
  "혀 내밂",
  "눈물 흘림",
  "고개 끄덕임",
  "한숨 쉼",
  "배 두드림",
  "미간 찌푸림",
  "입꼬리 올림",
  "눈 굴림",
  "어이없어함",
  "침묵함",
  "잠깐 울컥함",
  "이빨 드러냄",
  "급하게 씹음",
  "천천히 씹음",
  "감탄함",
  "도망가려다 참음",
  "눈 깜빡임",
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
  cardStyle: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  stamp: string;
  ugMemo: string;
  resultGrade: string;
  resultTitle: string;
  ugegiBehavior: string;
  bizarreStats: { label: string; value: string }[];
  errorCode: string;
  warningMessage: string;
  retryButtonText: string;
  closeButtonText: string;
  viralText: string;
  isRare: boolean;
  productName: string;
  productEmoji: string;
  productType: string;
  productDescription: string;
}

const CARD_STYLES_POOL = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12] as const;

export function generateResult(emotions: string[], seed?: number): ResultData {
  const s   = seed ?? (Date.now() % 999983);
  const rng = seededRng(s);
  const now = new Date();
  const date = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, "0")}.${String(now.getDate()).padStart(2, "0")}`;
  const serial    = String(s).padStart(5, "0").slice(-5);
  const wasteCode = `EMO-${String(Math.floor(rng() * 9000) + 1000)}-${["A","B","C","D"][Math.floor(rng() * 4)]}`;
  const intensity = Math.min(98, Math.max(31, 45 + emotions.length * 8 + Math.floor((rng() - 0.5) * 32)));

  const statPool = [...BIZARRE_STATS_POOL].sort(() => rng() - 0.5);
  const bizarreStats = statPool.slice(0, 2 + Math.floor(rng() * 2));

  // 12% 확률로 소화 멈춤 스타일(6), 나머지는 풀 중 랜덤
  const cardStyle = (rng() < 0.12
    ? 6
    : CARD_STYLES_POOL[Math.floor(rng() * CARD_STYLES_POOL.length)]
  ) as 1|2|3|4|5|6|7|8|9|10|11|12;

  const food = pick(PRODUCT_FOODS, rng);
  const adj  = pick(PRODUCT_ADJECTIVES, rng);

  return {
    date, serial, wasteCode,
    ingredients:    generateIngredients(emotions.length ? emotions : ["감정"], rng),
    intensity,
    shredStatus:    pick(SHRED_STATUSES,      rng),
    verdict:        pick(VERDICTS,            rng),
    machineComment: pick(MACHINE_COMMENTS,    rng),
    grade:          pick(GRADES,              rng),
    prescription:   pick(PRESCRIPTIONS,      rng),
    seed: s,
    cardStyle,
    stamp:          pick(STAMPS,              rng),
    ugMemo:         pick(UG_MEMOS,            rng),
    resultGrade:    pick(RESULT_GRADES,       rng),
    resultTitle:    pick(RESULT_TITLES,       rng),
    ugegiBehavior:  pick(UGEGI_BEHAVIORS,     rng),
    errorCode:      pick(ERROR_CODES,          rng),
    warningMessage: pick(WARNING_MESSAGES,     rng),
    retryButtonText: pick(BUTTON_RETRY_TEXTS,  rng),
    closeButtonText: pick(BUTTON_CLOSE_TEXTS,  rng),
    viralText:       pick(VIRAL_TEXTS,          rng),
    isRare:          rng() < 0.05,
    productName:    `${adj} ${food.name}`,
    productEmoji:   food.emoji,
    productType:    food.type,
    productDescription: pick(PRODUCT_DESCRIPTIONS, rng),
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
