"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Breadcrumb } from "@/components/ui";
import { MOCK_HEARINGS } from "@/mocks/hearings";
import { Scale, ArrowLeft } from "lucide-react";

export default function HearingDetailsLayout({ children, params }: { children: React.ReactNode; params: Promise<{ id: string }> }) {
  const { id } = React.use(params) as { id: string };
  const pathname = usePathname();

  const hearingData = MOCK_HEARINGS.find((h) => h.id === id);

  if (!hearingData) {
    return (
      <div className="p-8 text-center text-xs text-red-400">
        Error: Hearing registry ID "{id}" does not exist in court calendar.
      </div>
    );
  }

  const tabs = [
    { name: "Overview", path: "overview" },
    { name: "Participants", path: "participants" },
    { name: "Documents", path: "documents" },
    { name: "Hearing Timeline", path: "timeline" },
    { name: "Activity Trail", path: "activity" },
    { name: "AI Panel", path: "ai" }
  ];

  return (
    <div className="space-y-6">
      {/* Header Info Panel */}
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Hearings", href: "/workspace/hearings" }, { name: hearingData.judgeName }]} />
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Hearing: {hearingData.judgeName}</h1>
            </div>
            <p className="text-xs text-slate-400">Venue: <strong className="text-slate-200">{hearingData.location}</strong> • Courtroom: {hearingData.courtroom} • Time: {new Date(hearingData.dateTime).toLocaleString()}</p>
          </div>
          <Link href="/workspace/hearings">
            <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors bg-slate-900 border border-slate-800 hover:border-slate-700 px-3 py-1.5 rounded-lg font-semibold">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Hearings List</span>
            </button>
          </Link>
        </div>

        {/* Tab Links Row */}
        <div className="flex border-b border-slate-800 overflow-x-auto gap-2">
          {tabs.map((tab) => {
            const isSelected = pathname.endsWith(`/workspace/hearings/${id}/${tab.path}`) || (tab.path === "overview" && pathname.endsWith(`/workspace/hearings/${id}`));
            return (
              <Link
                key={tab.path}
                href={`/workspace/hearings/${id}/${tab.path}`}
                className={`px-4 py-2 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors ${
                  isSelected ? "border-amber-500 text-amber-400 bg-amber-500/5 font-bold" : "border-transparent text-slate-400 hover:text-white"
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
