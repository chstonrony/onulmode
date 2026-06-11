# 오늘무드 — 작업 컨텍스트

> 이 파일은 프로젝트의 현재 상태와 작업 흐름을 추적합니다.
> Claude와 작업자 모두 이 파일을 기준으로 컨텍스트를 공유합니다.
> **작업 후 항상 업데이트할 것.**

---

## 프로젝트 정체성

**오늘무드 (onulmood.com)**
- 감정 파쇄기 + 우걱이 세계관의 감성 웹앱
- 병맛 + 위로 밸런스 — "웃긴 사이트인 줄 알았는데 혼자 새벽에 읽게 되는 감정 페이지"
- 에드센스 승인 + SEO 유입 강화 진행 중
- 백엔드/인증 없음. 감정 기록은 localStorage

---

## 기술 스택 (실제)

- **Next.js 16.2.6** (App Router) — `node_modules/next/dist/docs/` 참조 필수
- **React 19.2.4**
- **TypeScript**, **Tailwind CSS v4** (`@import "tailwindcss"`)
- **Framer Motion 12**
- **date-fns**, **lucide-react**

### 폰트 시스템
| 변수 | 폰트 | 용도 |
|---|---|---|
| `--font-serif` | Gowun Batang | 메인 감성 세리프 |
| `--font-sans` | Noto Sans KR | 일반 UI 텍스트 |
| `--font-en` | Crimson Text | 영문 이탤릭 |
| `--font-maru` | Noto Serif KR (w400,600) | 아티클 제목 |
| `--font-prose` | Pretendard (CDN) | 아티클 본문 |

### 컬러 토큰
- 베이지 배경: `#EDE4D0`, 종이: `#F5EFE0`
- 로즈 액센트: `#C8607A`
- 잉크: `#2A2520`

---

## 페이지 맵 (현재 존재하는 페이지)

### 앱 코어
| URL | 파일 | 설명 |
|---|---|---|
| `/` | `app/page.tsx` | 메인 — 감정 파쇄기 인터랙션 |
| `/today` | `app/today/page.tsx` | 오늘 감정 기록 |
| `/release` | `app/release/page.tsx` | 감정 방출 + **감정 폐기 영수증 결과** |
| `/archive` | `app/archive/page.tsx` | 파쇄함 — 기록 목록 + 우걱이 실험실 위젯 |
| `/insights` | `app/insights/page.tsx` | 감정 인사이트 |
| `/profile` | `app/profile/page.tsx` | 프로필 |

### 정보 페이지
| URL | 파일 | 설명 |
|---|---|---|
| `/about` | `app/about/page.tsx` | 소개 |
| `/privacy` | `app/privacy/page.tsx` | 개인정보처리방침 |

### SEO/콘텐츠 (에드센스 강화)
| URL | 파일 | 설명 |
|---|---|---|
| `/blog` | `app/blog/page.tsx` | 감정 이야기 목록 |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` | 아티클 읽기 (Noto Serif KR + Pretendard 타이포) |
| `/emotion-fatigue` | `app/emotion-fatigue/page.tsx` | "왜 괜찮은 척할수록 더 지칠까?" (다크 bg) |
| `/hide-emotions` | `app/hide-emotions/page.tsx` | "혼자 삭힌 감정은 어디로 갈까?" (다크 bg) |
| `/funny-but-comforting` | `app/funny-but-comforting/page.tsx` | "웃긴 콘텐츠인데 왜 위로가 될까?" (다크 bg) |
| `/best-results` | `app/best-results/page.tsx` + `BestResultsClient.tsx` | 인기 감정 결과 모음 — 8종 병맛 카드 |
| `/collection` | `app/collection/page.tsx` | 감정 부산물 도감 — 30종 수집, 희귀도 6등급 |

---

## 디자인 원칙

1. **병맛 + 진심** — 웃기지만 공감되는 표현. 심리상담/힐링 앱 느낌 금지
2. **우걱이 세계관** — 감정을 파쇄하는 캐릭터. 우걱이 코멘트는 짧고 직접적
3. **베이지 감성** — 앱 코어는 `#EDE4D0` 베이지. SEO 아티클은 다크 bg도 허용
4. **모바일 최적화** — 항상 모바일 퍼스트. max-width 620~680px
5. **저장/공유 욕구** — 결과가 콘텐츠가 되어야 함. 스크린샷·공유 자연스럽게

