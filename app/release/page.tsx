"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence, useAnimate } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { buildResultUrl } from "@/lib/resultCard";

type Mode = "chew" | "grind" | "burn" | "press";
type Phase = "write" | "animating" | "loading" | "done";

const ROSE = "#C8607A";
const INK  = "#1A1410";

// ── 병맛 로딩 메시지 풀 (감정 처리 중 보여줄 것들) ──
const LOADING_MSGS = [
  "감정 불러오는 중...",
  "눈물 압축 중...",
  "멘탈 조각 수집 중...",
  "우걱이 출동 중...",
  "AI 당황 중...",
  "사회생활 흔적 수집 중...",
  "괜찮은 척 해제 중...",
  "감정 CPU 과부하...",
  "울컥.dll 실행 중...",
  "비린맛 분석 중...",
  "감정 곰팡이 감지 중...",
  "혼자 삭힌 것들 추출 중...",
  "버티기 모드 해제 중...",
  "마음 삐걱 소리 측정 중...",
  "감정 발효도 체크 중...",
  "묵은 감정 채취 중...",
  "AI도 잠시 당황 중...",
  "인간관계.exe 로드 중...",
  "괜찮음 거짓말 탐지 중...",
  "감정 잔류물 처리 중...",
  "억울함 계량 중...",
  "서운함 발효도 측정 중...",
  "말 못한 것들 추출 중...",
  "멘탈 수분 함량 체크 중...",
  "우걱이 위장 준비 중...",
  "감정 바삭도 측정 중...",
  "사회생활 데미지 계산 중...",
  "눈물 농도 분석 중...",
  "자책 루프 종료 중...",
  "우걱이가 마지막으로 씹는 중...",
] as const;

// placeholder 랜덤 풀 (확장)
const PLACEHOLDERS = [
  "여기에 감정 투입…\n안 적어도 됨. 근데 적으면 더 잘 씹힘.",
  "오늘 뭐 때문에 꾸역꾸역 버텼음?\n\n다 쏟아내도 됨. 어차피 우걱이가 씹어먹을 거임.",
  "질긴 감정은 처리 오래 걸림.\n그래도 일단 투입해봐.",
  "우걱이가 읽는 중…\n\n뭐든 괜찮음. 어차피 갈아버릴 거니까.",
  "오늘 뭐가 제일 걸렸음?\n\n솔직하게 써도 됨. 우걱이는 판단 안 함. 그냥 씹어먹음.",
  "킹받는 거 있으면 다 써.\n우걱이가 대신 빡쳐줄 수 있음.",
  "오늘 하루 어땠음?\n말 못 한 것들 있으면 여기에 버려.",
  "지금 마음이 좀 복잡함?\n\n복잡한 채로 던져도 됨. 우걱이가 알아서 갈아냄.",
  "하고 싶은 말 있는데 못 했음?\n\n여기서 하면 됨. 우걱이만 들음. 그리고 씹음.",
  "오늘 참은 게 있음?\n\n얼마나 참았는지 모르겠지만 다 써도 됨.",
];

// 상황별 표정 이모지
const EXPRESSIONS: Record<string, string> = {
  idle:    ["😐","🫠","😵‍💫","🥴","😑"][Math.floor(Math.random()*5)],
  eating:  "🤢",
  stressed:"😵",
  overload:"🔥",
};

// ── 소화 멈춤 위로 문구 ──────────────────────────────────
const SOHWA_MSGS = [
  "괜찮은 척 오래해서 좀 굳어있었음.",
  "혼자 해결하려고 너무 오래 들고 있었네.",
  "오늘은 강한 사람 안 해도 됨.",
  "이건 우걱이도 오래 씹었음.",
  "너무 오래 참아서 딱딱해졌음.",
  "말 안 하고 버티느라 수고했음.",
  "이건 소화보다 위로가 먼저인 듯.",
  "오늘은 그냥 살아있는 걸로 됨.",
  "이 감정은 오래됐음. 그만큼 힘들었던 거임.",
  "씹다가 울컥함.",
  "혼자 너무 오래 버텨서 우걱이도 좀 마음 아팠음.",
  "오늘 감정은 안 갈고 그냥 안아줌.",
  "이건 빨리 버릴 수 있는 감정이 아니었음.",
];

// ── 소화 멈춤 허접한 천사 SVG ────────────────────────────
function SoHwaAngel() {
  return (
    <svg width="120" height="140" viewBox="0 0 120 140" style={{ overflow:"visible" }}>
      {/* 후광 — 삐뚤한 타원 */}
      <ellipse cx="60" cy="14" rx="28" ry="9" fill="none" stroke="#FFD060" strokeWidth="3.5"
        strokeDasharray="4,2" opacity="0.85" transform="rotate(-4, 60, 14)"/>
      {/* 왼쪽 날개 — 허접하게 */}
      <path d="M32,60 Q12,40 8,55 Q6,72 28,72 Q18,62 32,60"
        fill="#F8F4E0" stroke="#1A1410" strokeWidth="2.2" strokeLinejoin="round"/>
      <path d="M30,65 Q14,58 16,72" fill="none" stroke="#C8C0A0" strokeWidth="1.2" opacity="0.5"/>
      {/* 오른쪽 날개 */}
      <path d="M88,60 Q108,40 112,55 Q114,72 92,72 Q102,62 88,60"
        fill="#F8F4E0" stroke="#1A1410" strokeWidth="2.2" strokeLinejoin="round"/>
      <path d="M90,65 Q106,58 104,72" fill="none" stroke="#C8C0A0" strokeWidth="1.2" opacity="0.5"/>
      {/* 몸통 — 대충 그린 */}
      <ellipse cx="60" cy="75" rx="22" ry="28" fill="#FDFAF0" stroke="#1A1410" strokeWidth="2.5"/>
      {/* 얼굴 — 멍한 표정 */}
      <ellipse cx="60" cy="52" rx="20" ry="22" fill="#FDFAF0" stroke="#1A1410" strokeWidth="2.5"/>
      {/* 왼쪽 눈 — 초점 약간 다름 */}
      <ellipse cx="53" cy="49" rx="4.5" ry="5.5" fill="#1A1410"/>
      <circle cx="51.5" cy="47" r="1.5" fill="white" opacity="0.85"/>
      {/* 오른쪽 눈 */}
      <ellipse cx="67" cy="50" rx="4" ry="5" fill="#1A1410"/>
      <circle cx="65.5" cy="48" r="1.5" fill="white" opacity="0.85"/>
      {/* 입 — 뭔가 말하려는 듯 */}
      <path d="M53,62 Q60,65 67,61" fill="none" stroke="#1A1410" strokeWidth="2.2" strokeLinecap="round"/>
      {/* 볼 — 대충 그린 핑크 */}
      <ellipse cx="48" cy="57" rx="6" ry="4" fill="#F8B0C0" opacity="0.4" transform="rotate(-5,48,57)"/>
      <ellipse cx="72" cy="58" rx="6" ry="4" fill="#F8B0C0" opacity="0.4" transform="rotate(5,72,58)"/>
      {/* 손 — 뭔가 들고 있음 */}
      <path d="M40,88 Q32,96 38,104 Q44,98 40,88" fill="none" stroke="#1A1410" strokeWidth="2"/>
      {/* 허접한 하트 */}
      <path d="M36,104 C36,100 32,98 32,102 C32,106 36,110 36,110 C36,110 40,106 40,102 C40,98 36,100 36,104"
        fill={ROSE} opacity="0.7" stroke="#1A1410" strokeWidth="1"/>
      {/* 별똥별 */}
      <path d="M10,30 L14,22 L18,30 L10,26 L18,26 Z" fill="#FFD060" opacity="0.7"/>
      <path d="M100,90 L103,84 L106,90 L100,87 L106,87 Z" fill="#FFD060" opacity="0.6"/>
      {/* 이상한 낙서선 */}
      <path d="M20,100 Q25,95 30,100 Q35,105 40,100" fill="none" stroke="#C8BEB0" strokeWidth="1" opacity="0.4"/>
    </svg>
  );
}

