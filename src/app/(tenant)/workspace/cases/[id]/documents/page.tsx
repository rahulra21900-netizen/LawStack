"use client";

import React from "react";
import { MOCK_DOCUMENTS } from "@/mocks/documents";
import { DataTable } from "@/components/tables";
import { Badge } from "@/components/ui";
import { FileText } from "lucide-react";

export default function DocumentsTab({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params) as { id: string };
  const caseDocs = MOCK_DOCUMENTS.filter((d) => d.caseId === id);

  return (
    <div className="space-y-6">
      <DataTable
        title="Filed brief & Evidence dockets"
        data={caseDocs}
        columns={[
          { header: "Document Title", accessor: (d) => <span className="font-bold text-white">{d.title}</span> },
          { header: "Type Category", accessor: (d) => <span>{d.type}</span> },
          { header: "Version", accessor: (d) => <span className="font-mono text-slate-400">v{d.version}</span> },
          { header: "Size (Bytes)", accessor: (d) => <span>{(d.fileSizeBytes / 1024 / 1024).toFixed(2)} MB</span> },
          { header: "Status", accessor: (d) => <Badge label={d.status} variant={d.status === "Approved" ? "success" : "warning"} /> }
        ]}
      />
    </div>
  );
}
