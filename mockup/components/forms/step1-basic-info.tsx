"use client";

import { useFormContext } from "react-hook-form";
import { Input, Select, Textarea, RadioGroup, PriceInput } from "@/components/ui";
import { MANUFACTURERS, YEARS } from "@/lib/constants";
import type { VehicleRegistrationData } from "@/types/vehicle";

export function Step1BasicInfo() {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<VehicleRegistrationData>();

  const matchingNumbers = watch("basicInfo.matchingNumbers");
  const priceKrw = watch("basicInfo.priceKrw");

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">기본 정보</h2>
        <p className="text-gray-400">
          차량의 기본 정보를 입력해주세요. 정확한 정보 입력이 빠른 판매에
          도움됩니다.
        </p>
      </div>

      {/* Vehicle Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Manufacturer */}
        <Select
          label="제조사"
          placeholder="제조사를 선택하세요"
          options={MANUFACTURERS.map((m) => ({ value: m.value, label: m.label }))}
          error={errors.basicInfo?.manufacturer?.message}
          required
          {...register("basicInfo.manufacturer", {
            required: "제조사를 선택해주세요",
          })}
        />

        {/* Model */}
        <Input
          label="모델명"
          placeholder="예: 488 Pista"
          error={errors.basicInfo?.model?.message}
          required
          {...register("basicInfo.model", {
            required: "모델명을 입력해주세요",
            minLength: {
              value: 1,
              message: "모델명을 입력해주세요",
            },
          })}
        />

        {/* Year */}
        <Select
          label="연식"
          placeholder="연식을 선택하세요"
          options={YEARS}
          error={errors.basicInfo?.year?.message}
          required
          {...register("basicInfo.year", {
            required: "연식을 선택해주세요",
          })}
        />

        {/* Mileage */}
        <Input
          label="주행거리"
          type="number"
          placeholder="예: 12340"
          error={errors.basicInfo?.mileageKm?.message}
          hint="단위: km"
          required
          {...register("basicInfo.mileageKm", {
            required: "주행거리를 입력해주세요",
            min: {
              value: 0,
              message: "0 이상의 값을 입력해주세요",
            },
            valueAsNumber: true,
          })}
        />

        {/* VIN */}
        <div className="md:col-span-2">
          <Input
            label="VIN (차대번호)"
            placeholder="예: ZFF79ALA0K0123456"
            error={errors.basicInfo?.vin?.message}
            hint="17자리 영문/숫자 조합 (I, O, Q 제외)"
            required
            {...register("basicInfo.vin", {
              required: "VIN을 입력해주세요",
              pattern: {
                value: /^[A-HJ-NPR-Z0-9]{17}$/i,
                message: "유효한 VIN 형식이 아닙니다 (17자리)",
              },
            })}
          />
        </div>

        {/* Registration Number */}
        <Input
          label="차량등록번호"
          placeholder="예: 12가3456"
          error={errors.basicInfo?.registrationNumber?.message}
          hint="선택사항 - 일부 마스킹 처리됩니다"
          {...register("basicInfo.registrationNumber")}
        />

        {/* Price */}
        <PriceInput
          label="희망 판매가"
          placeholder="500,000,000"
          error={errors.basicInfo?.priceKrw?.message}
          currency="KRW"
          value={priceKrw}
          onChange={(value) => setValue("basicInfo.priceKrw", value || "")}
          required
        />
      </div>

      {/* Matching Numbers */}
      <div className="border-t border-gray-700 pt-6">
        <RadioGroup
          label="매칭 넘버 (Matching Numbers)"
          name="basicInfo.matchingNumbers"
          value={matchingNumbers}
          onChange={(e) =>
            setValue("basicInfo.matchingNumbers", e.target.value as "yes" | "no")
          }
          options={[
            {
              value: "yes",
              label: "Yes",
              description: "엔진, 트랜스미션, 차체 번호가 출고 당시와 일치합니다",
            },
            {
              value: "no",
              label: "No",
              description: "일부 부품이 교체되었거나 번호가 일치하지 않습니다",
            },
          ]}
          orientation="horizontal"
          error={errors.basicInfo?.matchingNumbers?.message}
          required
        />
      </div>

      {/* Description */}
      <div className="border-t border-gray-700 pt-6 space-y-6">
        <h3 className="text-lg font-semibold text-white">차량 설명</h3>

        <Textarea
          label="한국어 설명"
          placeholder="차량에 대한 상세한 설명을 작성해주세요. 구매자에게 어필할 수 있는 특징, 관리 이력, 특별한 점 등을 포함해주세요."
          rows={5}
          error={errors.basicInfo?.descriptionKo?.message}
          hint="최소 50자 이상 작성을 권장합니다"
          {...register("basicInfo.descriptionKo", {
            minLength: {
              value: 10,
              message: "최소 10자 이상 입력해주세요",
            },
          })}
        />

        <Textarea
          label="영어 설명 (선택)"
          placeholder="Please provide a detailed description of the vehicle in English for international buyers."
          rows={5}
          error={errors.basicInfo?.descriptionEn?.message}
          hint="해외 바이어를 위해 영어 설명을 추가하면 노출 범위가 넓어집니다"
          {...register("basicInfo.descriptionEn")}
        />
      </div>

      {/* Information Box */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <svg
              className="w-5 h-5 text-secondary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="text-sm text-gray-400">
            <p className="font-medium text-gray-300 mb-1">정확한 정보 입력</p>
            <p>
              입력하신 정보는 차량 승인 과정에서 검증됩니다. 허위 정보 기재 시
              등록이 거부될 수 있으며, 이미 승인된 차량도 취소될 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
