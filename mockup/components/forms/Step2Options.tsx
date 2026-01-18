"use client";

import React, { useState } from "react";

const optionsData = {
  performance: [
    "카본 세라믹 브레이크",
    "스포츠 배기 시스템",
    "레이스 모드 서스펜션",
  ],
  exterior: [
    "카본 파이버 패키지",
    "포지드 휠",
    "특별 페인트 (Rosso Corsa)",
  ],
  interior: [
    "카본 레이싱 시트",
    "알칸타라 스티어링 휠",
    "하만카돈 사운드 시스템",
  ],
  convenience: [
    "프론트 리프트 시스템",
    "후방 카메라",
    "애플 카플레이",
  ],
};

export default function Step2Options() {
  const [selectedCount, setSelectedCount] = useState(0);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setSelectedCount((prev) => (checked ? prev + 1 : prev - 1));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Step 2: 옵션 선택
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        최소 3개 이상 선택해주세요
      </p>

      <div className="space-y-6">
        {/* 성능 */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">
            성능 (Performance)
          </h3>
          <div className="space-y-2">
            {optionsData.performance.map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-3 w-4 h-4"
                  onChange={handleCheckboxChange}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 외장 */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">
            외장 (Exterior)
          </h3>
          <div className="space-y-2">
            {optionsData.exterior.map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-3 w-4 h-4"
                  onChange={handleCheckboxChange}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 내장 */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">
            내장 (Interior)
          </h3>
          <div className="space-y-2">
            {optionsData.interior.map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-3 w-4 h-4"
                  onChange={handleCheckboxChange}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 편의 */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">
            편의 (Convenience)
          </h3>
          <div className="space-y-2">
            {optionsData.convenience.map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-3 w-4 h-4"
                  onChange={handleCheckboxChange}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 기타 옵션 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            기타 옵션 (선택)
          </label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none"
            rows={3}
            placeholder="기타 옵션을 입력하세요"
          />
        </div>

        {/* 선택된 옵션 개수 표시 */}
        <div
          className={`text-sm font-medium ${
            selectedCount >= 3 ? "text-green-600" : "text-red-600"
          }`}
        >
          선택된 옵션: {selectedCount}개 / 최소 3개 필요
        </div>
      </div>
    </div>
  );
}
