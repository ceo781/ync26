"use client";

import { InputHTMLAttributes, forwardRef } from "react";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = "", label, error, id, ...props }, ref) => {
    const checkboxId = id || label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full">
        <label
          htmlFor={checkboxId}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            className={`form-checkbox ${className}`}
            {...props}
          />
          <span className="text-gray-300 group-hover:text-white transition-colors">
            {label}
          </span>
        </label>
        {error && <p className="form-error mt-1">{error}</p>}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
