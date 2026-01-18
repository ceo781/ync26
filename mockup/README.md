# Hyper-Connect F1 등록 폼 목업

Hyper-Connect MVP 프로젝트의 F1 (하이엔드 자산 등록) 기능 목업입니다.

## 📋 개요

이 프로젝트는 **목업(Mockup)**으로, 실제 동작하는 기능은 없으며 UI/UX를 검증하기 위한 용도입니다.

## 🚀 실행 방법

### 1. 패키지 설치
```bash
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 `http://localhost:3000` 접속

## 📂 프로젝트 구조

```
mockup/
├── app/                      # Next.js 14 App Router
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx             # 홈 페이지
│   └── vehicles/
│       └── new/
│           └── page.tsx     # F1 등록 폼 페이지
├── components/
│   ├── ui/                  # 기본 UI 컴포넌트
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Select.tsx
│   └── forms/               # F1 폼 컴포넌트
│       ├── ProgressBar.tsx
│       ├── Step1BasicInfo.tsx
│       ├── Step2Options.tsx
│       ├── Step3Maintenance.tsx
│       ├── Step4Consumables.tsx
│       ├── Step5Media.tsx
│       └── Step6Review.tsx
└── package.json
```

## ✨ 구현된 기능 (목업)

### 6단계 차량 등록 폼
1. ✅ **Step 1**: 기본 정보 (제조사, 모델, 연식, VIN 등)
2. ✅ **Step 2**: 옵션 선택 (최소 3개 이상)
3. ✅ **Step 3**: 정비 이력 (동적 추가/삭제)
4. ✅ **Step 4**: 소모품 상태 (타이어, 브레이크, 엔진오일)
5. ✅ **Step 5**: 미디어 업로드 (이미지, 영상, 오디오)
6. ✅ **Step 6**: 최종 확인

### UI 컴포넌트
- ✅ 진행률 표시 바
- ✅ 다음/이전 버튼
- ✅ 폼 검증 UI (에러 메시지)
- ✅ 반응형 디자인 (모바일/데스크톱)

## ⚠️ 제한 사항

이 프로젝트는 **목업**입니다:
- ❌ API 연동 없음 (하드코딩 데이터)
- ❌ 실제 데이터 저장 안 됨
- ❌ 폼 검증 로직 미구현
- ❌ 파일 업로드 미구현

## 🎨 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Form**: React Hook Form + Zod (미적용, 목업)

## 📝 다음 단계

목업 검증 완료 후:
1. CEO 피드백 수집
2. 설계 문서 보완
3. 실제 개발 시작 (⑤ 개발 단계)

## 📄 관련 문서

- [설계 문서](../docs/01-development/)
- [F1 폼 설계서](../docs/01-development/05_F1_차량등록폼_설계.md)

---

**작성일**: 2026-01-18
**버전**: 0.1.0 (Mockup)