---

## 컴포넌트 / 라이브러리 위치

- `lib/articles.ts` — 블로그 아티클 데이터 (12개 아티클)
- `lib/emotions.ts` — 감정 타입 + 색상 + 아이콘
- `lib/i18n.ts` — 5개국어 번역 (한/영/일/중/스)
- `hooks/useMoodStore.ts` — localStorage 기반 감정 기록 관리
- `context/LocaleContext.tsx` — 언어 컨텍스트
- `components/trash/` — 파쇄기 관련 컴포넌트
- `components/mood/` — 감정 관련 컴포넌트
- `components/layout/` — TopBar, BottomNav

---

## 컴포넌트 / 라이브러리 추가

- `components/ugogi/UgogiTrace.tsx` — 우걱이 존재감 배지 (재사용 가능, 어느 페이지에나 import 가능)

---

## 최근 완료 작업 (세션 로그)

### 2026-06-10 세션 R — AdSense 재심사 최종 개선 (콘텐츠·내부링크·현황판·구조화데이터)
- **매거진 3편 신규**(lib/contentSystem.ts, 각 1200자+ 전체, 겹치지 않는 신주제, H2/H3·결론·SEO메타 포함): why-mood-feels-off(오늘 기분이 이상한 이유·ugogi-lab)·irritation-is-fatigue(짜증은 사실 피곤함일 수도·emotion-guide)·naming-emotions-helps(감정에 이름을 붙이면 생기는 일·ugogi-lab, affect labeling). sitemap 자동 반영(매거진 → 총 34편)
- **구조화 데이터(JSON-LD) 신설**: app/layout.tsx에 WebSite+Organization @graph, app/magazine/[category]/[slug]에 BlogPosting(author/publisher/datePublished). 빌드 산출물 HTML 삽입 확인 → Search Console 리치 신호 보강
- **결과 페이지 내부 탐색 블록**(app/result/page.tsx): "우걱이 처리소 더 둘러보기" 6링크 그리드(/release·/archive·/collection·/magazine·/about·/feelings) → 체류·페이지 이동 강화
- **감정파쇄함 현황판**(app/archive/ArchiveClient.tsx): TodayBoard 신설 — 오늘 처리 수·오늘 최다 감정·생성된 퇴비 수 + 우걱이 포만감 게이지(😴→🤤) + 오늘 생성 퇴비 칩 ("살아있는 처리 시설" 느낌, archive는 noindex라 참여감 강화용)
- **About 개인정보/문의 섹션**(app/about/page.tsx): 09 섹션 본문에 로컬저장소·서버 미전송·제3자 광고 고지·문의 이메일 명시(심사관 페이지 내 즉시 확인용)
- 빌드 통과, 신규 3편 SSG 정적 생성·BlogPosting JSON-LD 삽입 검증 완료

### 2026-06-10 세션 R-2 — 얇은 콘텐츠 전수 정리 (심사관 관점 결정적 조치)
- **진단(프로덕션 전수 크롤링)**: ads.txt/robots/sitemap(123 URL 전부 200)/정책페이지/메타고유성/JSON-LD 전부 정상 → 기술결함 0. **유일 거절원인 = 얇은 콘텐츠 대량 색인**: 매거진 31편 중 24편이 공백제외 800자 미만(최단 414, 중앙값 544)인데 sitemap priority 0.8로 색인 신청. 감정도감 개별 35편도 사전형 단편(중앙값 474자). 색인의 약 48%가 thin
- **매거진 noindex 인프라**(lib/contentSystem.ts): `MAGAZINE_NOINDEX` Set(19편) + `isMagazineNoindex()` + `INDEXED_CONTENT_ARTICLES`. 매거진 [slug] generateMetadata에 robots noindex(follow) 분기, sitemap은 INDEXED만
- **핵심 감정 5편 확장**(색인 유지): seonam-manual(서운함 1195자)·loneliness-storage(외로움 1012)·jealousy-dry-manual(질투)·lethargy-first-aid(무기력)·anxiety-temporary-storage(불안) — 각 실용 가이드 2~3섹션+결론 추가. 색인 매거진 12편 전부 852자+(중앙값 933, 800미만 0편)
- **감정도감 개별 35편 noindex**(app/feelings/[slug] robots noindex + sitemap 제외). 허브 /feelings·/emotion-dictionary는 색인 유지
- 결과: **sitemap 123→69 URL, 색인 페이지 전부 알찬 콘텐츠.** 라이브 검증: noindex/색인유지/감정도감/sitemap 제외 모두 정상. 페이지는 살아있어 사용자 접근·내부링크 불변

