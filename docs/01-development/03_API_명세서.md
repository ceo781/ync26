# Hyper-Connect MVP API 명세서

**프로젝트명**: Hyper-Connect (MVP)
**작성일**: 2026-01-18
**버전**: 1.0
**Base URL**: `https://api.hyper-connect.com/v1`
**인증**: JWT Bearer Token

---

## 1. 개요

### 1.1 API 설계 원칙
- **RESTful**: 리소스 중심 설계
- **일관성**: 동일한 응답 구조
- **버전 관리**: URL 경로에 버전 포함 (`/v1`)
- **에러 핸들링**: 표준화된 에러 응답

### 1.2 공통 규칙

**HTTP Methods**:
- `GET`: 조회
- `POST`: 생성
- `PUT`: 전체 수정
- `PATCH`: 부분 수정
- `DELETE`: 삭제

**Status Codes**:
| Code | 의미 | 사용 예시 |
|------|------|----------|
| 200 | OK | 성공적인 조회/수정 |
| 201 | Created | 리소스 생성 성공 |
| 204 | No Content | 삭제 성공 |
| 400 | Bad Request | 잘못된 요청 데이터 |
| 401 | Unauthorized | 인증 실패 |
| 403 | Forbidden | 권한 없음 |
| 404 | Not Found | 리소스 없음 |
| 422 | Unprocessable Entity | 검증 실패 |
| 500 | Internal Server Error | 서버 오류 |

---

## 2. 인증 (Authentication)

### 2.1 회원가입

**Endpoint**: `POST /auth/register`

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "SecureP@ss123",
  "name": "홍길동",
  "phone": "010-1234-5678",
  "role": "seller"
}
```

**Validation**:
- `email`: 유효한 이메일 형식, 중복 불가
- `password`: 최소 8자, 영문/숫자/특수문자 포함
- `role`: `buyer` | `seller`

**Response (201)**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "홍길동",
    "role": "seller",
    "createdAt": "2026-01-18T12:34:56.789Z"
  }
}
```

**Error (422)**:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "email",
        "message": "Email already exists"
      }
    ]
  }
}
```

---

### 2.2 로그인

**Endpoint**: `POST /auth/login`

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "SecureP@ss123"
}
```

