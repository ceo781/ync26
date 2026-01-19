# Hyper-Connect 개발 가이드라인

**Version**: 2.0
**Last Updated**: 2026-01-19

---

## 1. 개발 환경 설정

### 1.1 필수 요구사항

- **Node.js**: 18.x 이상
- **npm** 또는 **pnpm**: 최신 버전
- **PostgreSQL**: 15.x
- **Redis**: 7.x (선택)
- **Docker**: 24.x (선택, 로컬 DB용)

### 1.2 로컬 개발 환경 구축

```bash
# 1. 저장소 클론
git clone https://github.com/your-org/hyper-connect.git
cd hyper-connect

# 2. 환경 변수 설정
cp docs/02-implementation/config/.env.example .env.local

# 3. 의존성 설치
npm install

# 4. Docker로 PostgreSQL 실행 (선택)
docker-compose up -d postgres redis

# 5. 데이터베이스 마이그레이션
npx prisma migrate dev

# 6. 시드 데이터 입력
npx prisma db seed

# 7. 개발 서버 실행
npm run dev
```

### 1.3 Docker Compose 설정

```yaml
# docker-compose.yml
version: '3.8'
services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: hyper_connect_dev
    ports:
      - '5432:5432'
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - '6379:6379'

volumes:
  postgres_data:
```

---

## 2. 프로젝트 구조

### 2.1 Monorepo 구조 (권장)

```
hyper-connect/
├── apps/
│   ├── web/            # Next.js Frontend
│   └── api/            # NestJS Backend
├── packages/
│   └── shared/         # 공유 타입/유틸리티
├── docs/               # 설계 문서
└── infrastructure/     # 인프라 설정
```

### 2.2 Frontend 구조 (Next.js 14)

```
apps/web/
├── app/                # App Router
│   ├── (auth)/         # 인증 라우트 그룹
│   ├── (main)/         # 메인 라우트 그룹
│   ├── api/            # API Routes
│   └── layout.tsx
├── components/
│   ├── ui/             # Shadcn/ui
│   ├── layout/         # 레이아웃
│   ├── vehicle/        # 차량 관련
│   └── forms/          # F1 폼
├── lib/                # 유틸리티
├── hooks/              # Custom Hooks
├── stores/             # Zustand
└── types/              # 타입
```

### 2.3 Backend 구조 (NestJS)

```
apps/api/
├── src/
│   ├── modules/
│   │   ├── auth/       # 인증
│   │   ├── users/      # 사용자
│   │   ├── vehicles/   # 차량 (F1)
│   │   ├── media/      # 미디어
│   │   ├── options/    # 옵션
│   │   └── admin/      # 관리자
│   ├── common/         # 공통 모듈
│   ├── prisma/         # DB
│   └── main.ts
└── test/
```

---

## 3. 코딩 컨벤션

### 3.1 네이밍 규칙

| 항목 | 규칙 | 예시 |
|------|------|------|
| **파일명** | kebab-case | `vehicle-card.tsx` |
| **컴포넌트** | PascalCase | `VehicleCard` |
| **함수** | camelCase | `getVehicleById` |
| **상수** | SCREAMING_SNAKE_CASE | `MAX_FILE_SIZE` |
| **타입/인터페이스** | PascalCase | `Vehicle`, `CreateVehicleDto` |
| **Enum** | PascalCase | `VehicleStatus` |
| **Enum 값** | SCREAMING_SNAKE_CASE | `DRAFT`, `PENDING` |

### 3.2 컴포넌트 구조

```tsx
// 1. Imports
import { useState } from 'react';
import type { Vehicle } from '@/types';

// 2. Types
interface VehicleCardProps {
  vehicle: Vehicle;
  onSelect?: (id: string) => void;
}

// 3. Component
export function VehicleCard({ vehicle, onSelect }: VehicleCardProps) {
  // Hooks
  const [isHovered, setIsHovered] = useState(false);

  // Handlers
  const handleClick = () => {
    onSelect?.(vehicle.id);
  };

  // Render
  return (
    <div onClick={handleClick}>
      {/* JSX */}
    </div>
  );
}

// 4. Default export (페이지 컴포넌트만)
// export default VehicleCard;
```

