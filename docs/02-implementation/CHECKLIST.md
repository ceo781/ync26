# Hyper-Connect MVP 구현 체크리스트

**Version**: 2.0
**Last Updated**: 2026-01-19
**Purpose**: 개발 진행 상황 추적 및 검증

---

## 1. Phase 1 (P0 - 필수) 체크리스트

### 1.1 프로젝트 초기 설정

#### Frontend (Next.js)
- [ ] Next.js 14 프로젝트 생성 (App Router)
- [ ] TypeScript 설정
- [ ] Tailwind CSS 설치 및 설정
- [ ] Shadcn/ui 설치 및 설정
- [ ] React Hook Form + Zod 설치
- [ ] TanStack Query 설치 및 Provider 설정
- [ ] Zustand 설치
- [ ] ESLint + Prettier 설정
- [ ] 환경 변수 설정 (.env.local)

#### Backend (NestJS)
- [ ] NestJS 프로젝트 생성
- [ ] Prisma 설치 및 초기화
- [ ] PostgreSQL 연결 설정
- [ ] Redis 연결 설정 (선택)
- [ ] JWT 인증 모듈 설정
- [ ] CORS 설정
- [ ] Validation Pipe 설정
- [ ] 환경 변수 설정 (.env)

#### 데이터베이스
- [ ] Prisma 스키마 작성 완료
- [ ] 마이그레이션 실행
- [ ] 옵션 시드 데이터 입력 (Ferrari, Porsche, Lamborghini, McLaren)
- [ ] 테스트 계정 생성 (admin, seller)

---

### 1.2 인증 시스템

#### API 엔드포인트
- [ ] `POST /auth/register` - 회원가입
- [ ] `POST /auth/login` - 로그인
- [ ] `POST /auth/refresh` - 토큰 갱신
- [ ] `POST /auth/logout` - 로그아웃
- [ ] `GET /auth/me` - 현재 사용자 정보

#### Frontend
- [ ] 로그인 페이지 (`/login`)
- [ ] 회원가입 페이지 (`/register`)
- [ ] 인증 상태 관리 (NextAuth.js 또는 Zustand)
- [ ] Protected Route 구현
- [ ] 자동 로그아웃 (토큰 만료)

#### 검증 항목
- [ ] 비밀번호 해싱 (bcrypt, salt rounds: 12)
- [ ] JWT 토큰 생성/검증
- [ ] 이메일 중복 체크
- [ ] 비밀번호 강도 검증 (8자 이상, 영문/숫자/특수문자)

---

### 1.3 F1. 차량 등록 시스템

#### API 엔드포인트
- [ ] `POST /vehicles` - 차량 생성
- [ ] `PATCH /vehicles/:id` - 차량 수정
- [ ] `PATCH /vehicles/:id/status` - 상태 변경 (draft → pending)
- [ ] `DELETE /vehicles/:id` - 차량 삭제 (draft만)
- [ ] `GET /options` - 옵션 목록 조회 (제조사별)

#### 미디어 업로드
- [ ] `POST /media/presigned-url` - 업로드 URL 요청
- [ ] `POST /media/confirm-upload` - 업로드 완료 확인
- [ ] `PATCH /media/reorder` - 순서 변경
- [ ] `DELETE /media/:id` - 미디어 삭제
- [ ] S3 버킷 생성 및 설정
- [ ] CloudFront 배포 설정
- [ ] Lambda 이미지 리사이징 (선택)

#### 정비 이력
- [ ] `POST /vehicles/:id/maintenance` - 정비 이력 추가
- [ ] `DELETE /vehicles/:id/maintenance/:maintenanceId` - 정비 이력 삭제

#### Frontend 폼 (6단계)
- [ ] **Step 1: 기본 정보**
  - [ ] 제조사 Select
  - [ ] 모델명 Input
  - [ ] 연식 Year Picker
  - [ ] 주행거리 Number Input (콤마 포맷팅)
  - [ ] VIN Input (17자 검증)
  - [ ] 차량등록번호 Input (선택)
  - [ ] 매칭넘버 Radio
  - [ ] 희망 판매가 Number Input (콤마 포맷팅)

