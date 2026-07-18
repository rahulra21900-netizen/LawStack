"use client";

import React from "react";
import { Breadcrumb, Badge } from "@/components/ui";
import { Card, MetricCard } from "@/components/cards";
import { Bell, FileText, DollarSign, Scale, CircleCheck as CheckCircle2, TriangleAlert as AlertTriangle } from "lucide-react";

const notifications = [
  { id: "n1", title: "Motion for Summary Judgment filed", desc: "Stark Industries vs. Advanced Tech Corp", time: "2 days ago", type: "filing", read: false },
  { id: "n2", title: "Invoice INV-2026-014 is due", desc: "Amount: $2,450.00 · Due Aug 1, 2026", time: "3 days ago", type: "billing", read: false },
  { id: "n3", title: "Discovery documents shared with you", desc: "4 files uploaded by Harvey Specter", time: "5 days ago", type: "document", read: true },
  { id: "n4", title: "Hearing scheduled for next month", desc: "Superior Court · Room 4B · Sep 12, 2026", time: "1 week ago", type: "hearing", read: true },
  { id: "n5", title: "Invoice INV-2026-012 paid successfully", desc: "Amount: $3,200.00 · Thank you", time: "2 weeks ago", type: "billing", read: true },
];

const typeMeta: Record<string, { color: string; icon: React.ComponentType<{ className?: string }> }> = {
  filing: { color: "text-blue-400", icon: FileText },
  billing: { color: "text-emerald-400", icon: DollarSign },
  document: { color: "text-indigo-400", icon: FileText },
  hearing: { color: "text-amber-400", icon: Scale },
};

export default function ClientNotificationsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Portal", href: "/client/dashboard" }, { name: "Notifications" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/15 border border-indigo-500/30">
            <Bell className="w-4 h-4 text-indigo-400" />
          </span>
          <span>Notifications Center</span>
        </h1>
        <p className="text-xs text-slate-400">Updates regarding case deadlines, billing status, and shared documents.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Unread" value={notifications.filter((n) => !n.read).length} info="Requires attention" trend="up" />
        <MetricCard title="Read" value={notifications.filter((n) => n.read).length} info="Archived" trend="neutral" />
        <MetricCard title="Filings" value="1" info="New" trend="up" />
        <MetricCard title="Billing" value="2" info="Updates" trend="neutral" />
      </div>

      {/* Notifications list */}
      <Card
        header={
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2"><Bell className="w-4 h-4 text-indigo-400" /><span className="font-bold text-white text-xs">Recent Notifications</span></div>
            <button className="text-[10px] text-indigo-400 hover:underline">Mark all read</button>
          </div>
        }
      >
        <div className="space-y-2">
          {notifications.map((n) => {
            const meta = typeMeta[n.type];
            const Icon = meta.icon;
            return (
              <div
                key={n.id}
                className={`flex items-start gap-3 rounded-lg border p-3 transition-colors ${
                  n.read ? "border-slate-800 bg-slate-950/20" : "border-indigo-500/30 bg-indigo-600/5"
                }`}
              >
                <span className={`mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-900 border border-slate-800 ${meta.color}`}>
                  <Icon className="w-4 h-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold text-white">{n.title}</p>
                    {!n.read && <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />}
                  </div>
                  <p className="mt-0.5 text-[11px] text-slate-400">{n.desc}</p>
                  <p className="mt-1 text-[10px] text-slate-500">{n.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
