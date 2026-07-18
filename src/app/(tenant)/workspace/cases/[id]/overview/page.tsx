"use client";

import React from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { Card, MetricCard } from "@/components/cards";
import { Badge } from "@/components/ui";
import { MOCK_CASES } from "@/mocks/cases";
import { Shield, Sparkles, Building, User } from "lucide-react";

export default function OverviewTab({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params) as { id: string };
  const caseData = MOCK_CASES.find((c) => c.id === id);

  if (!caseData) return null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard title="Active Stage" value={caseData.stage} info="Proceedings phase" />
        <MetricCard title="Case status" value={caseData.status} trend="up" info="Docket state" />
        <MetricCard title="Open Date" value={caseData.openDate} info="Filing timestamp" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card header={<div className="font-bold text-white text-xs">Court Jurisdiction Details</div>}>
          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex justify-between border-b border-slate-850 pb-1.5">
              <span className="text-slate-500">Court Venue</span>
              <span className="font-semibold text-white">Federal District Court Room 3C</span>
            </div>
            <div className="flex justify-between border-b border-slate-850 pb-1.5">
              <span className="text-slate-500">Presiding Judge</span>
              <span className="font-semibold text-white">Hon. Sarah Vance</span>
            </div>
            <div className="flex justify-between pb-1.5">
              <span className="text-slate-500">Opposing Counsel</span>
              <span className="font-semibold text-white">Robert Zane</span>
            </div>
          </div>
        </Card>

        <Card header={<div className="font-bold text-white text-xs">Simulated health Assessment</div>}>
          <div className="space-y-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded bg-emerald-500 flex items-center justify-center text-[9px] font-bold text-slate-950">A</span>
              <span className="text-white font-bold">Caseload Docket Score: 98% Health</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              No outstanding filings overdue. Financial deposits cleared within standard billing retainer periods.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
