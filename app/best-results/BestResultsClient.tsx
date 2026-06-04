"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";

const DARK_BG   = "#0E0C0B";
const CARD_BASE = "#171310";
const DARK_LINE = "#232019";
const ROSE      = "#C8607A";
const ROSE_DIM  = "#6A2E3E";
const TEXT_PRI  = "#E8E0D0";
const TEXT_SEC  = "#907E6A";
const TEXT_DIM  = "#4A4038";

interface Result {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  ugogi: string;
  tag: string;
  tagColor: string;
  cardBg: string;
  accentColor: string;
}

const RESULTS_KO: Result[] = [
  {
    id: "RESULT-001",
    title: "눅눅한 오징어칩 바스러기",
    subtitle: "한 봉지의 마지막 상태",
    description: "바삭함은 이미 사라진지 오래됐는데 그래도 먹게 되는 그 상태. 기력은 없지만 포기도 못 하는 애매한 지점. 퇴근하고 소파에 누워서도 뭔가 해야 할 것 같은 느낌이 남아있음.",
    ugogi: "딱 이거야. 해결은 안 됐는데 어떻게든 굴러가고 있는 상태. 파쇄 권장.",
    tag: "피로 계열", tagColor: "#C8607A", cardBg: "#1A1614", accentColor: "#C8607A",
  },
  {
    id: "RESULT-002",
    title: "애매하게 식은 핫바 감정",
    subtitle: "다시 데우기도 그냥 먹기도 애매한",
    description: "뜨겁지도 차갑지도 않은 미묘한 온도. 다시 데우기엔 귀찮고 그냥 먹기엔 아쉬운 그 타이밍. 뭔가 결정하고 싶은데 아무것도 결정하기 싫은 날에 나타남.",
    ugogi: "이건 누가 결정해주길 기다리는 감정임. 아무도 안 해주면 그냥 던져버려.",
    tag: "우유부단 계열", tagColor: "#C4874A", cardBg: "#1A1712", accentColor: "#C4874A",
  },
  {
    id: "RESULT-003",
    title: "충전선 접촉불량 상태",
    subtitle: "충전 중인 것 같기도 하고 아닌 것 같기도 하고",
    description: "꽂아는 놨는데 충전이 될지 안 될지 모르는 상태. 쉬기는 했는데 회복이 안 된 느낌. 분명히 잠은 잤는데 왜 이렇게 피곤한지 모르는 그 월요일 아침.",
    ugogi: "번아웃 직전 징조. 선 교체 권장. 일단 쉬는 게 먼저임.",
    tag: "번아웃 계열", tagColor: "#7A8FC8", cardBg: "#141618", accentColor: "#7A8FC8",
  },
  {
    id: "RESULT-004",
    title: "구겨진 영수증 멘탈",
    subtitle: "아무리 펴도 원래대로 돌아오지 않음",
    description: "한번 구겨지면 아무리 펴도 원래대로 돌아오지 않는 그 느낌. 겉으론 멀쩡한 척하지만 이미 주름이 남아있는 상태. 오래된 상처가 딱 이런 모양임.",
    ugogi: "이거 모르고 지나치면 나중에 크게 터짐. 지금 꺼내서 버릴 것.",
    tag: "감정 억압 계열", tagColor: "#9B7ABF", cardBg: "#18151A", accentColor: "#9B7ABF",
  },
  {
    id: "RESULT-005",
    title: "사회생활 가능한 척 모드",
    subtitle: "배터리 2%, 밝기 100%",
    description: "실제로는 아무것도 하기 싫은데 겉으로는 완벽하게 정상인처럼 작동하는 상태. 집에 가자마자 뻗는 유형. 출퇴근 시간대에 가장 많이 관측되는 감정.",
    ugogi: "지속 불가능한 상태임. 당장은 돌아가지만 곧 배터리 방전 예정.",
    tag: "감정 노동 계열", tagColor: "#C8607A", cardBg: "#1A1414", accentColor: "#C8607A",
  },
  {
    id: "RESULT-006",
    title: "카톡 읽씹 대기 중",
    subtitle: "읽혔는데 왜 아무 말도 없지",
    description: "보냈는데 읽혔는데 답장이 없는 그 애매한 시간. 뭔가 잘못한 건지 아닌지 모르는 상태. 생각할수록 더 이상해지는 루프에 진입한 경우 발생.",
    ugogi: "이거 생각할수록 더 이상해짐. 10초만 생각하고 그냥 던져버려.",
    tag: "관계 계열", tagColor: "#6A9B7A", cardBg: "#141A16", accentColor: "#6A9B7A",
  },
  {
    id: "RESULT-007",
    title: "새벽 3시 알고리즘 빨려들기",
    subtitle: "자야 하는데 왜 자기 싫지",
    description: "잘 준비는 됐는데 왜인지 폰을 못 놓는 그 상태. 피곤하면서도 자기 싫은 묘한 저항감. 현실로 돌아가기 싫어서 버티는 거 나만 아는 게 아님.",
    ugogi: "수면 부채 + 현실 도피 콤보임. 지금 당장 폰 내려놓고 자.",
    tag: "수면 방해 계열", tagColor: "#C4874A", cardBg: "#1A1812", accentColor: "#C4874A",
  },
  {
    id: "RESULT-008",
    title: "편의점 계란샌드위치 멘탈",
    subtitle: "저렴하고 빠르고 나쁘지 않지만 어딘가 쓸쓸한",
    description: "화려하진 않지만 그래도 충분히 위로가 되는 그 감정. 대단하지 않아도 버티고 있는 오늘. 완벽하지 않아도 됨. 이만하면 충분함.",
    ugogi: "나쁘지 않음. 충분히 버텼음. 오늘도 수고했어.",
    tag: "위로 계열", tagColor: "#98B89A", cardBg: "#141A14", accentColor: "#98B89A",
  },
];

