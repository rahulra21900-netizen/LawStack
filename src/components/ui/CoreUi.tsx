"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronRight, Loader2 } from "lucide-react";

// Button Component
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, leftIcon, rightIcon, disabled, children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-semibold rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:pointer-events-none";
    const variants = {
      primary: "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/10",
      secondary: "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700",
      outline: "bg-transparent border border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white",
      ghost: "bg-transparent hover:bg-slate-800 text-slate-400 hover:text-white",
      destructive: "bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/10"
    };
    const sizes = {
      sm: "px-3 py-1.5 text-[11px]",
      md: "px-4 py-2 text-xs",
      lg: "px-5 py-2.5 text-sm"
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />}
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);
Button.displayName = "Button";

// Avatar Component
export function Avatar({ src, name, size = "md", isOnline }: { src?: string; name: string; size?: "sm" | "md" | "lg"; isOnline?: boolean }) {
  const sizes = {
    sm: "w-7 h-7 text-[10px]",
    md: "w-9 h-9 text-xs",
    lg: "w-12 h-12 text-sm"
  };
  const initials = name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();

  return (
    <div className="relative inline-block shrink-0">
      <div className={cn("rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center font-bold text-white overflow-hidden", sizes[size])}>
        {src ? (
          <img src={src} alt={name} className="w-full h-full object-cover" />
        ) : (
          <span>{initials}</span>
        )}
      </div>
      {isOnline && (
        <span className="absolute bottom-0 right-0 block w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-950" />
      )}
    </div>
  );
}

// Badge Component
export function Badge({
  label,
  children,
  variant = "neutral",
  size = "sm",
  className,
}: {
  label?: string;
  children?: React.ReactNode;
  variant?: "success" | "warning" | "error" | "info" | "neutral" | "primary";
  size?: "sm" | "md";
  className?: string;
}) {
  const styles = {
    success: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    error: "bg-red-500/10 text-red-400 border border-red-500/20",
    info: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    primary: "bg-blue-600/20 text-blue-300 border border-blue-500/30",
    neutral: "bg-slate-800 text-slate-400 border border-slate-700",
  };
  const sizeStyles = {
    sm: "px-2 py-0.5 text-[9px]",
    md: "px-2.5 py-1 text-[11px]",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded font-bold uppercase tracking-wider",
        styles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children || label}
    </span>
  );
}

// Breadcrumb Component
export function Breadcrumb({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1.5 md:space-x-2 text-[10px] sm:text-xs font-semibold text-slate-500">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="inline-flex items-center">
              {idx > 0 && <ChevronRight className="w-3.5 h-3.5 mx-1 text-slate-700 shrink-0" />}
              {isLast || !item.href ? (
                <span className="text-slate-300 font-bold">{item.name}</span>
              ) : (
                <a href={item.href} className="hover:text-white transition-colors">{item.name}</a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

// Accordion Component
export function Accordion({ items }: { items: { title: string; content: React.ReactNode }[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="space-y-1.5">
      {items.map((item, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div key={idx} className="border border-slate-800 rounded-lg overflow-hidden bg-slate-950/20">
            <button
              onClick={() => setOpenIdx(isOpen ? null : idx)}
              className="w-full text-left p-3.5 text-xs font-bold text-white flex justify-between items-center hover:bg-slate-900/50 transition-colors focus:outline-none"
            >
              <span>{item.title}</span>
              <span className={cn("transform transition-transform text-slate-500", isOpen && "rotate-180")}>▼</span>
            </button>
            {isOpen && (
              <div className="p-4 border-t border-slate-900 text-xs text-slate-400 leading-relaxed bg-slate-950/40">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