### 2026-06-10 세션 R-3 — 추가 SEO 보강 (구조화데이터 확대 + noindex 글 재색인)
- **블로그 BlogPosting JSON-LD**(app/blog/[slug]): noindex 글 제외, author/publisher/datePublished/inLanguage(로케일). 라이브 확인
- **FAQ FAQPage JSON-LD**(app/faq): FAQ_LIST(18문항) → Question/Answer 자동 생성. 리치 결과 후보. 라이브 확인
- **noindex 매거진 3편 재확장+재색인**(각 933~969자, 검색가치 주제): nunchi-overdose-warning(눈치)·regret-recycling-center(후회)·frustration-disassembly(답답함) — 실용 섹션 2~3+결론 추가 후 MAGAZINE_NOINDEX에서 제거. 색인 매거진 12→15편(전부 852자+, 중앙값 933), noindex 19→16편
- 결과: **sitemap 69→72 URL.** 빌드·라이브 검증 통과(블로그 BlogPosting·FAQPage·재색인 robots 없음·sitemap 포함)
- 남은 noindex 16편은 향후 하루 1~2편씩 확장 후 재색인 권장(한꺼번에 ❌ — scaled content 회피)

### 2026-06-11 세션 S — noindex 매거진 2편 확장+재색인 (일일 루틴 1회차)
- **why-read-receipt-hurts(읽씹은 왜 서운할까)**: 548→1144자(공백제외). `### ` 실용 섹션 3개(기다리는 동안 마음 다루는 법·서운함 말할지 정하는 기준·내가 읽씹하는 쪽일 때) + 결론. readingTime 4→6
- **fine-by-day-sad-at-night(밤만 되면 우울한 이유)**: 506→1148자. 실용 섹션 3개(저녁 루틴·새벽 결론 보류 규칙·매일 반복 시 도움 요청) + 결론. readingTime 5→7
- 두 슬러그 MAGAZINE_NOINDEX에서 제거 → noindex 16→14편, 색인 매거진 15→17편, sitemap 72→74 URL
- 빌드 검증: 두 페이지 SSG 생성·noindex 0건(대조군 what-does-ugogi-eat noindex 유지 확인)·BlogPosting JSON-LD·###→h3 렌더·sitemap 포함 전부 정상
- 남은 noindex 14편 — 다음 후보: adult-friendship-hard, why-regret-at-dawn (하루 1~2편 페이스 유지)


### 2026-06-08 세션 I — /insights 콘텐츠형 페이지 + SSR 전환 (AdSense 재심사)
- `lib/insightsContent.ts` 신설 — 감정 인사이트 정보성 콘텐츠 (ko 전체 / en 번역, 그 외 로케일 en 폴백). 한국어 본문 1890자(공백 제외)
- **SSR 전환**: `app/insights/page.tsx` 를 `"use client"` → **서버 컴포넌트**로 재작성
  - `export const metadata` 추가 (title/description/keywords/openGraph/twitter/canonical, 한국어 기준)
  - `getLocale()`로 서버에서 로케일 결정 → 4개 콘텐츠 섹션을 **서버 렌더링** (빌드 결과 `ƒ /insights` = dynamic SSR). curl/Googlebot UA로 JS 실행 없이 본문 전체 확인됨 (Ctrl+U 노출 OK)
  - 섹션1 자주 기록하는 감정(서운함/외로움/무기력/불안/짜증) · 섹션2 감정 기록이 도움 되는 이유(4) · 섹션3 감정 관찰법(4단계) · 섹션4 우걱이 코멘트(다크 카드)
  - 하단 공용 `Footer` (feelings/magazine/guide/privacy/terms 링크 유지), maxWidth 640
- `app/insights/InsightsStats.tsx` 신설 — localStorage 개인 통계만 분리한 클라이언트 컴포넌트 (서버 렌더 시 null → SSR 콘텐츠 노출 방해 안 함). 데이터 3일↑ 통계 카드, 미만 시 안내 배너
- `app/sitemap.ts` — `/insights` 추가 (priority 0.7, weekly)
- robots.txt 는 이미 `Allow: /` 라 별도 수정 불필요 (크롤링 허용 확인)
- 커밋 `3ecd342` 푸시 → Vercel 배포 완료, 라이브 검증 통과 (200/SSR/sitemap/308 리다이렉트/Googlebot)

