"use client";

import React from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { Breadcrumb, Button } from "@/components/ui";
import { Card } from "@/components/cards";
import { Sparkles } from "lucide-react";

export default function WorkflowsPage() {
  const { addToast } = useNotifications();

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "AI Workspace", href: "/workspace/ai-workspace/dashboard" }, { name: "Workflows" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">AI Automation Workflows</h1>
        <p className="text-xs text-slate-400">Configure trigger rules to draft letters, review compliance briefs, or summarize cases automatically.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card header={<div className="font-bold text-white text-[11px]">Generate Retainer Invoices Summary</div>}>
          <div className="space-y-4">
            <p className="text-[10px] text-slate-400 leading-relaxed">
              Triggers weekly: Scan case billable hours time sheets and generate monthly invoice briefs summaries.
            </p>
            <Button variant="primary" className="text-[10px]" onClick={() => addToast("Workflow Initiated", "Automation test run dispatched.")}>
              Test Run Workflow
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
