"use client";

import React from "react";
import { Breadcrumb, Badge } from "@/components/ui";
import { MetricCard, Card } from "@/components/cards";
import { BookOpen } from "lucide-react";
import Link from "next/link";

export default function KnowledgeDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Knowledge Base" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-500" />
          <span>Knowledge Center Dashboard</span>
        </h1>
        <p className="text-xs text-slate-400">Access court filing rules guides, precedents dockets, and research articles.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard title="Total Precedents Articles" value="12 Guides" info="Chandra & Associates precedents library" />
        <MetricCard title="Pinned Articles" value="3 Saved" info="Quick references" />
        <MetricCard title="Recent Searches" value="Delhi HC Original Side Rules" info="Filing timelines details" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card header={<div className="font-bold text-white text-xs">Categories Overview</div>}>
          <div className="space-y-2 text-xs">
            <Link href="/workspace/knowledge-base/categories" className="flex justify-between p-2 hover:bg-slate-850 rounded border border-slate-850">
              <span className="text-white font-semibold">Litigation Procedures Rules</span>
              <span className="text-slate-500">6 Articles</span>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
