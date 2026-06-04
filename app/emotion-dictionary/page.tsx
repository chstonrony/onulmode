import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "우걱이 감정사전 | 오늘무드",
  description: "우걱이 감정사전은 우리가 자주 느끼지만 설명하기 어려운 감정을 하나씩 꺼내어, 가볍고 다정하게 정리해보는 공간입니다. 서운함, 괜찮은 척, 무기력, 공허함 등.",
  keywords: ["감정사전", "서운함", "괜찮은 척", "무기력", "공허함", "외로움", "억울함", "짜증", "질투", "감정 이름 붙이기"],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://onulmood.com/emotion-dictionary",
    title: "우걱이 감정사전 | 오늘무드",
    description: "자주 느끼지만 설명하기 어려운 감정들을 가볍고 다정하게 정리해보는 감정사전.",
    siteName: "오늘무드",
  },
  alternates: { canonical: "https://onulmood.com/emotion-dictionary" },
};

const BG    = "#EDE4D0";
const PAPER = "#F5EFE0";
const LINE  = "#D8CEC0";
const ROSE  = "#C8607A";
const INK   = "#2A2520";
const MUTED = "#A89880";
const DIM   = "#6A6058";

const PROSE: React.CSSProperties = {
  fontFamily: "var(--font-prose)",
  fontWeight: 300,
  lineHeight: 2.0,
  letterSpacing: "-0.01em",
  color: DIM,
};

