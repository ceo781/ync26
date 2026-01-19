"use client";

import { InputHTMLAttributes, forwardRef, useState, useEffect } from "react";

export interface PriceInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  label?: string;
  error?: string;
  hint?: string;
  currency?: string;
  value?: number | string;
  onChange?: (value: number | undefined) => void;
}

export const PriceInput = forwardRef<HTMLInputElement, PriceInputProps>(
  (
    {
      className = "",
      label,
      error,
      hint,
      currency = "KRW",
      value,
      onChange,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    const [displayValue, setDisplayValue] = useState("");

    // Format number with commas
    const formatNumber = (num: number): string => {
      return num.toLocaleString("ko-KR");
    };

    // Parse string to number
    const parseNumber = (str: string): number | undefined => {
      const cleaned = str.replace(/[^0-9]/g, "");
      const num = parseInt(cleaned, 10);
      return isNaN(num) ? undefined : num;
    };

    // Sync display value with prop value
    useEffect(() => {
      if (value !== undefined && value !== "") {
        const numValue = typeof value === "string" ? parseNumber(value) : value;
        if (numValue !== undefined) {
          setDisplayValue(formatNumber(numValue));
        }
      } else {
        setDisplayValue("");
      }
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;

      // Remove all non-numeric characters except for display
      const numericValue = parseNumber(inputValue);

      if (numericValue !== undefined) {
        setDisplayValue(formatNumber(numericValue));
        onChange?.(numericValue);
      } else if (inputValue === "") {
        setDisplayValue("");
        onChange?.(undefined);
      }
    };

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="form-label">
            {label}
            {props.required && <span className="text-error ml-1">*</span>}
          </label>
        )}
        <div className="price-input-wrapper">
          <input
            ref={ref}
            type="text"
            id={inputId}
            inputMode="numeric"
            value={displayValue}
            onChange={handleChange}
            className={`form-input pr-16 text-right tabular-nums ${
              error ? "form-input-error" : ""
            } ${className}`}
            {...props}
          />
          <span className="currency">{currency}</span>
        </div>
        {error && <p className="form-error">{error}</p>}
        {hint && !error && <p className="form-hint">{hint}</p>}
      </div>
    );
  }
);

PriceInput.displayName = "PriceInput";
