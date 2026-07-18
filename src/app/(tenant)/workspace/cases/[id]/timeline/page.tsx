"use client";

import React from "react";
import { MOCK_ACTIVITIES } from "@/mocks/activity";
import { Clock, ShieldAlert } from "lucide-react";

export default function TimelineTab({ params }: { params: Promise<{ id: string }> }) {
  // Visual timeline logs
  return (
    <div className="space-y-6">
      <div className="border-l-2 border-slate-800 ml-4 pl-6 space-y-6">
        {MOCK_ACTIVITIES.map((act) => (
          <div key={act.id} className="relative">
            {/* Timeline dot */}
            <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-blue-600 border-2 border-slate-950 flex items-center justify-center" />
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-white">{act.action}</span>
                <span className="text-slate-500 text-[10px]">{new Date(act.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="text-[10px] text-slate-400">Triggered by: <strong>{act.userName}</strong> • Entity: {act.entityType}</p>
              {act.details && <p className="text-[10px] text-slate-400 leading-relaxed bg-slate-950/20 p-2 rounded border border-slate-850">{act.details}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
