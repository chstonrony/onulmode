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
