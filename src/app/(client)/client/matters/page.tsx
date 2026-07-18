"use client";

import React from "react";
import { Breadcrumb } from "@/components/ui";
import { DataTable } from "@/components/tables";
import { MOCK_CASES } from "@/mocks/cases";

export default function ClientMattersPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Portal", href: "/client/dashboard" }, { name: "Matters" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Your Litigation Matters</h1>
        <p className="text-xs text-slate-400">Track active case stages and trial schedules.</p>
      </div>

      <DataTable
        title="Litigation Cases dockets"
        data={MOCK_CASES.slice(0, 2)}
        columns={[
          { header: "Case Title", accessor: (c) => <span className="font-bold text-white">{c.title}</span> },
          { header: "Practice Area", accessor: (c) => <span>{c.practiceArea}</span> },
          { header: "Lead Attorney Counsel", accessor: (c) => <span>{c.leadCounsel}</span> }
        ]}
      />
    </div>
  );
}