### 3.3 API 응답 형식

```typescript
// 성공 응답
{
  "success": true,
  "data": { ... }
}

// 에러 응답
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "입력 검증 실패",
    "details": [
      { "field": "email", "message": "이메일 형식이 올바르지 않습니다" }
    ]
  }
}
```

---

## 4. Git 워크플로우

### 4.1 브랜치 전략

```
main            # 프로덕션
├── develop     # 개발 브랜치
├── feature/*   # 기능 개발
├── fix/*       # 버그 수정
├── hotfix/*    # 긴급 수정
└── release/*   # 릴리스 준비
```

### 4.2 커밋 메시지 형식

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Type**:
- `feat`: 새 기능
- `fix`: 버그 수정
- `docs`: 문서
- `style`: 코드 스타일 (포맷팅)
- `refactor`: 리팩토링
- `test`: 테스트
- `chore`: 빌드/설정

**예시**:
```
feat(vehicle): F1 차량 등록 폼 Step 1 구현

- 기본 정보 입력 폼 구현
- Zod 스키마 검증 추가
- 임시 저장 기능 구현

Closes #123
```

### 4.3 PR 템플릿

```markdown
## 변경 사항
<!-- 변경 내용을 간략히 설명 -->

## 관련 이슈
<!-- Closes #123 -->

## 테스트
- [ ] 단위 테스트 통과
- [ ] E2E 테스트 통과 (해당 시)
- [ ] 로컬에서 수동 테스트 완료

## 스크린샷 (UI 변경 시)
<!-- 변경 전/후 스크린샷 -->
```

---

## 5. 테스트 가이드

### 5.1 테스트 구조

```
tests/
├── unit/           # 단위 테스트
│   ├── services/
│   └── utils/
├── integration/    # 통합 테스트
│   └── api/
└── e2e/           # E2E 테스트
    └── flows/
```

### 5.2 테스트 명명 규칙

```typescript
describe('VehicleService', () => {
  describe('createVehicle', () => {
    it('유효한 데이터로 차량을 생성한다', async () => {
      // ...
    });

    it('VIN 중복 시 에러를 반환한다', async () => {
      // ...
    });
  });
});
```

### 5.3 테스트 실행

```bash
# 전체 테스트
npm test

# 단위 테스트만
npm run test:unit

# E2E 테스트
npm run test:e2e

# 커버리지 확인
npm run test:coverage
```

---

## 6. 성능 최적화 가이드

### 6.1 Frontend

```tsx
// 1. 이미지 최적화 - Next.js Image 사용
import Image from 'next/image';

<Image
  src={thumbnailUrl}
  alt={vehicle.model}
  width={400}
  height={300}
  loading="lazy"
  placeholder="blur"
/>

// 2. 동적 import
const MediaUploader = dynamic(
  () => import('@/components/forms/MediaUploader'),
  { ssr: false, loading: () => <Skeleton /> }
);

// 3. React Query 캐싱
const { data } = useQuery({
  queryKey: ['vehicles', filters],
  queryFn: fetchVehicles,
  staleTime: 5 * 60 * 1000, // 5분
});
```

### 6.2 Backend

```typescript
// 1. 데이터베이스 쿼리 최적화
const vehicles = await prisma.vehicle.findMany({
  where: { status: 'APPROVED' },
  include: {
    mediaFiles: {
      where: { fileType: 'IMAGE' },
      orderBy: { displayOrder: 'asc' },
      take: 1, // 첫 번째 이미지만
    },
    _count: { select: { options: true } },
  },
  orderBy: { createdAt: 'desc' },
  skip: (page - 1) * 12,
  take: 12,
});

// 2. Redis 캐싱
const cacheKey = `vehicle:${id}`;
let vehicle = await redis.get(cacheKey);

if (!vehicle) {
  vehicle = await prisma.vehicle.findUnique({ ... });
  await redis.set(cacheKey, JSON.stringify(vehicle), 'EX', 300); // 5분
}

// 3. N+1 쿼리 방지
// Bad
for (const vehicle of vehicles) {
  const options = await prisma.option.findMany({ ... });
}

// Good
const vehicles = await prisma.vehicle.findMany({
  include: { options: { include: { option: true } } },
});
```

