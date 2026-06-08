// 오늘무드 감정 인사이트 — 정보성 콘텐츠 (데이터 유무와 무관하게 항상 노출)
// AdSense 심사 대응: 빈 페이지가 아니라 감정 패턴/감정 기록의 의미를 설명하는 콘텐츠 페이지로 인식되게 함.
// 핵심 감정은 /feelings/[slug] 상세 콘텐츠와 내부 링크로 연결한다 (중복 생성 금지).
// 한국어(ko)는 전체 작성, 그 외 로케일은 en 으로 폴백.

export interface InsightRelated {
  slug: string; // → /feelings/[slug]
  name: string;
}

export interface InsightEmotion {
  name: string;
  slug: string; // 감정도감 상세 링크 → /feelings/[slug]
  desc: string; // 300~500자
  related: InsightRelated[];
}

export interface InsightsContent {
  pageTitle: string;
  intro: string; // 상단 설명 (줄바꿈 \n 허용)
  emotionsTitle: string;
  emotions: InsightEmotion[];
  detailLinkLabel: string; // "OO 자세히 보기"의 접미 라벨
  relatedLabel: string; // "관련 감정"
  reasonsTitle: string;
  reasons: { title: string; desc: string }[];
  methodTitle: string;
  methodIntro: string;
  steps: { step: string; desc: string }[];
  ugogiTitle: string;
  ugogiComment: string;
  moreTitle: string; // 허브 섹션 제목
  moreIntro: string;
  readMoreTitle: string; // 이어보기 섹션 제목
}

