"use client";

import { forwardRef } from "react";
import { ResultData } from "@/lib/resultCard";

const INK  = "#1A1410";
const ROSE = "#C8607A";
const W    = 360;

interface Props { data: ResultData; emotions: string[] }

/* ══════════════════════════════════════════════════════════
   스크러피 음식 일러스트 — 대충 그린 낙서 감성
   (고퀄 금지, 삐뚤삐뚤, 축 처진 표정이 생명)
══════════════════════════════════════════════════════════ */

// 공통: 삐뚤어진 눈 쌍
const ScruggEyes = ({ cx=50, cy=40, lw=7, rw=9, lh=9, rh=7 }: {cx?:number;cy?:number;lw?:number;rw?:number;lh?:number;rh?:number}) => (
  <>
    {/* 왼쪽 눈 — 약간 아래 처짐 */}
    <ellipse cx={cx-lw*2} cy={cy+2} rx={lw*0.55} ry={lh*0.55} fill={INK}/>
    <circle cx={cx-lw*2-lw*0.2} cy={cy} r={lw*0.2} fill="white" opacity="0.7"/>
    {/* 오른쪽 눈 — 크기 다름 */}
    <ellipse cx={cx+rw*1.8} cy={cy-1} rx={rw*0.6} ry={rh*0.5} fill={INK}/>
    <circle cx={cx+rw*1.8+rw*0.18} cy={cy-2} r={rw*0.18} fill="white" opacity="0.7"/>
  </>
);

// 공통: 축 처진 울상 입
const DropyMouth = ({ cx=50, cy=60, w=14 }: {cx?:number;cy?:number;w?:number}) => (
  <path d={`M${cx-w},${cy} Q${cx-w/2},${cy+w*0.5} ${cx},${cy+3} Q${cx+w/2},${cy+w*0.5} ${cx+w},${cy}`}
    fill="none" stroke={INK} strokeWidth="2.2" strokeLinecap="round"/>
);

// 눈물 방울
const Tear = ({ x=30, y=50 }: {x?:number;y?:number}) => (
  <path d={`M${x},${y} Q${x-3.5},${y+7} ${x},${y+11} Q${x+3.5},${y+7} ${x},${y}`}
    fill="#7AB8E8" opacity="0.65"/>
);

/* ── 바나나 (축 처진) ── */
const ScruggyBanana = () => (
  <svg width="130" height="110" viewBox="0 0 130 110">
    {/* 몸통 — 일부러 삐뚤게 */}
    <path d="M22,85 Q18,40 50,18 Q72,8 88,16 Q80,12 70,20 Q42,32 30,78 Z"
      fill="#F0E060" stroke={INK} strokeWidth="2.8" strokeLinejoin="round"/>
    {/* 끝 꼭지 */}
    <path d="M22,85 Q20,92 26,88 Q28,84 22,85 Z" fill="#886010" stroke={INK} strokeWidth="2"/>
    <path d="M88,16 Q96,10 92,20 Q86,14 88,16 Z" fill="#886010" stroke={INK} strokeWidth="1.8"/>
    {/* 눈 */}
    <ScruggEyes cx={58} cy={36} lw={6} rw={7} lh={8} rh={6}/>
    {/* 처진 입 */}
    <DropyMouth cx={58} cy={52} w={11}/>
    {/* 눈물 */}
    <Tear x={44} y={44}/>
    {/* 주름선 */}
    <path d="M30,72 Q34,68 38,72" fill="none" stroke={INK} strokeWidth="1.2" opacity="0.3"/>
    {/* 땀인지 눈물인지 모를 것 */}
    <circle cx={78} cy={28} r={3} fill="#7AB8E8" opacity="0.5"/>
  </svg>
);

