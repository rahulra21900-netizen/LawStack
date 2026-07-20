"use client";

import React, { useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { Button } from "@/components/ui";
import { Card } from "@/components/cards";
import { Sparkles, Loader2, ArrowRight } from "lucide-react";

export default function AiTab() {
  const { addToast } = useNotifications();
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  const triggerMockAiAction = (actionKey: string, successMessage: string) => {
    setLoadingAction(actionKey);
    setTimeout(() => {
      setLoadingAction(null);
      addToast("AI Assistant Finished", successMessage, "success");
    }, 2000);
  };

  const aiActions = [
    { key: "sum", title: "Summarize Case Matters", desc: "Extract legal claims, dockets, and milestones.", success: "matter brief summary generated successfully." },
    { key: "draft", title: "Draft Mock Filing Motion", desc: "Synthesize draft affidavit of service.", success: "Affidavit draft saved to local document cache." },
    { key: "laws", title: "Research Precedent Laws", desc: "Lookup standard Supreme Court cases.", success: "3 Supreme Court case precedents cited." }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-900/20 via-indigo-900/10 to-transparent border border-blue-500/20 rounded-xl">
        <Sparkles className="w-5 h-5 text-blue-400 animate-pulse" />
        <div>
          <h2 className="text-xs font-bold text-white">AI Legal Assistant Panel</h2>
          <p className="text-[10px] text-slate-400">Run quick AI summaries and drafting actions on this case file context (simulated).</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {aiActions.map((act) => (
          <Card key={act.key} header={<div className="font-bold text-white text-[11px]">{act.title}</div>}>
            <div className="space-y-4">
              <p className="text-[10px] text-slate-400 leading-relaxed">{act.desc}</p>
              <Button
                variant="primary"
                className="w-full text-[10px]"
                leftIcon={loadingAction === act.key ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-slate-900" />}
                onClick={() => triggerMockAiAction(act.key, act.success)}
                disabled={loadingAction !== null}
              >
                <span>{loadingAction === act.key ? "Analyzing..." : "Trigger AI Analysis"}</span>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