// ── 소화 멈춤 오버레이 ────────────────────────────────────
function SoHwaStopOverlay({ msg, onContinue, onKeep }: {
  msg: string;
  onContinue: () => void;
  onKeep: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed", inset: 0, zIndex: 80,
        background: "#FDFBF5",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "32px 28px",
      }}
    >
      {/* 배경 — 아주 희미한 별 */}
      {[[12,8],[88,15],[5,70],[95,60],[50,90]].map(([x,y],i)=>(
        <div key={i} style={{ position:"absolute", left:`${x}%`, top:`${y}%`, fontSize:12, opacity:0.12, pointerEvents:"none" }}>✦</div>
      ))}

      <motion.div
        initial={{ scale: 0.7, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 150, damping: 14 }}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", maxWidth: 320, width: "100%" }}
      >
        {/* 타이틀 */}
        <p style={{ fontSize: 10, fontFamily: "monospace", color: "#B4A890", letterSpacing: "0.18em", marginBottom: 14 }}>
          ✨ 우걱이 소화 멈춤 ✨
        </p>

        {/* 천사 */}
        <motion.div
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ marginBottom: 20 }}
        >
          <SoHwaAngel />
        </motion.div>

        {/* 위로 문구 — 손글씨 느낌으로 삐뚤게 */}
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{
            background: "#FAF8EE",
            border: `2px solid ${INK}`,
            borderRadius: 2,
            padding: "14px 18px",
            width: "100%",
            boxShadow: `3px 3px 0 ${INK}`,
            marginBottom: 24,
            position: "relative",
          }}
        >
          {/* 테이프 느낌 */}
          <div style={{ position:"absolute", top:-7, left:"50%", transform:"translateX(-50%)", width:52, height:11, background:"rgba(212,188,144,0.55)", borderRadius:1 }}/>
          <p style={{ fontSize: 16, fontFamily: "var(--font-serif)", color: INK, lineHeight: 1.7, textAlign: "center" }}>
            {msg}
          </p>
          {/* 대충 그린 하트 낙서 */}
          <div style={{ textAlign:"right", marginTop:8, fontSize:16, color:ROSE, opacity:0.7 }}>♥</div>
        </motion.div>

        {/* 버튼들 */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%" }}
        >
          <button onClick={onContinue} style={{
            height: 48, background: INK, border: `2px solid ${INK}`, borderRadius: 2,
            fontSize: 14, fontFamily: "var(--font-serif)", color: "#FAF8F2", fontWeight: 700,
            cursor: "pointer", boxShadow: `3px 3px 0 #6A6258`,
          }}>
            ...고마움 (빠각 결과지 받기)
          </button>
          <button onClick={onKeep} style={{
            height: 42, background: "#FAF8F2", border: `1.5px dashed ${INK}50`, borderRadius: 2,
            fontSize: 13, fontFamily: "var(--font-serif)", color: "#8A8070", cursor: "pointer",
          }}>
            오늘은 안 갈래. 그냥 들고 있을게.
          </button>
        </motion.div>

        <p style={{ fontSize: 9, color: "#C4BAB0", fontFamily: "monospace", marginTop: 16, letterSpacing: "0.06em" }}>
          — 우걱이 처리소 —
        </p>
      </motion.div>
    </motion.div>
  );
}

const MODES: { id: Mode; label: string; sub: string; bg: string; rot: number }[] = [
  { id: "chew",  label: "우걱 먹이기",    sub: "바람에 날리기",   bg: "#F0E0DC", rot: -6 },
  { id: "grind", label: "빠각 돌리기",    sub: "조용히 사라지기", bg: "#D8E8DC", rot:  4 },
  { id: "burn",  label: "질겅 처리하기",  sub: "물에 녹여버리기", bg: "#F0DDD0", rot: -3 },
  { id: "press", label: "감정 갈갈 모드", sub: "깊이 내려쳐두기", bg: "#E4DCED", rot:  5 },
];

