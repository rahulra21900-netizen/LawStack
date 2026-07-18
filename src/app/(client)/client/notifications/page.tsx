"use client";

import React from "react";
import { Breadcrumb, Badge } from "@/components/ui";
import { DataTable } from "@/components/tables";

export default function ClientNotificationsPage() {
  const notifications = [
    { title: "Invoice INV-2026-0098 paid successfully.", date: "2 days ago" }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Portal", href: "/client/dashboard" }, { name: "Notifications" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Notifications Center</h1>
        <p className="text-xs text-slate-400">Updates regarding case deadlines, billing status, and documents.</p>
      </div>

      <DataTable
        data={notifications}
        columns={[
          { header: "Notification Brief", accessor: (n) => <span className="font-bold text-white">{n.title}</span> },
          { header: "Received Date", accessor: (n) => <span className="text-slate-400">{n.date}</span> }
        ]}
      />
    </div>
  );
}