/* ── 감자칩 (부서진) ── */
const ScruggyChip = () => (
  <svg width="130" height="110" viewBox="0 0 130 110">
    {/* 메인 칩 — 대충 그린 불규칙 다각형 */}
    <path d="M18,60 L40,22 L85,28 L92,64 L65,84 L28,78 Z"
      fill="#F0D060" stroke={INK} strokeWidth="2.8" strokeLinejoin="round"/>
    {/* 금 — 부서진 선 */}
    <path d="M55,28 L52,56 L48,70" stroke={INK} strokeWidth="2" opacity="0.45"/>
    <path d="M72,32 L70,58" stroke={INK} strokeWidth="1.5" opacity="0.3"/>
    {/* 눈 */}
    <ScruggEyes cx={56} cy={48} lw={6} rw={8} lh={8} rh={6}/>
    {/* 일자 입 — 체념 */}
    <line x1="46" y1="62" x2="64" y2="62" stroke={INK} strokeWidth="2.2" strokeLinecap="round"/>
    {/* 부스러기들 */}
    {[[100,70],[108,60],[98,82],[112,74]].map(([x,y],i)=>(
      <ellipse key={i} cx={x} cy={y} rx={4+i} ry={3} fill="#F0D060" stroke={INK} strokeWidth="1.5"
        transform={`rotate(${i*25},${x},${y})`} opacity="0.85"/>
    ))}
    {/* 다크서클 */}
    <ellipse cx={47} cy={54} rx={9} ry={3.5} fill={INK} opacity="0.08"/>
    <ellipse cx={67} cy={52} rx={10} ry={3} fill={INK} opacity="0.08"/>
  </svg>
);

/* ── 딸기우유 (찌그러진) ── */
const ScruggyMilk = () => (
  <svg width="130" height="120" viewBox="0 0 130 120">
    {/* 몸통 — 약간 찌그러진 직사각형 */}
    <path d="M35,18 Q36,12 65,10 Q94,12 95,18 L92,96 Q65,102 38,96 Z"
      fill="#FFF0F5" stroke={INK} strokeWidth="2.8" strokeLinejoin="round"/>
    {/* 윗면 삼각 */}
    <path d="M38,18 Q52,8 65,10 Q78,8 92,18 L92,28 L38,28 Z"
      fill="#F08090" stroke={INK} strokeWidth="2"/>
    {/* 스트로 — 꺾인 */}
    <path d="M65,10 L62,4 Q60,0 58,4 L55,18" fill="none" stroke={INK} strokeWidth="3.5" strokeLinecap="round"/>
    {/* 딸기 글자 */}
    <text x="65" y="22" textAnchor="middle" fontSize="7" fill="white" fontWeight="bold"
      fontFamily="monospace">딸기</text>
    {/* 눈 */}
    <ScruggEyes cx={64} cy={55} lw={7} rw={8} lh={9} rh={7}/>
    {/* 처진 입 */}
    <DropyMouth cx={64} cy={72} w={12}/>
    {/* 눈물 */}
    <Tear x={52} y={64}/>
    {/* 찌그러진 느낌 */}
    <path d="M38,60 Q36,68 40,74" fill="none" stroke={INK} strokeWidth="1.8" opacity="0.3"/>
  </svg>
);

/* ── 삼각김밥 (눈물 흘리는) ── */
const ScruggyRiceBall = () => (
  <svg width="120" height="120" viewBox="0 0 120 120">
    {/* 삼각형 몸통 */}
    <path d="M60,10 Q90,20 95,90 L25,90 Q30,20 60,10 Z"
      fill="#FAF8F0" stroke={INK} strokeWidth="2.8" strokeLinejoin="round"/>
    {/* 김 — 삐뚤게 */}
    <path d="M30,78 Q60,74 90,78 L90,92 Q60,90 30,92 Z"
      fill="#1A1410" stroke={INK} strokeWidth="1.5"/>
    {/* 김 주름 */}
    <line x1="45" y1="78" x2="43" y2="92" stroke="#3A3A3A" strokeWidth="1" opacity="0.4"/>
    <line x1="60" y1="78" x2="60" y2="92" stroke="#3A3A3A" strokeWidth="1" opacity="0.4"/>
    <line x1="75" y1="78" x2="77" y2="92" stroke="#3A3A3A" strokeWidth="1" opacity="0.4"/>
    {/* 눈 */}
    <ScruggEyes cx={58} cy={50} lw={6} rw={7} lh={8} rh={7}/>
    {/* 처진 입 */}
    <DropyMouth cx={58} cy={66} w={10}/>
    {/* 눈물 두 줄기 */}
    <Tear x={44} y={58}/>
    <Tear x={72} y={56}/>
  </svg>
);