const EMOTIONS = [
  {
    slug: "seounaham",
    title: "서운함이 오래 남는 이유",
    tag: "서운함",
    intro: "별거 아닌 것 같은데, 왜 이렇게 오래 남아있을까요?",
    body: [
      {
        heading: "이 감정이 생기는 순간",
        text: "읽씹을 당했을 때. 내 말이 무시당한 것 같을 때. 혼자만 기다렸던 것 같을 때. 기대했는데 기억하지 못해준 순간들. 서운함은 대부분 작은 순간에서 시작해요. 큰 싸움이 아니어도, 눈에 띄지 않는 순간들에서도 생겨요.",
      },
      {
        heading: "서운함이 특히 힘든 이유",
        text: "서운함은 경계가 애매한 감정이에요. 화처럼 분명하지도 않고, 슬픔처럼 명확하지도 않아요. 그래서 \"이걸 서운하다고 해도 되나?\" 싶어서 말하지 못하고, \"내가 예민한 건가\"라고 스스로를 검열하게 돼요. 말하지 못한 서운함은 조용히 쌓여요. 처음에는 작은 서운함이었는데, 몇 번이 쌓이고 나면 \"나는 이 사람한테 항상 이런 취급을 받아\"라는 결론으로 가기도 해요.",
      },
      {
        heading: "서운함을 무시하면 생기는 일",
        text: "표현되지 않은 서운함은 관계에 조용히 영향을 줘요. 말이 줄어들거나, 기대를 낮추거나, 어느 순간 거리가 생기거나. 상대방은 이유도 모른 채로요. 또 다른 감정으로 변해서 나오기도 해요. 서운함이 터지지 못하면 나중에 별거 아닌 일에 크게 반응하거나, 반대로 아무 감정도 없어지기도 해요.",
      },
      {
        heading: "오늘무드식 감정 정리",
        text: "서운함을 처리하는 데는 두 방향이 있어요. 하나는 말하는 것. \"나 그때 좀 서운했어\"라고 가볍게 꺼내는 것. 다른 하나는 처리하는 것. 말하기 어렵다면, 그 감정 자체를 꺼내서 보내는 거예요. 우걱이한테 던지거나, 글로 쓰거나, 혼자 말해보거나. 안에 계속 묵혀두지 않는 것이 중요해요.",
      },
    ],
    selfCare: "오늘 말하지 못하고 삼킨 서운함이 있나요? 그 감정에 이름을 붙여보세요.",
    tags: ["서운함", "관계", "감정 억제", "말 못한 감정"],
  },
  {
    slug: "pretending-ok",
    title: "괜찮은 척이 습관이 되었을 때",
    tag: "괜찮은 척",
    intro: "괜찮지 않은데, 왜 괜찮다고 하게 될까요?",
    body: [
      {
        heading: "이 감정이 생기는 순간",
        text: "누군가 \"괜찮아?\"라고 물었을 때 자동으로 \"응, 괜찮아\"가 나오는 순간. 힘든 티를 내기 어려운 상황에서 웃음을 유지하는 순간. 퇴근하고 집에 오면 갑자기 아무것도 하기 싫어지는 저녁. 낮에 잘 버텼는데, 새벽이 되면 작은 말 하나가 계속 생각나는 밤.",
      },
      {
        heading: "괜찮은 척이 습관이 되는 이유",
        text: "솔직하게 말했을 때 돌아온 반응이 좋지 않았던 경험이 있을 수 있어요. \"그것도 힘들어?\", \"다들 그렇게 살아\"라는 말들. 그 말들이 쌓이면 \"굳이 말하지 않는 게 낫다\"는 결론이 생겨요. 또 남한테 짐이 되기 싫어서일 수도 있어요. 관계를 지키려는 노력에서 나온 거예요.",
      },
      {
        heading: "괜찮은 척을 오래 하면 생기는 일",
        text: "가장 무서운 건, 어느 날 자신이 괜찮은 건지 아닌 건지조차 모르게 된다는 거예요. 감각이 둔해져요. 뭔가를 느껴야 하는 상황에서도 아무 감각이 없는 상태. 또 이유 없이 눈물이 나거나, 작은 일에 예민하게 반응하거나, 번아웃이 오기도 해요. 쌓인 감정들이 흘러넘치는 거예요.",
      },
      {
        heading: "오늘무드식 감정 정리",
        text: "괜찮은 척 자체가 나쁜 게 아니에요. 때로는 상황상 필요해요. 다만 그 척이 너무 두꺼워지지 않도록, 어딘가에서는 한 번씩 꺼낼 수 있으면 좋아요. 말로든, 글로든, 우걱이한테 던지는 방식으로든. 하루에 한 번, 괜찮지 않다는 걸 스스로에게 인정하는 것부터 시작해봐요.",
      },
    ],
    selfCare: "오늘 '괜찮아'라고 말했지만, 실제로는 괜찮지 않았던 순간이 있었나요?",
    tags: ["괜찮은 척", "감정 억제", "번아웃", "자기 돌봄"],
  },
  {
    slug: "annoyance",
    title: "짜증은 사실 피곤함의 신호일 수 있습니다",
    tag: "짜증",
    intro: "갑자기 왜 이렇게 짜증이 날까요? 대부분은 다른 이유가 있어요.",
    body: [
      {
        heading: "이 감정이 생기는 순간",
        text: "별거 아닌 일에 갑자기 짜증이 솟구칠 때. 평소엔 괜찮았던 것들이 갑자기 거슬릴 때. 누군가 말을 걸어주는 게 부담스러울 때. 작은 실수에 스스로 화가 날 때. 이유를 모르는 채 그냥 기분이 나쁠 때.",
      },
      {
        heading: "짜증의 진짜 원인",
        text: "짜증은 종종 다른 감정의 신호예요. 피곤함이 쌓였을 때, 수면이 부족할 때, 오랫동안 감정을 억눌렀을 때 짜증이라는 형태로 나와요. 또 두려움이나 불안이 짜증으로 변하기도 해요. \"통제할 수 없는 상황에 놓였다\"는 느낌이 올 때 특히 그래요. 짜증이 자주 올라온다면, \"나 지금 뭔가 감당하기 어려운 게 있구나\"라는 신호로 읽어봐요.",
      },
      {
        heading: "짜증을 무시하면 생기는 일",
        text: "표현 못 한 짜증은 나중에 더 크게 터지거나, 반대로 무감각 상태로 이어질 수 있어요. 또 주변 사람들에게 무의식 중에 흘러나오기도 해요. 집에 와서 가족한테 괜히 날이 서거나, 아무것도 안 했는데 너무 피곤한 느낌. 이게 다 처리되지 않은 짜증과 피로가 넘치는 거예요.",
      },
      {
        heading: "오늘무드식 감정 정리",
        text: "짜증이 올라올 때 바로 반응하지 않는 것이 중요해요. 10초만 참아도 충동적인 반응을 막을 수 있어요. 그 다음엔 짜증 아래에 있는 감정을 찾아봐요. 피곤함인지, 두려움인지, 억울함인지. 그 원인을 알면 짜증을 다루기가 훨씬 쉬워져요. 몸을 움직이는 것도 도움이 돼요. 짜증은 에너지이기 때문에 몸으로 소모하면 강도가 줄어들어요.",
      },
    ],
    selfCare: "오늘 짜증이 났던 순간, 그 아래에 어떤 감정이 있었을까요?",
    tags: ["짜증", "피로", "감정 신호", "자기 인식"],
  },
  {
    slug: "blue-day",
    title: "이유 없이 울적한 날",
    tag: "울적함",
    intro: "특별한 이유가 없는데 기분이 가라앉는 날. 이상한 게 아니에요.",
    body: [
      {
        heading: "이 감정이 생기는 순간",
        text: "평일 오후 3시쯤, 갑자기 아무것도 하기 싫어지는 순간. 주말인데 이상하게 공허한 날. 이유를 설명할 수 없는데 그냥 기분이 안 좋은 날. 좋아하는 것도 딱히 하고 싶지 않은 날.",
      },
      {
        heading: "이유 없이 울적한 날이 생기는 이유",
        text: "\"이유 없이\"라고 느끼지만, 대부분은 이유가 있어요. 수면 부족, 날씨, 호르몬 변화, 오랫동안 버텨온 것들이 쌓인 것. 특별한 사건 없이도 감정은 내려앉을 수 있어요. 뇌가 에너지를 아끼려고 \"지금은 아무것도 하지 않아도 돼\"라고 보내는 신호일 때도 있어요.",
      },
      {
        heading: "이 감정을 무시하면 생기는 일",
        text: "\"별거 아니야\"라고 억지로 털어내려 하면 오히려 더 오래 가는 경우가 있어요. 이유 없이 울적한 날을 그냥 \"그런 날이구나\"라고 인정해주지 않으면, 그 감정이 안에서 더 눌려요. 충분히 인정하지 않은 채로 계속 쌓이면 번아웃으로 이어지기도 해요.",
      },
      {
        heading: "오늘무드식 감정 정리",
        text: "이유 없이 울적한 날에는 그 이유를 찾으려 하지 않아도 돼요. 그냥 \"오늘은 그런 날이야\"라고 인정하는 것. 억지로 기분을 올리려 하지 않아도 돼요. 아주 작고 감각적인 것 하나만 해보는 거예요. 따뜻한 음료 한 잔, 좋아하는 노래 한 곡. 크게 느끼려는 게 아니라, 아주 작은 감각 하나를 의도적으로 경험하는 거예요.",
      },
    ],
    selfCare: "오늘 기분이 가라앉아 있다면, 지금 당장 나에게 줄 수 있는 작은 것 하나는 무엇인가요?",
    tags: ["울적함", "무기력", "감정 변화", "자기 돌봄"],
  },
  {
    slug: "loneliness",
    title: "외로움은 이상한 감정이 아닙니다",
    tag: "외로움",
    intro: "사람들 사이에 있어도 외롭고, 혼자 있어도 외로운 날들에 대해.",
    body: [
      {
        heading: "이 감정이 생기는 순간",
        text: "단체 채팅방에서 대화가 오가는데 끼지 못하는 느낌. 힘든 일이 있는데 \"이걸 누구한테 말하지?\"가 떠오를 때. SNS에서 남들은 다 잘 지내는 것 같을 때. 또는 누군가와 함께 있는데도 뭔가 연결이 안 되는 느낌.",
      },
      {
        heading: "외로움의 종류",
        text: "혼자 있다고 외로운 게 아니에요. 혼자 있으면서 충전되고 편안한 시간이 있어요. 반면 사람들 가운데 있으면서도 외로울 수 있어요. 진짜 연결되어 있지 않다는 느낌, 내 이야기를 제대로 들어주는 사람이 없다는 느낌. 이게 진짜 외로움이에요. 외로움을 느끼는 건 당신이 연결을 원하고 진심으로 함께하길 바란다는 뜻이에요.",
      },
      {
        heading: "외로움을 무시하면 생기는 일",
        text: "외로움을 계속 억누르면 더 강해지는 경우가 있어요. 또 연결에 대한 욕구가 충족되지 않으면 자존감이 낮아지거나, 관계에서 더 예민해지거나, 번아웃으로 이어지기도 해요. 외로움이 익숙해지면 연결을 시도하는 것 자체를 포기하게 될 수도 있어요.",
      },
      {
        heading: "오늘무드식 감정 정리",
        text: "외로움은 사람을 많이 만난다고 해결되지 않아요. 표면적인 만남보다 진짜 연결이 중요해요. 지금 당장 깊은 관계가 없다면, 자신과의 연결부터 시작해봐요. 오늘 내가 어떤 감정이었는지, 무엇이 힘들었는지 잠깐 들여다보는 것. 자기 자신에게 관심을 갖는 것도 연결의 시작이에요.",
      },
    ],
    selfCare: "오늘 진심으로 연결됐다고 느낀 순간이 있었나요? 없었다면, 지금 나에게 필요한 연결은 어떤 종류인가요?",
    tags: ["외로움", "연결", "관계", "자기 이해"],
  },
  {
    slug: "unfairness",
    title: "억울함이 마음에 남는 이유",
    tag: "억울함",
    intro: "분명히 내가 잘못한 게 아닌데, 그 마음이 오래 남아요.",
    body: [
      {
        heading: "이 감정이 생기는 순간",
        text: "내 말이 제대로 들려지지 않았을 때. 잘못한 게 없는데 나쁜 사람이 된 것 같을 때. 상대방이 자기 방식대로만 결론을 내렸을 때. 노력했는데 인정받지 못했을 때. 억울함에는 \"내가 옳다\"는 확신과 \"그런데 인정받지 못했다\"는 좌절이 섞여 있어요.",
      },
      {
        heading: "억울함이 오래 남는 이유",
        text: "억울함은 쉽게 해소되지 않는 감정이에요. 화는 터뜨리면 어느 정도 풀리고, 슬픔은 울면 가벼워지는데, 억울함은 상대방이 인정해주지 않는 한 완전히 해소되지 않는 구조예요. 그래서 뇌가 계속 그 상황을 반추하게 돼요. \"그때 이렇게 말했어야 했는데\"라는 생각이 반복되는 게 그 이유예요.",
      },
      {
        heading: "억울함을 무시하면 생기는 일",
        text: "처리되지 않은 억울함은 분노로 변하거나, 상대방에 대한 냉랭함으로 나오기도 해요. 오래 쌓이면 그 사람, 그 상황 자체가 싫어지는 결론으로 가기도 해요. 또 억울함이 자책으로 바뀌는 경우도 있어요. \"내가 뭔가 잘못한 건 아닐까\"라는 의심으로요.",
      },
      {
        heading: "오늘무드식 감정 정리",
        text: "억울함을 처리하는 첫 단계는 \"이 억울함이 진짜다\"라고 인정하는 거예요. 예민한 게 아니에요. 억울한 게 억울한 거예요. 그 다음엔 내가 바꿀 수 없는 것과 바꿀 수 있는 것을 구분해봐요. 상대방의 인식을 바꾸는 건 내 통제 밖이에요. 에너지를 그쪽에 쏟으면 더 힘들어져요. 지금 이 억울함을 어떤 방식으로든 꺼내는 것, 그게 시작이에요.",
      },
    ],
    selfCare: "지금 마음에 남아있는 억울함이 있나요? 그 억울함이 나에게 무엇을 알려주고 있을까요?",
    tags: ["억울함", "감정 처리", "자기 인정", "관계"],
  },
  {
    slug: "lethargy",
    title: "무기력한 날 나를 몰아붙이지 않는 법",
    tag: "무기력",
    intro: "아무것도 하기 싫은 날, 그게 게으름이 아닐 수 있어요.",
    body: [
      {
        heading: "이 감정이 생기는 순간",
        text: "해야 할 것들이 있는데 시작이 안 되는 날. 좋아하는 것도 하기 싫은 날. 그냥 누워있고 싶은데 누워있어도 쉬어지지 않는 날. 뭔가를 해야 한다는 건 아는데 몸이 움직이지 않는 날.",
      },
      {
        heading: "무기력이 생기는 이유",
        text: "무기력은 게으름이 아니에요. 오랫동안 너무 많이 줬거나, 오랫동안 혼자 버텨왔거나, 감정이 소진됐을 때 뇌가 보호 모드로 들어가는 거예요. 번아웃의 초기 단계이기도 하고, 오래 억눌렀던 감정이 쌓인 결과이기도 해요. 의지력 문제가 아니에요. 에너지가 바닥난 거예요.",
      },
      {
        heading: "무기력할 때 나를 몰아붙이면 생기는 일",
        text: "\"이러면 안 돼, 해야 해\"라고 억지로 밀어붙이면 오히려 더 깊은 무기력으로 빠지는 경우가 많아요. 에너지가 없는 상태에서 억지로 하면 더 빨리 소진돼요. 자책이 더해지면서 무기력이 우울로 이어지기도 해요.",
      },
      {
        heading: "오늘무드식 감정 정리",
        text: "무기력한 날에는 \"오늘은 이게 나의 상태야\"라고 인정하는 것부터 시작해요. 억지로 생산적으로 되려 하지 않아도 돼요. 지금 할 수 있는 아주 작은 것 하나만 해봐요. 물 한 잔 마시거나, 창문 열기, 5분 산책. 크게 뭔가를 하는 게 아니라 몸을 조금씩 움직이는 것. 무기력에서 빠져나오는 건 행동으로 시작해요.",
      },
    ],
    selfCare: "오늘 무기력하다면, 지금 이 순간 할 수 있는 가장 작은 행동 하나는 무엇인가요?",
    tags: ["무기력", "번아웃", "자기 돌봄", "회복"],
  },
  {
    slug: "jealousy",
    title: "질투가 올라올 때 마음을 보는 법",
    tag: "질투",
    intro: "질투는 나쁜 감정이 아니에요. 내가 원하는 것을 알려주는 신호예요.",
    body: [
      {
        heading: "이 감정이 생기는 순간",
        text: "SNS에서 친구의 성공 소식을 봤을 때. 나보다 잘 되는 사람을 봤을 때. 내가 원했던 것을 다른 사람이 가졌을 때. 또는 소중한 사람이 다른 누군가와 더 잘 지내는 것 같을 때.",
      },
      {
        heading: "질투가 알려주는 것",
        text: "질투는 나쁜 감정이 아니에요. 질투는 \"내가 저걸 원한다\"는 신호예요. 누군가의 승진을 질투한다면, 나도 인정받고 싶다는 욕구가 있는 거예요. 누군가의 관계를 질투한다면, 나도 그런 연결을 원한다는 거예요. 질투하는 대상이 무엇인지 들여다보면, 나에게 진짜 중요한 게 무엇인지 알 수 있어요.",
      },
      {
        heading: "질투를 무시하면 생기는 일",
        text: "\"질투하면 안 돼\"라고 억누르면 오히려 더 강해지는 경우가 있어요. 또 질투가 상대방에 대한 부정적인 감정으로 변하거나, 자기 자신에 대한 열등감으로 이어지기도 해요. 질투를 인정하지 않으면 그 에너지가 어딘가로 흘러나와요.",
      },
      {
        heading: "오늘무드식 감정 정리",
        text: "질투가 올라올 때, 그 감정을 먼저 인정해봐요. \"나 지금 질투하고 있구나\"라고요. 그 다음엔 \"내가 저 사람의 무엇을 원하는 걸까?\"를 물어봐요. 그 욕구를 어떻게 나만의 방식으로 채울 수 있을지 생각해보는 게 질투를 건강하게 다루는 방법이에요.",
      },
    ],
    selfCare: "최근 누군가를 질투했다면, 그 질투가 나에게 무엇을 원한다고 알려주고 있나요?",
    tags: ["질투", "욕구", "자기 이해", "비교"],
  },
  {
    slug: "emptiness",
    title: "공허함이 찾아오는 밤",
    tag: "공허함",
    intro: "뭔가 해냈는데, 또는 별일 없었는데, 이상하게 비어있는 느낌.",
    body: [
      {
        heading: "이 감정이 생기는 순간",
        text: "오래 목표했던 것을 이뤘는데 이상하게 기쁘지 않은 순간. 바쁘게 살았는데 갑자기 멈추면 찾아오는 허전함. 새벽에 혼자 있을 때 밀려오는 이유 없는 공허함. 뭔가를 채워야 할 것 같은데 뭘 채워야 할지 모르는 느낌.",
      },
      {
        heading: "공허함이 생기는 이유",
        text: "공허함은 \"의미\"가 필요하다는 신호예요. 바쁘게 살면서 정작 내가 원하는 것, 중요하게 생각하는 것과 멀어졌을 때 오는 경우가 많아요. 또 오랫동안 다른 사람이나 상황에 집중하다 보면, \"나는 지금 뭘 원하지?\"라는 감각을 잃게 돼요. 그 빈자리가 공허함이에요.",
      },
      {
        heading: "공허함을 무시하면 생기는 일",
        text: "공허함을 무시하거나 억지로 채우려 하면 일시적으로는 괜찮아 보이지만, 근본적인 부분이 해결되지 않아요. 과식, 과음, 과도한 SNS나 쇼핑으로 채우려 하면 더 깊은 공허함으로 이어지기도 해요.",
      },
      {
        heading: "오늘무드식 감정 정리",
        text: "공허함이 찾아올 때 바로 채우려 하지 않아도 돼요. 먼저 \"지금 나는 공허하구나\"라고 인정해봐요. 그 다음엔 \"최근에 뭔가 의미 있다고 느낀 순간이 있었나?\"를 물어봐요. 아주 작은 것이라도 괜찮아요. 그 실마리에서 시작하는 거예요.",
      },
    ],
    selfCare: "오늘 공허함이 느껴진다면, 최근 '충분히 의미 있다'고 느낀 순간은 언제였나요?",
    tags: ["공허함", "의미", "자기 탐색", "새벽 감정"],
  },
  {
    slug: "naming-emotions",
    title: "감정에 이름을 붙이는 연습",
    tag: "감정 이름",
    intro: "막연하게 '힘들어'보다, 더 정확한 이름을 붙일 수 있어요.",
    body: [
      {
        heading: "왜 감정에 이름을 붙여야 할까요",
        text: "감정에 이름을 붙이는 것만으로도 뇌의 스트레스 반응이 줄어든다는 연구가 있어요. 막연하게 \"힘들어\"인 것이 \"오늘 무시당한 것 같아서 억울해\"로 구체화되면, 처리하기가 훨씬 쉬워져요. 이름이 붙으면 \"이게 어디서 왔는지\", \"이걸 어떻게 할지\"가 보이기 시작해요.",
      },
      {
        heading: "흔히 혼동되는 감정들",
        text: "많은 사람들이 \"화났어\"라고 하지만, 실제로는 서운함이거나 억울함이거나 두려움인 경우가 많아요. \"그냥 힘들어\"는 피로인지, 슬픔인지, 무기력인지 구분할 필요가 있어요. 더 정확한 이름을 붙일수록, 그 감정을 다루는 방법도 달라져요.",
      },
      {
        heading: "감정 이름 붙이기를 안 하면 생기는 일",
        text: "막연한 불편함은 안에서 계속 맴돌아요. 이름이 없으면 처리하기도 어렵고, 표현하기도 어렵고, 상대방에게 설명하기도 어려워요. 오랫동안 이름 없는 감정들이 쌓이면 번아웃이나 감정 무감각으로 이어질 수 있어요.",
      },
      {
        heading: "오늘무드식 감정 정리",
        text: "지금 이 순간 내가 느끼는 감정의 이름을 하나 골라봐요. 기쁨, 슬픔, 분노, 두려움, 서운함, 억울함, 무기력, 공허함, 외로움, 불안, 설렘, 감사. 딱 맞는 이름이 없어도 괜찮아요. 가장 가까운 것을 골라보는 것만으로도 충분해요. 그 이름 하나가 감정 기록의 시작이에요.",
      },
    ],
    selfCare: "지금 이 순간 내 감정의 이름은 무엇인가요? 딱 하나만 골라봐요.",
    tags: ["감정 이름", "감정 라벨링", "자기 인식", "감정 기록"],
  },
];

