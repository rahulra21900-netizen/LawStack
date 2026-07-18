"use client";

import React from "react";
import { MOCK_HEARINGS } from "@/mocks/hearings";
import { DataTable } from "@/components/tables";
import { Badge } from "@/components/ui";

export default function HearingsTab({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params) as { id: string };
  const caseHearings = MOCK_HEARINGS.filter((h) => h.caseId === id);

  return (
    <div className="space-y-6">
      <DataTable
        title="Hearings & appearances schedule"
        data={caseHearings}
        columns={[
          { header: "Judge", accessor: (h) => <span className="font-bold text-white">{h.judgeName}</span> },
          { header: "Courtroom", accessor: (h) => <span>{h.courtroom}</span> },
          { header: "Scheduled Date / Time", accessor: (h) => <span className="font-semibold text-slate-300">{new Date(h.dateTime).toLocaleString()}</span> },
          { header: "Status", accessor: (h) => <Badge label={h.status} variant={h.status === "Scheduled" ? "warning" : "success"} /> }
        ]}
      />
    </div>
  );
}
