"use client";

import React from "react";
import { Card, MetricCard } from "@/components/cards";
import { MOCK_DOCUMENTS } from "@/mocks/documents";

export default function OverviewTab({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params) as { id: string };
  const docData = MOCK_DOCUMENTS.find((d) => d.id === id);

  if (!docData) return null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard title="File status" value={docData.status} info="Approval state" />
        <MetricCard title="File size" value={`${(docData.fileSizeBytes / 1024 / 1024).toFixed(2)} MB`} info="Allocation yield" />
        <MetricCard title="Last Updated" value={new Date(docData.updatedAt).toLocaleDateString()} info="Version timestamp" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card header={<div className="font-bold text-white text-xs">Retention & Security Classification</div>}>
          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex justify-between border-b border-slate-850 pb-1.5">
              <span className="text-slate-500">Security Access Class</span>
              <span className="font-semibold text-white">Confidential - Internal attorney review</span>
            </div>
            <div className="flex justify-between border-b border-slate-850 pb-1.5">
              <span className="text-slate-500">Retention Policy</span>
              <span className="font-semibold text-white">7 Years Court filings retention schedule</span>
            </div>
            <div className="flex justify-between pb-1.5">
              <span className="text-slate-500">Author owner</span>
              <span className="font-semibold text-slate-300">{docData.author}</span>
            </div>
          </div>
        </Card>

        <Card header={<div className="font-bold text-white text-xs">Simulated compliance Lock</div>}>
          <div className="space-y-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded bg-emerald-500 flex items-center justify-center text-[9px] font-bold text-slate-950">L</span>
              <span className="text-white font-bold">Lock clearance active</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              No retention policy disputes or edit clearance warnings triggered.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
