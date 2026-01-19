import type { FormStep, VehicleOption } from "@/types/vehicle";

// Manufacturers
export const MANUFACTURERS = [
  { value: "Ferrari", label: "Ferrari" },
  { value: "Lamborghini", label: "Lamborghini" },
  { value: "Porsche", label: "Porsche" },
  { value: "McLaren", label: "McLaren" },
  { value: "Bugatti", label: "Bugatti" },
  { value: "Aston Martin", label: "Aston Martin" },
  { value: "Bentley", label: "Bentley" },
  { value: "Rolls-Royce", label: "Rolls-Royce" },
  { value: "Mercedes-AMG", label: "Mercedes-AMG" },
  { value: "BMW M", label: "BMW M" },
  { value: "Audi Sport", label: "Audi Sport" },
  { value: "Maserati", label: "Maserati" },
  { value: "Koenigsegg", label: "Koenigsegg" },
  { value: "Pagani", label: "Pagani" },
  { value: "Other", label: "기타" },
] as const;

// Years (from current year to 1950)
export const YEARS = Array.from({ length: new Date().getFullYear() - 1949 }, (_, i) => ({
  value: String(new Date().getFullYear() - i),
  label: `${new Date().getFullYear() - i}년`,
}));

// Brake Disk Status
export const BRAKE_DISK_STATUS = [
  { value: "GOOD", label: "양호" },
  { value: "FAIR", label: "보통" },
  { value: "NEEDS_REPLACEMENT", label: "교체 필요" },
  { value: "REPLACED", label: "교체 완료" },
] as const;

// Form Steps
export const FORM_STEPS: FormStep[] = [
  { id: 1, title: "기본 정보", description: "차량 기본 정보" },
  { id: 2, title: "옵션", description: "장착 옵션 선택" },
  { id: 3, title: "정비 이력", description: "정비 기록" },
  { id: 4, title: "소모품", description: "소모품 상태" },
  { id: 5, title: "미디어", description: "사진/영상" },
  { id: 6, title: "확인", description: "최종 확인" },
];

// Option Categories
export const OPTION_CATEGORIES = [
  { value: "PERFORMANCE", label: "성능 (Performance)" },
  { value: "EXTERIOR", label: "외장 (Exterior)" },
  { value: "INTERIOR", label: "내장 (Interior)" },
  { value: "CONVENIENCE", label: "편의 (Convenience)" },
] as const;

