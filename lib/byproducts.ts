/* ──────────────────────────────────────────────
   감정 부산물 시스템
   감정을 파쇄하면 이상한 사물로 변환된다.
   ────────────────────────────────────────────── */

export type Rarity =
  | "COMMON"
  | "STRANGE"
  | "SAD"
  | "VERY WET"
  | "FORGOTTEN"
  | "LEGENDARY SADNESS";

export type Mode = "drift" | "dissolve" | "burn" | "sink";

export interface Byproduct {
  id: string;
  name: string;
  rarity: Rarity;
  smell: string;
  desc: string;
  remainPercent: number;
  partialCrush?: boolean;
}

export const RARITY_LABELS: Record<Rarity, string> = {
  "COMMON":            "COMMON",
  "STRANGE":           "STRANGE",
  "SAD":               "SAD",
  "VERY WET":          "VERY WET",
  "FORGOTTEN":         "FORGOTTEN",
  "LEGENDARY SADNESS": "LEGENDARY SADNESS",
};

export const RARITY_COLORS: Record<Rarity, { bg: string; text: string; border: string }> = {
  "COMMON":            { bg: "#F0E8D8", text: "#7A6858", border: "#D4C8B4" },
  "STRANGE":           { bg: "#E8E0F0", text: "#6A5888", border: "#C8B8D8" },
  "SAD":               { bg: "#D8E4EE", text: "#4A6880", border: "#B8CCDC" },
  "VERY WET":          { bg: "#D4E8E0", text: "#3A7060", border: "#A8D0C4" },
  "FORGOTTEN":         { bg: "#E0DCD4", text: "#6A6058", border: "#C8C0B4" },
  "LEGENDARY SADNESS": { bg: "#F0D8DC", text: "#803848", border: "#D8A8B0" },
};

