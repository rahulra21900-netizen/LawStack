"use client";

import React from "react";
import { Card, MetricCard } from "@/components/cards";
import { MOCK_TASKS } from "@/mocks/tasks";

export default function OverviewTab({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params) as { id: string };
  const taskData = MOCK_TASKS.find((t) => t.id === id);

  if (!taskData) return null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard title="Priority" value={taskData.priority} info="Priority levels" />
        <MetricCard title="Task status" value={taskData.status} info="Progress logs" />
        <MetricCard title="Due Date" value={taskData.dueDate} info="Deadline reminder" />
      </div>
    </div>
  );
}
