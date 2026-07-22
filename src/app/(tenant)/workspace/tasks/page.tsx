"use client";

import React, { useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { Breadcrumb, Button, Badge } from "@/components/ui";
import { DataTable } from "@/components/tables";
import { Input, Select } from "@/components/forms";
import { MOCK_TASKS } from "@/mocks/tasks";
import { SquareCheck as CheckSquare, Plus, Download, Kanban, Clock, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle2, BookOpen, X } from "lucide-react";
import Link from "next/link";
import { MetricCard } from "@/components/cards";

export default function TasksListPage() {
  const { addToast } = useNotifications();
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeveloperGuide, setShowDeveloperGuide] = useState(false);

  const filteredTasks = MOCK_TASKS.filter((t) => t.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Tasks" }]} />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-600/15 border border-cyan-500/30">
              <CheckSquare className="w-4 h-4 text-cyan-400" />
            </span>
            <span>Tasks Workspace</span>
          </h1>
          <p className="text-xs text-slate-400">Track and allocate attorney dockets action items.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDeveloperGuide(true)}
            className="border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10"
            leftIcon={<BookOpen className="h-4 w-4" />}
          >
            Developer Guide
          </Button>
          <Link href="/workspace/tasks/board">
            <Button variant="secondary" size="sm" leftIcon={<Kanban className="w-4 h-4" />}>
              Kanban Board
            </Button>
          </Link>
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<Download className="w-4 h-4" />}
            onClick={() => addToast("Export Tasks", "Tasks spreadsheet CSV exported.", "success")}
          >
            Export CSV
          </Button>
          <Link href="/workspace/tasks/new">
            <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
              New Task Item
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Open Tasks" value={MOCK_TASKS.filter((t) => t.status !== "Completed").length} info="In progress" trend="up" />
        <MetricCard title="Completed" value={MOCK_TASKS.filter((t) => t.status === "Completed").length} info="Closed" trend="neutral" />
        <MetricCard title="Critical" value={MOCK_TASKS.filter((t) => t.priority === "Critical").length} info="High priority" trend="down" />
        <MetricCard title="Due This Week" value="4" info="Approaching" trend="neutral" />
      </div>

      {/* Filter Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-900 border border-slate-800 p-4 rounded-xl">
        <Input
          placeholder="Search by task title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Select
          options={[
            { label: "All Tasks Statuses", value: "all" },
            { label: "Pending", value: "Pending" },
            { label: "Completed", value: "Completed" }
          ]}
          onChange={() => {}}
        />
      </div>

      {/* Tasks Data Table */}
      <DataTable
        data={filteredTasks}
        columns={[
          {
            header: "Task Title",
            accessor: (t) => (
              <Link href={`/workspace/tasks/${t.id}`} className="font-bold text-blue-400 hover:underline">
                {t.title}
              </Link>
            )
          },
          { header: "Priority", accessor: (t) => <Badge label={t.priority} variant={t.priority === "Critical" ? "error" : "warning"} /> },
          { header: "Due Date", accessor: (t) => <span className="text-slate-300 font-semibold">{t.dueDate}</span> },
          { header: "Status", accessor: (t) => <Badge label={t.status} variant={t.status === "Completed" ? "success" : "info"} /> }
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
                <h2 className="text-lg font-bold text-white">Tasks & Workload Workspace — Developer Guide</h2>
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
                      The Tasks Workspace is the law firm's action-item management system for delegating legal research, drafting petitions, preparing witness statements, and managing court filing deadlines across team attorneys and paralegals.
                    </p>
                  </div>
                  <div className="border-t border-slate-800/80 pt-2">
                    <strong className="text-white text-sm block mb-1">Why it is needed (Senior Advocate & Judicial Officer's Perspective):</strong>
                    <p className="text-slate-400">
                      In an active litigation practice, complex court cases involve dozens of micro-tasks with non-negotiable statutory deadlines:
                      <br />
                      • **Court Filing Limitation Deadlines:** If an associate fails to draft a Written Statement within 30 days (or 120 days under Commercial Courts Act), the right to file defense is forfeited.
                      <br />
                      • **Task Allocation & Delegation:** Senior Partners need clear visibility into which associate attorney or Munshi (clerk) is responsible for drafting petitions, procuring court fee stamps, or obtaining certified copy orders.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 2: Beginner Legal Glossary for Developers (Zero Legal Knowledge Required) */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  2. Indian Law Firm Task Concepts Explained for Software Engineers
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-3 leading-relaxed">
                  <p className="text-slate-300">
                    If you are a software developer with zero background in Indian legal systems, here are the essential terms:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-300">
                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">1. Legal Brief Drafting Task</strong>
                      <p className="text-slate-400 text-[11px]">
                        Assigning an associate advocate to draft the initial petition, rejoinder affidavit, or written argument outline for Senior Partner review.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">2. Court Clerk / Munshi Task</strong>
                      <p className="text-slate-400 text-[11px]">
                        Operational tasks assigned to court clerks: procuring e-stamp papers, filing hard copy paper books at the court counter, and collecting order copy tokens.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">3. Critical Priority Alert</strong>
                      <p className="text-slate-400 text-[11px]">
                        Urgent tasks expiring in &lt;24 hours (e.g. urgent interim stay application or bail petition preparation).
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">4. Partner Sign-off Approval</strong>
                      <p className="text-slate-400 text-[11px]">
                        Task review stage where the Senior Partner verifies draft pleadings before authorizing final printing and e-filing.
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
                      1. Top Metric Cards (4 Cards)
                    </p>
                    <p className="text-slate-400">Displays counts for <strong className="text-slate-200">Open Tasks</strong>, <strong className="text-slate-200">Completed</strong>, <strong className="text-slate-200">Critical Priority</strong>, and <strong className="text-slate-200">Due This Week</strong>.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-blue-400" />
                      2. Filter & Search Bar
                    </p>
                    <p className="text-slate-400">Real-time search input for task title and dropdown filter for Task Status (<strong className="text-white">All</strong>, <strong className="text-white">Pending</strong>, <strong className="text-white">Completed</strong>).</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5 col-span-1 md:col-span-2">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-amber-400" />
                      3. Tasks Data Table
                    </p>
                    <p className="text-slate-400">Displays Task Title (clickable link navigating to <code className="text-blue-400">/workspace/tasks/[id]</code>), Priority badge (<span className="text-red-400 font-bold">Critical</span> / <span className="text-amber-400 font-bold">Medium</span>), Due Date, and Status badge.</p>
                  </div>
                </div>
              </section>

              {/* Section 4: Navigation & Button Actions Map */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  4. Button Actions & Navigation Links
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                        <th className="pb-2">UI Action</th>
                        <th className="pb-2">Behavior</th>
                        <th className="pb-2">Target Route</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300">
                      <tr>
                        <td className="py-2 font-semibold text-white">Kanban Board Button</td>
                        <td className="py-2">Opens visual drag-and-drop stages board</td>
                        <td className="py-2 font-mono text-blue-400">/workspace/tasks/board</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold text-white">New Task Item Button</td>
                        <td className="py-2">Opens 4-step task allocation wizard</td>
                        <td className="py-2 font-mono text-blue-400">/workspace/tasks/new</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold text-white">Clicking Task Title Link</td>
                        <td className="py-2">Opens full 6-tab Task Detail Workspace Hub</td>
                        <td className="py-2 font-mono text-blue-400">/workspace/tasks/[id]</td>
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
                    <li>• <strong className="text-white">List Tasks API:</strong> <code className="text-blue-400">GET /api/tasks?search=&status=&priority=</code></li>
                    <li>• <strong className="text-white">Create Task API:</strong> <code className="text-blue-400">POST /api/tasks</code></li>
                    <li>• <strong className="text-white">Get Task Details:</strong> <code className="text-blue-400">GET /api/tasks/[id]</code></li>
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

