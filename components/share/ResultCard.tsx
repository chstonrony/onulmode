"use client";

import { forwardRef } from "react";
import { ResultData } from "@/lib/resultCard";

const MONO  = "'Courier New', Courier, monospace";
const SERIF = "Gowun Batang, Georgia, serif";
const HAND  = "cursive, 'Comic Sans MS', sans-serif";
const INK   = "#1A1410";
const ROSE  = "#C8607A";
const W     = 340;

interface Props { data: ResultData; emotions: string[] }

/* ── 병맛 우걱이 얼굴 — 8가지 이상한 표정 ── */

// 시드로부터 표정 인덱스 결정 (0-7)
function ugMoodIdx(seed: number): number {
  return Math.floor(((seed * 16807) % 2147483647) / 2147483646 * 8);
}

// 공통 얼굴 틀 — 삐뚤한 계란형
const FaceBase = ({ s, fill="#FAF4E0" }: { s:number; fill?:string }) => (
  <ellipse cx={s/2} cy={s/2-1} rx={s/2-3} ry={s/2-1}
    fill={fill} stroke={INK} strokeWidth="2.8" strokeLinejoin="round"/>
);

// 0: 체함 — X눈, 파랗게 질림, 땀
const UgegiChoked = ({ s }: { s:number }) => {
  const cx=s/2, cy=s/2;
  return <>
    <FaceBase s={s} fill="#EAF2EA"/>
    {/* 초록 볼 */}
    <ellipse cx={cx-16} cy={cy+4} rx={11} ry={8} fill="#80C080" opacity="0.2"/>
    <ellipse cx={cx+16} cy={cy+4} rx={10} ry={7} fill="#80C080" opacity="0.2"/>
    {/* X 왼쪽눈 */}
    <line x1={cx-18} y1={cy-14} x2={cx-10} y2={cy-6} stroke={INK} strokeWidth="2.8"/>
    <line x1={cx-10} y1={cy-14} x2={cx-18} y2={cy-6} stroke={INK} strokeWidth="2.8"/>
    {/* X 오른쪽눈 (작음) */}
    <line x1={cx+8}  y1={cy-12} x2={cx+16} y2={cy-4} stroke={INK} strokeWidth="2.5"/>
    <line x1={cx+16} y1={cy-12} x2={cx+8}  y2={cy-4} stroke={INK} strokeWidth="2.5"/>
    {/* 역U 입 */}
    <path d={`M${cx-13},${cy+14} Q${cx},${cy+8} ${cx+13},${cy+14}`} fill="none" stroke={INK} strokeWidth="2.5" strokeLinecap="round"/>
    <rect x={cx-5} y={cy+11} width="5" height="7" fill={INK}/>
    <rect x={cx+1} y={cy+12} width="4" height="6" fill={INK}/>
    {/* 땀방울 */}
    <path d={`M${cx+22},${cy-16} Q${cx+24},${cy-22} ${cx+22},${cy-12}`} fill="#7AB8E8" opacity="0.7"/>
    <path d={`M${cx+26},${cy-6}  Q${cx+27},${cy-10} ${cx+26},${cy-3}`}  fill="#7AB8E8" opacity="0.5"/>
  </>;
};

// 1: 눈물 — 큰 눈에 눈물강
const UgegiCrying = ({ s }: { s:number }) => {
  const cx=s/2, cy=s/2;
  return <>
    <FaceBase s={s}/>
    {/* 큰 눈 */}
    <ellipse cx={cx-16} cy={cy-10} rx={10} ry={13} fill="white" stroke={INK} strokeWidth="2"/>
    <ellipse cx={cx-16} cy={cy-8}  rx={6}  ry={7}  fill={INK}/>
    <circle  cx={cx-19} cy={cy-11} r={2}   fill="white" opacity="0.9"/>
    <ellipse cx={cx+16} cy={cy-8}  rx={9}  ry={12} fill="white" stroke={INK} strokeWidth="2"/>
    <ellipse cx={cx+16} cy={cy-6}  rx={5}  ry={6}  fill={INK}/>
    <circle  cx={cx+13} cy={cy-9}  r={1.8} fill="white" opacity="0.9"/>
    {/* 눈물강 */}
    <path d={`M${cx-18},${cy+3} Q${cx-16},${cy+14} ${cx-14},${cy+22}`} fill="none" stroke="#7AB8E8" strokeWidth="5" opacity="0.7"/>
    <path d={`M${cx+14},${cy+1} Q${cx+16},${cy+12} ${cx+18},${cy+22}`} fill="none" stroke="#7AB8E8" strokeWidth="4" opacity="0.6"/>
    {/* 울상 입 */}
    <path d={`M${cx-11},${cy+16} Q${cx},${cy+22} ${cx+11},${cy+16}`} fill="none" stroke={INK} strokeWidth="2.5" strokeLinecap="round"/>
  </>;
};

// 2: 멍함 — 텅 빈 눈, 일자 입
const UgegiBlank = ({ s }: { s:number }) => {
  const cx=s/2, cy=s/2;
  return <>
    <FaceBase s={s}/>
    {/* 큰 흰눈 + 작은 동공 */}
    <ellipse cx={cx-15} cy={cy-9} rx={10} ry={12} fill="white" stroke={INK} strokeWidth="2"/>
    <ellipse cx={cx-15} cy={cy-6} rx={3.5} ry={3.5} fill={INK}/>
    <ellipse cx={cx+16} cy={cy-11} rx={11} ry={10} fill="white" stroke={INK} strokeWidth="2"/>
    <ellipse cx={cx+16} cy={cy-9}  rx={3}  ry={3}  fill={INK}/>
    {/* 일자 입 */}
    <line x1={cx-10} y1={cy+15} x2={cx+10} y2={cy+15} stroke={INK} strokeWidth="2.5" strokeLinecap="round"/>
    {/* 다크서클 */}
    <ellipse cx={cx-15} cy={cy+2}  rx={11} ry={4} fill={INK} opacity="0.1"/>
    <ellipse cx={cx+16} cy={cy}    rx={12} ry={4} fill={INK} opacity="0.1"/>
  </>;
};

// 3: 빡침 — 사선 눈썹, 이빨
const UgegiAngry = ({ s }: { s:number }) => {
  const cx=s/2, cy=s/2;
  return <>
    <FaceBase s={s} fill="#FFF0EC"/>
    {/* 빨간 볼 */}
    <ellipse cx={cx-18} cy={cy+5} rx={10} ry={7} fill="#E86050" opacity="0.2"/>
    <ellipse cx={cx+18} cy={cy+5} rx={9}  ry={6} fill="#E86050" opacity="0.2"/>
    {/* 화난 눈썹 */}
    <line x1={cx-22} y1={cy-18} x2={cx-8} y2={cy-14} stroke={INK} strokeWidth="3" strokeLinecap="round"/>
    <line x1={cx+8}  y1={cy-16} x2={cx+22} y2={cy-20} stroke={INK} strokeWidth="3" strokeLinecap="round"/>
    {/* 눈 */}
    <ellipse cx={cx-15} cy={cy-8} rx={7} ry={6} fill={INK}/>
    <ellipse cx={cx+15} cy={cy-8} rx={7} ry={6} fill={INK}/>
    <circle cx={cx-17} cy={cy-10} r={2} fill="white" opacity="0.8"/>
    <circle cx={cx+13} cy={cy-10} r={2} fill="white" opacity="0.8"/>
    {/* 이빨 드러낸 입 */}
    <path d={`M${cx-14},${cy+10} L${cx+14},${cy+10}`} stroke={INK} strokeWidth="2.2"/>
    <rect x={cx-14} y={cy+10} width="6" height="9" fill="white" stroke={INK} strokeWidth="1.5"/>
    <rect x={cx-7}  y={cx+10} width="5" height="8" fill="white" stroke={INK} strokeWidth="1.5"/>
    <rect x={cx-1}  y={cy+10} width="6" height="9" fill="white" stroke={INK} strokeWidth="1.5"/>
    <rect x={cx+6}  y={cy+10} width="5" height="7" fill="white" stroke={INK} strokeWidth="1.5"/>
  </>;
};

// 4: 정신나감 — 소용돌이눈, 큰 웃음
const UgegiCrazy = ({ s }: { s:number }) => {
  const cx=s/2, cy=s/2;
  return <>
    <FaceBase s={s}/>
    {/* 소용돌이 왼쪽눈 */}
    <circle cx={cx-15} cy={cy-9} r={10} fill="white" stroke={INK} strokeWidth="1.5"/>
    <path d={`M${cx-15},${cy-9} Q${cx-10},${cy-15} ${cx-15},${cy-13} Q${cx-20},${cy-11} ${cx-15},${cy-9} Q${cx-12},${cy-7} ${cx-14},${cy-9}`} fill="none" stroke={INK} strokeWidth="1.5"/>
    {/* 오른쪽눈 — 크고 이상함 */}
    <ellipse cx={cx+16} cy={cy-8} rx={12} ry={11} fill="white" stroke={INK} strokeWidth="1.5"/>
    <ellipse cx={cx+18} cy={cy-6} rx={5}  ry={6}  fill={INK}/>
    <circle  cx={cx+15} cy={cy-9} r={2}   fill="white" opacity="0.9"/>
    {/* 크게 웃는 입 */}
    <path d={`M${cx-16},${cy+9} Q${cx},${cy+24} ${cx+16},${cy+9}`} fill={INK}/>
    <path d={`M${cx-14},${cy+10} Q${cx},${cy+22} ${cx+14},${cy+10}`} fill="white"/>
    {/* 이빨 */}
    {[-8,-3,2,7].map(ox=><rect key={ox} x={cx+ox} y={cy+11} width="4" height="6" fill="white" stroke={INK} strokeWidth="1"/>)}
  </>;
};

// 5: 침흘림 — 반쯤 감긴 눈, 늘어진 침
const UgegiDrool = ({ s }: { s:number }) => {
  const cx=s/2, cy=s/2;
  return <>
    <FaceBase s={s}/>
    {/* 반쯤 감긴 눈 */}
    <ellipse cx={cx-15} cy={cy-9} rx={9} ry={8} fill="white" stroke={INK} strokeWidth="2"/>
    <ellipse cx={cx-15} cy={cy-7} rx={7} ry={5} fill={INK}/>
    <rect x={cx-24} y={cy-17} width={18} height={7} fill="#FAF4E0" stroke="none"/>
    <line x1={cx-25} y1={cy-10} x2={cx-5} y2={cy-10} stroke={INK} strokeWidth="2.5"/>
    <ellipse cx={cx+15} cy={cy-9} rx={8}  ry={9} fill="white" stroke={INK} strokeWidth="2"/>
    <ellipse cx={cx+15} cy={cy-8} rx={6}  ry={5} fill={INK}/>
    <rect x={cx+7}  y={cy-18} width={16} height={8} fill="#FAF4E0" stroke="none"/>
    <line x1={cx+5}  y1={cy-10} x2={cx+24} y2={cy-10} stroke={INK} strokeWidth="2.5"/>
    {/* 벌린 입 */}
    <path d={`M${cx-8},${cy+12} Q${cx},${cy+18} ${cx+8},${cy+12}`} fill="#CC6060" stroke={INK} strokeWidth="2"/>
    {/* 침 */}
    <path d={`M${cx},${cy+18} Q${cx+2},${cy+28} ${cx},${cy+36}`} fill="none" stroke="#7AB8E8" strokeWidth="4" opacity="0.75"/>
    <ellipse cx={cx} cy={cy+37} rx="4" ry="3" fill="#7AB8E8" opacity="0.65"/>
  </>;
};

