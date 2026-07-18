"use client";

import React from "react";
import { MOCK_TASKS } from "@/mocks/tasks";
import { DataTable } from "@/components/tables";
import { Badge } from "@/components/ui";

export default function TasksTab({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params) as { id: string };
  const caseTasks = MOCK_TASKS.filter((t) => t.caseId === id);

  return (
    <div className="space-y-6">
      <DataTable
        title="Tasks Allocated to Matter"
        data={caseTasks}
        columns={[
          { header: "Task name", accessor: (t) => <span className="font-bold text-white">{t.title}</span> },
          { header: "Priority", accessor: (t) => <Badge label={t.priority} variant={t.priority === "Critical" ? "error" : "warning"} /> },
          { header: "Due Date", accessor: (t) => <span className="text-slate-300 font-semibold">{t.dueDate}</span> },
          { header: "Status", accessor: (t) => <Badge label={t.status} variant={t.status === "Completed" ? "success" : "info"} /> }
        ]}
      />
    </div>
  );
}
