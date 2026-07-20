"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useNotifications } from "@/hooks/useNotifications";
import { Breadcrumb, Button } from "@/components/ui";
import { Input, Select } from "@/components/forms";
import { Scale } from "lucide-react";

export default function NewHearingPage() {
  const router = useRouter();
  const { addToast } = useNotifications();
  const [step, setStep] = useState(1);

  // Wizard states
  const [judge, setJudge] = useState("");
  const [courtroom, setCourtroom] = useState("");
  const [jurisdiction, setJurisdiction] = useState("Federal");

  const handleNext = () => setStep((s) => Math.min(s + 1, 6));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1));
  const handleSubmit = () => {
    addToast("Hearing Docketed", "Court appearance slot scheduled successfully.", "success");
    router.push("/workspace/hearings");
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Hearings", href: "/workspace/hearings" }, { name: "New" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <Scale className="w-5 h-5 text-amber-500" />
          <span>Docket New Hearing Appearance</span>
        </h1>
        <p className="text-xs text-slate-400">Complete the 6-step scheduler to register court appearances.</p>
      </div>

      {/* Progress Tracker */}
      <div className="flex justify-between items-center bg-slate-900 border border-slate-800 p-4 rounded-xl text-xs text-slate-400">
        {[1, 2, 3, 4, 5, 6].map((s) => (
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
              {s === 1 ? "Info" : s === 2 ? "Matter" : s === 3 ? "Court" : s === 4 ? "Participants" : s === 5 ? "Docs" : "Review"}
            </span>
          </div>
        ))}
      </div>

      {/* Steps Content */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-4">
        {step === 1 && (
          <div className="space-y-3">
            <Input label="Presiding Judge Name" value={judge} onChange={(e) => setJudge(e.target.value)} placeholder="e.g. Hon. Justice Anil Kumar" />
            <Input label="Courtroom Room" value={courtroom} onChange={(e) => setCourtroom(e.target.value)} placeholder="e.g. Courtroom 3C" />
            <Select
              label="Jurisdiction Class"
              options={[
                { label: "Delhi High Court", value: "Federal" },
                { label: "NCLT Mumbai Court", value: "Chancery" }
              ]}
              value={jurisdiction}
              onChange={(e) => setJurisdiction(e.target.value)}
            />
          </div>
        )}

        {step > 1 && step < 6 && (
          <div className="p-4 border border-slate-800 rounded-lg text-center text-xs text-slate-400">
            Relational mappings (Matters list, Documents brief, Clerks assignments) are inherited automatically. (Simulated)
          </div>
        )}

        {step === 6 && (
          <div className="space-y-3 text-xs">
            <h3 className="font-bold text-white uppercase text-[10px] tracking-wider mb-2">Review Summary</h3>
            <div className="grid grid-cols-2 gap-4 border border-slate-800 p-4 rounded-lg bg-slate-950/20 text-slate-300">
              <div>
                <p className="text-slate-500">Judge Name</p>
                <p className="font-bold text-white mt-0.5">{judge || "Unspecified"}</p>
              </div>
              <div>
                <p className="text-slate-500">Courtroom</p>
                <p className="mt-0.5">{courtroom || "Unspecified"}</p>
              </div>
              <div>
                <p className="text-slate-500">Jurisdiction</p>
                <p className="mt-0.5">{jurisdiction}</p>
              </div>
            </div>
          </div>
        )}

        {/* Wizard Controls */}
        <div className="flex justify-between pt-4 border-t border-slate-800/80">
          <Button variant="secondary" onClick={handlePrev} disabled={step === 1}>
            Back
          </Button>
          {step === 6 ? (
            <Button variant="primary" onClick={handleSubmit}>
              Schedule Hearing
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
