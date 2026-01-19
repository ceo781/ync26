"use client";

import React from "react";
import Input from "../ui/Input";
import Select from "../ui/Select";

const manufacturers = [
  { value: "", label: "제조사 선택" },
  { value: "Ferrari", label: "Ferrari" },
  { value: "Lamborghini", label: "Lamborghini" },
  { value: "Porsche", label: "Porsche" },
  { value: "McLaren", label: "McLaren" },
  { value: "Bugatti", label: "Bugatti" },
];

const years = Array.from({ length: 76 }, (_, i) => {
  const year = 2026 - i;
  return { value: year.toString(), label: year.toString() };
});
years.unshift({ value: "", label: "연식 선택" });

export default function Step1BasicInfo() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Step 1: 기본 정보
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="제조사"
          options={manufacturers}
          required
          defaultValue=""
        />

        <Input label="모델명" placeholder="488 Pista" required />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select label="연식" options={years} required defaultValue="" />

        <Input
          label="주행거리 (km)"
          type="number"
          placeholder="12,340"
          required
        />
      </div>

      <Input
        label="VIN (차대번호)"
        placeholder="ZFF79ALA0K0123456"
        maxLength={17}
        required
      />

      <Input
        label="차량등록번호 (선택)"
        placeholder="12가3456"
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          매칭넘버 여부 <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="matchingNumbers"
              value="yes"
              className="mr-2"
              defaultChecked
            />
            <span>Yes</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="matchingNumbers"
              value="no"
              className="mr-2"
            />
            <span>No</span>
          </label>
        </div>
      </div>

      <Input
        label="희망 판매가 (원)"
        type="number"
        placeholder="580,000,000"
        required
      />
    </div>
  );
}