**Response (200)**:
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600,
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "홍길동",
      "role": "seller"
    }
  }
}
```

**JWT Payload**:
```json
{
  "sub": "user-uuid",
  "email": "user@example.com",
  "role": "seller",
  "iat": 1705564800,
  "exp": 1705568400
}
```

---

### 2.3 토큰 갱신

**Endpoint**: `POST /auth/refresh`

**Request Body**:
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (200)**:
```json
{
  "success": true,
  "data": {
    "accessToken": "new-access-token",
    "expiresIn": 3600
  }
}
```

---

## 3. 차량 관리 (Vehicles) - F1 핵심

### 3.1 차량 목록 조회

**Endpoint**: `GET /vehicles`

**Query Parameters**:
| 파라미터 | 타입 | 필수 | 설명 |
|---------|------|------|------|
| `page` | number | X | 페이지 번호 (기본: 1) |
| `limit` | number | X | 페이지 크기 (기본: 12, 최대: 50) |
| `manufacturer` | string | X | 제조사 필터 |
| `model` | string | X | 모델 필터 |
| `yearMin` | number | X | 최소 연식 |
| `yearMax` | number | X | 최대 연식 |
| `priceMin` | number | X | 최소 가격 (KRW) |
| `priceMax` | number | X | 최대 가격 (KRW) |
| `status` | string | X | 상태 (approved, sold) |
| `sort` | string | X | 정렬 (latest, price_asc, price_desc) |

**Request Example**:
```
GET /vehicles?page=1&limit=12&manufacturer=Ferrari&sort=latest
```

**Response (200)**:
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "vehicle-uuid",
        "manufacturer": "Ferrari",
        "model": "488 Pista",
        "year": 2019,
        "mileageKm": 12340,
        "priceKrw": 580000000,
        "priceUsd": 435000,
        "status": "approved",
        "thumbnailUrl": "https://cdn.hyper-connect.com/vehicles/xxx/thumb.jpg",
        "viewCount": 1240,
        "optionCount": 15,
        "createdAt": "2026-01-15T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 12,
      "total": 48,
      "totalPages": 4,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

---

### 3.2 차량 상세 조회

**Endpoint**: `GET /vehicles/:id`

**Path Parameters**:
- `id`: 차량 UUID

**Response (200)**:
```json
{
  "success": true,
  "data": {
    "id": "vehicle-uuid",
    "seller": {
      "id": "seller-uuid",
      "name": "홍길동"
    },
    "manufacturer": "Ferrari",
    "model": "488 Pista",
    "year": 2019,
    "mileageKm": 12340,
    "vin": "ZFF79ALA0K0123456",
    "matchingNumbers": true,
    "priceKrw": 580000000,
    "priceUsd": 435000,
    "descriptionKo": "페라리 공식 딜러 출고 차량...",
    "descriptionEn": "Official Ferrari dealer...",
    "status": "approved",
    "viewCount": 1240,
    "options": [
      {
        "id": "option-uuid",
        "category": "performance",
        "nameKo": "카본 세라믹 브레이크",
        "nameEn": "Carbon Ceramic Brakes"
      }
    ],
    "maintenanceRecords": [
      {
        "id": "maintenance-uuid",
        "serviceDate": "2025-12-15",
        "serviceCenter": "서울페라리",
        "description": "정기 점검 및 엔진오일 교체",
        "documentUrl": "https://cdn.hyper-connect.com/docs/xxx.pdf"
      }
    ],
    "consumableStatus": {
      "tirePercentage": 85,
      "tireReplacementDate": "2025-06-10",
      "tireBrand": "Michelin Pilot Sport 4S",
      "brakePadThicknessMm": 8.5,
      "brakeDiskStatus": "GOOD",
      "engineOilReplacementDate": "2025-12-15",
      "engineOilMileageKm": 500
    },
    "mediaFiles": {
      "images": [
        {
          "id": "media-uuid",
          "cdnUrl": "https://cdn.hyper-connect.com/vehicles/xxx/large/01.jpg",
          "displayOrder": 0,
          "width": 1920,
          "height": 1080
        }
      ],
      "videos": [],
      "audios": []
    },
    "inspectionReport": {
      "overallGrade": "S",
      "overallScore": 95,
      "inspectedAt": "2026-01-10T09:00:00Z"
    },
    "createdAt": "2026-01-15T10:00:00Z",
    "updatedAt": "2026-01-16T14:30:00Z",
    "approvedAt": "2026-01-16T15:00:00Z"
  }
}
```

**Error (404)**:
```json
{
  "success": false,
  "error": {
    "code": "VEHICLE_NOT_FOUND",
    "message": "Vehicle not found"
  }
}
```

---

### 3.3 차량 등록 (F1 핵심)

**Endpoint**: `POST /vehicles`

**Authorization**: Bearer Token (seller 또는 admin)

**Request Body**:
```json
{
  "manufacturer": "Ferrari",
  "model": "488 Pista",
  "year": 2019,
  "mileageKm": 12340,
  "vin": "ZFF79ALA0K0123456",
  "registrationNumber": "12가3456",
  "matchingNumbers": true,
  "priceKrw": 580000000,
  "descriptionKo": "페라리 공식 딜러 출고 차량...",
  "descriptionEn": "Official Ferrari dealer...",
  "optionIds": [
    "option-uuid-1",
    "option-uuid-2"
  ],
  "consumableStatus": {
    "tirePercentage": 85,
    "tireReplacementDate": "2025-06-10",
    "tireBrand": "Michelin Pilot Sport 4S",
    "brakePadThicknessMm": 8.5,
    "brakeDiskStatus": "GOOD",
    "engineOilReplacementDate": "2025-12-15",
    "engineOilMileageKm": 500
  }
}
```

**Validation**:
- `manufacturer`: 필수, 1-100자
- `model`: 필수, 1-100자
- `year`: 필수, 1950 이상
- `mileageKm`: 필수, 0 이상
- `vin`: 필수, 17자, 고유값
- `priceKrw`: 필수, 양수
- `optionIds`: 최소 3개 이상 (비즈니스 규칙)

**Response (201)**:
```json
{
  "success": true,
  "data": {
    "id": "vehicle-uuid",
    "manufacturer": "Ferrari",
    "model": "488 Pista",
    "status": "draft",
    "createdAt": "2026-01-18T12:34:56.789Z"
  }
}
```

**Error (422)**:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "optionIds",
        "message": "At least 3 options are required"
      }
    ]
  }
}
```

