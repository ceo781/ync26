"use client";

import React, { useState } from "react";
import Input from "../ui/Input";
import Select from "../ui/Select";

const brakeDiskStatusOptions = [
  { value: "", label: "상태 선택" },
  { value: "GOOD", label: "양호 (GOOD)" },
  { value: "FAIR", label: "보통 (FAIR)" },
  { value: "NEEDS_REPLACEMENT", label: "교체 필요" },
  { value: "REPLACED", label: "교체 완료" },
];

export default function Step4Consumables() {
  const [tirePercentage, setTirePercentage] = useState(85);

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Step 4: 소모품 상태
      </h2>

      {/* 타이어 */}
      <div className="p-6 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <span className="mr-2">🛞</span> 타이어
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              잔량 (%)
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={tirePercentage}
              onChange={(e) => setTirePercentage(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="text-center mt-2 text-2xl font-bold text-accent">
              {tirePercentage}%
            </div>
          </div>

          <Input label="교체 일자" type="date" />

          <Input
            label="브랜드/모델"
            placeholder="Michelin Pilot Sport 4S"
          />
        </div>
      </div>

      {/* 브레이크 */}
      <div className="p-6 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <span className="mr-2">🔧</span> 브레이크
        </h3>

        <div className="space-y-4">
          <Input
            label="패드 두께 (mm)"
            type="number"
            placeholder="8.5"
            step="0.1"
          />

          <Select
            label="디스크 상태"
            options={brakeDiskStatusOptions}
            defaultValue=""
          />
        </div>
      </div>

      {/* 엔진오일 */}
      <div className="p-6 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <span className="mr-2">🛢️</span> 엔진오일
        </h3>

        <div className="space-y-4">
          <Input label="최근 교체 일자" type="date" />

          <Input
            label="교체 후 주행거리 (km)"
            type="number"
            placeholder="500"
          />
        </div>
      </div>
    </div>
  );
}