const RESULTS_EN: Result[] = [
  {
    id: "RESULT-001",
    title: "Soggy squid chip crumbles",
    subtitle: "The final state of a bag",
    description: "The crunch left long ago, but you keep eating anyway. No energy, but can't give up either. Even after work, slumped on the sofa, you still feel like you should be doing something.",
    ugogi: "That's exactly it. Nothing's resolved, but somehow it keeps going. Recommend shredding.",
    tag: "Fatigue type", tagColor: "#C8607A", cardBg: "#1A1614", accentColor: "#C8607A",
  },
  {
    id: "RESULT-002",
    title: "Lukewarm corn dog emotion",
    subtitle: "Too awkward to reheat, too disappointing to eat cold",
    description: "That subtle in-between temperature — too much effort to reheat, but a letdown to eat as-is. Shows up on days when you want to decide something but don't want to decide anything at all.",
    ugogi: "This is the emotion of waiting for someone else to decide. If no one does, just toss it.",
    tag: "Indecision type", tagColor: "#C4874A", cardBg: "#1A1712", accentColor: "#C4874A",
  },
  {
    id: "RESULT-003",
    title: "Loose charging cable state",
    subtitle: "Not sure if it's charging or not",
    description: "It's plugged in, but you can't tell if it's actually charging. Rested, but not recovered. Slept, but somehow still exhausted. That Monday morning feeling.",
    ugogi: "Pre-burnout sign. Cable replacement recommended. Rest first.",
    tag: "Burnout type", tagColor: "#7A8FC8", cardBg: "#141618", accentColor: "#7A8FC8",
  },
  {
    id: "RESULT-004",
    title: "Crumpled receipt mentality",
    subtitle: "No matter how much you smooth it, it won't go back",
    description: "Once crumpled, no amount of flattening brings it back. You look fine on the outside, but the creases are already there. Old wounds look exactly like this.",
    ugogi: "If you ignore this, it'll blow up later. Take it out now and toss it.",
    tag: "Emotional suppression", tagColor: "#9B7ABF", cardBg: "#18151A", accentColor: "#9B7ABF",
  },
  {
    id: "RESULT-005",
    title: "'I'm fine' mode",
    subtitle: "Battery 2%, brightness 100%",
    description: "Inside, you want to do absolutely nothing. Outside, you're running perfectly like a normal person. The type that collapses the moment they get home. Most frequently observed during commute hours.",
    ugogi: "Unsustainable state. Running for now, but battery discharge imminent.",
    tag: "Emotional labor", tagColor: "#C8607A", cardBg: "#1A1414", accentColor: "#C8607A",
  },
  {
    id: "RESULT-006",
    title: "Waiting on read-no-reply",
    subtitle: "It was read — why no response?",
    description: "Sent it, they read it, no reply. That ambiguous stretch of time where you don't know if you did something wrong. Thinking about it just makes it weirder.",
    ugogi: "The more you think about it, the weirder it gets. Think for 10 seconds, then just toss it.",
    tag: "Relationship type", tagColor: "#6A9B7A", cardBg: "#141A16", accentColor: "#6A9B7A",
  },
  {
    id: "RESULT-007",
    title: "3am algorithm spiral",
    subtitle: "Should sleep — but why don't I want to?",
    description: "Ready for bed, but can't put the phone down. Tired but strangely resistant to sleeping. Holding on because you don't want to go back to reality — you're not the only one.",
    ugogi: "Sleep debt + escapism combo. Put down the phone and sleep. Right now.",
    tag: "Sleep disruption", tagColor: "#C4874A", cardBg: "#1A1812", accentColor: "#C4874A",
  },
  {
    id: "RESULT-008",
    title: "Convenience store egg sandwich mentality",
    subtitle: "Cheap, quick, not bad — but somehow a little lonely",
    description: "Not glamorous, but enough comfort to get by. Hanging in there even without anything special today. Doesn't have to be perfect. This is enough.",
    ugogi: "Not bad. You hung in there enough. Good work today.",
    tag: "Comfort type", tagColor: "#98B89A", cardBg: "#141A14", accentColor: "#98B89A",
  },
];

