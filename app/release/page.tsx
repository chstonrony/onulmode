"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence, useAnimate } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { buildResultUrl } from "@/lib/resultCard";

type Mode = "chew" | "grind" | "burn" | "press";
type Phase = "write" | "animating" | "done";

const ROSE = "#C8607A";
const INK  = "#1A1410";

const MODES: { id: Mode; label: string; sub: string; bg: string; rot: number }[] = [
  { id: "chew",  label: "우걱 먹이기",     sub: "바람에 날리기",    bg: "#F0E0DC", rot: -5 },
  { id: "grind", label: "빠각 돌리기",     sub: "조용히 사라지기",  bg: "#D8E8DC", rot:  4 },
  { id: "burn",  label: "질겅 처리하기",   sub: "물에 녹여버리기",  bg: "#F0DDD0", rot: -3 },
  { id: "press", label: "감정 갈갈 모드",  sub: "깊이 내려쳐두기",  bg: "#E4DCED", rot:  5 },
];

const RESULTS = [
  { big: "빠각 완료.",     sub: "우걱이가 다 씹어먹었음." },
  { big: "갈렸음.",        sub: "생각보다 빨리 처리됨." },
  { big: "처리 완료.",     sub: "오래 묵혔던 거 맞지?" },
  { big: "삭혀버렸음.",    sub: "찌꺼기 좀 남았는데 아무튼 완료." },
  { big: "우걱우걱 완료.", sub: "이빨에 좀 꼈는데 억지로 처리함." },
];

/* ── 이빨 SVG ── */
function UgegiTeeth() {
  return (
    <svg viewBox="0 0 400 72" preserveAspectRatio="none"
      style={{ width: "100%", display: "block", marginBottom: -2 }}>
      <rect width="400" height="72" fill="#efe3cf" />
      <rect y="0" width="400" height="22" fill={INK} />
      {[
        [0,22,18,72,10,52,36,22],[36,22,56,72,48,48,72,22],
        [72,22,88,68,82,44,100,22],[100,22,122,72,112,50,134,22],
        [134,22,150,65,144,42,164,22],[164,22,186,72,177,52,200,22],
        [200,22,218,68,210,46,230,22],[230,22,252,72,242,50,264,22],
        [264,22,280,65,274,43,295,22],[295,22,318,72,308,52,330,22],
        [330,22,348,68,341,45,362,22],[362,22,382,72,374,50,400,22],
      ].map(([x1,y1,x2,y2,x3,y3,x4,y4],i) => (
        <polygon key={i} points={`${x1},${y1} ${x2},${y2} ${x3},${y3} ${x4},${y4}`} fill="#FAF8F2" />
      ))}
    </svg>
  );
}

