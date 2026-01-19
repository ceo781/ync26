"use client";

import React from "react";

export default function Step6Review() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Step 6: 최종 확인
      </h2>

      {/* 기본 정보 */}
      <div className="p-6 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-900 flex items-center">
            <span className="mr-2">📋</span>
            기본 정보
          </h3>
          <button className="text-accent hover:text-blue-700 text-sm font-medium">
            [수정]
          </button>
        </div>
        <div className="space-y-2 text-sm">
          <p>• 제조사: Ferrari</p>
          <p>• 모델: 488 Pista</p>
          <p>• 연식: 2019년</p>
          <p>• 주행거리: 12,340 km</p>
          <p>• VIN: ZFF79ALA0K0123456</p>
          <p>• 매칭넘버: Yes</p>
          <p>• 희망 판매가: 580,000,000원</p>
        </div>
      </div>

      {/* 옵션 */}
      <div className="p-6 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-900 flex items-center">
            <span className="mr-2">⚙️</span>
            옵션 (5개)
          </h3>
          <button className="text-accent hover:text-blue-700 text-sm font-medium">
            [수정]
          </button>
        </div>
        <div className="space-y-1 text-sm">
          <p>• 카본 세라믹 브레이크</p>
          <p>• 스포츠 배기 시스템</p>
          <p>• 카본 파이버 패키지</p>
          <p>• 카본 레이싱 시트</p>
          <p>• 프론트 리프트 시스템</p>
        </div>
      </div>

      {/* 정비 이력 */}
      <div className="p-6 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-900 flex items-center">
            <span className="mr-2">🔧</span>
            정비 이력 (2건)
          </h3>
          <button className="text-accent hover:text-blue-700 text-sm font-medium">
            [수정]
          </button>
        </div>
        <div className="space-y-1 text-sm">
          <p>• 2025-12-15: 정기 점검 (서울페라리)</p>
          <p>• 2025-06-10: 타이어 교체</p>
        </div>
      </div>

      {/* 소모품 상태 */}
      <div className="p-6 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-900 flex items-center">
            <span className="mr-2">🛠️</span>
            소모품 상태
          </h3>
          <button className="text-accent hover:text-blue-700 text-sm font-medium">
            [수정]
          </button>
        </div>
        <div className="space-y-1 text-sm">
          <p>• 타이어: 85% (2025-06-10 교체)</p>
          <p>• 브레이크 패드: 8.5mm (양호)</p>
          <p>• 엔진오일: 2025-12-15 교체 (500km)</p>
        </div>
      </div>

      {/* 미디어 */}
      <div className="p-6 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-900 flex items-center">
            <span className="mr-2">📸</span>
            미디어
          </h3>
          <button className="text-accent hover:text-blue-700 text-sm font-medium">
            [수정]
          </button>
        </div>
        <div className="space-y-1 text-sm">
          <p>• 이미지: 25장</p>
          <p>• 영상: 0건</p>
        </div>
      </div>

      {/* 제출 전 확인 사항 */}
      <div className="p-6 border-2 border-accent rounded-lg bg-blue-50">
        <h3 className="font-semibold text-gray-900 mb-4">
          ⚠️ 제출 전 확인 사항
        </h3>
        <div className="space-y-3">
          <label className="flex items-start">
            <input type="checkbox" className="mt-1 mr-3" required />
            <span className="text-sm">
              모든 정보가 정확함을 확인했습니다
            </span>
          </label>
          <label className="flex items-start">
            <input type="checkbox" className="mt-1 mr-3" required />
            <span className="text-sm">
              이용약관 및 개인정보처리방침에 동의합니다
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