const UI: Record<string, {
  title: string; subtitle: string; statsCollected: string; statsShared: string; statsStatus: string;
  ugogi: string; share: string; copied: string; save: string; saved: string;
  note: string; ctaTop: string; ctaTitle: string; ctaSub: string; ctaBtn: string;
  footerHome: string; footerBlog: string; footerArticle: string; footerPrivacy: string;
}> = {
  ko: {
    title: "인기 감정 결과 모음",
    subtitle: "사람들이 가장 많이 저장하고 공유한\n이상한 감정 결과 아카이브.",
    statsCollected: "수집된 결과", statsShared: "공유 횟수", statsStatus: "상태",
    ugogi: "우걱이 코멘트",
    share: "공유하기", copied: "✓ 복사됨", save: "♡ 저장", saved: "♥ 저장됨",
    note: "* 이 결과들은 실제 사용자들의 감정 파쇄 기록에서 추출됨.\n* 공유하기 버튼은 결과 텍스트를 클립보드에 복사함.\n* 저장 기록은 기기에만 남고 서버에 저장되지 않음.",
    ctaTop: "내 감정도 여기 올라올 수 있음",
    ctaTitle: "이 감정 중에 하나라도\n내 얘기 같다면?",
    ctaSub: "우걱이한테 직접 던져버려요.",
    ctaBtn: "감정 파쇄하러 가기",
    footerHome: "홈", footerBlog: "감정 이야기", footerArticle: "감정 피로 읽기", footerPrivacy: "개인정보처리방침",
  },
  en: {
    title: "Top Emotion Result Archive",
    subtitle: "The most saved and shared\nstrange emotion results.",
    statsCollected: "Results", statsShared: "Shares", statsStatus: "Status",
    ugogi: "Ugogi Comment",
    share: "Share", copied: "✓ Copied", save: "♡ Save", saved: "♥ Saved",
    note: "* These results are extracted from real emotion shred sessions.\n* The Share button copies the result text to clipboard.\n* Save records stay on your device only.",
    ctaTop: "Your emotion could end up here too",
    ctaTitle: "If any of these\nsound like you?",
    ctaSub: "Throw it directly at Ugogi.",
    ctaBtn: "Go shred emotions",
    footerHome: "Home", footerBlog: "Stories", footerArticle: "Emotion Fatigue", footerPrivacy: "Privacy",
  },
  ja: {
    title: "人気感情結果アーカイブ",
    subtitle: "みんなが一番保存・シェアした\n不思議な感情結果。",
    statsCollected: "収集結果", statsShared: "共有回数", statsStatus: "状態",
    ugogi: "ウゴギコメント",
    share: "シェア", copied: "✓ コピー済", save: "♡ 保存", saved: "♥ 保存済",
    note: "* この結果は実際のユーザーの感情処理記録から抽出されました。\n* シェアボタンはテキストをクリップボードにコピーします。\n* 保存記録はデバイスにのみ残ります。",
    ctaTop: "あなたの感情もここに載るかも",
    ctaTitle: "この感情のどれか\nあなたの話に聞こえたら？",
    ctaSub: "ウゴギに直接投げてしまいましょう。",
    ctaBtn: "感情をシュレッドしに行く",
    footerHome: "ホーム", footerBlog: "感情ストーリー", footerArticle: "感情疲労", footerPrivacy: "プライバシー",
  },
  es: {
    title: "Archivo de Resultados Emocionales",
    subtitle: "Los resultados emocionales más guardados\ny compartidos.",
    statsCollected: "Resultados", statsShared: "Compartidos", statsStatus: "Estado",
    ugogi: "Comentario Ugogi",
    share: "Compartir", copied: "✓ Copiado", save: "♡ Guardar", saved: "♥ Guardado",
    note: "* Estos resultados provienen de sesiones reales de trituración emocional.\n* El botón Compartir copia el texto al portapapeles.\n* Los registros guardados permanecen solo en tu dispositivo.",
    ctaTop: "Tu emoción también podría aparecer aquí",
    ctaTitle: "Si alguno de estos\nte suena familiar?",
    ctaSub: "Lánzaselo directamente a Ugogi.",
    ctaBtn: "Ir a triturar emociones",
    footerHome: "Inicio", footerBlog: "Historias", footerArticle: "Fatiga emocional", footerPrivacy: "Privacidad",
  },
  zh: {
    title: "热门情绪结果档案",
    subtitle: "被大家最多保存和分享的\n奇特情绪结果。",
    statsCollected: "收集结果", statsShared: "分享次数", statsStatus: "状态",
    ugogi: "乌格基评论",
    share: "分享", copied: "✓ 已复制", save: "♡ 收藏", saved: "♥ 已收藏",
    note: "* 这些结果来自真实用户的情绪粉碎记录。\n* 分享按钮将结果文字复制到剪贴板。\n* 收藏记录只保存在本设备上。",
    ctaTop: "你的情绪也可能出现在这里",
    ctaTitle: "这些情绪中有没有\n一个说的是你？",
    ctaSub: "直接扔给乌格基吧。",
    ctaBtn: "去粉碎情绪",
    footerHome: "首页", footerBlog: "情绪故事", footerArticle: "情绪疲劳", footerPrivacy: "隐私政策",
  },
};

