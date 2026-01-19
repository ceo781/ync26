# Hyper-Connect

> 글로벌 하이퍼카 거래 플랫폼

서울오토갤러리 및 대한민국 자동차 매매시장의 오프라인 자산을 디지털화하여 글로벌 바이어와 국내 자산가를 직접 연결하는 하이퍼카 거래 플랫폼입니다.

---

## 프로젝트 개요

### 핵심 가치
- **신뢰**: 검증된 차량 정보와 전문가 검수 리포트
- **글로벌**: 다국어/다통화 지원, 해외 바이어 접근
- **프리미엄**: 럭셔리 브랜드에 걸맞는 시각적 경험
- **효율**: 불필요한 대면 협상 감소, 거래 속도 향상

### 타겟 사용자
- **국내**: 슈퍼카/하이퍼카 보유 자산가, 위탁 판매자
- **글로벌**: 중동(UAE, 사우디), 북미, 일본 등 고급 차량 수입 바이어

---

## 기술 스택

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Shadcn/ui
- React Hook Form + Zod
- TanStack Query

### Backend
- NestJS
- Prisma ORM
- PostgreSQL
- Redis

### Infrastructure
- Vercel (Frontend)
- AWS (EC2, RDS, S3, CloudFront)
- GitHub Actions (CI/CD)

---

## 프로젝트 구조

```
ync26/
├── docs/                          # 설계 문서
│   ├── 00-requirement/            # 요구사항
│   │   ├── PRD_Hyper-Connect_MVP.md
│   │   ├── 기능_우선순위_분류.md
│   │   └── 와이어프레임_화면설계.md
│   ├── 01-development/            # 개발 문서
│   │   ├── 01_시스템_아키텍처.md
│   │   ├── 02_데이터베이스_스키마.md
│   │   ├── 03_API_명세서.md
│   │   ├── 04_페이지_구조_설계.md
│   │   ├── 05_F1_차량등록폼_설계.md
│   │   └── 06_미디어_처리_설계.md
│   ├── 02-implementation/         # 구현 문서
│   │   ├── prisma/schema.prisma   # DB 스키마
│   │   ├── types/index.ts         # TypeScript 타입
│   │   ├── seed/options-seed.ts   # 시드 데이터
│   │   ├── config/.env.example    # 환경 변수 템플릿
│   │   ├── DEVELOPMENT_GUIDE.md   # 개발 가이드
│   │   └── CHECKLIST.md           # 구현 체크리스트
│   └── 00_마스터_설계문서.md       # 마스터 설계 문서
└── mockup/                        # UI 목업
```

---

## 주요 기능 (MVP)

### Phase 1 (P0 - 필수)
1. **F1. 하이엔드 자산 등록**: 6단계 폼, 옵션/정비이력/소모품/미디어
2. **차량 목록**: 필터링, 페이지네이션, 검색
3. **차량 상세**: Tab 시스템, 이미지 갤러리
4. **관리자 승인**: 승인/거절, 대기 목록
5. **기본 인증**: 회원가입, 로그인, JWT

### Phase 2 (P1 - 중요)
- 검수 리포트 (120가지 항목)
- 다국어/다통화 지원
- 판매자 대시보드
- 4K 영상 스트리밍

### Phase 3 (P2 - 개선)
- 실시간 오퍼 시스템
- 화상 검수 예약
- 2FA 인증
- 경매 시스템

---

## 문서 목록

| 문서 | 설명 |
|------|------|
| [마스터 설계문서](docs/00_마스터_설계문서.md) | 전체 시스템 개요 |
| [PRD](docs/00-requirement/PRD_Hyper-Connect_MVP.md) | 제품 요구사항 명세 |
| [시스템 아키텍처](docs/01-development/01_시스템_아키텍처.md) | 전체 아키텍처 설계 |
| [DB 스키마](docs/01-development/02_데이터베이스_스키마.md) | 데이터베이스 설계 |
| [API 명세서](docs/01-development/03_API_명세서.md) | API 상세 명세 |
| [개발 가이드](docs/02-implementation/DEVELOPMENT_GUIDE.md) | 개발 환경 및 컨벤션 |
| [체크리스트](docs/02-implementation/CHECKLIST.md) | 구현 진행 상황 |

---

## 시작하기

### 설계 문서 확인
```bash
# 마스터 설계 문서부터 확인
cat docs/00_마스터_설계문서.md

# 개발 가이드 확인
cat docs/02-implementation/DEVELOPMENT_GUIDE.md
```

### 개발 환경 설정 (추후)
```bash
# 의존성 설치
npm install

# 환경 변수 설정
cp docs/02-implementation/config/.env.example .env.local

# 개발 서버 실행
npm run dev
```

---

## 라이선스

Private - All Rights Reserved

---

## 연락처

Young & Company Inc.
