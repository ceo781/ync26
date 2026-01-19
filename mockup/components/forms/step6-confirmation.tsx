"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Checkbox } from "@/components/ui";
import type { VehicleRegistrationData } from "@/types/vehicle";
import { MANUFACTURERS, BRAKE_DISK_STATUS } from "@/lib/constants";

interface Step6Props {
  onEditStep: (step: number) => void;
}

export function Step6Confirmation({ onEditStep }: Step6Props) {
  const { watch } = useFormContext<VehicleRegistrationData>();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const formData = watch();

  const formatPrice = (price: number | string | undefined) => {
    if (!price) return "-";
    const num = typeof price === "string" ? parseInt(price, 10) : price;
    return num.toLocaleString("ko-KR") + " KRW";
  };

  const formatDate = (date: string | undefined) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("ko-KR");
  };

  const getBrakeDiskLabel = (value: string | undefined) => {
    const item = BRAKE_DISK_STATUS.find((s) => s.value === value);
    return item?.label || "-";
  };

  const SectionCard = ({
    title,
    step,
    children,
  }: {
    title: string;
    step: number;
    children: React.ReactNode;
  }) => (
    <div className="card">
      <div className="card-header flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <button
          type="button"
          onClick={() => onEditStep(step)}
          className="text-sm text-secondary hover:text-secondary-light transition-colors"
        >
          수정하기
        </button>
      </div>
      <div className="card-body">{children}</div>
    </div>
  );

  const InfoRow = ({
    label,
    value,
  }: {
    label: string;
    value: React.ReactNode;
  }) => (
    <div className="flex justify-between py-2 border-b border-gray-700/50 last:border-0">
      <span className="text-gray-400">{label}</span>
      <span className="text-white font-medium">{value || "-"}</span>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">최종 확인</h2>
        <p className="text-gray-400">
          입력하신 정보를 확인해주세요. 수정이 필요한 경우 각 섹션의 &quot;수정하기&quot;
          버튼을 클릭하세요.
        </p>
      </div>

      {/* Step 1: Basic Info */}
      <SectionCard title="기본 정보" step={1}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          <InfoRow label="제조사" value={formData.basicInfo?.manufacturer} />
          <InfoRow label="모델명" value={formData.basicInfo?.model} />
          <InfoRow label="연식" value={formData.basicInfo?.year && `${formData.basicInfo.year}년`} />
          <InfoRow
            label="주행거리"
            value={
              formData.basicInfo?.mileageKm &&
              `${formData.basicInfo.mileageKm.toLocaleString()} km`
            }
          />
          <InfoRow label="VIN" value={formData.basicInfo?.vin} />
          <InfoRow
            label="차량등록번호"
            value={formData.basicInfo?.registrationNumber || "미입력"}
          />
          <InfoRow
            label="매칭넘버"
            value={formData.basicInfo?.matchingNumbers === "yes" ? "Yes" : "No"}
          />
          <InfoRow
            label="희망 판매가"
            value={formatPrice(formData.basicInfo?.priceKrw)}
          />
        </div>
        {formData.basicInfo?.descriptionKo && (
          <div className="mt-4 pt-4 border-t border-gray-700">
            <p className="text-sm text-gray-400 mb-2">차량 설명</p>
            <p className="text-white text-sm whitespace-pre-wrap">
              {formData.basicInfo.descriptionKo}
            </p>
          </div>
        )}
      </SectionCard>

      {/* Step 2: Options */}
      <SectionCard title="장착 옵션" step={2}>
        {formData.options?.selectedOptions &&
        formData.options.selectedOptions.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {formData.options.selectedOptions.map((optionId) => (
              <span key={optionId} className="badge-secondary">
                {optionId}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">선택된 옵션이 없습니다</p>
        )}
        {formData.options?.customOptions && (
          <div className="mt-4 pt-4 border-t border-gray-700">
            <p className="text-sm text-gray-400 mb-2">기타 옵션</p>
            <p className="text-white text-sm">{formData.options.customOptions}</p>
          </div>
        )}
      </SectionCard>

      {/* Step 3: Maintenance */}
      <SectionCard title="정비 이력" step={3}>
        {formData.maintenanceRecords && formData.maintenanceRecords.length > 0 ? (
          <div className="space-y-4">
            {formData.maintenanceRecords.map((record, index) => (
              <div
                key={index}
                className="p-4 bg-gray-700/30 rounded-lg border border-gray-700"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-secondary font-medium">
                    {formatDate(record.serviceDate)}
                  </span>
                  <span className="text-sm text-gray-400">
                    {record.serviceCenter}
                  </span>
                </div>
                <p className="text-white text-sm">{record.description}</p>
                {record.cost && (
                  <p className="text-sm text-gray-400 mt-2">
                    비용: {record.cost.toLocaleString()} 원
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">등록된 정비 이력이 없습니다</p>
        )}
      </SectionCard>

      {/* Step 4: Consumables */}
      <SectionCard title="소모품 상태" step={4}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tires */}
          <div className="p-4 bg-gray-700/30 rounded-lg">
            <h4 className="text-sm font-medium text-gray-400 mb-3">타이어</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">잔량</span>
                <span className="text-white">
                  {formData.consumableStatus?.tirePercentage || 0}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">브랜드</span>
                <span className="text-white">
                  {formData.consumableStatus?.tireBrand || "-"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">교체일</span>
                <span className="text-white">
                  {formatDate(formData.consumableStatus?.tireReplacementDate)}
                </span>
              </div>
            </div>
          </div>

          {/* Brakes */}
          <div className="p-4 bg-gray-700/30 rounded-lg">
            <h4 className="text-sm font-medium text-gray-400 mb-3">브레이크</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">패드 두께</span>
                <span className="text-white">
                  {formData.consumableStatus?.brakePadThicknessMm
                    ? `${formData.consumableStatus.brakePadThicknessMm}mm`
                    : "-"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">디스크 상태</span>
                <span className="text-white">
                  {getBrakeDiskLabel(formData.consumableStatus?.brakeDiskStatus)}
                </span>
              </div>
            </div>
          </div>

          {/* Engine Oil */}
          <div className="p-4 bg-gray-700/30 rounded-lg">
            <h4 className="text-sm font-medium text-gray-400 mb-3">엔진오일</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">교체일</span>
                <span className="text-white">
                  {formatDate(formData.consumableStatus?.engineOilReplacementDate)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">교체 후 주행</span>
                <span className="text-white">
                  {formData.consumableStatus?.engineOilMileageKm
                    ? `${formData.consumableStatus.engineOilMileageKm.toLocaleString()} km`
                    : "-"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Step 5: Media */}
      <SectionCard title="미디어" step={5}>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-gray-400"
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
            <span className="text-white">이미지 0장</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            <span className="text-white">영상 0개</span>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          (미디어 파일은 최종 제출 시 업로드됩니다)
        </p>
      </SectionCard>

      {/* Terms and Conditions */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold text-white">약관 동의</h3>
        </div>
        <div className="card-body space-y-4">
          <Checkbox
            label="이용약관 동의 (필수)"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            description="차량 등록 및 거래에 관한 이용약관에 동의합니다."
          />
          <Checkbox
            label="개인정보 처리방침 동의 (필수)"
            checked={privacyAccepted}
            onChange={(e) => setPrivacyAccepted(e.target.checked)}
            description="개인정보 수집 및 이용에 동의합니다."
          />
        </div>
      </div>

      {/* Final Notice */}
      <div className="bg-secondary/10 border border-secondary/30 rounded-xl p-5">
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <svg
              className="w-6 h-6 text-secondary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">제출 전 확인사항</h4>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• 입력하신 정보는 관리자 검토 후 승인됩니다.</li>
              <li>• 허위 정보 기재 시 등록이 거부될 수 있습니다.</li>
              <li>• 승인 완료 후 국내외 바이어에게 노출됩니다.</li>
              <li>• 등록 후에도 정보 수정이 가능합니다.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Submission Status */}
      {(!termsAccepted || !privacyAccepted) && (
        <div className="bg-error/10 border border-error/30 rounded-xl p-4">
          <p className="text-sm text-error">
            모든 필수 약관에 동의해야 제출할 수 있습니다.
          </p>
        </div>
      )}
    </div>
  );
}
