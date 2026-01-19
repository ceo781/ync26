/**
 * Hyper-Connect MVP - 옵션 시드 데이터
 * Version: 2.0
 * Last Updated: 2026-01-19
 *
 * 사용법:
 * npx prisma db seed
 *
 * prisma/seed.ts에서 이 파일을 import하여 사용
 */

import { PrismaClient, OptionCategory } from '@prisma/client';

const prisma = new PrismaClient();

// ============================================
// 옵션 데이터 정의
// ============================================

interface OptionData {
  manufacturer: string;
  category: OptionCategory;
  code: string;
  nameKo: string;
  nameEn: string;
  description?: string;
  sortOrder: number;
}

// Ferrari 옵션
const ferrariOptions: OptionData[] = [
  // Performance
  {
    manufacturer: 'Ferrari',
    category: 'PERFORMANCE',
    code: 'FER-CCB',
    nameKo: '카본 세라믹 브레이크',
    nameEn: 'Carbon Ceramic Brakes (CCB)',
    description: '고성능 카본 세라믹 브레이크 시스템',
    sortOrder: 1,
  },
  {
    manufacturer: 'Ferrari',
    category: 'PERFORMANCE',
    code: 'FER-SPORT-EXH',
    nameKo: '스포츠 배기 시스템',
    nameEn: 'Sport Exhaust System',
    description: '고성능 스포츠 배기 시스템',
    sortOrder: 2,
  },
  {
    manufacturer: 'Ferrari',
    category: 'PERFORMANCE',
    code: 'FER-RACING-SUSP',
    nameKo: '레이싱 서스펜션',
    nameEn: 'Racing Suspension',
    description: '트랙 주행을 위한 레이싱 서스펜션',
    sortOrder: 3,
  },
  {
    manufacturer: 'Ferrari',
    category: 'PERFORMANCE',
    code: 'FER-E-DIFF',
    nameKo: '전자식 디퍼렌셜',
    nameEn: 'E-Diff (Electronic Differential)',
    sortOrder: 4,
  },
  {
    manufacturer: 'Ferrari',
    category: 'PERFORMANCE',
    code: 'FER-SCM',
    nameKo: '마그네틱 라이드 컨트롤',
    nameEn: 'SCM (Magnetorheological Suspension)',
    sortOrder: 5,
  },
  // Exterior
  {
    manufacturer: 'Ferrari',
    category: 'EXTERIOR',
    code: 'FER-CARBON-EXT',
    nameKo: '카본 파이버 외장 패키지',
    nameEn: 'Carbon Fiber Exterior Package',
    description: '카본 파이버 외장 트림 패키지',
    sortOrder: 1,
  },
  {
    manufacturer: 'Ferrari',
    category: 'EXTERIOR',
    code: 'FER-FORGED-WHEEL',
    nameKo: '포지드 휠',
    nameEn: 'Forged Wheels',
    description: '경량 포지드 알루미늄 휠',
    sortOrder: 2,
  },
  {
    manufacturer: 'Ferrari',
    category: 'EXTERIOR',
    code: 'FER-SPECIAL-PAINT',
    nameKo: '스페셜 페인트',
    nameEn: 'Special Paint',
    description: '페라리 특별 도색 옵션',
    sortOrder: 3,
  },
  {
    manufacturer: 'Ferrari',
    category: 'EXTERIOR',
    code: 'FER-SCUDERIA-SHIELD',
    nameKo: '스쿠데리아 쉴드',
    nameEn: 'Scuderia Ferrari Shields',
    description: '사이드 스쿠데리아 페라리 엠블럼',
    sortOrder: 4,
  },
  {
    manufacturer: 'Ferrari',
    category: 'EXTERIOR',
    code: 'FER-PARKING-CAM',
    nameKo: '주차 카메라',
    nameEn: 'Parking Camera',
    sortOrder: 5,
  },
  // Interior
  {
    manufacturer: 'Ferrari',
    category: 'INTERIOR',
    code: 'FER-CARBON-SEAT',
    nameKo: '카본 레이싱 시트',
    nameEn: 'Carbon Racing Seats',
    description: '경량 카본 파이버 레이싱 시트',
    sortOrder: 1,
  },
  {
    manufacturer: 'Ferrari',
    category: 'INTERIOR',
    code: 'FER-ALCANTARA-INT',
    nameKo: '알칸타라 인테리어',
    nameEn: 'Alcantara Interior',
    description: '알칸타라 소재 인테리어 트림',
    sortOrder: 2,
  },
  {
    manufacturer: 'Ferrari',
    category: 'INTERIOR',
    code: 'FER-CARBON-STEERING',
    nameKo: '카본 스티어링 휠',
    nameEn: 'Carbon Steering Wheel + LEDs',
    description: 'LED 인디케이터 포함 카본 스티어링',
    sortOrder: 3,
  },
  {
    manufacturer: 'Ferrari',
    category: 'INTERIOR',
    code: 'FER-DAYTONA-SEAT',
    nameKo: '데이토나 스타일 시트',
    nameEn: 'Daytona Style Seats',
    description: '전동 조절 데이토나 스타일 시트',
    sortOrder: 4,
  },
  {
    manufacturer: 'Ferrari',
    category: 'INTERIOR',
    code: 'FER-CARBON-INT-TRIM',
    nameKo: '카본 인테리어 트림',
    nameEn: 'Carbon Fiber Interior Trim',
    sortOrder: 5,
  },
  // Convenience
  {
    manufacturer: 'Ferrari',
    category: 'CONVENIENCE',
    code: 'FER-FRONT-LIFT',
    nameKo: '프론트 리프트 시스템',
    nameEn: 'Front Lift System',
    description: '프론트 서스펜션 리프트 시스템',
    sortOrder: 1,
  },
  {
    manufacturer: 'Ferrari',
    category: 'CONVENIENCE',
    code: 'FER-CARPLAY',
    nameKo: '애플 카플레이',
    nameEn: 'Apple CarPlay',
    sortOrder: 2,
  },
  {
    manufacturer: 'Ferrari',
    category: 'CONVENIENCE',
    code: 'FER-HITECH-PKG',
    nameKo: '하이테크 패키지',
    nameEn: 'Hi-Tech Package',
    description: '고급 내비게이션 및 엔터테인먼트',
    sortOrder: 3,
  },
  {
    manufacturer: 'Ferrari',
    category: 'CONVENIENCE',
    code: 'FER-AFS',
    nameKo: '어댑티브 프론트 라이트',
    nameEn: 'AFS (Adaptive Front Lighting)',
    sortOrder: 4,
  },
];

