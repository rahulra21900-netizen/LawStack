"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useNotifications } from "@/hooks/useNotifications";
import { Breadcrumb, Button } from "@/components/ui";
import { Input, Select, Switch } from "@/components/forms";
import { Shield } from "lucide-react";

export default function NewProvisioningWizardPage() {
  const router = useRouter();
  const { addToast } = useNotifications();
  const [step, setStep] = useState(1);

  // Form states
  const [wType, setWType] = useState("Small Law Firm");
  const [firmName, setFirmName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [subdomain, setSubdomain] = useState("");
  
  const [barNumber, setBarNumber] = useState("");
  const [stateBar, setStateBar] = useState("Delhi Bar Council");
  const [gstNum, setGstNum] = useState("");
  const [panNum, setPanNum] = useState("");
  const [practiceSince, setPracticeSince] = useState("");
  const [firmSize, setFirmSize] = useState("5-10");

  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminMobile, setAdminMobile] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const [country, setCountry] = useState("India");
  const [state, setState] = useState("Delhi");
  const [city, setCity] = useState("New Delhi");
  const [address, setAddress] = useState("");

  const [plan, setPlan] = useState("Professional");

  const [modules, setModules] = useState({
    cases: true,
    clients: true,
    documents: true,
    calendar: true,
    hearings: true,
    tasks: true,
    billing: true,
    aiWorkspace: true
  });

  const handleNext = () => setStep((s) => Math.min(s + 1, 9));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1));
  const handleSubmit = () => {
    addToast("Workspace Provisioned", `Namespace ${subdomain}.lawstack.in has been initialized.`, "success");
    router.push("/platform/tenant-administration");
  };

  const stepsList = [
    "Type", "Details", "Bar Credentials", "Admin", "Office", "Billing Plan", "Modules", "Review", "Provision"
  ];

  return (
    <div className="space-y-6 max-w-2xl mx-auto text-xs">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Platform", href: "/platform/dashboard" }, { name: "Provisioning", href: "/platform/tenant-provisioning" }, { name: "New" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-500 animate-pulse" />
          <span>Provision New Workspace Room</span>
        </h1>
        <p className="text-xs text-slate-400">Complete the 8-step SaaS wizard to configure the legal practice database.</p>
      </div>

      {/* Steps indicators */}
      <div className="flex justify-between items-center bg-slate-900 border border-slate-800 p-4 rounded-xl text-slate-500 overflow-x-auto gap-4">
        {stepsList.map((label, idx) => {
          const s = idx + 1;
          const isActive = step === s;
          const isDone = step > s;
          return (
            <div key={s} className="flex items-center gap-1.5 whitespace-nowrap">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                isActive
                  ? "bg-blue-600 text-white"
                  : isDone
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "bg-slate-800 text-slate-500"
              }`}>
                {s}
              </span>
              <span className={isActive ? "font-bold text-white" : "text-[10px]"}>{label}</span>
            </div>
          );
        })}
      </div>

      {/* Main card */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-4">
        {step === 1 && (
          <div className="space-y-3">
            <Select
              label="Workspace Practice Classification"
              options={[
                { label: "Individual Advocate Room", value: "Individual Advocate" },
                { label: "Small Law Firm Suite", value: "Small Law Firm" }
              ]}
              value={wType}
              onChange={(e) => setWType(e.target.value)}
            />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <Input label="Firm Practice Name" value={firmName} onChange={(e) => setFirmName(e.target.value)} placeholder="e.g. Oakwood Partners" />
            <Input label="Workspace Display Title" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="e.g. Oakwood Practice Room" />
            <div>
              <Input label="Subdomain Namespace" value={subdomain} onChange={(e) => setSubdomain(e.target.value)} placeholder="e.g. oakwood" />
              {subdomain && (
                <p className="text-[10px] text-blue-400 mt-1 font-mono">Workspace URL: https://{subdomain.toLowerCase()}.lawstack.in</p>
              )}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Bar Council Reg. Number" value={barNumber} onChange={(e) => setBarNumber(e.target.value)} placeholder="e.g. D/2026/8840" />
            <Input label="State Bar Council" value={stateBar} onChange={(e) => setStateBar(e.target.value)} />
            <Input label="Firm GSTIN Number (Optional)" value={gstNum} onChange={(e) => setGstNum(e.target.value)} placeholder="07AAAAA1111A1Z1" />
            <Input label="PAN Card Number" value={panNum} onChange={(e) => setPanNum(e.target.value)} placeholder="ABCDE1234F" />
            <Input label="Practice Starting Year" value={practiceSince} onChange={(e) => setPracticeSince(e.target.value)} placeholder="2018" />
            <Select
              label="Firm Size"
              options={[
                { label: "1 (Individual Advocate)", value: "1" },
                { label: "2 - 5 Attorneys", value: "2-5" },
                { label: "5 - 10 Attorneys", value: "5-10" }
              ]}
              value={firmSize}
              onChange={(e) => setFirmSize(e.target.value)}
            />
          </div>
        )}

        {step === 4 && (
          <div className="space-y-3">
            <Input label="Primary Admin Name" value={adminName} onChange={(e) => setAdminName(e.target.value)} placeholder="Harvey Specter" />
            <Input label="Primary Admin Email" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} placeholder="harvey@oakwood.in" />
            <Input label="Primary Admin Mobile" value={adminMobile} onChange={(e) => setAdminMobile(e.target.value)} placeholder="+91 99999 88888" />
            <Input label="Admin Account Password" type="password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} placeholder="••••••••" />
          </div>
        )}

        {step === 5 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
            <Input label="State" value={state} onChange={(e) => setState(e.target.value)} />
            <Input label="City" value={city} onChange={(e) => setCity(e.target.value)} />
            <Input label="Office address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Connaught Place, Block E" />
          </div>
        )}

        {step === 6 && (
          <div className="space-y-3">
            <Select
              label="Subscription Tier Plan"
              options={[
                { label: "Starter Trial Plan (1 Workspace)", value: "Starter" },
                { label: "Professional Suite (Unlimited matters)", value: "Professional" },
                { label: "Enterprise Custom Tier", value: "Enterprise" }
              ]}
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
            />
          </div>
        )}

        {step === 7 && (
          <div className="space-y-3">
            <h3 className="font-bold text-white uppercase text-[10px] tracking-wider mb-2">Configure Enabled Practice Modules</h3>
            <div className="grid grid-cols-2 gap-3 bg-slate-950/20 border border-slate-850 p-4 rounded-lg">
              <Switch checked={modules.cases} onChange={(val) => setModules(m => ({ ...m, cases: val }))} label="Cases Manager" />
              <Switch checked={modules.clients} onChange={(val) => setModules(m => ({ ...m, clients: val }))} label="Clients Profiles" />
              <Switch checked={modules.documents} onChange={(val) => setModules(m => ({ ...m, documents: val }))} label="SharePoint Documents" />
              <Switch checked={modules.hearings} onChange={(val) => setModules(m => ({ ...m, hearings: val }))} label="Hearings Registry" />
              <Switch checked={modules.tasks} onChange={(val) => setModules(m => ({ ...m, tasks: val }))} label="Task Dockets" />
              <Switch checked={modules.billing} onChange={(val) => setModules(m => ({ ...m, billing: val }))} label="Invoices Billing" />
              <Switch checked={modules.aiWorkspace} onChange={(val) => setModules(m => ({ ...m, aiWorkspace: val }))} label="AI Legal Assistant" />
            </div>
          </div>
        )}

        {step === 8 && (
          <div className="space-y-3 text-slate-300">
            <h3 className="font-bold text-white uppercase text-[10px] tracking-wider border-b border-slate-800 pb-2">Review Workspace Details</h3>
            <div className="grid grid-cols-2 gap-4 p-4 rounded-lg border border-slate-800 bg-slate-950/25">
              <div>
                <p className="text-slate-500">Firm Name</p>
                <p className="font-bold text-white mt-0.5">{firmName || "Unspecified"}</p>
              </div>
              <div>
                <p className="text-slate-500">Workspace URL</p>
                <p className="font-mono mt-0.5">{subdomain ? subdomain.toLowerCase() + ".lawstack.in" : "Unspecified"}</p>
              </div>
              <div>
                <p className="text-slate-500">Admin Email</p>
                <p className="mt-0.5 font-semibold text-slate-200">{adminEmail || "Unspecified"}</p>
              </div>
              <div>
                <p className="text-slate-500">Subscription Plan</p>
                <p className="mt-0.5 text-blue-400 font-bold">{plan}</p>
              </div>
            </div>
          </div>
        )}

        {step === 9 && (
          <div className="p-8 text-center text-emerald-400 space-y-3">
            <p className="font-bold text-sm">Workspace Initialization Complete!</p>
            <p className="text-slate-400 max-w-sm mx-auto leading-relaxed">
              Legal credentials registered with State Bar. Isolated database cluster provisioned.
            </p>
          </div>
        )}

        {/* Wizard Controls */}
        <div className="flex justify-between pt-4 border-t border-slate-800/80">
          <Button variant="secondary" onClick={handlePrev} disabled={step === 1 || step === 9}>
            Back
          </Button>
          {step === 8 ? (
            <Button variant="primary" onClick={handleNext}>
              Initiate Provisioning
            </Button>
          ) : step === 9 ? (
            <Button variant="primary" onClick={handleSubmit}>
              Complete setup
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
