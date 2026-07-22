"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useNotifications } from "@/hooks/useNotifications";
import { Breadcrumb, Button } from "@/components/ui";
import { Input, Select } from "@/components/forms";
import { SquareCheck as CheckSquare, BookOpen, X } from "lucide-react";

export default function NewTaskPage() {
  const router = useRouter();
  const { addToast } = useNotifications();
  const [step, setStep] = useState(1);
  const [showDeveloperGuide, setShowDeveloperGuide] = useState(false);

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
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Tasks", href: "/workspace/tasks" }, { name: "New" }]} />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-blue-500" />
            <span>Allocate Action Task</span>
          </h1>
          <p className="text-xs text-slate-400">Complete the 4-step wizard to assign tasks.</p>
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

      {/* Developer Guide Modal */}
      {showDeveloperGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
          <div className="w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 sticky top-0 bg-slate-900 z-10">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-cyan-400">Senior Advocate & Judicial Guidance</p>
                <h2 className="text-lg font-bold text-white">Task Allocation Wizard — Developer Guide</h2>
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
                      The Task Allocation Wizard is a 4-step form used by senior partners to delegate legal work, assign due dates, and map case matters.
                    </p>
                  </div>
                  <div className="border-t border-slate-800/80 pt-2">
                    <strong className="text-white text-sm block mb-1">Why it is needed (Advocate's Perspective):</strong>
                    <p className="text-slate-400">
                      Assigning work requires setting clear due dates aligned with statutory court deadlines and linking the task to a specific case matter ID and assigned attorney.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 2: 4-Step Wizard Breakdown */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  2. 4-Step Wizard Breakdown
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white">Step 1: Details</p>
                    <p className="text-slate-400">Task Title / Action Brief & Priority level selection.</p>
                  </div>
                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white">Step 2: Assignee</p>
                    <p className="text-slate-400">Select Associate Advocate, Paralegal, or Munshi.</p>
                  </div>
                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white">Step 3: Dates & Alerts</p>
                    <p className="text-slate-400">Due date selection and automated reminder settings.</p>
                  </div>
                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white">Step 4: Review & Submit</p>
                    <p className="text-slate-400">Final review card before triggering `POST /api/tasks`.</p>
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
                    <li>• <strong className="text-white">Create Task API:</strong> <code className="text-blue-400">POST /api/tasks</code></li>
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

