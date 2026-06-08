// 오늘무드 감정 인사이트 — 정보성 콘텐츠 (데이터 유무와 무관하게 항상 노출)
// AdSense 심사 대응: 빈 페이지가 아니라 감정 패턴/감정 기록의 의미를 설명하는 콘텐츠 페이지로 인식되게 함.
// 한국어(ko)는 전체 작성, 그 외 로케일은 en 으로 폴백.

export interface InsightsContent {
  pageTitle: string;
  intro: string; // 상단 설명 (줄바꿈 \n 허용)
  emotionsTitle: string;
  emotions: { name: string; desc: string }[];
  reasonsTitle: string;
  reasons: { title: string; desc: string }[];
  methodTitle: string;
  methodIntro: string;
  steps: { step: string; desc: string }[];
  ugogiTitle: string;
  ugogiComment: string;
}

const ko: InsightsContent = {
  pageTitle: "오늘무드 감정 인사이트",
  intro:
    "오늘무드는 하루의 감정을 기록하고, 감정의 흐름을 조금 더 가볍게 바라보기 위한 감정 기록 서비스입니다.\n아직 개인 기록이 충분하지 않더라도, 아래 내용을 통해 사람들이 자주 경험하는 감정 패턴과 감정 기록의 의미를 확인할 수 있어요.",
  emotionsTitle: "사람들이 자주 기록하는 감정",
  emotions: [
    {
      name: "서운함",
      desc:
        "서운함은 기대했던 마음이 채워지지 않았을 때 찾아오는 감정입니다. 누군가에게 더 가까이 다가가고 싶었는데 그만큼의 반응이 돌아오지 않을 때, 마음 한쪽이 비어버리죠. 화를 내기에는 애매하고 그냥 넘기기에는 자꾸 걸려서, 서운함은 말하지 못한 채 안에 쌓이기 쉬운 감정입니다. 사실 서운함의 뒤에는 '나는 당신을 소중하게 생각한다'는 마음이 숨어 있어요.",
    },
    {
      name: "외로움",
      desc:
        "외로움은 사람들 사이에 있어도 느껴질 수 있는 감정입니다. 누군가와 연결되어 있다는 느낌이 옅어질 때, 우리는 혼자라고 느끼게 되죠. 외로움은 약점이 아니라 마음을 나누고 싶다는 자연스러운 신호입니다. 이 감정을 억지로 없애려 하기보다, 지금 내가 어떤 연결을 그리워하고 있는지 가만히 들여다보는 것이 도움이 됩니다.",
    },
    {
      name: "무기력",
      desc:
        "무기력은 마음의 에너지가 바닥났다는 신호입니다. 하고 싶은 것도 해야 할 것도 멀게 느껴지고, 작은 일조차 버겁게 다가오죠. 게으름과는 다릅니다. 오히려 너무 오래 애써온 마음이 잠시 멈춰 선 상태에 가까워요. 이럴 때는 자신을 다그치기보다, 잠깐 쉬어가도 괜찮다고 스스로에게 허락해주는 것이 필요합니다.",
    },
    {
      name: "불안",
      desc:
        "불안은 아직 일어나지 않은 일을 미리 걱정하는 마음입니다. 머릿속에서 최악의 시나리오가 반복 재생되고, 몸이 긴장하며 잠을 설치기도 하죠. 불안은 나를 지키려는 본능이 조금 과하게 작동하는 상태입니다. 그래서 '괜찮아질 거야'라는 막연한 말보다, 지금 무엇이 걱정되는지 구체적으로 적어보는 것이 마음을 가라앉히는 데 더 도움이 됩니다.",
    },
    {
      name: "짜증",
      desc:
        "짜증은 작은 자극에도 마음이 날카로워지는 감정입니다. 사실 짜증은 그 자체가 문제라기보다, 그 아래 쌓인 피로나 서운함, 불안이 보내는 신호일 때가 많습니다. 별일 아닌 일에 자꾸 화가 난다면, 이미 마음이 가득 차 있다는 뜻일 수 있어요. 짜증을 억지로 누르기보다 '내가 지금 많이 지쳐 있구나' 하고 알아차리는 것만으로도 한결 가벼워집니다.",
    },
  ],
  reasonsTitle: "감정 기록이 도움이 되는 이유",
  reasons: [
    {
      title: "감정에 이름을 붙이면 마음이 정리된다",
      desc:
        "막연하게 '기분이 안 좋다'고 느낄 때, 마음은 안개처럼 흐릿합니다. 그런데 그 감정에 '서운함'이나 '불안' 같은 이름을 붙이는 순간, 흐릿하던 것이 또렷한 형태를 갖게 되죠. 심리학에서는 이것을 '감정에 이름 붙이기'라고 부르며, 감정의 강도를 낮추는 효과가 있다고 봅니다. 이름을 안다는 건 그 감정을 다룰 수 있는 첫걸음입니다. 오늘무드는 바로 이 과정을 하루에 한 번 가볍게 연습할 수 있게 돕습니다.",
    },
    {
      title: "반복되는 감정 패턴을 발견할 수 있다",
      desc:
        "하루치 감정만 보면 잘 보이지 않지만, 며칠과 몇 주가 쌓이면 흐름이 보이기 시작합니다. 특정 요일마다 유독 지치거나, 어떤 상황에서 반복적으로 불안해지는 나를 발견하게 되죠. 패턴을 안다는 건 '나도 모르게 반응하던 것'을 '내가 알아차린 것'으로 바꾸는 일입니다. 같은 감정이 다시 찾아왔을 때 조금 덜 휘둘릴 수 있게 됩니다. 기록은 그 패턴을 비춰주는 거울 같은 역할을 해요.",
    },
    {
      title: "관계에서 내가 자주 느끼는 지점을 알 수 있다",
      desc:
        "우리가 느끼는 감정의 많은 부분은 사람과의 관계에서 출발합니다. 누구와 있을 때 편안하고 어떤 말에 자주 서운해지는지 기록하다 보면, 나만의 지점이 서서히 드러나죠. 그 지점을 알면 상대를 탓하거나 스스로를 탓하는 대신 '아, 나는 이런 부분에 약하구나' 하고 이해하게 됩니다. 이런 이해는 관계를 더 단단하게 만드는 바탕이 됩니다. 감정 기록은 결국 나 자신과 곁에 있는 사람들을 더 잘 알아가는 과정입니다.",
    },
    {
      title: "감정을 억누르기보다 안전하게 바라볼 수 있다",
      desc:
        "많은 사람들이 부정적인 감정을 빨리 없애거나 못 본 척하려고 합니다. 하지만 억눌린 감정은 사라지지 않고, 엉뚱한 순간에 더 크게 터지곤 하죠. 감정을 기록한다는 건 그 감정을 일단 안전한 곳에 꺼내놓는 일입니다. 종이 위에, 혹은 화면 위에 적힌 감정은 더 이상 나를 통째로 삼키지 못합니다. 한 걸음 떨어져 바라볼 수 있게 되면, 감정은 다룰 수 있는 크기로 줄어듭니다.",
    },
  ],
  methodTitle: "오늘무드가 제안하는 감정 관찰법",
  methodIntro: "거창한 분석이 아니어도 괜찮아요. 아래 네 단계만 가볍게 따라가 보세요.",
  steps: [
    {
      step: "오늘 감정 하나 고르기",
      desc: "하루에 여러 감정이 스쳐가지만, 그중 가장 마음에 남는 하나만 골라보세요. 전부 정리하려 애쓸 필요는 없습니다.",
    },
    {
      step: "왜 그 감정이 올라왔는지 짧게 적기",
      desc: "길게 쓰지 않아도 됩니다. '오후에 그 말을 들었을 때'처럼 한 문장이면 충분해요.",
    },
    {
      step: "감정을 해결하려 하지 말고 먼저 인정하기",
      desc: "지금 당장 답을 찾을 필요는 없습니다. '내가 지금 이렇게 느끼고 있구나'를 인정하는 것이 먼저입니다.",
    },
    {
      step: "감정파쇄함에 넣고 가볍게 보내기",
      desc: "충분히 바라봤다면 이제 붙잡고 있지 않아도 됩니다. 오늘무드의 감정파쇄함에 넣고 가볍게 흘려보내세요.",
    },
  ],
  ugogiTitle: "오늘의 우걱이 코멘트",
  ugogiComment:
    "감정은 꼭 해결해야만 하는 숙제가 아니야. 가끔은 이름 붙이고 내려놓는 것만으로도 충분해.",
};