const RESULTS = [
  { big: "빠각 완료.",          sub: "우걱이가 다 씹어먹었음." },
  { big: "갈렸음.",             sub: "생각보다 빨리 처리됨." },
  { big: "처리 완료.",          sub: "오래 묵혔던 거 맞지?" },
  { big: "삭혀버렸음.",         sub: "찌꺼기 좀 남았는데 아무튼 완료." },
  { big: "우걱우걱 완료.",      sub: "이빨에 좀 꼈는데 억지로 처리함." },
  { big: "냠.",                 sub: "생각보다 맛있었음. (좀 맵긴 했음)" },
  { big: "꾸깃 완료.",          sub: "형태는 없어졌는데 아무튼 처리됨." },
  { big: "와장창 완료.",        sub: "박살났는데 잘 됐음." },
  { big: "압축 완료.",          sub: "감정 용량: 0mb (일단은)" },
  { big: "소화됨.",             sub: "우걱이 위장이 꽤 강함." },
  { big: "분해 완료.",          sub: "분자 단위로 갈렸음." },
  { big: "이제 없음.",          sub: "어디 갔는지는 모름. 아무튼 없음." },
  { big: "비워짐.",             sub: "잠깐이라도 가볍겠지." },
  { big: "폭파 완료.",          sub: "아주 시원하게 처리됨." },
  { big: "우걱이 만족.",        sub: "맛있다고 함. (비린 맛 났다고도 함)" },
  { big: "증발됨.",             sub: "흔적도 없이. 잘 됐음." },
  { big: "빠각빠각 완료.",      sub: "소리가 꽤 컸음. 우걱이 만족." },
  { big: "처리 완료 (잠정).",   sub: "찌꺼기 조금 있는데 내일 또 와도 됨." },
  { big: "전소됨.",             sub: "태웠음. 재도 없음." },
  { big: "쪼개짐.",             sub: "산산조각이지만 처리됨." },
];

/* ── 삐뚤삐뚤 이빨 SVG ── */
function UgegiTeeth({ stressed }: { stressed: boolean }) {
  return (
    <svg viewBox="0 0 400 90" preserveAspectRatio="none"
      style={{ width:"100%", display:"block", marginBottom:-2 }}>
      <rect width="400" height="90" fill="#efe3cf"/>
      {/* 잇몸 — 울퉁불퉁하게 */}
      <path d="M0,0 Q20,4 40,1 Q60,-2 80,3 Q100,6 120,1 Q140,-1 160,4 Q180,7 200,2 Q220,-1 240,4 Q260,6 280,1 Q300,-2 320,3 Q340,6 360,1 Q380,-1 400,3 L400,28 Q200,22 0,28 Z"
        fill={INK}/>
      {/* 이빨들 — 각각 다른 크기/형태/색상 */}

      {/* 이빨 1: 좁고 날카롭 */}
      <path d="M4,26 L22,26 L17,78 L12,58 L7,80 Z" fill="#F5F0D0"/>
      {/* 이빨 2: 넓고 누렇 */}
      <path d="M22,26 L50,26 L46,70 L36,50 L27,72 Z" fill="#EDE8C0"/>
      {/* 이빨 3: 깨진 이빨 */}
      <path d="M50,26 L72,26 L70,55 L64,40 L59,52 L55,35 L52,60 Z" fill="#F8F4E0"/>
      {/* 이빨 4: 크고 정상 */}
      <path d="M72,26 L102,26 L98,82 L88,60 L78,84 Z" fill="#FAF8F2"/>
      {/* 이빨 5: 짧고 뭉툭 */}
      <path d="M102,26 L126,26 L122,62 L114,48 L108,64 Z" fill="#ECE7C4"/>
      {/* 이빨 6: 갈라진 금 */}
      <path d="M126,26 L155,26 L151,75 L141,54 L131,77 Z" fill="#F5F0D8"/>
      <line x1="140" y1="26" x2="143" y2="60" stroke="#D8D0B0" strokeWidth="1.5" opacity="0.7"/>
      {/* 이빨 7: 얇고 길쭉 */}
      <path d="M155,26 L172,26 L168,85 L163,65 L159,86 Z" fill="#FAF8F2"/>
      {/* 이빨 8: 넓고 누렇 */}
      <path d="M172,26 L205,26 L201,72 L190,52 L180,75 Z" fill="#E8E2B8"/>
      {/* 이빨 9: 삐뚤어짐 */}
      <path d="M205,26 L228,26 L226,68 L218,48 L210,65 Z" fill="#F5F0D0" transform="rotate(2,216,50)"/>
      {/* 이빨 10: 크고 튼튼 */}
      <path d="M228,26 L262,26 L258,80 L244,58 L232,82 Z" fill="#FAF8F2"/>
      {/* 이빨 11: 깨져서 짧음 */}
      <path d="M262,26 L284,26 L280,50 L274,38 L268,48 Z" fill="#ECE7C4"/>
      {/* 이빨 12: 길고 날카롭 */}
      <path d="M284,26 L304,26 L300,88 L292,66 L288,88 Z" fill="#F8F4E0"/>
      {/* 이빨 13: 뭉툭 */}
      <path d="M304,26 L328,26 L324,65 L316,50 L310,66 Z" fill="#F5F0D0"/>
      {/* 이빨 14: 금 있음 */}
      <path d="M328,26 L358,26 L354,76 L344,54 L334,78 Z" fill="#FAF8F2"/>
      <line x1="342" y1="26" x2="338" y2="62" stroke="#C8C0A0" strokeWidth="1.2" opacity="0.6"/>
      {/* 이빨 15: 마지막 짧음 */}
      <path d="M358,26 L400,26 L396,60 L380,44 L368,62 Z" fill="#EDE8C0"/>

      {/* 스트레스 받으면 진동 표시 */}
      {stressed && (
        <>
          <line x1="30" y1="14" x2="35" y2="8" stroke={ROSE} strokeWidth="1.5" opacity="0.7"/>
          <line x1="200" y1="12" x2="208" y2="6" stroke={ROSE} strokeWidth="1.5" opacity="0.7"/>
          <line x1="340" y1="14" x2="348" y2="8" stroke={ROSE} strokeWidth="1.5" opacity="0.7"/>
        </>
      )}
    </svg>
  );
}

