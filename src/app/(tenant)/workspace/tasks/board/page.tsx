"use client";

import React, { useState } from "react";
import { Breadcrumb, Button, Badge } from "@/components/ui";
import { MOCK_TASKS } from "@/mocks/tasks";
import { Kanban, ArrowLeft, BookOpen, X } from "lucide-react";
import Link from "next/link";

export default function KanbanBoardPage() {
  const columns = ["Pending", "In Progress", "Completed"];
  const [showDeveloperGuide, setShowDeveloperGuide] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Tasks", href: "/workspace/tasks" }, { name: "Board" }]} />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Kanban className="w-5 h-5 text-blue-500 animate-pulse" />
            <span>Tasks Kanban Board</span>
          </h1>
          <p className="text-xs text-slate-400">Visual drag-dockets interface representing active stages.</p>
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
          <Link href="/workspace/tasks">
            <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors bg-slate-900 border border-slate-800 hover:border-slate-700 px-3 py-1.5 rounded-lg font-semibold">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Tasks List</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Kanban Board Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((col) => {
          const colTasks = MOCK_TASKS.filter((t) => t.status === col || (col === "Pending" && t.status !== "Completed"));
          return (
            <div key={col} className="bg-slate-950/40 border border-slate-850 p-4.5 rounded-xl space-y-4 min-h-[400px]">
              <div className="flex justify-between items-center pb-2 border-b border-slate-900">
                <span className="font-bold text-white text-xs">{col}</span>
                <span className="text-[10px] font-bold bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">{colTasks.length}</span>
              </div>
              <div className="space-y-3">
                {colTasks.map((t) => (
                  <div key={t.id} className="bg-slate-900 border border-slate-800 p-3.5 rounded-lg space-y-2 relative group hover:border-slate-700 transition-colors">
                    <Link href={`/workspace/tasks/${t.id}`} className="font-bold text-slate-200 hover:text-blue-400 text-[11px] block truncate">
                      {t.title}
                    </Link>
                    <div className="flex justify-between items-center text-[9px]">
                      <span className="text-slate-500">Due: {t.dueDate}</span>
                      <Badge label={t.priority} variant={t.priority === "Critical" ? "error" : "warning"} className="text-[8px]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Developer Guide Modal */}
      {showDeveloperGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
          <div className="w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 sticky top-0 bg-slate-900 z-10">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-cyan-400">Senior Advocate & Judicial Guidance</p>
                <h2 className="text-lg font-bold text-white">Tasks Kanban Board — Developer Guide</h2>
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
                      The Tasks Kanban Board is a visual 3-column stage pipeline (`Pending`, `In Progress`, `Completed`) displaying law firm action items as interactive cards.
                    </p>
                  </div>
                  <div className="border-t border-slate-800/80 pt-2">
                    <strong className="text-white text-sm block mb-1">Why it is needed (Advocate's Perspective):</strong>
                    <p className="text-slate-400">
                      Managing partner attorneys need an instant visual overview of work bottlenecks (e.g. 5 tasks stuck in `Pending` review) to prevent missing court filing deadlines.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 2: Columns Breakdown */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  2. 3-Column Pipeline Breakdown
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white">1. Pending</p>
                    <p className="text-slate-400">Unassigned or unstarted drafting tasks.</p>
                  </div>
                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white">2. In Progress</p>
                    <p className="text-slate-400">Active research, drafting, or clerk filings.</p>
                  </div>
                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white">3. Completed</p>
                    <p className="text-slate-400">Finished tasks approved by Senior Partner.</p>
                  </div>
                </div>
              </section>

              {/* Section 3: Backend API Checklist */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  3. Backend Developer API Checklist
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-2">
                  <ul className="space-y-1 text-slate-300">
                    <li>• <strong className="text-white">Update Task Stage:</strong> <code className="text-blue-400">PATCH /api/tasks/[id]/status</code></li>
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

