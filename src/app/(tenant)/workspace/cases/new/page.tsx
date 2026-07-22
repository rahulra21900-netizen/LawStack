"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useNotifications } from "@/hooks/useNotifications";
import { Breadcrumb, Button, Badge } from "@/components/ui";
import { Input, Textarea, Select } from "@/components/forms";
import { Shield, Sparkles, Building2, CheckCircle2, BookOpen, X } from "lucide-react";

export default function NewCasePage() {
  const router = useRouter();
  const { addToast } = useNotifications();
  const [step, setStep] = useState(1);
  const [showDeveloperGuide, setShowDeveloperGuide] = useState(false);

  // Wizard state values
  const [caseName, setCaseName] = useState("");
  const [caseNumber, setCaseNumber] = useState("");
  const [practice, setPractice] = useState("Intellectual Property");
  const [client, setClient] = useState("client-wayne");
  const [attorney, setAttorney] = useState("Priya Chandra");
  const [judge, setJudge] = useState("");
  const [court, setCourt] = useState("");
  const [opposing, setOpposing] = useState("");

  const handleNext = () => setStep((s) => Math.min(s + 1, 5));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1));
  const handleSubmit = () => {
    addToast("Case Matter Created", "Simulated case added successfully to docket list.", "success");
    router.push("/workspace/cases");
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Cases", href: "/workspace/cases" }, { name: "New" }]} />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Create New Case Matter</h1>
          <p className="text-xs text-slate-400">Complete the 5-step wizard to docket a new matter file.</p>
        </div>
        <Button
          variant="outline"
          leftIcon={<BookOpen className="w-4 h-4" />}
          onClick={() => setShowDeveloperGuide(true)}
        >
          Developer Guide
        </Button>
      </div>

      {/* Progress Tracker */}
      <div className="flex justify-between items-center bg-slate-900 border border-slate-800 p-4 rounded-xl text-xs text-slate-400">
        {[1, 2, 3, 4, 5].map((s) => (
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
              {s === 1 ? "Basic Info" : s === 2 ? "Client/Team" : s === 3 ? "Court" : s === 4 ? "Dates" : "Review"}
            </span>
          </div>
        ))}
      </div>

      {/* Steps Content */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-4">
        {step === 1 && (
          <div className="space-y-3">
            <Input label="Matter Name" value={caseName} onChange={(e) => setCaseName(e.target.value)} placeholder="e.g. Reliance Retail Trade Secret Breach" />
            <Input label="Matter Number" value={caseNumber} onChange={(e) => setCaseNumber(e.target.value)} placeholder="e.g. CV-2026-9001" />
            <Select
              label="Practice Area"
              options={[
                { label: "Intellectual Property", value: "Intellectual Property" },
                { label: "Tax Law", value: "Tax Law" },
                { label: "Corporate Law", value: "Corporate Law" }
              ]}
              value={practice}
              onChange={(e) => setPractice(e.target.value)}
            />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <Select
              label="Primary Client"
              options={[
                { label: "Rakesh Sharma (Krishna Textiles Pvt. Ltd.)", value: "client-wayne" },
                { label: "Suresh Krishnan (Reliance Retail)", value: "client-stark" },
                { label: "Rohit Malhotra (Oakwood Estates)", value: "client-oakwood" }
              ]}
              value={client}
              onChange={(e) => setClient(e.target.value)}
            />
            <Select
              label="Lead Counsel"
              options={[
                { label: "Priya Chandra", value: "Priya Chandra" },
                { label: "Arjun Mehta", value: "Arjun Mehta" },
                { label: "Rohan Deshpande", value: "Rohan Deshpande" }
              ]}
              value={attorney}
              onChange={(e) => setAttorney(e.target.value)}
            />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-3">
            <Input label="Court Name" value={court} onChange={(e) => setCourt(e.target.value)} placeholder="e.g. NY Federal Court" />
            <Input label="Judge" value={judge} onChange={(e) => setJudge(e.target.value)} placeholder="e.g. Hon. Justice Anil Kumar" />
            <Input label="Opposing Counsel" value={opposing} onChange={(e) => setOpposing(e.target.value)} placeholder="e.g. Robert Zane" />
          </div>
        )}

        {step === 4 && (
          <div className="p-4 border border-slate-800 rounded-lg text-center text-xs text-slate-400">
            Filing Date, hearings Date, and limitation periods will be initialized automatically based on Court Rules.
          </div>
        )}

        {step === 5 && (
          <div className="space-y-3 text-xs">
            <h3 className="font-bold text-white uppercase text-[10px] tracking-wider mb-2">Verify Details Summary</h3>
            <div className="grid grid-cols-2 gap-4 border border-slate-800 p-4 rounded-lg bg-slate-950/20 text-slate-300">
              <div>
                <p className="text-slate-500">Case Title</p>
                <p className="font-bold text-white mt-0.5">{caseName || "Unspecified"}</p>
              </div>
              <div>
                <p className="text-slate-500">Case Number</p>
                <p className="font-mono mt-0.5">{caseNumber || "Unspecified"}</p>
              </div>
              <div>
                <p className="text-slate-500">Practice Area</p>
                <p className="mt-0.5">{practice}</p>
              </div>
              <div>
                <p className="text-slate-500">Assigned Attorney</p>
                <p className="mt-0.5">{attorney}</p>
              </div>
            </div>
          </div>
        )}

        {/* Wizard Controls */}
        <div className="flex justify-between pt-4 border-t border-slate-800/80">
          <Button variant="secondary" onClick={handlePrev} disabled={step === 1}>
            Back
          </Button>
          {step === 5 ? (
            <Button variant="primary" onClick={handleSubmit}>
              Create Matter
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
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-blue-400">Developer Guide</p>
                <h2 className="text-lg font-bold text-white">Create New Case Matter Form — Implementation Notes</h2>
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
              {/* Section 1: Overview */}
              <section className="space-y-2">
                <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  1. What is this form and why is it needed?
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs leading-relaxed space-y-2">
                  <p className="text-slate-200">
                    <strong className="text-white">Form Purpose:</strong> This is a 5-step wizard form designed to let law firm advocates or staff create and docket a new case matter file.
                  </p>
                  <p className="text-slate-400">
                    <strong className="text-slate-300">Why a 5-step wizard?</strong> Instead of overwhelming lawyers with a long 30-field form, breaking case creation into 5 small steps ensures high data accuracy, clear progress tracking, and easy data entry on both desktop and mobile screens.
                  </p>
                </div>
              </section>

              {/* Section 2: Step-by-Step Breakdown */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  2. Step-by-Step Field Breakdown (What Every Step Collects)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-blue-400" />
                      Step 1: Basic Info
                    </p>
                    <p className="text-slate-400"><strong className="text-slate-200">Matter Name:</strong> Title of the legal dispute or contract matter.<br /><strong className="text-slate-200">Matter Number:</strong> Internal file code or court CNR number.<br /><strong className="text-slate-200">Practice Area:</strong> Legal specialty (e.g. Intellectual Property, Tax Law, Corporate Law, Criminal Law).</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-blue-400" />
                      Step 2: Client & Team Assignment
                    </p>
                    <p className="text-slate-400"><strong className="text-slate-200">Primary Client:</strong> Selects representing client from the firm's client database.<br /><strong className="text-slate-200">Lead Counsel:</strong> Assigns the primary responsible advocate in the firm.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-blue-400" />
                      Step 3: Court & Judge Details
                    </p>
                    <p className="text-slate-400"><strong className="text-slate-200">Court Name:</strong> High Court, District Court, or Tribunal.<br /><strong className="text-slate-200">Judge Name:</strong> Presiding judicial officer.<br /><strong className="text-slate-200">Opposing Counsel:</strong> Name of opposing lawyer or law firm.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-blue-400" />
                      Step 4: Dates & Rules Initialization
                    </p>
                    <p className="text-slate-400">Automated step that initializes filing date, hearing schedule, and limitation deadlines based on statutory court rules.</p>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5 text-xs">
                  <p className="font-bold text-white flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    Step 5: Verification & Submission
                  </p>
                  <p className="text-slate-400">Displays a clean summary preview card of entered details (Case Title, Case Number, Practice Area, Lead Attorney) before sending the data to the backend.</p>
                </div>
              </section>

              {/* Section 3: Buttons & Controls */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  3. Button Actions & Step Controls
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-2">
                  <ul className="space-y-2 text-slate-300">
                    <li><strong className="text-white font-semibold">Next Step Button:</strong> Advances to step <code className="text-blue-300">step + 1</code>. On backend integration, trigger field validation before advancing.</li>
                    <li><strong className="text-white font-semibold">Back Button:</strong> Decrements step to <code className="text-blue-300">step - 1</code>. Retains all entered form input state values. Disabled on Step 1.</li>
                    <li><strong className="text-white font-semibold">Create Matter Button (Step 5):</strong> Sends payload to <code className="text-blue-400">POST /api/cases</code>, shows success toast notification, and redirects to <code className="text-blue-400">/workspace/cases</code>.</li>
                    <li><strong className="text-white font-semibold">Developer Guide Button:</strong> Opens this modal window.</li>
                  </ul>
                </div>
              </section>

              {/* Section 4: Backend API Specification */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  4. Backend API Payload Specification
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-2">
                  <p className="text-slate-300 font-semibold">API Endpoint: <code className="text-emerald-400">POST /api/cases</code></p>
                  <p className="text-slate-400">Sample JSON payload structure for backend developers:</p>
                  <pre className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-blue-300 overflow-x-auto">
{`{
  "title": "${caseName || "Reliance Retail Trade Secret Breach"}",
  "caseNumber": "${caseNumber || "CV-2026-9001"}",
  "practiceArea": "${practice}",
  "clientId": "${client}",
  "leadCounsel": "${attorney}",
  "courtName": "${court || "Delhi High Court"}",
  "judgeName": "${judge || "Hon. Justice Anil Kumar"}",
  "opposingCounsel": "${opposing || "Robert Zane"}"
}`}
                  </pre>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