/* ── 기괴하고 탈동기화된 눈 ── */
function UgegiEyes({ active, stressed }: { active: boolean; stressed: boolean }) {
  const [leftX,  setLeftX]  = useState(-4);
  const [leftY,  setLeftY]  = useState(2);
  const [rightX, setRightX] = useState(5);
  const [rightY, setRightY] = useState(-3);
  const [leftBlink,  setLeftBlink]  = useState(false);
  const [rightBlink, setRightBlink] = useState(false);
  const [leftSpeed,  setLeftSpeed]  = useState(0.55);
  const [rightSpeed, setRightSpeed] = useState(0.65);
  const [leftScale,  setLeftScale]  = useState(1);
  const [rightScale, setRightScale] = useState(1);

  useEffect(() => {
    // 왼쪽 눈 — 짧은 주기로 불규칙하게
    const lMove = setInterval(() => {
      const isJerk = Math.random() < 0.4;
      setLeftSpeed(isJerk ? 0.07 : 0.4 + Math.random() * 0.5);
      setLeftX((Math.random() - 0.5) * 26 - 3);
      setLeftY((Math.random() - 0.5) * 16);
    }, 650 + Math.random() * 500);

    // 오른쪽 눈 — 다른 타이밍, 다른 범위
    const rMove = setInterval(() => {
      const isJerk = Math.random() < 0.45;
      setRightSpeed(isJerk ? 0.06 : 0.35 + Math.random() * 0.55);
      setRightX((Math.random() - 0.5) * 26 + 3);
      setRightY((Math.random() - 0.5) * 16);
    }, 900 + Math.random() * 600);

    // 왼쪽 눈 독립 깜빡임 — 가끔 이중 깜빡임
    const lBlink = setInterval(() => {
      setLeftBlink(true);
      const dur = Math.random() < 0.25 ? 160 : 55;
      setTimeout(() => {
        setLeftBlink(false);
        if (Math.random() < 0.28) {
          setTimeout(() => { setLeftBlink(true); setTimeout(() => setLeftBlink(false), 50); }, 130);
        }
      }, dur);
    }, 1500 + Math.random() * 2000);

    // 오른쪽 눈 독립 깜빡임 — 다른 타이밍
    const rBlink = setInterval(() => {
      setRightBlink(true);
      setTimeout(() => setRightBlink(false), 45 + Math.random() * 75);
    }, 2100 + Math.random() * 1800);

    // 동공 크기 갑자기 변화 — 확장/수축
    const pulse = setInterval(() => {
      if (Math.random() < 0.5) {
        setLeftScale(0.55 + Math.random() * 0.9);
        setTimeout(() => setLeftScale(1), 150 + Math.random() * 250);
      }
      if (Math.random() < 0.4) {
        setRightScale(0.6 + Math.random() * 0.85);
        setTimeout(() => setRightScale(1), 140 + Math.random() * 220);
      }
    }, 1200 + Math.random() * 1400);

    return () => {
      clearInterval(lMove); clearInterval(rMove);
      clearInterval(lBlink); clearInterval(rBlink);
      clearInterval(pulse);
    };
  }, []);

  return (
    <div style={{ display:"flex", gap:40, justifyContent:"center", alignItems:"center", height:110, position:"relative", zIndex:5 }}>

      {/* 왼쪽 눈 */}
      <motion.div
        animate={stressed ? { x:[-4,5,-4,5,0], y:[2,-3,2,-3,0] } : {}}
        transition={{ duration:0.22, repeat: stressed ? Infinity : 0 }}
        style={{ position:"relative", transform:"rotate(-6deg)" }}
      >
        <div style={{
          width:68, height:74,
          borderRadius:"44% 50% 50% 50%",
          background:"#FAF4E0",
          border:`4px solid ${INK}`,
          position:"relative", overflow:"hidden",
          boxShadow: active ? `0 0 24px ${ROSE}AA, inset 0 2px 8px rgba(0,0,0,0.1)` : `0 4px 16px rgba(0,0,0,0.5)`,
        }}>
          <motion.div
            animate={{ x: leftX, y: leftY, scaleY: leftBlink ? 0.08 : 1, scale: leftScale }}
            transition={{ x:{ duration:leftSpeed, ease:"easeOut" }, y:{ duration:leftSpeed, ease:"easeOut" }, scaleY:{ duration:0.06 }, scale:{ duration:0.16 } }}
            style={{ position:"absolute", top:"50%", left:"50%", width:34, height:34, borderRadius:"50%", background: active ? ROSE : INK, transform:"translate(-50%,-50%)" }}
          >
            <div style={{ position:"absolute", top:5, left:6, width:10, height:10, borderRadius:"50%", background:"white", opacity:0.88 }}/>
            <div style={{ position:"absolute", top:13, right:4, width:5, height:5, borderRadius:"50%", background:"white", opacity:0.45 }}/>
          </motion.div>
          <motion.div
            animate={{ scaleY: leftBlink ? 1 : 0 }}
            transition={{ duration:0.06 }}
            style={{ position:"absolute", inset:0, background:INK, transformOrigin:"top center", borderRadius:"inherit" }}
          />
          <div style={{ position:"absolute", top:2, left:4, right:4, height:10, background:INK, opacity:0.15, borderRadius:"50% 50% 0 0" }}/>
        </div>
        <div style={{ position:"absolute", bottom:-8, left:"50%", transform:"translateX(-50%)", width:54, height:10, borderRadius:"50%", background:INK, opacity:0.22 }}/>
        <div style={{ position:"absolute", top:48, right:-8, width:16, height:3, background:INK, opacity:0.25, borderRadius:2, transform:"rotate(30deg)" }}/>
      </motion.div>

      {/* 오른쪽 눈 */}
      <motion.div
        animate={stressed ? { x:[5,-4,5,-4,0], y:[-3,2,-3,2,0] } : {}}
        transition={{ duration:0.22, delay:0.09, repeat: stressed ? Infinity : 0 }}
        style={{ position:"relative", transform:"rotate(4deg)" }}
      >
        <div style={{
          width:72, height:70,
          borderRadius:"50% 46% 50% 46%",
          background:"#FBF6E6",
          border:`4px solid ${INK}`,
          position:"relative", overflow:"hidden",
          boxShadow: active ? `0 0 24px ${ROSE}AA, inset 0 2px 8px rgba(0,0,0,0.1)` : `0 4px 16px rgba(0,0,0,0.5)`,
        }}>
          <motion.div
            animate={{ x: rightX, y: rightY, scaleY: rightBlink ? 0.08 : 1, scale: rightScale }}
            transition={{ x:{ duration:rightSpeed, ease:"easeOut" }, y:{ duration:rightSpeed, ease:"easeOut" }, scaleY:{ duration:0.06 }, scale:{ duration:0.16 } }}
            style={{ position:"absolute", top:"50%", left:"50%", width:38, height:36, borderRadius:"48% 52% 50% 50%", background: active ? ROSE : INK, transform:"translate(-50%,-50%)" }}
          >
            <div style={{ position:"absolute", top:6, left:8, width:11, height:11, borderRadius:"50%", background:"white", opacity:0.9 }}/>
            <div style={{ position:"absolute", bottom:5, right:5, width:5, height:5, borderRadius:"50%", background:"white", opacity:0.4 }}/>
          </motion.div>
          <motion.div
            animate={{ scaleY: rightBlink ? 1 : 0 }}
            transition={{ duration:0.06 }}
            style={{ position:"absolute", inset:0, background:INK, transformOrigin:"top center", borderRadius:"inherit" }}
          />
        </div>
        <div style={{ position:"absolute", bottom:-8, left:"50%", transform:"translateX(-50%)", width:58, height:10, borderRadius:"50%", background:INK, opacity:0.18 }}/>
      </motion.div>

    </div>
  );
}