const en: InsightsContent = {
  pageTitle: "ONULMOOD Emotion Insights",
  intro:
    "ONULMOOD is a journaling service for recording the emotions of your day and looking at how your feelings flow a little more lightly.\nEven if you don't have enough personal records yet, the content below helps you see the emotional patterns people experience most often and what it means to record how you feel.",
  emotionsTitle: "Emotions people record most often",
  emotions: [
    {
      name: "Feeling let down",
      desc:
        "This feeling arrives when something we hoped for goes unmet. When we wanted to grow closer to someone but the response we hoped for never came, a small corner of the heart feels empty. It's too vague to be angry about, yet too sticky to simply brush off, so it tends to pile up unspoken. Behind it usually hides a quiet truth: 'I care about you.'",
    },
    {
      name: "Loneliness",
      desc:
        "Loneliness can be felt even while surrounded by people. When the sense of being connected to someone fades, we begin to feel alone. Loneliness isn't a weakness — it's a natural signal that we want to share our hearts with someone. Rather than forcing it away, it helps to quietly notice what kind of connection you're longing for right now.",
    },
    {
      name: "Lethargy",
      desc:
        "Lethargy is a sign that your inner energy has run dry. What you want to do and what you have to do both feel far away, and even small tasks feel heavy. It isn't laziness. It's closer to a heart that has tried for too long finally pausing to catch its breath. At times like this, instead of pushing yourself, it helps to give yourself permission to rest for a while.",
    },
    {
      name: "Anxiety",
      desc:
        "Anxiety is the mind worrying in advance about things that haven't happened yet. Worst-case scenarios replay in your head, your body tenses, and sleep grows thin. Anxiety is an instinct to protect yourself working a little too hard. So rather than a vague 'it'll be fine,' it helps more to write down exactly what you're worried about.",
    },
    {
      name: "Irritation",
      desc:
        "Irritation is when the smallest thing makes your heart go sharp. Often irritation isn't the real problem — it's a signal from the fatigue, hurt, or anxiety stacked underneath it. If trivial things keep setting you off, it may mean your heart is already full. Rather than suppressing it, simply noticing 'I'm really worn out right now' can make things feel lighter.",
    },
  ],
  reasonsTitle: "Why recording emotions helps",
  reasons: [
    {
      title: "Naming an emotion settles the mind",
      desc:
        "When we vaguely feel 'off,' the mind is foggy. But the moment we give that feeling a name like 'hurt' or 'anxiety,' the blur takes on a clearer shape. Psychology calls this 'affect labeling,' and it's known to lower the intensity of an emotion. Knowing the name is the first step to being able to handle it. ONULMOOD helps you practice this once a day, lightly.",
    },
    {
      title: "You can spot recurring patterns",
      desc:
        "A single day of feelings reveals little, but over days and weeks a flow begins to appear. You may notice you're especially drained on certain days, or anxious in certain situations again and again. Knowing the pattern turns 'reacting without realizing' into 'noticing on purpose.' When the same feeling returns, you're a little less swept away by it. A journal acts like a mirror reflecting that pattern.",
    },
    {
      title: "You learn your tender spots in relationships",
      desc:
        "Much of what we feel begins in our relationships. As you record who you feel at ease with and which words tend to hurt you, your own tender spots slowly come into view. Knowing them lets you understand — 'ah, this is where I'm fragile' — instead of blaming others or yourself. That understanding becomes the ground that makes relationships steadier. Journaling is ultimately a way of knowing yourself and the people beside you better.",
    },
    {
      title: "You can look at feelings safely instead of burying them",
      desc:
        "Many people try to erase negative feelings quickly or pretend not to see them. But buried emotions don't disappear; they tend to erupt larger at unexpected moments. Recording a feeling means taking it out and setting it somewhere safe first. A feeling written on paper, or on a screen, can no longer swallow you whole. Once you can look at it from a step away, it shrinks to a size you can handle.",
    },
  ],
  methodTitle: "A gentle way to observe your emotions",
  methodIntro: "It doesn't have to be grand analysis. Just follow these four light steps.",
  steps: [
    {
      step: "Pick one emotion from today",
      desc: "Many feelings pass through a day; choose just the one that lingers most. You don't have to sort them all out.",
    },
    {
      step: "Write briefly why it came up",
      desc: "You don't need to write long. A single line like 'when I heard that this afternoon' is enough.",
    },
    {
      step: "Acknowledge it before trying to fix it",
      desc: "You don't need an answer right now. Acknowledging 'this is how I'm feeling' comes first.",
    },
    {
      step: "Put it in the shredder and let it go lightly",
      desc: "Once you've looked at it enough, you no longer have to hold on. Drop it into ONULMOOD's emotion shredder and let it drift away.",
    },
  ],
  ugogiTitle: "Today's note from Ugogi",
  ugogiComment:
    "A feeling isn't homework you have to solve. Sometimes just naming it and setting it down is enough.",
};

const CONTENT: Record<string, InsightsContent> = { ko, en };

export function getInsightsContent(locale: string): InsightsContent {
  return CONTENT[locale] ?? en;
}
