"use client";

import { useFormContext } from "react-hook-form";
import { Input, Select, Textarea } from "@/components/ui";
import { BRAKE_DISK_STATUS } from "@/lib/constants";
import type { VehicleRegistrationData } from "@/types/vehicle";

export function Step4Consumables() {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<VehicleRegistrationData>();

  const tirePercentage = watch("consumableStatus.tirePercentage");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">소모품 상태</h2>
        <p className="text-gray-400">
          타이어, 브레이크, 엔진오일 등 주요 소모품의 현재 상태를 입력해주세요.
        </p>
      </div>

      {/* Tire Section */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            타이어
          </h3>
        </div>
        <div className="card-body space-y-6">
          {/* Tire Percentage Slider */}
          <div>
            <label className="form-label">타이어 잔량</label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-secondary"
                {...register("consumableStatus.tirePercentage", {
                  valueAsNumber: true,
                })}
              />
              <span className="text-xl font-bold text-secondary w-16 text-right">
                {tirePercentage || 0}%
              </span>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>교체 필요</span>
              <span>신품</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="교체 일자"
              type="date"
              {...register("consumableStatus.tireReplacementDate")}
            />
            <Input
              label="브랜드"
              placeholder="예: Michelin"
              {...register("consumableStatus.tireBrand")}
            />
            <Input
              label="모델"
              placeholder="예: Pilot Sport 4S"
              {...register("consumableStatus.tireModel")}
            />
          </div>
        </div>
      </div>

      {/* Brake Section */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
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
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            브레이크
          </h3>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="패드 두께"
              type="number"
              step="0.1"
              placeholder="예: 8.5"
              hint="단위: mm"
              {...register("consumableStatus.brakePadThicknessMm", {
                valueAsNumber: true,
              })}
            />
            <Select
              label="디스크 상태"
              placeholder="선택하세요"
              options={BRAKE_DISK_STATUS.map((s) => ({
                value: s.value,
                label: s.label,
              }))}
              {...register("consumableStatus.brakeDiskStatus")}
            />
            <Input
              label="패드 교체 일자"
              type="date"
              {...register("consumableStatus.brakePadReplacementDate")}
            />
          </div>
        </div>
      </div>

      {/* Engine Oil Section */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
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
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
              />
            </svg>
            엔진오일
          </h3>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="교체 일자"
              type="date"
              {...register("consumableStatus.engineOilReplacementDate")}
            />
            <Input
              label="교체 후 주행거리"
              type="number"
              placeholder="예: 500"
              hint="단위: km"
              {...register("consumableStatus.engineOilMileageKm", {
                valueAsNumber: true,
              })}
            />
            <Input
              label="오일 브랜드/종류"
              placeholder="예: Shell Helix Ultra 0W-40"
              {...register("consumableStatus.engineOilBrand")}
            />
          </div>
        </div>
      </div>

      {/* Other Consumables */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
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
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            기타 소모품
          </h3>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="배터리 교체 일자"
              type="date"
              {...register("consumableStatus.batteryReplacementDate")}
            />
            <Input
              label="냉각수 교체 일자"
              type="date"
              {...register("consumableStatus.coolantReplacementDate")}
            />
          </div>
        </div>
      </div>

      {/* Additional Notes */}
      <Textarea
        label="추가 메모 (선택)"
        placeholder="소모품 관련 추가 사항이 있다면 작성해주세요.&#10;예: 모든 소모품 공식 서비스센터에서 정품으로 교체"
        rows={4}
        {...register("consumableStatus.notes")}
      />
    </div>
  );
}
