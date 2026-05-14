"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export type TrashState = "idle" | "alert" | "eating" | "satisfied";
interface TrashCanProps { state?: TrashState; fullWidth?: boolean; size?: number; }

const ROSE = "#C8607A";
const INK  = "#2A2520";

function useLed(active: boolean) {
  const [s, setS] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setS(v => (v + 1) % 5), active ? 110 : 1600);
    return () => clearInterval(t);
  }, [active]);
  return s;
}

function useBlink() {
  const [b, setB] = useState(false);
  useEffect(() => {
    const run = () => {
      const id = setTimeout(() => {
        setB(true);
        setTimeout(() => { setB(false); run(); }, 90);
      }, 2400 + Math.random() * 1200);
      return id;
    };
    const id = run();
    return () => clearTimeout(id);
  }, []);
  return b;
}

function useEye() {
  const [p, setP] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const pts = [{ x:-6,y:0 },{ x:6,y:0 },{ x:0,y:3 },{ x:-4,y:-2 },{ x:5,y:1 },{ x:0,y:0 }];
    let i = 0;
    const t = setInterval(() => { i=(i+1)%pts.length; setP(pts[i]); }, 1800 + Math.random()*600);
    return () => clearInterval(t);
  }, []);
  return p;
}

/* 파쇄 스트립 — 더 길고 다양하게 */
const STRIPS = [
  { x:16,  h:94,  c:"#F2ECE0", tw:"짜증",  s:true,  r:-0.5 },
  { x:32,  h:76,  c:"#EAE2CC", tw:"",      s:false, r: 0.8 },
  { x:48,  h:118, c:"#F2EDE2", tw:"불안",  s:true,  r:-0.3 },
  { x:64,  h:66,  c:"#EAE4CE", tw:"",      s:false, r: 1.0 },
  { x:80,  h:130, c:"#EAE2CC", tw:"걱정",  s:true,  r:-0.7 },
  { x:96,  h:88,  c:"#F2ECE0", tw:"",      s:false, r: 0.4 },
  { x:112, h:108, c:"#EDE5CF", tw:"서운함", s:true,  r:-0.5 },
  { x:128, h:72,  c:"#EAE2CC", tw:"",      s:false, r: 0.9 },
  { x:144, h:124, c:"#F2EDE2", tw:"외로움", s:true,  r:-0.3 },
  { x:160, h:82,  c:"#EAE4CE", tw:"",      s:false, r: 0.6 },
  { x:176, h:100, c:"#EDE5CF", tw:"지쳐",  s:true,  r:-0.8 },
  { x:192, h:68,  c:"#F2ECE0", tw:"",      s:false, r: 0.5 },
  { x:208, h:114, c:"#EAE2CC", tw:"허무",  s:true,  r:-0.4 },
  { x:224, h:80,  c:"#EDE5CF", tw:"",      s:false, r: 1.1 },
  { x:240, h:98,  c:"#F2EDE2", tw:"억울",  s:false, r:-0.6 },
  { x:256, h:70,  c:"#EAE4CE", tw:"",      s:false, r: 0.7 },
  { x:272, h:110, c:"#EDE5CF", tw:"",      s:false, r:-0.3 },
  { x:288, h:84,  c:"#EAE2CC", tw:"",      s:false, r: 0.9 },
  { x:304, h:96,  c:"#F2ECE0", tw:"",      s:false, r:-0.5 },
  { x:320, h:74,  c:"#EDE5CF", tw:"",      s:false, r: 0.6 },
  { x:336, h:106, c:"#EAE4CE", tw:"",      s:false, r:-0.4 },
];

