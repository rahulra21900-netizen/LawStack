"use client";

import React from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { Breadcrumb, Button, Badge } from "@/components/ui";
import { DataTable } from "@/components/tables";
import { MOCK_TEMPLATES } from "@/mocks/templates";
import { FileCode, Plus } from "lucide-react";

export default function TemplatesPage() {
  const { addToast } = useNotifications();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Templates" }]} />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <FileCode className="w-5 h-5 text-indigo-400" />
            <span>Document Templates</span>
          </h1>
          <p className="text-xs text-slate-400">Access pre-approved templates for NDAs, Sub-licensing agreements, and court motions.</p>
        </div>
        <Button
          variant="primary"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => addToast("New Template Schema", "Template creator panel loaded.", "info")}
        >
          Add Template
        </Button>
      </div>

      <DataTable
        title="Approved Templates Grid"
        data={MOCK_TEMPLATES}
        columns={[
          { header: "Template Name", accessor: (t) => <span className="font-bold text-white">{t.name}</span> },
          { header: "Jurisdiction Practice Area", accessor: (t) => <span className="font-semibold">{t.practiceArea}</span> },
          { header: "Template Version", accessor: (t) => <span className="font-mono text-[10px] text-slate-400">v{t.version}</span> },
          { header: "Description Details", accessor: (t) => <p className="text-slate-400 truncate max-w-sm">{t.description}</p> },
          { header: "Last Modified", accessor: (t) => <span className="text-slate-500 text-[10px] font-mono">{t.lastUpdated}</span> }
        ]}
      />
    </div>
  );
}
