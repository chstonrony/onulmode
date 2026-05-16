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

/* ── 공유 낙서 SVG 요소들 ── */

// 우걱이 얼굴 낙서
const UgegiFace = ({ x=0, y=0, size=60, angle=0 }: { x?:number; y?:number; size?:number; angle?:number }) => (
  <g transform={`translate(${x},${y}) rotate(${angle})`}>
    {/* 얼굴 — 삐뚤한 원 */}
    <ellipse cx={size/2} cy={size/2} rx={size/2-2} ry={size/2} fill="none" stroke={INK} strokeWidth="2.5"/>
    {/* 왼쪽 눈 — 약간 아래 */}
    <ellipse cx={size*0.32} cy={size*0.42} rx="5" ry="6" fill={INK}/>
    <circle cx={size*0.32-1} cy={size*0.38} r="2" fill="white" opacity="0.8"/>
    {/* 오른쪽 눈 — 약간 위 */}
    <ellipse cx={size*0.68} cy={size*0.38} rx="6" ry="5" fill={INK}/>
    <circle cx={size*0.68+1} cy={size*0.34} r="2.2" fill="white" opacity="0.8"/>
    {/* 입 — 웃는지 우는지 모를 선 */}
    <path d={`M${size*0.28},${size*0.65} Q${size*0.38},${size*0.62} ${size*0.5},${size*0.68} Q${size*0.62},${size*0.74} ${size*0.72},${size*0.63}`}
      fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round"/>
    {/* 이빨 2개 */}
    <rect x={size*0.41} y={size*0.65} width="6" height="8" fill={INK}/>
    <rect x={size*0.5} y={size*0.66} width="5" height="7" fill={INK}/>
    {/* 땀 */}
    <path d={`M${size*0.82},${size*0.25} Q${size*0.85},${size*0.18} ${size*0.88},${size*0.28}`}
      fill="none" stroke={INK} strokeWidth="1.5"/>
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
  const { date, serial, ingredients, resultGrade, verdict, ugMemo, bizarreStats, stamp } = data;
  return (
    <div style={{ width:W, background:"#FAF8EE", fontFamily:MONO, color:INK, position:"relative",
      border:`2px solid ${INK}`, boxShadow:`3px 3px 0 ${INK}` }}>
      {/* 가로줄 배경 */}
      <div style={{ position:"absolute", inset:0, backgroundImage:"repeating-linear-gradient(transparent,transparent 24px,rgba(150,180,220,0.25) 24px,rgba(150,180,220,0.25) 25px)", backgroundPosition:"0 32px", pointerEvents:"none" }}/>
      {/* 빨간 여백선 */}
      <div style={{ position:"absolute", left:36, top:0, bottom:0, width:"1.5px", background:"rgba(200,100,100,0.35)", pointerEvents:"none" }}/>

      {/* SVG 낙서 오버레이 */}
      <svg style={{ position:"absolute", top:0, left:0, width:"100%", height:"100%", pointerEvents:"none" }} viewBox={`0 0 ${W} 480`}>
        <UgegiFace x={W-85} y={8} size={70} angle={8}/>
        <DoodleHeart x={50} y={38}/>
        <DoodleStar x={24} y={160} size={10}/>
        <DoodleStar x={W-22} y={220} size={8} fill={ROSE} stroke={ROSE}/>
        <WavyUnderline x={44} y={68} width={120}/>
        <ScribbleLine y={110} opacity={0.25}/>
        <ScribbleLine y={290} opacity={0.2}/>
        {/* 낙서 화살표 */}
        <path d="M44,380 Q60,370 75,378" fill="none" stroke={INK} strokeWidth="1.5"/>
        <polygon points="72,374 79,378 73,384" fill={INK}/>
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

        {/* 하단 */}
        <div style={{ borderTop:`1px dashed ${INK}30`, paddingTop:8, marginTop:4, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <p style={{ fontSize:10, fontFamily:SERIF, color:"#6A6258" }}>
            AI가 내 감정 먹다가 체함 ㅋㅋ
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
  const { date, serial, resultGrade, verdict, ugMemo, bizarreStats, machineComment, stamp } = data;
  return (
    <div style={{ width:W, background:"#FAFAF5", fontFamily:MONO, color:INK, position:"relative",
      border:`2.5px solid ${INK}`, boxShadow:`4px 4px 0 #8A8070` }}>

      <svg style={{ position:"absolute", top:0, left:0, width:"100%", height:"100%", pointerEvents:"none" }} viewBox={`0 0 ${W} 460`}>
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
          AI가 내 감정 먹다가 체함 ㅋㅋ &nbsp;—&nbsp; onulmode.vercel.app
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   스타일 3 — 급식표
══════════════════════════════════════════════════════════ */
function Style3({ data, emotions }: { data: ResultData; emotions: string[] }) {
  const { date, serial, ingredients, resultGrade, ugMemo, bizarreStats, stamp } = data;
  const stars = (n: number) => "★".repeat(n) + "☆".repeat(5-n);
  return (
    <div style={{ width:W, background:"#FAF5E8", fontFamily:MONO, color:INK, position:"relative",
      border:`3px solid ${INK}`, boxShadow:`5px 5px 0 ${INK}` }}>

      <svg style={{ position:"absolute", top:0, left:0, width:"100%", height:"100%", pointerEvents:"none" }} viewBox={`0 0 ${W} 440`}>
        <UgegiFace x={W-78} y={10} size={65} angle={5}/>
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
          오늘 우걱이 판정 미쳤음 — onulmode.vercel.app
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   스타일 4 — 시험지
══════════════════════════════════════════════════════════ */
function Style4({ data, emotions }: { data: ResultData; emotions: string[] }) {
  const { date, serial, intensity, resultGrade, verdict, ugMemo, bizarreStats, stamp } = data;
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
          나 감정 소화 실패 뜸 — onulmode.vercel.app
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   스타일 5 — 저주받은 그림일기
══════════════════════════════════════════════════════════ */
function Style5({ data, emotions }: { data: ResultData; emotions: string[] }) {
  const { date, serial, resultGrade, verdict, ugMemo, bizarreStats, stamp, machineComment } = data;
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
              <UgegiFace x={5} y={3} size={70} angle={3}/>
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
          우걱이가 내 우울 씹는 중 — onulmode.vercel.app
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
  const { date, serial, ugMemo } = data;
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
            우걱이 돌리다가 울컥함 ㅋㅋ
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
  const { date, serial, resultTitle, verdict, machineComment, ugMemo, bizarreStats, intensity, stamp } = data;
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
          <p style={{ fontSize:10, color:ROSE, fontWeight:700, marginBottom:4 }}>ERROR CODE: {serial}-UGEGI</p>
          <p style={{ fontSize:11, color:INK, lineHeight:1.6, marginBottom:4 }}>{verdict}</p>
          <p style={{ fontSize:10, color:"#5A5248", fontStyle:"italic" }}>&ldquo;{machineComment}&rdquo;</p>
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
      {style === 9 && <Style9 data={data} emotions={emotions} />}
    </div>
  );
});

ResultCard.displayName = "ResultCard";
export default ResultCard;