### 2026-06-08 세션 J — /insights 콘텐츠 확장 + 감정도감 허브 연결 (AdSense)
- `lib/insightsContent.ts` 확장: 5개 핵심 감정 desc 314~345자로 보강(기존 ~230자) + 각 감정에 `slug`(→/feelings 상세) + `related[]`(관련 감정) 추가
- `app/insights/page.tsx`:
  - 각 핵심 감정에 "관련 감정" 칩 링크 + "OO 자세히 보기 →" 상세 링크 추가 (감정 간 내부 링크)
  - 신규 SECTION 04 "더 많은 감정 인사이트" — `FEELINGS`(감정도감 30개)를 import해 태그라인과 함께 링크 그리드로 노출 (중복 생성 없이 **30개 감정 상세페이지 내부 링크**)
  - 신규 "함께 보면 좋은 콘텐츠" — /guide·/feelings·/magazine·/emotion-dictionary 링크
- **콘텐츠 자산 현황 점검**: 감정도감 30 + 블로그 54 + 매거진 20 = sitemap 총 126 URL. /guide·/feelings·/magazine 전부 200·SSR 확인 → 추가 자동생성 불필요
- 요청 6(콘텐츠 부족 시 자동생성)은 자산 충분으로 불요. 요청 7(sitemap)·8(Googlebot) 이미 충족 확인

### 2026-06-08 세션 K — 블로그 품질 정비 (AdSense thin content 대응)
- 진단: 블로그 54편 중 36편 1000자 미만(중앙값 414자, 공백제외), 템플릿 반복, 주제 중복 3쌍 → thin/scaled content 리스크
- **중복 병합 3쌍** (제거 slug → next.config 308 리다이렉트):
  - want-to-cry-but-cant → cant-cry-when-you-want-to
  - why-wounds-dont-heal → wound-that-doesnt-heal
  - tired-from-relationships → relationship-fatigue
- **확장 12편** → 전부 공백포함 1200~1340자. 실제 사례·행동 가이드·실천법 추가, 반복 클리셰("우걱이 메모:" 등) 제거, 본문 내부 링크 삽입
  - cant-cry-when-you-want-to, wound-that-doesnt-heal, relationship-fatigue, burnout-not-laziness, lethargy-not-laziness, why-record-emotions, silent-grief, lonely-in-crowd, overthinking-at-3am, why-hurt-stays-long, nunchi-fatigue, stop-comparing-yourself
- **noindex 15편**: `Article.noindex` 플래그 신설 → generateMetadata robots noindex + sitemap 제외 + 블로그 목록/관련글 제외
  - big-reaction-small-thing, healing-takes-time, crying-is-okay, heavy-heart-heavy-body, regret-worse-at-night, anger-makes-body-hot, when-feel-nothing, comparison-makes-unhappy, emotions-grow-at-night, anger-is-okay, jealousy-not-always-bad, people-who-bottle-up, body-memory-emotion, pretending-is-also-emotion, brain-when-overthinking
- `app/blog/[slug]/page.tsx`: 인라인 마크다운 링크 `[라벨](경로)` 렌더 지원(renderInline) → 본문 내부 링크 최적화 + canonical 추가
- 결과: 블로그 51편(54−3), sitemap 블로그 36개(51−15 noindex). lib/articles.ts 재생성(스크립트)

### 2026-06-08 세션 L — 고품질 감정 콘텐츠 추가 (AdSense 색인 확대 + E-E-A-T)
- **감정도감 5편 추가** (lib/feelings.ts, UG-031~035, 각 1200자+): 권태(gwontae)·막막함(makmakham)·서러움(seoreoum)·초조함(chojoham)·자괴감(jagoegam). 관찰기록 4문단 + 출몰지역/말/순간/메모/질문 + related 내부링크
- **매거진 3편 추가** (lib/contentSystem.ts, 각 1200자+): why-emotions-come-in-waves(ugogi-lab)·where-discarded-emotions-go(compost-record)·people-who-let-go-well(ugogi-manual)
- **가이드형 블로그 2편 추가** (lib/articles.ts, 자기 돌봄, 각 1300자+): emotion-journaling-how-to(감정 일기 쓰는 법)·how-to-organize-emotions(감정 정리하는 법). 본문 내부링크 + authorNote(E-E-A-T)
- 합계 색인 가능 콘텐츠 +10. sitemap 자동 반영: 전체 106→116 (feelings 30→35, magazine 20→23, blog 색인 34→36)
- 전 항목 SEO title/description 포함, 1200~1396자, 검색 의도형 주제

