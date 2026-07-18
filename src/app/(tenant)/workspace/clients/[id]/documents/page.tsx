"use client";

import React from "react";
import { MOCK_DOCUMENTS } from "@/mocks/documents";
import { MOCK_CASES } from "@/mocks/cases";
import { DataTable } from "@/components/tables";
import { Badge } from "@/components/ui";

export default function DocumentsTab({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params) as { id: string };
  const clientCaseIds = MOCK_CASES.filter((c) => c.clientId === id).map((c) => c.id);
  const clientDocs = MOCK_DOCUMENTS.filter((d) => d.caseId && clientCaseIds.includes(d.caseId));

  return (
    <div className="space-y-6">
      <DataTable
        title="Stored Client Files & Templates"
        data={clientDocs}
        columns={[
          { header: "Document Title", accessor: (d) => <span className="font-bold text-white">{d.title}</span> },
          { header: "Category Type", accessor: (d) => <span>{d.type}</span> },
          { header: "Version", accessor: (d) => <span className="font-mono text-[10px] text-slate-400">v{d.version}</span> },
          { header: "Status", accessor: (d) => <Badge label={d.status} variant={d.status === "Approved" ? "success" : "warning"} /> }
        ]}
      />
    </div>
  );
}
