"use client";

import React, { useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { Breadcrumb, Button } from "@/components/ui";
import { Input, Switch } from "@/components/forms";
import { Settings, Save, BookOpen, X } from "lucide-react";

export default function WorkspaceSettingsPage() {
  const { addToast } = useNotifications();
  const [firmName, setFirmName] = useState("Chandra & Associates");
  const [allowAI, setAllowAI] = useState(true);
  const [showDeveloperGuide, setShowDeveloperGuide] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Settings" }]} />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-700/40 border border-slate-600/40">
              <Settings className="w-4 h-4 text-slate-300" />
            </span>
            <span>Workspace Preferences</span>
          </h1>
          <p className="text-xs text-slate-400">Configure firm profile details, theme settings, and module locks.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDeveloperGuide(true)}
            className="border-slate-600/40 text-slate-300 hover:bg-slate-800"
            leftIcon={<BookOpen className="h-4 w-4" />}
          >
            Developer Guide
          </Button>
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Save className="w-4 h-4" />}
            onClick={() => addToast("Save Preferences", "Settings saved successfully (simulated).", "success")}
          >
            Save Workspace Settings
          </Button>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 max-w-xl">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 border-b border-slate-850 pb-2.5">
          General Preferences
        </h2>
        <div className="space-y-4">
          <Input
            label="Simulated Law Firm Name"
            value={firmName}
            onChange={(e) => setFirmName(e.target.value)}
          />
          <div className="pt-2">
            <Switch
              checked={allowAI}
              onChange={(val) => {
                setAllowAI(val);
                addToast("Setting Toggled", "AI services clearance updated.", "warning");
              }}
              label="Clear Attorney Clearance to leverage AI Assistants"
            />
          </div>
        </div>
      </div>

      {/* Developer Guide Modal */}
      {showDeveloperGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
          <div className="w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 sticky top-0 bg-slate-900 z-10">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-400">Senior Advocate & Judicial Guidance</p>
                <h2 className="text-lg font-bold text-white">Workspace Preferences & Office Settings — Developer Guide</h2>
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
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  1. Core Purpose & Mandatory Overview
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs leading-relaxed space-y-3">
                  <div>
                    <strong className="text-white text-sm block mb-1">What it is:</strong>
                    <p className="text-slate-300">
                      The Workspace Preferences module configures global law firm identity metadata, Bar Council enrolment headers, AI Copilot privilege toggles, and multi-tenant operational rules.
                    </p>
                  </div>
                  <div className="border-t border-slate-800/80 pt-2">
                    <strong className="text-white text-sm block mb-1">Why it is needed (Senior Advocate & Judicial Officer's Perspective):</strong>
                    <p className="text-slate-400">
                      Law practice management requires strict regulatory compliance:
                      <br />
                      • <strong>Bar Council Letterhead & Vakalatnama Headers:</strong> Law firm name, Bar Council registration numbers, and High Court enrolment details must be configured globally for automated petition header generation and vakalatnama signatures.
                      <br />
                      • <strong>AI Assistant Privilege & DPDP Opt-In Toggle:</strong> Regulatory compliance under Digital Personal Data Protection (DPDP) Act 2023 requires explicit firm partner authorization before enabling AI Copilot document scanning and draft assistance on confidential client dockets.
                      <br />
                      • <strong>GST 18% RCM & Bar Council Compliance:</strong> Pre-configures law firm GSTIN (18% RCM Reverse Charge Mechanism) and state Bar Council fee schedules across all tenant invoice generators.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 2: Beginner Legal Glossary for Developers (Zero Legal Knowledge Required) */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  2. Indian Office Settings Concepts Explained for Software Engineers
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-3 leading-relaxed">
                  <p className="text-slate-300">
                    If you are a software developer with zero background in law firm administration, here are the key concepts:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-300">
                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">1. Bar Council Firm Registration</strong>
                      <p className="text-slate-400 text-[11px]">
                        Formal registration code issued by the State Bar Council authorizing legal practice as a firm or LLP.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">2. AI Privileged Scanning Opt-In</strong>
                      <p className="text-slate-400 text-[11px]">
                        Administrative toggle enabling/disabling LLM automated processing on client court documents under DPDP Act 2023.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">3. State High Court Jurisdiction Default</strong>
                      <p className="text-slate-400 text-[11px]">
                        Pre-sets default court registry formatting rules (e.g. Delhi HC, Bombay HC, Allahabad HC) for filing generators.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">4. GST 18% RCM Setting</strong>
                      <p className="text-slate-400 text-[11px]">
                        Accounting preference pre-filling Reverse Charge Mechanism disclosures on client fee invoices.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 3: Component Breakdown */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  3. Complete Component & Feature Breakdown
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-slate-400" />
                      1. General Preferences Card
                    </p>
                    <p className="text-slate-400">Container housing law firm title input and AI assistant privilege authorization switch.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      2. AI Assistant Privilege Switch
                    </p>
                    <p className="text-slate-400">Toggle authorizing LLM scanning and AI copilot services for tenant case files.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5 col-span-1 md:col-span-2">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-blue-400" />
                      3. Save Workspace Settings Button
                    </p>
                    <p className="text-slate-400">Persists updated firm metadata and feature toggles to tenant workspace configuration API.</p>
                  </div>
                </div>
              </section>

              {/* Section 4: Navigation & Button Actions Map */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  4. Button Actions & Interactive Controls Navigation Map
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                        <th className="pb-2">UI Action</th>
                        <th className="pb-2">Behavior</th>
                        <th className="pb-2">Target Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300">
                      <tr>
                        <td className="py-2 font-semibold text-white">Save Workspace Settings</td>
                        <td className="py-2">Persists preferences to tenant workspace database</td>
                        <td className="py-2 font-mono text-emerald-400">API PUT Request</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold text-white">AI Privilege Switch</td>
                        <td className="py-2">Toggles AI Copilot service permissions</td>
                        <td className="py-2 font-mono text-amber-400">State Toggle</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Section 5: Backend API Checklist */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  5. Backend Developer API Checklist
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-2">
                  <ul className="space-y-1.5 text-slate-300">
                    <li>• <strong className="text-white">Get Workspace Preferences:</strong> <code className="text-blue-400">GET /api/workspace/settings</code></li>
                    <li>• <strong className="text-white">Update Workspace Settings:</strong> <code className="text-blue-400">PUT /api/workspace/settings</code></li>
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

