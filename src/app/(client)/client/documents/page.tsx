"use client";

import React from "react";
import { Breadcrumb } from "@/components/ui";
import { DataTable } from "@/components/tables";
import { MOCK_DOCUMENTS } from "@/mocks/documents";
import { FileText } from "lucide-react";

export default function ClientDocumentsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Portal", href: "/client/dashboard" }, { name: "Documents" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Shared Documents</h1>
        <p className="text-xs text-slate-400">Access contract briefs, pleadings, and corporate filings shared by your legal team.</p>
      </div>

      <DataTable
        title="Shared Files"
        data={MOCK_DOCUMENTS.slice(0, 2)}
        columns={[
          {
            header: "Document Name",
            accessor: (d) => (
              <span className="font-bold text-white flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-indigo-400" />
                <span>{d.title}</span>
              </span>
            )
          },
          { header: "Document Type", accessor: (d) => <span className="font-mono">{d.type.toUpperCase()}</span> },
          { header: "Upload Date", accessor: (d) => <span className="text-slate-450">{d.updatedAt}</span> }
        ]}
      />
    </div>
  );
}
