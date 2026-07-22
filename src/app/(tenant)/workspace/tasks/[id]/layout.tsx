"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Breadcrumb } from "@/components/ui";
import { MOCK_TASKS } from "@/mocks/tasks";
import { SquareCheck as CheckSquare, ArrowLeft, BookOpen, X } from "lucide-react";

export default function TaskDetailsLayout({ children, params }: { children: React.ReactNode; params: Promise<{ id: string }> }) {
  const { id } = React.use(params) as { id: string };
  const pathname = usePathname();
  const [showDeveloperGuide, setShowDeveloperGuide] = useState(false);

  const taskData = MOCK_TASKS.find((t) => t.id === id);

  if (!taskData) {
    return (
      <div className="p-8 text-center text-xs text-red-400">
        Error: Task registry ID "{id}" does not exist in active database.
      </div>
    );
  }

  const tabs = [
    { name: "Overview", path: "overview" },
    { name: "Activity", path: "activity" },
    { name: "Comments", path: "comments" },
    { name: "Attachments", path: "attachments" },
    { name: "History", path: "history" },
    { name: "AI Panel", path: "ai" }
  ];

  return (
    <div className="space-y-6">
      {/* Header Info Panel */}
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Tasks", href: "/workspace/tasks" }, { name: taskData.title }]} />
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">{taskData.title}</h1>
            </div>
            <p className="text-xs text-slate-400">Priority: <strong className="text-slate-200">{taskData.priority}</strong> • Status: {taskData.status} • Due Date: {taskData.dueDate}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDeveloperGuide(true)}
              className="flex items-center gap-1.5 text-xs text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 px-3 py-1.5 rounded-lg font-semibold transition-colors"
            >
              <BookOpen className="h-4 w-4" />
              <span>Developer Guide</span>
            </button>
            <Link href="/workspace/tasks">
              <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors bg-slate-900 border border-slate-800 hover:border-slate-700 px-3 py-1.5 rounded-lg font-semibold">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Tasks List</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Tab Links Row */}
        <div className="flex border-b border-slate-800 overflow-x-auto gap-2">
          {tabs.map((tab) => {
            const matchesSelected = pathname.endsWith(`/workspace/tasks/${id}/${tab.path}`) || (tab.path === "overview" && pathname.endsWith(`/workspace/tasks/${id}`));
            return (
              <Link
                key={tab.path}
                href={`/workspace/tasks/${id}/${tab.path}`}
                className={`px-4 py-2 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors ${
                  matchesSelected ? "border-blue-500 text-blue-400 bg-blue-500/5 font-bold" : "border-transparent text-slate-400 hover:text-white"
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

      {/* Developer Guide Modal */}
      {showDeveloperGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
          <div className="w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 sticky top-0 bg-slate-900 z-10">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-cyan-400">Senior Advocate & Judicial Guidance</p>
                <h2 className="text-lg font-bold text-white">Task Detail Workspace — Developer Guide ({taskData.title})</h2>
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
                      This is the dedicated 360-degree Task Detail Workspace Hub for a specific action item (ID: <code className="text-cyan-400">{id}</code>). It provides 6 sub-tabs to manage task progress, team comments, draft attachments, revision history, and AI assistance.
                    </p>
                  </div>
                  <div className="border-t border-slate-800/80 pt-2">
                    <strong className="text-white text-sm block mb-1">Why it is needed (Advocate's Perspective):</strong>
                    <p className="text-slate-400">
                      Attorneys working on a case task need a collaborative environment to share draft petitions, log review feedback, attach research notes, and track revision history before filing.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 2: Beginner Legal Glossary for Developers (Zero Legal Knowledge Required) */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  2. Task Management Concepts Explained for Software Engineers
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-3 leading-relaxed">
                  <p className="text-slate-300">
                    If you are a software developer with zero background in Indian legal systems, here are the essential terms:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-300">
                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">1. Team Discussion Thread</strong>
                      <p className="text-slate-400 text-[11px]">
                        Internal comments between senior partners, associate advocates, and paralegals regarding legal research findings and draft edits.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">2. Task Brief Attachments</strong>
                      <p className="text-slate-400 text-[11px]">
                        Draft petition files, supporting case authorities, and evidence scans attached directly to the task card.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">3. Revision History Trail</strong>
                      <p className="text-slate-400 text-[11px]">
                        Historical audit trail tracking when task due dates were updated, priority changed, or assignees reassigned.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">4. AI Task Copilot</strong>
                      <p className="text-slate-400 text-[11px]">
                        AI tool that automatically generates outline bullet points for the assigned task or summarizes attached draft files.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 3: 6 Sub-Tabs Breakdown */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  3. Complete Task Workspace Sub-Tabs Breakdown (6 Sub-Tabs)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white">1. Overview (`/overview`)</p>
                    <p className="text-slate-400">Task summary, priority badge, due date, assignee, and linked case matter details.</p>
                  </div>
                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white">2. Activity (`/activity`)</p>
                    <p className="text-slate-400">Audit log of task status updates, assignee changes, and priority escalations.</p>
                  </div>
                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white">3. Comments (`/comments`)</p>
                    <p className="text-slate-400">Collaborative internal team messaging thread for advocate discussions.</p>
                  </div>
                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white">4. Attachments (`/attachments`)</p>
                    <p className="text-slate-400">Attached draft documents, research papers, and court order copies.</p>
                  </div>
                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white">5. History (`/history`)</p>
                    <p className="text-slate-400">Full historical log of task edits, completed milestones, and sign-offs.</p>
                  </div>
                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white">6. AI Panel (`/ai`)</p>
                    <p className="text-slate-400">AI Legal Copilot for drafting task execution steps and checking legal compliance.</p>
                  </div>
                </div>
              </section>

              {/* Section 4: Backend API Checklist */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  4. Backend Developer API Checklist
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-2">
                  <ul className="space-y-1 text-slate-300">
                    <li>• <strong className="text-white">Get Task Profile:</strong> <code className="text-blue-400">GET /api/tasks/[id]</code></li>
                    <li>• <strong className="text-white">Get Task Comments:</strong> <code className="text-blue-400">GET /api/tasks/[id]/comments</code></li>
                    <li>• <strong className="text-white">Get Task Attachments:</strong> <code className="text-blue-400">GET /api/tasks/[id]/attachments</code></li>
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