// 6: 공포 — 동그란 눈, O입
const UgegiScared = ({ s }: { s:number }) => {
  const cx=s/2, cy=s/2;
  return <>
    <FaceBase s={s}/>
    {/* 엄청 큰 눈 */}
    <ellipse cx={cx-15} cy={cy-9} rx={12} ry={13} fill="white" stroke={INK} strokeWidth="2.5"/>
    <ellipse cx={cx-15} cy={cy-9} rx={7}  ry={8}  fill={INK}/>
    <circle  cx={cx-18} cy={cy-12} r={2.5} fill="white" opacity="0.9"/>
    <ellipse cx={cx+16} cy={cy-9}  rx={11} ry={12} fill="white" stroke={INK} strokeWidth="2.5"/>
    <ellipse cx={cx+16} cy={cy-9}  rx={6}  ry={7}  fill={INK}/>
    <circle  cx={cx+13} cy={cy-12} r={2.2} fill="white" opacity="0.9"/>
    {/* O 입 */}
    <ellipse cx={cx} cy={cy+16} rx={7} ry={8} fill="#1A1410" stroke={INK} strokeWidth="2"/>
    {/* 땀 */}
    <path d={`M${cx+24},${cy-20} Q${cx+26},${cy-26} ${cx+24},${cy-16}`} fill="#7AB8E8" opacity="0.65"/>
    <path d={`M${cx-26},${cy-10} Q${cx-28},${cy-15} ${cx-26},${cy-7}`}  fill="#7AB8E8" opacity="0.5"/>
  </>;
};

// 7: 배터리1% — X눈 처진, 거의 죽음
const UgegiDead = ({ s }: { s:number }) => {
  const cx=s/2, cy=s/2;
  return <>
    <FaceBase s={s} fill="#EEEAE0"/>
    {/* 처진 X눈 */}
    <g opacity="0.7">
      <line x1={cx-19} y1={cy-13} x2={cx-11} y2={cy-6} stroke={INK} strokeWidth="2.5"/>
      <line x1={cx-11} y1={cy-13} x2={cx-19} y2={cy-6} stroke={INK} strokeWidth="2.5"/>
    </g>
    <g opacity="0.6">
      <line x1={cx+10} y1={cy-11} x2={cx+17} y2={cy-4} stroke={INK} strokeWidth="2"/>
      <line x1={cx+17} y1={cy-11} x2={cx+10} y2={cy-4} stroke={INK} strokeWidth="2"/>
    </g>
    {/* 일자 입 — 힘없음 */}
    <line x1={cx-9} y1={cy+14} x2={cx+9} y2={cy+15} stroke={INK} strokeWidth="2" strokeLinecap="round"/>
    {/* 배터리 아이콘 */}
    <rect x={cx+18} y={cy-22} width={12} height={7} rx="1" fill="none" stroke="#CC0000" strokeWidth="1.5"/>
    <rect x={cx+30} y={cy-20} width={2}  height={3} fill="#CC0000"/>
    <rect x={cx+19} y={cy-21} width={2}  height={5} fill="#CC0000"/>
    <text x={cx+22} y={cy-16} fontSize="4.5" fill="#CC0000" fontFamily="monospace">1%</text>
    {/* 다크서클 심함 */}
    <ellipse cx={cx-15} cy={cy}    rx={14} ry={5} fill={INK} opacity="0.15"/>
    <ellipse cx={cx+15} cy={cy-1}  rx={13} ry={5} fill={INK} opacity="0.12"/>
  </>;
};

// 시드로 8가지 중 하나 선택
const UGEGI_FACES = [UgegiChoked, UgegiCrying, UgegiBlank, UgegiAngry, UgegiCrazy, UgegiDrool, UgegiScared, UgegiDead];

// UgegiFace wrapper — 기존 호환 유지
const UgegiFace = ({ x=0, y=0, size=60, angle=0, seed=0 }: { x?:number; y?:number; size?:number; angle?:number; seed?:number }) => {
  const FaceComp = UGEGI_FACES[ugMoodIdx(seed + 1)];
  return (
    <g transform={`translate(${x},${y}) rotate(${angle},${size/2},${size/2})`}>
      <FaceComp s={size}/>
    </g>
  );
};

/* ── 종이 더러움 효과 (커피얼룩, 테이프, 구겨짐) ── */

const CoffeeStain = ({ x=20, y=20, r=18, opacity=0.12 }: {x?:number;y?:number;r?:number;opacity?:number}) => (
  <g opacity={opacity}>
    <circle cx={x} cy={y} r={r} fill="none" stroke="#6A3A10" strokeWidth={r*0.18}/>
    <circle cx={x} cy={y} r={r*0.6} fill="none" stroke="#6A3A10" strokeWidth={r*0.08} opacity="0.5"/>
    <ellipse cx={x+r*0.3} cy={y-r*0.2} rx={r*0.15} ry={r*0.08} fill="#6A3A10" opacity="0.3"/>
  </g>
);

const TapeStrip = ({ x=80, y=8, w=52, angle=-3 }: {x?:number;y?:number;w?:number;angle?:number}) => (
  <rect x={x} y={y} width={w} height={13} fill="rgba(212,188,144,0.45)" rx="1"
    transform={`rotate(${angle},${x+w/2},${y+6})`}/>
);

const PrinterGlitch = ({ y=120, w=300 }: {y?:number;w?:number}) => (
  <g opacity="0.07">
    {[0,4,8,14].map(dy=>(
      <line key={dy} x1={0} y1={y+dy} x2={w} y2={y+dy} stroke={INK} strokeWidth="1"/>
    ))}
  </g>
);

// 삐뚤한 별
const DoodleStar = ({ x=0, y=0, size=16, fill="none", stroke=INK }: {x?:number;y?:number;size?:number;fill?:string;stroke?:string}) => {
  const pts = Array.from({length:5},(_,i)=>{
    const a=(i*72-90)*Math.PI/180; const b=(i*72-90+36)*Math.PI/180;
    return `${x+Math.cos(a)*size+(i%2)*2},${y+Math.sin(a)*size+(i%3)*1.5} ${x+Math.cos(b)*(size*0.45)+(i%2)*1},${y+Math.sin(b)*(size*0.45)+(i%2)*2}`;
  }).join(" ");
  return <polygon points={pts} fill={fill} stroke={stroke} strokeWidth="2"/>;
};

// 찌그러진 하트
const DoodleHeart = ({x=0,y=0,size=20}:{x?:number;y?:number;size?:number}) => (
  <path d={`M${x},${y+size*0.35} C${x},${y+size*0.15} ${x-size*0.5},${y} ${x-size*0.5},${y+size*0.28} C${x-size*0.5},${y+size*0.5} ${x},${y+size*0.72} ${x},${y+size*0.88} C${x},${y+size*0.72} ${x+size*0.52},${y+size*0.5} ${x+size*0.52},${y+size*0.26} C${x+size*0.52},${y} ${x},${y+size*0.15} ${x},${y+size*0.35} Z`}
    fill="none" stroke={ROSE} strokeWidth="2.2" strokeLinecap="round"/>
);

// 삐뚤한 체크
const DoodleCheck = ({x=0,y=0,size=16,color=INK}:{x?:number;y?:number;size?:number;color?:string}) => (
  <path d={`M${x},${y+size*0.5} L${x+size*0.36},${y+size*0.85} L${x+size},${y}`}
    fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
);

// X 표시
const DoodleX = ({x=0,y=0,size=14,color=INK}:{x?:number;y?:number;size?:number;color?:string}) => (
  <>
    <line x1={x} y1={y} x2={x+size} y2={y+size} stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    <line x1={x+size} y1={y} x2={x} y2={y+size} stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
  </>
);

// 물결 밑줄
const WavyUnderline = ({x=0,y=0,width=80,color=INK}:{x?:number;y?:number;width?:number;color?:string}) => (
  <path d={`M${x},${y} Q${x+width*0.16},${y-4} ${x+width*0.33},${y} Q${x+width*0.5},${y+4} ${x+width*0.66},${y} Q${x+width*0.83},${y-4} ${x+width},${y}`}
    fill="none" stroke={color} strokeWidth="1.8" opacity="0.6"/>
);

// 구분선 (삐뚤)
const ScribbleLine = ({y=0,width=W-40,opacity=0.3}:{y?:number;width?:number;opacity?:number}) => (
  <path d={`M20,${y} Q${width*0.3},${y-2} ${width*0.6},${y+1} Q${width*0.8},${y+3} ${width+20},${y}`}
    fill="none" stroke={INK} strokeWidth="1" opacity={opacity} strokeDasharray="4,2"/>
);

