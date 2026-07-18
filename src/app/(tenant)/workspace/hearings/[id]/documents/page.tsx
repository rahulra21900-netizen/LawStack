"use client";

import React from "react";
import { MOCK_DOCUMENTS } from "@/mocks/documents";
import { DataTable } from "@/components/tables";
import { Badge } from "@/components/ui";

export default function DocumentsTab({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params) as { id: string };
  const caseDocs = MOCK_DOCUMENTS.slice(0, 3); // Relational mockup documents list

  return (
    <div className="space-y-6">
      <DataTable
        title="Required Court Pleadings & Briefs"
        data={caseDocs}
        columns={[
          { header: "Document Title", accessor: (d) => <span className="font-bold text-white">{d.title}</span> },
          { header: "Type", accessor: (d) => <span>{d.type}</span> },
          { header: "Version", accessor: (d) => <span className="font-mono text-slate-400">v{d.version}</span> },
          { header: "Status", accessor: (d) => <Badge label={d.status} variant={d.status === "Approved" ? "success" : "warning"} /> }
        ]}
      />
    </div>
  );
}
