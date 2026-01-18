import React from "react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({
  currentStep,
  totalSteps,
}: ProgressBarProps) {
  const percentage = (currentStep / totalSteps) * 100;

  const steps = [
    { number: 1, label: "기본 정보" },
    { number: 2, label: "옵션" },
    { number: 3, label: "정비 이력" },
    { number: 4, label: "소모품" },
    { number: 5, label: "미디어" },
    { number: 6, label: "확인" },
  ];

  return (
    <div className="w-full mb-8">
      {/* 진행률 바 */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-600">
          Step {currentStep}/{totalSteps}
        </span>
        <span className="text-sm font-medium text-accent">
          {Math.round(percentage)}%
        </span>
      </div>

      {/* 프로그레스 바 */}
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-accent transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* 단계 표시 */}
      <div className="flex justify-between">
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mb-1 ${
                step.number < currentStep
                  ? "bg-accent text-white"
                  : step.number === currentStep
                  ? "bg-accent text-white ring-2 ring-accent ring-offset-2"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {step.number}
            </div>
            <span
              className={`text-xs ${
                step.number === currentStep
                  ? "text-accent font-medium"
                  : "text-gray-500"
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
