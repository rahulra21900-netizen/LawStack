"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useNotifications } from "@/hooks/useNotifications";
import { Breadcrumb, Button } from "@/components/ui";
import { Input, Select } from "@/components/forms";
import { CheckSquare } from "lucide-react";

export default function NewTaskPage() {
  const router = useRouter();
  const { addToast } = useNotifications();
  const [step, setStep] = useState(1);

  // Wizard state values
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  const handleNext = () => setStep((s) => Math.min(s + 1, 4));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1));
  const handleSubmit = () => {
    addToast("Task Scheduled", "Simulated action task allocated successfully.", "success");
    router.push("/workspace/tasks");
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Tasks", href: "/workspace/tasks" }, { name: "New" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <CheckSquare className="w-5 h-5 text-blue-500" />
          <span>Allocate Action Task</span>
        </h1>
        <p className="text-xs text-slate-400">Complete the 4-step wizard to assign tasks.</p>
      </div>

      {/* Progress Tracker */}
      <div className="flex justify-between items-center bg-slate-900 border border-slate-800 p-4 rounded-xl text-xs text-slate-400">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center gap-1.5">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${
              step === s
                ? "bg-blue-600 text-white"
                : step > s
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                : "bg-slate-800 text-slate-500"
            }`}>
              {s}
            </span>
            <span className={step === s ? "font-bold text-white" : ""}>
              {s === 1 ? "Details" : s === 2 ? "Assign" : s === 3 ? "Dates" : "Review"}
            </span>
          </div>
        ))}
      </div>

      {/* Steps Content */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-4">
        {step === 1 && (
          <div className="space-y-3">
            <Input label="Task Title / Action Brief" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Draft defense reply brief..." />
            <Select
              label="Priority Level"
              options={[
                { label: "Critical Priority", value: "Critical" },
                { label: "Medium Priority", value: "Medium" }
              ]}
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            />
          </div>
        )}

        {step > 1 && step < 4 && (
          <div className="p-4 border border-slate-800 rounded-lg text-center text-xs text-slate-400">
            Relational mappings (Case matters link, Associate attorney, Due date alerts) are mapped automatically. (Simulated)
          </div>
        )}

        {step === 4 && (
          <div className="space-y-3 text-xs">
            <h3 className="font-bold text-white uppercase text-[10px] tracking-wider mb-2">Review Summary</h3>
            <div className="grid grid-cols-2 gap-4 border border-slate-800 p-4 rounded-lg bg-slate-950/20 text-slate-300">
              <div>
                <p className="text-slate-500">Task Title</p>
                <p className="font-bold text-white mt-0.5">{title || "Unspecified"}</p>
              </div>
              <div>
                <p className="text-slate-500">Priority</p>
                <p className="mt-0.5">{priority}</p>
              </div>
            </div>
          </div>
        )}

        {/* Wizard Controls */}
        <div className="flex justify-between pt-4 border-t border-slate-800/80">
          <Button variant="secondary" onClick={handlePrev} disabled={step === 1}>
            Back
          </Button>
          {step === 4 ? (
            <Button variant="primary" onClick={handleSubmit}>
              Assign Task
            </Button>
          ) : (
            <Button variant="primary" onClick={handleNext}>
              Next Step
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