function ResultCard({ result, index, ui }: { result: Result; index: number; ui: (typeof UI)[string] }) {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleShare = useCallback(async () => {
    const text = `[${result.title}]\n${result.description}\n\n— onulmood.com/best-results`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard unavailable */
    }
  }, [result.title, result.description]);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: result.cardBg,
        border: `1px solid ${DARK_LINE}`,
        borderRadius: 6,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* 상단 헤더 바 */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 18px 10px",
        borderBottom: `1px solid ${DARK_LINE}`,
      }}>
        <span style={{ fontSize: 10, fontFamily: "monospace", color: result.accentColor, letterSpacing: "0.12em", opacity: 0.8 }}>
          {result.id}
        </span>
        <span style={{
          fontSize: 10, padding: "2px 8px",
          background: `${result.tagColor}18`, color: result.tagColor,
          border: `1px solid ${result.tagColor}30`,
          borderRadius: 12, fontFamily: "monospace", letterSpacing: "0.04em",
        }}>
          {result.tag}
        </span>
      </div>

      {/* 본문 */}
      <div style={{ padding: "20px 20px 0" }}>
        <h2 style={{
          fontSize: "clamp(17px, 4.5vw, 21px)", fontWeight: 600,
          fontFamily: "var(--font-maru)", color: TEXT_PRI,
          lineHeight: 1.45, marginBottom: 6, letterSpacing: "-0.025em",
        }}>
          {result.title}
        </h2>
        <p style={{ fontSize: 11, color: TEXT_DIM, fontFamily: "monospace", marginBottom: 14, letterSpacing: "0.04em" }}>
          {result.subtitle}
        </p>
        <p style={{
          fontSize: 14, color: TEXT_SEC, lineHeight: 2.0, fontWeight: 300,
          marginBottom: 20, fontFamily: "var(--font-prose)", letterSpacing: "-0.02em", wordBreak: "keep-all",
        }}>
          {result.description}
        </p>
      </div>

      {/* 우걱이 코멘트 */}
      <div style={{
        margin: "0 20px 20px", padding: "14px 16px",
        background: `${result.accentColor}0C`, border: `1px solid ${result.accentColor}22`,
        borderLeft: `2px solid ${result.accentColor}`, borderRadius: "0 4px 4px 0",
      }}>
        <p style={{ fontSize: 10, color: result.accentColor, fontFamily: "monospace", letterSpacing: "0.1em", marginBottom: 7, opacity: 0.8 }}>
          {ui.ugogi}
        </p>
        <p style={{ fontSize: 14, color: TEXT_PRI, fontFamily: "var(--font-maru)", lineHeight: 1.85, fontWeight: 400, letterSpacing: "-0.02em" }}>
          {result.ugogi}
        </p>
      </div>

      {/* 액션 버튼 */}
      <div style={{ display: "flex", gap: 8, padding: "12px 20px 16px", borderTop: `1px solid ${DARK_LINE}` }}>
        <button
          onClick={handleShare}
          style={{
            flex: 1, padding: "9px 0",
            background: copied ? `${result.accentColor}20` : "transparent",
            border: `1px solid ${copied ? result.accentColor : DARK_LINE}`,
            borderRadius: 4, fontSize: 12, fontFamily: "monospace",
            color: copied ? result.accentColor : TEXT_DIM,
            cursor: "pointer", letterSpacing: "0.06em", transition: "all 0.2s",
          }}
        >
          {copied ? ui.copied : ui.share}
        </button>
        <button
          onClick={() => setSaved(v => !v)}
          style={{
            padding: "9px 16px",
            background: saved ? `${result.accentColor}20` : "transparent",
            border: `1px solid ${saved ? result.accentColor : DARK_LINE}`,
            borderRadius: 4, fontSize: 12, fontFamily: "monospace",
            color: saved ? result.accentColor : TEXT_DIM,
            cursor: "pointer", letterSpacing: "0.06em", transition: "all 0.2s",
          }}
        >
          {saved ? ui.saved : ui.save}
        </button>
      </div>
    </motion.article>
  );
}

