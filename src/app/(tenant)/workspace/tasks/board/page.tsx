"use client";

import React from "react";
import { Breadcrumb, Button, Badge } from "@/components/ui";
import { MOCK_TASKS } from "@/mocks/tasks";
import { Kanban, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function KanbanBoardPage() {
  const columns = ["Pending", "In Progress", "Completed"];

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
        <Link href="/workspace/tasks">
          <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors bg-slate-900 border border-slate-800 hover:border-slate-700 px-3 py-1.5 rounded-lg font-semibold">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Tasks List</span>
          </button>
        </Link>
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
    </div>
  );
}
