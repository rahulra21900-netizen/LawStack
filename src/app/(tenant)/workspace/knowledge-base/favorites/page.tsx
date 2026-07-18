"use client";

import React from "react";
import { Breadcrumb } from "@/components/ui";
import { DataTable } from "@/components/tables";

export default function FavoritesPage() {
  const favorites = [
    { title: "Docket Rule 210 Filing Schedule", author: "Harvey Specter" }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Knowledge Base", href: "/workspace/knowledge-base/dashboard" }, { name: "Favorites" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Favorite Articles</h1>
        <p className="text-xs text-slate-400">Quick links to your bookmarked precedents guides.</p>
      </div>

      <DataTable
        data={favorites}
        columns={[
          { header: "Article Title", accessor: (f) => <span className="font-bold text-white">{f.title}</span> },
          { header: "Author", accessor: (f) => <span>{f.author}</span> }
        ]}
      />
    </div>
  );
}
