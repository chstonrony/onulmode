/* ─────────────────────────────────────────────────────────────────
   블로그 아티클 다국어 번역
   - en: 완전 번역 (제목 + 설명 + 본문)
   - ja / es / zh: 메타데이터 번역 (제목 + 설명). 본문은 영어 폴백.
   ───────────────────────────────────────────────────────────────── */

export interface ArticleTranslation {
  title: string;
  description: string;
  content?: string;
}

export type ArticleLocaleData = {
  en: ArticleTranslation;
  ja: Omit<ArticleTranslation, "content">;
  es: Omit<ArticleTranslation, "content">;
  zh: Omit<ArticleTranslation, "content">;
};

export const ARTICLE_TRANSLATIONS: Record<string, ArticleLocaleData> = {

  "burnout-what-to-do": {
    en: {
      title: "When You're Exhausted — What to Do When Burnout Hits",
      description: "Nothing feels worth doing, and even your favorite things feel like chores. Burnout is real. Here's what you can actually do.",
      content: `There are days when you don't want to get out of bed. When eating, working, even the things you used to love feel like obligations. If it lasts a day or two, it's probably just fatigue. If it goes on for a week or more, something else might be going on.

Burnout doesn't arrive all at once. It builds slowly over months — from pushing too hard, not resting, suppressing your emotions. Then one day it just hits you: "I want to quit everything." But the warning signs were there long before that moment.

**Signs of Burnout**

Does getting out of bed feel heavier than usual? Do things you used to love now feel like obligations? Do you want to avoid people, but being alone doesn't feel restful either? These are all signs of burnout.

Burnout isn't a lack of willpower. It's evidence that you've been working hard. It's just expressing itself in a harmful direction, and it's not your fault.

**Things That Help When Burnout Hits**

First: admit that you're exhausted. Instead of repeating "I'm fine," try saying "I'm struggling right now." Acknowledging it is often the fastest path to recovery.

Second: cut your to-do list. Step back from the pressure of having to do everything right now. Keeping just three important things and pushing the rest to tomorrow isn't irresponsible — it's self-protection.

Third: take care of your body. Burnout hits sleep first. Building a routine around consistent sleep and wake times helps calm the nervous system over time.

Fourth: let emotions out. You can talk to someone, write it down, or just let go of it. Keeping everything bottled up inside only makes it heavier.

**Recovery Takes Time**

Burnout doesn't heal in a day. Resting doesn't immediately refill your energy. Recovery needs time, and during that time, it's okay to do a little less.

If you're exhausted right now, let go of the expectation to do everything perfectly today. Just getting through the day is enough. That's actually something worth being proud of.`,
    },
    ja: { title: "疲れたときに読む — バーンアウトが来たらどうする", description: "何もしたくなくて、好きなことさえも義務に感じる日。バーンアウトとは何か、そして実際にできることについて。" },
    es: { title: "Cuando estás agotado — Qué hacer cuando llega el burnout", description: "Cuando nada vale la pena y hasta tus cosas favoritas se sienten como obligaciones. El burnout es real. Esto es lo que puedes hacer." },
    zh: { title: "累到极点时 — 倦怠来临时该怎么办", description: "什么都不想做，连喜欢的事情也感觉像义务。倦怠是真实存在的，这里是你实际可以做的事情。" },
  },

  "unspoken-emotions": {
    en: {
      title: "Emotions You Couldn't Say — How to Handle Them",
      description: "You had something to say but couldn't. That emotion doesn't disappear just because you stayed quiet.",
      content: `You had something to say. You couldn't say it. The moment passed, and now there's no opening to bring it up. But the feeling is still there inside you.

**Why We Can't Speak**

Maybe you were worried it would create tension. Maybe you didn't want to hurt the other person. Maybe you thought you'd seem too sensitive. So you swallowed it.

We swallow emotions dozens of times a day. Small hurts, irritations, feelings of injustice. When they pile up, at some point you either explode without knowing why — or you become completely numb to feeling anything.

**Where Suppressed Emotions Go**

Unexpressed emotions don't disappear. They get stored somewhere. Sometimes in the body. Sometimes they surface unexpectedly — tears for no reason, anger at something totally unrelated. That's why.

**Things You Can Do Instead of Saying It**

If you couldn't say it, you need to release it another way.

Try writing it down. You don't have to send it. Just writing "I felt hurt by that" can help you process the emotion. Write it and throw it away. The physical act of discarding actually helps.

Or say it out loud somewhere private. "I was really frustrated that day." Saying it to no one in particular can still help organize and release the feeling.

**It's Not Your Fault That You Didn't Say It**

You were protecting the relationship. The situation didn't allow for it. Don't be too hard on yourself for that choice.

What matters is not leaving the emotion to fester inside. Getting it out in some form — that's how you take care of yourself.`,
    },
    ja: { title: "言えなかった感情、どうすればいい", description: "言いたいことがあったのに言えなかった。黙っていたからといって、その感情は消えません。" },
    es: { title: "Emociones que no pudiste decir — Cómo manejarlas", description: "Tenías algo que decir pero no pudiste. Esa emoción no desaparece porque te hayas quedado callado." },
    zh: { title: "说不出口的情绪 — 怎么处理它们", description: "有话想说却没说出来。沉默并不会让那种感觉消失。" },
  },

  "mz-emotion-expression": {
    en: {
      title: "Why It's Hard for Millennials and Gen Z to Express Emotions",
      description: "Showing emotion feels like weakness. Hiding it makes you rot inside. The emotional expression dilemma of our generation.",
      content: `Showing emotion feels like weakness. Not showing it makes you rot inside. This dilemma — if you're a Millennial or Gen Z — you've probably felt it at least once.

**Why Emotional Expression Is Difficult**

We're a generation that feels awkward saying "I'm struggling." The fear: "If I admit it, they'll just say 'everyone struggles' or 'you can't even handle that?'"

There's pressure on social media to always appear happy and put-together. We post only the good moments and never send the hard stuff even in DMs. Eventually, when things actually get hard, we've forgotten how to ask for help.

**What Happens When You Can't Express Emotions**

The body reacts. Unexplained headaches, indigestion, sleep problems. These are physical symptoms of emotions that couldn't be processed.

Emotions also get distorted. Unexpressed sadness comes out as anger. Unspoken hurt comes out as coldness toward the other person. And you don't even know why you're acting that way.

**But We Are Expressing**

Millennials and Gen Z have developed their own ways of expressing emotions. Memes, viral phrases, slang like "I'm exhausted," "full burnout," "I'm just done." These are actually emotional expression. It's indirect, with some distance — but it's still expression.

That's not inherently bad. It's just that sometimes it's not enough.

**Practicing Small Expressions**

If full honesty feels too hard, you can start smaller. Just "I'm a little tired today." Or "I'm not feeling great, no particular reason." That already counts as expressing yourself.

Expressing emotions isn't weakness. It's evidence that you understand your own state clearly. And that's actually a healthier way to exist in relationships.`,
    },
    ja: { title: "MZ世代が感情表現を難しいと感じる理由", description: "表現すると弱く見えるし、しないと内側から腐ってしまう。私たちの世代の感情表現のジレンマ。" },
    es: { title: "Por qué es difícil para los Millennials y Gen Z expresar emociones", description: "Mostrar emociones parece debilidad. Ocultarlas te pudre por dentro. El dilema de expresión emocional de nuestra generación." },
    zh: { title: "为什么千禧一代和Z世代难以表达情绪", description: "表达情绪感觉像软弱。隐藏情绪又会让人从内部腐烂。我们这一代的情绪表达困境。" },
  },

  "how-to-release-unfairness": {
    en: {
      title: "How to Let Go of Feeling Wronged",
      description: "It clearly wasn't your fault, but somehow you became the bad person. What to do with that feeling of injustice.",
      content: `It clearly wasn't your fault, but somehow you ended up looking like the bad person. Your words weren't heard properly. The other person drew conclusions on their own. That feeling of wrongness — where do you put it?

**Why Injustice Hurts So Much**

Anger and sadness at least have ways to process them. But injustice is different. It carries both "I'm right" and "I wasn't recognized for it." Because there's no resolution, you end up mentally replaying that moment over and over.

"I should have said it this way." "Why do I only get treated like this." This loop is a hallmark of feeling wronged.

**What You Need to Get Through It**

First: acknowledge that the feeling is valid. You don't need to wonder "am I just being sensitive?" You felt wronged, and that's real.

Second: separate what you can and can't control. Changing the other person's perception is outside your control. Putting energy into that only amplifies the injustice.

Third: get the emotion out somehow. Write down the situation, or just tell yourself "I was wronged then." Naming the emotion as real — that alone lightens it a little.

**Even If It Doesn't Disappear**

Injustice doesn't go away easily. And even if it doesn't, you don't have to stay trapped in it.

Processing injustice doesn't mean forgetting it. It means putting some distance between yourself and the emotion so it doesn't consume your entire day. Right now, setting it down for just a moment is enough.`,
    },
    ja: { title: "억울함を手放す方法", description: "明らかに自分は悪くないのに、なぜか悪者になってしまった。その理不尽さをどう処理するか。" },
    es: { title: "Cómo soltar el sentimiento de injusticia", description: "Claramente no fue tu culpa, pero de alguna manera terminaste pareciendo el malo. Qué hacer con esa sensación de injusticia." },
    zh: { title: "如何释放委屈感", description: "明明不是自己的错，却莫名其妙成了坏人。那种委屈感应该怎么处理。" },
  },

  "loneliness-and-alone-time": {
    en: {
      title: "Loneliness and Alone Time — They're Not the Same",
      description: "You feel lonely with people around, and even being alone doesn't help. What's really going on?",
      content: `You feel lonely around people, and even being alone doesn't feel restful. What do you do with this?

**The Difference Between Loneliness and Solitude**

Being alone doesn't always mean being lonely. There's alone time where you recharge — feeling free, comfortable, without needing anyone. That's not loneliness. That's your own space.

On the other hand, you can feel deeply lonely in a crowd. When you're surrounded by people but feel no real connection. When there's no one who really listens. That's true loneliness.

**When Loneliness Gets Louder**

When everyone on social media seems to be living well. When messages are flying in a group chat but you have nothing to add. When something hard happens and you realize: "Who would I even tell this to?"

Loneliness surges in moments like these.

**How to Work with Loneliness**

More socializing doesn't fix loneliness. More surface-level meetups while the inner disconnection remains can actually make it worse.

Real connection comes from depth. One person you can truly talk to is more effective against loneliness than a dozen acquaintances. And if that person doesn't exist right now — it's okay to start with yourself. Checking in on how you felt today, what made it good or bad. Paying attention to yourself is also the beginning of connection.

**Being Alone Isn't a Problem**

Society always emphasizes connection. Being alone seems like something must be wrong. But being comfortable with your own company is actually remarkable.

Feeling lonely means you want relationships, and you want to truly connect. That's not weakness. That's a deeply human need.`,
    },
    ja: { title: "孤独感と一人の時間 — 同じではない", description: "人といても孤独で、一人でいても休まらない。本当に何が起きているのか。" },
    es: { title: "Soledad y tiempo a solas — No son lo mismo", description: "Te sientes solo rodeado de gente y ni estar solo ayuda. ¿Qué está pasando realmente?" },
    zh: { title: "孤独感和独处时间 — 它们不是一回事", description: "在人群中感到孤独，独处时也无法放松。到底发生了什么？" },
  },

  "diary-vs-disposal": {
    en: {
      title: "Emotion Journal vs. Dumping Emotions — Which Is Right for You?",
      description: "Recording your emotions isn't always the answer. Sometimes just throwing them away works better.",
      content: `Different people process emotions differently. Some meticulously journal to sort through feelings. Others need to just explode and move on. Which is better?

**The Benefits of Emotion Journaling**

Journaling helps you find patterns. Which situations hit you hardest? Which emotions keep recurring? You start to understand yourself — "I get particularly weak in these conditions."

Writing also gives formless feelings a shape. "I feel bad" becomes "I felt wronged when my words were dismissed in that meeting" — when it gets specific, it becomes much easier to process.

**The Downsides of Journaling**

Recorded things can be revisited. That's sometimes a problem. A fully resolved moment gets reopened when you reread the journal, and sometimes it functions like a trauma trigger.

And journaling requires consistency — writing when you're already exhausted starts to feel like homework.

**The Benefits of Just Dumping**

Dumping is simple. Release the emotion that's here right now. No analyzing, no trying to understand — just get it out and let it go.

Some emotions don't need to be understood. They're just hard. Trying to analyze and find patterns for everything can actually make things more complicated. Sometimes "I was annoyed today, now it's gone" and that's that — that's actually healthier.

**Different People, Different Needs**

Analytical types tend to do better with journaling. People who need immediate relief tend to do better with dumping. And the same person can need different things at different times.

What matters is not leaving emotions sitting inside you. Processed or unprocessed, getting them out is already doing something right.`,
    },
    ja: { title: "感情日記 vs 感情の処分 — どちらが自分に合う？", description: "感情を記録することが常に正解とは限りません。ただ捨てることの方が効果的な場合もあります。" },
    es: { title: "Diario de emociones vs. desechar emociones — ¿Cuál es para ti?", description: "Registrar tus emociones no siempre es la respuesta. A veces simplemente tirarlas funciona mejor." },
    zh: { title: "情绪日记 vs 丢弃情绪 — 哪个适合你？", description: "记录情绪并不总是答案。有时候直接丢掉效果更好。" },
  },

  "why-cant-say-im-hurt": {
    en: {
      title: "Why We Can't Say We're Hurt",
      description: "You're clearly hurt, but the words won't come out. Why is it so hard to say 'I was hurt by that'?",
      content: `You're hurt. Clearly hurt. But those words won't come out of your mouth. Why is saying it so hard?

**Why Hurt Is Hard to Say**

Saying you're hurt requires courage. You're essentially saying "this matters to me." The fear: what if the other person dismisses it? What if I seem too high-maintenance? So you close your mouth.

In Korean relationship culture especially, there's an expectation of "you should just know without me saying." Just the fact of having to say something can feel like the relationship is already broken.

**Where Unsaid Hurt Goes**

Unexpressed hurt accumulates. What starts as a small hurt, after several more, becomes "this person always treats me like this." Then one day you either explode over something small, or you simply distance yourself. The other person doesn't know why.

**Practicing How to Say It**

Expressing hurt takes practice too. If saying it directly feels like too much, you can start smaller. "I was a little sad today." "I'm feeling kind of off, no real reason." That's already saying something.

And when the relationship feels safe enough — "I felt a little hurt by what happened then" is enough. You don't have to explain everything. Just letting them know your state can change things.

**When You Can't Say It**

Sometimes the situation doesn't allow for it. In those cases, express it another way. Write it down, or acknowledge the feeling to yourself. Not dismissing what you felt — that's the starting point.

Feeling hurt means you care about the relationship. There's nothing to be ashamed of.`,
    },
    ja: { title: "傷ついたと言えない理由", description: "明らかに傷ついているのに、その言葉が出てこない。「あの時傷ついた」と言うのがなぜこんなに難しいのか。" },
    es: { title: "Por qué no podemos decir que estamos heridos", description: "Claramente estás lastimado, pero las palabras no salen. ¿Por qué es tan difícil decir 'me dolió eso'?" },
    zh: { title: "为什么说不出「我受伤了」", description: "明明受伤了，但那些话就是说不出口。为什么「那件事伤害了我」这句话这么难说出口？" },
  },

  "hyuntas-what-to-do": {
    en: {
      title: "What to Do When Reality Hits Hard",
      description: "You were going hard, then suddenly 'what is all this even for?' The right way to handle that sudden crash.",
      content: `You were going hard. Then suddenly — "what is all this even for?" Reality check, or hyun-ta in Korean. You stop in the middle of running toward a goal and look around, and a strange emptiness washes over you.

**Why Reality Hits**

Hyun-ta usually arrives during a break from going hard. When you're in constant motion there's no space to think — but the moment you stop, the question floats up: "Why am I doing this?"

This isn't necessarily a bad sign. It can be a signal to take a breath and check your direction. The problem is that when reality hits, if you sink too deep into that feeling, you can't move at all.

**What Not to Do When Reality Hits**

Don't make important decisions in that state. "Should I just quit this?" kind of decisions. Judgment in the middle of a hyun-ta tends to be distorted.

Also avoid social media. Seeing everyone else apparently doing great makes the reality check worse.

**What Helps**

First: name it. "Oh, I'm in a reality check right now." Just labeling it creates distance from the feeling.

Then do one tiny thing. Drink a glass of water, go for a short walk, anything. Doing something — anything — helps you climb out of the hyun-ta through action rather than thinking.

**It Passes**

Hyun-ta isn't permanent. It feels overwhelming in the moment, but most cases resolve within hours, at most days.

If what you're doing feels meaningless right now — try to hold on until the feeling passes. When it does, the situation is usually not as bad as it seemed.`,
    },
    ja: { title: "現実感喪失が来たときにどうするか", description: "頑張っていたのに、突然「これって何のためなんだろう」という感覚。その突然の虚脱感への正しい対処法。" },
    es: { title: "Qué hacer cuando la realidad golpea fuerte", description: "Ibas a todo gas, luego de repente '¿para qué es todo esto?' La forma correcta de manejar ese golpe repentino." },
    zh: { title: "现实感崩塌时该怎么办", description: "一直在努力，然后突然「这一切到底是为了什么？」。应对那种突如其来的虚无感的正确方式。" },
  },

  "emotional-exhaustion-self-care": {
    en: {
      title: "Emotional Exhaustion and Self-Care",
      description: "When you've used up too many emotions in one day. What does actually taking care of yourself look like?",
      content: `You spent today comforting someone, mediating a conflict, receiving bad news. Your body is fine but something feels hollow. That's emotional exhaustion.

**What Emotional Exhaustion Is**

Emotional exhaustion is different from physical fatigue. Sleep doesn't fix it. It's a state where your emotional energy has bottomed out — feeling things or responding to things becomes hard.

Conversations feel draining, you can't laugh in situations that should be funny, you want to rest but resting doesn't feel restful.

**Why Emotional Exhaustion Happens**

It comes from too much emotional labor. Work that involves dealing with people, constantly absorbing others' emotions, or continuously suppressing your own — all of these qualify.

Using emotions costs energy too. And if you don't replenish that energy, it runs dry.

**Starting Self-Care**

Self-care doesn't have to be grand. No massage, no vacation, no expensive meal required.

Just ask yourself: "What do I need right now?" Quiet time? Music? Something good to eat? Give yourself a small piece of whatever that is.

Setting limits is also self-care. "Today I don't have the space to hear someone else's problems." That can seem cold, but giving from a depleted state doesn't help anyone.

**Emotions Need Recharging Too**

Like a battery, emotional energy needs recharging. Knowing what charges you matters.

Some people recharge alone. Others recharge with someone they love. Find your method and use it regularly.

If you're emotionally exhausted today — make tomorrow a day where you give a little less. That's okay.`,
    },
    ja: { title: "感情的疲弊とセルフケア", description: "一日に感情を使いすぎてしまったとき。本当の意味でのセルフケアとはどんなものでしょうか。" },
    es: { title: "Agotamiento emocional y autocuidado", description: "Cuando has gastado demasiadas emociones en un día. ¿Cómo es realmente cuidarse a uno mismo?" },
    zh: { title: "情绪耗竭与自我关怀", description: "当一天之内用了太多情绪。真正的自我关怀是什么样的？" },
  },

  "body-knows-stress-first": {
    en: {
      title: "Your Body Knows About Stress Before Your Mind Does",
      description: "Your head says 'I'm fine' but your body has already been sending signals. Learn to read them.",
      content: `"I don't really feel that stressed, so why is my body like this?" You might have had this thought. Unexplained headaches, poor digestion, shoulders that keep tensing up. These are all stress signals.

**Why the Body Reacts First**

The brain sometimes prevents itself from consciously registering stress — rationalizing with "it's nothing" or "everyone deals with this." But the body doesn't go through that automatic process. When stress accumulates, cortisol and other stress hormones are released, affecting digestion, sleep, and the immune system. The body already knows, even when your mind doesn't.

**Check These Stress Signals**

Have any of these been happening recently?
- Taking longer than usual to fall asleep
- Still feeling tired after waking up
- Unexplained stomach aches or headaches recurring
- Getting more reactive to small things than before
- Not feeling hungry, or suddenly eating a lot

Three or more? Your body is already sending stress signals.

**Don't Ignore the Body's Signals**

Don't put it off with "I'll deal with it later." Continuously ignoring the body's signals can lead to bigger problems.

You don't have to make big changes immediately. Go to sleep a little earlier tonight. Put your phone down at lunch. Take even five minutes to close your eyes and breathe. Start small.

The signals your body sends are the message: "It's okay to rest a little." Listening to that — that's the first step in self-care.`,
    },
    ja: { title: "体はストレスを頭より先に知っている", description: "頭では「大丈夫」と言っているのに、体はすでにシグナルを送っています。その読み方を学びましょう。" },
    es: { title: "Tu cuerpo sabe del estrés antes que tu mente", description: "Tu cabeza dice 'estoy bien' pero tu cuerpo ya ha estado enviando señales. Aprende a leerlas." },
    zh: { title: "身体比大脑更早感知压力", description: "大脑说「我没事」，但身体已经在发送信号了。学会读懂这些信号。" },
  },

  "where-does-anger-come-from": {
    en: {
      title: "Where Anger Really Comes From",
      description: "Getting disproportionately angry at small things. Anger often isn't actually anger — it's something hiding beneath it.",
      content: `Getting suddenly angry at something small. When you look closely at that anger, something else is usually underneath it.

**What's Below the Surface of Anger**

Anger is often the surface form of another emotion. What seems like anger is frequently actually sadness, injustice, or fear.

When sadness has been suppressed for too long, it comes out as anger. Saying you're sad feels vulnerable, so you default to anger instead. Fear also becomes anger. When you feel threatened, aggression kicks in to cover the vulnerability.

**Finding Your Anger Patterns**

Knowing which situations make you particularly angry helps you understand yourself.

When you feel dismissed? When your words aren't heard? When you're put in an out-of-control situation? Once you recognize the pattern, you can take a step back: "Oh, I'm not really angry — I feel dismissed."

**How to Handle Anger**

The most important thing when anger rises: don't react immediately. Even ten seconds of pause prevents impulsive reactions.

Then look for the emotion beneath the anger. "I'm not angry — I'm hurt that they didn't listen to me." When you can name it accurately, you can express it more productively. "I get hurt when you don't listen to me" is much more useful in a relationship than "I'm angry."

**Anger Is Okay**

Anger isn't a bad emotion. It's a signal that something is wrong. A signal that's protecting you. Rather than suppressing it, what matters is recognizing it and finding a healthy way to express it.`,
    },
    ja: { title: "怒りの本当の出所", description: "小さなことに過剰に怒ってしまう。怒りは実際には怒りじゃないことが多い — その下に何かが隠れています。" },
    es: { title: "De dónde viene realmente la ira", description: "Enojarse desproporcionadamente por cosas pequeñas. La ira a menudo no es realmente ira — hay algo escondido debajo." },
    zh: { title: "愤怒真正来自哪里", description: "为小事过度愤怒。愤怒往往不是真正的愤怒——它的下面隐藏着别的东西。" },
  },

  "daily-emotion-checklist": {
    en: {
      title: "Daily Emotion Checklist — A Quick Check-In with Yourself",
      description: "Just spending a moment asking yourself how you are at the end of the day changes emotional management.",
      content: `Just spending a moment asking yourself how you are at the end of the day changes things. It doesn't have to be elaborate. Try lightly checking these questions below.

**Today's Emotion Checklist**

**Body**
- Did you sleep enough today?
- Did you eat properly?
- Where in your body do you feel tension right now? (Shoulders, jaw, eyes)

**Emotions**
- What was the strongest emotion you felt today?
- When did it arrive?
- Was there anything that frustrated or hurt you today?
- Did you express that emotion, or swallow it?

**Energy**
- Was there a moment today when your energy was recharged?
- Where did you spend the most energy?
- What percentage of emotional energy do you feel you have left?

**What to Do After Checking**

If checking reveals "I'm really exhausted today" — respond accordingly.

If you need recharging, do one thing you like. If an emotion needs to come out, write it down or let it go. If you just need rest, that's the whole plan for today.

**You Don't Have to Do It Every Day**

Don't turn this checklist into mandatory homework. Use it on days when something feels off, when emotions feel complicated. Just checking in on yourself once in a while.

How was your day today? It's okay to spend a moment asking yourself.`,
    },
    ja: { title: "毎日の感情チェックリスト — 自分との簡単なチェックイン", description: "一日の終わりに少しの時間、自分に問いかけるだけで感情管理が変わります。" },
    es: { title: "Lista de verificación de emociones diaria — Un rápido check-in contigo mismo", description: "Solo pasar un momento preguntándote cómo estás al final del día cambia el manejo emocional." },
    zh: { title: "每日情绪清单 — 与自己快速确认", description: "只是在一天结束时花一点时间问问自己的感受，就能改变情绪管理。" },
  },

  "hiding-emotions-at-work": {
    en: {
      title: "Hiding Emotions at Work",
      description: "At the office you always have to look fine. Those emotions — where are they supposed to go?",
      content: `You received an unfair comment in a meeting. You smiled. Your manager said something out of line. You said "understood." You felt something was wrong, but let it pass.

Hiding emotions at work is necessary to some extent. You can't just let everything out in the moment. But the problem is that suppressed emotions don't disappear.

**What Happens When You Suppress Emotions at Work**

Emotions you suppress while keeping your professional face accumulate. Then they surface unexpectedly — after work, when you're suddenly exhausted for no reason, or when you're oddly irritable at home. The emotion that couldn't come out in the office is looking for somewhere to go.

**Why It's Hard Not to Hide**

In workplace culture, showing emotion can be seen as "unprofessional." Being emotional can mean being seen as unable to handle the situation. That pressure makes people suppress more.

But the body stores what the mind tries to dismiss. Chronic stress, tension in shoulders and jaw, sleep problems — many of these are the cost of emotional labor.

**How to Release Work Emotions**

After work, give yourself permission to feel the emotion you suppressed all day. "I was frustrated today." "That was genuinely unfair." Just acknowledging it matters.

Or write it down. You don't have to send it to anyone. Just getting it out of your body and onto paper helps.

And if there's a trustworthy colleague, sometimes even small conversations like "that was a bit rough today, wasn't it?" can help release the pressure.

**You Don't Have to Solve It**

Not everything at work needs to be solved. Some things just need to be released. Dumping the emotion doesn't fix the situation, but it prevents the emotion from becoming internal damage.`,
    },
    ja: { title: "職場で感情を隠すとき", description: "職場では常に平気な顔をしなければいけない。そういう感情たちはどこに行けばいいのか。" },
    es: { title: "Esconder emociones en el trabajo", description: "En la oficina siempre tienes que parecer bien. Esas emociones — ¿a dónde se supone que van?" },
    zh: { title: "在工作中隐藏情绪", description: "在办公室里总是要表现得一切正常。那些情绪——它们应该去哪里？" },
  },

  "stop-self-blame": {
    en: {
      title: "How to Stop Blaming Yourself",
      description: "The habit of always turning everything back on yourself. Why you do it, and how to slowly break free.",
      content: `Something goes wrong and your first thought is "it's my fault." Even when it's clearly not. That pattern — constantly turning things back on yourself — can be a sign of chronic self-blame.

**Why We Blame Ourselves**

Self-blame is often a form of self-protection. If it's my fault, I have control. I can fix it. But if it's someone else's fault, or if the situation was just bad luck, that feels frightening — there's no way to prevent it.

Ironically, self-blame can feel "safer" than acknowledging that the world is sometimes just unfair.

**The Problems with Self-Blame**

Constant self-blame lowers self-esteem. You start believing that problems always originate with you — which leads to over-apologizing, excessive caution, and difficulty setting healthy boundaries.

It also keeps you mentally stuck in the past. Replaying the scenario over and over: "I should have done this differently." But the past doesn't change.

**Stepping out of the Self-Blame Loop**

When you notice yourself in the blame loop, ask: "Was this actually my fault? Or was it a situation, someone else's actions, or just bad luck?"

Many situations are mixtures. You might have made a mistake, and the situation might have also been genuinely difficult. Both can be true.

It's okay to acknowledge your part without punishing yourself. "I could have handled that better" is different from "I'm a terrible person."

**Being Kind to Yourself**

The same compassion you'd give a friend who made a mistake — try giving that to yourself. "It happened. I'll do better next time." That's enough.`,
    },
    ja: { title: "自責をやめる方法", description: "何でも自分のせいにしてしまう習慣。なぜそうなるのか、そして少しずつどうやって抜け出すか。" },
    es: { title: "Cómo dejar de culparte a ti mismo", description: "El hábito de siempre volver todo hacia ti mismo. Por qué lo haces y cómo liberarte lentamente." },
    zh: { title: "如何停止自责", description: "总是把一切归咎于自己的习惯。为什么会这样，以及如何慢慢摆脱它。" },
  },

  "emotional-numbness": {
    en: {
      title: "When You Stop Feeling Anything",
      description: "You should feel something but nothing comes. Emotional numbness — what it means and what to do.",
      content: `Something sad happened. But the tears don't come. You should feel something, but there's nothing there. That strange numbness — what is it?

**What Emotional Numbness Is**

Emotional numbness isn't the absence of emotion. It's often what happens when emotions have been suppressed too long or when something overwhelms the capacity to feel.

Think of it as an emergency shutdown. When the emotional load gets too heavy, the brain temporarily shuts down processing to protect itself. It's actually a protective mechanism.

**Signs of Emotional Numbness**

Things that should be fun feel flat. You can't feel moved even when you know something is objectively moving. You feel disconnected — watching yourself from a distance, as if you're not quite in your own life.

**Why It Happens**

Prolonged stress. Chronic suppression of emotions. Trauma. Emotional exhaustion. Any of these can lead the nervous system to dial down sensitivity as protection.

**Finding Your Way Back**

Small sensory experiences can help. The warmth of a warm drink, the texture of something physical, the sound of music you connect with. These ground you back in your body.

Gentle movement — a slow walk, stretching — can also help reconnect body and mind.

And it's okay to just let the numbness be for a while. You don't have to force yourself to feel. The emotions will come back in their own time.

**If It Lasts**

If numbness persists for weeks and affects daily life significantly, it might be worth talking to someone — a counselor or therapist. Numbness is a signal, not a permanent state.`,
    },
    ja: { title: "何も感じなくなったとき", description: "何かを感じるはずなのに何もない。感情の麻痺 — それが何を意味するか、そして対処法。" },
    es: { title: "Cuando dejas de sentir cualquier cosa", description: "Deberías sentir algo pero no viene nada. Entumecimiento emocional — qué significa y qué hacer." },
    zh: { title: "当你停止感受任何事情", description: "应该有感觉但什么都没有。情绪麻木——这意味着什么，该怎么办。" },
  },

  "pretending-to-be-okay": {
    en: {
      title: "The Weight of Pretending to Be Okay",
      description: "'I'm fine.' Two words. The exhaustion of saying them over and over, and what to do with it.",
      content: `"I'm fine." You say it reflexively. Even when you're not. How many times a day do you say those two words?

**What Pretending Costs**

Pretending to be okay isn't just saying words. It's maintaining performance — adjusting your facial expression, managing your tone, making sure nothing leaks out. All of that costs energy.

The more you do it, the more tired you get. Not from the day's work, but from the continuous performance of being fine when you're not.

**Why We Do It**

We're afraid of being a burden. We're worried people will see us differently. We've internalized the idea that having emotions is somehow inconvenient or weak.

So we keep saying "I'm fine" until we almost believe it ourselves. But the body knows. And eventually it finds its own way to let things out — through physical symptoms, sudden emotional crashes, or just a low-grade numbness that never quite goes away.

**The Middle Ground**

You don't have to perform total breakdown to stop pretending. There's space between "I'm absolutely fine" and "I'm completely falling apart."

"I'm a little tired today." "Today was kind of hard." "I'm not at 100%." These small admissions aren't weakness. They're honesty. And they take far less energy than the full performance.

**Finding Someone You Can Be Not-Fine With**

Even one person. One person to whom you can say "actually, I'm not doing great" — that changes things.

And if that person doesn't exist right now? You can start with yourself. Admitting to yourself that you're not okay is the first step to actually being okay.`,
    },
    ja: { title: "大丈夫なふりをすることの重さ", description: "「大丈夫」この二言。何度も繰り返すその疲れと、その対処法。" },
    es: { title: "El peso de fingir estar bien", description: "'Estoy bien.' Dos palabras. El agotamiento de decirlas una y otra vez, y qué hacer con eso." },
    zh: { title: "假装没事的重量", description: "「我没事。」两个字。一遍遍说出这话的疲惫，以及该怎么处理。" },
  },

  "emotions-louder-at-night": {
    en: {
      title: "Why Emotions Get Louder at Night",
      description: "Fine all day, then 2 AM and suddenly everything hurts. Why emotions wait for nighttime.",
      content: `You were fine all day. Did your work, met people, functioned. Then you lie down and it all comes flooding in. Why?

**The Daytime Suppression System**

During the day, you're busy. There's no space to feel things. So your brain puts emotions on hold — "process later." You're essentially hitting snooze on your feelings all day long.

Then night comes. The busyness stops. The distractions disappear. And all the feelings that got snooze-hit throughout the day start demanding attention.

**Why the Dark Makes It Worse**

At night, alone in the quiet, there's nowhere to redirect attention. No tasks to complete, no people to respond to. Just you and whatever you've been carrying.

Also, the prefrontal cortex — the rational, perspective-keeping part of your brain — is more active during the day. At night, tired, it gets quieter. The emotional parts of the brain get more say.

**What to Do With It**

Don't fight it. Trying to force yourself to sleep while emotions are demanding attention usually doesn't work. Give the feeling a few minutes. "Okay, what is this? What am I feeling?"

Writing it down can help. Getting it out of your head and onto paper — even a few sentences — can quiet the loop.

Keep a simple note on your phone for these moments. "Wrote it down. It doesn't need to be solved tonight."

**You Can Also Just Dump It**

Sometimes you don't need to understand the emotion. You just need to get it out. That's what OnulMood is for, actually. 2 AM, something's churning — just throw it at Ugogi.

The emotion doesn't have to be solved tonight. It just needs somewhere to go.`,
    },
    ja: { title: "なぜ夜に感情が大きくなるのか", description: "昼間は大丈夫なのに、夜中の2時になると突然全てが辛くなる。感情が夜を待つ理由。" },
    es: { title: "Por qué las emociones se vuelven más ruidosas de noche", description: "Bien todo el día, luego las 2 AM y de repente todo duele. Por qué las emociones esperan la noche." },
    zh: { title: "为什么情绪在夜晚变得更响亮", description: "白天还好好的，凌晨2点突然一切都很难受。情绪为什么要等到夜晚。" },
  },

  "ugegi-ate-43-hurts-today": {
    en: {
      title: "Ugogi Ate 43 Hurts Today",
      description: "A report from inside the emotional disposal facility. Today's intake: 43 units of various feelings.",
      content: `UGOGI DISPOSAL FACILITY — DAILY LOG

Today's intake: 43 units.

Breakdown:
- Unexplained sadness: 12 units
- "I'm fine" (verified false): 9 units
- Texts left on read: 6 units
- Feelings suppressed alone: 8 units
- 3 AM thoughts: 5 units
- Miscellaneous heaviness: 3 units

All units successfully processed. Residue minimal.

Ugogi's note for today: "Seems like a lot of people were pretending to be okay. The 'I'm fine' ones had an unusual bitterness to them. Whether from long suppression or from being said too many times — hard to say."

"But they all got eaten. Every single one."

"The ones who came back for the third time today — I noticed. It's okay. Keep coming. That's what I'm here for."

Status: Ugogi is full but will continue operations.

Processing capacity: theoretically unlimited.
Emotional residue in facility: approximately 7% (within normal range).
Recommendation: If you have something left from today, bring it over. The facility is open 24 hours.

Tomorrow's forecast: More will arrive. More will be processed.

That's enough for today.`,
    },
    ja: { title: "ウゴギが今日43個の傷を食べた", description: "感情処理施設の内部からの報告。今日の受入量：各種感情43ユニット。" },
    es: { title: "Ugogi se comió 43 heridas hoy", description: "Un informe desde el interior del centro de eliminación emocional. Ingesta de hoy: 43 unidades de varios sentimientos." },
    zh: { title: "乌格基今天吃了43个伤心", description: "来自情绪处理设施内部的报告。今日摄入量：各类情绪43单位。" },
  },

  "burnout-self-check": {
    en: {
      title: "Am I Burned Out? — A Self-Check Guide",
      description: "Burnout doesn't arrive suddenly. It's been signaling for a long time. Check your current state honestly.",
      content: `"Why do I want to do nothing lately?"

If this thought comes more than once a day, it might not just be laziness. It could be burnout.

Burnout doesn't arrive all at once. It accumulates over weeks and months until one day "I want to quit everything" just comes out. But the signals were there long before.

**Burnout Self-Check List**

Check which of the following apply to you:

**Physical**
- Still feel tired even after enough sleep
- Feel exhausted again by Monday after resting over the weekend
- Unexplained headaches or stomach aches keep recurring
- Body feels heavy and moving is a chore

**Mental/Emotional**
- Things you used to enjoy now feel like obligations
- No motivation, nothing sounds fun
- Socializing feels like a burden
- Getting irritated or tearful over small things
- Constantly doubting whether you're doing enough

**Behavioral**
- Making more mistakes than usual
- Hard to concentrate, memory feels worse
- More procrastination than before
- Come home and can't do anything, just lie there
- Lost interest in reaching out to people

**Interpreting Your Results**

- 0-3 items: Probably temporary fatigue. Rest should help.
- 4-7 items: Possible early burnout. Not resting now could make it worse.
- 8+ items: Burnout may be well progressed. Slowing down now is necessary.

**Burnout vs. Just Tired**

Easiest way to tell: after a day or two of real rest, does your energy come back? If yes — just tired. If rest doesn't help much, or if thinking about getting back to work still makes you feel blank — closer to burnout.

**Burnout Is Not a Character Flaw**

Burnout doesn't happen to lazy people. It more often happens to people who've been working hard. You gave too much for too long, and now you're empty. That's not your fault.

If you're exhausted right now — that's evidence you've been trying hard.`,
    },
    ja: { title: "私はバーンアウトしている？ — 自己チェックガイド", description: "バーンアウトは突然来ません。ずっと前からシグナルを送っています。今の状態を正直にチェックしてみましょう。" },
    es: { title: "¿Estoy quemado? — Guía de autoexamen", description: "El burnout no llega de repente. Ha estado enviando señales por mucho tiempo. Revisa tu estado actual honestamente." },
    zh: { title: "我倦怠了吗？ — 自查指南", description: "倦怠不会突然到来。它已经发出信号很久了。诚实地检查一下你目前的状态。" },
  },

  "when-emotions-overflow": {
    en: {
      title: "What to Do When You Can't Control Your Emotions",
      description: "When tears come out of nowhere, or anger hits suddenly and you surprise yourself. Things you can do alone in that moment.",
      content: `Sometimes tears just come. Nothing obviously sad happened, but they come anyway. Or the opposite — you get so angry at something small that even you are surprised. That feeling of being out of control with your own emotions.

**Why Emotions Overflow**

Emotions usually don't explode without warning. Small things accumulate and then one small trigger releases everything at once. That's why "why am I this upset about something so minor?" happens — because it's not just about that minor thing.

Physical states matter too. When you're tired, haven't slept well, haven't eaten properly — the brain has less capacity for emotional regulation.

**Things You Can Do In the Moment**

**1. Pause for 10 seconds**

When you feel the urge to react, wait 10 seconds. It sounds brief but those 10 seconds prevent a lot of impulsive responses.

**2. Box breathing**

Breathe in for 4 seconds, hold for 4, breathe out for 4. Used by firefighters and military in high-stress situations. It activates the parasympathetic nervous system. Simple, but it works.

**3. Name the emotion specifically**

Not "I'm angry" but "I feel dismissed and hurt." More specific emotion labeling tends to reduce the intensity of the feeling.

**4. Physically leave the situation**

If possible, step away. Bathroom, outside, anywhere. Physically removing yourself from the triggering situation gives the nervous system a chance to reset.

**5. Cold water on your wrists**

Sounds strange but works. Cold stimulus lowers physiological arousal. Running cold water over your wrists or drinking a cold glass of water slowly has similar effects.

**After You've Calmed Down**

Look back at what sparked the overflow. Was it really about what it seemed like? Often the immediate trigger isn't the real source.

Then find a way to get the emotion out — talk to someone, write it down, or just let it go here.

Emotions overflowing isn't a problem of self-control. It might be a sign that you've been carrying too much for too long.`,
    },
    ja: { title: "感情のコントロールができないとき", description: "突然涙が出てきたり、怒りが爆発して自分でも驚くとき。その瞬間に一人でできること。" },
    es: { title: "Qué hacer cuando no puedes controlar tus emociones", description: "Cuando las lágrimas salen de la nada, o la ira golpea de repente y te sorprendes a ti mismo. Cosas que puedes hacer solo en ese momento." },
    zh: { title: "无法控制情绪时该怎么办", description: "当眼泪莫名其妙地涌出来，或者愤怒突然袭来让你自己都吓到时。在那个时刻你能独自做的事情。" },
  },

  "wanting-to-be-understood": {
    en: {
      title: "On Wanting to Be Understood Without Having to Say It",
      description: "You know you have to say it. But sometimes saying it is just too hard. About that feeling.",
      content: `"You should just know without me having to say it."

This is true. But sometimes the reason this phrase comes out is because saying it is genuinely hard.

**Why Saying It Is Hard**

To speak, several things need to happen at once. You need to know clearly what you're feeling, find words to express it, manage your worry about how they'll take it, and still find the courage to say it — all simultaneously.

When you're already tired. When you're hurting. When you're worried saying something will make it worse — all of this makes the process feel impossibly heavy. And sometimes you just shut down.

**What "Without Having to Say It" Really Means**

Wanting to be understood without saying anything isn't actually about telepathy. It's more like:

"Can't you see I'm struggling?" — a feeling of injustice.
"Does this relationship require me to verbalize everything to get care?" — a feeling of sadness.
Or simply: "I don't have the energy to explain right now." — exhaustion.

These feelings come out as "I wish you just knew."

**Why It's Hard to Express**

Some people can't speak because they're afraid of hearing "why would that even bother you?" Others because they fear "are you going on about that again?" Some because they think they'll cry, and crying seems weak, so they hold it in.

Not being able to speak isn't about willpower or communication skills.

**But Speaking Is Still Worth Practicing**

Wanting to be understood without speaking is understandable — but when that expectation goes unmet repeatedly, the relationship slowly fills with hurt. The other person doesn't know why you're distant, and you keep being disappointed.

You don't have to say everything at once. Start small. "Today was kind of hard." "I'm feeling off, no specific reason." Even that counts as speaking.

**If Saying It Is Still Too Hard**

Texting is sometimes easier than speaking. When you don't have to see their face, when you can organize your thoughts — written words sometimes flow more easily.

Or write it for yourself. Don't send it. Just getting it out of your body, even onto paper, helps.

And if even that's too hard — dumping the emotion here is also an option. You didn't say it, but you did get it out. That counts.`,
    },
    ja: { title: "言わなくても分かってほしい気持ちについて", description: "言わなければいけないのは分かっています。でも時には言うことがとても難しい。その気持ちについて。" },
    es: { title: "Sobre querer ser entendido sin tener que decirlo", description: "Sabes que tienes que decirlo. Pero a veces decirlo es simplemente demasiado difícil. Sobre ese sentimiento." },
    zh: { title: "关于希望不用说就被理解的心情", description: "你知道你必须说。但有时说出来太难了。关于那种感觉。" },
  },

};