export default function TrashCan({ state="idle", fullWidth=false, size }: TrashCanProps) {
  const eating    = state === "eating";
  const alert     = state === "alert";
  const satisfied = state === "satisfied";
  const active    = eating || alert;
  const led       = useLed(active);
  const blink     = useBlink();
  const eye       = useEye();

  const svgProps = fullWidth
    ? { width:"100%", height:"auto" }
    : { width: size ?? 340, height: (size ?? 340) * (530/380) };

  return (
    <motion.svg
      viewBox="0 0 380 530"
      {...svgProps}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={eating
        ? { x:[-3,3.5,-2.5,3,-2,1.5,-1,0], y:[0,-2,1.5,-1,0.5,0] }
        : {}}
      transition={{ duration:0.42, ease:"easeInOut" }}
    >
      <defs>
        <filter id="grain" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="4" result="noise"/>
          <feColorMatrix type="saturate" values="0" in="noise" result="gn"/>
          <feBlend in="SourceGraphic" in2="gn" mode="multiply" result="b"/>
          <feComposite in="b" in2="SourceGraphic" operator="in"/>
        </filter>
        <filter id="softShadow">
          <feDropShadow dx="2" dy="4" stdDeviation="4" floodOpacity="0.14"/>
        </filter>
        <linearGradient id="bodyGrad" x1="0" y1="0" x2="0.05" y2="1">
          <stop offset="0%"   stopColor="#D2C6A4"/>
          <stop offset="35%"  stopColor="#C6BA98"/>
          <stop offset="100%" stopColor="#B2A680"/>
        </linearGradient>
        <linearGradient id="topGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#B4A886"/>
          <stop offset="100%" stopColor="#A29474"/>
        </linearGradient>
        <linearGradient id="bladeGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#1C1814"/>
          <stop offset="100%" stopColor="#0E0C08"/>
        </linearGradient>
      </defs>

      {/* 그림자 */}
      <ellipse cx="190" cy="523" rx="155" ry="8" fill={INK} opacity="0.09"/>

      {/* ══════════════════════════════════════════════════ */}
      {/* ═══ 위에서 삽입되는 종이 노트 ══════════════════ */}
      {/* ══════════════════════════════════════════════════ */}
      <AnimatePresence>
        {!eating && (
          <motion.g
            animate={{ y:[0,-3,0], rotate:[-1.5,1.5,-1.5] }}
            transition={{ duration:3.8, repeat:Infinity, ease:"easeInOut" }}
            style={{ transformOrigin:"184px 72px" }}
          >
            {/* 핑크 노트 본체 */}
            <path d="M114 10 C112 8 112 8 116 8 L252 6 C255 6 256 8 256 10 L258 105 C258 108 256 109 253 109 L113 112 C110 112 109 110 109 107 Z"
              fill="#E8C0C4" stroke="#C09098" strokeWidth="1.3"
              transform="rotate(-1.5 184 60)"/>
            {/* 종이 상단 구멍 (핀 구멍) */}
            <circle cx="134" cy="12" r="3.5" fill="#D4ACBA" opacity="0.6"
              transform="rotate(-1.5 184 60)"/>
            <circle cx="234" cy="10" r="3.5" fill="#D4ACBA" opacity="0.6"
              transform="rotate(-1.5 184 60)"/>
            {/* 줄 */}
            {[30,44,58,72,86].map((y,i)=>(
              <line key={i} x1="120" y1={y} x2="248" y2={y-1}
                stroke="#C09098" strokeWidth="0.8" opacity={0.4-i*0.04}
                transform="rotate(-1.5 184 60)"/>
            ))}
            {/* 텍스트 */}
            <text x="178" y="34" fontSize="11" fill="#8A5858" fontFamily="serif" fontStyle="italic" opacity="0.85" transform="rotate(-1.5 184 60)">오늘 힘들었던 일</text>
            <text x="168" y="50" fontSize="11" fill="#8A5858" fontFamily="serif" fontStyle="italic" opacity="0.78" transform="rotate(-1.5 184 60)">말 못한 고민들</text>
            <text x="152" y="66" fontSize="11" fill={ROSE} fontFamily="serif" fontStyle="italic" opacity="0.88" transform="rotate(-1.5 184 60)">짜증, 불안, 걱정</text>
            <text x="145" y="82" fontSize="10.5" fill="#8A5858" fontFamily="serif" fontStyle="italic" opacity="0.72" transform="rotate(-1.5 184 60)">서운함, 외로움...</text>
            <text x="246" y="26" fontSize="13" fill={ROSE} opacity="0.65" transform="rotate(-1.5 184 60)">✳</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* 먹히는 애니메이션 */}
      <AnimatePresence>
        {eating && (
          <motion.g
            initial={{ y:0, opacity:1, scaleY:1 }}
            animate={{ y:55, opacity:0.15, scaleY:0.35 }}
            exit={{}}
            transition={{ duration:0.3, ease:"easeIn" }}
            style={{ transformOrigin:"184px 60px" }}
          >
            <path d="M114 10 L256 6 L258 105 L109 107 Z" fill="#E8C0C4" stroke="#C09098" strokeWidth="1.2"/>
          </motion.g>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════ */}
      {/* ═══ 상단 피드 하우징 — 불규칙 path ════════════ */}
      {/* ══════════════════════════════════════════════════ */}
      <path
        d="M12 108 C11 105 13 103 17 103 L361 100 C365 100 368 102 368 106 L369 134 C369 138 366 140 362 140 L18 143 C14 143 12 141 11 137 Z"
        fill="url(#topGrad)" stroke="#8E8462" strokeWidth="1.8"
        filter="url(#grain)"
      />
      {/* 상단 패널 내부 수평 강조선 */}
      <line x1="18" y1="120" x2="360" y2="118" stroke="#988C6A" strokeWidth="0.6" opacity="0.4"/>

      {/* ══════════════════════════════════════════════════ */}
      {/* ═══ 투입 슬롯 "INSERT YOUR FEELINGS HERE" ══════ */}
      {/* ══════════════════════════════════════════════════ */}
      <path
        d="M26 112 C25 110 27 109 30 109 L350 107 C353 107 354 109 354 111 L355 133 C355 135 353 136 350 136 L30 139 C27 139 26 137 25 135 Z"
        fill="url(#bladeGrad)" stroke="#706848" strokeWidth="0.7"
      />
      <path
        d="M28 114 L352 112 L353 134 L28 137 Z"
        fill="#0C0908" opacity="0.97"
      />
      <rect x="28" y="114" width="324" height="5" rx="2"
        fill="rgba(255,240,200,0.04)"/>

      {/* 슬롯 텍스트 */}
      <text x="190" y="130" textAnchor="middle" fontSize="10.5"
        fill={active ? ROSE : "#A89868"}
        fontFamily="'Courier New', Courier, monospace"
        fontWeight="bold" letterSpacing="2">
        ↓ INSERT YOUR FEELINGS HERE ↓
      </text>

      {/* 슬롯 글로우 */}
      <motion.path
        d="M26 112 L354 110 L355 134 L26 137 Z"
        fill="none"
        animate={{
          stroke: active ? ROSE : `${ROSE}22`,
          strokeWidth: active ? 2.5 : 0.7,
        }}
        style={{ filter: active ? `drop-shadow(0 0 14px ${ROSE}CC)` : "none" }}
        transition={{ duration:0.22 }}
      />

      {/* 삽입 화살표 */}
      <motion.g
        animate={{ y: active ? [0,-5,0,-5,0] : [0,-2,0] }}
        transition={{ duration: active ? 0.22 : 2.4, repeat:Infinity, ease:"easeInOut" }}>
        {[58,115,190,265,322].map((x,i)=>(
          <path key={i} d={`M${x-6} 107 L${x} 113 L${x+6} 107`}
            stroke={active ? ROSE : "#907858"}
            strokeWidth="1.8" fill="none" strokeLinecap="round"
            opacity={active ? 0.9 : 0.28}/>
        ))}
      </motion.g>

      {/* ══════════════════════════════════════════════════════ */}
      {/* ═══ 기계 메인 바디 — 불규칙 사다리꼴 path ═══════════ */}
      {/* 약간 아래가 더 좁아서 자연스럽게 위에서 아래로 수렴 ══ */}
      {/* ══════════════════════════════════════════════════════ */}
      <path
        d="
          M11 142
          C9 140 10 139 14 138
          L364 136
          C368 136 370 138 370 141
          L368 190 L370 240 L368 285
          C368 290 365 293 361 293
          L22 296
          C18 296 16 293 15 289
          L14 240 L12 190 Z
        "
        fill="url(#bodyGrad)" stroke="#8E8462" strokeWidth="1.8"
        filter="url(#grain)"
      />

      {/* 바디 왼쪽 어두운 면 (3D) */}
      <path d="M11 142 L14 240 L12 289 L18 293 L16 289 L17 240 L16 140 Z"
        fill="rgba(0,0,0,0.09)"/>
      {/* 바디 오른쪽 밝은 면 */}
      <path d="M370 141 L368 240 L368 293 L362 296 L364 293 L363 240 L364 138 Z"
        fill="rgba(255,255,220,0.04)"/>

      {/* 수평 텍스처 라인 */}
      {[155,168,182,196,210,224,238,254,270].map((y,i)=>(
        <line key={i} x1="20" y1={y} x2="358" y2={y-0.5}
          stroke="#B0A485" strokeWidth="0.5" opacity={0.28-i*0.022}/>
      ))}

      {/* 마모 얼룩 */}
      <ellipse cx="62" cy="168" rx="16" ry="9" fill="#A89870" opacity="0.2"/>
      <ellipse cx="318" cy="175" rx="11" ry="7" fill="#A09068" opacity="0.16"/>
      <ellipse cx="186" cy="153" rx="9" ry="5" fill="#A89870" opacity="0.13"/>
      <ellipse cx="310" cy="280" rx="8" ry="5" fill="#A09060" opacity="0.14"/>
      {/* 긁힌 자국 */}
      <line x1="36" y1="198" x2="54" y2="209" stroke="#908A6A" strokeWidth="0.7" opacity="0.28"/>
      <line x1="328" y1="164" x2="348" y2="175" stroke="#908A6A" strokeWidth="0.6" opacity="0.22"/>
      <line x1="140" y1="270" x2="156" y2="278" stroke="#908A6A" strokeWidth="0.5" opacity="0.2"/>

      {/* ══ 왼쪽 레버 볼 ══ */}
      <path d="M-2 185 C0 183 4 182 6 183 L6 232 C6 234 4 235 2 234 C0 233 -2 231 -2 229 Z"
        fill="#BDB292" stroke="#9E9272" strokeWidth="1"/>
      <motion.circle cx="6" cy="179" r="22"
        fill={ROSE} stroke="#8A4256" strokeWidth="2"
        animate={active ? { scale:[1,1.08,1] } : { scale:1 }}
        transition={{ duration:0.35, repeat:active?Infinity:0 }}
      />
      <ellipse cx="12" cy="170" rx="9" ry="7" fill="rgba(255,255,255,0.28)"/>
      <circle cx="6" cy="179" r="11" fill="rgba(0,0,0,0.12)"/>

      {/* ══════════════════════════════════════════════════ */}
      {/* ═══ 왼쪽 눈 — 크고 또렷하게 ════════════════════ */}
      {/* ══════════════════════════════════════════════════ */}
      <motion.g
        animate={blink ? { scaleY:0.06 } : { scaleY:1 }}
        style={{ transformOrigin:"110px 196px" }}
        transition={{ duration:0.07 }}>
        <ellipse cx="110" cy="196" rx="35" ry="35"
          fill="white" stroke={INK} strokeWidth="3.5"/>
        {/* 눈꺼풀 위 그림자 */}
        <path d="M75 196 C75 178 110 168 145 178 L145 196 Z"
          fill="#D4C8A4" opacity="0.28"/>
        {/* 동공 */}
        <motion.circle
          animate={{ cx:116+eye.x, cy:200+eye.y }}
          r="17" fill={INK}
          transition={{ duration:0.55, ease:"easeInOut" }}/>
        {/* 주 하이라이트 */}
        <motion.circle
          animate={{ cx:124+eye.x, cy:190+eye.y }}
          r="6.5" fill="white"
          transition={{ duration:0.55 }}/>
        {/* 보조 하이라이트 */}
        <motion.circle
          animate={{ cx:110+eye.x, cy:210+eye.y }}
          r="2.8" fill="white" opacity={0.38}
          transition={{ duration:0.55 }}/>
      </motion.g>

      {/* ══════════════════════════════════════════════════ */}
      {/* ═══ 오른쪽 눈 — 비대칭 (조금 작게) ════════════ */}
      {/* ══════════════════════════════════════════════════ */}
      <motion.g
        animate={blink ? { scaleY:0.06 } : { scaleY:1 }}
        style={{ transformOrigin:"232px 194px" }}
        transition={{ duration:0.07 }}>
        <ellipse cx="232" cy="194" rx="28" ry="30"
          fill="white" stroke={INK} strokeWidth="2.8"/>
        <path d="M204 194 C204 178 232 170 260 178 L260 194 Z"
          fill="#D4C8A4" opacity="0.24"/>
        <motion.circle
          animate={{ cx:238+eye.x, cy:198+eye.y }}
          r="14" fill={INK}
          transition={{ duration:0.55, ease:"easeInOut" }}/>
        <motion.circle
          animate={{ cx:244+eye.x, cy:189+eye.y }}
          r="5.2" fill="white"
          transition={{ duration:0.55 }}/>
      </motion.g>

      {/* ══ 코 (2점) ══ */}
      <circle cx="170" cy="215" r="3.8" fill={INK} opacity="0.35"/>
      <circle cx="181" cy="215" r="3.8" fill={INK} opacity="0.35"/>

      {/* ══ X X 핑크 스티커 ══ */}
      <motion.g
        animate={active ? { scale:1.14 } : { scale:1 }}
        style={{ transformOrigin:"298px 174px" }}
        transition={{ type:"spring", stiffness:280, damping:14 }}>
        <circle cx="298" cy="174" r="22" fill="#E8B0BE" stroke={INK} strokeWidth="1.7" opacity="0.9"/>
        <ellipse cx="290" cy="167" rx="10" ry="12" fill="#DDA0B0" opacity="0.4"/>
        <line x1="287" y1="164" x2="294" y2="171" stroke={INK} strokeWidth="2.8" strokeLinecap="round"/>
        <line x1="294" y1="164" x2="287" y2="171" stroke={INK} strokeWidth="2.8" strokeLinecap="round"/>
        <line x1="302" y1="164" x2="309" y2="171" stroke={INK} strokeWidth="2.8" strokeLinecap="round"/>
        <line x1="309" y1="164" x2="302" y2="171" stroke={INK} strokeWidth="2.8" strokeLinecap="round"/>
        <path d="M288 182 Q298 193 308 182"
          stroke={INK} strokeWidth="2" fill="none" strokeLinecap="round"/>
        <ellipse cx="298" cy="186" rx="6.5" ry="7.5" fill={ROSE} opacity="0.82"/>
      </motion.g>

      {/* ══ 감정 처리 중 스티커 ══ */}
      <path d="M42 158 L120 156 L122 202 L40 204 Z"
        fill="#F5EFE0" stroke="#C8B898" strokeWidth="0.9"/>
      {/* 테이프 */}
      <path d="M62 152 L104 151 L104 161 L62 162 Z"
        fill="rgba(210,185,145,0.54)"
        style={{ backgroundImage:"repeating-linear-gradient(108deg,transparent,transparent 3px,rgba(175,150,110,0.09) 3px,rgba(175,150,110,0.09) 4px)" }}
      />
      <line x1="48" y1="170" x2="114" y2="169" stroke="#DDD0BC" strokeWidth="0.7"/>
      <line x1="48" y1="180" x2="112" y2="179" stroke="#DDD0BC" strokeWidth="0.7"/>
      <text x="82" y="168" textAnchor="middle" fontSize="8" fill="#7A6858" fontFamily="serif" letterSpacing="0.5">감정</text>
      <text x="82" y="178" textAnchor="middle" fontSize="8" fill="#7A6858" fontFamily="serif">처리 중...</text>
      <line x1="48" y1="186" x2="114" y2="185" stroke="#DDD0BC" strokeWidth="0.6"/>
      <text x="82" y="196" textAnchor="middle" fontSize="5.5" fill="#A89880" fontFamily="monospace">processing...</text>

      {/* ══ WARNING 배지 ══ */}
      <path d="M296 150 L354 148 L356 202 L294 204 Z"
        fill="#F5EFE0" stroke="#C8B898" strokeWidth="0.9"/>
      <path d="M310 165 L318 152 L326 165 Z" fill="#E8C060" stroke="#C89040" strokeWidth="0.6"/>
      <text x="318" y="163" textAnchor="middle" fontSize="7" fill="#8A6820" fontWeight="bold">!</text>
      <text x="327" y="162" fontSize="7" fill={INK} fontFamily="monospace" fontWeight="bold">WARNING</text>
      <line x1="301" y1="167" x2="349" y2="166" stroke="#D4C8B0" strokeWidth="0.6"/>
      <text x="325" y="176" textAnchor="middle" fontSize="5.5" fill="#A89880" fontFamily="monospace">overthinking</text>
      <text x="325" y="184" textAnchor="middle" fontSize="5.5" fill="#A89880" fontFamily="monospace">overloaded</text>
      <line x1="301" y1="188" x2="349" y2="187" stroke="#D4C8B0" strokeWidth="0.6"/>
      <motion.circle cx="325" cy="198" r="5"
        fill={active ? ROSE : "#C8A898"}
        animate={{ opacity: active ? [0.6,1,0.6] : 0.7 }}
        style={{ filter: active ? `drop-shadow(0 0 4px ${ROSE})` : "none" }}
        transition={{ duration:0.8, repeat:active?Infinity:0 }}/>

      {/* ══ OVERTHINKING 다이얼 ══ */}
      <path d="M20 240 L138 238 L140 292 L18 294 Z"
        fill="#BAB090" stroke="#A09068" strokeWidth="1"/>
      <text x="79" y="251" textAnchor="middle" fontSize="7" fill="#4A4030" fontFamily="'Courier New', monospace" letterSpacing="0.5" fontWeight="bold">OVERTHINKING</text>
      <circle cx="58" cy="272" r="17" fill="#A89878" stroke="#887858" strokeWidth="1.4"/>
      <circle cx="58" cy="272" r="12" fill="#C0B090" stroke="#988860" strokeWidth="0.8"/>
      <motion.line x1="58" y1="272" x2="58" y2="260"
        stroke={INK} strokeWidth="3.2" strokeLinecap="round"
        animate={{ rotate: active ? [0,360] : [0,90,0] }}
        style={{ transformOrigin:"58px 272px" }}
        transition={{ duration: active ? 0.65 : 3.5, repeat:Infinity, ease: active ? "linear" : "easeInOut" }}/>
      <text x="32" y="287" fontSize="6" fill="#4A4030" fontFamily="monospace">MIN</text>
      <text x="74" y="287" fontSize="6" fill={ROSE} fontFamily="monospace">MAX</text>
      {[0,45,90,135,180,225,270,315].map((deg,i)=>{
        const r=20, rad=(deg-90)*Math.PI/180;
        return <circle key={i} cx={58+r*Math.cos(rad)} cy={272+r*Math.sin(rad)} r="1.2" fill="#787060" opacity="0.52"/>;
      })}

      {/* LED 5개 */}
      {[148,162,176,190,204].map((cx,i)=>(
        <motion.circle key={i} cx={cx} cy={270} r="6.5"
          animate={{
            fill: active ? (led%5===i ? ROSE : `${ROSE}30`) : (i===0?"#D4A090":"#B8AC88"),
            opacity: active ? 1 : (i===0?0.75:0.38),
          }}
          style={{ filter: active&&led%5===i ? `drop-shadow(0 0 6px ${ROSE})` : "none" }}
          transition={{ duration:0.12 }}/>
      ))}

      {/* 조용히 갈아버리는 중 */}
      <motion.text x="230" y="286" textAnchor="middle" fontSize="9.5"
        fill="#7A7460" fontFamily="serif" fontStyle="italic"
        animate={{ opacity: active ? [0.5,1,0.5] : 0.62 }}
        transition={{ duration:1, repeat:active?Infinity:0 }}>
        {eating?"파쇄 중...":satisfied?"처리 완료.":"조용히 갈아버리는 중..."}
      </motion.text>

      {/* OFF/CRY 토글 */}
      <path d="M288 238 L362 236 L364 292 L286 294 Z"
        fill="#BAB090" stroke="#A09068" strokeWidth="1"/>
      <text x="325" y="250" textAnchor="middle" fontSize="7.5" fill="#4A4030" fontFamily="monospace" fontWeight="bold">OFF</text>
      <path d="M296 255 L354 254 L355 274 L296 275 Z" fill="#989068" stroke="#807848" strokeWidth="0.6" rx="10"/>
      <rect x="296" y="254" width="58" height="20" rx="10" fill="#989068"/>
      <motion.circle
        animate={{ cx: active ? 344 : 307, fill: active ? ROSE : "#E8DCC4" }}
        cy={264} r="14"
        stroke="#887860" strokeWidth="0.8"
        style={{ filter: active ? `drop-shadow(0 0 8px ${ROSE}AA)` : "none" }}
        transition={{ type:"spring", stiffness:380, damping:24 }}/>
      <text x="325" y="283" textAnchor="middle" fontSize="7.5" fill="#4A4030" fontFamily="monospace" fontWeight="bold">CRY</text>
      <text x="325" y="292" textAnchor="middle" fontSize="5" fill={active ? ROSE : "#8A8060"} fontFamily="monospace">
        {active ? "● SHREDDING" : "○ STANDBY"}
      </text>

      {/* 코너 나사 — 불규칙 위치 */}
      {[[20,144],[362,142],[18,286],[364,289]].map(([cx,cy],i)=>(
        <g key={i}>
          <circle cx={cx} cy={cy} r="5.5" fill="#C0AE8A" stroke="#A89868" strokeWidth="0.7"/>
          <line x1={cx-3} y1={cy} x2={cx+3} y2={cy} stroke="#7A6848" strokeWidth="1.2"/>
          <line x1={cx} y1={cy-3} x2={cx} y2={cy+3} stroke="#7A6848" strokeWidth="1.2"/>
        </g>
      ))}

      {/* ══════════════════════════════════════════════════════════ */}
      {/* ═══ 파쇄기 "입" — 기계 하단 중앙, 불규칙 path ═══════════ */}
      {/* ══════════════════════════════════════════════════════════ */}
      <path
        d="M10 296 C9 293 12 292 16 292 L363 290 C367 290 370 292 370 295 L371 330 C371 334 368 336 364 335 L16 338 C12 338 10 336 9 332 Z"
        fill="url(#bladeGrad)" stroke="#6A6040" strokeWidth="1.5"
      />

      {/* 블레이드 슬릿 (실제 칼날 느낌) */}
      {Array.from({length:22}).map((_,i)=>(
        <path key={i}
          d={`M${19+i*16} 297 L${19+i*16+12} 297 L${20+i*16+12} 331 L${20+i*16} 331 Z`}
          fill="#0C0A08" stroke="#201E14" strokeWidth="0.3"/>
      ))}

      {/* 블레이드 슬릿 사이 금속 기둥 */}
      {Array.from({length:21}).map((_,i)=>(
        <line key={i}
          x1={31+i*16} y1={297} x2={31+i*16} y2={332}
          stroke="#2A2418" strokeWidth="1.5" opacity="0.7"/>
      ))}

      {/* 활성 시 내부 로즈 글로우 */}
      <motion.rect x="10" y="296" width="360" height="36"
        fill="none"
        animate={{ opacity: active ? [0,0.6,0] : 0 }}
        transition={{ duration:0.6, repeat:active?Infinity:0 }}>
      </motion.rect>
      {active && (
        <rect x="10" y="296" width="360" height="36"
          fill={ROSE} opacity="0.08"/>
      )}

      {/* 블레이드 상하 엣지 */}
      <line x1="10" y1="296" x2="370" y2="295" stroke="#2A2418" strokeWidth="2.5"/>
      <line x1="10" y1="334" x2="370" y2="333" stroke="#1A1810" strokeWidth="3"/>

      {/* 기계 받침 (불규칙) */}
      <path d="M10 332 L368 330 L366 342 L12 344 Z"
        fill="#A29270" stroke="#908060" strokeWidth="1.4"/>
      {/* 왼쪽 발 */}
      <path d="M18 342 L46 342 L44 352 L16 354 Z" fill="#928260" stroke="#807050" strokeWidth="1"/>
      {/* 오른쪽 발 */}
      <path d="M332 340 L360 339 L362 350 L330 352 Z" fill="#928260" stroke="#807050" strokeWidth="1"/>

      {/* ══════════════════════════════════════════════════════ */}
      {/* ═══ 파쇄 스트립 — 더 길고 더 많고 더 드라마틱 ════════ */}
      {/* ══════════════════════════════════════════════════════ */}
      {STRIPS.map((s,i)=>(
        <motion.g key={i}
          animate={active ? {
            x:[0,-3,3,-2.5,2.5,-2,2,-1,0],
            rotate:[0,-3,3,-2.5,2.5,-2,2,-1,0],
          } : {
            y:[0,i%2?-5:5,0],
            rotate:[s.r-0.5, s.r+0.5, s.r-0.5],
          }}
          style={{ transformOrigin:`${s.x+7}px 338px` }}
          transition={active ? {
            duration:0.28, delay:i*0.01, ease:"easeInOut", repeat:4,
          } : {
            duration:2.4+i*0.06, repeat:Infinity, ease:"easeInOut", delay:i*0.08,
          }}
        >
          {/* 스트립 본체 */}
          <rect x={s.x} y={338} width={14} height={s.h}
            rx="0 0 3 3" fill={s.c}
            stroke="rgba(44,40,37,0.07)" strokeWidth="0.5"
            transform={`rotate(${s.r} ${s.x+7} 338)`}
          />
          {/* 상단 — 블레이드에 찢겨나오는 느낌 */}
          <path d={`M${s.x} 338 L${s.x+3.5} 334 L${s.x+8} 339 L${s.x+14} 335`}
            stroke="rgba(44,40,37,0.2)" strokeWidth="1" fill="none"/>
          {/* 블레이드 슬릿 안쪽 어두움 */}
          <rect x={s.x} y={338} width={14} height={7}
            fill="rgba(0,0,0,0.15)"/>
          {/* 감정 단어 세로 */}
          {s.s && s.tw && (
            <text x={s.x+7} y={343} fill="#8A8270" fontSize="6.5"
              fontFamily="serif" opacity="0.44"
              writingMode="tb" textAnchor="start">
              {s.tw}
            </text>
          )}
          {/* 간헐적 컬러 파편 (실제 파쇄기처럼 색깔 조각) */}
          {i%5===0 && (
            <rect x={s.x+2} y={338+Math.floor(s.h*0.6)} width={10} height={4}
              fill={[ROSE,"#C8D4E8","#E8D8C0","#C8E0D0"][i%4]}
              opacity="0.5"/>
          )}
        </motion.g>
      ))}

      {/* 만족 새 스트립 */}
      <AnimatePresence>
        {satisfied && (
          <motion.g
            initial={{ opacity:0 }}
            animate={{ opacity:[0,0.85,0.55,0] }}
            exit={{}}
            transition={{ duration:2.5, ease:"easeOut" }}
          >
            <rect x="128" y="338" width="14" height="90" rx="0 0 3 3"
              fill="#F5EBCC" stroke="rgba(44,40,37,0.07)" strokeWidth="0.5"/>
            <path d="M128 338 L131.5 334 L136 339 L142 335"
              stroke="rgba(44,40,37,0.2)" strokeWidth="1" fill="none"/>
            <text x="135" y="343" fill={ROSE} fontSize="6.5"
              fontFamily="serif" opacity="0.72" writingMode="tb" textAnchor="start">
              버렸다
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* ══ 바닥 종이 조각 (컬러 포함) ══ */}
      {[
        {x:14, y:465,w:26,h:9, r:-18,c:"#EEE8D8"},{x:44, y:470,w:18,h:6, r:14,c:"#F2ECE0"},
        {x:68, y:462,w:30,h:7, r:-9, c:"#F2EDE4"},{x:104,y:468,w:22,h:6, r:17,c:"#EEE8D8"},
        {x:130,y:462,w:28,h:8, r:-12,c:"#F2ECE0"},{x:162,y:469,w:24,h:6, r:10,c:"#EEE2CC"},
        {x:190,y:462,w:30,h:7, r:-15,c:"#EEE8D8"},{x:224,y:469,w:20,h:6, r:19,c:"#F2EDE4"},
        {x:248,y:462,w:26,h:8, r:-10,c:"#EEE8D8"},{x:278,y:469,w:22,h:6, r:16,c:"#EEE2CC"},
        {x:304,y:462,w:28,h:7, r:-8, c:"#F2ECE0"},{x:334,y:469,w:20,h:6, r:18,c:"#EEE8D8"},
        {x:356,y:462,w:18,h:8, r:-14,c:"#F2EDE4"},
        /* 컬러 파편 */
        {x:88, y:472,w:10,h:9,r:28, c:"#E8C0C4"},{x:160,y:464,w:8, h:7,r:-20,c:"#C8D4E8"},
        {x:222,y:473,w:9, h:6,r:34, c:"#E8D8C0"},{x:288,y:466,w:11,h:7,r:-26,c:"#C8E0D0"},
      ].map((p,i)=>(
        <rect key={i} x={p.x} y={p.y} width={p.w} height={p.h} rx="1.5"
          fill={p.c} opacity="0.72"
          transform={`rotate(${p.r} ${p.x+p.w/2} ${p.y+p.h/2})`}/>
      ))}

      {/* ══ 오른쪽 쓰레기통 ══ */}
      {/* 약간 기울어진 형태 */}
      <path d="M330 330 C328 328 330 326 334 325 L372 323 C376 323 378 325 377 328 L376 376 C376 380 374 382 370 382 L332 384 C328 384 326 382 327 378 Z"
        fill="#5A5850" stroke="#454540" strokeWidth="1.4"/>
      <ellipse cx="354" cy="326" rx="24" ry="6" fill="#4A4840" stroke="#404038" strokeWidth="1.2"/>
      {[0,1,2,3,4,5].map(i=>(
        <rect key={i} x={334+i*7} y={329+i%2*3} width={5.5} height={20+i*3} rx="0.5"
          fill={["#EEE8D8","#F2ECE0","#EEE8D8","#F2EBCC","#F2EAD8","#EEE8D8"][i]}
          opacity="0.7"/>
      ))}
      <rect x="336" y="316" width="5" height="14" rx="0.5" fill="#F2ECE0" opacity="0.68" transform="rotate(-10 338 323)"/>
      <rect x="358" y="317" width="5.5" height="13" rx="0.5" fill="#EEE8D8" opacity="0.68" transform="rotate(12 360 323)"/>
      {/* X X 표정 */}
      <line x1="342" y1="350" x2="347" y2="356" stroke={INK} strokeWidth="1.5" opacity="0.48"/>
      <line x1="347" y1="350" x2="342" y2="356" stroke={INK} strokeWidth="1.5" opacity="0.48"/>
      <line x1="357" y1="350" x2="362" y2="356" stroke={INK} strokeWidth="1.5" opacity="0.48"/>
      <line x1="362" y1="350" x2="357" y2="356" stroke={INK} strokeWidth="1.5" opacity="0.48"/>
      <path d="M343 364 Q352 370 361 364" stroke={INK} strokeWidth="1.3" fill="none" opacity="0.44" strokeLinecap="round"/>
    </motion.svg>
  );
}
