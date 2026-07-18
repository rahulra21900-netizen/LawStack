"use client";

import React from "react";
import { Card, MetricCard } from "@/components/cards";
import { MOCK_HEARINGS } from "@/mocks/hearings";

export default function OverviewTab({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params) as { id: string };
  const hearingData = MOCK_HEARINGS.find((h) => h.id === id);

  if (!hearingData) return null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard title="Hearing Status" value={hearingData.status} info="Docket state" />
        <MetricCard title="Courtroom Room" value={hearingData.courtroom} info="Location venue" />
        <MetricCard title="Presiding Judge" value={hearingData.judgeName} info="Jurisdiction judge" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card header={<div className="font-bold text-white text-xs">Venue & Courtroom details</div>}>
          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex justify-between border-b border-slate-850 pb-1.5">
              <span className="text-slate-500">Jurisdiction Venue</span>
              <span className="font-semibold text-white">{hearingData.location}</span>
            </div>
            <div className="flex justify-between pb-1.5">
              <span className="text-slate-500">Presiding Officer</span>
              <span className="font-semibold text-white">{hearingData.judgeName}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
