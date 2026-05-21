import type { Metadata } from "next";
import Link from "next/link";
import { getLocale } from "@/lib/getLocale";

export const metadata: Metadata = {
  title: "About Ugogi | OnulMood",
  description: "OnulMood is a service that processes emotions in a strange way. Ugogi is waiting.",
};

const INK   = "#2A2520";
const ROSE  = "#C8607A";
const BG    = "#efe3cf";
const PAPER = "#F5EFE0";
const LINE  = "#D8CEC0";
const MUTED = "#A89880";

/* ── 다국어 콘텐츠 ── */
const CONTENT = {
  ko: {
    back: "← 오늘무드",
    badge: "UGOGI EMOTIONAL DISPOSAL CO. — MANUAL v0.0.3",
    title: "우걱이 사용설명서",
    subtitle: "temporary emotional release machine manual",
    warning: "우걱이는 오늘도 감정을 먹고 있습니다.",
    warningSub: "정확히 왜 먹는지는 아직 밝혀지지 않았습니다.",
    docId: "DOC-EMO-2026-0518 · 감정 처리 장치 공식 안내서",
    s1Title: "우걱이는 무엇인가요?",
    s1Body: "우걱이는 감정을 처리하기 위해 만들어진 임시 감정 파쇄 장치입니다.",
    s1Sub: "언제부터 존재했는지는 알 수 없지만,\n새벽 2시 이후 활동량이 급격히 증가하며,\n특히 \"괜찮은 척한 감정\"을 잘 먹는 것으로 알려져 있습니다.",
    s1ListTitle: "현재까지 확인된 먹이",
    s1List: ["서운함", "애매한 후회", "답장 없는 카톡", "혼자 삭힌 감정", "이유 없이 울컥한 밤", "사회생활 가능한 척"],
    s1Note: "※ 우걱이는 완벽한 해결을 제공하지 않습니다.\n다만 잠시 숨 쉴 공간 정도는 만들어줍니다.",
    s2Title: "감정은 왜 파쇄하나요?",
    s2Body: "사람들은 종종 감정을 처리하지 못한 채\n마음 구석에 임시 저장해둡니다.",
    s2Sub: "우걱이는 그 감정들을 잠시 대신 씹어주기 위해 존재합니다.",
    s2Sub2: "파쇄된 감정은 대부분 복구되지 않으며,\n일부 감정은 이상한 모양으로 변형되어 돌아올 수 있습니다.",
    s2Quote: "\"하지만 이상하게도,\n조금은 가벼워졌다는 후기가 계속 발견되고 있습니다.\"",
    s3Title: "파쇄 과정 안내",
    s3Steps: ["감정을 꺼냅니다.", "괜찮은 척을 멈춥니다.", "우걱이에게 감정을 던집니다.", "이상한 소리가 납니다.", "조금 멍해집니다.", "가끔은 웃깁니다."],
    s3Note: "※ 개인차가 존재합니다.",
    s4Title: "주의사항",
    s4List: [
      "우걱이는 새벽 시간대에 과하게 활성화될 수 있습니다.",
      "감정을 너무 오래 참은 경우 파쇄 시간이 증가할 수 있습니다.",
      "\"아무렇지 않다\"를 반복 입력할 경우 기계가 조용히 째려볼 수 있습니다.",
      "우걱이는 감정을 먹지만 인생까지 해결하진 못합니다.",
      "그러나 이상하게 다시 들어오게 된다는 보고가 많습니다.",
    ],
    s5Title: "오늘무드 소개",
    s5Body: "오늘무드는 감정을 완벽하게 해결하기보다,\n잠시 내려놓을 수 있는 공간을 만들기 위해 시작되었습니다.",
    s5Quote: "웃기려고 만들었는데,\n가끔은 위로가 되었고,\n가볍게 만들었는데,\n생각보다 진심이 남았습니다.",
    s5End: "오늘의 감정을 너무 오래 들고 있지 마세요.",
    cta: "감정 버리러 가기 →",
    footer: "© 2026 오늘무드. All rights reserved.",
  },
  en: {
    back: "← OnulMood",
    badge: "UGOGI EMOTIONAL DISPOSAL CO. — MANUAL v0.0.3",
    title: "Ugogi User Manual",
    subtitle: "temporary emotional release machine manual",
    warning: "Ugogi is eating emotions again today.",
    warningSub: "Exactly why it eats them has not yet been determined.",
    docId: "DOC-EMO-2026-0518 · Official Emotional Disposal Device Guide",
    s1Title: "What is Ugogi?",
    s1Body: "Ugogi is a temporary emotional shredding device created to process emotions.",
    s1Sub: "No one knows when it first appeared,\nbut its activity surges after 2 AM,\nespecially known to devour \"emotions pretending to be okay.\"",
    s1ListTitle: "Confirmed prey so far",
    s1List: ["Hurt feelings", "Vague regrets", "Unanswered texts", "Emotions suppressed alone", "Nights of unexpected tears", "Pretending to function socially"],
    s1Note: "※ Ugogi does not provide perfect solutions.\nBut it does create a little breathing room.",
    s2Title: "Why shred emotions?",
    s2Body: "People often leave emotions temporarily stored\nin a corner of their heart without processing them.",
    s2Sub: "Ugogi exists to chew on those emotions for a while.",
    s2Sub2: "Most shredded emotions cannot be recovered,\nand some may return in a strange form.",
    s2Quote: "\"Strangely though,\nreports of feeling slightly lighter keep coming in.\"",
    s3Title: "Shredding Process Guide",
    s3Steps: ["Take out the emotion.", "Stop pretending you're okay.", "Throw the emotion at Ugogi.", "A strange sound occurs.", "You feel a little blank.", "Sometimes it's funny."],
    s3Note: "※ Individual results may vary.",
    s4Title: "Warnings",
    s4List: [
      "Ugogi may become overly active during late-night hours.",
      "If emotions have been suppressed too long, processing time may increase.",
      "Repeatedly inputting \"I'm fine\" may cause the machine to silently stare at you.",
      "Ugogi eats emotions but cannot solve your entire life.",
      "However, many reports indicate users strangely return.",
    ],
    s5Title: "About OnulMood",
    s5Body: "OnulMood was started not to perfectly resolve emotions,\nbut to create a space where you can set them down for a moment.",
    s5Quote: "I made it to be funny,\nbut it sometimes became comforting.\nI made it light,\nbut more sincerity remained than expected.",
    s5End: "Don't hold today's emotions for too long.",
    cta: "Dump emotions now →",
    footer: "© 2026 OnulMood. All rights reserved.",
  },
  ja: {
    back: "← オヌルムード",
    badge: "UGOGI EMOTIONAL DISPOSAL CO. — MANUAL v0.0.3",
    title: "ウゴギ取扱説明書",
    subtitle: "temporary emotional release machine manual",
    warning: "ウゴギは今日も感情を食べています。",
    warningSub: "なぜ食べるのかは、まだ解明されていません。",
    docId: "DOC-EMO-2026-0518 · 感情処理装置 公式ガイド",
    s1Title: "ウゴギとは何ですか？",
    s1Body: "ウゴギは感情を処理するために作られた仮の感情粉砕装置です。",
    s1Sub: "いつから存在しているかは不明ですが、\n深夜2時以降に活動量が急増し、\n特に「大丈夫なふりをした感情」をよく食べると言われています。",
    s1ListTitle: "現在確認されている餌",
    s1List: ["傷ついた気持ち", "曖昧な後悔", "返信のないメッセージ", "一人で抑え込んだ感情", "理由もなく泣きたい夜", "社会生活できているふり"],
    s1Note: "※ ウゴギは完全な解決策を提供しません。\nただ、少し息ができる空間を作ってくれます。",
    s2Title: "なぜ感情を粉砕するのですか？",
    s2Body: "人々はしばしば感情を処理できないまま\n心の隅に一時保存してしまいます。",
    s2Sub: "ウゴギはその感情を代わりに少しの間かんでくれるために存在します。",
    s2Sub2: "粉砕された感情のほとんどは復元できず、\n一部は奇妙な形に変形して戻ってくることがあります。",
    s2Quote: "「でも不思議なことに、\n少し軽くなったという報告が続いています。」",
    s3Title: "粉砕プロセスのご案内",
    s3Steps: ["感情を取り出します。", "大丈夫なふりをやめます。", "ウゴギに感情を投げます。", "変な音がします。", "少しぼんやりします。", "たまに笑えます。"],
    s3Note: "※ 個人差があります。",
    s4Title: "注意事項",
    s4List: [
      "ウゴギは深夜に過剰に活性化される場合があります。",
      "感情を長く抑えすぎた場合、処理時間が増加する場合があります。",
      "「何でもない」を繰り返し入力すると、機械が静かにじっと見つめることがあります。",
      "ウゴギは感情を食べますが、人生全体を解決することはできません。",
      "しかし不思議と、また来てしまうという報告が多いです。",
    ],
    s5Title: "オヌルムードについて",
    s5Body: "オヌルムードは感情を完全に解決するよりも、\n少し内려놓ける空間を作るために始まりました。",
    s5Quote: "面白くしようと作ったのに、\nたまに慰めになって、\n軽くしようと作ったのに、\n思ったより本気が残りました。",
    s5End: "今日の感情を長く持ちすぎないでください。",
    cta: "感情を捨てに行く →",
    footer: "© 2026 OnulMood. All rights reserved.",
  },
  es: {
    back: "← OnulMood",
    badge: "UGOGI EMOTIONAL DISPOSAL CO. — MANUAL v0.0.3",
    title: "Manual de Usuario de Ugogi",
    subtitle: "temporary emotional release machine manual",
    warning: "Ugogi está comiendo emociones hoy también.",
    warningSub: "Exactamente por qué las come aún no se ha determinado.",
    docId: "DOC-EMO-2026-0518 · Guía Oficial del Dispositivo de Eliminación Emocional",
    s1Title: "¿Qué es Ugogi?",
    s1Body: "Ugogi es un dispositivo temporal de trituración emocional creado para procesar emociones.",
    s1Sub: "Nadie sabe cuándo apareció por primera vez,\npero su actividad aumenta después de las 2 AM,\nespecialmente conocido por devorar \"emociones que fingen estar bien.\"",
    s1ListTitle: "Presas confirmadas hasta ahora",
    s1List: ["Sentimientos heridos", "Remordimientos vagos", "Mensajes sin respuesta", "Emociones suprimidas solo", "Noches de lágrimas inesperadas", "Fingir funcionar socialmente"],
    s1Note: "※ Ugogi no proporciona soluciones perfectas.\nPero crea un poco de espacio para respirar.",
    s2Title: "¿Por qué triturar emociones?",
    s2Body: "La gente suele dejar emociones almacenadas temporalmente\nen un rincón del corazón sin procesarlas.",
    s2Sub: "Ugogi existe para masticar esas emociones por un momento.",
    s2Sub2: "La mayoría de las emociones trituradas no se pueden recuperar,\ny algunas pueden regresar en una forma extraña.",
    s2Quote: "\"Aunque curiosamente,\ncontinúan llegando informes de sentirse un poco más ligero.\"",
    s3Title: "Guía del Proceso de Trituración",
    s3Steps: ["Saca la emoción.", "Deja de fingir que estás bien.", "Lanza la emoción a Ugogi.", "Ocurre un sonido extraño.", "Te quedas un poco en blanco.", "A veces es gracioso."],
    s3Note: "※ Los resultados individuales pueden variar.",
    s4Title: "Advertencias",
    s4List: [
      "Ugogi puede volverse excesivamente activo durante las horas nocturnas.",
      "Si las emociones han sido suprimidas demasiado tiempo, el tiempo de procesamiento puede aumentar.",
      "Ingresar repetidamente \"estoy bien\" puede hacer que la máquina te mire en silencio.",
      "Ugogi come emociones pero no puede resolver toda tu vida.",
      "Sin embargo, muchos informes indican que los usuarios extrañamente regresan.",
    ],
    s5Title: "Sobre OnulMood",
    s5Body: "OnulMood se inició no para resolver perfectamente las emociones,\nsino para crear un espacio donde puedas dejarlas por un momento.",
    s5Quote: "Lo hice para que fuera gracioso,\npero a veces se convirtió en un consuelo.\nLo hice ligero,\npero quedó más sinceridad de la esperada.",
    s5End: "No cargues las emociones de hoy por demasiado tiempo.",
    cta: "Ir a desechar emociones →",
    footer: "© 2026 OnulMood. All rights reserved.",
  },
  zh: {
    back: "← OnulMood",
    badge: "UGOGI EMOTIONAL DISPOSAL CO. — MANUAL v0.0.3",
    title: "乌格基使用说明书",
    subtitle: "temporary emotional release machine manual",
    warning: "乌格基今天也在吃情绪。",
    warningSub: "为什么要吃，目前尚未查明。",
    docId: "DOC-EMO-2026-0518 · 情绪处理装置官方指南",
    s1Title: "乌格基是什么？",
    s1Body: "乌格基是为了处理情绪而创建的临时情绪粉碎装置。",
    s1Sub: "不知道它从什么时候开始存在，\n但在凌晨2点后活动量急剧增加，\n特别擅长吃掉「假装没事的情绪」。",
    s1ListTitle: "目前已确认的猎物",
    s1List: ["受伤的心情", "模糊的后悔", "没有回复的消息", "独自压抑的情绪", "莫名想哭的夜晚", "假装能正常生活"],
    s1Note: "※ 乌格基不提供完美的解决方案。\n但它会创造一点呼吸的空间。",
    s2Title: "为什么要粉碎情绪？",
    s2Body: "人们常常无法处理情绪，\n把它们临时存放在心里的角落。",
    s2Sub: "乌格基存在的意义，就是暂时替你咀嚼那些情绪。",
    s2Sub2: "大多数被粉碎的情绪无法恢复，\n有些可能以奇怪的形式回来。",
    s2Quote: "「但奇怪的是，\n感觉稍微轻松了一些的反馈不断出现。」",
    s3Title: "粉碎流程说明",
    s3Steps: ["取出情绪。", "停止假装没事。", "把情绪扔给乌格基。", "会发出奇怪的声音。", "会有点发呆。", "有时候会觉得好笑。"],
    s3Note: "※ 个体差异存在。",
    s4Title: "注意事项",
    s4List: [
      "乌格基在深夜时段可能会过度活跃。",
      "如果情绪压抑太久，处理时间可能会增加。",
      "如果重复输入「没事」，机器可能会默默地盯着你。",
      "乌格基吃情绪，但无法解决整个人生。",
      "然而，奇怪的是，有很多人会再次回来的报告。",
    ],
    s5Title: "关于OnulMood",
    s5Body: "OnulMood的诞生，不是为了完美解决情绪，\n而是为了创造一个可以暂时放下情绪的空间。",
    s5Quote: "本来是想做得有趣的，\n有时候却成了安慰。\n本来想做得轻松，\n却留下了比想象中更多的真心。",
    s5End: "今天的情绪，不要拿太久。",
    cta: "去丢弃情绪 →",
    footer: "© 2026 OnulMood. All rights reserved.",
  },
} as const;

