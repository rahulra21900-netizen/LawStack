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
      addToast("AI Clause Extraction Complete", "3 sub-licensing liability indemnity clauses extracted.", "success");
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-900/20 to-transparent border border-blue-500/20 rounded-xl">
        <Sparkles className="w-5 h-5 text-blue-400 animate-pulse" />
        <div>
          <h2 className="text-xs font-bold text-white">AI Document Assistant</h2>
          <p className="text-[10px] text-slate-400">Summarize clauses, draft responses, or verify file policy dockets (simulated).</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card header={<div className="font-bold text-white text-[11px]">Extract Document Clauses</div>}>
          <div className="space-y-4">
            <p className="text-[10px] text-slate-400 leading-relaxed">
              Scan file pages to list governing indemnity conditions and liability caps.
            </p>
            <Button
              variant="primary"
              className="w-full text-[10px]"
              leftIcon={loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-slate-900" />}
              onClick={triggerMockAnalysis}
              disabled={loading}
            >
              <span>{loading ? "Analyzing..." : "Extract Clauses"}</span>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
