"use client";

import React from "react";
import { Card, MetricCard } from "@/components/cards";
import { MOCK_CLIENTS } from "@/mocks/clients";

export default function OverviewTab({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params) as { id: string };
  const clientData = MOCK_CLIENTS.find((c) => c.id === id);

  if (!clientData) return null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard title="Client status" value={clientData.status} info="Directory state" />
        <MetricCard title="Industry Group" value={clientData.companyName ? "Corporate Entity" : "Private Individual"} info="Classification" />
        <MetricCard title="Onboarded Date" value={clientData.onboardingDate} info="Registry creation timestamp" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card header={<div className="font-bold text-white text-xs">Profile Metadata</div>}>
          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex justify-between border-b border-slate-850 pb-1.5">
              <span className="text-slate-500">Primary Contact Line</span>
              <span className="font-semibold text-white">{clientData.phone}</span>
            </div>
            <div className="flex justify-between border-b border-slate-850 pb-1.5">
              <span className="text-slate-500">Corporate Email Domain</span>
              <span className="font-mono text-slate-300">{clientData.email}</span>
            </div>
            <div className="flex justify-between pb-1.5">
              <span className="text-slate-500">Default Retainer Balance</span>
              <span className="font-semibold text-emerald-400">$10,000.00</span>
            </div>
          </div>
        </Card>

        <Card header={<div className="font-bold text-white text-xs">Risk & Compliance Indicator</div>}>
          <div className="space-y-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded bg-emerald-500 flex items-center justify-center text-[9px] font-bold text-slate-950">L</span>
              <span className="text-white font-bold">Standard Account clearance: Low Risk</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              No outstanding dispute dockets or compliance reviews flagged. Accounts cleared by underwriting associates.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
