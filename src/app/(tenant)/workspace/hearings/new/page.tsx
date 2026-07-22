"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useNotifications } from "@/hooks/useNotifications";
import { Breadcrumb, Button } from "@/components/ui";
import { Input, Select } from "@/components/forms";
import { Scale, BookOpen, X } from "lucide-react";

export default function NewHearingPage() {
  const router = useRouter();
  const { addToast } = useNotifications();
  const [step, setStep] = useState(1);
  const [showDeveloperGuide, setShowDeveloperGuide] = useState(false);

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
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Hearings", href: "/workspace/hearings" }, { name: "New" }]} />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Scale className="w-5 h-5 text-amber-500" />
            <span>Docket New Hearing Appearance</span>
          </h1>
          <p className="text-xs text-slate-400">Complete the 6-step scheduler to register court appearances.</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowDeveloperGuide(true)}
          className="border-amber-500/40 text-amber-300 hover:bg-amber-500/10"
          leftIcon={<BookOpen className="h-4 w-4" />}
        >
          Developer Guide
        </Button>
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

      {/* Developer Guide Modal */}
      {showDeveloperGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
          <div className="w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 sticky top-0 bg-slate-900 z-10">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-amber-400">Senior Advocate & Judicial Guidance</p>
                <h2 className="text-lg font-bold text-white">Hearing Docketing Wizard — Developer Guide</h2>
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
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  1. Core Purpose & Mandatory Overview
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs leading-relaxed space-y-3">
                  <div>
                    <strong className="text-white text-sm block mb-1">What it is:</strong>
                    <p className="text-slate-300">
                      The Hearing Docketing Wizard is a 6-step form used to schedule new court appearances, assign presiding judges and courtrooms, link case matters, and notify assigned advocate teams.
                    </p>
                  </div>
                  <div className="border-t border-slate-800/80 pt-2">
                    <strong className="text-white text-sm block mb-1">Why it is needed (Advocate's Perspective):</strong>
                    <p className="text-slate-400">
                      Docketing an appearance requires linking the case matter ID, selecting court venue jurisdiction (e.g. Delhi High Court), assigning lead counsel, and binding supporting evidence briefs before the court date arrives.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 2: 6-Step Wizard Breakdown */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  2. 6-Step Wizard Breakdown
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white">Step 1: Hearing Metadata</p>
                    <p className="text-slate-400">Presiding Judge, Courtroom, and Jurisdiction Class.</p>
                  </div>
                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white">Step 2: Case Matter Linkage</p>
                    <p className="text-slate-400">Select case matter CNR code and title.</p>
                  </div>
                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white">Step 3: Court Schedule</p>
                    <p className="text-slate-400">Date, time slot, and estimated hearing duration.</p>
                  </div>
                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white">Step 4: Participants & Counsel</p>
                    <p className="text-slate-400">Assign Lead Counsel, Senior Associates, and Munshi.</p>
                  </div>
                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white">Step 5: Evidence Briefs</p>
                    <p className="text-slate-400">Attach petitions, affidavits, and case law citations.</p>
                  </div>
                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white">Step 6: Review & Submit</p>
                    <p className="text-slate-400">Final review summary card before triggering `POST /api/hearings`.</p>
                  </div>
                </div>
              </section>

              {/* Section 3: Backend API Checklist */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  3. Backend Developer API Checklist
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-2">
                  <ul className="space-y-1 text-slate-300">
                    <li>• <strong className="text-white">Create Hearing API:</strong> <code className="text-blue-400">POST /api/hearings</code></li>
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

