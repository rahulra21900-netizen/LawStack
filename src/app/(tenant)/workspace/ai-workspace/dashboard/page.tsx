"use client";

import React from "react";
import { Breadcrumb, Button, Badge } from "@/components/ui";
import { MetricCard, Card } from "@/components/cards";
import { Sparkles, MessageSquare, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AiDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "AI Workspace" }]} />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-400" />
            <span>AI Assistant Dashboard</span>
          </h1>
          <p className="text-xs text-slate-400">Manage case summarization pipelines, prompt catalogs, and specialized legal agents.</p>
        </div>
        <Link href="/workspace/ai-workspace/chat">
          <Button variant="primary" leftIcon={<Sparkles className="w-4 h-4 text-slate-950" />} className="bg-blue-400 hover:bg-blue-300 text-slate-950 font-bold">
            Launch Chat Copilot
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard title="AI Prompt tokens" value="482.5k used" info="Daily Tenant Limit: 2.0M" />
        <MetricCard title="Specialized AI Agents" value="10 Active" info="Ready to assist" />
        <MetricCard title="Automation Yield" value="24 drafts generated" change="84% time saved" trend="up" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card header={<div className="font-bold text-white text-xs">Recently Executed Workflows</div>}>
          <div className="space-y-3 text-xs text-slate-300">
            <div className="p-2.5 bg-slate-950/30 rounded border border-slate-850 flex justify-between items-center">
              <span>Generate Sublicense Contract Brief</span>
              <Badge label="Complete" variant="success" />
            </div>
            <div className="p-2.5 bg-slate-950/30 rounded border border-slate-850 flex justify-between items-center">
              <span>Extract Delaware filing limitation dates</span>
              <Badge label="Complete" variant="success" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
