"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Breadcrumb } from "@/components/ui";
import { MOCK_CLIENTS } from "@/mocks/clients";
import { Users, ArrowLeft } from "lucide-react";

export default function ClientDetailsLayout({ children, params }: { children: React.ReactNode; params: Promise<{ id: string }> }) {
  const { id } = React.use(params) as { id: string };
  const pathname = usePathname();

  const clientData = MOCK_CLIENTS.find((c) => c.id === id);

  if (!clientData) {
    return (
      <div className="p-8 text-center text-xs text-red-400">
        Error: Client profile ID "{id}" does not exist in directory database.
      </div>
    );
  }

  const tabs = [
    { name: "Overview", path: "overview" },
    { name: "Matters", path: "matters" },
    { name: "Documents", path: "documents" },
    { name: "Billing", path: "billing" },
    { name: "Contacts", path: "contacts" },
    { name: "Activity", path: "activity" },
    { name: "AI Panel", path: "ai" },
    { name: "Notes", path: "notes" },
    { name: "Settings", path: "settings" }
  ];

  return (
    <div className="space-y-6">
      {/* Header Info Panel */}
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Clients", href: "/workspace/clients" }, { name: clientData.name }]} />
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">{clientData.name}</h1>
            </div>
            <p className="text-xs text-slate-400">Company: <strong className="text-slate-200">{clientData.companyName || "Personal Case"}</strong> • Email: {clientData.email}</p>
          </div>
          <Link href="/workspace/clients">
            <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors bg-slate-900 border border-slate-800 hover:border-slate-700 px-3 py-1.5 rounded-lg font-semibold">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Clients List</span>
            </button>
          </Link>
        </div>

        {/* Tab Links Row */}
        <div className="flex border-b border-slate-800 overflow-x-auto gap-2">
          {tabs.map((tab) => {
            const isSelected = pathname.endsWith(`/workspace/clients/${id}/${tab.path}`) || (tab.path === "overview" && pathname.endsWith(`/workspace/clients/${id}`));
            return (
              <Link
                key={tab.path}
                href={`/workspace/clients/${id}/${tab.path}`}
                className={`px-4 py-2 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors ${
                  isSelected ? "border-emerald-500 text-emerald-400 bg-emerald-500/5 font-bold" : "border-transparent text-slate-400 hover:text-white"
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