### 2026-06-08 세션 M — UX 전면 개선: 감정부산물 도감 + 감정처리소 리디자인
- **문제 진단**: 부산물 시스템(29종)이 플로우에 미연결 → 도감에 아무것도 저장되지 않아 죽어있었음
- `lib/byproducts.ts`: `RARITY_STARS`/`rarityStars`, `rarityProbability`/`byproductProbability`/`formatProbability`, `selectByproductBySeed`(결정적, mulberry32) 추가. 확률 합 100% 검증
- `app/result/page.tsx`: 결과지 seed로 부산물 결정적 선택 → `useByproductStore.addByproduct`로 **도감 자동 저장**. "🎁 감정부산물 발견!" 카드(별점 희귀도/발견확률/✨최초발견 리본/✅저장 확인/도감 보러가기/누적 수집 X/29)
- `app/collection/CollectionClient.tsx` 전면 리디자인: 수집률 X/29 대시보드(진행바·미발견 N개·"우걱이가 씹는 중"), 희귀도 필터(got/total), **29종 전체** 노출(미수집=🔒 잠금 슬롯+별점+확률), 수집 카드 상세(희귀도/확률/냄새/잔여감정/최초발견일). ※ ko 고정(i18n 제거)
- `app/archive/ArchiveClient.tsx` 전면 리디자인: 카드형 **요약(감정·한줄·날짜)+자세히 아코디언**(긴 스크롤 해소), 의미 통계 4종(총 감정 처리/가장 많이 파쇄한 감정/최근 파쇄일/획득 부산물), 세계관 강화 헤더("완전히 사라지지 않습니다…부산물이 되어 발견")+도감 링크. 명칭 감정퇴비실→감정처리소(Footer와 일치)
- `app/archive/page.tsx`: 메타 타이틀 "우걱이 감정처리소"로 정합

### 2026-06-08 세션 N — AdSense 재심사용 신규 콘텐츠 3편 (중복 회피)
- 요청 3주제(괜찮은 척/서운함/비교)가 모두 기존 색인 글과 강하게 겹쳐 카니발 위험 → 사용자 위임받아 **겹치지 않는 신규 3주제로 대체**(색인 페이지 순증 + 토픽 폭 확장)
- `lib/articles.ts` 신규 3편(각 1,212~1,338자, h2 2~3·h3 2·내부링크 3~4):
  - `cant-say-no` 거절을 못 하는 마음 (관계와 감정, authorNote)
  - `being-sensitive-is-okay` 예민한 게 잘못은 아니야 (자기 돌봄)
  - `hard-to-express-feelings` 감정 표현이 서툰 사람들 (관계와 감정)
  - 내부링크: /about·/guide·/feelings·/blog 관련글
- `app/blog/[slug]/page.tsx`: 본문 렌더러에 **추가형** `## `→h2, `### `→h3 규칙 추가(기존 글은 `**` 사용이라 무영향, 회귀 없음 확인). 구조/URL/디자인/라우팅 변경 없음
- sitemap 자동 반영: blog 36→39 (색인 39편)

### 2026-06-08 세션 O — AdSense 통제요인 최종 정리 (thin 앱페이지 색인 제거)
- 심사관 관점 교차검수 결과, 유일한 잔여 리스크 = 클라이언트 렌더 앱 페이지가 크롤러엔 얇게 보임
- sitemap에서 /release·/archive·/compost·/collection 제외 (119→115 URL)
- /collection·/archive·/compost 에 robots noindex 부여(서버래퍼). /release 는 클라이언트라 sitemap 제외만
- /best-results(~5,583자)·/insights(~15,500자) 등 실콘텐츠는 색인 유지. 구조/URL/디자인/기능 불변

