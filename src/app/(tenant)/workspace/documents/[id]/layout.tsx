"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Breadcrumb } from "@/components/ui";
import { MOCK_DOCUMENTS } from "@/mocks/documents";
import { FileText, ArrowLeft } from "lucide-react";

export default function DocumentDetailsLayout({ children, params }: { children: React.ReactNode; params: Promise<{ id: string }> }) {
  const { id } = React.use(params) as { id: string };
  const pathname = usePathname();

  const docData = MOCK_DOCUMENTS.find((d) => d.id === id);

  if (!docData) {
    return (
      <div className="p-8 text-center text-xs text-red-400">
        Error: Document registry ID "{id}" does not exist in file database.
      </div>
    );
  }

  const tabs = [
    { name: "Overview", path: "overview" },
    { name: "Visual Preview", path: "preview" },
    { name: "Version Timeline", path: "versions" },
    { name: "Activity Trail", path: "activity" },
    { name: "Approvals Queue", path: "approvals" },
    { name: "Access Permissions", path: "sharing" },
    { name: "Related Records", path: "related" },
    { name: "AI Panel", path: "ai" },
    { name: "Settings", path: "settings" }
  ];

  return (
    <div className="space-y-6">
      {/* Header Info Panel */}
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Documents", href: "/workspace/documents" }, { name: docData.title }]} />
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">{docData.title}</h1>
            </div>
            <p className="text-xs text-slate-400">Category: <strong className="text-slate-200">{docData.type}</strong> • Version: v{docData.version} • Author: {docData.author}</p>
          </div>
          <Link href="/workspace/documents">
            <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors bg-slate-900 border border-slate-800 hover:border-slate-700 px-3 py-1.5 rounded-lg font-semibold">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Documents Directory</span>
            </button>
          </Link>
        </div>

        {/* Tab Links Row */}
        <div className="flex border-b border-slate-800 overflow-x-auto gap-2">
          {tabs.map((tab) => {
            const isSelected = pathname.endsWith(`/workspace/documents/${id}/${tab.path}`) || (tab.path === "overview" && pathname.endsWith(`/workspace/documents/${id}`));
            return (
              <Link
                key={tab.path}
                href={`/workspace/documents/${id}/${tab.path}`}
                className={`px-4 py-2 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors ${
                  isSelected ? "border-indigo-500 text-indigo-400 bg-indigo-500/5 font-bold" : "border-transparent text-slate-400 hover:text-white"
                }`}
              >
                {tab.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Tab Panels Contents */}
      <div className="bg-slate-900/30 border border-slate-800/80 rounded-xl p-5 md:p-6 min-h-[300px]">
        {children}
      </div>
    </div>
  );
}
