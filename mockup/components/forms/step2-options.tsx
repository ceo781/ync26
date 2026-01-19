"use client";

import { useFormContext } from "react-hook-form";
import { useState, useMemo } from "react";
import { Textarea } from "@/components/ui";
import { SAMPLE_OPTIONS, OPTION_CATEGORIES } from "@/lib/constants";
import type { VehicleRegistrationData, OptionCategory } from "@/types/vehicle";

export function Step2Options() {
  const { watch, setValue, formState: { errors } } = useFormContext<VehicleRegistrationData>();

  const selectedManufacturer = watch("basicInfo.manufacturer");
  const selectedOptionIds = watch("options.selectedOptionIds") || [];
  const customOptions = watch("options.customOptions");

  const [activeCategory, setActiveCategory] = useState<OptionCategory>("PERFORMANCE");

  // Filter options by manufacturer
  const filteredOptions = useMemo(() => {
    if (!selectedManufacturer) return [];
    return SAMPLE_OPTIONS.filter(
      (opt) => opt.manufacturer === selectedManufacturer
    );
  }, [selectedManufacturer]);

  // Group options by category
  const optionsByCategory = useMemo(() => {
    const grouped: Record<OptionCategory, typeof filteredOptions> = {
      PERFORMANCE: [],
      EXTERIOR: [],
      INTERIOR: [],
      CONVENIENCE: [],
    };

    filteredOptions.forEach((opt) => {
      grouped[opt.category].push(opt);
    });

    return grouped;
  }, [filteredOptions]);

  // Count selected by category
  const selectedCountByCategory = useMemo(() => {
    const counts: Record<OptionCategory, number> = {
      PERFORMANCE: 0,
      EXTERIOR: 0,
      INTERIOR: 0,
      CONVENIENCE: 0,
    };

    selectedOptionIds.forEach((id: string) => {
      const opt = filteredOptions.find((o) => o.id === id);
      if (opt) {
        counts[opt.category]++;
      }
    });

    return counts;
  }, [selectedOptionIds, filteredOptions]);

  const toggleOption = (optionId: string) => {
    const newSelected = selectedOptionIds.includes(optionId)
      ? selectedOptionIds.filter((id: string) => id !== optionId)
      : [...selectedOptionIds, optionId];
    setValue("options.selectedOptionIds", newSelected);
  };

  const isMinimumMet = selectedOptionIds.length >= 3;

  if (!selectedManufacturer) {
    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">옵션 선택</h2>
          <p className="text-gray-400">차량에 장착된 옵션을 선택해주세요.</p>
        </div>

        <div className="bg-gray-800/50 border border-warning/30 rounded-xl p-6 text-center">
          <svg
            className="w-12 h-12 text-warning mx-auto mb-4"
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
          <p className="text-warning font-medium mb-2">제조사를 먼저 선택해주세요</p>
          <p className="text-gray-500 text-sm">
            Step 1에서 제조사를 선택하면 해당 브랜드의 옵션 목록이 표시됩니다.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">옵션 선택</h2>
        <p className="text-gray-400">
          {selectedManufacturer}에 장착된 옵션을 선택해주세요.
        </p>
      </div>

      {/* Selection Counter */}
      <div className="flex items-center justify-between p-4 bg-gray-800 rounded-xl border border-gray-700">
        <div className="flex items-center gap-3">
          <span className="text-gray-400">선택된 옵션:</span>
          <span
            className={`text-2xl font-bold ${
              isMinimumMet ? "text-success" : "text-warning"
            }`}
          >
            {selectedOptionIds.length}
          </span>
          <span className="text-gray-500">/ 최소 3개</span>
        </div>
        {isMinimumMet ? (
          <span className="badge-success">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            조건 충족
          </span>
        ) : (
          <span className="badge-warning">
            {3 - selectedOptionIds.length}개 더 선택 필요
          </span>
        )}
      </div>

      {/* Category Tabs */}
      <div className="tab-list overflow-x-auto hide-scrollbar">
        {OPTION_CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value as OptionCategory)}
            className={`tab-item whitespace-nowrap ${
              activeCategory === cat.value ? "tab-item-active" : ""
            }`}
          >
            {cat.label}
            {selectedCountByCategory[cat.value as OptionCategory] > 0 && (
              <span className="ml-2 px-1.5 py-0.5 text-xs bg-secondary/20 text-secondary rounded">
                {selectedCountByCategory[cat.value as OptionCategory]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {optionsByCategory[activeCategory].map((option) => {
          const isSelected = selectedOptionIds.includes(option.id);

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => toggleOption(option.id)}
              className={`p-4 rounded-xl border text-left transition-all ${
                isSelected
                  ? "border-secondary bg-secondary/10"
                  : "border-gray-700 hover:border-gray-600"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p
                    className={`font-medium ${
                      isSelected ? "text-secondary" : "text-white"
                    }`}
                  >
                    {option.nameKo}
                  </p>
                  <p className="text-sm text-gray-500 mt-0.5">{option.nameEn}</p>
                  {option.description && (
                    <p className="text-xs text-gray-600 mt-1">
                      {option.description}
                    </p>
                  )}
                </div>
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ml-3 ${
                    isSelected
                      ? "border-secondary bg-secondary"
                      : "border-gray-600"
                  }`}
                >
                  {isSelected && (
                    <svg
                      className="w-4 h-4 text-primary"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </button>
          );
        })}

        {optionsByCategory[activeCategory].length === 0 && (
          <div className="col-span-2 text-center py-8 text-gray-500">
            이 카테고리에 등록된 옵션이 없습니다.
          </div>
        )}
      </div>

      {/* Custom Options */}
      <div className="border-t border-gray-700 pt-6">
        <Textarea
          label="기타 옵션 (선택)"
          placeholder="목록에 없는 추가 옵션이 있다면 여기에 작성해주세요.&#10;예: 맞춤 도색, 특별 주문 인테리어 등"
          rows={4}
          value={customOptions}
          onChange={(e) => setValue("options.customOptions", e.target.value)}
          hint="쉼표(,)로 구분하여 작성해주세요"
        />
      </div>

      {/* Error Message */}
      {errors.options?.selectedOptionIds && (
        <p className="form-error">{errors.options.selectedOptionIds.message}</p>
      )}
    </div>
  );
}