---

### 3.4 차량 정보 수정

**Endpoint**: `PATCH /vehicles/:id`

**Authorization**: Bearer Token (차량 소유자 또는 admin)

**Request Body** (부분 수정 가능):
```json
{
  "priceKrw": 570000000,
  "descriptionKo": "가격 인하..."
}
```

**Response (200)**:
```json
{
  "success": true,
  "data": {
    "id": "vehicle-uuid",
    "priceKrw": 570000000,
    "updatedAt": "2026-01-18T13:00:00Z"
  }
}
```

**Error (403)**:
```json
{
  "success": false,
  "error": {
    "code": "FORBIDDEN",
    "message": "You do not have permission to modify this vehicle"
  }
}
```

---

### 3.5 차량 상태 변경

**Endpoint**: `PATCH /vehicles/:id/status`

**Authorization**: Bearer Token (차량 소유자 또는 admin)

**Request Body**:
```json
{
  "status": "pending"
}
```

**Status Transitions**:
- `draft` → `pending` (제출)
- `pending` → `approved` (관리자만)
- `pending` → `rejected` (관리자만)
- `approved` → `sold` (관리자만)

**Response (200)**:
```json
{
  "success": true,
  "data": {
    "id": "vehicle-uuid",
    "status": "pending",
    "updatedAt": "2026-01-18T13:00:00Z"
  }
}
```

---

### 3.6 차량 삭제

**Endpoint**: `DELETE /vehicles/:id`

**Authorization**: Bearer Token (차량 소유자 또는 admin)

**Business Rule**:
- `draft` 상태만 삭제 가능
- `pending`, `approved` 상태는 삭제 불가 (상태 변경 필요)

**Response (204)**: No Content

**Error (400)**:
```json
{
  "success": false,
  "error": {
    "code": "CANNOT_DELETE_VEHICLE",
    "message": "Cannot delete vehicle in pending or approved status"
  }
}
```

---

## 4. 정비 이력 (Maintenance Records)

### 4.1 정비 이력 추가

**Endpoint**: `POST /vehicles/:vehicleId/maintenance`

**Authorization**: Bearer Token (차량 소유자 또는 admin)

**Request Body**:
```json
{
  "serviceDate": "2025-12-15",
  "serviceCenter": "서울페라리",
  "description": "정기 점검 및 엔진오일 교체",
  "documentUrl": "https://cdn.hyper-connect.com/docs/xxx.pdf"
}
```

**Response (201)**:
```json
{
  "success": true,
  "data": {
    "id": "maintenance-uuid",
    "vehicleId": "vehicle-uuid",
    "serviceDate": "2025-12-15",
    "serviceCenter": "서울페라리",
    "description": "정기 점검 및 엔진오일 교체",
    "documentUrl": "https://cdn.hyper-connect.com/docs/xxx.pdf",
    "createdAt": "2026-01-18T12:34:56Z"
  }
}
```

---

### 4.2 정비 이력 삭제

**Endpoint**: `DELETE /vehicles/:vehicleId/maintenance/:id`

**Authorization**: Bearer Token (차량 소유자 또는 admin)

**Response (204)**: No Content

---