// Porsche 옵션
const porscheOptions: OptionData[] = [
  // Performance
  {
    manufacturer: 'Porsche',
    category: 'PERFORMANCE',
    code: 'POR-PCCB',
    nameKo: 'PCCB (세라믹 브레이크)',
    nameEn: 'PCCB (Porsche Ceramic Composite Brake)',
    description: '포르쉐 세라믹 컴포지트 브레이크',
    sortOrder: 1,
  },
  {
    manufacturer: 'Porsche',
    category: 'PERFORMANCE',
    code: 'POR-SPORT-CHRONO',
    nameKo: '스포츠 크로노 패키지',
    nameEn: 'Sport Chrono Package',
    description: '스포츠 크로노 패키지 (타이머 포함)',
    sortOrder: 2,
  },
  {
    manufacturer: 'Porsche',
    category: 'PERFORMANCE',
    code: 'POR-PDCC',
    nameKo: 'PDCC (다이내믹 섀시 컨트롤)',
    nameEn: 'PDCC (Porsche Dynamic Chassis Control)',
    sortOrder: 3,
  },
  {
    manufacturer: 'Porsche',
    category: 'PERFORMANCE',
    code: 'POR-REAR-AXLE',
    nameKo: '리어 액슬 스티어링',
    nameEn: 'Rear Axle Steering',
    sortOrder: 4,
  },
  {
    manufacturer: 'Porsche',
    category: 'PERFORMANCE',
    code: 'POR-SPORT-EXH',
    nameKo: '스포츠 배기 시스템',
    nameEn: 'Sport Exhaust System',
    sortOrder: 5,
  },
  // Exterior
  {
    manufacturer: 'Porsche',
    category: 'EXTERIOR',
    code: 'POR-CARBON-EXT',
    nameKo: '카본 패키지 (외장)',
    nameEn: 'Carbon Exterior Package',
    sortOrder: 1,
  },
  {
    manufacturer: 'Porsche',
    category: 'EXTERIOR',
    code: 'POR-PDLS-PLUS',
    nameKo: 'PDLS Plus (LED 매트릭스)',
    nameEn: 'PDLS Plus (LED Matrix Headlights)',
    sortOrder: 2,
  },
  {
    manufacturer: 'Porsche',
    category: 'EXTERIOR',
    code: 'POR-PTS',
    nameKo: 'PTS 스페셜 컬러',
    nameEn: 'Paint to Sample',
    description: '고객 맞춤 특별 도색',
    sortOrder: 3,
  },
  {
    manufacturer: 'Porsche',
    category: 'EXTERIOR',
    code: 'POR-AERO-KIT',
    nameKo: '에어로다이나믹 키트',
    nameEn: 'Aerodynamic Kit',
    sortOrder: 4,
  },
  // Interior
  {
    manufacturer: 'Porsche',
    category: 'INTERIOR',
    code: 'POR-BUCKET-SEAT',
    nameKo: '풀 버킷 시트',
    nameEn: 'Full Bucket Seats',
    description: '경량 풀 버킷 레이싱 시트',
    sortOrder: 1,
  },
  {
    manufacturer: 'Porsche',
    category: 'INTERIOR',
    code: 'POR-CARBON-INT',
    nameKo: '카본 인테리어 패키지',
    nameEn: 'Carbon Interior Package',
    sortOrder: 2,
  },
  {
    manufacturer: 'Porsche',
    category: 'INTERIOR',
    code: 'POR-GT-STEERING',
    nameKo: 'GT 스포츠 스티어링 휠',
    nameEn: 'GT Sport Steering Wheel',
    sortOrder: 3,
  },
  {
    manufacturer: 'Porsche',
    category: 'INTERIOR',
    code: 'POR-CLUBSPORT',
    nameKo: '클럽스포츠 패키지',
    nameEn: 'Clubsport Package',
    description: '롤케이지, 소화기, 6점식 벨트',
    sortOrder: 4,
  },
  // Convenience
  {
    manufacturer: 'Porsche',
    category: 'CONVENIENCE',
    code: 'POR-FRONT-LIFT',
    nameKo: '프론트 리프트 시스템',
    nameEn: 'Front Axle Lift System',
    sortOrder: 1,
  },
  {
    manufacturer: 'Porsche',
    category: 'CONVENIENCE',
    code: 'POR-PCM',
    nameKo: 'PCM (포르쉐 커뮤니케이션)',
    nameEn: 'PCM (Porsche Communication Management)',
    sortOrder: 2,
  },
  {
    manufacturer: 'Porsche',
    category: 'CONVENIENCE',
    code: 'POR-BOSE',
    nameKo: 'BOSE 사운드 시스템',
    nameEn: 'BOSE Surround Sound System',
    sortOrder: 3,
  },
];

