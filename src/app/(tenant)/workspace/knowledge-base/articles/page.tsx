"use client";

import React from "react";
import { Breadcrumb, Badge } from "@/components/ui";
import { DataTable } from "@/components/tables";
import { MOCK_KNOWLEDGE_ARTICLES } from "@/mocks/knowledge";
import Link from "next/link";

export default function ArticlesListPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Knowledge Base", href: "/workspace/knowledge-base/dashboard" }, { name: "Articles" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Precedents Articles</h1>
        <p className="text-xs text-slate-400">Search full legal research briefs, procedures, and templates checklists.</p>
      </div>

      <DataTable
        data={MOCK_KNOWLEDGE_ARTICLES}
        columns={[
          {
            header: "Article Title",
            accessor: (a) => (
              <Link href={`/workspace/knowledge-base/articles/${a.id}`} className="font-bold text-blue-400 hover:underline">
                {a.title}
              </Link>
            )
          },
          { header: "Category Class", accessor: (a) => <Badge label={a.category.replace(/_/g, ' ')} variant="info" /> },
          { header: "Author", accessor: (a) => <span className="font-semibold text-slate-300">{a.author}</span> },
          { header: "Last Updated", accessor: (a) => <span className="text-[10px] text-slate-500 font-mono">{a.lastUpdated}</span> }
        ]}
      />
    </div>
  );
}