- [ ] **Step 2: 옵션 선택**
  - [ ] 제조사별 옵션 로드
  - [ ] 카테고리별 그룹화
  - [ ] 최소 3개 선택 검증
  - [ ] 기타 옵션 텍스트 입력

- [ ] **Step 3: 정비 이력**
  - [ ] 동적 추가/삭제
  - [ ] 정비 일자 Date Picker
  - [ ] 정비소 이름 Input
  - [ ] 정비 내용 Textarea
  - [ ] 문서 업로드 (PDF/이미지)

- [ ] **Step 4: 소모품 상태**
  - [ ] 타이어 잔량 Slider
  - [ ] 타이어 교체 일자/브랜드
  - [ ] 브레이크 패드 두께
  - [ ] 브레이크 디스크 상태 Select
  - [ ] 엔진오일 교체 일자/주행거리

- [ ] **Step 5: 미디어 업로드**
  - [ ] 드래그 앤 드롭 영역
  - [ ] 이미지 미리보기 그리드
  - [ ] 최소 20장 검증
  - [ ] 업로드 진행률 표시
  - [ ] 순서 변경 (드래그 앤 드롭)
  - [ ] 삭제 기능

- [ ] **Step 6: 최종 확인**
  - [ ] 모든 정보 요약 표시
  - [ ] 각 Step으로 수정 이동
  - [ ] 이용약관 동의 체크박스
  - [ ] 제출 버튼

#### 공통 기능
- [ ] 진행률 표시 바 (Step 1/6 - 17%)
- [ ] 임시 저장 기능 (LocalStorage + API)
- [ ] 폼 검증 에러 표시
- [ ] 로딩 상태 표시

---

### 1.4 차량 목록/상세 페이지

#### API 엔드포인트
- [ ] `GET /vehicles` - 목록 조회 (필터링, 페이지네이션)
- [ ] `GET /vehicles/:id` - 상세 조회

#### 차량 목록 페이지 (`/vehicles`)
- [ ] 차량 카드 그리드 (반응형)
- [ ] 필터링 (제조사, 가격대, 연식)
- [ ] 정렬 (최신순, 가격순, 인기순)
- [ ] 검색 기능 (모델명, VIN)
- [ ] 페이지네이션
- [ ] 로딩 스켈레톤

#### 차량 상세 페이지 (`/vehicles/[id]`)
- [ ] 이미지 갤러리 (Lightbox)
- [ ] 가격 표시 (KRW / USD)
- [ ] 기본 정보 아이콘 표시
- [ ] Tab 시스템 구현
  - [ ] Overview Tab (설명, 옵션)
  - [ ] Inspection Tab (검수 리포트 - P1)
  - [ ] History Tab (정비 이력 타임라인)
  - [ ] Documents Tab (문서 뷰어)
- [ ] 하단 고정 CTA 버튼

---

### 1.5 관리자 시스템

#### API 엔드포인트
- [ ] `GET /admin/vehicles/pending` - 대기 목록
- [ ] `POST /admin/vehicles/:id/approve` - 승인
- [ ] `POST /admin/vehicles/:id/reject` - 거절

#### Frontend
- [ ] 관리자 대시보드 (`/admin`)
- [ ] 대기 중인 차량 목록 테이블
- [ ] 차량 상세 확인 모달/페이지
- [ ] 승인 버튼 (메모 입력)
- [ ] 거절 버튼 (사유 입력 필수)
- [ ] 권한 검증 (admin만 접근)

---

### 1.6 레이아웃 및 공통 컴포넌트

#### 레이아웃
- [ ] Root Layout (Providers, Toaster)
- [ ] Auth Layout (중앙 정렬, 로고)
- [ ] Main Layout (Header, Footer, BottomNav)

#### Header 컴포넌트
- [ ] 로고
- [ ] 네비게이션 (홈, 마켓, 판매하기)
- [ ] 언어/통화 선택 (P1)
- [ ] 알림 아이콘 (P2)
- [ ] 로그인/프로필 드롭다운

#### Footer 컴포넌트
- [ ] 회사 정보
- [ ] 링크 (이용약관, 개인정보처리방침)
- [ ] SNS 아이콘