// Lamborghini 옵션
const lamborghiniOptions: OptionData[] = [
  // Performance
  {
    manufacturer: 'Lamborghini',
    category: 'PERFORMANCE',
    code: 'LAM-CCB',
    nameKo: 'CCB (카본 세라믹 브레이크)',
    nameEn: 'CCB (Carbon Ceramic Brakes)',
    sortOrder: 1,
  },
  {
    manufacturer: 'Lamborghini',
    category: 'PERFORMANCE',
    code: 'LAM-MAG-SUSP',
    nameKo: '마그네틱 라이드',
    nameEn: 'Magneto Rheological Suspension',
    sortOrder: 2,
  },
  {
    manufacturer: 'Lamborghini',
    category: 'PERFORMANCE',
    code: 'LAM-SPORT-EXH',
    nameKo: '스포츠 배기',
    nameEn: 'Sport Exhaust',
    sortOrder: 3,
  },
  {
    manufacturer: 'Lamborghini',
    category: 'PERFORMANCE',
    code: 'LAM-REAR-STEERING',
    nameKo: '리어 휠 스티어링',
    nameEn: 'Rear Wheel Steering',
    sortOrder: 4,
  },
  // Exterior
  {
    manufacturer: 'Lamborghini',
    category: 'EXTERIOR',
    code: 'LAM-CARBON-PKG',
    nameKo: '카본 파이버 패키지',
    nameEn: 'Carbon Fiber Package',
    description: '풀 카본 파이버 외장 패키지',
    sortOrder: 1,
  },
  {
    manufacturer: 'Lamborghini',
    category: 'EXTERIOR',
    code: 'LAM-FORGED-COMP',
    nameKo: '포지드 컴포지트 휠',
    nameEn: 'Forged Composites Wheels',
    sortOrder: 2,
  },
  {
    manufacturer: 'Lamborghini',
    category: 'EXTERIOR',
    code: 'LAM-AD-PERSONAM',
    nameKo: '아드 페르소남',
    nameEn: 'Ad Personam (Custom)',
    description: '맞춤형 커스터마이징 프로그램',
    sortOrder: 3,
  },
  {
    manufacturer: 'Lamborghini',
    category: 'EXTERIOR',
    code: 'LAM-STYLE-PKG',
    nameKo: '스타일 패키지',
    nameEn: 'Style Package',
    sortOrder: 4,
  },
  // Interior
  {
    manufacturer: 'Lamborghini',
    category: 'INTERIOR',
    code: 'LAM-CARBON-SEAT',
    nameKo: '카본 스포츠 시트',
    nameEn: 'Carbon Fiber Sports Seats',
    sortOrder: 1,
  },
  {
    manufacturer: 'Lamborghini',
    category: 'INTERIOR',
    code: 'LAM-ALCANTARA',
    nameKo: '알칸타라 인테리어',
    nameEn: 'Full Alcantara Interior',
    sortOrder: 2,
  },
  {
    manufacturer: 'Lamborghini',
    category: 'INTERIOR',
    code: 'LAM-CARBON-INT',
    nameKo: '카본 인테리어 트림',
    nameEn: 'Carbon Fiber Interior Trim',
    sortOrder: 3,
  },
  {
    manufacturer: 'Lamborghini',
    category: 'INTERIOR',
    code: 'LAM-BRANDING-PKG',
    nameKo: '브랜딩 패키지',
    nameEn: 'Branding Package',
    description: '헤드레스트 자수, 도어실 로고',
    sortOrder: 4,
  },
  // Convenience
  {
    manufacturer: 'Lamborghini',
    category: 'CONVENIENCE',
    code: 'LAM-FRONT-LIFT',
    nameKo: '프론트 리프트',
    nameEn: 'Front Lift System',
    sortOrder: 1,
  },
  {
    manufacturer: 'Lamborghini',
    category: 'CONVENIENCE',
    code: 'LAM-CONNECT',
    nameKo: '커넥트 시스템',
    nameEn: 'Lamborghini Connect',
    sortOrder: 2,
  },
  {
    manufacturer: 'Lamborghini',
    category: 'CONVENIENCE',
    code: 'LAM-SENSONUM',
    nameKo: '센소늄 사운드',
    nameEn: 'Sensonum Sound System',
    sortOrder: 3,
  },
];

