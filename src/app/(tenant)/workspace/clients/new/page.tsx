"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useNotifications } from "@/hooks/useNotifications";
import { Breadcrumb, Button } from "@/components/ui";
import { Input, Select } from "@/components/forms";
import { Users, BookOpen, X } from "lucide-react";

export default function NewClientPage() {
  const router = useRouter();
  const { addToast } = useNotifications();
  const [step, setStep] = useState(1);
  const [showDeveloperGuide, setShowDeveloperGuide] = useState(false);

  // Wizard state values
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [industry, setIndustry] = useState("Technology");
  const [billingTerms, setBillingTerms] = useState("Net 30");

  const handleNext = () => setStep((s) => Math.min(s + 1, 4));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1));
  const handleSubmit = () => {
    addToast("Client Registered", "Simulated client profile initialized.", "success");
    router.push("/workspace/clients");
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Clients", href: "/workspace/clients" }, { name: "New" }]} />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-500" />
            <span>Onboard New Client</span>
          </h1>
          <p className="text-xs text-slate-400">Complete the onboarding wizard to create a client registry.</p>
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
              {s === 1 ? "Profile" : s === 2 ? "Contact" : s === 3 ? "Billing Terms" : "Review"}
            </span>
          </div>
        ))}
      </div>

      {/* Steps Content */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-4">
        {step === 1 && (
          <div className="space-y-3">
            <Input label="Client / Corporate Entity Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Reliance Retail" />
            <Input label="DBA / Subsidiary Name (Optional)" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="e.g. Stark Labs" />
            <Select
              label="Industry Scope"
              options={[
                { label: "Technology", value: "Technology" },
                { label: "Financial Services", value: "Financial Services" },
                { label: "Manufacturing", value: "Manufacturing" },
                { label: "Individual / Personal Case", value: "Personal" }
              ]}
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <Input label="Contact Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="e.g. billing@stark.com" />
            <Input label="Contact Phone Line" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="e.g. (555) 019-9000" />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-3">
            <Select
              label="Default Retainer Billing Terms"
              options={[
                { label: "Net 15", value: "Net 15" },
                { label: "Net 30", value: "Net 30" },
                { label: "Due Upon Receipt", value: "Receipt" }
              ]}
              value={billingTerms}
              onChange={(e) => setBillingTerms(e.target.value)}
            />
          </div>
        )}

        {step === 4 && (
          <div className="space-y-3 text-xs">
            <h3 className="font-bold text-white uppercase text-[10px] tracking-wider mb-2">Review Summary</h3>
            <div className="grid grid-cols-2 gap-4 border border-slate-800 p-4 rounded-lg bg-slate-950/20 text-slate-300">
              <div>
                <p className="text-slate-500">Client Name</p>
                <p className="font-bold text-white mt-0.5">{name || "Unspecified"}</p>
              </div>
              <div>
                <p className="text-slate-500">Contact Email</p>
                <p className="font-mono mt-0.5">{email || "Unspecified"}</p>
              </div>
              <div>
                <p className="text-slate-500">Industry</p>
                <p className="mt-0.5">{industry}</p>
              </div>
              <div>
                <p className="text-slate-500">Billing Terms</p>
                <p className="mt-0.5">{billingTerms}</p>
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
              Register Client
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
          <div className="w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 sticky top-0 bg-slate-900 z-10">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-emerald-400">Developer Guide</p>
                <h2 className="text-lg font-bold text-white">Client Intake Wizard — Developer Guide</h2>
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
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  1. Core Purpose & Legal Context
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs leading-relaxed space-y-3">
                  <div>
                    <strong className="text-white text-sm block mb-1">What it is:</strong>
                    <p className="text-slate-300">
                      The Client Onboarding Wizard is a 4-step form used by law firms to onboard new individual clients or corporate enterprise entities into the LawStack platform.
                    </p>
                  </div>
                  <div className="border-t border-slate-800/80 pt-2">
                    <strong className="text-white text-sm block mb-1">Why it is needed:</strong>
                    <p className="text-slate-400">
                      Onboarding a client requires structured data collection (corporate name, primary contact details, billing retainer terms) while establishing DPDP Act 2023 data consent records and dispatching private portal invitations.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 2: 4-Step Breakdown */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  2. 4-Step Onboarding Form Breakdown
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-blue-400" />
                      Step 1: Profile & Entity
                    </p>
                    <p className="text-slate-400">Captures Client / Corporate Entity Name, DBA subsidiary name, and Industry Scope (Technology, Financial, Manufacturing, Personal).</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      Step 2: Contact Details
                    </p>
                    <p className="text-slate-400">Captures primary email address and phone line for automated WhatsApp hearing updates and billing notifications.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-amber-400" />
                      Step 3: Billing Terms
                    </p>
                    <p className="text-slate-400">Sets retainer payment schedule (Net 15, Net 30, Due Upon Receipt) for automated invoice generation.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-purple-400" />
                      Step 4: Verification & Register
                    </p>
                    <p className="text-slate-400">Displays summary card for partner review before submitting the record to the backend database.</p>
                  </div>
                </div>
              </section>

              {/* Section 3: Navigation Map */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  3. Button Actions & Submit Handler
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-2">
                  <p><strong className="text-white">Next Step Button:</strong> Advances form state (`step` state incremented from 1 to 4).</p>
                  <p><strong className="text-white">Register Client Button:</strong> Triggers form submission (`POST /api/clients`), creates client record, and redirects to `/workspace/clients`.</p>
                </div>
              </section>

              {/* Section 4: Backend Payload Spec */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  4. Backend API Payload Specification (`POST /api/clients`)
                </h3>
                <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-[11px] font-mono text-emerald-300 overflow-x-auto">
{`{
  "name": "${name || "Reliance Retail"}",
  "companyName": "${companyName || "Stark Labs"}",
  "email": "${email || "billing@stark.com"}",
  "phone": "${phone || "+91 98765 43210"}",
  "industry": "${industry}",
  "billingTerms": "${billingTerms}",
  "dpdpConsentCaptured": true,
  "dpdpConsentTimestamp": "${new Date().toISOString()}"
}`}
                </pre>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

