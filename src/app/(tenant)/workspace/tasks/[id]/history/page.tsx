"use client";

import React from "react";

export default function HistoryTab() {
  return (
    <div className="space-y-6">
      <div className="border-l-2 border-slate-800 ml-4 pl-6 space-y-4 text-xs text-slate-400">
        <div className="relative">
          <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-blue-600 border-2 border-slate-950" />
          <p className="text-white font-bold">Task Created</p>
          <p className="text-[10px] text-slate-500">Initial assignment allocated by lead counsel.</p>
        </div>
      </div>
    </div>
  );
}
