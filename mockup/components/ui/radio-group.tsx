"use client";

import { InputHTMLAttributes, forwardRef } from "react";

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

export interface RadioGroupProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  options: RadioOption[];
  error?: string;
  orientation?: "horizontal" | "vertical";
}

export const RadioGroup = forwardRef<HTMLInputElement, RadioGroupProps>(
  (
    {
      className = "",
      label,
      options,
      error,
      orientation = "vertical",
      name,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const orientationStyles =
      orientation === "horizontal"
        ? "flex flex-wrap gap-4"
        : "flex flex-col gap-3";

    return (
      <div className="w-full">
        {label && (
          <p className="form-label mb-3">
            {label}
            {props.required && <span className="text-error ml-1">*</span>}
          </p>
        )}
        <div className={orientationStyles}>
          {options.map((option) => (
            <label
              key={option.value}
              className={`flex items-start gap-3 cursor-pointer group p-3 rounded-lg border transition-all ${
                value === option.value
                  ? "border-secondary bg-secondary/10"
                  : "border-gray-700 hover:border-gray-600"
              }`}
            >
              <input
                ref={ref}
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={onChange}
                className={`form-radio mt-0.5 ${className}`}
                {...props}
              />
              <div>
                <span
                  className={`block font-medium ${
                    value === option.value ? "text-secondary" : "text-gray-300"
                  }`}
                >
                  {option.label}
                </span>
                {option.description && (
                  <span className="text-sm text-gray-500">
                    {option.description}
                  </span>
                )}
              </div>
            </label>
          ))}
        </div>
        {error && <p className="form-error mt-2">{error}</p>}
      </div>
    );
  }
);

RadioGroup.displayName = "RadioGroup";
