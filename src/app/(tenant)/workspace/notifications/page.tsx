"use client";

import React, { useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { Breadcrumb, Button, Badge } from "@/components/ui";
import { DataTable } from "@/components/tables";
import { Bell, Check, BellOff, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle2, BookOpen, X } from "lucide-react";
import { MetricCard } from "@/components/cards";

export default function NotificationsPage() {
  const { notifications, markAsRead, clearAll, addToast } = useNotifications();
  const [showDeveloperGuide, setShowDeveloperGuide] = useState(false);

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
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDeveloperGuide(true)}
            className="border-blue-500/40 text-blue-300 hover:bg-blue-500/10"
            leftIcon={<BookOpen className="h-4 w-4" />}
          >
            Developer Guide
          </Button>
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<Check className="w-4 h-4" />}
            onClick={() => {
              clearAll();
              addToast("Clear Notifications", "Marked all alert items read.", "success");
            }}
          >
            Mark All Read
          </Button>
        </div>
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

      {/* Developer Guide Modal */}
      {showDeveloperGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
          <div className="w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 sticky top-0 bg-slate-900 z-10">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-blue-400">Senior Advocate & Judicial Guidance</p>
                <h2 className="text-lg font-bold text-white">Notifications Center — Developer Guide</h2>
              </div>
              <button
                onClick={() => setShowDeveloperGuide(false)}
                className="rounded-lg border border-slate-700 p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
                aria-label="Close developer guide modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-6 p-6 text-sm text-slate-300">
              {/* Mandatory Section 1: What it is & Why it is needed */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  1. Core Purpose & Mandatory Overview
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs leading-relaxed space-y-3">
                  <div>
                    <strong className="text-white text-sm block mb-1">What it is:</strong>
                    <p className="text-slate-300">
                      The Notifications Center is the real-time alert dispatch hub warning advocates of urgent court hearing clashes, statutory limitation deadlines, certified order copy availability, and client retainer updates.
                    </p>
                  </div>
                  <div className="border-t border-slate-800/80 pt-2">
                    <strong className="text-white text-sm block mb-1">Why it is needed (Senior Advocate & Judicial Officer's Perspective):</strong>
                    <p className="text-slate-400">
                      In Indian court practice, timing is critical:
                      <br />
                      • <strong>Court Schedule Clashes & Pass-overs:</strong> Senior Counsel handle multiple hearings in different courtrooms concurrently. Real-time notifications alert advocates when item numbers are called in another hall, allowing court clerks to request pass-overs.
                      <br />
                      • <strong>Limitation Expiry Warnings:</strong> Statutory limitation deadlines under the Limitation Act 1963 are strictly enforced. Critical alerts ensure advocates file replies before statutory windows lapse.
                      <br />
                      • <strong>Certified Order Copies & Retainers:</strong> Notifies lawyers as soon as eCourts uploads daily orders or when client retainer accounts require replenishment.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 2: Beginner Legal Glossary for Developers (Zero Legal Knowledge Required) */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  2. Indian Court Notification Concepts Explained for Software Engineers
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-3 leading-relaxed">
                  <p className="text-slate-300">
                    If you are a software developer with zero background in Indian court procedure, here are the key terms:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-300">
                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">1. Emergency Pass-over Alert</strong>
                      <p className="text-slate-400 text-[11px]">
                        High-priority notification triggered when an advocate's matter item number is called in court while they are present in another bench.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">2. Limitation Statutory Countdown</strong>
                      <p className="text-slate-400 text-[11px]">
                        System alert calculating remaining days before court filing statutory deadlines expire under Limitation Act 1963.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">3. Order Sheet Download Alert</strong>
                      <p className="text-slate-400 text-[11px]">
                        Notification dispatched when eCourts publishes a signed daily order copy for a monitored CNR matter.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">4. Retainer Threshold Alert</strong>
                      <p className="text-slate-400 text-[11px]">
                        Warning trigger when client advance funds fall below minimum operational balance.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 3: Component Breakdown */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  3. Complete Component & Feature Breakdown
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-blue-400" />
                      1. Metric Cards (4 Cards)
                    </p>
                    <p className="text-slate-400">Displays counts for <strong className="text-slate-200">Unread Alerts</strong>, <strong className="text-slate-200">Read Alerts</strong>, <strong className="text-slate-200">Critical High-Priority</strong>, and <strong className="text-slate-200">New Today</strong>.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      2. Mark All Read Button
                    </p>
                    <p className="text-slate-400">Batch action button marking all unread notification items read in 1 click.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5 col-span-1 md:col-span-2">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-purple-400" />
                      3. Alert Logs Data Table
                    </p>
                    <p className="text-slate-400">DataTable displaying Alert Title, Message Content, Category Badge (Case, Billing, System), Status Badge (Read/Unread), and Mark Read Action Button.</p>
                  </div>
                </div>
              </section>

              {/* Section 4: Navigation & Button Actions Map */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  4. Button Actions & Interactive Controls Navigation Map
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                        <th className="pb-2">UI Action</th>
                        <th className="pb-2">Behavior</th>
                        <th className="pb-2">Target Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300">
                      <tr>
                        <td className="py-2 font-semibold text-white">Mark All Read Button</td>
                        <td className="py-2">Updates all notification records to read status</td>
                        <td className="py-2 font-mono text-blue-400">Batch State Update</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold text-white">Mark Read Button (Row)</td>
                        <td className="py-2">Updates single alert item to read status</td>
                        <td className="py-2 font-mono text-emerald-400">Single State Update</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Section 5: Backend API Checklist */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  5. Backend Developer API Checklist
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-2">
                  <ul className="space-y-1.5 text-slate-300">
                    <li>• <strong className="text-white">List Notifications:</strong> <code className="text-blue-400">GET /api/notifications</code></li>
                    <li>• <strong className="text-white">Mark Notification Read:</strong> <code className="text-blue-400">PATCH /api/notifications/[id]</code></li>
                    <li>• <strong className="text-white">Mark All Read API:</strong> <code className="text-blue-400">POST /api/notifications/read-all</code></li>
                  </ul>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

