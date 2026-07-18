"use client";

import React, { useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { Breadcrumb, Button, Badge } from "@/components/ui";
import { DataTable } from "@/components/tables";
import { Input, Select } from "@/components/forms";
import { MOCK_TASKS } from "@/mocks/tasks";
import { CheckSquare, Plus, Download, Kanban } from "lucide-react";
import Link from "next/link";

export default function TasksListPage() {
  const { addToast } = useNotifications();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTasks = MOCK_TASKS.filter((t) => t.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Tasks" }]} />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-blue-500" />
            <span>Tasks Workspace</span>
          </h1>
          <p className="text-xs text-slate-400">Track and allocate attorney dockets action items.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/workspace/tasks/board">
            <Button variant="secondary" leftIcon={<Kanban className="w-4 h-4" />}>
              Kanban Board
            </Button>
          </Link>
          <Button
            variant="secondary"
            leftIcon={<Download className="w-4 h-4" />}
            onClick={() => addToast("Export Tasks", "Tasks spreadsheet CSV exported.", "success")}
          >
            Export CSV
          </Button>
          <Link href="/workspace/tasks/new">
            <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
              New Task Item
            </Button>
          </Link>
        </div>
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
    </div>
  );
}
