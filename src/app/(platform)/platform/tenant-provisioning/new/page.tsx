"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useNotifications } from "@/hooks/useNotifications";
import { Breadcrumb, Button, Badge } from "@/components/ui";
import { Input, Select, Switch } from "@/components/forms";
import { Shield, Building2, UserCheck, MapPin, CreditCard, Layers, CircleCheck as CheckCircle2, Sparkles, Check, ArrowRight, ArrowLeft, Globe, Lock, Database } from "lucide-react";

export default function NewProvisioningWizardPage() {
  const router = useRouter();
  const { addToast } = useNotifications();
  const [step, setStep] = useState(1);

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
    aiWorkspace: true,
  });

  const handleNext = () => setStep((s) => Math.min(s + 1, 9));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1));
  const handleSubmit = () => {
    addToast("Workspace Provisioned", `Namespace ${subdomain}.lawstack.com has been initialized.`, "success");
    router.push("/platform/tenant-administration");
  };

  const stepsList = [
    { label: "Type", icon: Building2 },
    { label: "Details", icon: Building2 },
    { label: "Bar Credentials", icon: Shield },
    { label: "Admin", icon: UserCheck },
    { label: "Office", icon: MapPin },
    { label: "Plan", icon: CreditCard },
    { label: "Modules", icon: Layers },
    { label: "Review", icon: CheckCircle2 },
    { label: "Provision", icon: Sparkles },
  ];

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Platform", href: "/platform/dashboard" }, { name: "Provisioning", href: "/platform/tenant-provisioning" }, { name: "New" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/15 border border-blue-500/30">
            <Shield className="w-4 h-4 text-blue-400" />
          </span>
          <span>Tenant Provisioning Wizard</span>
        </h1>
        <p className="text-xs text-slate-400">Complete the 9-step wizard to launch an isolated firm practice namespace.</p>
      </div>

      {/* Steps indicators */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <div className="flex items-center justify-between gap-1 overflow-x-auto">
          {stepsList.map((s, idx) => {
            const n = idx + 1;
            const isActive = step === n;
            const isDone = step > n;
            const Icon = s.icon;
            return (
              <React.Fragment key={n}>
                <div className="flex flex-col items-center gap-1 shrink-0">
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[10px] transition-all ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-900/40"
                        : isDone
                        ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                        : "bg-slate-800 text-slate-500 border border-slate-700"
                    }`}
                  >
                    {isDone ? <Check className="w-3.5 h-3.5" /> : <Icon className="w-3.5 h-3.5" />}
                  </span>
                  <span className={`text-[9px] font-bold uppercase tracking-wider whitespace-nowrap ${isActive ? "text-white" : isDone ? "text-emerald-400" : "text-slate-500"}`}>
                    {s.label}
                  </span>
                </div>
                {idx < stepsList.length - 1 && (
                  <div className={`h-0.5 flex-1 min-w-4 rounded-full ${isDone ? "bg-emerald-500/40" : "bg-slate-800"}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Main card */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
              Step {step} of 9
            </div>
            <h2 className="mt-0.5 text-sm font-bold text-white">{stepsList[step - 1].label}</h2>
          </div>
          <Badge label={`${Math.round((step / 9) * 100)}%`} variant="info" />
        </div>

        {step === 1 && (
          <div className="space-y-3">
            <Select
              label="Workspace Practice Classification"
              options={[
                { label: "Individual Advocate Room", value: "Individual Advocate" },
                { label: "Small Law Firm Suite", value: "Small Law Firm" },
              ]}
              value={wType}
              onChange={(e) => setWType(e.target.value)}
            />
            <div className="grid grid-cols-2 gap-3 mt-3">
              {[
                { icon: UserCheck, title: "Individual Advocate", desc: "Solo practice, single attorney" },
                { icon: Building2, title: "Small Law Firm", desc: "Multi-attorney firm with staff" },
              ].map((opt) => {
                const Icon = opt.icon;
                const active = wType === opt.title;
                return (
                  <button
                    key={opt.title}
                    type="button"
                    onClick={() => setWType(opt.title)}
                    className={`text-left rounded-lg border p-3 transition-all ${
                      active ? "border-blue-500/40 bg-blue-600/10" : "border-slate-800 bg-slate-950/40 hover:border-slate-700"
                    }`}
                  >
                    <Icon className={`w-4 h-4 mb-2 ${active ? "text-blue-400" : "text-slate-400"}`} />
                    <div className="text-xs font-bold text-white">{opt.title}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{opt.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <Input label="Firm Practice Name" value={firmName} onChange={(e) => setFirmName(e.target.value)} placeholder="e.g. Oakwood Partners" />
            <Input label="Workspace Display Title" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="e.g. Oakwood Practice Room" />
            <div>
              <Input label="Subdomain Namespace" value={subdomain} onChange={(e) => setSubdomain(e.target.value)} placeholder="e.g. oakwood" />
              {subdomain && (
                <div className="mt-2 flex items-center gap-2 rounded-lg border border-blue-500/20 bg-blue-600/5 px-3 py-2">
                  <Globe className="w-3.5 h-3.5 text-blue-400" />
                  <p className="text-[10px] text-blue-300 font-mono">https://{subdomain.toLowerCase()}.lawstack.com</p>
                </div>
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
                { label: "5 - 10 Attorneys", value: "5-10" },
              ]}
              value={firmSize}
              onChange={(e) => setFirmSize(e.target.value)}
            />
          </div>
        )}

        {step === 4 && (
          <div className="space-y-3">
            <Input label="Primary Admin Name" value={adminName} onChange={(e) => setAdminName(e.target.value)} placeholder="Harvey Specter" />
            <Input label="Primary Admin Email" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} placeholder="harvey@oakwood.com" />
            <Input label="Primary Admin Mobile" value={adminMobile} onChange={(e) => setAdminMobile(e.target.value)} placeholder="+91 99999 88888" />
            <Input label="Admin Account Password" type="password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} placeholder="••••••••" />
            <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950/40 p-3">
              <Lock className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <p className="text-[10px] text-slate-400">Admin will be required to enroll MFA on first sign-in.</p>
            </div>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { name: "Starter", price: "$49/mo", desc: "1 workspace, 3 seats", features: ["Matters", "Documents"] },
                { name: "Professional", price: "$149/mo", desc: "Unlimited matters", features: ["All modules", "AI Copilot", "10 seats"] },
                { name: "Enterprise", price: "Custom", desc: "Custom seats & SSO", features: ["SSO/SAML", "Audit exports", "Dedicated support"] },
              ].map((p) => {
                const active = plan === p.name;
                return (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => setPlan(p.name)}
                    className={`text-left rounded-xl border p-4 transition-all ${
                      active ? "border-blue-500/50 bg-blue-600/10 ring-1 ring-blue-500/30" : "border-slate-800 bg-slate-950/40 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{p.name}</span>
                      {active && <CheckCircle2 className="w-4 h-4 text-blue-400" />}
                    </div>
                    <div className="mt-1 text-lg font-extrabold text-white">{p.price}</div>
                    <div className="text-[10px] text-slate-500">{p.desc}</div>
                    <ul className="mt-3 space-y-1">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-center gap-1.5 text-[10px] text-slate-400">
                          <Check className="w-3 h-3 text-emerald-400" /> {f}
                        </li>
                      ))}
                    </ul>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 7 && (
          <div className="space-y-3">
            <h3 className="font-bold text-white uppercase text-[10px] tracking-wider mb-2">Configure Enabled Practice Modules</h3>
            <div className="grid grid-cols-2 gap-3 rounded-lg border border-slate-800 bg-slate-950/30 p-4">
              <Switch checked={modules.cases} onChange={(val) => setModules((m) => ({ ...m, cases: val }))} label="Cases Manager" />
              <Switch checked={modules.clients} onChange={(val) => setModules((m) => ({ ...m, clients: val }))} label="Clients Profiles" />
              <Switch checked={modules.documents} onChange={(val) => setModules((m) => ({ ...m, documents: val }))} label="Documents" />
              <Switch checked={modules.hearings} onChange={(val) => setModules((m) => ({ ...m, hearings: val }))} label="Hearings Registry" />
              <Switch checked={modules.tasks} onChange={(val) => setModules((m) => ({ ...m, tasks: val }))} label="Task Dockets" />
              <Switch checked={modules.billing} onChange={(val) => setModules((m) => ({ ...m, billing: val }))} label="Invoices Billing" />
              <Switch checked={modules.calendar} onChange={(val) => setModules((m) => ({ ...m, calendar: val }))} label="Calendar" />
              <Switch checked={modules.aiWorkspace} onChange={(val) => setModules((m) => ({ ...m, aiWorkspace: val }))} label="AI Legal Assistant" />
            </div>
          </div>
        )}

        {step === 8 && (
          <div className="space-y-3 text-slate-300">
            <h3 className="font-bold text-white uppercase text-[10px] tracking-wider border-b border-slate-800 pb-2">Review Workspace Details</h3>
            <div className="grid grid-cols-2 gap-4 p-4 rounded-lg border border-slate-800 bg-slate-950/30">
              <div>
                <p className="text-slate-500 text-[10px] uppercase tracking-wider">Firm Name</p>
                <p className="font-bold text-white mt-0.5">{firmName || "Unspecified"}</p>
              </div>
              <div>
                <p className="text-slate-500 text-[10px] uppercase tracking-wider">Workspace URL</p>
                <p className="font-mono mt-0.5 text-blue-400">{subdomain ? `${subdomain.toLowerCase()}.lawstack.com` : "Unspecified"}</p>
              </div>
              <div>
                <p className="text-slate-500 text-[10px] uppercase tracking-wider">Admin Email</p>
                <p className="mt-0.5 font-semibold text-slate-200">{adminEmail || "Unspecified"}</p>
              </div>
              <div>
                <p className="text-slate-500 text-[10px] uppercase tracking-wider">Subscription Plan</p>
                <p className="mt-0.5 text-blue-400 font-bold">{plan}</p>
              </div>
              <div>
                <p className="text-slate-500 text-[10px] uppercase tracking-wider">Bar Number</p>
                <p className="mt-0.5 font-semibold text-slate-200">{barNumber || "Unspecified"}</p>
              </div>
              <div>
                <p className="text-slate-500 text-[10px] uppercase tracking-wider">Firm Size</p>
                <p className="mt-0.5 font-semibold text-slate-200">{firmSize}</p>
              </div>
            </div>
          </div>
        )}

        {step === 9 && (
          <div className="p-8 text-center space-y-4">
            <div className="mx-auto w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-emerald-400" />
            </div>
            <p className="font-bold text-sm text-white">Workspace Initialization Complete</p>
            <p className="text-slate-400 max-w-sm mx-auto leading-relaxed text-xs">
              Isolated database cluster provisioned. Bar credentials registered. Admin enrollment link dispatched to{" "}
              <span className="font-mono text-slate-300">{adminEmail || "the admin email"}</span>.
            </p>
            <div className="grid grid-cols-3 gap-2 max-w-md mx-auto mt-4">
              {[
                { icon: Database, label: "Namespace" },
                { icon: Lock, label: "RLS Enabled" },
                { icon: Shield, label: "MFA Required" },
              ].map((b) => {
                const Icon = b.icon;
                return (
                  <div key={b.label} className="rounded-lg border border-slate-800 bg-slate-950/40 p-3">
                    <Icon className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                    <div className="text-[10px] text-slate-400 font-semibold">{b.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Wizard Controls */}
        <div className="flex justify-between pt-5 mt-5 border-t border-slate-800">
          <Button variant="secondary" onClick={handlePrev} disabled={step === 1 || step === 9} leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}>
            Back
          </Button>
          {step === 8 ? (
            <Button variant="primary" onClick={handleNext} rightIcon={<Sparkles className="w-3.5 h-3.5" />}>
              Initiate Provisioning
            </Button>
          ) : step === 9 ? (
            <Button variant="primary" onClick={handleSubmit} rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              Complete setup
            </Button>
          ) : (
            <Button variant="primary" onClick={handleNext} rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              Next Step
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