#### BottomNav (모바일)
- [ ] 홈, 마켓, 판매하기, 메시지, 마이페이지

---

## 2. Phase 2 (P1 - 중요) 체크리스트

### 2.1 검수 리포트 (읽기 전용)
- [ ] `GET /vehicles/:id/inspection` - 검수 리포트 조회
- [ ] 종합 등급/점수 표시
- [ ] 카테고리별 점수 그래프
- [ ] 120가지 체크리스트 시각화
- [ ] 차량 다이어그램 (손상 부위 표시)

### 2.2 다국어/다통화 지원
- [ ] i18n 설정 (next-intl 또는 react-i18next)
- [ ] 한국어/영어 번역 파일
- [ ] 환율 API 연동
- [ ] 언어/통화 선택 UI
- [ ] 아랍어 + RTL 레이아웃 (선택)

### 2.3 판매자 대시보드
- [ ] 내 차량 목록
- [ ] 상태 타임라인 표시
- [ ] 조회수 통계 (국내/해외)
- [ ] 희망 판매가 수정

### 2.4 4K 영상 스트리밍
- [ ] AWS MediaConvert 설정
- [ ] HLS 인코딩 파이프라인
- [ ] Video.js 플레이어 통합

---

## 3. 비기능 요구사항 체크리스트

### 3.1 성능
- [ ] 페이지 로딩 3초 이내
- [ ] API 응답 200ms 이내
- [ ] 이미지 Lazy Loading
- [ ] Code Splitting
- [ ] CDN 캐싱 활성화

### 3.2 보안
- [ ] HTTPS 강제
- [ ] CORS 설정
- [ ] Rate Limiting
- [ ] SQL Injection 방지 (Prisma)
- [ ] XSS 방지 (입력 sanitize)
- [ ] 민감 정보 마스킹

### 3.3 모니터링
- [ ] Vercel Analytics 설정
- [ ] Sentry 에러 트래킹
- [ ] CloudWatch 로그 설정

### 3.4 접근성
- [ ] 시맨틱 HTML
- [ ] 키보드 네비게이션
- [ ] 스크린 리더 지원
- [ ] 색상 대비 확인

---

## 4. 배포 체크리스트

### 4.1 스테이징 배포
- [ ] 환경 변수 설정
- [ ] 데이터베이스 마이그레이션
- [ ] 시드 데이터 입력
- [ ] 기능 테스트
- [ ] 성능 테스트

### 4.2 프로덕션 배포
- [ ] 도메인 설정
- [ ] SSL 인증서 설정
- [ ] CDN 설정 완료
- [ ] 백업 설정
- [ ] 모니터링 대시보드 설정
- [ ] 비상 연락망 설정

---

## 5. 품질 검증 체크리스트

### 5.1 테스트
- [ ] 단위 테스트 커버리지 70% 이상
- [ ] API 통합 테스트
- [ ] E2E 테스트 (핵심 플로우)
- [ ] 모바일 반응형 테스트
- [ ] 크로스 브라우저 테스트

### 5.2 코드 품질
- [ ] ESLint 오류 없음
- [ ] TypeScript 오류 없음
- [ ] 코드 리뷰 완료
- [ ] 보안 취약점 스캔

### 5.3 문서화
- [ ] API 문서 최신화
- [ ] README 작성
- [ ] 배포 가이드 작성
- [ ] 운영 매뉴얼 작성

---

## 진행 상황 요약

| 카테고리 | 완료 | 총 항목 | 진행률 |
|----------|------|---------|--------|
| 프로젝트 설정 | 0 | 18 | 0% |
| 인증 시스템 | 0 | 12 | 0% |
| F1 차량 등록 | 0 | 52 | 0% |
| 목록/상세 | 0 | 20 | 0% |
| 관리자 | 0 | 10 | 0% |
| 레이아웃 | 0 | 15 | 0% |
| **Phase 1 총계** | **0** | **127** | **0%** |

---

## 변경 이력

| 버전 | 날짜 | 변경 내용 | 작성자 |
|------|------|----------|--------|
| 1.0 | 2026-01-19 | 초안 작성 | Claude |