export const ALL_BYPRODUCTS: Byproduct[] = [
  /* ──── COMMON ──── */
  {
    id: "c01",
    name: "구겨진 영수증 조각",
    rarity: "COMMON",
    smell: "편의점 계산대 근처",
    desc: "펼쳐도 원래대로 안 되는 그 종이. 뭔가 적혀있었던 것 같은데 이미 흐릿함.",
    remainPercent: 28,
  },
  {
    id: "c02",
    name: "눅눅한 오징어칩 가루",
    rarity: "COMMON",
    smell: "바다 향 + 습기",
    desc: "바삭했던 적이 있었는지조차 모호한 상태. 봉지 바닥에서 발견된 것.",
    remainPercent: 35,
  },
  {
    id: "c03",
    name: "덜 닫힌 지퍼백 틈",
    rarity: "COMMON",
    smell: "냉장고 찬 바람",
    desc: "닫았다고 생각했는데 닫히지 않은 상태. 내용물이 조금씩 새고 있음.",
    remainPercent: 22,
  },
  {
    id: "c04",
    name: "반만 씌운 볼펜 뚜껑",
    rarity: "COMMON",
    smell: "잉크 + 플라스틱",
    desc: "끝까지 닫기 귀찮아서 반만 꽂힌 채로 방치된 볼펜. 잉크가 마를 예정.",
    remainPercent: 18,
  },
  {
    id: "c05",
    name: "애매하게 남은 콜라 반 캔",
    rarity: "COMMON",
    smell: "탄산 빠진 콜라",
    desc: "다 마시기엔 싱겁고 버리기엔 아까운 양. 냉장고에서 이틀째 대기 중.",
    remainPercent: 41,
  },
  {
    id: "c06",
    name: "전자레인지 1초 남기고 멈춘 마음",
    rarity: "COMMON",
    smell: "데워지다 만 밥",
    desc: "완성 직전에 꺼버린 감정. 알람이 울리면 남들이 신경 쓸까봐 0초 되기 전에 멈춤.",
    remainPercent: 31,
  },
  {
    id: "c07",
    name: "충전선 접촉 불량 자국",
    rarity: "COMMON",
    smell: "뜨거운 금속",
    desc: "꽂아도 안 되고 뽑아도 이상한 접촉 불량. 각도를 맞춰야 겨우 연결됨.",
    remainPercent: 44,
  },
  {
    id: "c08",
    name: "이어폰 한 짝",
    rarity: "COMMON",
    smell: "귀지 + 플라스틱",
    desc: "나머지 한 짝은 어디 갔는지 모름. 혼자서는 의미가 없는 상태.",
    remainPercent: 55,
  },
  /* ──── STRANGE ──── */
  {
    id: "s01",
    name: "혼자 울린 카톡 알림",
    rarity: "STRANGE",
    smell: "알 수 없음",
    desc: "진동이 왔는데 확인하면 아무것도 없는 그 알림. 착각인지 귀신인지 모름.",
    remainPercent: 37,
  },
  {
    id: "s02",
    name: "읽혔는데 답장 없는 카톡 1개",
    rarity: "STRANGE",
    smell: "핸드폰 화면 빛",
    desc: "읽음 표시는 뜨는데 아무 말 없는 그 시간. 10분째 폰을 내려놓지 못하는 상태.",
    remainPercent: 68,
  },
  {
    id: "s03",
    name: "갑자기 기억난 창피했던 7년 전",
    rarity: "STRANGE",
    smell: "그 당시 교실 냄새",
    desc: "왜 지금 생각났는지 모름. 자려고 누웠을 때 갑자기 등장함. 아직도 얼굴 빨개짐.",
    remainPercent: 82,
  },
  {
    id: "s04",
    name: "새벽 3시에 켜진 TV",
    rarity: "STRANGE",
    smell: "전자기기 + 밤공기",
    desc: "끈 것 같은데 켜져 있음. 아니면 끈 게 꿈이었나. 이제 뭘 믿어야 하는지 모름.",
    remainPercent: 29,
  },
  {
    id: "s05",
    name: "냉장고 끝자리에 남은 달걀 1개",
    rarity: "STRANGE",
    smell: "냉장고 안쪽",
    desc: "판 단위로 사는데 항상 1개가 남음. 이걸 어쩌란 말인가.",
    remainPercent: 45,
  },
  {
    id: "s06",
    name: "사회생활 가능한 척 모드 잔여물",
    rarity: "STRANGE",
    smell: "향수 + 피로",
    desc: "퇴근하면서 모드가 해제됨. 집 들어오자마자 뻗는 이유. 잔여 에너지: 2%.",
    remainPercent: 73,
  },
  /* ──── SAD ──── */
  {
    id: "sad01",
    name: "혼자 남은 편의점 의자",
    rarity: "SAD",
    smell: "비 오는 날 입구 근처",
    desc: "의자가 두 개인데 하나만 사용된 흔적. 누군가 혼자 앉아 밥을 먹었음.",
    remainPercent: 61,
  },
  {
    id: "sad02",
    name: "비 오는 날 창문에 맺힌 물방울",
    rarity: "SAD",
    smell: "빗물 + 유리",
    desc: "어디로 흘러갈지 모르고 그냥 붙어있는 물방울. 결국 언젠가는 흘러내림.",
    remainPercent: 58,
  },
  {
    id: "sad03",
    name: "다 쓴 다이어리 마지막 페이지",
    rarity: "SAD",
    smell: "종이 + 볼펜 잉크",
    desc: "뭔가를 적다가 더 이상 공간이 없어 멈춘 감정. 계속하려면 새 걸 사야 함.",
    remainPercent: 49,
  },
  {
    id: "sad04",
    name: "마지막으로 연락한 지 3년 된 번호",
    rarity: "SAD",
    smell: "없음",
    desc: "지워야 하는데 못 지우고 있음. 가끔 실수로 탭할까봐 두려움.",
    remainPercent: 78,
    partialCrush: true,
  },
  /* ──── VERY WET ──── */
  {
    id: "w01",
    name: "비 맞은 종이가방",
    rarity: "VERY WET",
    smell: "젖은 종이",
    desc: "우산을 가져갔어야 했는데 안 가져감. 내용물도 다 젖었음. 이미 늦음.",
    remainPercent: 66,
  },
  {
    id: "w02",
    name: "눈물인지 빗물인지 모를 것",
    rarity: "VERY WET",
    smell: "비 + 소금기",
    desc: "바깥에서 울다가 비까지 맞은 것. 본인도 뭐가 뭔지 모름. 그냥 젖음.",
    remainPercent: 74,
    partialCrush: true,
  },
  {
    id: "w02b",
    name: "세탁기에 잊혀진 세제 뚜껑",
    rarity: "VERY WET",
    smell: "세제 + 습기",
    desc: "세탁기 안에 세제 뚜껑이 또 들어갔음. 이번엔 4번째. 꺼낼 때마다 깜짝 놀람.",
    remainPercent: 38,
  },
  {
    id: "w03",
    name: "혼자 삭혀서 눅눅해진 감정 덩어리",
    rarity: "VERY WET",
    smell: "삭힌 것 특유의 냄새",
    desc: "표현 안 하고 혼자 참다가 형체가 불분명해진 것. 꺼내기 어려운 상태.",
    remainPercent: 81,
    partialCrush: true,
  },
  /* ──── FORGOTTEN ──── */
  {
    id: "f01",
    name: "5년 된 지갑 속 영수증",
    rarity: "FORGOTTEN",
    smell: "가죽 + 오래된 종이",
    desc: "언제 받았는지 모름. 숫자가 흐릿해서 금액도 알 수 없음. 그냥 있음.",
    remainPercent: 91,
  },
  {
    id: "f02",
    name: "잃어버린 줄 알았는데 찾은 물건",
    rarity: "FORGOTTEN",
    smell: "잊혀진 서랍 냄새",
    desc: "없는 줄 알고 새로 샀는데 다시 나타남. 이미 쓸모가 없어진 상태.",
    remainPercent: 52,
  },
  {
    id: "f03",
    name: "아무도 안 찾아간 택배",
    rarity: "FORGOTTEN",
    smell: "종이박스 + 테이프",
    desc: "경비실에서 한 달째 기다리고 있음. 이제 누구 건지도 모름.",
    remainPercent: 77,
    partialCrush: true,
  },
  {
    id: "f04",
    name: "저장해놓고 안 본 유튜브 재생목록",
    rarity: "FORGOTTEN",
    smell: "없음. 디지털이라.",
    desc: "나중에 보려고 저장했는데 나중이 오지 않음. 427개 쌓임.",
    remainPercent: 44,
  },
  /* ──── LEGENDARY SADNESS ──── */
  {
    id: "l01",
    name: "마지막 버스를 놓친 그 感",
    rarity: "LEGENDARY SADNESS",
    smell: "밤공기 + 디젤",
    desc: "1초 차이로 놓침. 이미 출발해버린 버스 뒷모습을 30초쯤 바라봄. 다음 버스는 40분 뒤.",
    remainPercent: 88,
    partialCrush: true,
  },
  {
    id: "l02",
    name: "처음이자 마지막이었던 그 식당 폐업 안내문",
    rarity: "LEGENDARY SADNESS",
    smell: "그 식당 밥 냄새 (기억 속)",
    desc: "또 가려고 했는데 문에 종이가 붙어있었음. 다시는 먹을 수 없음. 맛을 기억하려 해도 점점 흐려짐.",
    remainPercent: 95,
    partialCrush: true,
  },
  {
    id: "l03",
    name: "오래전 보낸 메시지의 미전송 흔적",
    rarity: "LEGENDARY SADNESS",
    smell: "없음. 이미 다 지나감.",
    desc: "보냈는데 도달 안 된 메시지. 그때 전달됐으면 뭔가 달라졌을지도 모름. 지금은 확인할 방법 없음.",
    remainPercent: 99,
    partialCrush: true,
  },
];

