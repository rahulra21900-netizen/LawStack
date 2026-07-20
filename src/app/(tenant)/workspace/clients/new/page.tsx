"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useNotifications } from "@/hooks/useNotifications";
import { Breadcrumb, Button } from "@/components/ui";
import { Input, Select } from "@/components/forms";
import { Users } from "lucide-react";

export default function NewClientPage() {
  const router = useRouter();
  const { addToast } = useNotifications();
  const [step, setStep] = useState(1);

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
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Clients", href: "/workspace/clients" }, { name: "New" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <Users className="w-5 h-5 text-emerald-500" />
          <span>Onboard New Client</span>
        </h1>
        <p className="text-xs text-slate-400">Complete the onboarding wizard to create a client registry.</p>
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
    </div>
  );
}
