# 오늘무드 (Onulmode) — 프로젝트 플래닝

> 오늘의 기분과 감정을 일기처럼 기록하는 감성 웹 서비스

---

## 1. 서비스 비전

### 핵심 가치
- **진정성** — 있는 그대로의 감정을 기록하는 공간
- **치유** — 감정을 쓰는 행위 자체가 심리적 돌봄이 된다
- **아름다움** — 기록이 예술이 되는 경험
- **개인화** — 나만의 감정 아카이브

### 한 줄 정의
> "오늘 어떤 기분이었나요? 그 감정에 색을 입히세요."

### 타겟 유저
- 20–35세 감성적 밀레니얼 / Z세대
- 자기 성찰과 멘탈 헬스에 관심 있는 사람
- 일기를 쓰고 싶지만 글이 부담스러운 사람
- 감정 데이터를 시각화하고 싶은 사람

---

## 2. 핵심 기능 (MVP)

### Phase 1 — 기록의 시작
- [ ] **오늘의 무드 선택** — 감정 휠 (Emotion Wheel) UI로 기분 선택
- [ ] **감정 색상 매핑** — 선택한 감정이 고유 색상으로 변환
- [ ] **짧은 일기 쓰기** — 텍스트 + 이모지 + 선택적 이미지 첨부
- [ ] **무드 카드 생성** — 오늘의 무드가 아름다운 카드로 저장됨
- [ ] **회원가입 / 로그인** — 이메일 or 소셜 로그인 (Google, Apple, Kakao)

### Phase 2 — 나의 감정 아카이브
- [ ] **감정 캘린더** — 달력에 날마다 색으로 표현된 감정 기록
- [ ] **감정 히스토리** — 일/주/월별 감정 변화 그래프
- [ ] **무드 패턴 인사이트** — "이번 달 가장 많이 느낀 감정은 평온이에요"
- [ ] **감정 일기 검색** — 특정 감정, 날짜, 키워드로 일기 검색

### Phase 3 — 아트 & 커뮤니티
- [ ] **무드 아트 갤러리** — 오늘의 감정을 AI가 추상화/일러스트로 표현
- [ ] **공개 무드 피드** — 익명으로 오늘의 무드 공유 (SNS 형태)
- [ ] **감정 공명** — 비슷한 감정을 느낀 사람들과 연결
- [ ] **심리상담사 칼럼** — 전문가가 큐레이션한 감정 가이드

---

## 3. 기술 스택

### Frontend
```
Next.js 14 (App Router)     — React 프레임워크, Vercel 최적화
TypeScript                   — 타입 안전성
Tailwind CSS                 — 유틸리티 퍼스트 스타일링
Framer Motion                — 부드러운 애니메이션
shadcn/ui                    — 접근성 있는 기본 컴포넌트
```

### Backend / Database
```
Next.js API Routes           — 서버리스 API
Supabase                     — PostgreSQL DB + 실시간 + 인증
Prisma ORM                   — 타입세이프 DB 쿼리 (선택적)
```

### AI / 아트
```
OpenAI API (GPT-4o)          — 감정 인사이트, 일기 도우미
Replicate / Stability AI     — 감정 기반 AI 아트 생성
```

### 인프라 & 배포
```
Vercel                       — 프론트엔드 배포 (자동 CI/CD)
GitHub                       — 버전 관리 + PR 워크플로
Supabase                     — 데이터베이스 (managed)
Cloudflare Images            — 이미지 최적화 & CDN (선택적)
```

---

## 4. 디자인 시스템

### 감정 색상 팔레트 (Emotion Color System)

감정 → 색상 매핑은 심리학적 연구(Geneva Emotion Wheel)를 기반으로 설계.

| 감정 군 | 색상 | 헥스 |
|------|------|------|
| 기쁨 / 행복 | 따뜻한 황금 노랑 | `#F4C542` |
| 평온 / 안정 | 세이지 그린 | `#7DAF8E` |
| 슬픔 | 먹 블루 그레이 | `#6B7FA3` |
| 불안 / 긴장 | 뮤트 라벤더 | `#9B8EC4` |
| 분노 | 딥 테라코타 | `#C4604A` |
| 설렘 / 기대 | 코랄 피치 | `#F08B6E` |
| 피로 / 무기력 | 모래 베이지 | `#C4B9A8` |
| 감사 / 사랑 | 로즈 핑크 | `#E8A0A8` |

### 폰트 시스템
```
Pretendard Variable        — 한국어 본문 / 헤드라인 (가변 폰트)
Instrument Serif           — 영문 에디토리얼 / 감성적 강조
Noto Serif KR              — 일기 본문 (따뜻한 세리프 느낌)
```

### 디자인 철학
- **Calm & Honest** — 과도한 장식 없이 감정 자체가 주인공
- **Organic Shapes** — 완벽한 직선보다 부드러운 곡선과 유기적 형태
- **Color as Language** — 텍스트 이전에 색으로 먼저 감정을 표현
- **Breathing Space** — 넓은 여백, 조용한 배경이 기록을 돕는다