/* ── 희귀도별 가중치 ── */
const RARITY_WEIGHTS: Record<Rarity, number> = {
  "COMMON":            50,
  "STRANGE":           25,
  "SAD":               12,
  "VERY WET":          7,
  "FORGOTTEN":         4,
  "LEGENDARY SADNESS": 2,
};

/* ── 모드별 희귀도 보정 ── */
const MODE_BONUS: Record<string, Partial<Record<Rarity, number>>> = {
  drift:   { "STRANGE": 5, "FORGOTTEN": 2 },
  dissolve:{ "VERY WET": 5, "SAD": 3 },
  burn:    { "LEGENDARY SADNESS": 3, "FORGOTTEN": 3 },
  sink:    { "FORGOTTEN": 6, "LEGENDARY SADNESS": 4 },
};

export function selectByproduct(mode?: string): Byproduct {
  const weights = { ...RARITY_WEIGHTS };
  if (mode && MODE_BONUS[mode]) {
    const bonus = MODE_BONUS[mode];
    for (const [rarity, val] of Object.entries(bonus)) {
      weights[rarity as Rarity] = (weights[rarity as Rarity] ?? 0) + (val ?? 0);
    }
  }

  const total = Object.values(weights).reduce((a, b) => a + b, 0);
  let roll = Math.random() * total;
  let chosenRarity: Rarity = "COMMON";
  for (const [rarity, w] of Object.entries(weights)) {
    roll -= w;
    if (roll <= 0) { chosenRarity = rarity as Rarity; break; }
  }

  const pool = ALL_BYPRODUCTS.filter((b) => b.rarity === chosenRarity);
  return pool[Math.floor(Math.random() * pool.length)];
}