### 2026-06-09 세션 P — AdSense 신뢰도/콘텐츠 보강 (5개 우선순위)
- ① 매거진 5편 추가(lib/contentSystem.ts, 각 1000~1136자, h2/h3, 겹치지 않는 신주제): what-happens-when-angry·do-emotions-expire·mood-not-attitude·emotions-seen-in-hindsight·small-emotions-pile-up. 매거진 렌더러에 추가형 `### `→h3 규칙
- ② About 강화(app/about/page.tsx): "오늘무드가 추구하는 가치" 섹션 + "운영자 소개"(청소년 회복·성장 디렉터 최샤론 목사) E-E-A-T
- ③ FAQ 4문항 추가(app/faq/page.tsx): 결과 저장/모바일/누가 만들었나(운영자)/광고 표시 이유
- ④ 감정파쇄함 설명(app/archive/ArchiveClient.tsx): 상단 300자+ 설명 카드(클라 렌더, /archive는 noindex라 SEO 무관·브라우저 노출)
- ⑤ 홈 하단 SEO 섹션(app/HomeClient.tsx): 5개 H2 블록(무엇인가/기록 이유/자주 선택 감정/이용 방법/아카이브 바로가기 내부링크), SSR 노출
- sitemap 자동: magazine 23→28. 구조/URL/디자인/라우팅 불변(렌더러 h3 추가형만)

### 2026-06-09 세션 Q — 콘텐츠 플랫폼 신뢰감 강화 (내부링크·작성자·About·홈)
- 매거진은 이미 28편(목표 15~20 초과) → 양 추가 대신 "플랫폼 신뢰감"에 집중(사용자 원칙 부합). 요청 10주제 중 다수가 기존/직전 추가분과 중복이라 신규 글 추가 안 함
- 매거진 [slug]: **작성자 신뢰 바이라인**(오늘무드 편집팀·운영 최샤론·About) + 관련글을 **"함께 읽으면 좋은 글"**(카테고리 교차 5개)로 강화
- 블로그 [slug]: 작성자 표기 "오늘무드 편집팀 · 운영 최샤론"으로 정렬(기존 Sharon+About 유지)
- About: "왜 만들었나요?" + "어떤 사람을 위한 서비스인가요?" 섹션 추가(최샤론 목사 운영자 정보 유지)
- 홈 하단: "사람들이 자주 찾는 감정"(감정도감 6링크) + "최근 매거진"(실제 글 4개, 날짜순) 블록 추가
- 매거진 렌더러 ### →h3, 구조/URL/디자인/세계관 불변. Google 체크리스트 7개 전부 YES

### 2026-05-19 세션 A — SEO 콘텐츠 시스템 구축
- `/emotion-fatigue` 생성 (감정 피로 아티클, 다크 bg)
- `/best-results` 생성 (인기 감정 결과 8종 카드, 공유/저장 버튼)

### 2026-05-19 세션 B — 콘텐츠 확장
- `/hide-emotions` 생성 (새벽 감정 새벽 메모장 느낌)
- `/funny-but-comforting` 생성 (병맛·밈·위로 관계)
- `/archive` 업그레이드 — 우걱이 실험실 현황 위젯 (날짜 시드 랜덤)
- `/` 메인 — 랜덤 훅 문구 8종 pill 추가

### 2026-05-19 세션 C — 타이포그래피 리디자인
- `layout.tsx`: Noto Serif KR (`--font-maru`, w400/600) 추가
- `globals.css`: Pretendard variable font CDN (`--font-prose`) + 아티클 CSS 클래스
- `/blog`, `/blog/[slug]` 전면 재작성 (Noto Serif KR 제목 + Pretendard 본문, line-height 2.1)
- SEO 아티클 3종 + `/best-results` 타이포 통일

### 2026-05-19 세션 D — 결과 저장 시스템 업그레이드
- `/release` 완료 화면 전면 재작성:
  - `DISPOSAL_RESULTS` 8종 병맛 결과로 교체
  - 감정 폐기 영수증 디자인 (찢긴 종이 끝, 스탬프, 바코드)
  - 통계 섹션 (처리시간, 잔여량%, 현재상태, 파쇄등급)
  - 우걱이 코멘트 8종 랜덤
  - 저장 버튼: navigator.share() + clipboard 폴백 + 흔들림 애니