/* ── 우걱이 눈 ── */
function UgegiEyes({ active }: { active: boolean }) {
  const [pupilX, setPupilX] = useState(0);
  const [pupilY, setPupilY] = useState(0);
  const [blink, setBlink]   = useState(false);
  const [angry, setAngry]   = useState(false);

  useEffect(() => {
    // 시선 이동
    const m = setInterval(() => {
      setPupilX((Math.random() - 0.5) * 14);
      setPupilY((Math.random() - 0.5) * 8);
    }, 1600 + Math.random() * 800);

    // 깜빡임 (scaleY — 레이아웃 영향 없음)
    const b = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 120);
    }, 2800 + Math.random() * 1400);

    // 가끔 찡그림
    const a = setInterval(() => {
      setAngry(true);
      setTimeout(() => setAngry(false), 900);
    }, 6000 + Math.random() * 4000);

    return () => { clearInterval(m); clearInterval(b); clearInterval(a); };
  }, []);

  return (
    <div style={{ display:"flex", gap:36, justifyContent:"center", alignItems:"center", height:100, position:"relative", zIndex:5 }}>
      {[0, 1].map(i => (
        <div key={i} style={{ position:"relative", width:72, height:72, flexShrink:0 }}>

          {/* 눈알 (흰자) */}
          <div style={{
            width:72, height:72, borderRadius:"50%",
            background:"#FAF8F2",
            border:`4px solid ${INK}`,
            position:"relative", overflow:"hidden",
            boxShadow: active
              ? `0 0 22px ${ROSE}BB, 0 4px 14px rgba(0,0,0,0.5)`
              : `0 4px 14px rgba(0,0,0,0.45)`,
          }}>
            {/* 동공 */}
            <motion.div
              animate={{ x: pupilX + (i === 0 ? -1 : 1), y: pupilY }}
              transition={{ duration:0.9, ease:"easeOut" }}
              style={{
                position:"absolute",
                top:"50%", left:"50%",
                width:36, height:36,
                borderRadius:"50%",
                background: active ? ROSE : INK,
                transform:"translate(-50%, -50%)",
                transition:"background 0.3s",
              }}
            >
              {/* 하이라이트 */}
              <div style={{ position:"absolute", top:6, left:7, width:11, height:11, borderRadius:"50%", background:"white", opacity:0.92 }} />
              <div style={{ position:"absolute", top:13, right:5, width:5, height:5, borderRadius:"50%", background:"white", opacity:0.5 }} />
            </motion.div>

            {/* 깜빡임 — scaleY로 위에서 내려오는 눈꺼풀 */}
            <motion.div
              animate={{ scaleY: blink ? 1 : 0 }}
              transition={{ duration:0.06 }}
              style={{
                position:"absolute", top:0, left:0, right:0, bottom:0,
                background: INK,
                transformOrigin:"top center",
                borderRadius:"50%",
              }}
            />

            {/* 찡그림 — 사선 눈꺼풀 */}
            {angry && (
              <div style={{
                position:"absolute",
                top:-4, left: i===0?-4:8,
                width:40, height:18,
                background: INK,
                transform:`rotate(${i===0?18:-18}deg)`,
                transformOrigin:"center",
                borderRadius:4,
              }} />
            )}
          </div>

          {/* 눈 밑 다크서클 (지쳐 보임) */}
          <div style={{
            position:"absolute", bottom:-5, left:"50%", transform:"translateX(-50%)",
            width:50, height:8, borderRadius:"50%",
            background: INK, opacity:0.18,
          }} />
        </div>
      ))}
    </div>
  );
}