/* ── 식빵 (멍한) ── */
const ScruggyBread = () => (
  <svg width="130" height="110" viewBox="0 0 130 110">
    {/* 윗부분 둥글게 */}
    <path d="M22,45 Q20,18 65,14 Q110,18 108,45 L105,92 L25,92 Z"
      fill="#F0C870" stroke={INK} strokeWidth="2.8" strokeLinejoin="round"/>
    {/* 빵 껍질 — 갈색 */}
    <path d="M22,45 Q20,18 65,14 Q110,18 108,45"
      fill="#D4A040" stroke={INK} strokeWidth="2.5"/>
    {/* 빵 질감선 */}
    <path d="M32,50 Q40,46 50,50" fill="none" stroke="#C89030" strokeWidth="1.2" opacity="0.4"/>
    <path d="M80,48 Q88,44 98,48" fill="none" stroke="#C89030" strokeWidth="1.2" opacity="0.4"/>
    {/* 눈 — 텅 빔 */}
    <ellipse cx={46} cy={60} rx={10} ry={11} fill="white" stroke={INK} strokeWidth="2"/>
    <ellipse cx={46} cy={62} rx={4} ry={4} fill={INK}/>
    <circle cx={43} cy={60} r={1.5} fill="white" opacity="0.8"/>
    <ellipse cx={80} cy={58} rx={11} ry={10} fill="white" stroke={INK} strokeWidth="2"/>
    <ellipse cx={80} cy={60} rx={3.5} ry={3.5} fill={INK}/>
    <circle cx={77} cy={57} r={1.5} fill="white" opacity="0.8"/>
    {/* 일자 입 */}
    <line x1="52" y1="78" x2="72" y2="78" stroke={INK} strokeWidth="2.5" strokeLinecap="round"/>
    {/* 다크서클 */}
    <ellipse cx={46} cy={70} rx={12} ry={4} fill={INK} opacity="0.08"/>
    <ellipse cx={80} cy={68} rx={13} ry={4} fill={INK} opacity="0.07"/>
  </svg>
);

/* ── 젤리 (흐물흐물) ── */
const ScruggyJelly = () => (
  <svg width="120" height="115" viewBox="0 0 120 115">
    {/* 몸통 — 불규칙 blob */}
    <path d="M22,52 Q18,22 58,14 Q92,18 98,50 Q104,82 62,98 Q22,94 22,52 Z"
      fill="#D0A8E8" stroke={INK} strokeWidth="2.8" strokeLinejoin="round"/>
    {/* 광택 */}
    <path d="M32,30 Q52,22 68,30" fill="none" stroke="white" strokeWidth="3.5" opacity="0.3"/>
    {/* 눈 */}
    <ScruggEyes cx={58} cy={52} lw={7} rw={9} lh={9} rh={7}/>
    {/* 구불구불 입 */}
    <path d="M44,70 Q50,78 58,72 Q66,66 72,74"
      fill="none" stroke={INK} strokeWidth="2.5" strokeLinecap="round"/>
    {/* 눈물 */}
    <Tear x={44} y={60}/>
    {/* 윗부분 돌기 */}
    <path d="M52,14 Q58,6 64,14" fill="none" stroke={INK} strokeWidth="2.5"/>
    {/* 흐물흐물 흘러내림 */}
    <path d="M24,72 Q18,82 22,90" fill="none" stroke="#D0A8E8" strokeWidth="4" opacity="0.5"/>
  </svg>
);

