"use client";

import React from "react";
import { Breadcrumb } from "@/components/ui";
import { DataTable } from "@/components/tables";

export default function LettersTemplatesPage() {
  const letters = [
    { name: "Retainer Engagement Letter Schema", version: "1.0", author: "Partner Specter" }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Templates", href: "/workspace/templates/dashboard" }, { name: "Letters" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Engagement & Counsel Letters</h1>
        <p className="text-xs text-slate-400">Precedents letters templates.</p>
      </div>

      <DataTable
        data={letters}
        columns={[
          { header: "Letter Template Name", accessor: (l) => <span className="font-bold text-white">{l.name}</span> },
          { header: "Version", accessor: (l) => <span className="font-mono text-[10px] text-slate-500">v{l.version}</span> },
          { header: "Author", accessor: (l) => <span className="font-semibold text-slate-300">{l.author}</span> }
        ]}
      />
    </div>
  );
}
