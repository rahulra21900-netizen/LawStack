"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Breadcrumb } from "@/components/ui";
import { MOCK_CASES } from "@/mocks/cases";
import { Briefcase, ArrowLeft } from "lucide-react";

export default function MatterDetailsLayout({ children, params }: { children: React.ReactNode; params: Promise<{ id: string }> }) {
  const { id } = React.use(params) as { id: string };
  const pathname = usePathname();

  const caseData = MOCK_CASES.find((c) => c.id === id);

  if (!caseData) {
    return (
      <div className="p-8 text-center text-xs text-red-400">
        Error: Case Matter ID "{id}" does not exist in registry database.
      </div>
    );
  }

  const tabs = [
    { name: "Overview", path: "overview" },
    { name: "Timeline", path: "timeline" },
    { name: "Tasks", path: "tasks" },
    { name: "Documents", path: "documents" },
    { name: "Hearings", path: "hearings" },
    { name: "Billing", path: "billing" },
    { name: "Team", path: "team" },
    { name: "Activity", path: "activity" },
    { name: "AI Panel", path: "ai" },
    { name: "Notes", path: "notes" }
  ];

  return (
    <div className="space-y-6">
      {/* Header Info Panel */}
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Cases", href: "/workspace/cases" }, { name: caseData.title }]} />
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">{caseData.title}</h1>
            </div>
            <p className="text-xs text-slate-400">Case Number: <strong className="font-mono text-slate-200">{caseData.caseNumber}</strong> • Lead: {caseData.leadCounsel}</p>
          </div>
          <Link href="/workspace/cases">
            <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors bg-slate-900 border border-slate-800 hover:border-slate-700 px-3 py-1.5 rounded-lg font-semibold">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Matters List</span>
            </button>
          </Link>
        </div>

        {/* Tab Links Row */}
        <div className="flex border-b border-slate-800 overflow-x-auto gap-2">
          {tabs.map((tab) => {
            const isSelected = pathname.endsWith(`/workspace/cases/${id}/${tab.path}`) || (tab.path === "overview" && pathname.endsWith(`/workspace/cases/${id}`));
            return (
              <Link
                key={tab.path}
                href={`/workspace/cases/${id}/${tab.path}`}
                className={`px-4 py-2 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors ${
                  isSelected ? "border-blue-500 text-blue-400 bg-blue-500/5 font-bold" : "border-transparent text-slate-400 hover:text-white"
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
