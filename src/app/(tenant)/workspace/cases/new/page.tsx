"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useNotifications } from "@/hooks/useNotifications";
import { Breadcrumb, Button, Badge } from "@/components/ui";
import { Input, Textarea, Select } from "@/components/forms";
import { Shield, Sparkles, Building2, CheckCircle2 } from "lucide-react";

export default function NewCasePage() {
  const router = useRouter();
  const { addToast } = useNotifications();
  const [step, setStep] = useState(1);

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
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Cases", href: "/workspace/cases" }, { name: "New" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Create New Case Matter</h1>
        <p className="text-xs text-slate-400">Complete the 5-step wizard to docket a new matter file.</p>
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
    </div>
  );
}
