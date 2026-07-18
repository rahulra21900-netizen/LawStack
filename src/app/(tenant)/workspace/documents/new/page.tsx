"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useNotifications } from "@/hooks/useNotifications";
import { Breadcrumb, Button } from "@/components/ui";
import { Input, Select } from "@/components/forms";
import { FileText } from "lucide-react";

export default function NewDocumentPage() {
  const router = useRouter();
  const { addToast } = useNotifications();
  const [step, setStep] = useState(1);

  // Wizard state values
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Contract");
  const [confidentiality, setConfidentiality] = useState("Confidential");
  const [version, setVersion] = useState("1.0");

  const handleNext = () => setStep((s) => Math.min(s + 1, 5));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1));
  const handleSubmit = () => {
    addToast("Document Registered", "Simulated document catalog entry added successfully.", "success");
    router.push("/workspace/documents");
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Documents", href: "/workspace/documents" }, { name: "New" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-indigo-500" />
          <span>Upload Document Record</span>
        </h1>
        <p className="text-xs text-slate-400">Complete the 5-step classification wizard to save a legal record.</p>
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
              {s === 1 ? "Info" : s === 2 ? "Relations" : s === 3 ? "Classification" : s === 4 ? "Version" : "Review"}
            </span>
          </div>
        ))}
      </div>

      {/* Steps Content */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-4">
        {step === 1 && (
          <div className="space-y-3">
            <Input label="Document Title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Oakwood Acquisition Retainer Contract" />
            <Select
              label="Document Type"
              options={[
                { label: "Contract Agreement", value: "Contract" },
                { label: "Brief / Motion", value: "Motion" },
                { label: "Court Pleading", value: "Pleading" }
              ]}
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </div>
        )}

        {step === 2 && (
          <div className="p-4 border border-slate-800 rounded-lg text-center text-xs text-slate-400">
            Relations mapping: Select case matter ID and client profiles to inherit retention locks. (Simulated)
          </div>
        )}

        {step === 3 && (
          <div className="space-y-3">
            <Select
              label="Confidentiality Status"
              options={[
                { label: "Confidential / Restricted Access", value: "Confidential" },
                { label: "Public Court Records Scope", value: "Public" }
              ]}
              value={confidentiality}
              onChange={(e) => setConfidentiality(e.target.value)}
            />
          </div>
        )}

        {step === 4 && (
          <div className="space-y-3">
            <Input label="Initial Version Label" value={version} onChange={(e) => setVersion(e.target.value)} placeholder="e.g. 1.0" />
            <div className="p-4 border border-dashed border-slate-800 rounded-lg text-center text-xs text-slate-500">
              Drag & Drop Brief File here or click to simulate upload.
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-3 text-xs">
            <h3 className="font-bold text-white uppercase text-[10px] tracking-wider mb-2">Review Summary</h3>
            <div className="grid grid-cols-2 gap-4 border border-slate-800 p-4 rounded-lg bg-slate-950/20 text-slate-300">
              <div>
                <p className="text-slate-500">Document Title</p>
                <p className="font-bold text-white mt-0.5">{title || "Unspecified"}</p>
              </div>
              <div>
                <p className="text-slate-500">Document Category</p>
                <p className="mt-0.5">{type}</p>
              </div>
              <div>
                <p className="text-slate-500">Security Clearance</p>
                <p className="mt-0.5">{confidentiality}</p>
              </div>
              <div>
                <p className="text-slate-500">Version</p>
                <p className="font-mono mt-0.5">{version}</p>
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
              Register Record
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