/* ── 쿠키 (금간) ── */
const ScruggyC = () => (
  <svg width="120" height="115" viewBox="0 0 120 115">
    {/* 쿠키 원형 — 약간 찌그러짐 */}
    <path d="M18,58 Q20,18 60,14 Q100,18 102,58 Q100,96 60,100 Q20,96 18,58 Z"
      fill="#C89050" stroke={INK} strokeWidth="2.8" strokeLinejoin="round"/>
    {/* 금 */}
    <path d="M60,14 L56,58 L54,88" stroke={INK} strokeWidth="2.2" opacity="0.5"/>
    {/* 초코칩들 */}
    {[[40,40],[70,36],[46,62],[76,68],[58,80]].map(([x,y],i)=>(
      <circle key={i} cx={x} cy={y} r={5} fill="#5A3010"/>
    ))}
    {/* X 눈 */}
    {[[-18,0],[14,0]].map(([dx],i)=>(
      <g key={i} transform={`translate(${60+dx},${52})`} opacity="0.8">
        <line x1="-5" y1="-5" x2="5" y2="5" stroke={INK} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="5" y1="-5" x2="-5" y2="5" stroke={INK} strokeWidth="2.5" strokeLinecap="round"/>
      </g>
    ))}
    {/* 처진 입 */}
    <DropyMouth cx={58} cy={74} w={12}/>
    {/* 부스러기 */}
    {[[108,50],[112,62],[106,74]].map(([x,y],i)=>(
      <ellipse key={i} cx={x} cy={y} rx={4} ry={3} fill="#C89050" stroke={INK} strokeWidth="1.5"
        transform={`rotate(${i*30},${x},${y})`}/>
    ))}
  </svg>
);

/* ── 타입에 따라 일러스트 선택 ── */
const ILLUMAP: Record<string, () => React.ReactElement> = {
  banana:   ScruggyBanana,
  chip:     ScruggyChip,
  milk:     ScruggyMilk,
  riceball: ScruggyRiceBall,
  bread:    ScruggyBread,
  jelly:    ScruggyJelly,
  cookie:   ScruggyC,
  pen:      ScruggyBread,
  cheese:   ScruggyJelly,
};

