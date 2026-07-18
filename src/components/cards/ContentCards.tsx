"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

// Standard Card
export function Card({ className, children, header, footer }: { className?: string; children: React.ReactNode; header?: React.ReactNode; footer?: React.ReactNode }) {
  return (
    <div className={cn("bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl shadow-slate-950/10", className)}>
      {header && <div className="p-4 border-b border-slate-800 bg-slate-950/10">{header}</div>}
      <div className="p-5">{children}</div>
      {footer && <div className="p-4 border-t border-slate-800 bg-slate-950/20 text-right">{footer}</div>}
    </div>
  );
}

// MetricCard Component
export function MetricCard({ title, value, change, trend = "neutral", info }: { title: string; value: string | number; change?: string; trend?: "up" | "down" | "neutral"; info?: string }) {
  return (
    <div className="bg-slate-900 border border-slate-800 p-4.5 rounded-xl space-y-2">
      <div className="flex justify-between items-start text-slate-400">
        <span className="text-[10px] uppercase font-bold tracking-wider">{title}</span>
        {trend === "up" && <ArrowUpRight className="w-4 h-4 text-emerald-500" />}
        {trend === "down" && <ArrowDownRight className="w-4 h-4 text-red-500" />}
      </div>
      <p className="text-2xl font-extrabold text-white tracking-tight">{value}</p>
      <div className="flex items-center gap-1.5 text-[9px] font-bold">
        {change && (
          <span className={cn(
            trend === "up" && "text-emerald-400",
            trend === "down" && "text-red-400",
            trend === "neutral" && "text-slate-400"
          )}>
            {change}
          </span>
        )}
        {info && <span className="text-slate-500">{info}</span>}
      </div>
    </div>
  );
}
