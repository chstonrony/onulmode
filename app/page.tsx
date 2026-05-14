"use client";

import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import TrashCan, { TrashState } from "@/components/trash/TrashCan";
import EmotionSticker, { StickerConfig } from "@/components/trash/EmotionSticker";
import FeedbackToast, { getRandomMessage } from "@/components/trash/FeedbackToast";

const ROSE = "#C8607A";
const INK  = "#2A2520";

/* ── SVG 낙서 컴포넌트들 ── */
const StarDoodle = ({ size=14, color=ROSE, style={} }: { size?:number; color?:string; style?:React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" style={style}>
    <path d="M7 1L8.3 5H12.5L9.2 7.8L10.5 12L7 9.5L3.5 12L4.8 7.8L1.5 5H5.7Z"
      fill={color} opacity="0.8"/>
  </svg>
);

const Lightning = ({ size=18, style={} }: { size?:number; style?:React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 18 18" style={style}>
    <path d="M11 2L5 10H9L7 16L14 7H10L11 2Z" fill="#E8D060" stroke={INK} strokeWidth="0.8" strokeLinejoin="round"/>
  </svg>
);

const ScribbleCircle = ({ size=48, style={} }: { size?:number; style?:React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" style={{ opacity:0.45, ...style }}>
    <path d="M24 8C14 8 8 14 8 24C8 34 14 40 24 40C34 40 40 34 40 24C40 18 36 12 30 10C24 8 16 10 12 16C8 22 10 32 16 36C22 40 32 38 36 32C40 26 38 16 32 12C26 8 16 12 14 18C12 24 16 32 22 34"
      stroke={INK} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
  </svg>
);

const TapeStrip = ({ width=56, rotation=0, style={} }: { width?:number; rotation?:number; style?:React.CSSProperties }) => (
  <div style={{
    position:"absolute",
    width, height:13,
    background:"rgba(212,188,144,0.54)",
    backgroundImage:"repeating-linear-gradient(108deg,transparent,transparent 3px,rgba(175,150,110,0.09) 3px,rgba(175,150,110,0.09) 4px)",
    transform:`rotate(${rotation}deg)`,
    borderRadius:1,
    ...style,
  }}/>
);

const Paperclip = ({ color="#C8A878", style={} }: { color?:string; style?:React.CSSProperties }) => (
  <svg width="18" height="32" viewBox="0 0 18 32" style={style}>
    <path d="M9 2 C5 2 2 5 2 9 L2 24 C2 28 5 31 9 31 C13 31 16 28 16 24 L16 8 C16 5 14 3 11 3 C8 3 6 5 6 8 L6 23 C6 25 7.3 26 9 26 C10.7 26 12 25 12 23 L12 9"
      stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round"/>
  </svg>
);

const WavyLine = ({ style={} }: { style?:React.CSSProperties }) => (
  <svg width="50" height="12" viewBox="0 0 50 12" style={{ opacity:0.45, ...style }}>
    <path d="M2 6 Q8 2 14 6 Q20 10 26 6 Q32 2 38 6 Q44 10 50 6"
      stroke={INK} strokeWidth="1.2" fill="none" strokeLinecap="round"/>
  </svg>
);

const PinDot = ({ color=ROSE, style={} }: { color?:string; style?:React.CSSProperties }) => (
  <svg width="14" height="18" viewBox="0 0 14 18" style={style}>
    <circle cx="7" cy="6" r="5" fill={color} stroke={INK} strokeWidth="1"/>
    <circle cx="7" cy="6" r="2.5" fill="rgba(255,255,255,0.35)"/>
    <line x1="7" y1="11" x2="7" y2="18" stroke={INK} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

/* ── 찢어진 종이 노트 ── */
function Note({
  children, rot=0, bg="#F5EFE0", tape=false, pin=false, clip=false,
  tapeColor, style={},
}: {
  children:React.ReactNode; rot?:number; bg?:string;
  tape?:boolean; pin?:boolean; clip?:boolean;
  tapeColor?:string;
  style?:React.CSSProperties;
}) {
  return (
    <div style={{
      position:"absolute",
      background:bg,
      borderRadius:2,
      boxShadow:"2px 4px 16px rgba(42,37,32,0.15), 0 1px 0 rgba(255,255,255,0.55) inset",
      transform:`rotate(${rot}deg)`,
      ...style,
    }}>
      {tape && <TapeStrip width={56} rotation={0} style={{ position:"absolute", top:-7, left:"50%", transform:`translateX(-50%) rotate(${rot*-0.3}deg)`, ...(tapeColor ? { background:tapeColor } : {}) }}/>}
      {pin && <PinDot style={{ position:"absolute", top:-10, left:"50%", transform:"translateX(-50%)" }}/>}
      {clip && <Paperclip style={{ position:"absolute", top:-8, right:10 }}/>}
      {children}
    </div>
  );
}

/* 드래그 스티커 — 눈 위치를 피해서 배치 */
const STICKERS: StickerConfig[] = [
  { text:"지쳐서",   bg:"#F0E0DC", rot:-11, initX:-162, initY: 60,  floatAnim:"up",   tape:true  },
  { text:"억울한데", bg:"#D8E4EE", rot:  8, initX: 155, initY: 10,  floatAnim:"down", tape:false },
  { text:"외로워",   bg:"#D8E8DC", rot: -6, initX: 158, initY:120,  floatAnim:"up",   tape:true  },
  { text:"현타",     bg:"#F5EBCC", rot:-13, initX:-158, initY:130,  floatAnim:"down", tape:false },
];

function Particles({ active }: { active:boolean }) {
  if (!active) return null;
  return (
    <>
      {Array.from({length:18}).map((_,i) => {
        const a=(i/18)*360, r=26+Math.random()*58;
        const x=Math.cos(a*Math.PI/180)*r, y=Math.sin(a*Math.PI/180)*r-16;
        const c=["#D4C8B4","#E0C8B8","#C8D4DC","#DDD0C0","#E0C8C8"][i%5];
        return (
          <motion.div key={i}
            initial={{x:0,y:0,opacity:0.65,scale:1,rotate:0}}
            animate={{x,y,opacity:0,scale:0,rotate:Math.random()*140}}
            transition={{duration:1.1,delay:i*0.025,ease:"easeOut"}}
            style={{position:"absolute",left:"50%",top:"50%",
              width:4+Math.random()*5,height:3+Math.random()*6,
              borderRadius:1,background:c,pointerEvents:"none",zIndex:40}}
          />
        );
      })}
    </>
  );
}

export default function MainPage() {
  const trashRef = useRef<HTMLDivElement>(null);
  const [state, setState]     = useState<TrashState>("idle");
  const [toast, setToast]     = useState<string|null>(null);
  const [particles, setP]     = useState(false);
  const [count, setCount]     = useState(0);
  const [phase, setPhase]     = useState<null|"processing"|"done">(null);
  const [currentLabel, setLabel] = useState("");

  const DONE_MSGS = [
    "오늘 마음 조금 정리 완료.",
    "감정 1개 성공적으로 파쇄됨.",
    "다 해결된 건 아니어도, 버렸잖아.",
    "너 오늘도 꽤 버텼다.",
    "마음속 잡음 −1 완료.",
  ];

  const runSequence = useCallback((label: string) => {
    setLabel(label);
    setState("eating");
    setP(true);
    setPhase("processing");
    setTimeout(() => setP(false), 1400);
    setTimeout(() => setState("satisfied"), 800);
    setTimeout(() => setPhase("done"), 1900);
    setTimeout(() => { setState("idle"); setPhase(null); }, 3600);
    setCount(n => n + 1);
    setTimeout(() => {
      setToast(DONE_MSGS[Math.floor(Math.random() * DONE_MSGS.length)]);
      setTimeout(() => setToast(null), 3000);
    }, 2000);
  }, []);

  const handleDrop = useCallback(() => runSequence("감정"), [runSequence]);
  const quickDump = useCallback((label:string) => runSequence(label), [runSequence]);

  return (
    <div style={{ background:"#EDE4D0", minHeight:"100vh", overflowX:"hidden" }} className="page-wrapper">

      {/* 배경 블러 감정 워드 */}
      {["지쳐서","외로워","억울","서운해","현타","허무해"].map((w,i)=>(
        <div key={i} style={{
          position:"fixed",
          left:["-2%","76%","84%","2%","82%","4%"][i],
          top:["8%","4%","44%","54%","70%","82%"][i],
          fontSize:[28,22,20,30,24,18][i],
          fontFamily:"var(--font-serif)",
          color:INK, opacity:0.038, filter:"blur(14px)",
          transform:`rotate(${[-10,6,9,-8,4,-12][i]}deg)`,
          pointerEvents:"none", userSelect:"none", whiteSpace:"nowrap",
        }}>{w}</div>
      ))}

      {/* ══ 헤더 ══ */}
      <div style={{
        display:"flex", alignItems:"flex-start", justifyContent:"space-between",
        padding:"38px 18px 0", position:"relative", zIndex:20,
      }}>
        {/* 왼쪽: 로고 + 서브텍스트 */}
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:5, marginBottom:5 }}>
            <span style={{ fontSize:24, fontFamily:"var(--font-serif)", color:INK, letterSpacing:"0.02em", fontWeight:700 }}>
              오늘무드
            </span>
            <StarDoodle size={16} color={ROSE}/>
          </div>
          <div style={{ fontSize:9, color:"#A89870", fontFamily:"var(--font-en)", fontStyle:"italic", letterSpacing:"0.09em", lineHeight:1.7 }}>
            temporary<br/>emotional<br/>release<br/>space
          </div>
        </div>

        {/* 오른쪽: 기록장 */}
        <div style={{ display:"flex", alignItems:"center", gap:10, marginTop:4 }}>
          {count > 0 && (
            <motion.div initial={{scale:0}} animate={{scale:1}}
              style={{
                background:"#F0E8D4", border:"1px solid #C8B898", borderRadius:2,
                padding:"2px 8px", fontSize:9, color:"#7A6858", fontFamily:"monospace",
              }}>
              ×{count} 파쇄
            </motion.div>
          )}
          <Link href="/archive" style={{
            fontSize:13, color:"#7A7260",
            fontFamily:"var(--font-serif)", display:"flex", alignItems:"center", gap:4,
          }}>
            <span style={{fontSize:14}}>📖</span> 기록장
          </Link>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════ */}
      {/* ══ 스크랩북 콜라주 존 — 기계 + 주변 노트들 ═════════ */}
      {/* ══════════════════════════════════════════════════════ */}
      <div style={{
        position:"relative",
        margin:"10px 0 0",
        paddingBottom:0,
        minHeight:580,
      }}>
        {/* ── 상단 큰 헤드라인 노트 ── */}
        <Note rot={-1.5} bg="#F5EFE0" pin
          style={{ left:"12%", top:0, width:"72%", padding:"22px 18px 20px", zIndex:12, textAlign:"center" }}>
          <p style={{
            fontSize:28, fontFamily:"var(--font-serif)", color:INK,
            lineHeight:1.5, letterSpacing:"0.01em", fontWeight:700,
          }}>
            오늘 감정은<br/>
            <span style={{
              borderBottom:`3.5px solid ${ROSE}`,
              paddingBottom:2,
            }}>
              여기 넣어 둘게.
            </span>
          </p>
          {/* 별 낙서 우측 상단 */}
          <svg width="16" height="16" viewBox="0 0 16 16" style={{ position:"absolute", top:8, right:10 }}>
            <line x1="8" y1="1" x2="8" y2="15" stroke={INK} strokeWidth="1" opacity="0.35"/>
            <line x1="1" y1="8" x2="15" y2="8" stroke={INK} strokeWidth="1" opacity="0.35"/>
            <line x1="3" y1="3" x2="13" y2="13" stroke={INK} strokeWidth="1" opacity="0.25"/>
            <line x1="13" y1="3" x2="3" y2="13" stroke={INK} strokeWidth="1" opacity="0.25"/>
          </svg>
        </Note>

        {/* ── 왼쪽 노트: "다 버리진 못해도" ── */}
        <Note rot={-7} bg="#F5EFE0" tape
          style={{ left:"2%", top:90, width:130, padding:"12px 12px 16px", zIndex:8 }}>
          <p style={{ fontSize:14, fontFamily:"var(--font-serif)", color:INK, lineHeight:1.7 }}>
            다 버리진 못해도,
          </p>
          <p style={{ fontSize:14, fontFamily:"var(--font-serif)", color:INK, lineHeight:1.7 }}>
            <span style={{
              background:"none",
              border:`1.5px solid ${ROSE}`,
              borderRadius:999,
              padding:"0 5px",
              color:ROSE,
              fontSize:13,
            }}>잠깐은</span>
          </p>
          <p style={{ fontSize:14, fontFamily:"var(--font-serif)", color:INK, lineHeight:1.7 }}>
            여기 두고<br/>가도 돼.
          </p>
          <div style={{ fontSize:18, marginTop:6 }}>♥</div>
        </Note>

        {/* ── 오른쪽 노트: 사용설명서 ── */}
        <Note rot={5} bg="#F0E4D8" tape tapeColor="rgba(200,176,140,0.5)"
          style={{ right:"2%", top:80, width:142, padding:"12px 12px 14px", zIndex:8 }}>
          <p style={{ fontSize:13, fontFamily:"var(--font-serif)", color:INK, fontWeight:700, marginBottom:6 }}>
            사용설명서 (?)
          </p>
          <div style={{ fontSize:11.5, color:"#5A5040", fontFamily:"var(--font-sans)", fontWeight:300, lineHeight:1.85 }}>
            <div>1. 마음이 무거울 때</div>
            <div>2. 감정을 적는다</div>
            <div>3. 넣는다</div>
            <div>4. 조금 가벼워진다(?)</div>
          </div>
          <div style={{ textAlign:"right", marginTop:6, fontSize:18 }}>☺</div>
        </Note>

        {/* ── 소리효과: 지잉... (왼쪽) ── */}
        <motion.div
          animate={{ x:[-1,1,-0.5,0.5,0], opacity:[0.5,0.8,0.5] }}
          transition={{ duration:2.8, repeat:Infinity, ease:"easeInOut" }}
          style={{
            position:"absolute", left:"3%", top:258, zIndex:6,
            display:"flex", alignItems:"center", gap:4,
          }}>
          <div>
            <p style={{ fontSize:16, fontFamily:"var(--font-serif)", color:"#8A8070", letterSpacing:"0.04em" }}>지잉..</p>
            <p style={{ fontSize:14, fontFamily:"var(--font-serif)", color:"#A0987C", letterSpacing:"0.04em" }}>지잉...</p>
          </div>
          <Lightning size={20}/>
        </motion.div>

        {/* 부웅~ 말풍선 */}
        <div style={{
          position:"absolute", left:"5%", top:325, zIndex:6,
          background:"#F5EFE0", border:`1px solid ${ROSE}40`,
          borderRadius:12, padding:"3px 10px",
        }}>
          <span style={{ fontSize:12, fontFamily:"var(--font-serif)", color:ROSE }}>부웅~</span>
        </div>

        {/* ── 소리효과: 사각사각 (오른쪽) ── */}
        <div style={{ position:"absolute", right:"3%", top:255, zIndex:6, textAlign:"right" }}>
          <p style={{ fontSize:18, fontFamily:"var(--font-serif)", color:"#8A8070", letterSpacing:"0.06em", marginBottom:2 }}>
            사각
          </p>
          <p style={{ fontSize:16, fontFamily:"var(--font-serif)", color:"#A0987C", letterSpacing:"0.06em" }}>
            사각~
          </p>
          <WavyLine style={{ marginLeft:"auto", marginTop:4 }}/>
        </div>

        {/* ── 기계 중앙 ── */}
        <div style={{
          display:"flex", justifyContent:"center",
          paddingTop:88, position:"relative", zIndex:10,
        }}>
          {STICKERS.map(s=>(
            <EmotionSticker key={s.text} config={s} trashRef={trashRef} onDrop={handleDrop}/>
          ))}
          <div ref={trashRef} style={{ position:"relative", zIndex:30, width:"100%", maxWidth:480 }}>
            <TrashCan state={state} fullWidth/>
            <Particles active={particles}/>

            {/* ── 과몰입 처리중 오버레이 ── */}
            <AnimatePresence>
              {phase === "processing" && (
                <motion.div
                  key="processing"
                  initial={{ opacity:0, scale:0.88, y:8 }}
                  animate={{ opacity:1, scale:1, y:0 }}
                  exit={{ opacity:0, scale:0.92, y:-6 }}
                  transition={{ duration:0.25, ease:"easeOut" }}
                  style={{
                    position:"absolute",
                    top:"42%", left:"50%",
                    transform:"translate(-50%,-50%)",
                    zIndex:50, pointerEvents:"none",
                  }}
                >
                  <div style={{
                    background:"rgba(26,22,18,0.92)",
                    border:`1.5px solid ${ROSE}`,
                    borderRadius:4,
                    padding:"10px 20px",
                    textAlign:"center",
                    boxShadow:`0 0 24px ${ROSE}55`,
                  }}>
                    <motion.p
                      animate={{ opacity:[0.6,1,0.6] }}
                      transition={{ duration:0.5, repeat:Infinity }}
                      style={{
                        fontSize:12,
                        fontFamily:"'Courier New', monospace",
                        color:ROSE, letterSpacing:"0.12em",
                        marginBottom:4,
                      }}
                    >
                      ■ PROCESSING
                    </motion.p>
                    <p style={{
                      fontSize:15,
                      fontFamily:"var(--font-serif)",
                      color:"#F5EFE0",
                      letterSpacing:"0.02em",
                    }}>
                      {currentLabel} 과몰입 처리중...
                    </p>
                    <p style={{ fontSize:10, color:"#888068", fontFamily:"monospace", marginTop:4 }}>
                      overthinking overloaded
                    </p>
                  </div>
                </motion.div>
              )}

              {phase === "done" && (
                <motion.div
                  key="done"
                  initial={{ opacity:0, scale:0.85, rotate:-2 }}
                  animate={{ opacity:1, scale:1, rotate:-1 }}
                  exit={{ opacity:0, scale:0.94, y:-10 }}
                  transition={{ duration:0.3, ease:[0.34,1.56,0.64,1] }}
                  style={{
                    position:"absolute",
                    top:"42%", left:"50%",
                    transform:"translate(-50%,-50%) rotate(-1deg)",
                    zIndex:50, pointerEvents:"none",
                  }}
                >
                  <div style={{
                    background:"#F5EFE0",
                    border:`2px solid ${INK}`,
                    borderRadius:3,
                    padding:"14px 22px",
                    textAlign:"center",
                    boxShadow:"4px 4px 0 rgba(42,37,32,0.85)",
                  }}>
                    <p style={{
                      fontSize:11, fontFamily:"monospace",
                      color:ROSE, letterSpacing:"0.1em", marginBottom:6,
                    }}>
                      ✓ COMPLETE
                    </p>
                    <p style={{
                      fontSize:18,
                      fontFamily:"var(--font-serif)",
                      color:INK, fontWeight:700,
                      lineHeight:1.4,
                    }}>
                      오늘 마음<br/>조금 정리 완료.
                    </p>
                    <p style={{ fontSize:10, color:"#8A8270", fontFamily:"var(--font-serif)", marginTop:6 }}>
                      다 해결된 건 아니어도.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── 기계 상태 표시줄 ── */}
        <motion.div
          animate={{ opacity: phase ? 1 : 0.55 }}
          style={{
            textAlign:"center", margin:"6px 0 0",
            fontFamily:"'Courier New', monospace",
            fontSize:10,
            color: phase === "processing" ? ROSE : phase === "done" ? "#6A9870" : "#8A8270",
            letterSpacing:"0.08em",
            transition:"color 0.3s",
          }}
        >
          {phase === "processing"
            ? "■ ■ ■ 파쇄 진행 중... ■ ■ ■"
            : phase === "done"
            ? "● 파쇄 완료. 감정 −1."
            : `대기 중... (총 ${count}개 파쇄됨)`
          }
        </motion.div>

        {/* ── "마음속 잡음 제거 중" (하단 좌) ── */}
        <Note rot={-5} bg="#EDE5D0" tape={false}
          style={{ left:"2%", bottom:10, width:118, padding:"10px 12px 12px", zIndex:8 }}>
          <p style={{ fontSize:13, fontFamily:"var(--font-serif)", color:INK, lineHeight:1.75 }}>
            마음속<br/>잡음 제거 중.
          </p>
          <ScribbleCircle size={44} style={{ marginTop:4 }}/>
        </Note>

        {/* ── "오늘 하루치 감정" (하단 우) ── */}
        <Note rot={4} bg="#EDE8D8" tape={false} clip
          style={{ right:"2%", bottom:8, width:132, padding:"10px 12px 12px", zIndex:8 }}>
          <p style={{ fontSize:12.5, fontFamily:"var(--font-serif)", color:INK, lineHeight:1.85 }}>
            오늘 하루치 감정
          </p>
          <p style={{ fontSize:13, fontFamily:"var(--font-serif)", color:ROSE, fontWeight:700 }}>
            조용히 파쇄 중.
          </p>
          <StarDoodle size={16} color={ROSE} style={{ marginTop:6 }}/>
        </Note>
      </div>

      {/* ══ CTA 버튼 ══ */}
      <motion.div
        initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}
        transition={{ delay:0.4 }}
        style={{ padding:"4px 18px 0", position:"relative", zIndex:15 }}
      >
        <Link href="/release" style={{
          display:"flex", alignItems:"center", justifyContent:"space-between",
          width:"100%", height:58,
          background:ROSE,
          borderRadius:8,
          padding:"0 24px",
          fontSize:18, fontFamily:"var(--font-serif)", color:"#FDFAF5",
          letterSpacing:"0.03em", fontWeight:700,
          boxShadow:`0 5px 22px ${ROSE}60, 0 2px 8px rgba(42,37,32,0.12)`,
        }}>
          <span>마음 비우러 가기</span>
          <span style={{ fontSize:20 }}>→</span>
        </Link>
      </motion.div>

      {/* 서브 캡션 */}
      <p style={{
        textAlign:"center", fontSize:12.5, color:"#8A8070",
        fontFamily:"var(--font-serif)", letterSpacing:"0.02em",
        padding:"8px 18px 0",
      }}>
        괜찮아질 때까지 잠깐 여기. ♡
      </p>

      {/* ══ 감정 칩 섹션 ══ */}
      <div style={{ padding:"14px 18px 0", position:"relative", zIndex:10 }}>
        {/* "지금 이 감정이야." - 감정 원으로 강조 */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:4, marginBottom:12 }}>
          <span style={{ fontSize:14, fontFamily:"var(--font-sans)", fontWeight:300, color:"#8A8070", letterSpacing:"0.03em" }}>
            지금 이{" "}
          </span>
          <span style={{
            fontSize:14, fontFamily:"var(--font-serif)", color:ROSE, fontWeight:700,
            border:`2px solid ${ROSE}`, borderRadius:999,
            padding:"0 7px", lineHeight:1.6,
          }}>
            감정
          </span>
          <span style={{ fontSize:14, fontFamily:"var(--font-sans)", fontWeight:300, color:"#8A8070", letterSpacing:"0.03em" }}>
            이야.
          </span>
        </div>

        {/* 감정 탭 — 찢어진 종이 스타일 */}
        <div style={{ display:"flex", flexWrap:"wrap", gap:8, justifyContent:"center" }}>
          {[
            {l:"지쳤어",  bg:"#F0E0DC", r:-3, tc:"#B87878"},
            {l:"서운해",  bg:"#D8E4EE", r: 2, tc:"#6888A8"},
            {l:"억울해",  bg:"#E4DCED", r:-4, tc:"#8878B0"},
            {l:"허무해",  bg:"#D8E8DC", r: 3, tc:"#6898A0"},
            {l:"외로워",  bg:"#F5EBCC", r:-2, tc:"#A09848"},
            {l:"모르겠어",bg:"#EDE4D4", r: 4, tc:"#8A8070"},
          ].map(em=>(
            <motion.button key={em.l}
              whileTap={{scale:0.9, rotate:0}}
              onClick={()=>quickDump(em.l)}
              style={{
                background:em.bg, border:"none",
                padding:"9px 17px 11px",
                fontSize:14, fontFamily:"var(--font-serif)", color:em.tc,
                cursor:"pointer", borderRadius:2,
                boxShadow:"2px 3px 10px rgba(42,37,32,0.13)",
                transform:`rotate(${em.r}deg)`,
                position:"relative", overflow:"hidden",
                fontWeight:700,
              }}
            >
              {/* 접힌 귀퉁이 */}
              <div style={{
                position:"absolute", bottom:0, right:0, width:0, height:0,
                borderStyle:"solid", borderWidth:"0 0 11px 11px",
                borderColor:`transparent transparent rgba(42,37,32,0.08) transparent`,
              }}/>
              {em.l}
            </motion.button>
          ))}
        </div>
      </div>

      {/* ══ TODAY MOOD + 수고했어 ══ */}
      <div style={{
        display:"flex", justifyContent:"space-between", alignItems:"center",
        padding:"14px 18px 8px",
      }}>
        {/* 바코드 스티커 */}
        <div style={{
          background:"#F0E8D4", border:"1px solid #C8B898", borderRadius:2,
          padding:"6px 10px", transform:"rotate(-2deg)",
          boxShadow:"1px 2px 8px rgba(42,37,32,0.1)",
          position:"relative",
        }}>
          <Paperclip color="#C8A878" style={{ position:"absolute", top:-12, left:4 }}/>
          <p style={{ fontSize:8, fontFamily:"monospace", color:"#7A6858", letterSpacing:"0.1em", fontWeight:700 }}>TODAY MOOD</p>
          <p style={{ fontSize:7, fontFamily:"monospace", color:"#A89880", marginBottom:4 }}>
            No. {new Date().toISOString().slice(0,10).replace(/-/g,"")}
          </p>
          <div style={{ display:"flex", gap:1.2 }}>
            {Array.from({length:15}).map((_,i)=>(
              <div key={i} style={{
                width:i%3===0?2:1, height:i%4===0?18:13,
                background:"#3A3428", opacity:0.55+Math.random()*0.3,
              }}/>
            ))}
          </div>
        </div>

        {/* 오늘도 수고했어 */}
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
          <span style={{ fontSize:26 }}>🤖</span>
          <div style={{
            background:"#F5EFE0", border:"1px solid #C8B898", borderRadius:10,
            padding:"4px 10px",
            fontSize:11.5, fontFamily:"var(--font-serif)", color:"#7A7260",
            boxShadow:"1px 2px 6px rgba(42,37,32,0.08)",
            transform:"rotate(1.5deg)",
          }}>
            오늘도 수고했어! ♡
          </div>
        </div>
      </div>

      <FeedbackToast message={toast}/>
    </div>
  );
}