### 레이아웃 원칙
- 모바일 퍼스트 (70%+ 사용자가 모바일로 접근 예상)
- 최대 콘텐츠 너비: 480px (모바일) / 768px (태블릿) / 1024px (데스크탑)
- 4px 그리드 시스템
- 접근성: WCAG 2.1 AA 준수

---

## 5. 서비스 구조 (Information Architecture)

```
/                           랜딩 페이지 (브랜드 소개 + 온보딩)
/onboarding                 첫 사용자 온보딩 플로우
/today                      오늘의 무드 기록 (메인 기능)
/archive                    나의 감정 아카이브 (캘린더 뷰)
/archive/[date]             특정 날짜 일기 상세
/insights                   무드 패턴 인사이트
/gallery                    무드 아트 갤러리
/explore                    공개 무드 피드 (커뮤니티)
/profile                    내 프로필 + 설정
/auth/login                 로그인
/auth/signup                회원가입
```

---

## 6. 핵심 화면 설계

### 6-1. 오늘의 무드 기록 (/today)

```
┌─────────────────────────────┐
│  오늘은 어떤 하루였나요?      │
│  2026년 5월 14일 수요일       │
│                              │
│    [감정 휠 UI]              │
│    중앙 탭으로 감정 선택      │
│                              │
│  지금 가장 가까운 감정은?     │
│  ○ 기쁨  ○ 평온  ○ 설렘     │
│  ○ 슬픔  ○ 불안  ○ 피로     │
│                              │
│  [오늘을 한 줄로 표현하면?]  │
│  ___________________________  │
│                              │
│  [더 쓰고 싶다면...]         │
│  ___________________________  │
│  ___________________________  │
│                              │
│    [오늘의 무드 저장하기]     │
└─────────────────────────────┘
```

### 6-2. 감정 캘린더 (/archive)

```
┌─────────────────────────────┐
│  < 2026년 5월 >              │
│                              │
│  일  월  화  수  목  금  토  │
│              ■  ●  ●  ●     │  ■=오늘색상, ●=기록된 날
│   ●  ●  ●  ●  ●  ●  ●     │
│   ●  ●  ●  ●  ●  ●  ●     │
│   ●  ●  ●  ●  ●  ●  ●     │
│   ●  ●  ●                   │
│                              │
│  이번 달 감정 요약            │
│  ████░░  평온 (42%)          │
│  ██░░░░  기쁨 (22%)          │
│  █░░░░░  피로 (18%)          │
└─────────────────────────────┘
```

### 6-3. 무드 카드 (생성되는 아트)

```
┌─────────────────────────────┐
│                              │
│    [배경: 오늘의 감정 색상]  │
│                              │
│         2026.05.14           │
│                              │
│         평온 / Calm          │
│                              │
│  "오늘은 그냥 좋은 날이었다"  │
│                              │
│      [AI 생성 아트 요소]      │
│                              │
└─────────────────────────────┘
```

---

## 7. 데이터 모델

```typescript
// User
interface User {
  id: string
  email: string
  name: string
  avatar_url?: string
  timezone: string
  created_at: Date
}

// MoodEntry (오늘의 무드 기록)
interface MoodEntry {
  id: string
  user_id: string
  date: Date                    // YYYY-MM-DD
  emotion: EmotionType          // 'joy' | 'calm' | 'sad' | 'anxious' | 'angry' | 'excited' | 'tired' | 'grateful'
  emotion_intensity: number     // 1–10
  color: string                 // HEX color mapped from emotion
  title: string                 // 한 줄 요약 (max 80자)
  body?: string                 // 본문 일기 (optional, max 2000자)
  mood_art_url?: string         // AI 생성 아트 이미지 URL
  is_public: boolean            // 공개 여부
  created_at: Date
  updated_at: Date
}

// Emotion Wheel Category
type EmotionType = 
  | 'joy'       // 기쁨
  | 'calm'      // 평온
  | 'sad'       // 슬픔
  | 'anxious'   // 불안
  | 'angry'     // 분노
  | 'excited'   // 설렘
  | 'tired'     // 피로
  | 'grateful'  // 감사
```

---

## 8. 개발 로드맵

### Sprint 0 — 환경 세팅 (1주)
- [ ] GitHub 레포 생성 + main/dev 브랜치 전략 설정
- [ ] Next.js 14 + TypeScript 프로젝트 초기화
- [ ] Tailwind CSS + shadcn/ui 설정
- [ ] Supabase 프로젝트 생성 + DB 스키마 설계
- [ ] Vercel 연결 + 환경 변수 설정
- [ ] ESLint + Prettier + Husky 설정
- [ ] CLAUDE.md 작성 (AI 코딩 가이드)

### Sprint 1 — 인증 & 기본 구조 (1주)
- [ ] Supabase Auth 연동 (이메일 + Google OAuth)
- [ ] 레이아웃 컴포넌트 (헤더, 네비게이션, 푸터)
- [ ] 랜딩 페이지 (/) 
- [ ] 로그인 / 회원가입 페이지
- [ ] 기본 디자인 토큰 & Tailwind 설정