## 5. 미디어 업로드 (Media Files)

### 5.1 Presigned URL 요청

**Endpoint**: `POST /media/presigned-url`

**Authorization**: Bearer Token

**Request Body**:
```json
{
  "vehicleId": "vehicle-uuid",
  "fileType": "IMAGE",
  "fileName": "ferrari-front.jpg",
  "fileSize": 2048576,
  "mimeType": "image/jpeg"
}
```

**Response (200)**:
```json
{
  "success": true,
  "data": {
    "uploadUrl": "https://hyper-connect-media.s3.amazonaws.com/...",
    "s3Key": "vehicles/vehicle-uuid/images/original/uuid.jpg",
    "expiresIn": 900
  }
}
```

**Usage Flow**:
1. 클라이언트: Presigned URL 요청
2. 서버: S3 Presigned URL 생성 및 반환
3. 클라이언트: S3에 직접 업로드 (PUT)
4. 클라이언트: 업로드 완료 확인 요청

---

### 5.2 업로드 완료 확인

**Endpoint**: `POST /media/confirm-upload`

**Authorization**: Bearer Token

**Request Body**:
```json
{
  "vehicleId": "vehicle-uuid",
  "s3Key": "vehicles/vehicle-uuid/images/original/uuid.jpg",
  "fileType": "IMAGE",
  "originalFilename": "ferrari-front.jpg",
  "width": 4096,
  "height": 2160
}
```

**Response (201)**:
```json
{
  "success": true,
  "data": {
    "id": "media-uuid",
    "vehicleId": "vehicle-uuid",
    "cdnUrl": "https://cdn.hyper-connect.com/vehicles/xxx/large/uuid.jpg",
    "fileType": "IMAGE",
    "displayOrder": 0
  }
}
```

---

### 5.3 미디어 정렬 순서 변경

**Endpoint**: `PATCH /media/reorder`

**Authorization**: Bearer Token (차량 소유자)

**Request Body**:
```json
{
  "vehicleId": "vehicle-uuid",
  "mediaIds": [
    "media-uuid-3",
    "media-uuid-1",
    "media-uuid-2"
  ]
}
```

**Response (200)**:
```json
{
  "success": true,
  "message": "Display order updated"
}
```

---

### 5.4 미디어 삭제

**Endpoint**: `DELETE /media/:id`

**Authorization**: Bearer Token (차량 소유자)

**Response (204)**: No Content

---

## 6. 옵션 (Options)

### 6.1 옵션 목록 조회

**Endpoint**: `GET /options`

**Query Parameters**:
- `manufacturer`: 제조사 필터
- `category`: 카테고리 필터

**Request Example**:
```
GET /options?manufacturer=Ferrari&category=performance
```

**Response (200)**:
```json
{
  "success": true,
  "data": [
    {
      "id": "option-uuid",
      "manufacturer": "Ferrari",
      "category": "performance",
      "nameKo": "카본 세라믹 브레이크",
      "nameEn": "Carbon Ceramic Brakes"
    }
  ]
}
```

---

## 7. 관리자 (Admin)

### 7.1 차량 승인

**Endpoint**: `POST /admin/vehicles/:id/approve`

**Authorization**: Bearer Token (admin만)

**Request Body**:
```json
{
  "notes": "모든 검증 완료"
}
```

**Response (200)**:
```json
{
  "success": true,
  "data": {
    "id": "vehicle-uuid",
    "status": "approved",
    "approvedAt": "2026-01-18T15:00:00Z",
    "approvedBy": "admin-uuid"
  }
}
```

---

### 7.2 차량 거절

**Endpoint**: `POST /admin/vehicles/:id/reject`

**Authorization**: Bearer Token (admin만)

**Request Body**:
```json
{
  "reason": "사진이 불충분합니다. 최소 20장 이상 업로드 필요."
}
```

**Response (200)**:
```json
{
  "success": true,
  "data": {
    "id": "vehicle-uuid",
    "status": "rejected",
    "rejectionReason": "사진이 불충분합니다..."
  }
}
```

