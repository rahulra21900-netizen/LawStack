"use client";

import React from "react";
import { Breadcrumb, Badge } from "@/components/ui";
import { Card } from "@/components/cards";
import { Sparkles } from "lucide-react";

export default function AgentsPage() {
  const agents = [
    { title: "Contract Review Agent", desc: "Reviews indemnity, liability, and dispute jurisdictions.", capabilities: "Governing laws check, clause comparisons." },
    { title: "Supreme Court Precedent Researcher", desc: "Lookup chancery court proceedings summaries.", capabilities: "Precedent cases mapping, filing deadlines audits." }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "AI Workspace", href: "/workspace/ai-workspace/dashboard" }, { name: "Agents" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-400 animate-pulse" />
          <span>Specialized AI legal Agents</span>
        </h1>
        <p className="text-xs text-slate-400">Deploy context-aware agents for billing audits, document review, or deposition checks.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {agents.map((a, idx) => (
          <Card key={idx} header={<div className="font-bold text-white text-xs">{a.title}</div>}>
            <div className="space-y-3 text-xs text-slate-350">
              <p className="leading-relaxed">{a.desc}</p>
              <p className="text-[10px] text-slate-500">Capabilities: <strong className="text-slate-400">{a.capabilities}</strong></p>
              <Badge label="Ready to assist" variant="success" className="text-[8px]" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
