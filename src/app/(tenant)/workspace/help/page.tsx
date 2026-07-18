"use client";

import React from "react";
import { Breadcrumb } from "@/components/ui";
import { Card } from "@/components/cards";
import { HelpCircle } from "lucide-react";

export default function HelpCenterPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Help Center" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-indigo-500" />
          <span>Help & Documentation</span>
        </h1>
        <p className="text-xs text-slate-400">Search FAQs, view keyboard shortcuts, and review documentation updates.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card header={<div className="font-bold text-white text-xs">Keyboard Shortcuts</div>}>
          <div className="space-y-3 text-xs text-slate-350 font-mono">
            <div className="flex justify-between border-b border-slate-850 pb-1.5">
              <span>Open global search overlay</span>
              <span className="bg-slate-800 px-2 py-0.5 rounded text-white text-[10px]">Ctrl + K</span>
            </div>
            <div className="flex justify-between border-b border-slate-850 pb-1.5">
              <span>Back to main dashboard</span>
              <span className="bg-slate-800 px-2 py-0.5 rounded text-white text-[10px]">Esc</span>
            </div>
          </div>
        </Card>

        <Card header={<div className="font-bold text-white text-xs">FAQs Quick Reference</div>}>
          <div className="space-y-3 text-xs text-slate-350">
            <p className="font-bold text-white">How do I provision a new tenant namespace?</p>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              Navigate to the SaaS Platform Control Plane and select 'Provision Tenant' to initialize database schemas and generate admin client certificates.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