---

### 7.3 대기 중인 차량 목록

**Endpoint**: `GET /admin/vehicles/pending`

**Authorization**: Bearer Token (admin만)

**Response (200)**:
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "vehicle-uuid",
        "manufacturer": "Ferrari",
        "model": "488 Pista",
        "seller": {
          "id": "seller-uuid",
          "name": "홍길동",
          "email": "seller@example.com"
        },
        "status": "pending",
        "createdAt": "2026-01-18T10:00:00Z"
      }
    ],
    "total": 5
  }
}
```

---

## 8. 검수 리포트 (Inspection Reports) - P1

### 8.1 검수 리포트 작성

**Endpoint**: `POST /vehicles/:vehicleId/inspection`

**Authorization**: Bearer Token (admin 또는 inspector)

**Request Body**:
```json
{
  "overallGrade": "S",
  "overallScore": 95,
  "checklistData": {
    "exterior": {
      "paint_condition": "excellent",
      "scratch_count": 2
    },
    "engine": {
      "oil_leaks": false
    }
  },
  "notes": "전반적으로 매우 우수한 상태"
}
```

**Response (201)**:
```json
{
  "success": true,
  "data": {
    "id": "report-uuid",
    "vehicleId": "vehicle-uuid",
    "overallGrade": "S",
    "overallScore": 95,
    "inspectedAt": "2026-01-18T14:00:00Z"
  }
}
```

---

## 9. 공통 응답 구조

### 9.1 성공 응답

```json
{
  "success": true,
  "data": { /* 리소스 데이터 */ }
}
```

### 9.2 에러 응답

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": [ /* 선택적 상세 정보 */ ]
  }
}
```

### 9.3 에러 코드 목록

| Code | HTTP Status | 설명 |
|------|-------------|------|
| `VALIDATION_ERROR` | 422 | 입력 검증 실패 |
| `UNAUTHORIZED` | 401 | 인증 실패 |
| `FORBIDDEN` | 403 | 권한 없음 |
| `VEHICLE_NOT_FOUND` | 404 | 차량 없음 |
| `DUPLICATE_VIN` | 422 | VIN 중복 |
| `CANNOT_DELETE_VEHICLE` | 400 | 삭제 불가 상태 |
| `INSUFFICIENT_OPTIONS` | 422 | 옵션 3개 미만 |
| `INTERNAL_SERVER_ERROR` | 500 | 서버 오류 |

---

## 10. Rate Limiting

| 사용자 | 제한 |
|--------|------|
| **미인증** | 100 req/min |
| **인증 (buyer)** | 200 req/min |
| **인증 (seller)** | 300 req/min |
| **Admin** | 1000 req/min |

**Rate Limit 초과 시 (429)**:
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests",
    "retryAfter": 60
  }
}
```

---

## 11. Pagination

모든 목록 API는 동일한 페이지네이션 구조 사용:

**Query Parameters**:
- `page`: 페이지 번호 (기본: 1)
- `limit`: 페이지 크기 (기본: 12, 최대: 50)

**Response**:
```json
{
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 48,
    "totalPages": 4,
    "hasNext": true,
    "hasPrev": false
  }
}
```

---

## 12. API 버전 관리

**현재 버전**: v1

**버전 변경 시**:
- 기존 v1 API는 최소 6개월 유지
- 신규 기능은 v2로 분리
- Deprecation 헤더로 경고:
  ```
  Warning: 299 - "This API version will be deprecated on 2026-07-01"
  ```

---

## 13. 다음 단계

이 API 명세를 기반으로 다음 문서를 작성합니다:
- ✅ **페이지 구조 설계서** (다음 작업)
- Frontend에서 API를 호출하는 패턴 정의

---

## 변경 이력

| 버전 | 날짜 | 변경 내용 | 작성자 |
|------|------|----------|--------|
| 1.0 | 2026-01-18 | 초안 작성 (F1 기능 중심) | Claude |