export default function EmotionDictionaryPage() {
  return (
    <div style={{ background: BG, minHeight: "100vh" }}>
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "48px 22px 100px" }}>

        <Link href="/" style={{ ...PROSE, fontSize: 13, color: MUTED, textDecoration: "none", display: "inline-block", marginBottom: 40 }}>
          ← 오늘무드
        </Link>

        {/* 헤더 */}
        <div style={{ marginBottom: 52 }}>
          <p style={{ fontSize: 10, color: ROSE, fontFamily: "monospace", letterSpacing: "0.16em", marginBottom: 12 }}>
            EMOTION DICTIONARY — 우걱이 감정사전
          </p>
          <h1 style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: "clamp(22px, 5vw, 30px)", color: INK, lineHeight: 1.45, letterSpacing: "-0.025em", marginBottom: 18 }}>
            우걱이 감정사전
          </h1>
          <p style={{ ...PROSE, fontSize: 15 }}>
            우걱이 감정사전은 우리가 자주 느끼지만 설명하기 어려운 감정을 하나씩 꺼내어, 가볍고 다정하게 정리해보는 공간입니다. 이름을 붙이면 조금 가벼워져요.
          </p>
        </div>

        <div style={{ borderTop: `1px solid ${LINE}`, marginBottom: 48 }} />

        {/* 감정 목록 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {EMOTIONS.map((emotion, idx) => (
            <article key={emotion.slug} style={{ borderBottom: `1px solid ${LINE}`, padding: "40px 0" }}>
              {/* 아티클 헤더 */}
              <div style={{ marginBottom: 32 }}>
                <span style={{ fontSize: 10, color: ROSE, fontFamily: "monospace", letterSpacing: "0.14em", marginBottom: 8, display: "block" }}>
                  {String(idx + 1).padStart(2, "0")} — {emotion.tag}
                </span>
                <h2 style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: "clamp(18px, 4vw, 22px)", color: INK, lineHeight: 1.4, letterSpacing: "-0.025em", marginBottom: 10 }}>
                  {emotion.title}
                </h2>
                <p style={{ ...PROSE, fontSize: 14, color: MUTED, fontStyle: "italic" }}>{emotion.intro}</p>
              </div>

              {/* 본문 섹션들 */}
              {emotion.body.map((section, i) => (
                <div key={i} style={{ marginBottom: 24 }}>
                  <h3 style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 15, color: INK, letterSpacing: "-0.02em", marginBottom: 10 }}>
                    {section.heading}
                  </h3>
                  <p style={{ ...PROSE, fontSize: 14 }}>{section.text}</p>
                </div>
              ))}

              {/* 자기돌봄 질문 */}
              <div style={{ background: `${ROSE}08`, border: `1px dashed ${LINE}`, borderRadius: 4, padding: "16px 18px", marginBottom: 20 }}>
                <p style={{ fontSize: 10, color: ROSE, fontFamily: "monospace", letterSpacing: "0.12em", marginBottom: 8 }}>
                  오늘의 자기돌봄 질문
                </p>
                <p style={{ fontFamily: "var(--font-maru)", fontWeight: 400, fontSize: 14, color: INK, lineHeight: 1.8, letterSpacing: "-0.02em" }}>
                  {emotion.selfCare}
                </p>
              </div>

              {/* 태그 */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {emotion.tags.map(tag => (
                  <span key={tag} style={{ fontSize: 11, color: MUTED, border: `1px solid ${LINE}`, padding: "3px 10px", borderRadius: 20, fontFamily: "var(--font-prose)", fontWeight: 300 }}>
                    #{tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* 하단 CTA */}
        <div style={{ marginTop: 52, background: PAPER, border: `1px solid ${LINE}`, borderRadius: 6, padding: "32px 26px", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-maru)", fontWeight: 600, fontSize: 18, color: INK, letterSpacing: "-0.02em", marginBottom: 10 }}>
            오늘의 감정,<br />파쇄해볼까요?
          </p>
          <p style={{ ...PROSE, fontSize: 13, marginBottom: 24 }}>
            우걱이가 받아드립니다.
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/release" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: ROSE, color: "#F5EFE0", padding: "11px 24px", borderRadius: 4, fontSize: 14, fontFamily: "var(--font-maru)", fontWeight: 600, textDecoration: "none" }}>
              감정 파쇄하러 가기
            </Link>
            <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: PAPER, border: `1px solid ${LINE}`, color: INK, padding: "11px 24px", borderRadius: 4, fontSize: 14, fontFamily: "var(--font-maru)", fontWeight: 500, textDecoration: "none" }}>
              감정 이야기 읽기
            </Link>
          </div>
        </div>

        {/* 면책 문구 */}
        <div style={{ marginTop: 24, padding: "14px 16px", background: "rgba(42,37,32,0.04)", border: `1px dashed ${LINE}`, borderRadius: 4 }}>
          <p style={{ fontSize: 11, color: MUTED, fontFamily: "var(--font-prose)", fontWeight: 300, lineHeight: 1.8 }}>
            이 글은 감정을 쉽게 이해하고 기록하기 위한 콘텐츠입니다. 의학적 진단이나 상담을 대신하지 않습니다.
          </p>
        </div>

      </div>
    </div>
  );
}