export default function BestResultsClient() {
  const { locale } = useLocale();
  const ui = UI[locale] ?? UI.en;
  const RESULTS = locale === "ko" ? RESULTS_KO : RESULTS_EN;

  return (
    <div style={{ background: DARK_BG, minHeight: "100vh", color: TEXT_PRI, position: "relative" }}>

      {/* CRT 스캔라인 오버레이 */}
      <div style={{
        position: "fixed", inset: 0,
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.07) 3px, rgba(0,0,0,0.07) 4px)",
        pointerEvents: "none", zIndex: 50,
      }} />

      <div style={{ maxWidth: 640, margin: "0 auto", padding: "44px 18px 100px", position: "relative", zIndex: 1 }}>

        {/* 뒤로가기 */}
        <Link href="/blog" style={{ fontSize: 12, color: TEXT_DIM, textDecoration: "none", fontFamily: "monospace", letterSpacing: "0.08em", display: "inline-block", marginBottom: 36 }}>
          ← BACK
        </Link>

        {/* 헤더 */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} style={{ marginBottom: 40 }}>
          <p style={{ fontSize: 10, fontFamily: "monospace", color: ROSE, letterSpacing: "0.18em", marginBottom: 14, opacity: 0.9 }}>
            ■ EMOTIONAL ARCHIVE — CLASSIFIED
          </p>

          <h1 style={{
            fontSize: "clamp(24px, 6vw, 32px)", fontWeight: 600,
            fontFamily: "var(--font-maru)", color: TEXT_PRI,
            lineHeight: 1.45, marginBottom: 14, letterSpacing: "-0.03em",
          }}>
            {ui.title}
          </h1>

          <p style={{
            fontSize: 15, color: TEXT_SEC, lineHeight: 2.0, fontWeight: 300,
            fontFamily: "var(--font-prose)", letterSpacing: "-0.02em", marginBottom: 18,
          }}>
            {ui.subtitle.split("\n").map((l, i) => <span key={i}>{l}{i === 0 && <br />}</span>)}
          </p>

          {/* 통계 바 */}
          <div style={{ display: "flex", gap: 20, padding: "12px 16px", background: CARD_BASE, border: `1px solid ${DARK_LINE}`, borderRadius: 4 }}>
            {[
              { label: ui.statsCollected, value: "8" },
              { label: ui.statsShared,   value: "2,847" },
              { label: ui.statsStatus,   value: "LIVE" },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <span style={{ fontSize: 9, fontFamily: "monospace", color: TEXT_DIM, letterSpacing: "0.08em" }}>{s.label}</span>
                <span style={{ fontSize: 13, fontFamily: "monospace", color: i === 2 ? "#6A9B7A" : TEXT_PRI, letterSpacing: "0.04em" }}>{s.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <div style={{ borderTop: `1px solid ${DARK_LINE}`, marginBottom: 28 }} />

        {/* 결과 카드 목록 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {RESULTS.map((result, i) => (
            <ResultCard key={result.id} result={result} index={i} ui={ui} />
          ))}
        </div>

        {/* 안내 텍스트 */}
        <div style={{ marginTop: 32, padding: "16px 18px", background: CARD_BASE, border: `1px solid ${DARK_LINE}`, borderRadius: 4 }}>
          <p style={{ fontSize: 11, fontFamily: "monospace", color: TEXT_DIM, letterSpacing: "0.06em", lineHeight: 1.8 }}>
            {ui.note.split("\n").map((l, i) => <span key={i}>{l}<br /></span>)}
          </p>
        </div>

        {/* CTA */}
        <div style={{ marginTop: 32, padding: "32px 24px", background: `${ROSE}12`, border: `1px solid ${ROSE_DIM}`, borderRadius: 8, textAlign: "center" }}>
          <p style={{ fontSize: 11, fontFamily: "monospace", color: ROSE, letterSpacing: "0.12em", marginBottom: 12, opacity: 0.8 }}>
            {ui.ctaTop}
          </p>
          <p style={{ fontSize: 18, fontWeight: 600, fontFamily: "var(--font-maru)", color: TEXT_PRI, lineHeight: 1.6, marginBottom: 8, letterSpacing: "-0.02em" }}>
            {ui.ctaTitle.split("\n").map((l, i) => <span key={i}>{l}{i === 0 && <br />}</span>)}
          </p>
          <p style={{ fontSize: 13, color: TEXT_SEC, fontWeight: 300, fontFamily: "var(--font-prose)", letterSpacing: "-0.02em", lineHeight: 1.9, marginBottom: 24 }}>
            {ui.ctaSub}
          </p>
          <Link href="/" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: ROSE, color: "#F5EFE0",
            padding: "13px 30px", borderRadius: 6,
            fontSize: 15, fontFamily: "var(--font-maru)", fontWeight: 600,
            textDecoration: "none", letterSpacing: "-0.01em",
          }}>
            {ui.ctaBtn}
          </Link>
        </div>

        {/* 푸터 */}
        <div style={{ borderTop: `1px solid ${DARK_LINE}`, paddingTop: 24, marginTop: 48 }}>
          <p style={{ fontSize: 11, color: TEXT_DIM, textAlign: "center", marginBottom: 12, fontFamily: "monospace" }}>
            © 2026 onulmood.com
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap" }}>
            {[
              { href: "/",               label: ui.footerHome },
              { href: "/blog",           label: ui.footerBlog },
              { href: "/emotion-fatigue",label: ui.footerArticle },
              { href: "/privacy",        label: ui.footerPrivacy },
            ].map((l) => (
              <Link key={l.href} href={l.href} style={{ fontSize: 11, color: TEXT_DIM, textDecoration: "none", fontFamily: "monospace" }}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
