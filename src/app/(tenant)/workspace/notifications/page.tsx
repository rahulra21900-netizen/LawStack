"use client";

import React from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { Breadcrumb, Button, Badge } from "@/components/ui";
import { DataTable } from "@/components/tables";
import { Bell, Check, BellOff, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle2 } from "lucide-react";
import { MetricCard } from "@/components/cards";

export default function NotificationsPage() {
  const { notifications, markAsRead, clearAll, addToast } = useNotifications();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Notifications" }]} />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/15 border border-blue-500/30">
              <Bell className="w-4 h-4 text-blue-400" />
            </span>
            <span>My Notifications Center</span>
          </h1>
          <p className="text-xs text-slate-400">Manage case alert logs, system upgrades, and invoice alerts.</p>
        </div>
        <Button
          variant="secondary"
          leftIcon={<Check className="w-4 h-4" />}
          onClick={() => {
            clearAll();
            addToast("Clear Notifications", "Marked all alert items read.", "success");
          }}
        >
          Mark All Read
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Unread" value={notifications.filter((n) => !n.read).length} info="Requires attention" trend="up" />
        <MetricCard title="Read" value={notifications.filter((n) => n.read).length} info="Archived" trend="neutral" />
        <MetricCard title="Critical" value="1" info="High priority" trend="down" />
        <MetricCard title="Today" value="3" info="New today" trend="up" />
      </div>

      <DataTable
        title="Alert Logs"
        data={notifications}
        columns={[
          { header: "Title", accessor: (n) => <span className="font-bold text-white">{n.title}</span> },
          { header: "Message Content", accessor: (n) => <p className="text-slate-400">{n.message}</p> },
          { header: "Category", accessor: (n) => <Badge label={n.type} variant="info" /> },
          { header: "Status", accessor: (n) => <Badge label={n.read ? "Read" : "Unread"} variant={n.read ? "neutral" : "warning"} /> },
          {
            header: "Actions",
            accessor: (n) => (
              !n.read ? (
                <button
                  onClick={() => {
                    markAsRead(n.id);
                    addToast("Marked Read", "Alert item marked read.");
                  }}
                  className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded text-[10px] font-bold"
                >
                  Mark Read
                </button>
              ) : (
                <span className="text-[10px] text-slate-500">No action</span>
              )
            )
          }
        ]}
      />
    </div>
  );
}
