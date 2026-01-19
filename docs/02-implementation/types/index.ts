/**
 * Hyper-Connect MVP - TypeScript 타입 정의
 * Version: 2.0
 * Last Updated: 2026-01-19
 *
 * 이 파일은 Frontend와 Backend에서 공유하는 타입 정의입니다.
 * packages/shared/types/에 배치하여 사용합니다.
 */

// ============================================
// ENUMS
// ============================================

export enum UserRole {
  BUYER = 'BUYER',
  SELLER = 'SELLER',
  ADMIN = 'ADMIN',
}

export enum VehicleStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  SOLD = 'SOLD',
}

export enum BrakeDiskStatus {
  GOOD = 'GOOD',
  FAIR = 'FAIR',
  NEEDS_REPLACEMENT = 'NEEDS_REPLACEMENT',
  REPLACED = 'REPLACED',
}

export enum FileType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
  DOCUMENT = 'DOCUMENT',
}

export enum InspectionGrade {
  S = 'S',
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
}

export enum OptionCategory {
  PERFORMANCE = 'PERFORMANCE',
  EXTERIOR = 'EXTERIOR',
  INTERIOR = 'INTERIOR',
  CONVENIENCE = 'CONVENIENCE',
}

// ============================================
// USER TYPES
// ============================================

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: UserRole;
  emailVerified: boolean;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

// ============================================
// VEHICLE TYPES
// ============================================

export interface Vehicle {
  id: string;
  sellerId: string;
  manufacturer: string;
  model: string;
  year: number;
  mileageKm: number;
  vin: string;
  registrationNumber?: string;
  matchingNumbers: boolean;
  priceKrw: number;
  descriptionKo?: string;
  descriptionEn?: string;
  status: VehicleStatus;
  viewCount: number;
  approvedAt?: string;
  approvedBy?: string;
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface VehicleListItem {
  id: string;
  manufacturer: string;
  model: string;
  year: number;
  mileageKm: number;
  priceKrw: number;
  priceUsd?: number;
  status: VehicleStatus;
  thumbnailUrl?: string;
  viewCount: number;
  optionCount: number;
  createdAt: string;
}

export interface VehicleDetail extends Vehicle {
  seller: UserProfile;
  options: Option[];
  maintenanceRecords: MaintenanceRecord[];
  consumableStatus?: ConsumableStatus;
  mediaFiles: MediaFilesByType;
  inspectionReport?: InspectionReport;
  priceUsd?: number;
}

// ============================================
// OPTION TYPES
// ============================================

export interface Option {
  id: string;
  manufacturer: string;
  category: OptionCategory;
  code: string;
  nameKo: string;
  nameEn: string;
  description?: string;
}

export interface OptionGroup {
  category: OptionCategory;
  options: Option[];
}

// ============================================
// MAINTENANCE TYPES
// ============================================

export interface MaintenanceRecord {
  id: string;
  vehicleId: string;
  serviceDate: string;
  serviceCenter: string;
  description: string;
  cost?: number;
  documentUrl?: string;
  createdAt: string;
}

// ============================================
// CONSUMABLE TYPES
// ============================================

export interface ConsumableStatus {
  id: string;
  vehicleId: string;
  // 타이어
  tirePercentage?: number;
  tireReplacementDate?: string;
  tireBrand?: string;
  tireModel?: string;
  // 브레이크
  brakePadThicknessMm?: number;
  brakeDiskStatus?: BrakeDiskStatus;
  brakePadReplacementDate?: string;
  // 엔진오일
  engineOilReplacementDate?: string;
  engineOilMileageKm?: number;
  engineOilBrand?: string;
  // 기타
  batteryReplacementDate?: string;
  coolantReplacementDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// MEDIA TYPES
// ============================================

export interface MediaFile {
  id: string;
  vehicleId: string;
  fileType: FileType;
  originalFilename: string;
  s3Key: string;
  cdnUrl: string;
  fileSizeBytes: number;
  mimeType: string;
  width?: number;
  height?: number;
  duration?: number;
  displayOrder: number;
  isMain: boolean;
  createdAt: string;
}

export interface MediaFilesByType {
  images: MediaFile[];
  videos: MediaFile[];
  audios: MediaFile[];
}

// ============================================
// INSPECTION TYPES
// ============================================

export interface InspectionReport {
  id: string;
  vehicleId: string;
  inspectorId: string;
  overallGrade: InspectionGrade;
  overallScore: number;
  exteriorScore?: number;
  interiorScore?: number;
  engineScore?: number;
  chassisScore?: number;
  checklistData: InspectionChecklist;
  damageData?: DamageData;
  notes?: string;
  inspectedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface InspectionChecklist {
  exterior: {
    paintCondition: string;
    scratchCount: number;
    dentCount: number;
    glassCondition: string;
    lightCondition: string;
    [key: string]: unknown;
  };
  interior: {
    seatCondition: string;
    dashboardCondition: string;
    steeringCondition: string;
    electronicsCondition: string;
    [key: string]: unknown;
  };
  engine: {
    oilLeaks: boolean;
    compressionTest: string;
    beltCondition: string;
    coolantCondition: string;
    [key: string]: unknown;
  };
  chassis: {
    suspensionCondition: string;
    brakeCondition: string;
    tireCondition: string;
    alignmentStatus: string;
    [key: string]: unknown;
  };
}

export interface DamageData {
  points: DamagePoint[];
}

export interface DamagePoint {
  x: number;
  y: number;
  type: 'scratch' | 'dent' | 'crack' | 'other';
  severity: 'minor' | 'moderate' | 'major';
  description?: string;
}

// ============================================
// API TYPES
// ============================================

// 공통 응답 타입
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
}

export interface ApiError {
  code: string;
  message: string;
  details?: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
}

// 페이지네이션
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: Pagination;
}

// ============================================
// FORM TYPES (차량 등록 폼)
// ============================================

// Step 1: 기본 정보
export interface VehicleBasicInfo {
  manufacturer: string;
  model: string;
  year: number;
  mileageKm: number;
  vin: string;
  registrationNumber?: string;
  matchingNumbers: boolean;
  priceKrw: number;
  descriptionKo?: string;
  descriptionEn?: string;
}

// Step 2: 옵션
export interface VehicleOptionsForm {
  optionIds: string[];
  customOptions?: string;
}

// Step 3: 정비 이력
export interface MaintenanceRecordForm {
  serviceDate: string;
  serviceCenter: string;
  description: string;
  cost?: number;
  documentFile?: File;
}

// Step 4: 소모품 상태
export interface ConsumableStatusForm {
  tirePercentage?: number;
  tireReplacementDate?: string;
  tireBrand?: string;
  tireModel?: string;
  brakePadThicknessMm?: number;
  brakeDiskStatus?: BrakeDiskStatus;
  brakePadReplacementDate?: string;
  engineOilReplacementDate?: string;
  engineOilMileageKm?: number;
  engineOilBrand?: string;
  batteryReplacementDate?: string;
  coolantReplacementDate?: string;
  notes?: string;
}

// Step 5: 미디어
export interface MediaUploadForm {
  images: File[];
  videos?: File[];
  audios?: File[];
}

// 전체 폼 데이터
export interface VehicleRegistrationForm {
  basicInfo: VehicleBasicInfo;
  options: VehicleOptionsForm;
  maintenanceRecords: MaintenanceRecordForm[];
  consumableStatus: ConsumableStatusForm;
  media: MediaUploadForm;
}

// ============================================
// REQUEST/RESPONSE TYPES
// ============================================

// 차량 목록 요청
export interface GetVehiclesRequest {
  page?: number;
  limit?: number;
  manufacturer?: string;
  model?: string;
  yearMin?: number;
  yearMax?: number;
  priceMin?: number;
  priceMax?: number;
  status?: VehicleStatus;
  sort?: 'latest' | 'price_asc' | 'price_desc' | 'popular';
}

// 차량 생성 요청
export interface CreateVehicleRequest {
  manufacturer: string;
  model: string;
  year: number;
  mileageKm: number;
  vin: string;
  registrationNumber?: string;
  matchingNumbers: boolean;
  priceKrw: number;
  descriptionKo?: string;
  descriptionEn?: string;
  optionIds: string[];
  consumableStatus?: ConsumableStatusForm;
}

// 미디어 업로드 URL 요청
export interface PresignedUrlRequest {
  vehicleId: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  fileType: FileType;
}

export interface PresignedUrlResponse {
  uploadUrl: string;
  s3Key: string;
  expiresIn: number;
}

// 업로드 완료 확인 요청
export interface ConfirmUploadRequest {
  vehicleId: string;
  s3Key: string;
  fileType: FileType;
  originalFilename: string;
  fileSizeBytes: number;
  width?: number;
  height?: number;
  duration?: number;
}

// 인증 관련
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: UserProfile;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  phone?: string;
  role: 'BUYER' | 'SELLER';
}

