"use client";

import React, { useState } from "react";
import ProgressBar from "@/components/forms/ProgressBar";
import Step1BasicInfo from "@/components/forms/Step1BasicInfo";
import Step2Options from "@/components/forms/Step2Options";
import Step3Maintenance from "@/components/forms/Step3Maintenance";
import Step4Consumables from "@/components/forms/Step4Consumables";
import Step5Media from "@/components/forms/Step5Media";
import Step6Review from "@/components/forms/Step6Review";
import Button from "@/components/ui/Button";

export default function VehicleRegistrationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = () => {
    alert("차량 등록이 완료되었습니다! (목업)");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* 헤더 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-primary mb-2">
            하이엔드 차량 등록
          </h1>
          <p className="text-gray-600">
            정확한 정보를 입력하여 차량의 가치를 높이세요
          </p>
        </div>

        {/* 진행률 표시 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        </div>

        {/* 메인 폼 */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          {currentStep === 1 && <Step1BasicInfo />}
          {currentStep === 2 && <Step2Options />}
          {currentStep === 3 && <Step3Maintenance />}
          {currentStep === 4 && <Step4Consumables />}
          {currentStep === 5 && <Step5Media />}
          {currentStep === 6 && <Step6Review />}

          {/* 네비게이션 버튼 */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← 이전
            </Button>

            <div className="flex gap-3">
              <Button variant="secondary">임시 저장</Button>

              {currentStep < totalSteps ? (
                <Button onClick={handleNext}>다음 →</Button>
              ) : (
                <Button onClick={handleSubmit}>제출</Button>
              )}
            </div>
          </div>
        </div>

        {/* 안내 사항 */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>💡 이 페이지는 목업(Mockup)입니다. 실제 데이터는 저장되지 않습니다.</p>
        </div>
      </div>
    </div>
  );
}
