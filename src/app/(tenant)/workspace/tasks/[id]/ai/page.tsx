"use client";

import React, { useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { Button } from "@/components/ui";
import { Card } from "@/components/cards";
import { Sparkles, Loader2 } from "lucide-react";

export default function AiTab() {
  const { addToast } = useNotifications();
  const [loading, setLoading] = useState(false);

  const triggerMockAnalysis = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      addToast("AI Analysis Complete", "Estimated time: 4.5 billable hours.", "success");
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-900/20 to-transparent border border-blue-500/20 rounded-xl">
        <Sparkles className="w-5 h-5 text-blue-400 animate-pulse" />
        <div>
          <h2 className="text-xs font-bold text-white">AI Task Assistant</h2>
          <p className="text-[10px] text-slate-400">Break down tasks, generate checklists, or estimate billable hours durations. (Simulated)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card header={<div className="font-bold text-white text-[11px]">Estimate Billable Hours</div>}>
          <div className="space-y-4">
            <p className="text-[10px] text-slate-400 leading-relaxed">
              Scan task description parameters and complexity to suggest time estimates.
            </p>
            <Button
              variant="primary"
              className="w-full text-[10px]"
              leftIcon={loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-slate-900" />}
              onClick={triggerMockAnalysis}
              disabled={loading}
            >
              <span>{loading ? "Analyzing..." : "Estimate Duration"}</span>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