/* ── 배경 잉크 얼룩 + 경고문 ── */
function BackgroundDoodles({ textLen }: { textLen: number }) {
  return (
    <>
      {/* 잉크 얼룩들 */}
      <div style={{ position:"fixed", top:"18%", left:"3%", width:48, height:34, borderRadius:"60% 40% 70% 30%", background:INK, opacity:0.04, filter:"blur(3px)", pointerEvents:"none" }}/>
      <div style={{ position:"fixed", top:"55%", right:"4%", width:32, height:44, borderRadius:"40% 60% 30% 70%", background:"#8A6840", opacity:0.05, filter:"blur(4px)", pointerEvents:"none" }}/>
      <div style={{ position:"fixed", top:"75%", left:"8%", width:60, height:22, borderRadius:"70% 30% 60% 40%", background:INK, opacity:0.03, filter:"blur(5px)", pointerEvents:"none" }}/>
      <div style={{ position:"fixed", top:"38%", right:"6%", width:24, height:36, borderRadius:"50%", background:ROSE, opacity:0.04, filter:"blur(6px)", pointerEvents:"none" }}/>

      {/* 경고문들 — 배경에 희미하게 */}
      <div style={{ position:"fixed", top:"15%", right:"2%", fontFamily:"monospace", fontSize:9, color:INK, opacity:0.07, transform:"rotate(88deg)", pointerEvents:"none", whiteSpace:"nowrap" }}>
        ⚠ 감정 과식 주의 ⚠
      </div>
      <div style={{ position:"fixed", top:"62%", left:"1%", fontFamily:"monospace", fontSize:8, color:INK, opacity:0.06, transform:"rotate(-3deg)", pointerEvents:"none", whiteSpace:"nowrap" }}>
        소화 안 될 수 있음
      </div>
      <div style={{ position:"fixed", top:"42%", right:"1%", fontFamily:"monospace", fontSize:8, color:"#8A6840", opacity:0.07, transform:"rotate(2deg)", pointerEvents:"none", whiteSpace:"nowrap" }}>
        감정 투입 전 용량 확인 요망
      </div>
      <div style={{ position:"fixed", top:"85%", right:"5%", fontFamily:"monospace", fontSize:9, color:INK, opacity:0.06, transform:"rotate(-1deg)", pointerEvents:"none", whiteSpace:"nowrap" }}>
        우걱이 책임 불명확
      </div>

      {/* 글자 많아지면 추가 경고 */}
      {textLen > 60 && (
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}
          style={{ position:"fixed", top:"30%", left:"2%", fontFamily:"monospace", fontSize:9, color:ROSE, opacity:0.2, transform:"rotate(-8deg)", pointerEvents:"none", whiteSpace:"nowrap" }}>
          !! 용량 초과 경고 !!
        </motion.div>
      )}
      {textLen > 120 && (
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}
          style={{ position:"fixed", top:"70%", right:"2%", fontFamily:"monospace", fontSize:9, color:ROSE, opacity:0.25, transform:"rotate(5deg)", pointerEvents:"none", whiteSpace:"nowrap" }}>
          우걱이 힘들어하는 중...
        </motion.div>
      )}
    </>
  );
}