function ReleaseContent() {
  const params = useSearchParams();
  const router = useRouter();
  const [text, setText]     = useState(params.get("text") ?? "");
  const [mode, setMode]     = useState<Mode | null>(null);
  const [phase, setPhase]   = useState<Phase>("write");
  const [showP, setShowP]   = useState(false);
  const [result]            = useState(() => RESULTS[Math.floor(Math.random() * RESULTS.length)]);
  const [scope, animate]    = useAnimate();

  const canFeed = text.trim().length > 0 && mode !== null;

  function goToResult() {
    const emotion = text.trim().slice(0, 10) || (mode ?? "감정");
    router.push(buildResultUrl([emotion], Date.now() % 999983));
  }

  const handleFeed = async () => {
    if (!canFeed || phase !== "write") return;
    setPhase("animating");
    if (mode === "chew") {
      await animate(scope.current, { y:[0,0,-90], opacity:[1,1,0], scale:[1,1.02,0.5] }, { duration:1.2, ease:"easeIn" });
    } else if (mode === "grind") {
      await animate(scope.current, { opacity:[1,0.5,0], filter:["blur(0px)","blur(4px)","blur(16px)"], scale:[1,0.98,0.9] }, { duration:1.5 });
    } else if (mode === "burn") {
      await animate(scope.current, { filter:["brightness(1) sepia(0)","brightness(1.3) sepia(0.7) hue-rotate(-15deg)","brightness(2) sepia(1) blur(10px)"], scaleY:[1,0.96,0.3], opacity:[1,0.9,0], y:[0,-10,-28] }, { duration:1.4 });
    } else if (mode === "press") {
      await animate(scope.current, { scaleY:[1,1.02,0.07], scaleX:[1,1,1.2], opacity:[1,0.9,0], y:[0,4,8] }, { duration:1.3 });
    }
    setShowP(true);
    setTimeout(()=>setShowP(false), 1600);
    setPhase("done");
  };

  const reset = () => { setPhase("write"); setText(""); setMode(null); };

  return (
    <div style={{ background:"#efe3cf", minHeight:"100vh", paddingBottom:90, position:"relative", overflow:"hidden" }}>

      {/* 배경 워드 */}
      {["우걱우걱","처리중","빠각","오래됨","묵혔음"].map((w,i)=>(
        <div key={i} style={{
          position:"fixed", fontFamily:"monospace", fontSize:[28,18,34,20,24][i],
          color:INK, opacity:0.03, filter:"blur(12px)",
          transform:`rotate(${[-10,7,-5,12,-8][i]}deg)`,
          top:["8%","72%","38%","58%","20%"][i], left:["68%","4%","78%","12%","50%"][i],
          pointerEvents:"none", zIndex:0, userSelect:"none",
        }}>{w}</div>
      ))}

      {/* ── 우걱이 입 영역 ── */}
      <div style={{ position:"relative" }}>
        {/* 검정 잇몸 */}
        <div style={{ background:INK, paddingTop:14, paddingBottom:0 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 18px 10px" }}>
            <div>
              <p style={{ fontSize:8, fontFamily:"monospace", color:"#6A6258", letterSpacing:"0.14em", marginBottom:3 }}>
                UGEGI EMOTIONAL DISPOSAL
              </p>
              <Link href="/" style={{ textDecoration:"none" }}>
                <p style={{ fontSize:16, fontFamily:"var(--font-serif)", color:"#FAF8F2", fontWeight:700, lineHeight:1.2 }}>
                  ← 우걱이 처리소
                </p>
              </Link>
            </div>
            <div style={{ textAlign:"right" }}>
              <p style={{ fontSize:8, fontFamily:"monospace", color:"#6A6258", letterSpacing:"0.1em", marginBottom:3 }}>
                우걱이 오늘 상태
              </p>
              <motion.p
                animate={{ opacity:[1,0.5,1] }} transition={{ duration:1.4, repeat:Infinity }}
                style={{ fontSize:11, fontFamily:"monospace", color:ROSE, letterSpacing:"0.06em", fontWeight:700 }}>
                {phase==="animating" ? "씹는 중 🦷" : "배고픔 MAX ⚡"}
              </motion.p>
            </div>
          </div>
          <UgegiEyes active={phase==="animating"} />
        </div>
        {/* 이빨 */}
        <UgegiTeeth />
      </div>

      {/* ── 본문 ── */}
      <div style={{ padding:"20px 20px 0", position:"relative", zIndex:10 }}>
        <AnimatePresence mode="wait">

          {/* 입력 화면 */}
          {phase !== "done" && (
            <motion.div key="write" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0, y:-8 }}>

              <motion.div initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} style={{ marginBottom:18 }}>
                <h2 style={{ fontSize:22, fontFamily:"var(--font-serif)", color:INK, lineHeight:1.45, marginBottom:5 }}>
                  우걱이한테<br/>먹일 감정 적어줘
                </h2>
                <p style={{ fontSize:11, fontFamily:"monospace", color:"#A89880", letterSpacing:"0.05em" }}>
                  뭘 적든 우걱이가 다 씹어먹음. 걱정 말고 투입해.
                </p>
              </motion.div>

              {/* 투입구 */}
              <div style={{ position:"relative", marginBottom:8 }}>
                {/* 낙서 */}
                <p style={{ fontSize:11, fontFamily:"var(--font-serif)", color:"#A89880", marginBottom:6, transform:"rotate(-1.5deg)", display:"inline-block" }}>
                  오늘 뭐 때문에 꾸역꾸역 버텼음?
                </p>
                {/* 투입구 레이블 */}
                <div style={{
                  position:"absolute", top:28, right:-4, zIndex:3,
                  background:ROSE, color:"#F5EFE0",
                  fontSize:8, fontFamily:"monospace", letterSpacing:"0.1em",
                  padding:"3px 7px", transform:"rotate(90deg)", transformOrigin:"right center", whiteSpace:"nowrap",
                }}>
                  ▼ 감정 투입구
                </div>

                <motion.div ref={scope} style={{
                  background:"#FAF8F2",
                  border:`2px solid ${INK}`,
                  borderRadius:2,
                  boxShadow:`4px 4px 0 ${INK}`,
                  overflow:"hidden", position:"relative",
                }}>
                  {/* 줄 */}
                  <div style={{ position:"absolute", inset:0, pointerEvents:"none",
                    backgroundImage:"repeating-linear-gradient(transparent,transparent 27px,rgba(180,170,150,0.18) 27px,rgba(180,170,150,0.18) 28px)",
                    backgroundPosition:"0 40px" }} />
                  {/* 여백선 */}
                  <div style={{ position:"absolute", left:40, top:0, bottom:0, width:1, background:"rgba(220,160,140,0.25)", pointerEvents:"none" }} />

                  <textarea
                    value={text}
                    onChange={e=>setText(e.target.value)}
                    placeholder={"여기에 감정 투입…\n안 적어도 됨. 근데 적으면 더 잘 씹힘."}
                    rows={8}
                    style={{
                      background:"transparent", border:"none", outline:"none", resize:"none",
                      padding:"16px 16px 14px 52px",
                      fontSize:15, lineHeight:"28px", color:INK,
                      fontFamily:"var(--font-serif)", width:"100%",
                      position:"relative", zIndex:1, letterSpacing:"0.01em",
                    }}
                  />

                  {text.length > 80 && (
                    <div style={{ position:"absolute", bottom:6, right:8, fontSize:9, fontFamily:"monospace", color:ROSE, letterSpacing:"0.06em" }}>
                      우걱이: 많다… 힘들어짐
                    </div>
                  )}
                  {!text && (
                    <div style={{ position:"absolute", bottom:8, left:52, fontSize:9, fontFamily:"monospace", color:"#C8BEB0", letterSpacing:"0.05em" }}>
                      우걱이 입 벌리고 기다리는 중…
                    </div>
                  )}
                </motion.div>

                {text.length > 0 && (
                  <p style={{ fontSize:9, fontFamily:"monospace", color:"#B4A890", textAlign:"right", marginTop:4 }}>
                    {text.length}자 — {text.length>50?"우걱이 힘들 수도":"씹을 수 있음"}
                  </p>
                )}
              </div>

              {/* 처리 방식 */}
              <p style={{ fontSize:9, fontFamily:"monospace", color:"#A89880", letterSpacing:"0.12em", marginBottom:10, marginTop:8 }}>
                ▶ 처리 방식 선택
              </p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:10, justifyContent:"center", marginBottom:18 }}>
                {MODES.map(m=>{
                  const active = mode===m.id;
                  return (
                    <motion.button key={m.id} whileTap={{ scale:0.92 }} onClick={()=>setMode(m.id)}
                      style={{
                        background: active?m.bg:"#FAF8F2",
                        border: active?`2px solid ${INK}`:"1.5px solid #C8BEB0",
                        borderRadius:2, padding:"11px 14px", cursor:"pointer", textAlign:"left",
                        boxShadow: active?`3px 3px 0 ${INK}`:"1px 2px 8px rgba(44,40,37,0.08)",
                        transform:`translate(0,0) rotate(${active?0:m.rot}deg)`,
                        transition:"all 0.18s ease", minWidth:130, position:"relative",
                      }}>
                      {active && (
                        <div style={{ position:"absolute", top:-8, right:6, background:ROSE, color:"#F5EFE0", fontSize:8, fontFamily:"monospace", padding:"1px 5px", borderRadius:2, letterSpacing:"0.08em" }}>
                          선택됨
                        </div>
                      )}
                      <p style={{ fontSize:13, fontFamily:"var(--font-serif)", color:INK, fontWeight:active?700:400, marginBottom:3 }}>{m.label}</p>
                      <p style={{ fontSize:10, fontFamily:"monospace", color:"#A89880", letterSpacing:"0.04em" }}>{m.sub}</p>
                    </motion.button>
                  );
                })}
              </div>

              {/* 던지기 버튼 */}
              <motion.button
                whileHover={canFeed?{ rotate:[-0.5,0.5,-0.5,0], x:[0,2,-2,0] }:{}}
                transition={{ duration:0.4 }}
                whileTap={canFeed?{ scale:0.96 }:{}}
                onClick={handleFeed} disabled={!canFeed||phase==="animating"}
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
                {phase==="animating" ? "우걱이 씹는 중…" : canFeed ? "우걱이한테 던지기 →" : "감정 써줘 + 방식 골라줘"}
              </motion.button>

              <div style={{ display:"flex", gap:8 }}>
                <Link href="/" style={{
                  flex:1, height:44, background:INK, border:`2px solid ${INK}`, borderRadius:2,
                  fontSize:13, fontFamily:"var(--font-serif)", fontWeight:700, color:"#FAF8F2",
                  display:"flex", alignItems:"center", justifyContent:"center", textDecoration:"none",
                  boxShadow:`3px 3px 0 #6A6258`,
                }}>
                  하나 더 먹여줄게 ♥
                </Link>
                <Link href="/archive" style={{
                  flex:1, height:44, background:"#FAF8F2", border:"1.5px solid #C8BEB0", borderRadius:2,
                  fontSize:12, fontFamily:"var(--font-serif)", color:"#7A7260",
                  display:"flex", alignItems:"center", justifyContent:"center", textDecoration:"none",
                }}>
                  파쇄함 보기
                </Link>
              </div>
            </motion.div>
          )}

          {/* 완료 화면 */}
          {phase === "done" && (
            <motion.div key="done"
              initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:0.55 }}
              style={{ display:"flex", flexDirection:"column", alignItems:"center", paddingTop:28 }}>

              <motion.div
                animate={{ rotate:[-0.6,0.4,-0.6] }} transition={{ duration:5, repeat:Infinity }}
                style={{ position:"relative", width:"100%", marginBottom:22 }}>
                <div style={{
                  background:"#FAF8F2", border:`2.5px solid ${INK}`, borderRadius:2,
                  boxShadow:`5px 5px 0 ${INK}`, padding:"28px 22px 24px", textAlign:"center",
                  position:"relative", overflow:"hidden",
                }}>
                  {/* PROCESSED 도장 */}
                  <div style={{
                    position:"absolute", top:10, right:12, fontSize:8, fontFamily:"monospace",
                    color:ROSE, border:`1.5px solid ${ROSE}`, padding:"2px 6px",
                    transform:"rotate(8deg)", opacity:0.85, borderRadius:2, letterSpacing:"0.1em",
                  }}>PROCESSED</div>
                  <div style={{ position:"absolute", inset:0, pointerEvents:"none",
                    backgroundImage:"repeating-linear-gradient(transparent,transparent 28px,rgba(180,170,150,0.12) 28px,rgba(180,170,150,0.12) 29px)",
                    backgroundPosition:"0 40px" }} />
                  <motion.p initial={{ opacity:0, scale:0.85 }} animate={{ opacity:1, scale:1 }}
                    transition={{ delay:0.2, type:"spring", stiffness:200 }}
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

              <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.6 }}
                style={{ display:"flex", flexDirection:"column", gap:10, width:"100%" }}>
                <button onClick={goToResult} style={{
                  height:52, background:ROSE, border:`2px solid ${INK}`, borderRadius:2,
                  fontSize:15, fontFamily:"var(--font-serif)", color:"#F5EFE0", fontWeight:700,
                  cursor:"pointer", boxShadow:`4px 4px 0 #8A3050`, letterSpacing:"0.02em",
                }}>
                  빠각 결과지 받기 →
                </button>
                <button onClick={reset} style={{
                  height:46, background:INK, border:`2px solid ${INK}`, borderRadius:2,
                  fontSize:13, fontFamily:"var(--font-serif)", color:"#FAF8F2",
                  cursor:"pointer", fontWeight:700, boxShadow:`3px 3px 0 #6A6258`,
                }}>
                  하나 더 먹여줄게
                </button>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                  {[{href:"/archive",label:"파쇄함 보기"},{href:"/",label:"홈으로"}].map(b=>(
                    <Link key={b.href} href={b.href} style={{
                      height:42, background:"#FAF8F2", border:"1.5px solid #C8BEB0", borderRadius:2,
                      fontSize:12, fontFamily:"var(--font-serif)", color:"#5A5248",
                      display:"flex", alignItems:"center", justifyContent:"center", textDecoration:"none",
                    }}>{b.label}</Link>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
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
