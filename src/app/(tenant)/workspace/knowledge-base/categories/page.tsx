"use client";

import React from "react";
import { Breadcrumb, Badge } from "@/components/ui";
import { DataTable } from "@/components/tables";

export default function CategoriesPage() {
  const categoriesList = [
    { title: "Court Filing Rules Delaware", count: "6 Articles", lead: "Harvey Specter" }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Knowledge Base", href: "/workspace/knowledge-base/dashboard" }, { name: "Categories" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Knowledge Base Categories</h1>
        <p className="text-xs text-slate-400">Browse folders containing compliance guides and precedents.</p>
      </div>

      <DataTable
        data={categoriesList}
        columns={[
          { header: "Category name", accessor: (c) => <span className="font-bold text-white">{c.title}</span> },
          { header: "File Count", accessor: (c) => <span>{c.count}</span> },
          { header: "Assigned Lead attorney", accessor: (c) => <span className="font-semibold text-slate-300">{c.lead}</span> }
        ]}
      />
    </div>
  );
}