---

## 7. 보안 가이드

### 7.1 인증/인가

```typescript
// JWT Guard
@UseGuards(JwtAuthGuard)
@Get('profile')
getProfile(@CurrentUser() user: User) {
  return user;
}

// Role Guard
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Post('approve')
approveVehicle() {
  // 관리자만 접근 가능
}
```

### 7.2 입력 검증

```typescript
// DTO 검증 (class-validator)
export class CreateVehicleDto {
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  manufacturer: string;

  @IsString()
  @Length(17, 17)
  @Matches(/^[A-HJ-NPR-Z0-9]{17}$/)
  vin: string;

  @IsNumber()
  @Min(1000000)
  priceKrw: number;
}
```

### 7.3 민감 정보 처리

```typescript
// 응답에서 민감 정보 제외
const { passwordHash, ...user } = await prisma.user.findUnique({ ... });

// 차량등록번호 마스킹
function maskRegistrationNumber(regNo: string): string {
  return regNo.replace(/(.{3})(.+)(.{2})/, '$1****$3');
  // "123가4567" -> "123****67"
}
```

---

## 8. 배포 가이드

### 8.1 CI/CD 파이프라인

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm test

  deploy-frontend:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'

  deploy-backend:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build Docker Image
        run: docker build -t hyper-connect-api ./apps/api
      - name: Push to ECR
        run: |
          aws ecr get-login-password | docker login --username AWS --password-stdin $ECR_URL
          docker push $ECR_URL/hyper-connect-api:latest
      - name: Deploy to ECS
        run: aws ecs update-service --cluster prod --service api --force-new-deployment
```

### 8.2 환경별 설정

| 환경 | Frontend | Backend | Database |
|------|----------|---------|----------|
| **Development** | localhost:3000 | localhost:4000 | Docker PostgreSQL |
| **Staging** | staging.hyper-connect.com | staging-api.hyper-connect.com | RDS (dev) |
| **Production** | hyper-connect.com | api.hyper-connect.com | RDS (prod) |

---

## 9. 트러블슈팅

### 9.1 자주 발생하는 문제

**Prisma 스키마 변경 후 타입 오류**
```bash
npx prisma generate
```

**데이터베이스 연결 실패**
```bash
# 연결 문자열 확인
echo $DATABASE_URL

# Docker 상태 확인
docker ps
```

**S3 업로드 권한 오류**
- IAM 정책 확인
- CORS 설정 확인
- Presigned URL 만료 시간 확인

### 9.2 로그 확인

```bash
# Next.js 로그
npm run dev

# NestJS 로그
LOG_LEVEL=debug npm run start:dev

# Prisma 쿼리 로그
DEBUG=prisma:query npm run start:dev
```

---

## 10. 참고 자료

### 10.1 공식 문서

- [Next.js 14 Documentation](https://nextjs.org/docs)
- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn/ui](https://ui.shadcn.com)

### 10.2 내부 문서

- [마스터 설계 문서](/docs/00_마스터_설계문서.md)
- [API 명세서](/docs/01-development/03_API_명세서.md)
- [DB 스키마](/docs/01-development/02_데이터베이스_스키마.md)
- [F1 폼 설계](/docs/01-development/05_F1_차량등록폼_설계.md)

---

## 변경 이력

| 버전 | 날짜 | 변경 내용 | 작성자 |
|------|------|----------|--------|
| 1.0 | 2026-01-18 | 초안 작성 | Claude |
| 2.0 | 2026-01-19 | 전면 재작성, 상세 내용 추가 | Claude |
