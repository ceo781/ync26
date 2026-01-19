"use client";

import { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ProgressSteps } from "@/components/ui";
import { Step1BasicInfo } from "@/components/forms/step1-basic-info";
import { Step2Options } from "@/components/forms/step2-options";
import { Step3Maintenance } from "@/components/forms/step3-maintenance";
import { Step4Consumables } from "@/components/forms/step4-consumables";
import { Step5Media } from "@/components/forms/step5-media";
import { Step6Confirmation } from "@/components/forms/step6-confirmation";
import { FORM_STEPS } from "@/lib/constants";
import type { VehicleRegistrationData } from "@/types/vehicle";

const STORAGE_KEY = "vehicle-registration-draft";

export default function VehicleRegistrationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSaveNotice, setShowSaveNotice] = useState(false);

  const methods = useForm<VehicleRegistrationData>({
    defaultValues: {
      basicInfo: {
        manufacturer: "",
        model: "",
        year: "",
        mileageKm: undefined,
        vin: "",
        registrationNumber: "",
        matchingNumbers: undefined,
        priceKrw: undefined,
        descriptionKo: "",
        descriptionEn: "",
      },
      options: {
        selectedOptions: [],
        customOptions: "",
      },
      maintenanceRecords: [],
      consumableStatus: {
        tirePercentage: 80,
        tireReplacementDate: "",
        tireBrand: "",
        tireModel: "",
        brakePadThicknessMm: undefined,
        brakeDiskStatus: "",
        brakePadReplacementDate: "",
        engineOilReplacementDate: "",
        engineOilMileageKm: undefined,
        engineOilBrand: "",
        batteryReplacementDate: "",
        coolantReplacementDate: "",
        notes: "",
      },
      media: {
        images: [],
        videos: [],
      },
    },
    mode: "onChange",
  });

  const { handleSubmit, watch, reset, trigger } = methods;

  // Load draft from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        reset(parsed.data);
        setCurrentStep(parsed.step || 1);
      } catch (e) {
        console.error("Failed to load draft:", e);
      }
    }
  }, [reset]);

  // Auto-save to localStorage
  useEffect(() => {
    const subscription = watch((data) => {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ data, step: currentStep })
      );
    });
    return () => subscription.unsubscribe();
  }, [watch, currentStep]);

  // Save notification
  const handleSave = () => {
    setShowSaveNotice(true);
    setTimeout(() => setShowSaveNotice(false), 2000);
  };

  // Navigation
  const goToStep = (step: number) => {
    if (step >= 1 && step <= FORM_STEPS.length) {
      setCurrentStep(step);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const nextStep = async () => {
    let isValid = true;

    if (currentStep === 1) {
      isValid = await trigger("basicInfo");
    } else if (currentStep === 2) {
      isValid = await trigger("options");
    }

    if (isValid && currentStep < FORM_STEPS.length) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Submit
  const onSubmit = async (data: VehicleRegistrationData) => {
    setIsSubmitting(true);
    try {
      console.log("Submitting:", data);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      localStorage.removeItem(STORAGE_KEY);
      alert("차량이 성공적으로 등록되었습니다!");
    } catch (error) {
      console.error("Submit error:", error);
      alert("등록 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render current step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1BasicInfo />;
      case 2:
        return <Step2Options />;
      case 3:
        return <Step3Maintenance />;
      case 4:
        return <Step4Consumables />;
      case 5:
        return <Step5Media />;
      case 6:
        return <Step6Confirmation onEditStep={goToStep} />;
      default:
        return null;
    }
  };

  const progressPercentage = Math.round((currentStep / FORM_STEPS.length) * 100);

  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="/" className="text-xl font-bold text-gradient">
              Hyper-Connect
            </a>
            <button type="button" onClick={handleSave} className="btn-ghost text-sm">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              임시 저장
            </button>
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="bg-gray-900/50 border-b border-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-white">차량 등록</h1>
            <span className="text-sm text-gray-400">
              Step {currentStep} / {FORM_STEPS.length} ({progressPercentage}%)
            </span>
          </div>
          <ProgressSteps steps={FORM_STEPS} currentStep={currentStep} onStepClick={goToStep} />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="animate-fade-in">{renderStep()}</div>

            {/* Navigation */}
            <div className="mt-10 pt-6 border-t border-gray-800">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="btn-outline disabled:opacity-30"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  이전
                </button>

                {currentStep < FORM_STEPS.length ? (
                  <button type="button" onClick={nextStep} className="btn-primary btn-lg">
                    다음
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ) : (
                  <button type="submit" disabled={isSubmitting} className="btn-secondary btn-lg disabled:opacity-50">
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        제출 중...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        등록 신청
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </form>
        </FormProvider>
      </main>

      {/* Toast */}
      {showSaveNotice && (
        <div className="fixed bottom-6 right-6 animate-slide-up">
          <div className="bg-success text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            임시 저장되었습니다
          </div>
        </div>
      )}
    </div>
  );
}