function ReleaseContent() {
  const params = useSearchParams();
  const router = useRouter();
  const [text, setText]   = useState(params.get("text") ?? "");
  const [mode, setMode]   = useState<Mode | null>(null);
  const [phase, setPhase] = useState<Phase>("write");
  const [showP, setShowP] = useState(false);
  const [result]          = useState(() => RESULTS[Math.floor(Math.random() * RESULTS.length)]);
  const [scope, animate]  = useAnimate();
  // 랜덤 placeholder
  const [placeholder]     = useState(() => PLACEHOLDERS[Math.floor(Math.random() * PLACEHOLDERS.length)]);
  // 랜덤 표정 이모지
  const [expr]            = useState(() => EXPRESSIONS.idle);

  const [soHwaStop, setSoHwaStop]   = useState(false);
  const [soHwaMsg, setSoHwaMsg]     = useState("");
  const [loadingMsg, setLoadingMsg] = useState("");

  const canFeed   = text.trim().length > 0 && mode !== null;
  const stressed  = text.length > 80;
  const overload  = text.length > 140;

  function goToResult() {
    router.push(buildResultUrl([text.trim().slice(0,10)||mode||"감정"], Date.now()%999983));
  }

  const handleFeed = async () => {
    if (!canFeed || phase !== "write") return;
    setPhase("animating");
    if (mode === "chew") {
      await animate(scope.current, { y:[0,0,-100], opacity:[1,1,0], scale:[1,1.02,0.4] }, { duration:1.2, ease:"easeIn" });
    } else if (mode === "grind") {
      await animate(scope.current, { opacity:[1,0.4,0], filter:["blur(0px)","blur(5px)","blur(18px)"], scale:[1,0.97,0.88] }, { duration:1.5 });
    } else if (mode === "burn") {
      await animate(scope.current, { filter:["brightness(1) sepia(0)","brightness(1.4) sepia(0.8) hue-rotate(-18deg)","brightness(2.2) sepia(1) blur(12px)"], scaleY:[1,0.95,0.25], opacity:[1,0.9,0], y:[0,-12,-30] }, { duration:1.4 });
    } else if (mode === "press") {
      await animate(scope.current, { scaleY:[1,1.03,0.06], scaleX:[1,1,1.25], opacity:[1,0.9,0], y:[0,5,8] }, { duration:1.3 });
    }
    setShowP(true);
    setTimeout(()=>setShowP(false), 1600);

    // 병맛 로딩 시퀀스 — 랜덤 메시지 3개 순환 후 done
    setPhase("loading");
    const shuffled = [...LOADING_MSGS].sort(() => Math.random() - 0.5).slice(0, 4);
    let i = 0;
    setLoadingMsg(shuffled[0]);
    const msgInterval = setInterval(() => {
      i++;
      if (i < shuffled.length) {
        setLoadingMsg(shuffled[i]);
      } else {
        clearInterval(msgInterval);
        // 18% 확률로 소화 멈춤 이벤트
        if (Math.random() < 0.18) {
          const msg = SOHWA_MSGS[Math.floor(Math.random() * SOHWA_MSGS.length)];
          setSoHwaMsg(msg);
          setSoHwaStop(true);
        } else {
          setPhase("done");
        }
      }
    }, 480);
  };

  const reset = () => { setPhase("write"); setText(""); setMode(null); setSoHwaStop(false); };

  return (
    <div style={{ background:"#efe3cf", minHeight:"100vh", paddingBottom:90, position:"relative", overflow:"hidden" }}>

      <BackgroundDoodles textLen={text.length} />

      {/* ── 우걱이 입 ── */}
      <div className="ugegi-head" style={{ position:"relative" }}>
        {/* 잇몸 + 목구멍 */}
        <div className="ugegi-gum" style={{ background: INK, paddingTop:12 }}>

          {/* 상단 바 */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 16px 8px" }}>
            <div>
              <p style={{ fontSize:8, fontFamily:"monospace", color:"#5A5248", letterSpacing:"0.12em", marginBottom:2 }}>
                UGEGI EMOTIONAL DISPOSAL v0.0.3
              </p>
              <Link href="/" style={{ textDecoration:"none" }}>
                <p style={{ fontSize:14, fontFamily:"var(--font-serif)", color:"#FAF8F2", fontWeight:700 }}>
                  ← 우걱이 처리소
                </p>
              </Link>
            </div>
            <div style={{ textAlign:"right" }}>
              <motion.p
                animate={ overload
                  ? { color:["#C8607A","#FF8070","#C8607A"], scale:[1,1.05,1] }
                  : { opacity:[1,0.6,1] }
                }
                transition={{ duration: overload ? 0.5 : 1.4, repeat:Infinity }}
                style={{ fontSize:10, fontFamily:"monospace", fontWeight:700, letterSpacing:"0.06em", color: overload ? ROSE : "#8A9E78" }}>
                {overload ? "⚠ 용량 초과" : phase==="animating" ? "씹는 중 🦷" : "배고픔 MAX"}
              </motion.p>
              {stressed && !overload && (
                <p style={{ fontSize:8, fontFamily:"monospace", color:"#B87050", marginTop:2 }}>
                  질긴 감정 감지됨
                </p>
              )}
            </div>
          </div>

          {/* 목구멍 힌트 */}
          <div style={{ display:"flex", justifyContent:"center", marginBottom:4 }}>
            <div style={{ width:36, height:10, borderRadius:"50%", background:"#2A1E1A", opacity:0.6 }}/>
          </div>

          {/* 눈 */}
          <div className="ugegi-eyes-wrap">
            <UgegiEyes active={phase==="animating"} stressed={stressed} />
          </div>

          {/* 랜덤 표정 이모지 */}
          <div className="ugegi-expr" style={{ position:"absolute", bottom:16, left:16 }}>
            <motion.span
              animate={ overload
                ? { rotate:[-5,5,-5], scale:[1,1.1,1] }
                : stressed
                ? { rotate:[-3,3,-3] }
                : {} }
              transition={{ duration:0.4, repeat:Infinity }}
              style={{ fontSize:22, display:"block", filter:"grayscale(0.2)" }}
            >
              {overload ? EXPRESSIONS.overload : stressed ? EXPRESSIONS.stressed : phase==="animating" ? EXPRESSIONS.eating : expr}
            </motion.span>
          </div>
        </div>

        {/* 이빨 */}
        <motion.div
          className="ugegi-teeth-wrap"
          animate={ stressed ? { x:[-1,1,-1,1,0] } : {} }
          transition={{ duration:0.3, repeat: stressed ? Infinity : 0 }}
        >
          <UgegiTeeth stressed={stressed} />
        </motion.div>
      </div>

      {/* ── 본문 ── */}
      <div style={{ padding:"18px 18px 0", position:"relative", zIndex:10 }}>
        <AnimatePresence mode="wait">

          {/* 입력 */}
          {phase !== "done" && (
            <motion.div key="write" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0, y:-8 }}>

              <motion.div
                animate={ overload ? { x:[-2,2,-2,2,0] } : {} }
                transition={{ duration:0.25, repeat: overload ? Infinity : 0 }}
                style={{ marginBottom:12 }}
              >
                <h2 style={{ fontSize:20, fontFamily:"var(--font-serif)", color:INK, lineHeight:1.35, marginBottom:4 }}>
                  {overload ? "우걱이 꾸역꾸역 먹는 중…" : "우걱이한테 먹일 감정 적어줘"}
                </h2>
                <p style={{ fontSize:11, fontFamily:"monospace", color: overload ? ROSE : "#A89880", letterSpacing:"0.05em" }}>
                  {overload
                    ? "⚠ 소화 실패 가능성 있음. 그래도 넣어도 됨."
                    : stressed
                    ? "질긴 감정은 처리 오래 걸림."
                    : "뭘 적든 우걱이가 다 씹어먹음. 걱정 말고 투입해."}
                </p>
              </motion.div>

              {/* 투입구 */}
              <div style={{ position:"relative", marginBottom:8 }}>
                <p style={{ fontSize:11, fontFamily:"var(--font-serif)", color:"#A89880", marginBottom:5, transform:"rotate(-1.5deg)", display:"inline-block" }}>
                  오늘 뭐 때문에 꾸역꾸역 버텼음?
                </p>
                <div style={{
                  position:"absolute", top:26, right:-4, zIndex:3,
                  background: overload ? "#B84040" : ROSE, color:"#F5EFE0",
                  fontSize:8, fontFamily:"monospace", letterSpacing:"0.1em",
                  padding:"3px 7px", transform:"rotate(90deg)", transformOrigin:"right center", whiteSpace:"nowrap",
                  transition:"background 0.3s",
                }}>
                  {overload ? "⚠ 과적재" : "▼ 감정 투입구"}
                </div>

                <motion.div ref={scope}
                  animate={ overload ? { x:[-1,1,-1,1,0] } : {} }
                  transition={{ duration:0.2, repeat: overload ? Infinity : 0 }}
                  style={{
                    background:"#FAF8F2",
                    border:`2px solid ${overload ? "#B84040" : INK}`,
                    borderRadius:2,
                    boxShadow: overload ? `4px 4px 0 #B84040` : `4px 4px 0 ${INK}`,
                    overflow:"hidden", position:"relative",
                    transition:"border-color 0.3s, box-shadow 0.3s",
                  }}>
                  <div style={{ position:"absolute", inset:0, pointerEvents:"none",
                    backgroundImage:"repeating-linear-gradient(transparent,transparent 27px,rgba(180,170,150,0.18) 27px,rgba(180,170,150,0.18) 28px)",
                    backgroundPosition:"0 40px" }} />
                  <div style={{ position:"absolute", left:40, top:0, bottom:0, width:1, background:"rgba(220,160,140,0.25)", pointerEvents:"none" }} />
                  <textarea
                    value={text}
                    onChange={e=>setText(e.target.value)}
                    placeholder={placeholder}
                    rows={8}
                    style={{
                      background:"transparent", border:"none", outline:"none", resize:"none",
                      padding:"16px 16px 14px 52px",
                      fontSize:15, lineHeight:"28px", color:INK,
                      fontFamily:"var(--font-serif)", width:"100%",
                      position:"relative", zIndex:1, letterSpacing:"0.01em",
                    }}
                  />
                  <div style={{ position:"absolute", bottom:6, right:8, fontSize:9, fontFamily:"monospace", letterSpacing:"0.06em",
                    color: overload ? "#B84040" : stressed ? ROSE : "#C8BEB0" }}>
                    {overload ? `${text.length}자 — 우걱이 힘들어함 ⚠` : stressed ? `${text.length}자 — 우걱이 꾸역꾸역` : text.length > 0 ? `${text.length}자 — 씹을 수 있음` : "우걱이 입 벌리고 기다리는 중…"}
                  </div>
                </motion.div>
              </div>

              {/* 처리 방식 */}
              <p style={{ fontSize:9, fontFamily:"monospace", color:"#A89880", letterSpacing:"0.12em", marginBottom:10, marginTop:6 }}>
                ▶ 처리 방식 선택 (어떻게 씹을지)
              </p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:10, justifyContent:"center", marginBottom:16 }}>
                {MODES.map(m=>{
                  const active = mode===m.id;
                  return (
                    <motion.button key={m.id} whileTap={{ scale:0.9 }} onClick={()=>setMode(m.id)}
                      style={{
                        background:active?m.bg:"#FAF8F2",
                        border:active?`2px solid ${INK}`:"1.5px solid #C8BEB0",
                        borderRadius:2, padding:"10px 13px",
                        cursor:"pointer", textAlign:"left",
                        boxShadow:active?`3px 3px 0 ${INK}`:"1px 2px 8px rgba(44,40,37,0.08)",
                        transform:`rotate(${active?0:m.rot}deg)`,
                        transition:"all 0.18s ease", minWidth:128, position:"relative",
                      }}>
                      {active && <div style={{ position:"absolute", top:-8, right:6, background:ROSE, color:"#F5EFE0", fontSize:8, fontFamily:"monospace", padding:"1px 5px", borderRadius:2 }}>선택됨</div>}
                      <p style={{ fontSize:13, fontFamily:"var(--font-serif)", color:INK, fontWeight:active?700:400, marginBottom:3 }}>{m.label}</p>
                      <p style={{ fontSize:9, fontFamily:"monospace", color:"#A89880" }}>{m.sub}</p>
                    </motion.button>
                  );
                })}
              </div>

              {/* 던지기 버튼 */}
              <motion.button
                whileHover={canFeed?{ rotate:[-0.5,0.5,-0.5,0], x:[0,2,-2,0] }:{}}
                transition={{ duration:0.4 }}
                whileTap={canFeed?{ scale:0.96 }:{}}
                onClick={handleFeed} disabled={!canFeed||phase==="animating"||phase==="loading"}
                style={{
                  width:"100%", height:54,
                  background:canFeed?ROSE:"#E0D8CC",
                  border:canFeed?`2px solid ${INK}`:"none",
                  borderRadius:2, fontSize:16, fontFamily:"var(--font-serif)", fontWeight:700,
                  color:canFeed?"#F5EFE0":"#B4A890", cursor:canFeed?"pointer":"not-allowed",
                  letterSpacing:"0.03em", boxShadow:canFeed?`5px 5px 0 ${INK}`:"none",
                  marginBottom:10, display:"flex", alignItems:"center", justifyContent:"center", gap:8,
                }}>
                {canFeed && (
                  <svg width="16" height="12" viewBox="0 0 16 12" fill="#F5EFE0">
                    <rect x="0" y="0" width="3" height="8" rx="1"/>
                    <rect x="4" y="0" width="3" height="10" rx="1"/>
                    <rect x="8" y="0" width="3" height="7" rx="1"/>
                    <rect x="12" y="0" width="3" height="9" rx="1"/>
                  </svg>
                )}
                {phase==="animating"||phase==="loading" ? "우걱이 처리 중…" : canFeed ? "우걱이한테 던지기 →" : "오늘 감정 투입 예정…"}
              </motion.button>

              <div style={{ display:"flex", gap:8 }}>
                <Link href="/" style={{ flex:1, height:44, background:INK, border:`2px solid ${INK}`, borderRadius:2, fontSize:13, fontFamily:"var(--font-serif)", fontWeight:700, color:"#FAF8F2", display:"flex", alignItems:"center", justifyContent:"center", textDecoration:"none", boxShadow:`3px 3px 0 #6A6258` }}>
                  하나 더 먹여줄게 ♥
                </Link>
                <Link href="/archive" style={{ flex:1, height:44, background:"#FAF8F2", border:"1.5px solid #C8BEB0", borderRadius:2, fontSize:12, fontFamily:"var(--font-serif)", color:"#7A7260", display:"flex", alignItems:"center", justifyContent:"center", textDecoration:"none" }}>
                  파쇄함 보기
                </Link>
              </div>
            </motion.div>
          )}

          {/* 병맛 로딩 시퀀스 */}
          {phase === "loading" && (
            <motion.div key="loading"
              initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              style={{ display:"flex", flexDirection:"column", alignItems:"center", paddingTop:40, paddingBottom:40 }}>
              <div style={{ background:"#1A1410", border:`2px solid ${ROSE}`, borderRadius:3, padding:"28px 32px", width:"100%", maxWidth:320, textAlign:"center", boxShadow:`0 0 40px ${ROSE}33` }}>
                {/* 우걱이 씹는 애니메이션 도트 */}
                <div style={{ display:"flex", justifyContent:"center", gap:6, marginBottom:18 }}>
                  {[0,1,2,3,4].map(i=>(
                    <motion.div key={i}
                      animate={{ scaleY:[1,2.5,1], opacity:[0.4,1,0.4] }}
                      transition={{ duration:0.5, delay:i*0.1, repeat:Infinity }}
                      style={{ width:5, height:16, background:ROSE, borderRadius:2 }}
                    />
                  ))}
                </div>
                <motion.p
                  key={loadingMsg}
                  initial={{ opacity:0, y:4 }}
                  animate={{ opacity:1, y:0 }}
                  style={{ fontSize:13, fontFamily:"monospace", color:"#F5EFE0", letterSpacing:"0.04em", marginBottom:8, lineHeight:1.6 }}>
                  {loadingMsg}
                </motion.p>
                <p style={{ fontSize:9, color:"#5A5248", fontFamily:"monospace", letterSpacing:"0.1em" }}>
                  UGEGI PROCESSING... PLEASE WAIT
                </p>
              </div>
            </motion.div>
          )}

          {/* 완료 */}
          {phase === "done" && (
            <motion.div key="done" initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.55 }}
              style={{ display:"flex", flexDirection:"column", alignItems:"center", paddingTop:28 }}>
              <motion.div animate={{ rotate:[-0.6,0.4,-0.6] }} transition={{ duration:5, repeat:Infinity }}
                style={{ position:"relative", width:"100%", marginBottom:22 }}>
                <div style={{ background:"#FAF8F2", border:`2.5px solid ${INK}`, borderRadius:2, boxShadow:`5px 5px 0 ${INK}`, padding:"28px 22px 24px", textAlign:"center", position:"relative", overflow:"hidden" }}>
                  <div style={{ position:"absolute", top:10, right:12, fontSize:8, fontFamily:"monospace", color:ROSE, border:`1.5px solid ${ROSE}`, padding:"2px 6px", transform:"rotate(8deg)", opacity:0.85, borderRadius:2, letterSpacing:"0.1em" }}>PROCESSED</div>
                  <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:"repeating-linear-gradient(transparent,transparent 28px,rgba(180,170,150,0.12) 28px,rgba(180,170,150,0.12) 29px)", backgroundPosition:"0 40px" }} />
                  <motion.p initial={{ opacity:0, scale:0.85 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.2, type:"spring", stiffness:200 }}
                    style={{ fontSize:34, fontFamily:"var(--font-serif)", color:INK, marginBottom:10, position:"relative", fontWeight:700 }}>
                    {result.big}
                  </motion.p>
                  <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.4 }}
                    style={{ fontSize:13, color:"#6A6258", fontFamily:"var(--font-serif)", lineHeight:1.7, position:"relative" }}>
                    {result.sub}
                  </motion.p>
                  <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.65 }}
                    style={{ fontSize:9, fontFamily:"monospace", color:"#B4A890", marginTop:14, letterSpacing:"0.1em", position:"relative" }}>
                    — 우걱이 처리소 —
                  </motion.p>
                </div>
              </motion.div>
              <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.6 }} style={{ display:"flex", flexDirection:"column", gap:10, width:"100%" }}>
                <button onClick={goToResult} style={{ height:52, background:ROSE, border:`2px solid ${INK}`, borderRadius:2, fontSize:15, fontFamily:"var(--font-serif)", color:"#F5EFE0", fontWeight:700, cursor:"pointer", boxShadow:`4px 4px 0 #8A3050` }}>
                  빠각 결과지 받기 →
                </button>
                <button onClick={reset} style={{ height:46, background:INK, border:`2px solid ${INK}`, borderRadius:2, fontSize:13, fontFamily:"var(--font-serif)", color:"#FAF8F2", cursor:"pointer", fontWeight:700, boxShadow:`3px 3px 0 #6A6258` }}>
                  하나 더 먹여줄게
                </button>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                  {[{href:"/archive",label:"파쇄함 보기"},{href:"/",label:"홈으로"}].map(b=>(
                    <Link key={b.href} href={b.href} style={{ height:42, background:"#FAF8F2", border:"1.5px solid #C8BEB0", borderRadius:2, fontSize:12, fontFamily:"var(--font-serif)", color:"#5A5248", display:"flex", alignItems:"center", justifyContent:"center", textDecoration:"none" }}>{b.label}</Link>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── 소화 멈춤 오버레이 ── */}
      <AnimatePresence>
        {soHwaStop && (
          <SoHwaStopOverlay
            msg={soHwaMsg}
            onContinue={() => { setSoHwaStop(false); setPhase("done"); }}
            onKeep={() => { setSoHwaStop(false); reset(); }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ReleasePage() {
  return (
    <Suspense fallback={<div style={{ background:"#efe3cf", minHeight:"100vh" }} />}>
      <ReleaseContent />
    </Suspense>
  );
}