function ManualSection({ num, title, color, children }: {
  num: string; title: string; color: string; children: React.ReactNode;
}) {
  return (
    <section style={{ marginBottom: 32 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <span style={{ fontSize: 9, fontFamily: "monospace", color, letterSpacing: "0.16em", background: `${color}15`, padding: "2px 8px", border: `1px solid ${color}30` }}>
          {num}
        </span>
        <h2 style={{ fontSize: 17, fontWeight: 700, fontFamily: "var(--font-serif)", color: INK }}>{title}</h2>
        <div style={{ flex: 1, height: 1, background: LINE }} />
      </div>
      <div style={{ fontSize: 14, color: "#5A5248", lineHeight: 1.9, fontFamily: "var(--font-serif)", fontWeight: 300 }}>
        {children}
      </div>
    </section>
  );
}

export default async function AboutPage() {
  const locale = await getLocale();
  const c = CONTENT[locale] ?? CONTENT.ko;

  return (
    <div style={{ background: BG, minHeight: "100vh" }}>
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "40px 22px 100px" }}>

        <Link href="/" style={{ fontSize: 13, color: MUTED, textDecoration: "none", fontFamily: "var(--font-serif)" }}>
          {c.back}
        </Link>

        {/* 헤더 카드 */}
        <div style={{ margin: "24px 0 32px", position: "relative" }}>
          <div style={{ position: "absolute", top: -10, left: "50%", transform: "translateX(-50%) rotate(-1deg)", width: 80, height: 18, background: "rgba(212,188,144,0.55)", zIndex: 2 }} />
          <div style={{ background: PAPER, border: `2.5px solid ${INK}`, boxShadow: `6px 6px 0 ${INK}`, padding: "32px 28px 28px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(transparent,transparent 28px,rgba(180,170,150,0.12) 28px,rgba(180,170,150,0.12) 29px)", backgroundPosition: "0 44px", pointerEvents: "none" }} />
            <p style={{ fontSize: 8, fontFamily: "monospace", color: ROSE, letterSpacing: "0.18em", marginBottom: 10 }}>{c.badge}</p>
            <h1 style={{ fontSize: 30, fontWeight: 700, fontFamily: "var(--font-serif)", color: INK, lineHeight: 1.3, marginBottom: 6 }}>{c.title}</h1>
            <p style={{ fontSize: 11, color: MUTED, fontFamily: "var(--font-en)", fontStyle: "italic", marginBottom: 20 }}>{c.subtitle}</p>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 14px", background: `${ROSE}10`, border: `1.5px solid ${ROSE}40` }}>
              <span style={{ fontSize: 14, flexShrink: 0 }}>⚠</span>
              <p style={{ fontSize: 13, fontFamily: "var(--font-serif)", color: INK, lineHeight: 1.7 }}>
                {c.warning}<br />
                <span style={{ color: "#7A7260" }}>{c.warningSub}</span>
              </p>
            </div>
            <p style={{ fontSize: 8, fontFamily: "monospace", color: LINE, marginTop: 16, letterSpacing: "0.1em" }}>{c.docId}</p>
          </div>
        </div>

        {/* Section 1 */}
        <ManualSection num="01" title={c.s1Title} color={ROSE}>
          <p><strong>{c.s1Body}</strong></p>
          <p style={{ marginTop: 8, color: "#7A7260", whiteSpace: "pre-line" }}>{c.s1Sub}</p>
          <div style={{ marginTop: 16, padding: "14px 16px", background: "#FAF8F2", border: `1px dashed ${LINE}`, borderRadius: 2 }}>
            <p style={{ fontSize: 9, fontFamily: "monospace", color: MUTED, letterSpacing: "0.12em", marginBottom: 8 }}>{c.s1ListTitle}</p>
            {c.s1List.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 8, fontSize: 13, marginBottom: 5, color: "#5A5248" }}>
                <span style={{ color: ROSE, flexShrink: 0 }}>—</span><span>{item}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, padding: "10px 14px", background: `${INK}06`, border: `1px solid ${LINE}` }}>
            <p style={{ fontSize: 11, fontFamily: "monospace", color: "#7A7260", lineHeight: 1.7, whiteSpace: "pre-line" }}>{c.s1Note}</p>
          </div>
        </ManualSection>

        {/* Section 2 */}
        <ManualSection num="02" title={c.s2Title} color="#7878B0">
          <p style={{ whiteSpace: "pre-line" }}>{c.s2Body}</p>
          <p style={{ marginTop: 10, color: "#7A7260" }}>{c.s2Sub}</p>
          <p style={{ marginTop: 10, color: "#7A7260", whiteSpace: "pre-line" }}>{c.s2Sub2}</p>
          <div style={{ marginTop: 14, padding: "12px 16px", background: `${ROSE}10`, border: `1.5px solid ${ROSE}30`, borderLeft: `3px solid ${ROSE}` }}>
            <p style={{ fontSize: 13, fontFamily: "var(--font-serif)", color: INK, lineHeight: 1.8, fontStyle: "italic", whiteSpace: "pre-line" }}>{c.s2Quote}</p>
          </div>
        </ManualSection>

        {/* Section 3 */}
        <ManualSection num="03" title={c.s3Title} color="#5A8FA8">
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {c.s3Steps.map((step, i) => (
              <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <span style={{ fontSize: 9, fontFamily: "monospace", color: "#FAF8F2", background: INK, padding: "2px 7px", flexShrink: 0 }}>{i + 1}</span>
                <span style={{ fontSize: 14, color: "#3A3228", lineHeight: 1.7 }}>{step}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 10, fontFamily: "monospace", color: MUTED, marginTop: 14 }}>{c.s3Note}</p>
        </ManualSection>

        {/* Section 4 */}
        <ManualSection num="04" title={c.s4Title} color="#B07840">
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {c.s4List.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 10, fontSize: 13, color: "#5A5248", lineHeight: 1.7 }}>
                <span style={{ color: ROSE, flexShrink: 0, fontFamily: "monospace" }}>—</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </ManualSection>

        {/* Section 5 */}
        <ManualSection num="05" title={c.s5Title} color="#6A9870">
          <p style={{ lineHeight: 1.9, color: "#5A5248", whiteSpace: "pre-line" }}>{c.s5Body}</p>
          <div style={{ margin: "18px 0", padding: "18px 20px", background: "#FAF8F2", border: `1.5px solid ${LINE}`, borderRadius: 2, position: "relative" }}>
            <div style={{ position: "absolute", top: -8, left: 16, background: "#FAF8F2", padding: "0 8px" }}>
              <span style={{ fontSize: 9, fontFamily: "monospace", color: MUTED, letterSpacing: "0.1em" }}>SHARON&apos;S NOTE</span>
            </div>
            <p style={{ fontSize: 14, fontFamily: "var(--font-serif)", color: "#5A5248", lineHeight: 2, fontStyle: "italic", whiteSpace: "pre-line" }}>{c.s5Quote}</p>
          </div>
          <p style={{ fontSize: 15, fontFamily: "var(--font-serif)", color: INK, fontWeight: 700, lineHeight: 1.9 }}>{c.s5End}</p>
        </ManualSection>

        {/* CTA */}
        <div style={{ textAlign: "center", padding: "32px 0" }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: ROSE, color: "#F5EFE0", padding: "14px 32px", borderRadius: 4, fontSize: 16, fontFamily: "var(--font-serif)", fontWeight: 700, textDecoration: "none", boxShadow: "0 4px 18px rgba(200,96,122,0.4)" }}>
            {c.cta}
          </Link>
        </div>

        {/* 푸터 */}
        <div style={{ borderTop: `1px solid ${LINE}`, paddingTop: 24, marginTop: 32 }}>
          <p style={{ fontSize: 12, color: MUTED, textAlign: "center" }}>{c.footer}</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 12 }}>
            <Link href="/" style={{ fontSize: 12, color: MUTED, textDecoration: "none" }}>Home</Link>
            <Link href="/privacy" style={{ fontSize: 12, color: MUTED, textDecoration: "none" }}>Privacy</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
