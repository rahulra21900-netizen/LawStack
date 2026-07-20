"use client";

import React from "react";
import { Badge } from "@/components/ui";

export default function TimelineTab() {
  const schedule = [
    { time: "09:00 AM", event: "Opening Arguments", details: "Lead counsel presents initial dispute briefs." },
    { time: "10:30 AM", event: "Evidence Discovery Audit", details: "Review sub-licensing retainer files." }
  ];

  return (
    <div className="space-y-6">
      <div className="border-l-2 border-slate-800 ml-4 pl-6 space-y-6 text-xs">
        {schedule.map((item, idx) => (
          <div key={idx} className="relative">
            <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-amber-500 border-2 border-slate-950" />
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="font-bold text-white">{item.event}</span>
                <Badge label={item.time} variant="info" />
              </div>
              <p className="text-slate-400 leading-relaxed">{item.details}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
