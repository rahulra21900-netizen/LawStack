"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useNotifications } from "@/hooks/useNotifications";
import { Breadcrumb, Button } from "@/components/ui";
import { Input, Select } from "@/components/forms";
import { FileText, BookOpen, X } from "lucide-react";

export default function NewDocumentPage() {
  const router = useRouter();
  const { addToast } = useNotifications();
  const [step, setStep] = useState(1);
  const [showDeveloperGuide, setShowDeveloperGuide] = useState(false);

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
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Documents", href: "/workspace/documents" }, { name: "New" }]} />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-500" />
            <span>Upload Document Record</span>
          </h1>
          <p className="text-xs text-slate-400">Complete the 5-step classification wizard to save a legal record.</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowDeveloperGuide(true)}
          className="border-indigo-500/40 text-indigo-300 hover:bg-indigo-500/10"
          leftIcon={<BookOpen className="h-4 w-4" />}
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
              {s === 1 ? "Info" : s === 2 ? "Relations" : s === 3 ? "Classification" : s === 4 ? "Version" : "Review"}
            </span>
          </div>
        ))}
      </div>

      {/* Steps Content */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-4">
        {step === 1 && (
          <div className="space-y-3">
            <Input label="Document Title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Oakwood Estates Amalgamation Retainer Contract" />
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

      {/* Developer Guide Modal */}
      {showDeveloperGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
          <div className="w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 sticky top-0 bg-slate-900 z-10">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-indigo-400">Senior Advocate & Judicial Guidance</p>
                <h2 className="text-lg font-bold text-white">Document Registration Wizard — Developer Guide</h2>
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
                <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  1. Core Purpose & Mandatory Overview
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs leading-relaxed space-y-3">
                  <div>
                    <strong className="text-white text-sm block mb-1">What it is:</strong>
                    <p className="text-slate-300">
                      The Document Upload Wizard is a 5-step form used by law firms to upload, classify, assign access permissions, and register new legal files into the LawStack vault.
                    </p>
                  </div>
                  <div className="border-t border-slate-800/80 pt-2">
                    <strong className="text-white text-sm block mb-1">Why it is needed (Advocate's Perspective):</strong>
                    <p className="text-slate-400">
                      Files cannot simply be dumped into a generic folder. Each file must be properly linked to a Case ID (`caseId`), classified under confidentiality security tiers (Section 132 Attorney-Client Privilege), and assigned initial version tags before filing in court.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 2: 5-Step Wizard Breakdown */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  2. 5-Step Wizard Breakdown
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white">Step 1: Document Metadata</p>
                    <p className="text-slate-400">Title, Category (Contract, Pleading, Motion, Brief).</p>
                  </div>
                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white">Step 2: Relations Mapping</p>
                    <p className="text-slate-400">Link document to specific Case File ID & Client Profile.</p>
                  </div>
                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white">Step 3: Security & BSA 2023</p>
                    <p className="text-slate-400">Confidentiality clearance & electronic evidence audit flags.</p>
                  </div>
                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white">Step 4: Version & File Drag-Drop</p>
                    <p className="text-slate-400">Initial version label (e.g. `v1.0`) & file upload zone.</p>
                  </div>
                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1 col-span-1 md:col-span-2">
                    <p className="font-bold text-white">Step 5: Review & Submit</p>
                    <p className="text-slate-400">Final summary card review before submitting `POST /api/documents/upload`.</p>
                  </div>
                </div>
              </section>

              {/* Section 3: Backend API Checklist */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  3. Backend Developer API Checklist
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-2">
                  <ul className="space-y-1 text-slate-300">
                    <li>• <strong className="text-white">Upload Endpoint:</strong> <code className="text-blue-400">POST /api/documents/upload</code> (Multipart Form Data)</li>
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