/* ══════════════════════════════════════════════════════════
   스타일 1 — 볼펜 낙서 (공책 낙서)
══════════════════════════════════════════════════════════ */
function Style1({ data, emotions }: { data: ResultData; emotions: string[] }) {
  const { date, serial, ingredients, resultGrade, verdict, ugMemo, bizarreStats, stamp, viralText, seed, isRare } = data;
  return (
    <div style={{ width:W, background:"#FAF8EE", fontFamily:MONO, color:INK, position:"relative",
      border:`2px solid ${INK}`, boxShadow:`3px 3px 0 ${INK}` }}>
      {/* 가로줄 배경 */}
      <div style={{ position:"absolute", inset:0, backgroundImage:"repeating-linear-gradient(transparent,transparent 24px,rgba(150,180,220,0.25) 24px,rgba(150,180,220,0.25) 25px)", backgroundPosition:"0 32px", pointerEvents:"none" }}/>
      {/* 빨간 여백선 */}
      <div style={{ position:"absolute", left:36, top:0, bottom:0, width:"1.5px", background:"rgba(200,100,100,0.35)", pointerEvents:"none" }}/>

      {/* SVG 낙서 오버레이 */}
      <svg style={{ position:"absolute", top:0, left:0, width:"100%", height:"100%", pointerEvents:"none" }} viewBox={`0 0 ${W} 480`}>
        <UgegiFace x={W-82} y={6} size={72} angle={9} seed={seed}/>
        <CoffeeStain x={30} y={280} r={22}/>
        <TapeStrip x={W/2-26} y={-5} w={52} angle={-2}/>
        <PrinterGlitch y={130}/>
        <DoodleHeart x={50} y={38}/>
        <DoodleStar x={24} y={160} size={10}/>
        <DoodleStar x={W-22} y={220} size={8} fill={ROSE} stroke={ROSE}/>
        <WavyUnderline x={44} y={68} width={120}/>
        <ScribbleLine y={110} opacity={0.25}/>
        <ScribbleLine y={290} opacity={0.2}/>
        {/* 낙서 화살표 */}
        <path d="M44,380 Q60,370 75,378" fill="none" stroke={INK} strokeWidth="1.5"/>
        <polygon points="72,374 79,378 73,384" fill={INK}/>
        {/* 손글씨 낙서 */}
        <text x={22} y={400} fontSize="7.5" fill={INK} opacity="0.2"
          fontFamily="cursive" transform="rotate(-3,22,400)">이거 왜 나옴</text>
        {isRare && <text x={W-80} y={460} fontSize="7" fill="#B89030" opacity="0.7"
          fontFamily="monospace">★ RARE ★</text>}
      </svg>

      <div style={{ padding:"20px 20px 18px 48px", position:"relative" }}>
        {/* 헤더 */}
        <p style={{ fontSize:8, color:"#A89880", letterSpacing:"0.1em", marginBottom:4 }}>
          {date} / #{serial}
        </p>
        <p style={{ fontSize:18, fontWeight:700, lineHeight:1.3, marginBottom:3 }}>
          우걱이 낙서 결과지
        </p>
        <p style={{ fontSize:10, color:ROSE, marginBottom:14 }}>
          — 대충 적은 거라 책임 못짐 —
        </p>

        {/* 먹은 감정 */}
        <p style={{ fontSize:9, color:"#A89880", marginBottom:5, letterSpacing:"0.08em" }}>오늘 먹은 감정:</p>
        <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginBottom:12 }}>
          {emotions.map(e=>(
            <span key={e} style={{ fontSize:13, fontFamily:SERIF, fontWeight:700, background:`${ROSE}15`, color:ROSE, padding:"2px 8px", border:`1px solid ${ROSE}50` }}>{e}</span>
          ))}
        </div>

        {/* 빠각 결과 — 크게 */}
        <div style={{ textAlign:"center", padding:"10px 0", marginBottom:10 }}>
          <p style={{ fontSize:9, color:"#A89880", marginBottom:4, letterSpacing:"0.12em" }}>[ 빠각 결과 ]</p>
          <p style={{ fontSize:24, fontWeight:700, letterSpacing:"0.04em" }}>{resultGrade}</p>
        </div>

        {/* 성분 바 */}
        <p style={{ fontSize:9, color:"#A89880", marginBottom:6, letterSpacing:"0.08em" }}>성분 분석:</p>
        {ingredients.map(({label,pct})=>(
          <div key={label} style={{ marginBottom:5 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:2 }}>
              <span style={{ fontSize:11, fontWeight:700 }}>{label}</span>
              <span style={{ fontSize:10, color:"#A89880" }}>{pct}%</span>
            </div>
            <div style={{ fontSize:10, color:ROSE, letterSpacing:-0.5 }}>
              {"▓".repeat(Math.floor(pct/5))}{"░".repeat(20-Math.floor(pct/5))}
            </div>
          </div>
        ))}

        {/* 이상한 수치들 */}
        <div style={{ marginTop:10, marginBottom:10, padding:"8px 10px", background:`${INK}06`, border:`1px dashed ${INK}30` }}>
          <p style={{ fontSize:8, color:"#A89880", marginBottom:5, letterSpacing:"0.1em" }}>이상한 수치들:</p>
          {bizarreStats.map(s=>(
            <div key={s.label} style={{ display:"flex", justifyContent:"space-between", fontSize:11, marginBottom:3 }}>
              <span>{s.label}</span>
              <span style={{ fontWeight:700, color: s.value.includes("%")&&parseInt(s.value)>70 ? ROSE : INK }}>{s.value}</span>
            </div>
          ))}
        </div>

        {/* 판정 */}
        <p style={{ fontSize:9, color:"#A89880", marginBottom:4, letterSpacing:"0.08em" }}>우걱이 판정:</p>
        <p style={{ fontSize:13, fontFamily:SERIF, fontStyle:"italic", lineHeight:1.6, marginBottom:10 }}>
          &ldquo;{verdict}&rdquo;
        </p>

        {/* 메모 + 스탬프 */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:6 }}>
          <div>
            <p style={{ fontSize:8, color:"#A89880", marginBottom:3 }}>우걱이 메모:</p>
            <p style={{ fontSize:12, fontFamily:HAND, transform:"rotate(-1.5deg)", display:"inline-block" }}>
              {ugMemo}
            </p>
          </div>
          <div style={{ border:`2px solid ${ROSE}`, padding:"4px 10px", transform:"rotate(8deg)", textAlign:"center" }}>
            <p style={{ fontSize:10, color:ROSE, fontWeight:700, letterSpacing:"0.06em" }}>{stamp}</p>
          </div>
        </div>

        {/* 희귀 배지 */}
        {isRare && (
          <div style={{ textAlign:"center", marginBottom:6 }}>
            <span style={{ fontSize:9, color:"#B89030", border:"1px solid #B89030", padding:"2px 8px", letterSpacing:"0.1em", fontFamily:MONO }}>
              ★ SSR 희귀 결과지 ★ 우걱이도 처음 봄
            </span>
          </div>
        )}
        {/* 하단 */}
        <div style={{ borderTop:`1px dashed ${INK}30`, paddingTop:8, marginTop:4, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <p style={{ fontSize:10, fontFamily:SERIF, color:ROSE, fontWeight:700 }}>
            {viralText}
          </p>
          <p style={{ fontSize:8, color:"#C4BAB0", letterSpacing:"0.06em" }}>
            onulmode.vercel.app
          </p>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   스타일 2 — 우걱이 관찰일지
══════════════════════════════════════════════════════════ */
function Style2({ data, emotions }: { data: ResultData; emotions: string[] }) {
  const { date, serial, resultGrade, verdict, ugMemo, bizarreStats, machineComment, stamp, viralText, seed } = data;
  return (
    <div style={{ width:W, background:"#FAFAF5", fontFamily:MONO, color:INK, position:"relative",
      border:`2.5px solid ${INK}`, boxShadow:`4px 4px 0 #8A8070` }}>

      <svg style={{ position:"absolute", top:0, left:0, width:"100%", height:"100%", pointerEvents:"none" }} viewBox={`0 0 ${W} 460`}>
        <CoffeeStain x={W-28} y={380} r={20}/>
        <TapeStrip x={W/2-24} y={-4} w={48} angle={2}/>
        <PrinterGlitch y={200}/>
        <DoodleStar x={W-28} y={22} size={14} fill="#FFE0A0" stroke="#C8A040"/>
        <DoodleStar x={22} y={180} size={10}/>
        <DoodleX x={W-24} y={180} size={12} color={ROSE}/>
        <ScribbleLine y={72} opacity={0.2}/>
        <ScribbleLine y={300} opacity={0.2}/>
        <WavyUnderline x={20} y={50} width={100} color={INK}/>
      </svg>

      <div style={{ padding:"18px 18px 16px", position:"relative" }}>
        {/* 헤더 */}
        <div style={{ textAlign:"center", marginBottom:12 }}>
          <p style={{ fontSize:9, letterSpacing:"0.2em", color:"#A89880", marginBottom:4 }}>
            ━━━ 우걱이 관찰일지 ━━━
          </p>
          <p style={{ fontSize:19, fontWeight:700, lineHeight:1.2 }}>
            감정 처리 관찰 기록
          </p>
          <p style={{ fontSize:9, color:"#A89880", marginTop:4 }}>
            관찰일: {date} &nbsp;|&nbsp; No.{serial}
          </p>
        </div>

        {/* 관찰 항목 테이블 */}
        {[
          { label:"투입 감정",  value: emotions.join(" / ") },
          { label:"처리 방식",  value: "우걱우걱 씹음" },
          { label:"처리 결과",  value: resultGrade },
        ].map(({label,value},i)=>(
          <div key={i} style={{ display:"flex", borderBottom:`1px solid ${INK}22`, padding:"7px 0" }}>
            <span style={{ fontSize:10, color:"#A89880", width:72, flexShrink:0, letterSpacing:"0.04em" }}>{label}</span>
            <span style={{ fontSize:12, fontWeight:700 }}>{value}</span>
          </div>
        ))}

        {/* 반응 기록 */}
        <div style={{ margin:"10px 0", padding:"8px 12px", background:`${INK}05`, border:`1px solid ${INK}15` }}>
          <p style={{ fontSize:8, color:"#A89880", letterSpacing:"0.1em", marginBottom:6 }}>우걱이 반응:</p>
          <p style={{ fontSize:12, fontFamily:SERIF, fontStyle:"italic", lineHeight:1.6 }}>
            &ldquo;{machineComment}&rdquo;
          </p>
        </div>

        {/* 이상한 수치 */}
        <p style={{ fontSize:8, color:"#A89880", letterSpacing:"0.1em", marginBottom:5, marginTop:8 }}>측정 수치:</p>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"4px 16px", marginBottom:10 }}>
          {bizarreStats.map(s=>(
            <div key={s.label} style={{ display:"flex", justifyContent:"space-between", fontSize:10 }}>
              <span style={{ color:"#8A8070" }}>{s.label}</span>
              <span style={{ fontWeight:700, color: s.value.includes("%")&&parseInt(s.value)>70 ? ROSE : INK }}>{s.value}</span>
            </div>
          ))}
        </div>

        {/* 종합 판정 */}
        <div style={{ textAlign:"center", padding:"10px 0", borderTop:`1px dashed ${INK}30`, borderBottom:`1px dashed ${INK}30`, marginBottom:10 }}>
          <p style={{ fontSize:9, color:"#A89880", marginBottom:4, letterSpacing:"0.12em" }}>종합 판정</p>
          <p style={{ fontSize:13, fontFamily:SERIF, fontStyle:"italic", lineHeight:1.6 }}>
            &ldquo;{verdict}&rdquo;
          </p>
        </div>

        {/* 결론 + 도장 */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <p style={{ fontSize:8, color:"#A89880", marginBottom:3 }}>연구자 메모 (우걱이 자필):</p>
            <p style={{ fontSize:12, fontFamily:HAND, transform:"rotate(-2deg)", display:"inline-block" }}>
              {ugMemo}
            </p>
          </div>
          <div style={{ border:`2.5px solid ${INK}`, borderRadius:"50%", width:56, height:56, display:"flex", alignItems:"center", justifyContent:"center", transform:"rotate(12deg)", flexShrink:0 }}>
            <p style={{ fontSize:9, fontWeight:700, textAlign:"center", lineHeight:1.3 }}>{stamp}<br/>확인</p>
          </div>
        </div>

        {/* 하단 */}
        <p style={{ fontSize:9, color:"#A89880", textAlign:"center", marginTop:12, letterSpacing:"0.04em" }}>
          {viralText} — onulmode.vercel.app
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   스타일 3 — 급식표
══════════════════════════════════════════════════════════ */
function Style3({ data, emotions }: { data: ResultData; emotions: string[] }) {
  const { date, serial, ingredients, resultGrade, ugMemo, bizarreStats, stamp, viralText, seed } = data;
  const stars = (n: number) => "★".repeat(n) + "☆".repeat(5-n);
  return (
    <div style={{ width:W, background:"#FAF5E8", fontFamily:MONO, color:INK, position:"relative",
      border:`3px solid ${INK}`, boxShadow:`5px 5px 0 ${INK}` }}>

      <svg style={{ position:"absolute", top:0, left:0, width:"100%", height:"100%", pointerEvents:"none" }} viewBox={`0 0 ${W} 440`}>
        <UgegiFace x={W-78} y={8} size={65} angle={6} seed={seed}/>
        <CoffeeStain x={40} y={350} r={16}/>
        <PrinterGlitch y={180}/>
        <DoodleStar x={22} y={22} size={14} fill="#FFD060" stroke="#B89030"/>
        <DoodleStar x={36} y={22} size={14} fill="#FFD060" stroke="#B89030"/>
        <DoodleHeart x={W-25} y={180} size={18}/>
        <ScribbleLine y={80} opacity={0.3}/>
      </svg>

      <div style={{ padding:"16px 18px 14px", position:"relative" }}>
        {/* 급식표 헤더 */}
        <div style={{ textAlign:"center", borderBottom:`2px solid ${INK}`, paddingBottom:10, marginBottom:12 }}>
          <p style={{ fontSize:9, letterSpacing:"0.2em", color:"#A89880", marginBottom:3 }}>
            ☆ 우걱이 감정 급식소 ☆
          </p>
          <p style={{ fontSize:20, fontWeight:700, lineHeight:1.2 }}>오늘의 감정 급식</p>
          <p style={{ fontSize:9, color:"#A89880", marginTop:4 }}>{date} · No.{serial}</p>
        </div>

        {/* 감정 메뉴 */}
        <p style={{ fontSize:9, color:"#A89880", letterSpacing:"0.1em", marginBottom:8 }}>[ 오늘의 메뉴 ]</p>
        {ingredients.map(({label,pct},i)=>(
          <div key={label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:7, padding:"4px 0", borderBottom:`1px dashed ${INK}20` }}>
            <span style={{ fontSize:14, fontWeight:700, fontFamily:SERIF }}>{label}</span>
            <div style={{ display:"flex", gap:8, alignItems:"center" }}>
              <span style={{ fontSize:11, color:ROSE }}>{stars(Math.ceil(pct/20))}</span>
              <span style={{ fontSize:10, color:"#A89880" }}>{pct}%</span>
            </div>
          </div>
        ))}

        {/* 오늘의 결과 */}
        <div style={{ textAlign:"center", margin:"12px 0", padding:"10px", background:`${INK}07`, border:`1px solid ${INK}20` }}>
          <p style={{ fontSize:9, color:"#A89880", marginBottom:4, letterSpacing:"0.1em" }}>오늘의 처리 결과</p>
          <p style={{ fontSize:20, fontWeight:700 }}>{resultGrade}</p>
        </div>

        {/* 이상한 수치 */}
        <p style={{ fontSize:9, color:"#A89880", letterSpacing:"0.1em", marginBottom:6 }}>[ 영양 성분 분석 (이상한 단위) ]</p>
        {bizarreStats.map(s=>(
          <div key={s.label} style={{ display:"flex", justifyContent:"space-between", fontSize:11, marginBottom:4 }}>
            <span style={{ color:"#8A8070" }}>{s.label}</span>
            <span style={{ fontWeight:700, color: s.value.includes("%")&&parseInt(s.value)>70 ? ROSE : INK }}>{s.value}</span>
          </div>
        ))}

        {/* 우걱이 총평 + 스탬프 */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginTop:12, borderTop:`2px solid ${INK}`, paddingTop:10 }}>
          <div>
            <p style={{ fontSize:8, color:"#A89880", marginBottom:3 }}>우걱이 총평:</p>
            <p style={{ fontSize:13, fontFamily:HAND, transform:"rotate(-1deg)", display:"inline-block" }}>
              {ugMemo}
            </p>
          </div>
          <div style={{ textAlign:"center" }}>
            <div style={{ border:`2px solid ${ROSE}`, padding:"4px 8px", transform:"rotate(-6deg)", background:`${ROSE}10` }}>
              <p style={{ fontSize:11, color:ROSE, fontWeight:700, letterSpacing:"0.05em" }}>{stamp}</p>
            </div>
          </div>
        </div>

        <p style={{ fontSize:9, color:"#A89880", textAlign:"center", marginTop:10 }}>
          {viralText} — onulmode.vercel.app
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   스타일 4 — 시험지
══════════════════════════════════════════════════════════ */
function Style4({ data, emotions }: { data: ResultData; emotions: string[] }) {
  const { date, serial, intensity, resultGrade, verdict, ugMemo, bizarreStats, stamp, viralText } = data;
  const grade = intensity>=90?"A+ (과적재)":intensity>=75?"B+ (질김)":intensity>=60?"C (그럭저럭)":"D (소화 실패)";
  const choices = ["괜찮은 줄 알았음","말하기 귀찮았음","나도 몰랐음","어차피 혼자 해결함"];
  return (
    <div style={{ width:W, background:"#FFFEF8", fontFamily:MONO, color:INK, position:"relative",
      border:`2px solid ${INK}`, boxShadow:`4px 4px 0 ${INK}` }}>

      <svg style={{ position:"absolute", top:0, left:0, width:"100%", height:"100%", pointerEvents:"none" }} viewBox={`0 0 ${W} 460`}>
        <DoodleStar x={W-20} y={20} size={18} fill="#FFD060" stroke="#B89030"/>
        <WavyUnderline x={20} y={44} width={160}/>
        <ScribbleLine y={110} opacity={0.2}/>
        <ScribbleLine y={300} opacity={0.2}/>
        {/* 얼룩 */}
        <ellipse cx={W-30} cy={200} rx="18" ry="12" fill="#E8D8B0" opacity="0.3"/>
        <DoodleX x={22} y={350} size={14} color={ROSE}/>
        <DoodleCheck x={44} y={350} size={14} color="#6A9E6A}"/>
      </svg>

      <div style={{ padding:"16px 18px 14px", position:"relative" }}>
        {/* 시험지 헤더 */}
        <div style={{ borderBottom:`2px solid ${INK}`, paddingBottom:10, marginBottom:12 }}>
          <div style={{ display:"flex", justifyContent:"space-between", fontSize:9, color:"#A89880", marginBottom:6 }}>
            <span>감정 빠각능력평가</span>
            <span>{date}</span>
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div>
              <p style={{ fontSize:18, fontWeight:700 }}>감정 처리 시험지</p>
              <p style={{ fontSize:9, color:"#A89880", marginTop:3 }}>수험번호: {serial}</p>
            </div>
            {/* 성적 박스 */}
            <div style={{ border:`3px solid ${INK}`, padding:"6px 14px", textAlign:"center" }}>
              <p style={{ fontSize:9, color:"#A89880", marginBottom:2 }}>점수</p>
              <p style={{ fontSize:20, fontWeight:700, color: intensity>=75?INK:ROSE }}>{intensity}점</p>
              <p style={{ fontSize:9, color:"#A89880", marginTop:2 }}>{grade}</p>
            </div>
          </div>
        </div>

        {/* Q1 */}
        <div style={{ marginBottom:14 }}>
          <p style={{ fontSize:11, fontWeight:700, marginBottom:6 }}>Q. 오늘 투입된 감정:</p>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
            {emotions.map(e=>(
              <span key={e} style={{ fontSize:12, fontFamily:SERIF, fontWeight:700, background:`${ROSE}15`, color:ROSE, padding:"2px 8px", border:`1px solid ${ROSE}40` }}>{e}</span>
            ))}
          </div>
        </div>

        {/* Q2 */}
        <div style={{ marginBottom:14 }}>
          <p style={{ fontSize:11, fontWeight:700, marginBottom:8 }}>Q. 왜 이렇게 오래 참았나요? (해당 항목 모두 체크)</p>
          {choices.map((c,i)=>(
            <div key={i} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:5, fontSize:11 }}>
              <div style={{ width:14, height:14, border:`1.5px solid ${INK}`, flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
                {i<3&&<span style={{ fontSize:10, color:INK }}>✓</span>}
              </div>
              <span style={{ color: i<3?INK:"#C4BAB0" }}>{c}</span>
            </div>
          ))}
        </div>

        {/* 이상한 수치 */}
        <div style={{ background:`${INK}06`, border:`1px dashed ${INK}25`, padding:"8px 10px", marginBottom:12 }}>
          <p style={{ fontSize:8, color:"#A89880", letterSpacing:"0.1em", marginBottom:5 }}>부가 측정값:</p>
          {bizarreStats.map(s=>(
            <div key={s.label} style={{ display:"flex", justifyContent:"space-between", fontSize:11, marginBottom:3 }}>
              <span style={{ color:"#8A8070" }}>{s.label}</span>
              <span style={{ fontWeight:700, color: s.value.includes("%")&&parseInt(s.value)>70 ? ROSE : INK }}>{s.value}</span>
            </div>
          ))}
        </div>

        {/* 종합 판정 */}
        <div style={{ marginBottom:12 }}>
          <p style={{ fontSize:11, fontWeight:700, marginBottom:5 }}>우걱이 총평:</p>
          <p style={{ fontSize:13, fontFamily:SERIF, fontStyle:"italic", lineHeight:1.6 }}>
            &ldquo;{verdict}&rdquo;
          </p>
        </div>

        {/* 도장 + 메모 */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", borderTop:`1px solid ${INK}30`, paddingTop:8 }}>
          <p style={{ fontSize:12, fontFamily:HAND, transform:"rotate(-1.5deg)", display:"inline-block" }}>
            {ugMemo}
          </p>
          <div style={{ border:`2px solid ${INK}`, padding:"4px 10px", transform:"rotate(5deg)" }}>
            <p style={{ fontSize:10, fontWeight:700 }}>{stamp}</p>
          </div>
        </div>

        <p style={{ fontSize:9, color:"#A89880", textAlign:"center", marginTop:10 }}>
          {viralText} — onulmode.vercel.app
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   스타일 5 — 저주받은 그림일기
══════════════════════════════════════════════════════════ */
function Style5({ data, emotions }: { data: ResultData; emotions: string[] }) {
  const { date, serial, resultGrade, verdict, ugMemo, bizarreStats, stamp, machineComment, viralText, seed } = data;
  return (
    <div style={{ width:W, background:"#FEFCF0", fontFamily:MONO, color:INK, position:"relative",
      border:`2.5px solid ${INK}`, boxShadow:`4px 4px 0 ${INK}` }}>

      <svg style={{ position:"absolute", top:0, left:0, width:"100%", height:"100%", pointerEvents:"none" }} viewBox={`0 0 ${W} 460`}>
        <DoodleHeart x={W-35} y={30} size={24}/>
        <DoodleHeart x={28} y={160} size={16}/>
        <DoodleX x={W-22} y={160} size={12} color={ROSE}/>
        <ScribbleLine y={92} opacity={0.2}/>
        <WavyUnderline x={20} y={46} width={130}/>
        {/* 눈물방울 */}
        <ellipse cx={30} cy={320} rx="6" ry="8" fill={ROSE} opacity="0.25"/>
        <path d="M30,312 Q34,308 30,304 Q26,308 30,312" fill={ROSE} opacity="0.25"/>
      </svg>

      <div style={{ padding:"16px 18px 14px", position:"relative" }}>
        {/* 일기 헤더 */}
        <div style={{ textAlign:"center", borderBottom:`2px dashed ${INK}50`, paddingBottom:10, marginBottom:14 }}>
          <p style={{ fontSize:9, color:"#A89880", letterSpacing:"0.14em", marginBottom:4 }}>
            {date.replace(/\./g,"년 ").trimEnd()}일
          </p>
          <p style={{ fontSize:20, fontWeight:700 }}>오늘의 감정 일기</p>
          <p style={{ fontSize:9, color:"#A89880", marginTop:4 }}>— 우걱이가 대신 써줌 —</p>
        </div>

        {/* 우걱이 그림 + 감정 */}
        <div style={{ display:"flex", gap:14, marginBottom:14 }}>
          {/* 우걱이 낙서 영역 */}
          <div style={{ width:90, flexShrink:0, border:`1.5px solid ${INK}40`, background:"#FAF8EC", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="80" height="80" viewBox="0 0 80 80">
              <UgegiFace x={3} y={2} size={74} angle={4} seed={seed}/>
            </svg>
          </div>
          <div style={{ flex:1 }}>
            <p style={{ fontSize:9, color:"#A89880", marginBottom:5, letterSpacing:"0.08em" }}>오늘 먹은 감정:</p>
            {emotions.map(e=>(
              <p key={e} style={{ fontSize:14, fontFamily:SERIF, fontWeight:700, marginBottom:4, color:ROSE }}>
                → {e}
              </p>
            ))}
            <div style={{ marginTop:8, padding:"6px 8px", background:`${ROSE}12`, border:`1px dashed ${ROSE}50` }}>
              <p style={{ fontSize:10, fontWeight:700 }}>{resultGrade}</p>
            </div>
          </div>
        </div>

        {/* 일기 본문 */}
        <div style={{ background:"#FAF8EC", border:`1px solid ${INK}20`, padding:"10px 12px", marginBottom:12,
          backgroundImage:"repeating-linear-gradient(transparent,transparent 24px,rgba(150,180,220,0.2) 24px,rgba(150,180,220,0.2) 25px)", backgroundPosition:"0 24px" }}>
          <p style={{ fontSize:12, fontFamily:SERIF, lineHeight:"25px", fontStyle:"italic" }}>
            오늘 우걱이가 먹은 감정은 {emotions.join("이랑 ")}이었다. {verdict} 처리 결과는 {resultGrade}였다. {machineComment}
          </p>
        </div>

        {/* 이상한 수치 */}
        <p style={{ fontSize:9, color:"#A89880", letterSpacing:"0.1em", marginBottom:6 }}>이상한 수치:</p>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3px 12px", marginBottom:12 }}>
          {bizarreStats.map(s=>(
            <div key={s.label} style={{ display:"flex", justifyContent:"space-between", fontSize:10 }}>
              <span style={{ color:"#8A8070" }}>{s.label}</span>
              <span style={{ fontWeight:700, color: s.value.includes("%")&&parseInt(s.value)>70 ? ROSE : INK }}>{s.value}</span>
            </div>
          ))}
        </div>

        {/* 끝맺음 + 도장 */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", borderTop:`1.5px dashed ${INK}40`, paddingTop:10 }}>
          <div>
            <p style={{ fontSize:12, fontFamily:HAND, transform:"rotate(-2deg)", display:"inline-block" }}>
              {ugMemo}
            </p>
            <p style={{ fontSize:8, color:"#A89880", marginTop:4 }}>— 우걱이 씀</p>
          </div>
          <div style={{ border:`2px solid ${INK}`, padding:"4px 10px", transform:"rotate(-8deg)", textAlign:"center" }}>
            <p style={{ fontSize:9, fontWeight:700, lineHeight:1.3 }}>{stamp}</p>
          </div>
        </div>

        <p style={{ fontSize:9, color:"#A89880", textAlign:"center", marginTop:10 }}>
          {viralText} — onulmode.vercel.app
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   스타일 6 — 우걱이 소화 멈춤 (허접한 천사 + 위로)
══════════════════════════════════════════════════════════ */
const SOHWA_MSGS_CARD = [
  "괜찮은 척 오래해서 좀 굳어있었음.",
  "혼자 해결하려고 너무 오래 들고 있었네.",
  "오늘은 강한 사람 안 해도 됨.",
  "말 안 하고 버티느라 수고했음.",
  "이건 소화보다 위로가 먼저인 듯.",
  "오늘은 그냥 살아있는 걸로 됨.",
  "씹다가 울컥함.",
  "오늘 감정은 안 갈고 그냥 안아줌.",
  "이건 빨리 버릴 수 있는 감정이 아니었음.",
];

// 결과지용 천사 SVG (작은 버전)
const TinyAngel = () => (
  <svg width="90" height="105" viewBox="0 0 120 140">
    <ellipse cx="60" cy="14" rx="28" ry="9" fill="none" stroke="#FFD060" strokeWidth="3.5" strokeDasharray="4,2" opacity="0.85" transform="rotate(-4,60,14)"/>
    <path d="M32,60 Q12,40 8,55 Q6,72 28,72 Q18,62 32,60" fill="#F8F4E0" stroke={INK} strokeWidth="2.2"/>
    <path d="M88,60 Q108,40 112,55 Q114,72 92,72 Q102,62 88,60" fill="#F8F4E0" stroke={INK} strokeWidth="2.2"/>
    <ellipse cx="60" cy="75" rx="22" ry="28" fill="#FDFAF0" stroke={INK} strokeWidth="2.5"/>
    <ellipse cx="60" cy="52" rx="20" ry="22" fill="#FDFAF0" stroke={INK} strokeWidth="2.5"/>
    <ellipse cx="53" cy="49" rx="4.5" ry="5.5" fill={INK}/>
    <circle cx="51.5" cy="47" r="1.5" fill="white" opacity="0.85"/>
    <ellipse cx="67" cy="50" rx="4" ry="5" fill={INK}/>
    <circle cx="65.5" cy="48" r="1.5" fill="white" opacity="0.85"/>
    <path d="M53,62 Q60,65 67,61" fill="none" stroke={INK} strokeWidth="2.2" strokeLinecap="round"/>
    <ellipse cx="48" cy="57" rx="6" ry="4" fill="#F8B0C0" opacity="0.4"/>
    <ellipse cx="72" cy="58" rx="6" ry="4" fill="#F8B0C0" opacity="0.4"/>
    <path d="M36,104 C36,100 32,98 32,102 C32,106 36,110 36,110 C36,110 40,106 40,102 C40,98 36,100 36,104" fill={ROSE} opacity="0.7" stroke={INK} strokeWidth="1"/>
  </svg>
);

function Style6({ data, emotions }: { data: ResultData; emotions: string[] }) {
  const { date, serial, ugMemo, viralText } = data;
  const msg = SOHWA_MSGS_CARD[parseInt(serial) % SOHWA_MSGS_CARD.length];
  return (
    <div style={{ width:W, background:"#FDFBF5", fontFamily:MONO, color:INK, position:"relative",
      border:`2.5px solid ${INK}`, boxShadow:`4px 4px 0 #B4A890` }}>

      <svg style={{ position:"absolute", top:0, left:0, width:"100%", height:"100%", pointerEvents:"none" }} viewBox={`0 0 ${W} 420`}>
        <DoodleStar x={22} y={22} size={12} fill="#FFD060" stroke="#B89030"/>
        <DoodleStar x={W-20} y={26} size={10} fill="#FFD060" stroke="#B89030"/>
        <DoodleHeart x={W-28} y={180} size={18}/>
        <DoodleHeart x={24} y={320} size={14}/>
        <ScribbleLine y={100} opacity={0.15}/>
        <ScribbleLine y={310} opacity={0.15}/>
        {/* 별들 */}
        {[40,80,130,200,260,300].map((x,i)=>(
          <text key={i} x={i%2===0?x:W-x} y={[30,60,200,250,350,380][i]} fontSize="10" fill="#FFD060" opacity="0.3" fontFamily="sans-serif">✦</text>
        ))}
      </svg>

      <div style={{ padding:"20px 20px 18px", position:"relative" }}>
        {/* 헤더 */}
        <div style={{ textAlign:"center", marginBottom:16 }}>
          <p style={{ fontSize:9, color:"#B4A890", letterSpacing:"0.18em", marginBottom:5 }}>
            ✨ 우걱이 소화 멈춤 ✨
          </p>
          <p style={{ fontSize:8, color:"#C4BAB0", letterSpacing:"0.08em" }}>
            {date} / #{serial}
          </p>
        </div>

        {/* 천사 */}
        <div style={{ textAlign:"center", marginBottom:14 }}>
          <TinyAngel />
        </div>

        {/* 감정 태그 */}
        <div style={{ display:"flex", justifyContent:"center", flexWrap:"wrap", gap:5, marginBottom:14 }}>
          {emotions.map(e=>(
            <span key={e} style={{ fontSize:12, fontFamily:SERIF, fontWeight:700, color:ROSE, background:`${ROSE}12`, padding:"2px 10px", border:`1px dashed ${ROSE}60` }}>
              {e}
            </span>
          ))}
        </div>

        {/* 위로 문구 — 핵심 */}
        <div style={{ background:"#FAF8EE", border:`2px solid ${INK}`, borderRadius:2, padding:"14px 16px", marginBottom:16,
          boxShadow:`3px 3px 0 ${INK}`, position:"relative" }}>
          <div style={{ position:"absolute", top:-7, left:"50%", transform:"translateX(-50%)", width:50, height:11, background:"rgba(212,188,144,0.5)", borderRadius:1 }}/>
          <p style={{ fontSize:15, fontFamily:SERIF, lineHeight:1.75, textAlign:"center", color:INK }}>
            {msg}
          </p>
          <div style={{ textAlign:"right", marginTop:8, color:ROSE, fontSize:16, opacity:0.65 }}>♥</div>
        </div>

        {/* 우걱이 메모 */}
        <div style={{ textAlign:"center", marginBottom:14 }}>
          <p style={{ fontSize:11, fontFamily:HAND, color:"#8A8070", transform:"rotate(-1deg)", display:"inline-block" }}>
            {ugMemo}
          </p>
          <p style={{ fontSize:8, color:"#C4BAB0", marginTop:4, letterSpacing:"0.08em" }}>— 우걱이 씀</p>
        </div>

        {/* 하단 */}
        <div style={{ borderTop:`1px dashed ${INK}25`, paddingTop:10, textAlign:"center" }}>
          <p style={{ fontSize:10, fontFamily:SERIF, color:"#6A6258", marginBottom:3 }}>
            {viralText}
          </p>
          <p style={{ fontSize:8, color:"#C4BAB0", letterSpacing:"0.06em" }}>
            onulmode.vercel.app
          </p>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   스타일 7 — 감정 영수증
══════════════════════════════════════════════════════════ */
function Style7({ data, emotions }: { data: ResultData; emotions: string[] }) {
  const { date, serial, ingredients, resultGrade, resultTitle, ugMemo, bizarreStats, prescription, intensity } = data;
  return (
    <div style={{ width:W, background:"#1A1410", fontFamily:MONO, color:"#F5EFE0", position:"relative",
      border:`2px solid #3A3028`, boxShadow:`0 0 0 1px #2A2018` }}>

      {/* 영수증 헤더 */}
      <div style={{ textAlign:"center", padding:"16px 20px 12px", borderBottom:"1px dashed #4A4038" }}>
        <p style={{ fontSize:10, letterSpacing:"0.3em", color:"#8A8070", marginBottom:4 }}>
          ★ 우걱이 처리소 ★
        </p>
        <p style={{ fontSize:18, fontWeight:700, letterSpacing:"0.1em", marginBottom:4 }}>감정 영수증</p>
        <p style={{ fontSize:9, color:"#6A6058" }}>{date} | No.{serial}</p>
      </div>

      <div style={{ padding:"12px 20px" }}>
        {/* 처리 항목 */}
        <p style={{ fontSize:8, color:"#6A6058", letterSpacing:"0.1em", marginBottom:8 }}>[ 처리 항목 ]</p>
        {emotions.map((e, i) => (
          <div key={e} style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:5, paddingBottom:5, borderBottom:"1px dotted #3A3028" }}>
            <span>{i+1}. {e}</span>
            <span style={{ color:ROSE }}>{ingredients[i]?.pct ?? "??"}%</span>
          </div>
        ))}

        {/* 성분 상세 */}
        <div style={{ borderTop:"1px dashed #4A4038", paddingTop:10, marginTop:6, marginBottom:10 }}>
          {ingredients.map(({label, pct}) => (
            <div key={label} style={{ display:"flex", justifyContent:"space-between", fontSize:11, marginBottom:4 }}>
              <span style={{ color:"#A89880" }}>{label}</span>
              <span>{"█".repeat(Math.floor(pct/10))}{"░".repeat(10-Math.floor(pct/10))} {pct}%</span>
            </div>
          ))}
        </div>

        {/* 이상한 수치 */}
        <div style={{ borderTop:"1px dashed #4A4038", paddingTop:10, marginBottom:10 }}>
          <p style={{ fontSize:8, color:"#6A6058", letterSpacing:"0.1em", marginBottom:6 }}>[ 이상한 수치 ]</p>
          {bizarreStats.map(s => (
            <div key={s.label} style={{ display:"flex", justifyContent:"space-between", fontSize:10, marginBottom:3 }}>
              <span style={{ color:"#8A8070" }}>{s.label}</span>
              <span style={{ color: s.value.includes("%") && parseInt(s.value) > 70 ? ROSE : "#F5EFE0" }}>{s.value}</span>
            </div>
          ))}
        </div>

        {/* 합계 */}
        <div style={{ borderTop:"2px solid #4A4038", borderBottom:"2px solid #4A4038", padding:"10px 0", margin:"10px 0", textAlign:"center" }}>
          <p style={{ fontSize:9, color:"#6A6058", marginBottom:4, letterSpacing:"0.1em" }}>처리 결과</p>
          <p style={{ fontSize:20, fontWeight:700, color:ROSE }}>{resultTitle}</p>
          <p style={{ fontSize:11, color:"#A89880", marginTop:4 }}>{resultGrade}</p>
        </div>

        {/* 처방 */}
        <p style={{ fontSize:10, color:"#8A8070", marginBottom:4 }}>우걱이 처방:</p>
        <p style={{ fontSize:11, color:"#F5EFE0", marginBottom:10, lineHeight:1.6 }}>{prescription}</p>

        {/* 메모 */}
        <p style={{ fontSize:10, fontFamily:HAND, color:"#A89880", transform:"rotate(-1deg)", display:"inline-block", marginBottom:10 }}>{ugMemo}</p>

        {/* 하단 바코드 느낌 */}
        <div style={{ borderTop:"1px dashed #4A4038", paddingTop:10, textAlign:"center" }}>
          <div style={{ display:"flex", justifyContent:"center", gap:1, marginBottom:6 }}>
            {Array.from({length:32}, (_, i) => (
              <div key={i} style={{ width: i%3===0?3:1, height:24, background:"#4A4038", opacity:0.8 }}/>
            ))}
          </div>
          <p style={{ fontSize:8, color:"#5A5048", letterSpacing:"0.14em" }}>onulmode.vercel.app</p>
          <p style={{ fontSize:8, color:"#5A5048", marginTop:2 }}>AI가 내 감정 먹다가 체함 ㅋㅋ</p>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   스타일 8 — AI 오류 보고서 (Windows 오류창 감성)
══════════════════════════════════════════════════════════ */
function Style8({ data, emotions }: { data: ResultData; emotions: string[] }) {
  const { date, serial, resultTitle, verdict, machineComment, ugMemo, bizarreStats, intensity, errorCode, warningMessage } = data;
  return (
    <div style={{ width:W, fontFamily:MONO, color:INK, position:"relative",
      border:`2px solid #808080`, boxShadow:`3px 3px 0 #404040` }}>

      {/* 타이틀 바 — Windows 느낌 */}
      <div style={{ background:"linear-gradient(90deg, #000880 0%, #1084D0 50%, #000880 100%)", padding:"4px 8px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          <div style={{ width:16, height:16, background:"#C8607A", border:"1px solid white", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ fontSize:10, color:"white", fontWeight:700 }}>!</span>
          </div>
          <span style={{ color:"white", fontSize:11, fontWeight:700 }}>오류 발생 — 감정 처리 시스템</span>
        </div>
        <div style={{ display:"flex", gap:2 }}>
          {["_","□","×"].map(b => (
            <div key={b} style={{ width:16, height:14, background:"#C0C0C0", border:"1px solid #808080", display:"flex", alignItems:"center", justifyContent:"center", fontSize:9 }}>{b}</div>
          ))}
        </div>
      </div>

      {/* 내용 */}
      <div style={{ background:"#D4D0C8", padding:"16px 14px" }}>

        {/* 경고 아이콘 + 메시지 */}
        <div style={{ display:"flex", gap:14, marginBottom:14 }}>
          <div style={{ flexShrink:0 }}>
            <svg width="40" height="40" viewBox="0 0 40 40">
              <polygon points="20,4 38,36 2,36" fill="#FFFF00" stroke="#000" strokeWidth="2"/>
              <text x="20" y="30" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#000">!</text>
            </svg>
          </div>
          <div>
            <p style={{ fontSize:12, fontWeight:700, marginBottom:6, color:INK }}>
              감정 처리 중 오류가 발생했습니다.
            </p>
            <p style={{ fontSize:11, color:"#3A3A3A", lineHeight:1.6 }}>
              {emotions.join(", ")} 처리 도중 우걱이가 예상치 못한 감정 데이터를 발견했습니다.
            </p>
          </div>
        </div>

        {/* 오류 상자 */}
        <div style={{ background:"white", border:"2px inset #808080", padding:"8px 10px", marginBottom:12 }}>
          <p style={{ fontSize:9, color:"#6A6058", marginBottom:4, letterSpacing:"0.08em" }}>오류 상세 정보:</p>
          <p style={{ fontSize:10, color:ROSE, fontWeight:700, marginBottom:4 }}>ERROR CODE: {data.errorCode}</p>
          <p style={{ fontSize:11, color:INK, lineHeight:1.6, marginBottom:4 }}>{verdict}</p>
          <p style={{ fontSize:10, color:"#5A5248", fontStyle:"italic" }}>&ldquo;{machineComment}&rdquo;</p>
        </div>

        {/* 경고 배너 */}
        <div style={{ background:"#FFF0F0", border:"2px solid #CC0000", padding:"6px 10px", marginBottom:8, display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontSize:14 }}>⚠</span>
          <p style={{ fontSize:11, color:"#CC0000", fontWeight:700 }}>{warningMessage.replace("⚠ ", "")}</p>
        </div>

        {/* 오류 결과 */}
        <div style={{ background:"white", border:"2px inset #808080", padding:"8px 10px", marginBottom:12 }}>
          <p style={{ fontSize:9, color:"#6A6058", marginBottom:6, letterSpacing:"0.08em" }}>처리 결과:</p>
          <p style={{ fontSize:16, fontWeight:700, color:INK, marginBottom:4 }}>{resultTitle}</p>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3px 12px" }}>
            {bizarreStats.map(s => (
              <div key={s.label} style={{ display:"flex", justifyContent:"space-between", fontSize:10 }}>
                <span style={{ color:"#8A8070" }}>{s.label}</span>
                <span style={{ fontWeight:700, color: s.value.includes("%")&&parseInt(s.value)>70 ? ROSE : INK }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 메모 */}
        <p style={{ fontSize:10, fontFamily:HAND, color:"#5A5248", marginBottom:12, transform:"rotate(-1deg)", display:"inline-block" }}>{ugMemo}</p>

        {/* 버튼들 */}
        <div style={{ display:"flex", justifyContent:"center", gap:8 }}>
          {["다시 파쇄하기", "그냥 닫기"].map((label, i) => (
            <div key={label} style={{
              padding:"4px 20px", background:"#D4D0C8",
              border:`2px solid ${i===0?"white":"#808080"}`,
              borderRight:`2px solid ${i===0?"#808080":"white"}`,
              borderBottom:`2px solid ${i===0?"#808080":"white"}`,
              fontSize:11, fontWeight:700, cursor:"default",
            }}>
              {label}
            </div>
          ))}
        </div>

        {/* 하단 */}
        <p style={{ fontSize:8, color:"#8A8070", textAlign:"center", marginTop:10, letterSpacing:"0.06em" }}>
          onulmode.vercel.app — AI가 내 감정 처리하다 오류남 ㅋㅋ
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   스타일 9 — 감정 CCTV 캡처본
══════════════════════════════════════════════════════════ */
function Style9({ data, emotions }: { data: ResultData; emotions: string[] }) {
  const { date, serial, resultTitle, verdict, machineComment, bizarreStats, intensity } = data;
  const time = `${String(new Date().getHours()).padStart(2,"0")}:${String(new Date().getMinutes()).padStart(2,"0")}:${String(new Date().getSeconds()).padStart(2,"0")}`;
  return (
    <div style={{ width:W, background:"#0A0F0A", fontFamily:MONO, color:"#00FF41", position:"relative",
      border:`2px solid #1A2A1A`, boxShadow:`0 0 16px rgba(0,255,65,0.15)` }}>

      {/* 스캔라인 효과 */}
      <div style={{ position:"absolute", inset:0, backgroundImage:"repeating-linear-gradient(transparent,transparent 2px,rgba(0,0,0,0.15) 2px,rgba(0,0,0,0.15) 4px)", pointerEvents:"none", zIndex:1 }}/>

      <div style={{ padding:"12px 14px", position:"relative", zIndex:2 }}>

        {/* CCTV 헤더 */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10, borderBottom:"1px solid #1A3A1A", paddingBottom:8 }}>
          <div>
            <p style={{ fontSize:8, color:"#00AA2A", letterSpacing:"0.14em" }}>UGEGI DISPOSAL CAM-01</p>
            <p style={{ fontSize:9, color:"#00FF41", marginTop:2 }}>{date.replace(/\./g,"/")} {time}</p>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
            <div style={{ width:8, height:8, borderRadius:"50%", background:ROSE, boxShadow:`0 0 6px ${ROSE}` }}/>
            <span style={{ fontSize:9, color:ROSE, letterSpacing:"0.1em" }}>REC</span>
          </div>
        </div>

        {/* 감정 추적 데이터 */}
        <div style={{ marginBottom:10 }}>
          <p style={{ fontSize:8, color:"#00AA2A", letterSpacing:"0.1em", marginBottom:6 }}>[ 감정 대상 추적 ]</p>
          {emotions.map((e, i) => (
            <div key={e} style={{ display:"flex", gap:10, marginBottom:4, fontSize:11 }}>
              <span style={{ color:"#00AA2A" }}>ID-{String(i+1).padStart(2,"0")}:</span>
              <span style={{ color:"#00FF41", fontWeight:700 }}>{e}</span>
              <span style={{ color:"#005510", marginLeft:"auto" }}>[포착]</span>
            </div>
          ))}
        </div>

        {/* 분석 결과 박스 */}
        <div style={{ border:"1px solid #1A4A1A", padding:"8px 10px", marginBottom:10, background:"#050A05" }}>
          <p style={{ fontSize:8, color:"#00AA2A", letterSpacing:"0.12em", marginBottom:6 }}>[ 감정 분석 결과 ]</p>
          <p style={{ fontSize:18, fontWeight:700, color:"#00FF41", marginBottom:4, letterSpacing:"0.04em" }}>{resultTitle}</p>
          <p style={{ fontSize:10, color:"#00CC35", lineHeight:1.6, marginBottom:4 }}>{verdict}</p>
          <p style={{ fontSize:9, color:"#005510", borderTop:"1px solid #1A3A1A", paddingTop:6, marginTop:4, fontStyle:"italic" }}>
            우걱이: &ldquo;{machineComment}&rdquo;
          </p>
        </div>

        {/* 이상 수치 */}
        <div style={{ marginBottom:10 }}>
          <p style={{ fontSize:8, color:"#00AA2A", letterSpacing:"0.1em", marginBottom:6 }}>[ 이상 수치 감지 ]</p>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"4px 16px" }}>
            {bizarreStats.map(s => (
              <div key={s.label} style={{ display:"flex", justifyContent:"space-between", fontSize:10 }}>
                <span style={{ color:"#005510" }}>{s.label}</span>
                <span style={{ color: s.value.includes("%")&&parseInt(s.value)>70 ? ROSE : "#00FF41" }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 처리 진행 바 */}
        <div style={{ marginBottom:10 }}>
          <div style={{ display:"flex", justifyContent:"space-between", fontSize:9, marginBottom:3, color:"#00AA2A" }}>
            <span>처리 진행률</span>
            <span>{intensity}%</span>
          </div>
          <div style={{ height:8, background:"#0A1A0A", border:"1px solid #1A3A1A" }}>
            <div style={{ height:"100%", width:`${intensity}%`, background:`linear-gradient(90deg, #004410, #00FF41)` }}/>
          </div>
        </div>

        {/* 하단 */}
        <div style={{ borderTop:"1px solid #1A3A1A", paddingTop:8, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <p style={{ fontSize:8, color:"#005510", letterSpacing:"0.08em" }}>CAM-ID: {serial}</p>
          <p style={{ fontSize:8, color:"#005510" }}>onulmode.vercel.app</p>
        </div>
        <p style={{ fontSize:9, color:"#00660F", textAlign:"center", marginTop:6 }}>AI가 내 감정 CCTV로 포착함 ㅋㅋ</p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   병맛 음식 SVG 일러스트 (그림판 낙서 감성)
══════════════════════════════════════════════════════════ */

// 눈: 공통 표정 요소
const SadEyes = ({ cx=50, cy=40, size=8 }: {cx?:number;cy?:number;size?:number}) => (
  <>
    <ellipse cx={cx-size*1.8} cy={cy} rx={size*0.6} ry={size*0.8} fill={INK}/>
    <circle cx={cx-size*1.8-size*0.2} cy={cy-size*0.3} r={size*0.25} fill="white" opacity="0.8"/>
    <ellipse cx={cx+size*1.8} cy={cy+size*0.15} rx={size*0.55} ry={size*0.75} fill={INK}/>
    <circle cx={cx+size*1.8+size*0.15} cy={cy-size*0.15} r={size*0.22} fill="white" opacity="0.8"/>
  </>
);

// 멍한 입 (공통)
const BlankMouth = ({ cx=50, cy=58 }: {cx?:number;cy?:number}) => (
  <path d={`M${cx-8},${cy} Q${cx},${cy+3} ${cx+8},${cy}`} fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round"/>
);

// 눈물 한 방울
const Teardrop = ({ x=30, y=55 }: {x?:number;y?:number}) => (
  <path d={`M${x},${y} Q${x-4},${y+8} ${x},${y+12} Q${x+4},${y+8} ${x},${y}`} fill="#7AB8E8" opacity="0.7"/>
);

// 그림판 느낌 선 (찌그러진)
const WobblyRect = ({ x=10,y=10,w=80,h=80,fill="#FAF8EE",stroke=INK,sw=2.5 }:{x?:number;y?:number;w?:number;h?:number;fill?:string;stroke?:string;sw?:number}) => (
  <path d={`M${x+3},${y} L${x+w-2},${y+1} L${x+w+1},${y+h-2} L${x+1},${y+h+1} Z`}
    fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round"/>
);

// 바나나 (축 처진)
const FoodBanana = () => (
  <svg width="100" height="100" viewBox="0 0 100 100">
    <path d="M25,70 Q30,20 65,15 Q80,12 82,22 Q72,18 60,22 Q30,35 28,75 Z"
      fill="#FFE135" stroke={INK} strokeWidth="2.5" strokeLinejoin="round"/>
    <path d="M25,70 Q28,75 30,72 Q32,68 28,65 Z" fill="#C8A020" stroke={INK} strokeWidth="2"/>
    <path d="M82,22 Q88,18 85,25 Q80,22 82,22 Z" fill="#8A6010" stroke={INK} strokeWidth="1.5"/>
    <SadEyes cx={52} cy={32} size={6}/>
    <BlankMouth cx={52} cy={44}/>
    <Teardrop x={43} y={38}/>
    <path d="M10,75 Q15,72 20,75 Q25,78 30,75" fill="none" stroke="#A8A080" strokeWidth="1.2" opacity="0.4"/>
  </svg>
);

// 감자칩 (부서진)
const FoodChip = () => (
  <svg width="100" height="100" viewBox="0 0 100 100">
    <path d="M20,55 L45,25 L80,30 L85,60 L60,80 L25,75 Z"
      fill="#F0C870" stroke={INK} strokeWidth="2.5" strokeLinejoin="round"/>
    <path d="M45,25 L55,45 L80,30" fill="none" stroke={INK} strokeWidth="1.5" opacity="0.5"/>
    <path d="M20,55 L40,58 L60,80" fill="none" stroke={INK} strokeWidth="1.5" opacity="0.4"/>
    <line x1="55" y1="30" x2="72" y2="50" stroke="#A08040" strokeWidth="1.5" opacity="0.4"/>
    <SadEyes cx={52} cy={48} size={5}/>
    <path d="M44,60 Q52,57 60,60" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round"/>
    <path d="M72,20 L78,14 L82,20 L78,18 Z" fill={INK} opacity="0.6"/>
    <path d="M78,16 L82,10" stroke={INK} strokeWidth="1.5" opacity="0.5"/>
  </svg>
);

// 딸기우유 (구겨진)
const FoodMilk = () => (
  <svg width="100" height="100" viewBox="0 0 100 100">
    <WobblyRect x={28} y={15} w={44} h={68} fill="#FFF0F5" sw={2.5}/>
    <rect x={31} y={15} width={38} height={12} fill="#FF8090" rx="1"/>
    <path d="M38,10 Q50,6 62,10 L62,15 L38,15 Z" fill="#F8D8E0" stroke={INK} strokeWidth="2"/>
    <text x="50" y="24" textAnchor="middle" fontSize="7" fill="white" fontWeight="bold">딸기</text>
    <path d="M42,35 Q50,32 58,35" fill="none" stroke="#FF8090" strokeWidth="2.5" opacity="0.6"/>
    <SadEyes cx={50} cy={50} size={6}/>
    <BlankMouth cx={50} cy={62}/>
    <Teardrop x={40} y={57}/>
    <path d="M30,42 Q28,50 32,55" fill="none" stroke={INK} strokeWidth="1.5"/>
    <circle cx={50} cy={29} r={3} fill="none" stroke="#FF8090" strokeWidth="1.5" strokeDasharray="2,2"/>
  </svg>
);

// 삼각김밥 (눈물 흘리는)
const FoodRiceBall = () => (
  <svg width="100" height="100" viewBox="0 0 100 100">
    <path d="M50,12 L84,78 L16,78 Z"
      fill="#FAF8F2" stroke={INK} strokeWidth="2.5" strokeLinejoin="round"/>
    <path d="M50,12 L84,78" stroke="#E8E0D0" strokeWidth="1" opacity="0.4"/>
    <rect x={28} y={68} width={44} height={12} fill="#1A1410" rx="1"/>
    <text x="50" y="78" textAnchor="middle" fontSize="6.5" fill="#E8D8B0">참치</text>
    <SadEyes cx={50} cy={45} size={6}/>
    <path d="M43,57 Q50,61 57,57" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round"/>
    <Teardrop x={36} y={52}/>
    <Teardrop x={62} y={50}/>
    <path d="M35,30 Q38,26 42,30" fill="none" stroke={INK} strokeWidth="1.5" opacity="0.3"/>
  </svg>
);

// 식빵 (멍한)
const FoodBread = () => (
  <svg width="100" height="100" viewBox="0 0 100 100">
    <path d="M18,35 Q18,18 50,15 Q82,18 82,35 L80,82 L20,82 Z"
      fill="#F0C878" stroke={INK} strokeWidth="2.5" strokeLinejoin="round"/>
    <path d="M20,36 Q50,28 80,36 L80,82 L20,82 Z" fill="#F5D890" stroke={INK} strokeWidth="1.5"/>
    <path d="M18,35 Q18,18 50,15 Q82,18 82,35" fill="#E8B860" stroke={INK} strokeWidth="2.5"/>
    <SadEyes cx={50} cy={52} size={6}/>
    <path d="M42,65 L58,65" stroke={INK} strokeWidth="2" strokeLinecap="round"/>
    <path d="M28,40 Q35,38 42,40" fill="none" stroke="#D4A840" strokeWidth="1.2" opacity="0.4"/>
    <path d="M58,40 Q65,38 72,40" fill="none" stroke="#D4A840" strokeWidth="1.2" opacity="0.4"/>
    <text x="50" y="80" textAnchor="middle" fontSize="6" fill="#B89040" opacity="0.5">식</text>
  </svg>
);

// 젤리/구미 (흐물흐물)
const FoodJelly = () => (
  <svg width="100" height="100" viewBox="0 0 100 100">
    <path d="M20,45 Q18,20 50,15 Q82,20 80,45 Q82,80 50,85 Q18,80 20,45 Z"
      fill="#C8A8E8" stroke={INK} strokeWidth="2.5" strokeLinejoin="round"/>
    <path d="M28,35 Q50,28 72,35" fill="none" stroke="white" strokeWidth="3" opacity="0.35"/>
    <SadEyes cx={50} cy={46} size={7}/>
    <path d="M40,62 Q50,68 60,62" fill="none" stroke={INK} strokeWidth="2.5" strokeLinecap="round"/>
    <Teardrop x={38} y={53}/>
    <circle cx={75} cy={25} r={5} fill="#E0C0F0" stroke={INK} strokeWidth="1.5"/>
    <path d="M48,15 Q52,10 56,15" fill="none" stroke={INK} strokeWidth="1.8"/>
  </svg>
);

// 쿠키 (금간)
const FoodCookie = () => (
  <svg width="100" height="100" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="36" fill="#C48840" stroke={INK} strokeWidth="2.5"/>
    <circle cx="50" cy="50" r="36" fill="none" stroke="#A87030" strokeWidth="1" strokeDasharray="4,3"/>
    <circle cx="38" cy="40" r="4" fill="#7A5020"/>
    <circle cx="60" cy="38" r="3.5" fill="#7A5020"/>
    <circle cx="44" cy="58" r="3" fill="#7A5020"/>
    <circle cx="62" cy="60" r="4" fill="#7A5020"/>
    <path d="M50,20 L52,55 L48,80" stroke={INK} strokeWidth="2" opacity="0.4"/>
    <SadEyes cx={50} cy={47} size={5}/>
    <BlankMouth cx={50} cy={57}/>
    <path d="M35,35 L30,28" stroke={INK} strokeWidth="1.5" opacity="0.35"/>
  </svg>
);

const FOOD_SVGS: Record<string, () => React.ReactElement> = {
  banana:  FoodBanana,
  chip:    FoodChip,
  milk:    FoodMilk,
  riceball:FoodRiceBall,
  bread:   FoodBread,
  jelly:   FoodJelly,
  cookie:  FoodCookie,
  pen:     FoodBread, // fallback
  cheese:  FoodJelly, // fallback
};

/* ══════════════════════════════════════════════════════════
   스타일 12 — 오늘의 결과물 (감정 → 이상한 사물 변환)
══════════════════════════════════════════════════════════ */
function Style12({ data, emotions }: { data: ResultData; emotions: string[] }) {
  const { date, serial, productName, productEmoji, productType, productDescription,
          machineComment, warningMessage, errorCode, bizarreStats, stamp } = data;
  const FoodSVG = FOOD_SVGS[productType] ?? FoodBread;
  return (
    <div style={{ width:W, background:"#FAF8F0", fontFamily:MONO, color:INK, position:"relative",
      border:`3px solid ${INK}`, boxShadow:`6px 6px 0 ${INK}` }}>

      {/* 헤더 */}
      <div style={{ background:INK, padding:"10px 16px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div>
          <p style={{ fontSize:8, color:"#5A5248", letterSpacing:"0.14em", marginBottom:2 }}>UGEGI OUTPUT / {date}</p>
          <p style={{ fontSize:12, fontWeight:700, color:"#FAF8F0" }}>오늘의 결과물</p>
        </div>
        <p style={{ fontSize:8, color:"#5A5248", fontFamily:"monospace" }}>No.{serial}</p>
      </div>

      <div style={{ padding:"16px 18px 14px", position:"relative" }}>

        {/* 경고 배너 */}
        <div style={{ background:"#FFF3CD", border:"2px solid #CC9900", padding:"5px 10px", marginBottom:12, display:"flex", alignItems:"center", gap:6 }}>
          <span style={{ fontSize:11 }}>⚠</span>
          <p style={{ fontSize:10, color:"#AA7700", fontWeight:700 }}>{warningMessage.replace("⚠ ", "")}</p>
        </div>

        {/* 투입 감정 */}
        <p style={{ fontSize:8, color:"#A89880", letterSpacing:"0.08em", marginBottom:5 }}>투입 감정:</p>
        <div style={{ display:"flex", flexWrap:"wrap", gap:4, marginBottom:14 }}>
          {emotions.map(e=>(
            <span key={e} style={{ fontSize:11, background:`${ROSE}15`, color:ROSE, padding:"2px 8px", border:`1px solid ${ROSE}40`, fontWeight:700 }}>{e}</span>
          ))}
        </div>

        {/* 결과물 — 핵심 */}
        <div style={{ textAlign:"center", padding:"14px 12px", background:"#FDFBF0", border:`2.5px solid ${INK}`, marginBottom:12, position:"relative" }}>
          {/* 테이프 */}
          <div style={{ position:"absolute", top:-8, left:"50%", transform:"translateX(-50%)", width:56, height:13, background:"rgba(212,188,144,0.6)", borderRadius:2 }}/>
          <p style={{ fontSize:8, color:"#A89880", letterSpacing:"0.12em", marginBottom:6 }}>[ 파쇄 결과물 ]</p>
          {/* SVG 일러스트 */}
          <div style={{ display:"flex", justifyContent:"center", marginBottom:10 }}>
            <FoodSVG />
          </div>
          <p style={{ fontSize:20, fontWeight:900, color:INK, lineHeight:1.2, marginBottom:4 }}>
            {productEmoji} {productName}
          </p>
          <p style={{ fontSize:11, color:"#6A6258", fontFamily:"var(--font-serif)", fontStyle:"italic", lineHeight:1.6 }}>
            &ldquo;{productDescription}&rdquo;
          </p>
        </div>

        {/* 우걱이 코멘트 */}
        <div style={{ background:`${INK}06`, border:`1px dashed ${INK}30`, padding:"8px 12px", marginBottom:10 }}>
          <p style={{ fontSize:8, color:"#A89880", letterSpacing:"0.1em", marginBottom:4 }}>우걱이 코멘트:</p>
          <p style={{ fontSize:12, fontFamily:"var(--font-serif)", fontStyle:"italic", color:INK, lineHeight:1.6 }}>
            &ldquo;{machineComment}&rdquo;
          </p>
        </div>

        {/* 이상한 수치 */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"4px 12px", marginBottom:10 }}>
          {bizarreStats.slice(0,4).map(s=>(
            <div key={s.label} style={{ display:"flex", justifyContent:"space-between", fontSize:10, borderBottom:`1px dashed ${INK}20`, paddingBottom:3 }}>
              <span style={{ color:"#8A8070" }}>{s.label}</span>
              <span style={{ fontWeight:700, color: s.value.includes("%")&&parseInt(s.value)>70 ? ROSE : INK }}>{s.value}</span>
            </div>
          ))}
        </div>

        {/* 하단 */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", borderTop:`1px solid ${INK}20`, paddingTop:8 }}>
          <p style={{ fontSize:9, color:"#A89880" }}>AI가 내 감정 먹다가 이게 나옴 ㅋㅋ</p>
          <div style={{ border:`1.5px solid ${ROSE}`, padding:"3px 8px", transform:"rotate(5deg)", flexShrink:0 }}>
            <p style={{ fontSize:8, color:ROSE, fontWeight:700 }}>{stamp}</p>
          </div>
        </div>

        <p style={{ fontSize:7, color:"#C4BAB0", textAlign:"center", marginTop:6, letterSpacing:"0.08em" }}>
          {errorCode} · onulmode.vercel.app
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   스타일 10 — 멘탈 응급 알림창 (카카오톡/시스템 알림 감성)
══════════════════════════════════════════════════════════ */
function Style10({ data, emotions }: { data: ResultData; emotions: string[] }) {
  const { date, serial, resultTitle, verdict, machineComment, ugMemo, bizarreStats, errorCode, warningMessage, stamp } = data;
  return (
    <div style={{ width:W, background:"#F0F0F0", fontFamily:MONO, color:INK, position:"relative",
      border:`1px solid #C0C0C0`, borderRadius:8, boxShadow:`0 4px 24px rgba(0,0,0,0.22), 0 1px 0 rgba(255,255,255,0.8) inset` }}>

      {/* 알림 헤더 */}
      <div style={{ background:"linear-gradient(180deg,#E8E8E8,#D0D0D0)", borderRadius:"8px 8px 0 0", padding:"10px 14px", borderBottom:"1px solid #B0B0B0", display:"flex", alignItems:"center", gap:10 }}>
        <div style={{ width:36, height:36, borderRadius:8, background:ROSE, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
          <span style={{ fontSize:18, color:"white" }}>🦷</span>
        </div>
        <div>
          <p style={{ fontSize:12, fontWeight:700, color:INK }}>우걱이 처리소</p>
          <p style={{ fontSize:9, color:"#8A8070" }}>감정 처리 알림 · {date}</p>
        </div>
        <div style={{ marginLeft:"auto", fontSize:9, color:"#8A8070", border:"1px solid #C0C0C0", padding:"2px 8px", borderRadius:10, background:"white" }}>
          지금
        </div>
      </div>

      <div style={{ padding:"14px 16px" }}>

        {/* 알림 제목 */}
        <p style={{ fontSize:15, fontWeight:700, color:INK, marginBottom:6, lineHeight:1.3 }}>
          {resultTitle}
        </p>

        {/* 경고 */}
        <div style={{ background:"#FFF3CD", border:"1px solid #FFCC00", borderRadius:4, padding:"6px 10px", marginBottom:10, display:"flex", alignItems:"center", gap:6 }}>
          <span style={{ fontSize:12 }}>⚠</span>
          <p style={{ fontSize:11, color:"#856404", fontWeight:700 }}>{warningMessage.replace("⚠ ", "")}</p>
        </div>

        {/* 감정 태그들 */}
        <p style={{ fontSize:9, color:"#8A8070", marginBottom:5, letterSpacing:"0.08em" }}>감지된 감정:</p>
        <div style={{ display:"flex", flexWrap:"wrap", gap:4, marginBottom:10 }}>
          {emotions.map(e => (
            <span key={e} style={{ fontSize:11, background:ROSE, color:"white", padding:"2px 10px", borderRadius:10, fontWeight:700 }}>{e}</span>
          ))}
        </div>

        {/* 상태 메시지 */}
        <div style={{ background:"white", borderRadius:6, padding:"8px 12px", marginBottom:10, border:"1px solid #E0E0E0" }}>
          <p style={{ fontSize:11, color:INK, lineHeight:1.7, marginBottom:4 }}>{verdict}</p>
          <p style={{ fontSize:10, color:"#8A8070", fontStyle:"italic" }}>&ldquo;{machineComment}&rdquo;</p>
        </div>

        {/* 수치 */}
        <p style={{ fontSize:9, color:"#8A8070", marginBottom:5, letterSpacing:"0.08em" }}>분석 수치:</p>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3px 10px", marginBottom:10 }}>
          {bizarreStats.map(s => (
            <div key={s.label} style={{ display:"flex", justifyContent:"space-between", fontSize:10, background:"white", padding:"3px 8px", borderRadius:4, border:"1px solid #E8E8E8" }}>
              <span style={{ color:"#8A8070" }}>{s.label}</span>
              <span style={{ fontWeight:700, color: s.value.includes("%")&&parseInt(s.value)>70 ? ROSE : INK }}>{s.value}</span>
            </div>
          ))}
        </div>

        {/* 우걱이 메모 */}
        <p style={{ fontSize:10, fontFamily:HAND, color:"#6A6258", transform:"rotate(-1deg)", display:"inline-block", marginBottom:8 }}>{ugMemo}</p>

        {/* 버튼들 */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginTop:10 }}>
          <div style={{ background:ROSE, borderRadius:6, padding:"8px 0", textAlign:"center" }}>
            <p style={{ fontSize:11, color:"white", fontWeight:700 }}>재파쇄</p>
          </div>
          <div style={{ background:"#E8E8E8", borderRadius:6, padding:"8px 0", textAlign:"center", border:"1px solid #C0C0C0" }}>
            <p style={{ fontSize:11, color:"#5A5248", fontWeight:700 }}>닫기</p>
          </div>
        </div>

        <p style={{ fontSize:8, color:"#C0B8B0", textAlign:"center", marginTop:8 }}>
          {errorCode} · onulmode.vercel.app
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   스타일 11 — 감정 위험 경고문 (공문서 + 경고 스티커 감성)
══════════════════════════════════════════════════════════ */
function Style11({ data, emotions }: { data: ResultData; emotions: string[] }) {
  const { date, serial, resultTitle, verdict, machineComment, ugMemo, bizarreStats, errorCode, warningMessage, intensity, stamp } = data;
  return (
    <div style={{ width:W, background:"#FFFFF0", fontFamily:MONO, color:INK, position:"relative",
      border:`3px solid #FFD700`, boxShadow:`4px 4px 0 #B8A000, inset 0 0 0 2px #FFD700` }}>

      {/* 위험 줄무늬 헤더 */}
      <div style={{ height:18, backgroundImage:"repeating-linear-gradient(45deg, #FFD700 0px, #FFD700 10px, #1A1410 10px, #1A1410 20px)", marginBottom:0 }}/>

      <div style={{ padding:"14px 16px 16px" }}>

        {/* 위험 아이콘 + 제목 */}
        <div style={{ textAlign:"center", marginBottom:14 }}>
          <div style={{ fontSize:32, marginBottom:6 }}>⚠️</div>
          <p style={{ fontSize:9, letterSpacing:"0.2em", color:"#8A7000", marginBottom:4 }}>
            감정 위험 경고문 / No.{serial}
          </p>
          <p style={{ fontSize:20, fontWeight:700, color:"#CC0000", lineHeight:1.2, letterSpacing:"0.02em" }}>
            {resultTitle}
          </p>
          <p style={{ fontSize:9, color:"#8A7000", marginTop:4 }}>{date} 발급</p>
        </div>

        {/* 경고 박스 */}
        <div style={{ background:"#FFF3CD", border:"2px solid #CC0000", padding:"10px 12px", marginBottom:12, position:"relative" }}>
          <div style={{ position:"absolute", top:-10, left:16, background:"#CC0000", color:"white", fontSize:8, padding:"2px 8px", letterSpacing:"0.1em" }}>
            경고
          </div>
          <p style={{ fontSize:12, color:"#CC0000", fontWeight:700, marginBottom:4 }}>{warningMessage}</p>
          <p style={{ fontSize:11, color:"#5A4A00", lineHeight:1.6 }}>{verdict}</p>
        </div>

        {/* 감정 목록 */}
        <p style={{ fontSize:9, color:"#8A7000", letterSpacing:"0.1em", marginBottom:6 }}>위험 감정 목록:</p>
        <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginBottom:12 }}>
          {emotions.map(e => (
            <span key={e} style={{ fontSize:12, fontWeight:700, background:"#CC0000", color:"white", padding:"2px 10px", border:"1px solid #990000" }}>
              ▶ {e}
            </span>
          ))}
        </div>

        {/* 수치 분석 */}
        <p style={{ fontSize:9, color:"#8A7000", letterSpacing:"0.1em", marginBottom:6 }}>위험 수치 측정:</p>
        {bizarreStats.map(s => (
          <div key={s.label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", fontSize:11, marginBottom:5, paddingBottom:5, borderBottom:"1px dashed #D4C000" }}>
            <span style={{ color:"#5A4A00" }}>{s.label}</span>
            <span style={{ fontWeight:700, color: s.value.includes("%")&&parseInt(s.value)>70 ? "#CC0000" : "#5A4A00",
              background: s.value.includes("%")&&parseInt(s.value)>70 ? "#FFE0E0" : "transparent",
              padding:"1px 6px" }}>
              {s.value}
            </span>
          </div>
        ))}

        {/* 우걱이 진단 */}
        <div style={{ background:"#FFF9E0", border:"1px solid #D4C000", padding:"8px 10px", marginTop:10, marginBottom:10 }}>
          <p style={{ fontSize:9, color:"#8A7000", letterSpacing:"0.08em", marginBottom:4 }}>우걱이 판정:</p>
          <p style={{ fontSize:11, fontStyle:"italic", color:"#3A3000", lineHeight:1.6 }}>&ldquo;{machineComment}&rdquo;</p>
        </div>

        {/* 하단 스탬프 영역 */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end" }}>
          <div>
            <p style={{ fontSize:9, color:"#8A7000", marginBottom:3 }}>담당자 (우걱이) 메모:</p>
            <p style={{ fontSize:11, fontFamily:HAND, transform:"rotate(-2deg)", display:"inline-block", color:"#3A3000" }}>{ugMemo}</p>
          </div>
          <div style={{ border:`2px solid #CC0000`, padding:"4px 10px", transform:"rotate(-5deg)", textAlign:"center", background:"#FFF3CD" }}>
            <p style={{ fontSize:9, color:"#CC0000", fontWeight:700 }}>{stamp}</p>
          </div>
        </div>

        <p style={{ fontSize:8, color:"#8A7000", textAlign:"center", marginTop:12, letterSpacing:"0.06em" }}>
          {errorCode} · onulmode.vercel.app
        </p>
      </div>

      {/* 아래 줄무늬 */}
      <div style={{ height:14, backgroundImage:"repeating-linear-gradient(45deg, #FFD700 0px, #FFD700 8px, #1A1410 8px, #1A1410 16px)" }}/>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   메인 컴포넌트 — 스타일 라우팅
══════════════════════════════════════════════════════════ */
const ResultCard = forwardRef<HTMLDivElement, Props>(({ data, emotions }, ref) => {
  const style = data.cardStyle;
  return (
    <div ref={ref}>
      {style === 1 && <Style1 data={data} emotions={emotions} />}
      {style === 2 && <Style2 data={data} emotions={emotions} />}
      {style === 3 && <Style3 data={data} emotions={emotions} />}
      {style === 4 && <Style4 data={data} emotions={emotions} />}
      {style === 5 && <Style5 data={data} emotions={emotions} />}
      {style === 6 && <Style6 data={data} emotions={emotions} />}
      {style === 7 && <Style7 data={data} emotions={emotions} />}
      {style === 8 && <Style8 data={data} emotions={emotions} />}
      {style === 9  && <Style9  data={data} emotions={emotions} />}
      {style === 10 && <Style10 data={data} emotions={emotions} />}
      {style === 11 && <Style11 data={data} emotions={emotions} />}
      {style === 12 && <Style12 data={data} emotions={emotions} />}
    </div>
  );
});

ResultCard.displayName = "ResultCard";
export default ResultCard;
