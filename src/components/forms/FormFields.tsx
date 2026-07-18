"use client";

import React from "react";
import { cn } from "@/lib/utils";

// Input Component
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, disabled, ...props }, ref) => {
    return (
      <div className="space-y-1.5 w-full">
        {label && <label className="block text-[10px] uppercase font-bold text-slate-400">{label}</label>}
        <input
          ref={ref}
          disabled={disabled}
          className={cn(
            "block w-full px-3 py-2 bg-slate-950/50 border rounded-lg text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:bg-slate-950/20 transition-all",
            error ? "border-red-500 focus:ring-red-500/50" : "border-slate-800 focus:border-slate-700",
            className
          )}
          {...props}
        />
        {error && <p className="text-[10px] text-red-400 font-semibold">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

// Textarea Component
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, disabled, ...props }, ref) => {
    return (
      <div className="space-y-1.5 w-full">
        {label && <label className="block text-[10px] uppercase font-bold text-slate-400">{label}</label>}
        <textarea
          ref={ref}
          disabled={disabled}
          className={cn(
            "block w-full px-3 py-2 bg-slate-950/50 border rounded-lg text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:bg-slate-950/20 transition-all min-h-[80px]",
            error ? "border-red-500 focus:ring-red-500/50" : "border-slate-800 focus:border-slate-700",
            className
          )}
          {...props}
        />
        {error && <p className="text-[10px] text-red-400 font-semibold">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

// Select Component
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { label: string; value: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, disabled, ...props }, ref) => {
    return (
      <div className="space-y-1.5 w-full">
        {label && <label className="block text-[10px] uppercase font-bold text-slate-400">{label}</label>}
        <select
          ref={ref}
          disabled={disabled}
          className={cn(
            "block w-full px-3 py-2 bg-slate-950/50 border rounded-lg text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:bg-slate-950/20 transition-all",
            error ? "border-red-500 focus:ring-red-500/50" : "border-slate-800 focus:border-slate-700",
            className
          )}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-slate-900 text-slate-200">
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-[10px] text-red-400 font-semibold">{error}</p>}
      </div>
    );
  }
);
Select.displayName = "Select";

// Switch Component
export function Switch({ checked, onChange, label, disabled }: { checked: boolean; onChange: (val: boolean) => void; label?: string; disabled?: boolean }) {
  return (
    <label className={cn("inline-flex items-center gap-2.5 cursor-pointer select-none", disabled && "opacity-50 pointer-events-none")}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only"
        />
        <div className={cn("w-9 h-5 rounded-full transition-colors", checked ? "bg-blue-600" : "bg-slate-800")} />
        <div className={cn("absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-transform", checked && "transform translate-x-4")} />
      </div>
      {label && <span className="text-xs font-semibold text-slate-300">{label}</span>}
    </label>
  );
}