/* ══════════════════════════════════════════════════════════
   메인 ShareCard 컴포넌트
══════════════════════════════════════════════════════════ */
const ShareCard = forwardRef<HTMLDivElement, Props>(({ data, emotions }, ref) => {
  const {
    productName, productEmoji, productType, productDescription,
    killerLine, bizarreStats, checkboxItems, diagnosisLabel, diagnosisValue,
    serial, date, isRare, stamp,
  } = data;

  const Illu = ILLUMAP[productType] ?? ScruggyBread;

  return (
    <div ref={ref} style={{
      width: W,
      background: "#efe3cf",
      // 줄무늬 종이 질감
      backgroundImage: "repeating-linear-gradient(transparent, transparent 28px, rgba(180,160,140,0.12) 28px, rgba(180,160,140,0.12) 29px)",
      backgroundPosition: "0 48px",
      position: "relative",
      overflow: "hidden",
      fontFamily: "'Courier New', Courier, monospace",
    }}>

      {/* 커피 얼룩 */}
      <svg style={{ position:"absolute", top:0, left:0, width:"100%", height:"100%", pointerEvents:"none" }}
        viewBox={`0 0 ${W} 600`}>
        <circle cx={W-38} cy={480} r={28} fill="none" stroke="#6A3A10" strokeWidth="4" opacity="0.06"/>
        <circle cx={W-38} cy={480} r={16} fill="none" stroke="#6A3A10" strokeWidth="2" opacity="0.04"/>
        <circle cx={32}   cy={52}  r={20} fill="none" stroke="#6A3A10" strokeWidth="3" opacity="0.05"/>
      </svg>

      <div style={{ padding: "28px 26px 24px", position: "relative" }}>

        {/* ── 상단 레이블 ── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}>
          <div>
            <p style={{ fontSize: 8, color: "#A89880", letterSpacing: "0.18em", marginBottom: 2 }}>
              우걱이 처리소 / 오늘의 결과물
            </p>
            <p style={{ fontSize: 8, color: "#C4BAB0", letterSpacing: "0.1em" }}>
              {date} · No.{serial}
            </p>
          </div>
          {isRare && (
            <span style={{ fontSize: 8, color: "#B89030", border: "1px solid #B89030", padding: "2px 6px", letterSpacing: "0.1em" }}>
              SSR
            </span>
          )}
        </div>

        {/* ── 결과 이름 — 히어로 ── */}
        <div style={{ marginBottom: 10 }}>
          <h2 style={{
            fontSize: 26, fontWeight: 900,
            fontFamily: "'Gowun Batang', Georgia, serif",
            color: "#1A1410",
            lineHeight: 1.25,
            marginBottom: 8,
            letterSpacing: "-0.01em",
          }}>
            {productEmoji} {productName}
          </h2>
          <p style={{
            fontSize: 11,
            fontFamily: "'Gowun Batang', Georgia, serif",
            color: "#8A8070",
            fontStyle: "italic",
            lineHeight: 1.6,
          }}>
            {productDescription}
          </p>
        </div>

        {/* 구분선 */}
        <div style={{ borderTop: "1px solid #D8CEC0", margin: "16px 0" }}/>

        {/* ── 스크러피 일러스트 ── */}
        <div style={{ display: "flex", justifyContent: "center", margin: "8px 0 16px" }}>
          <Illu />
        </div>

        {/* 구분선 */}
        <div style={{ borderTop: "1px dashed #C8BEB0", margin: "14px 0" }}/>

        {/* ── 감정 수치 — 2개 ── */}
        <div style={{ marginBottom: 14 }}>
          <p style={{ fontSize: 8, color: "#A89880", letterSpacing: "0.14em", marginBottom: 8 }}>
            감정 분석 수치
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11 }}>
              <span style={{ color: "#6A6258" }}>{diagnosisLabel}</span>
              <span style={{ fontWeight: 700, color: "#1A1410" }}>{diagnosisValue}</span>
            </div>
            {bizarreStats.slice(0, 2).map(s => (
              <div key={s.label} style={{ display: "flex", justifyContent: "space-between", fontSize: 11 }}>
                <span style={{ color: "#6A6258" }}>{s.label}</span>
                <span style={{
                  fontWeight: 700,
                  color: s.value.includes("%") && parseInt(s.value) > 70 ? "#C8607A" : "#1A1410"
                }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── 체크박스 — 1~2개만 ── */}
        <div style={{ marginBottom: 16 }}>
          {checkboxItems.slice(0, 2).map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 4 }}>
              <div style={{ width: 11, height: 11, border: "1.5px solid #1A1410", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 8, color: "#C8607A", fontWeight: 900, lineHeight: 1 }}>✓</span>
              </div>
              <p style={{ fontSize: 10, color: "#5A5248", letterSpacing: "0.02em" }}>{item}</p>
            </div>
          ))}
        </div>

        {/* 구분선 */}
        <div style={{ borderTop: "1px solid #D8CEC0", margin: "14px 0" }}/>

        {/* ── 킬포 문장 ── */}
        <div style={{ textAlign: "center", padding: "4px 0 8px" }}>
          <p style={{
            fontSize: 15, fontWeight: 700,
            fontFamily: "'Gowun Batang', Georgia, serif",
            color: "#1A1410", lineHeight: 1.5,
            letterSpacing: "0.01em",
          }}>
            {killerLine}
          </p>
        </div>

        {/* ── 어설픈 도장 + 브랜딩 ── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: 14 }}>
          <p style={{ fontSize: 9, color: "#B4A890", letterSpacing: "0.06em" }}>
            onulmode.vercel.app
          </p>
          <div style={{
            border: "1.8px solid #C8607A",
            padding: "3px 9px",
            transform: "rotate(6deg)",
            color: "#C8607A",
            fontSize: 9,
            letterSpacing: "0.08em",
          }}>
            {stamp}
          </div>
        </div>

        {/* 하단 낙서 힌트 */}
        <p style={{ fontSize: 8, color: "#D8CEC0", letterSpacing: "0.1em", marginTop: 10, fontStyle: "italic" }}>
          ※ 우걱이는 전문 훈련을 받은 괴생명체입니다
        </p>
      </div>
    </div>
  );
});

ShareCard.displayName = "ShareCard";
export default ShareCard;