// McLaren 옵션
const mclarenOptions: OptionData[] = [
  // Performance
  {
    manufacturer: 'McLaren',
    category: 'PERFORMANCE',
    code: 'MCL-CCB',
    nameKo: '카본 세라믹 브레이크',
    nameEn: 'Carbon Ceramic Brakes',
    sortOrder: 1,
  },
  {
    manufacturer: 'McLaren',
    category: 'PERFORMANCE',
    code: 'MCL-SPORT-EXH',
    nameKo: '스포츠 배기',
    nameEn: 'Sports Exhaust',
    sortOrder: 2,
  },
  {
    manufacturer: 'McLaren',
    category: 'PERFORMANCE',
    code: 'MCL-PROACTIVE',
    nameKo: '프로액티브 섀시 컨트롤',
    nameEn: 'Proactive Chassis Control',
    sortOrder: 3,
  },
  // Exterior
  {
    manufacturer: 'McLaren',
    category: 'EXTERIOR',
    code: 'MCL-MSO',
    nameKo: 'MSO (맥라렌 스페셜)',
    nameEn: 'MSO (McLaren Special Operations)',
    description: '맥라렌 특별 제작 프로그램',
    sortOrder: 1,
  },
  {
    manufacturer: 'McLaren',
    category: 'EXTERIOR',
    code: 'MCL-CARBON-EXT',
    nameKo: '카본 외장 패키지',
    nameEn: 'Carbon Fiber Exterior Package',
    sortOrder: 2,
  },
  {
    manufacturer: 'McLaren',
    category: 'EXTERIOR',
    code: 'MCL-STEALTH-WHEEL',
    nameKo: '스텔스 휠',
    nameEn: 'Stealth Finish Wheels',
    sortOrder: 3,
  },
  // Interior
  {
    manufacturer: 'McLaren',
    category: 'INTERIOR',
    code: 'MCL-CARBON-SEAT',
    nameKo: '카본 레이싱 시트',
    nameEn: 'Carbon Fiber Racing Seats',
    sortOrder: 1,
  },
  {
    manufacturer: 'McLaren',
    category: 'INTERIOR',
    code: 'MCL-BOWERS',
    nameKo: 'Bowers & Wilkins 오디오',
    nameEn: 'Bowers & Wilkins Audio System',
    sortOrder: 2,
  },
  {
    manufacturer: 'McLaren',
    category: 'INTERIOR',
    code: 'MCL-ELEC-STEERING',
    nameKo: '전동 조절 스티어링',
    nameEn: 'Electrochromic Steering',
    sortOrder: 3,
  },
  // Convenience
  {
    manufacturer: 'McLaren',
    category: 'CONVENIENCE',
    code: 'MCL-NOSE-LIFT',
    nameKo: '노즈 리프트',
    nameEn: 'Vehicle Nose Lift',
    sortOrder: 1,
  },
  {
    manufacturer: 'McLaren',
    category: 'CONVENIENCE',
    code: 'MCL-TRACK-TELE',
    nameKo: '트랙 텔레메트리',
    nameEn: 'McLaren Track Telemetry',
    sortOrder: 2,
  },
];

// 모든 옵션 데이터 병합
const allOptions: OptionData[] = [
  ...ferrariOptions,
  ...porscheOptions,
  ...lamborghiniOptions,
  ...mclarenOptions,
];

// ============================================
// 시드 함수
// ============================================

export async function seedOptions() {
  console.log('Starting option seed...');

  // 기존 옵션 삭제 (개발 환경에서만)
  if (process.env.NODE_ENV === 'development') {
    await prisma.vehicleOption.deleteMany({});
    await prisma.option.deleteMany({});
    console.log('Cleared existing options');
  }

  // 옵션 생성
  for (const option of allOptions) {
    await prisma.option.upsert({
      where: { code: option.code },
      update: option,
      create: option,
    });
  }

  console.log(`Seeded ${allOptions.length} options`);

  // 제조사별 통계 출력
  const stats = await prisma.option.groupBy({
    by: ['manufacturer'],
    _count: { id: true },
  });

  console.log('\nOptions by manufacturer:');
  stats.forEach(s => {
    console.log(`  ${s.manufacturer}: ${s._count.id} options`);
  });
}

// 직접 실행 시
if (require.main === module) {
  seedOptions()
    .then(() => {
      console.log('\nSeed completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Seed failed:', error);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

export default allOptions;
