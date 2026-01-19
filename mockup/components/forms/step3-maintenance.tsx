"use client";

import { useFormContext, useFieldArray } from "react-hook-form";
import { Input, Textarea, Button, PriceInput } from "@/components/ui";
import type { VehicleRegistrationData, MaintenanceRecord } from "@/types/vehicle";

export function Step3Maintenance() {
  const {
    control,
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<VehicleRegistrationData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "maintenanceRecords",
  });

  const addRecord = () => {
    append({
      id: `maintenance-${Date.now()}`,
      serviceDate: "",
      serviceCenter: "",
      description: "",
      cost: "",
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">정비 이력</h2>
        <p className="text-gray-400">
          차량의 정비 이력을 입력해주세요. 정비 기록이 많을수록 구매자 신뢰도가
          높아집니다.
        </p>
      </div>

      {/* Info Box */}
      <div className="bg-secondary/10 border border-secondary/30 rounded-xl p-4">
        <div className="flex gap-3">
          <svg
            className="w-5 h-5 text-secondary flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
          <div className="text-sm">
            <p className="font-medium text-secondary mb-1">정비 이력 작성 팁</p>
            <ul className="text-gray-400 space-y-1">
              <li>- 정기 점검, 오일 교체, 타이어 교체 등 주요 정비를 기록해주세요</li>
              <li>- 정비 영수증이나 서류가 있다면 함께 업로드하면 신뢰도가 높아집니다</li>
              <li>- 최근 정비부터 과거 순으로 작성하시면 좋습니다</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Maintenance Records */}
      <div className="space-y-6">
        {fields.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-gray-700 rounded-xl">
            <svg
              className="w-12 h-12 text-gray-600 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-gray-500 mb-4">등록된 정비 이력이 없습니다</p>
            <Button type="button" variant="secondary" onClick={addRecord}>
              + 정비 이력 추가
            </Button>
          </div>
        ) : (
          <>
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="p-6 bg-gray-800 rounded-xl border border-gray-700"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-white">
                    정비 기록 #{index + 1}
                  </h3>
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-gray-400 hover:text-error transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="정비 일자"
                    type="date"
                    error={errors.maintenanceRecords?.[index]?.serviceDate?.message}
                    required
                    {...register(`maintenanceRecords.${index}.serviceDate`, {
                      required: "정비 일자를 선택해주세요",
                    })}
                  />

                  <Input
                    label="정비소"
                    placeholder="예: 서울페라리 서비스센터"
                    error={errors.maintenanceRecords?.[index]?.serviceCenter?.message}
                    required
                    {...register(`maintenanceRecords.${index}.serviceCenter`, {
                      required: "정비소를 입력해주세요",
                    })}
                  />

                  <div className="md:col-span-2">
                    <Textarea
                      label="정비 내용"
                      placeholder="수행된 정비 내용을 상세히 작성해주세요&#10;예: 엔진오일 교체 (Shell Helix Ultra 0W-40), 에어필터 교체, 브레이크 점검"
                      rows={3}
                      error={errors.maintenanceRecords?.[index]?.description?.message}
                      required
                      {...register(`maintenanceRecords.${index}.description`, {
                        required: "정비 내용을 입력해주세요",
                      })}
                    />
                  </div>

                  <PriceInput
                    label="정비 비용 (선택)"
                    placeholder="500,000"
                    currency="KRW"
                    value={watch(`maintenanceRecords.${index}.cost`)}
                    onChange={(value) =>
                      setValue(`maintenanceRecords.${index}.cost`, value || "")
                    }
                    hint="선택사항"
                  />

                  <div>
                    <label className="form-label">정비 서류 (선택)</label>
                    <div className="upload-area p-4 text-center">
                      <svg
                        className="w-8 h-8 text-gray-500 mx-auto mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="text-sm text-gray-500">
                        클릭하여 업로드
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        PDF, JPG, PNG (최대 20MB)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={addRecord}
              className="w-full"
            >
              + 정비 이력 추가
            </Button>
          </>
        )}
      </div>

      {/* Skip Notice */}
      <div className="text-center text-sm text-gray-500">
        정비 이력이 없다면 이 단계를 건너뛰어도 됩니다. 다만, 정비 이력이
        있으면 구매자 신뢰도가 높아집니다.
      </div>
    </div>
  );
}
