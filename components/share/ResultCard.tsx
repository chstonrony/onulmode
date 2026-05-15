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
    </div>
  );
});

ResultCard.displayName = "ResultCard";
export default ResultCard;
