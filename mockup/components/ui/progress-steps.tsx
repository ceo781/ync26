"use client";

export interface Step {
  id: number;
  title: string;
  description?: string;
}

export interface ProgressStepsProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export function ProgressSteps({
  steps,
  currentStep,
  onStepClick,
}: ProgressStepsProps) {
  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="w-full">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-400">진행률</span>
          <span className="text-secondary font-medium">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step Indicators */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;
          const isPending = stepNumber > currentStep;

          return (
            <div key={step.id} className="flex items-center flex-1">
              {/* Step Circle */}
              <button
                onClick={() => onStepClick?.(stepNumber)}
                disabled={isPending}
                className={`step-circle ${
                  isCompleted
                    ? "step-circle-completed"
                    : isActive
                      ? "step-circle-active"
                      : "step-circle-pending"
                } ${!isPending && onStepClick ? "cursor-pointer hover:scale-110" : "cursor-default"}`}
              >
                {isCompleted ? (
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  stepNumber
                )}
              </button>

              {/* Step Line */}
              {index < steps.length - 1 && (
                <div
                  className={`step-line ${
                    isCompleted ? "step-line-active" : "step-line-pending"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Step Labels */}
      <div className="flex justify-between mt-3">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;

          return (
            <div
              key={step.id}
              className={`flex-1 text-center ${index === 0 ? "text-left" : ""} ${index === steps.length - 1 ? "text-right" : ""}`}
            >
              <p
                className={`text-sm font-medium ${
                  isActive ? "text-secondary" : "text-gray-500"
                }`}
              >
                {step.title}
              </p>
              {step.description && (
                <p className="text-xs text-gray-600 mt-0.5 hidden sm:block">
                  {step.description}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