// 관리자 관련
export interface ApproveVehicleRequest {
  notes?: string;
}

export interface RejectVehicleRequest {
  reason: string;
}

// ============================================
// CONSTANTS
// ============================================

export const MANUFACTURERS = [
  'Ferrari',
  'Lamborghini',
  'Porsche',
  'McLaren',
  'Bugatti',
  'Aston Martin',
  'Bentley',
  'Rolls-Royce',
  'Mercedes-AMG',
  'BMW M',
  'Audi Sport',
  'Maserati',
  'Koenigsegg',
  'Pagani',
  'Other',
] as const;

export const BRAKE_DISK_STATUS_LABELS: Record<BrakeDiskStatus, string> = {
  [BrakeDiskStatus.GOOD]: '양호',
  [BrakeDiskStatus.FAIR]: '보통',
  [BrakeDiskStatus.NEEDS_REPLACEMENT]: '교체 필요',
  [BrakeDiskStatus.REPLACED]: '교체 완료',
};

export const INSPECTION_GRADE_LABELS: Record<InspectionGrade, string> = {
  [InspectionGrade.S]: '최상급 (95-100점)',
  [InspectionGrade.A]: '우수 (85-94점)',
  [InspectionGrade.B]: '양호 (70-84점)',
  [InspectionGrade.C]: '보통 (50-69점)',
  [InspectionGrade.D]: '불량 (0-49점)',
};

export const OPTION_CATEGORY_LABELS: Record<OptionCategory, string> = {
  [OptionCategory.PERFORMANCE]: '성능 (Performance)',
  [OptionCategory.EXTERIOR]: '외장 (Exterior)',
  [OptionCategory.INTERIOR]: '내장 (Interior)',
  [OptionCategory.CONVENIENCE]: '편의 (Convenience)',
};

export const VEHICLE_STATUS_LABELS: Record<VehicleStatus, string> = {
  [VehicleStatus.DRAFT]: '임시 저장',
  [VehicleStatus.PENDING]: '승인 대기',
  [VehicleStatus.APPROVED]: '승인됨',
  [VehicleStatus.REJECTED]: '거절됨',
  [VehicleStatus.SOLD]: '판매 완료',
};
