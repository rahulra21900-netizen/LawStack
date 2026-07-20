"use client";

import React from "react";
import { Breadcrumb, Badge } from "@/components/ui";
import { MetricCard, Card } from "@/components/cards";
import { FileCode } from "lucide-react";
import Link from "next/link";

export default function TemplatesDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Templates" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <FileCode className="w-5 h-5 text-indigo-400" />
          <span>Templates Catalog Dashboard</span>
        </h1>
        <p className="text-xs text-slate-400">Access pre-approved contract templates, engagement letters, and filings.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard title="Total Templates" value="6 Schemas" info="Chandra & Associates approved catalog" />
        <MetricCard title="Contract Templates" value="2 Active" info="NDA / Sublicensing schemas" />
        <MetricCard title="Court Filings" value="2 Active" info="Briefs outline schemas" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card header={<div className="font-bold text-white text-xs">Categories Overview</div>}>
          <div className="space-y-2 text-xs">
            <Link href="/workspace/templates/contracts" className="flex justify-between p-2 hover:bg-slate-850 rounded border border-slate-850">
              <span className="text-white font-semibold">Contract Templates</span>
              <span className="text-slate-500">2 schemas</span>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
