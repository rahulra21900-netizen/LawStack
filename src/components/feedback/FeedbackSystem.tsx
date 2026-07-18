"use client";

import React from "react";
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from "lucide-react";
import { useNotifications } from "@/hooks/useNotifications";

// 1. Semantic Banners
interface BannerProps {
  title: string;
  message: string;
  onClose?: () => void;
}

export function SuccessBanner({ title, message, onClose }: BannerProps) {
  return (
    <div className="p-4 bg-emerald-500/10 border border-emerald-500/25 rounded-lg flex items-start gap-3 text-emerald-400">
      <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
      <div className="flex-1 text-xs">
        <p className="font-bold text-white">{title}</p>
        <p className="mt-0.5 leading-relaxed">{message}</p>
      </div>
      {onClose && (
        <button onClick={onClose} className="p-1 rounded hover:bg-emerald-500/20 text-emerald-500 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export function ErrorBanner({ title, message, onClose }: BannerProps) {
  return (
    <div className="p-4 bg-red-500/10 border border-red-500/25 rounded-lg flex items-start gap-3 text-red-400">
      <XCircle className="w-5 h-5 shrink-0 mt-0.5" />
      <div className="flex-1 text-xs">
        <p className="font-bold text-white">{title}</p>
        <p className="mt-0.5 leading-relaxed">{message}</p>
      </div>
      {onClose && (
        <button onClick={onClose} className="p-1 rounded hover:bg-red-500/20 text-red-500 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export function WarningBanner({ title, message, onClose }: BannerProps) {
  return (
    <div className="p-4 bg-amber-500/10 border border-amber-500/25 rounded-lg flex items-start gap-3 text-amber-400">
      <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
      <div className="flex-1 text-xs">
        <p className="font-bold text-white">{title}</p>
        <p className="mt-0.5 leading-relaxed">{message}</p>
      </div>
      {onClose && (
        <button onClick={onClose} className="p-1 rounded hover:bg-amber-500/20 text-amber-500 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export function InfoBanner({ title, message, onClose }: BannerProps) {
  return (
    <div className="p-4 bg-blue-500/10 border border-blue-500/25 rounded-lg flex items-start gap-3 text-blue-400">
      <Info className="w-5 h-5 shrink-0 mt-0.5" />
      <div className="flex-1 text-xs">
        <p className="font-bold text-white">{title}</p>
        <p className="mt-0.5 leading-relaxed">{message}</p>
      </div>
      {onClose && (
        <button onClick={onClose} className="p-1 rounded hover:bg-blue-500/20 text-blue-500 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

// 2. Status Badge
interface BadgeProps {
  label: string;
  variant?: "success" | "warning" | "error" | "info" | "neutral";
}

export function StatusBadge({ label, variant = "neutral" }: BadgeProps) {
  const styles = {
    success: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25",
    warning: "bg-amber-500/10 text-amber-400 border border-amber-500/25",
    error: "bg-red-500/10 text-red-400 border border-red-500/25",
    info: "bg-blue-500/10 text-blue-400 border border-blue-500/25",
    neutral: "bg-slate-800 text-slate-400 border border-slate-700",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${styles[variant]}`}>
      {label}
    </span>
  );
}

// 3. Progress Indicator
export function ProgressIndicator({ value, max = 100 }: { value: number; max?: number }) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  return (
    <div className="w-full space-y-1">
      <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
        <div className="bg-blue-500 h-1.5 rounded-full transition-all duration-300" style={{ width: `${percentage}%` }}></div>
      </div>
      <div className="flex justify-between text-[9px] text-slate-500">
        <span>Progress</span>
        <span>{Math.round(percentage)}%</span>
      </div>
    </div>
  );
}

// 4. Toast overlay notifications popup
export function ToastContainer() {
  const { toasts, removeToast } = useNotifications();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
      {toasts.map((toast) => {
        const icons = {
          success: <CheckCircle2 className="w-4 h-4 text-emerald-400" />,
          error: <XCircle className="w-4 h-4 text-red-400" />,
          warning: <AlertTriangle className="w-4 h-4 text-amber-400" />,
          info: <Info className="w-4 h-4 text-blue-400" />,
        };

        const borders = {
          success: "border-emerald-500/20 bg-slate-900/95",
          error: "border-red-500/20 bg-slate-900/95",
          warning: "border-amber-500/20 bg-slate-900/95",
          info: "border-blue-500/20 bg-slate-900/95",
        };

        return (
          <div
            key={toast.id}
            className={`p-3 border rounded-xl shadow-xl flex gap-2.5 items-start text-xs text-slate-300 transition-all duration-300 animate-in slide-in-from-right-5 ${borders[toast.type]}`}
          >
            <div className="mt-0.5 shrink-0">{icons[toast.type]}</div>
            <div className="flex-1 pr-4">
              <p className="font-bold text-white text-[11px]">{toast.title}</p>
              <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 -mr-1 rounded hover:bg-slate-800 text-slate-500 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