const ko: InsightsContent = {
  pageTitle: "오늘무드 감정 인사이트",
  intro:
    "오늘무드는 하루의 감정을 기록하고, 감정의 흐름을 조금 더 가볍게 바라보기 위한 감정 기록 서비스입니다.\n아직 개인 기록이 충분하지 않더라도, 아래 내용을 통해 사람들이 자주 경험하는 감정 패턴과 감정 기록의 의미를 확인할 수 있어요. 더 깊이 알고 싶은 감정은 우걱이 감정도감에서 자세한 관찰 기록까지 이어서 볼 수 있습니다.",
  emotionsTitle: "사람들이 자주 기록하는 감정",
  detailLinkLabel: "자세히 보기",
  relatedLabel: "관련 감정",
  emotions: [
    {
      name: "서운함",
      slug: "seounaham",
      desc:
        "서운함은 기대했던 마음이 채워지지 않았을 때 조용히 찾아오는 감정입니다. 누군가에게 더 가까이 다가가고 싶었는데 그만큼의 반응이 돌아오지 않을 때, 마음 한쪽이 슬그머니 비어버리죠. 화를 내기에는 너무 사소하고 그냥 넘기기에는 자꾸 걸려서, 어디에도 두기 애매한 감정입니다. 그래서 서운함은 '이런 걸로 서운해해도 되나' 하는 자기 검열과 함께 말하지 못한 채 안에 쌓이기 쉽습니다. 하지만 쌓인 서운함은 사라지지 않고, 나중에 전혀 다른 일에서 크게 터지거나 관계를 차갑게 만들곤 합니다. 사실 서운함의 뒤에는 '나는 당신을 그만큼 소중하게 생각한다'는 마음이 숨어 있어요. 그러니 서운함이 올라온다면 그 사람이 나에게 의미 있는 존재라는 신호이기도 합니다. 작게라도 한 문장으로 꺼내보는 편이 안에 쌓아두는 것보다 훨씬 가볍습니다.",
      related: [
        { slug: "oerounm", name: "외로움" },
        { slug: "eoguulham", name: "억울함" },
        { slug: "soksangham", name: "속상함" },
      ],
    },
    {
      name: "외로움",
      slug: "oerounm",
      desc:
        "외로움은 혼자 있을 때만 찾아오는 감정이 아닙니다. 사람들 사이에 둘러싸여 있어도 누구와도 진짜로 연결되어 있지 않다고 느낄 때 오히려 더 깊어지죠. 외로움은 '나는 지금 누군가와 마음을 나누고 싶다'는 아주 자연스럽고 건강한 신호입니다. 그런데 우리는 이 감정을 약점처럼 여겨서, 괜찮은 척 더 바빠지거나 혼자임을 증명하듯 사람을 피하기도 합니다. 그렇게 밀어낼수록 마음은 더 멀어지죠. 외로움이 찾아왔을 때 도움이 되는 건, 그것을 억지로 없애려 애쓰는 대신 지금 내가 어떤 연결을 그리워하고 있는지 가만히 들여다보는 일입니다. 깊은 대화를 나눌 한 사람이 그리운 건지, 그냥 누군가 곁에 있어주길 바라는 건지에 따라 필요한 것도 달라지니까요. 외로움은 부끄러운 감정이 아니라, 관계를 향한 마음의 방향을 알려주는 나침반에 가깝습니다.",
      related: [
        { slug: "seounaham", name: "서운함" },
        { slug: "gongheeoham", name: "공허함" },
        { slug: "soksangham", name: "속상함" },
      ],
    },
    {
      name: "무기력",
      slug: "mugiryeok",
      desc:
        "무기력은 마음의 에너지가 바닥났다는 분명한 신호입니다. 하고 싶은 것도 해야 할 것도 멀게만 느껴지고, 평소라면 아무것도 아니던 작은 일조차 거대한 산처럼 다가오죠. 사람들은 종종 이 상태를 게으름이라 오해하며 자신을 다그치지만, 무기력은 게으름과 다릅니다. 오히려 너무 오래, 너무 애써온 마음이 더는 못 가겠다며 잠시 멈춰 선 상태에 가깝습니다. 일종의 방전이고 보호 반응이에요. 이럴 때 '왜 이것밖에 못 하냐'고 몰아붙이면 에너지는 더 빠르게 고갈됩니다. 필요한 건 충전이지 채찍질이 아닙니다. 아주 작은 일 하나만 해내도 충분하다고 스스로에게 허락해주고, 잠깐 쉬어가도 괜찮다고 말해주세요. 무기력은 영원하지 않습니다. 멈춰야 할 때 제대로 멈추는 것도 회복의 한 과정입니다. 오늘 하루쯤 아무것도 해내지 못해도 그건 실패가 아니라, 다시 움직이기 위해 잠시 숨을 고르는 시간일 뿐입니다.",
      related: [
        { slug: "gongheeoham", name: "공허함" },
        { slug: "gwaenchanheuncheok", name: "괜찮은척" },
        { slug: "buran", name: "불안" },
      ],
    },
    {
      name: "불안",
      slug: "buran",
      desc:
        "불안은 아직 일어나지 않은 일을 미리 걱정하는 마음입니다. 머릿속에서는 최악의 시나리오가 반복해서 재생되고, 몸은 까닭 없이 긴장하며 잠을 설치기도 하죠. 불안은 사실 나를 위험에서 지키려는 본능이 조금 과하게 작동하는 상태입니다. 그래서 불안 자체가 나쁜 게 아니라, 그 신호를 어떻게 다루느냐가 중요합니다. '괜찮아질 거야'라는 막연한 위로는 오히려 불안을 더 흐릿하게 만들어 손에 잡히지 않게 합니다. 그보다는 지금 정확히 무엇이 걱정되는지를 구체적인 문장으로 적어보는 편이 도움이 됩니다. 걱정을 글로 꺼내 눈으로 보면 막연했던 두려움이 다룰 수 있는 크기로 줄어들거든요. 그리고 그중 내가 지금 할 수 있는 일과 어차피 어쩔 수 없는 일을 나눠보면, 마음이 한결 가벼워집니다. 불안은 붙잡고 통제하려 할수록 커지지만, 인정하고 적어서 내려놓을수록 다룰 만한 크기로 작아지는 감정입니다.",
      related: [
        { slug: "ginjang", name: "긴장" },
        { slug: "dapdapham", name: "답답함" },
        { slug: "jjajeung", name: "짜증" },
      ],
    },
    {
      name: "짜증",
      slug: "jjajeung",
      desc:
        "짜증은 작은 자극에도 마음이 날카롭게 곤두서는 감정입니다. 별것 아닌 말 한마디, 사소한 소음 하나에도 욱하게 되죠. 그런데 짜증은 그 자체가 진짜 문제인 경우보다, 그 아래 이미 쌓여 있던 피로나 서운함, 불안이 보내는 구조 신호일 때가 훨씬 많습니다. 컵에 물이 가득 차 있으면 한 방울만 더해도 넘치는 것처럼요. 그래서 별일 아닌 일에 자꾸 화가 난다면, 그건 '내 마음이 이미 가득 찼다'는 뜻일 수 있습니다. 이때 짜증을 억지로 누르거나 '예민하게 굴지 말자'고 자책하면 진짜 원인은 그대로 남아 더 자주 터집니다. 더 도움이 되는 건, 짜증 그 자체를 혼내기보다 '내가 지금 많이 지쳐 있구나, 무언가 채워지지 않았구나' 하고 그 아래를 들여다보는 일입니다. 알아차리는 것만으로도 마음의 날이 한결 무뎌집니다. 짜증이 보내는 신호를 무시하지 않고 그 아래 지친 마음을 돌봐주면, 같은 일에 덜 휘둘리는 나를 만나게 됩니다.",
      related: [
        { slug: "buran", name: "불안" },
        { slug: "eoguulham", name: "억울함" },
        { slug: "dapdapham", name: "답답함" },
      ],
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
  moreTitle: "더 많은 감정 인사이트",
  moreIntro:
    "마음에 자주 머무는 감정들을 우걱이 감정도감에서 더 깊이 들여다볼 수 있어요. 궁금한 감정을 눌러 자세한 관찰 기록과 출몰 지역, 정리하는 법까지 확인해 보세요.",
  readMoreTitle: "함께 보면 좋은 콘텐츠",
};

const en: InsightsContent = {
  pageTitle: "ONULMOOD Emotion Insights",
  intro:
    "ONULMOOD is a journaling service for recording the emotions of your day and looking at how your feelings flow a little more lightly.\nEven if you don't have enough personal records yet, the content below helps you see the emotional patterns people experience most often and what it means to record how you feel. For any emotion you want to explore further, you can continue into Ugogi's Emotion Almanac for detailed notes.",
  emotionsTitle: "Emotions people record most often",
  detailLinkLabel: "Read more",
  relatedLabel: "Related emotions",
  emotions: [
    {
      name: "Feeling let down",
      slug: "seounaham",
      desc:
        "This feeling arrives quietly when something we hoped for goes unmet. When we wanted to grow closer to someone but the response we hoped for never came, a small corner of the heart empties out. It's too trivial to be angry about, yet too sticky to brush off, so it has nowhere to go. It tends to pile up unspoken, alongside a quiet self-censoring voice asking 'am I allowed to feel hurt by this?' But the hurt we swallow doesn't vanish — it later erupts over something unrelated, or quietly cools a relationship. Behind it usually hides a truth: 'I care about you this much.' So when it rises, it's a sign that person matters to you. Letting it out in even one sentence is far lighter than storing it inside.",
      related: [
        { slug: "oerounm", name: "Loneliness" },
        { slug: "eoguulham", name: "Unfairness" },
        { slug: "soksangham", name: "Heartache" },
      ],
    },
    {
      name: "Loneliness",
      slug: "oerounm",
      desc:
        "Loneliness isn't a feeling that comes only when we're physically alone. It often deepens precisely when we're surrounded by people yet feel truly connected to no one. Loneliness is a natural, healthy signal saying 'I want to share my heart with someone right now.' Yet we treat it like a weakness — staying busy to look fine, or avoiding people as if to prove we don't need them. The more we push it away, the further the heart drifts. What helps is not forcing it away but quietly noticing what kind of connection you're longing for. Missing one deep conversation is different from simply wanting someone nearby. Loneliness isn't shameful; it's closer to a compass pointing toward the connection your heart is reaching for.",
      related: [
        { slug: "seounaham", name: "Feeling let down" },
        { slug: "gongheeoham", name: "Emptiness" },
        { slug: "soksangham", name: "Heartache" },
      ],
    },
    {
      name: "Lethargy",
      slug: "mugiryeok",
      desc:
        "Lethargy is a clear sign that your inner energy has run dry. What you want to do and what you must do both feel far away, and even a small task you'd normally breeze through looms like a mountain. People often mistake this for laziness and push themselves harder, but lethargy is different. It's closer to a heart that has tried for too long finally stopping to say it can't go on right now — a kind of power outage, a protective response. Scolding yourself with 'why can't I do more' only drains the battery faster. What you need is recharging, not a whip. Give yourself permission that finishing even one tiny thing is enough, and that resting for a while is okay. Lethargy isn't forever; stopping properly when you need to is part of recovery.",
      related: [
        { slug: "gongheeoham", name: "Emptiness" },
        { slug: "gwaenchanheuncheok", name: "Pretending to be fine" },
        { slug: "buran", name: "Anxiety" },
      ],
    },
    {
      name: "Anxiety",
      slug: "buran",
      desc:
        "Anxiety is the mind worrying in advance about things that haven't happened. Worst-case scenarios replay on a loop, the body tenses for no clear reason, and sleep grows thin. Anxiety is really an instinct to protect you from danger working a little too hard. So anxiety itself isn't bad — what matters is how you handle the signal. A vague 'it'll be fine' often makes anxiety blurrier and harder to grasp. It helps more to write down exactly what you're worried about in concrete sentences. Once worry is on the page where your eyes can see it, the vague dread shrinks to a manageable size. And when you sort it into what you can do now versus what's out of your hands, the mind grows noticeably lighter.",
      related: [
        { slug: "ginjang", name: "Tension" },
        { slug: "dapdapham", name: "Frustration" },
        { slug: "jjajeung", name: "Irritation" },
      ],
    },
    {
      name: "Irritation",
      slug: "jjajeung",
      desc:
        "Irritation is when the smallest thing makes your heart go sharp — a trivial word, a minor noise, and you snap. But irritation is far more often a structural signal from the fatigue, hurt, or anxiety already stacked underneath than a real problem in itself. Like a cup already full, one more drop makes it overflow. So if trivial things keep setting you off, it may mean your heart is already full. Suppressing it, or blaming yourself with 'stop being so sensitive,' leaves the real cause untouched, and it erupts more often. What helps more than scolding the irritation is looking beneath it: 'I'm really worn out right now, something hasn't been filled.' Simply noticing that dulls the edge considerably.",
      related: [
        { slug: "buran", name: "Anxiety" },
        { slug: "eoguulham", name: "Unfairness" },
        { slug: "dapdapham", name: "Frustration" },
      ],
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
    { step: "Pick one emotion from today", desc: "Many feelings pass through a day; choose just the one that lingers most. You don't have to sort them all out." },
    { step: "Write briefly why it came up", desc: "You don't need to write long. A single line like 'when I heard that this afternoon' is enough." },
    { step: "Acknowledge it before trying to fix it", desc: "You don't need an answer right now. Acknowledging 'this is how I'm feeling' comes first." },
    { step: "Put it in the shredder and let it go lightly", desc: "Once you've looked at it enough, you no longer have to hold on. Drop it into ONULMOOD's emotion shredder and let it drift away." },
  ],
  ugogiTitle: "Today's note from Ugogi",
  ugogiComment:
    "A feeling isn't homework you have to solve. Sometimes just naming it and setting it down is enough.",
  moreTitle: "More emotion insights",
  moreIntro:
    "You can look more deeply into the emotions that often linger in Ugogi's Emotion Almanac. Tap any emotion to see its detailed observation notes, where it shows up, and how to process it.",
  readMoreTitle: "Good to read next",
};

const CONTENT: Record<string, InsightsContent> = { ko, en };

export function getInsightsContent(locale: string): InsightsContent {
  return CONTENT[locale] ?? en;
}
