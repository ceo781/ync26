"use client";

import { HTMLAttributes, forwardRef } from "react";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "success" | "warning" | "error" | "info" | "secondary" | "default";
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className = "", variant = "default", children, ...props }, ref) => {
    const variants = {
      success: "badge-success",
      warning: "badge-warning",
      error: "badge-error",
      info: "badge-info",
      secondary: "badge-secondary",
      default: "badge bg-gray-700 text-gray-300",
    };

    return (
      <span
        ref={ref}
        className={`${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";