### Sprint 2 — 핵심 기능: 무드 기록 (1–2주)
- [ ] 감정 선택 UI (Emotion Wheel 컴포넌트)
- [ ] 무드 기록 폼 (감정 + 제목 + 본문)
- [ ] 무드 저장 API (POST /api/mood)
- [ ] 무드 카드 생성 & 저장 완료 화면
- [ ] 오늘의 무드 수정 / 삭제

### Sprint 3 — 아카이브 & 캘린더 (1주)
- [ ] 감정 캘린더 컴포넌트
- [ ] 월별 감정 데이터 로딩
- [ ] 날짜별 일기 상세 페이지
- [ ] 감정 통계 (간단한 인사이트)

### Sprint 4 — 폴리싱 & 론칭 준비 (1주)
- [ ] 애니메이션 & 마이크로 인터랙션 (Framer Motion)
- [ ] 반응형 디자인 완성 (모바일 최적화)
- [ ] SEO 메타 태그 + OG 이미지
- [ ] 에러 핸들링 & 로딩 상태
- [ ] 성능 최적화 (Lighthouse 90+)
- [ ] 베타 테스트 & 피드백 반영

### Future — AI & 커뮤니티
- [ ] AI 무드 아트 생성 (Replicate API)
- [ ] GPT 기반 감정 인사이트 코멘트
- [ ] 공개 무드 피드
- [ ] 심리상담사 큐레이션 콘텐츠
- [ ] iOS/Android PWA 최적화

---

## 9. 폴더 구조

```
onulmode/
├── app/                        # Next.js App Router
│   ├── (auth)/
│   │   ├── login/
│   │   └── signup/
│   ├── (app)/
│   │   ├── today/              # 오늘의 무드 기록
│   │   ├── archive/            # 감정 캘린더
│   │   │   └── [date]/
│   │   ├── insights/           # 무드 인사이트
│   │   └── profile/
│   ├── api/
│   │   ├── mood/               # 무드 CRUD API
│   │   └── auth/               # 인증 API
│   ├── layout.tsx
│   └── page.tsx                # 랜딩 페이지
│
├── components/
│   ├── ui/                     # shadcn/ui 기본 컴포넌트
│   ├── mood/
│   │   ├── EmotionWheel.tsx    # 감정 선택 휠
│   │   ├── MoodCard.tsx        # 무드 카드
│   │   ├── MoodForm.tsx        # 기록 폼
│   │   └── MoodCalendar.tsx    # 캘린더 뷰
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Navigation.tsx
│   │   └── Footer.tsx
│   └── shared/
│       ├── ColorDot.tsx        # 감정 색상 점
│       └── EmotionBadge.tsx    # 감정 배지
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts           # Supabase 클라이언트
│   │   └── queries.ts          # DB 쿼리 함수
│   ├── emotions.ts             # 감정 정의 & 색상 매핑
│   └── utils.ts
│
├── hooks/
│   ├── useMoodEntries.ts       # 무드 데이터 훅
│   └── useAuth.ts              # 인증 훅
│
├── types/
│   └── index.ts                # 공통 타입 정의
│
├── public/
│   └── emotions/               # 감정 아이콘 SVG
│
├── PLAN.md                     # 이 파일
├── DESIGN.md                   # 디자인 시스템 레퍼런스
├── CLAUDE.md                   # AI 코딩 가이드
└── README.md
```

---

## 10. 디자인 레퍼런스 & 영감

### 서비스 레퍼런스
- **Daylio** — 감정 트래킹의 UX 단순함
- **Notion** — 글쓰기 경험의 부드러움
- **Monument Valley** — 게임이지만 감성적 색감과 공간감
- **Calm** — 마음을 안정시키는 시각 언어

### 아트 & 심리학 레퍼런스
- **제네바 감정 휠 (Geneva Emotion Wheel)** — 감정 분류 체계
- **색채 심리학** — Faber Birren의 감정-색상 연구
- **아웃사이더 아트 / 나이브 아트** — 날 것의 감정 표현
- **Mark Rothko** — 색면 추상으로 감정을 담는 회화

---

## 11. KPI & 성공 지표

### 론칭 후 3개월 목표
- DAU (일일 활성 유저): 500명
- 무드 기록률: 가입자 중 70% 이상이 첫 기록
- 재방문율: 7일 리텐션 40%
- 감정 기록 완료율: 시작한 기록 중 85% 완료

---

## 12. 다음 첫 번째 액션

1. **GitHub 레포 생성** — `onulmode` 이름으로, Public or Private 결정
2. **Next.js 프로젝트 초기화** — `npx create-next-app@latest`
3. **Supabase 프로젝트 생성** — 무료 티어로 시작
4. **Vercel 연결** — GitHub 레포와 Vercel 연동
5. **첫 커밋 & 배포 확인** — Hello World가 Vercel에 배포되는지 확인

---

*최종 업데이트: 2026-05-14*  
*버전: 0.1.0 — 초기 플래닝*