### 2026-05-19 세션 F — 감정 부산물 시스템 구축
- `lib/byproducts.ts` — 30종 부산물 데이터 (COMMON~LEGENDARY SADNESS 6등급, 모드별 희귀도 가중치)
- `hooks/useByproductStore.ts` — localStorage 기반 수집함 (중복 카운트, 수집일 기록)
- `app/release/page.tsx` — done 상태에 부산물 카드 추가 (희귀도 뱃지, 냄새/잔여감정, 부분파쇄 경고, 도감 링크)
- `app/collection/page.tsx` — 감정 부산물 도감 페이지 (희귀도 필터, 수집 통계, 미수집 카운트, 상세 토글)

### 2026-05-20 세션 G — 완전 다국어(i18n) 시스템 구축
- `middleware.ts` — 첫 방문 시 Accept-Language 헤더로 언어 자동 감지 + 쿠키 저장
- `lib/getLocale.ts` — 서버 컴포넌트용 언어 읽기 유틸리티 (쿠키 우선)
- `lib/i18n.ts` — about/privacy/blog/collection/insights/today/archive 섹션 5개 언어 추가 완료
- `app/about/page.tsx` — 5개 언어 완전 번역 (한/영/일/스/중)
- `app/privacy/page.tsx` — 5개 언어 완전 번역
- `lib/articlesTranslations.ts` — 블로그 아티클 21편 × 영어 완전 번역 + 일/스/중 메타데이터
- `lib/getLocalizedArticle.ts` — 로케일에 맞는 아티클 반환 유틸리티
- `app/blog/[slug]/page.tsx` — 다국어 아티클 렌더링 적용
- `app/today/page.tsx` — useLocale() 적용, 날짜 형식/버튼/라벨 다국어
- `app/archive/page.tsx` — useLocale() 적용, timeAgo/formatDate/라벨 다국어
- `app/insights/page.tsx` — useLocale() 적용, 헤더/통계/섹션 라벨 다국어
- `app/collection/page.tsx` — useLocale() 적용, 타이틀/빈상태/CTA 다국어

### 2026-05-21 세션 H — 번역 완성 (release + best-results)
- `lib/i18n.ts` — release 섹션 54개 키 × 5개 언어 (UI 전체 커버)
- `app/release/page.tsx` — 완전 다국어: MODES/MODE_SUBMIT_LABELS/RESULTS/LOADING_MSGS/PLACEHOLDERS/SOHWA_MSGS 로케일 분기, 모든 UI 텍스트 t.release.* 적용
- `app/best-results/BestResultsClient.tsx` — 완전 다국어: RESULTS_KO/EN 분기, UI 객체 5개 언어, share/save 버튼/CTA/footer 다국어

### 2026-05-19 세션 E — 브랜드 디렉션 통일 (감정 처리 시설 세계관)
- `globals.css`: `.facility-card`, `.receipt-top/bottom`, `.ugogi-stamp`, `.facility-btn`, `.ugogi-trace`, `.facility-divider` CSS 클래스 추가
- `components/ugogi/UgogiTrace.tsx` 생성 — 랜덤 우걱이 코멘트+상태 배지 (재사용 가능)
- `about/page.tsx` 전면 재작성 — "우걱이 감정 처리 시설 안내서" 스타일 (시설 소개, 운영자 프로필, 처리 가능 감정 목록, 이용 절차, 주의사항)
- `today/page.tsx` 업데이트 — 감정별 우걱이 톤 메시지 교체, done 상태에 `UgogiTrace` + 접수 확인 UI 추가

---

## 현재 상태 / Known Issues

- 에드센스 미승인 상태 (콘텐츠 강화 진행 중)
- 인증/회원가입 없음 — localStorage만 사용
- 다국어(i18n) 전체 페이지 완료 (한/영/일/스/중)

---

## 다음 작업 후보 (우선순위 없음, 작업자가 결정)

- [ ] 에드센스 승인 신청
- [ ] `/best-results` 에 실제 공유 이미지 생성 (html2canvas 또는 og:image)
- [ ] 블로그 아티클 추가 (현재 12개)
- [ ] SEO 아티클 추가 (/emotion-types, /how-to-release 등)
- [ ] 메인 페이지 훅 문구 추가
- [ ] 우걱이 캐릭터 일러스트 도입
- [ ] PWA manifest + 오프라인 지원
- [ ] 다국어 확장 (블로그/아티클 페이지)

---

*마지막 업데이트: 2026-05-19*
