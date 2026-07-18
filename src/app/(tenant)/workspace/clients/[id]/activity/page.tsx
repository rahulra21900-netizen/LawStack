"use client";

import React from "react";
import { MOCK_ACTIVITIES } from "@/mocks/activity";
import { DataTable } from "@/components/tables";
import { Badge } from "@/components/ui";

export default function ActivityTab({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params) as { id: string };
  const clientActivities = MOCK_ACTIVITIES.filter((a) => a.entityType === "Client" && a.entityId === id);

  return (
    <div className="space-y-6">
      <DataTable
        title="Client Audit Trail Logs"
        data={clientActivities}
        columns={[
          { header: "Action Item", accessor: (a) => <span className="font-bold text-white">{a.action}</span> },
          { header: "Triggered By", accessor: (a) => <span>{a.userName}</span> },
          { header: "Entity Category", accessor: (a) => <Badge label={a.entityType} variant="info" /> },
          { header: "Timestamp", accessor: (a) => <span className="text-[10px] text-slate-500 font-mono">{new Date(a.createdAt).toLocaleString()}</span> }
        ]}
      />
    </div>
  );
}