// Sample Options Data (Ferrari)
export const SAMPLE_OPTIONS: VehicleOption[] = [
  // Ferrari Performance
  {
    id: "fer-ccb",
    manufacturer: "Ferrari",
    category: "PERFORMANCE",
    code: "FER-CCB",
    nameKo: "카본 세라믹 브레이크",
    nameEn: "Carbon Ceramic Brakes (CCB)",
    description: "고성능 카본 세라믹 브레이크 시스템",
  },
  {
    id: "fer-sport-exh",
    manufacturer: "Ferrari",
    category: "PERFORMANCE",
    code: "FER-SPORT-EXH",
    nameKo: "스포츠 배기 시스템",
    nameEn: "Sport Exhaust System",
  },
  {
    id: "fer-racing-susp",
    manufacturer: "Ferrari",
    category: "PERFORMANCE",
    code: "FER-RACING-SUSP",
    nameKo: "레이싱 서스펜션",
    nameEn: "Racing Suspension",
  },
  {
    id: "fer-scm",
    manufacturer: "Ferrari",
    category: "PERFORMANCE",
    code: "FER-SCM",
    nameKo: "마그네틱 라이드 컨트롤",
    nameEn: "SCM (Magnetorheological Suspension)",
  },
  // Ferrari Exterior
  {
    id: "fer-carbon-ext",
    manufacturer: "Ferrari",
    category: "EXTERIOR",
    code: "FER-CARBON-EXT",
    nameKo: "카본 파이버 외장 패키지",
    nameEn: "Carbon Fiber Exterior Package",
  },
  {
    id: "fer-forged-wheel",
    manufacturer: "Ferrari",
    category: "EXTERIOR",
    code: "FER-FORGED-WHEEL",
    nameKo: "포지드 휠",
    nameEn: "Forged Wheels",
  },
  {
    id: "fer-special-paint",
    manufacturer: "Ferrari",
    category: "EXTERIOR",
    code: "FER-SPECIAL-PAINT",
    nameKo: "스페셜 페인트",
    nameEn: "Special Paint",
  },
  {
    id: "fer-scuderia-shield",
    manufacturer: "Ferrari",
    category: "EXTERIOR",
    code: "FER-SCUDERIA-SHIELD",
    nameKo: "스쿠데리아 쉴드",
    nameEn: "Scuderia Ferrari Shields",
  },
  // Ferrari Interior
  {
    id: "fer-carbon-seat",
    manufacturer: "Ferrari",
    category: "INTERIOR",
    code: "FER-CARBON-SEAT",
    nameKo: "카본 레이싱 시트",
    nameEn: "Carbon Racing Seats",
  },
  {
    id: "fer-alcantara-int",
    manufacturer: "Ferrari",
    category: "INTERIOR",
    code: "FER-ALCANTARA-INT",
    nameKo: "알칸타라 인테리어",
    nameEn: "Alcantara Interior",
  },
  {
    id: "fer-carbon-steering",
    manufacturer: "Ferrari",
    category: "INTERIOR",
    code: "FER-CARBON-STEERING",
    nameKo: "카본 스티어링 휠",
    nameEn: "Carbon Steering Wheel + LEDs",
  },
  {
    id: "fer-daytona-seat",
    manufacturer: "Ferrari",
    category: "INTERIOR",
    code: "FER-DAYTONA-SEAT",
    nameKo: "데이토나 스타일 시트",
    nameEn: "Daytona Style Seats",
  },
  // Ferrari Convenience
  {
    id: "fer-front-lift",
    manufacturer: "Ferrari",
    category: "CONVENIENCE",
    code: "FER-FRONT-LIFT",
    nameKo: "프론트 리프트 시스템",
    nameEn: "Front Lift System",
  },
  {
    id: "fer-carplay",
    manufacturer: "Ferrari",
    category: "CONVENIENCE",
    code: "FER-CARPLAY",
    nameKo: "애플 카플레이",
    nameEn: "Apple CarPlay",
  },
  {
    id: "fer-hitech-pkg",
    manufacturer: "Ferrari",
    category: "CONVENIENCE",
    code: "FER-HITECH-PKG",
    nameKo: "하이테크 패키지",
    nameEn: "Hi-Tech Package",
  },
  // Porsche Performance
  {
    id: "por-pccb",
    manufacturer: "Porsche",
    category: "PERFORMANCE",
    code: "POR-PCCB",
    nameKo: "PCCB (세라믹 브레이크)",
    nameEn: "PCCB (Porsche Ceramic Composite Brake)",
  },
  {
    id: "por-sport-chrono",
    manufacturer: "Porsche",
    category: "PERFORMANCE",
    code: "POR-SPORT-CHRONO",
    nameKo: "스포츠 크로노 패키지",
    nameEn: "Sport Chrono Package",
  },
  {
    id: "por-pdcc",
    manufacturer: "Porsche",
    category: "PERFORMANCE",
    code: "POR-PDCC",
    nameKo: "PDCC (다이내믹 섀시 컨트롤)",
    nameEn: "PDCC (Porsche Dynamic Chassis Control)",
  },
  // Porsche Exterior
  {
    id: "por-carbon-ext",
    manufacturer: "Porsche",
    category: "EXTERIOR",
    code: "POR-CARBON-EXT",
    nameKo: "카본 패키지 (외장)",
    nameEn: "Carbon Exterior Package",
  },
  {
    id: "por-pts",
    manufacturer: "Porsche",
    category: "EXTERIOR",
    code: "POR-PTS",
    nameKo: "PTS 스페셜 컬러",
    nameEn: "Paint to Sample",
  },
  // Porsche Interior
  {
    id: "por-bucket-seat",
    manufacturer: "Porsche",
    category: "INTERIOR",
    code: "POR-BUCKET-SEAT",
    nameKo: "풀 버킷 시트",
    nameEn: "Full Bucket Seats",
  },
  {
    id: "por-carbon-int",
    manufacturer: "Porsche",
    category: "INTERIOR",
    code: "POR-CARBON-INT",
    nameKo: "카본 인테리어 패키지",
    nameEn: "Carbon Interior Package",
  },
  // Porsche Convenience
  {
    id: "por-front-lift",
    manufacturer: "Porsche",
    category: "CONVENIENCE",
    code: "POR-FRONT-LIFT",
    nameKo: "프론트 리프트 시스템",
    nameEn: "Front Axle Lift System",
  },
  {
    id: "por-bose",
    manufacturer: "Porsche",
    category: "CONVENIENCE",
    code: "POR-BOSE",
    nameKo: "BOSE 사운드 시스템",
    nameEn: "BOSE Surround Sound System",
  },
];

// VIN Regex Pattern
export const VIN_PATTERN = /^[A-HJ-NPR-Z0-9]{17}$/i;

// File Upload Limits
export const FILE_LIMITS = {
  IMAGE: {
    maxSize: 10 * 1024 * 1024, // 10MB
    maxCount: 50,
    minCount: 20,
    acceptedTypes: ["image/jpeg", "image/png", "image/webp"],
  },
  VIDEO: {
    maxSize: 500 * 1024 * 1024, // 500MB
    maxCount: 5,
    acceptedTypes: ["video/mp4", "video/webm", "video/quicktime"],
  },
  AUDIO: {
    maxSize: 50 * 1024 * 1024, // 50MB
    maxCount: 3,
    acceptedTypes: ["audio/mpeg", "audio/wav", "audio/aac"],
  },
  DOCUMENT: {
    maxSize: 20 * 1024 * 1024, // 20MB
    acceptedTypes: ["application/pdf", "image/jpeg", "image/png"],
  },
};
