"use client";

import React, { useState } from "react";
import { Breadcrumb, Badge, Button } from "@/components/ui";
import { DataTable } from "@/components/tables";
import { MOCK_ACTIVITIES } from "@/mocks/activity";
import { Activity, Clock, Users, FileText, Shield, BookOpen, X } from "lucide-react";
import { MetricCard } from "@/components/cards";

export default function ActivityPage() {
  const [showDeveloperGuide, setShowDeveloperGuide] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Activity" }]} />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-600/15 border border-cyan-500/30">
              <Activity className="w-4 h-4 text-cyan-400" />
            </span>
            <span>Active Audit Trails</span>
          </h1>
          <p className="text-xs text-slate-400">View real-time compliance logs, document dockets modifications, and access reviews.</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowDeveloperGuide(true)}
          className="border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10"
          leftIcon={<BookOpen className="h-4 w-4" />}
        >
          Developer Guide
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Events (24h)" value={MOCK_ACTIVITIES.length} info="Logged" trend="up" />
        <MetricCard title="Document Edits" value="2" info="Tracked" trend="neutral" />
        <MetricCard title="User Actions" value="4" info="Recorded" trend="up" />
        <MetricCard title="Security" value="0" info="No alerts" trend="neutral" />
      </div>

      <DataTable
        title="Audit Logs Trail"
        data={MOCK_ACTIVITIES}
        columns={[
          { header: "Activity Action", accessor: (a) => <span className="font-bold text-white">{a.action}</span> },
          { header: "Triggered By", accessor: (a) => <span className="text-slate-300 font-semibold">{a.userName}</span> },
          { header: "Entity Target", accessor: (a) => <Badge label={a.entityType} variant="info" /> },
          { header: "Details Summary", accessor: (a) => <p className="text-slate-400 max-w-sm truncate">{a.details}</p> },
          { header: "Timestamp", accessor: (a) => <span className="text-[10px] text-slate-500 font-mono">{new Date(a.createdAt).toLocaleString()}</span> }
        ]}
      />

      {/* Developer Guide Modal */}
      {showDeveloperGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
          <div className="w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 sticky top-0 bg-slate-900 z-10">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-cyan-400">Senior Advocate & Judicial Guidance</p>
                <h2 className="text-lg font-bold text-white">Active Audit Trails — Developer Guide</h2>
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
                <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  1. Core Purpose & Mandatory Overview
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs leading-relaxed space-y-3">
                  <div>
                    <strong className="text-white text-sm block mb-1">What it is:</strong>
                    <p className="text-slate-300">
                      The Active Audit Trails module is the immutable security and compliance ledger tracking every user action, document modification, case status edit, and data access event across LawStack.
                    </p>
                  </div>
                  <div className="border-t border-slate-800/80 pt-2">
                    <strong className="text-white text-sm block mb-1">Why it is needed (Senior Advocate & Judicial Officer's Perspective):</strong>
                    <p className="text-slate-400">
                      Law practices handle privileged court documents and confidential client data:
                      <br />
                      • <strong>Section 132 BSA 2023 Evidentiary Privilege:</strong> Under Section 132 of Bharatiya Sakshya Adhiniyam, 2023, advocate-client communications are legally privileged. Immutable audit logs verify that access to sensitive case files was strictly limited to authorized lawyers.
                      <br />
                      • <strong>DPDP Act 2023 Compliance:</strong> Tracks access to individual and corporate client personal data to comply with mandatory data protection audit requirements in India.
                      <br />
                      • <strong>Internal Law Practice Accountability:</strong> Enables managing partners to review actions taken by associate advocates, paralegals, and court clerks (Munshis).
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 2: Beginner Legal Glossary for Developers (Zero Legal Knowledge Required) */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  2. Indian Law Audit Concepts Explained for Software Engineers
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-3 leading-relaxed">
                  <p className="text-slate-300">
                    If you are a software developer with zero background in legal audit logging, here are the core concepts:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-300">
                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">1. Cryptographic Audit Trail</strong>
                      <p className="text-slate-400 text-[11px]">
                        Immutable chronological record of every data mutation, upload, or deletion event in the firm's dockets.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">2. BSA Sec 132 Privilege Verification</strong>
                      <p className="text-slate-400 text-[11px]">
                        System audit proof verifying that confidential client case records were accessed strictly by authorized advocates.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">3. Entity Mutation Tracking</strong>
                      <p className="text-slate-400 text-[11px]">
                        Detailed diff logs capturing changes made to case files, court hearing dates, or invoice ledgers.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">4. Role-Based Access Audit</strong>
                      <p className="text-slate-400 text-[11px]">
                        Audit events recording user login, IP address, and role permissions during critical operations.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 3: Component Breakdown */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  3. Complete Component & Feature Breakdown
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-cyan-400" />
                      1. Metric Cards (4 Cards)
                    </p>
                    <p className="text-slate-400">Displays counts for <strong className="text-slate-200">Events (24h)</strong>, <strong className="text-slate-200">Document Edits</strong>, <strong className="text-slate-200">User Actions</strong>, and <strong className="text-slate-200">Security Alerts</strong>.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5 border border-slate-800 col-span-1 md:col-span-2">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-purple-400" />
                      2. Audit Logs Trail Data Table
                    </p>
                    <p className="text-slate-400">DataTable displaying Activity Action, Triggered By User, Entity Target Type Badge, Details Summary, and Generation Timestamp.</p>
                  </div>
                </div>
              </section>

              {/* Section 4: Navigation & Button Actions Map */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  4. Button Actions & Interactive Controls Navigation Map
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                        <th className="pb-2">UI Action</th>
                        <th className="pb-2">Behavior</th>
                        <th className="pb-2">Target Action / Output</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300">
                      <tr>
                        <td className="py-2 font-semibold text-white">Developer Guide Button</td>
                        <td className="py-2">Opens Senior Advocate & Judicial guidance modal</td>
                        <td className="py-2 font-mono text-cyan-400">Modal Overlay</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Section 5: Backend API Checklist */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  5. Backend Developer API Checklist
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-2">
                  <ul className="space-y-1.5 text-slate-300">
                    <li>• <strong className="text-white">List Activity Audit Logs:</strong> <code className="text-blue-400">GET /api/activity</code></li>
                    <li>• <strong className="text-white">Record Event Mutation:</strong> <code className="text-blue-400">POST /api/activity/log</code></li>
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

