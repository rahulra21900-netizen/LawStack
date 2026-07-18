"use client";

import React from "react";
import { MOCK_ACTIVITIES } from "@/mocks/activity";
import { DataTable } from "@/components/tables";
import { Badge } from "@/components/ui";

export default function ActivityTab({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params) as { id: string };
  const courtActivities = MOCK_ACTIVITIES.filter((a) => a.entityType === "Case"); // Relational logs

  return (
    <div className="space-y-6">
      <DataTable
        title="Courtroom session compliance logs"
        data={courtActivities}
        columns={[
          { header: "Action Item", accessor: (a) => <span className="font-bold text-white">{a.action}</span> },
          { header: "Triggered By", accessor: (a) => <span>{a.userName}</span> },
          { header: "Entity Class", accessor: (a) => <Badge label={a.entityType} variant="info" /> },
          { header: "Timestamp Log", accessor: (a) => <span className="text-slate-400 text-[10px] font-mono">{new Date(a.createdAt).toLocaleString()}</span> }
        ]}
      />
    </div>
  );
}
