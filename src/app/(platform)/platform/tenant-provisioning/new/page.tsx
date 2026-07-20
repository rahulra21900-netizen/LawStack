"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useNotifications } from "@/hooks/useNotifications";
import { Breadcrumb, Button, Badge } from "@/components/ui";
import { Input, Select, Switch } from "@/components/forms";
import { ProvisioningService } from "@/services";
import { Shield, Building2, UserCheck, MapPin, CreditCard, Layers, CircleCheck as CheckCircle2, Sparkles, Check, ArrowRight, ArrowLeft, Globe, Lock, Database, Scale, LogIn, BookOpen, X } from "lucide-react";

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
  const [showDeveloperGuide, setShowDeveloperGuide] = useState(false);
  const [credentialErrors, setCredentialErrors] = useState({
    barNumber: "",
    stateBar: "",
    gstNum: "",
    panNum: "",
  });
  const [credentialStatus, setCredentialStatus] = useState<"idle" | "verified" | "failed">("idle");

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

  const validateCredentialFields = async (overrideValues?: { barNumber?: string; stateBar?: string; gstNum?: string; panNum?: string }) => {
    const result = await ProvisioningService.verifyCredentials({
      barNumber: overrideValues?.barNumber ?? barNumber,
      stateBar: overrideValues?.stateBar ?? stateBar,
      gstNum: overrideValues?.gstNum ?? gstNum,
      panNum: overrideValues?.panNum ?? panNum,
    });

    setCredentialErrors(result.errors);
    return result;
  };

  const updateCredentialError = (field: "barNumber" | "stateBar" | "gstNum" | "panNum", value: string) => {
    const nextErrors = { ...credentialErrors, [field]: "" };
    switch (field) {
      case "barNumber": {
        const barValue = value.trim().toUpperCase();
        if (!barValue) nextErrors.barNumber = "Bar council registration number is required.";
        else if (!/^[A-Z0-9/.-]{3,20}$/.test(barValue)) nextErrors.barNumber = "Enter a valid bar council registration number.";
        break;
      }
      case "stateBar": {
        if (!value.trim()) nextErrors.stateBar = "State bar council is required.";
        break;
      }
      case "gstNum": {
        const gstValue = value.trim().toUpperCase();
        if (gstValue && !/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/.test(gstValue)) {
          nextErrors.gstNum = "Enter a valid GSTIN number.";
        }
        break;
      }
      case "panNum": {
        const panValue = value.trim().toUpperCase();
        if (!panValue) nextErrors.panNum = "PAN number is required.";
        else if (!/^[A-Z]{5}\d{4}[A-Z]{1}$/.test(panValue)) nextErrors.panNum = "Enter a valid PAN number.";
        break;
      }
    }
    setCredentialErrors(nextErrors);
  };

  const handleVerifyCredentials = async () => {
    const result = await validateCredentialFields();
    setCredentialStatus(result.verified ? "verified" : "failed");
    if (result.verified) {
      addToast("Credentials verified", "The registration details look valid and can be used for onboarding.", "success");
    } else {
      addToast("Verification pending", "Please correct the highlighted fields before continuing.", "warning");
    }
  };

  const handleNext = async () => {
    if (step === 3 && credentialStatus !== "verified") {
      const result = await validateCredentialFields();
      if (!result.verified) {
        setCredentialStatus("failed");
        return;
      }
      setCredentialStatus("verified");
    }
    setStep((s) => Math.min(s + 1, 9));
  };
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
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-2xl shadow-slate-950/30">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <Breadcrumb items={[{ name: "Platform", href: "/platform/dashboard" }, { name: "Provisioning", href: "/platform/tenant-provisioning" }, { name: "New" }]} />
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/15 border border-blue-500/30">
                <Shield className="w-4 h-4 text-blue-400" />
              </span>
              <span>Tenant Provisioning Wizard</span>
            </h1>
            <p className="text-xs text-slate-400">Launch a new legal practice namespace with firm identity, admin access, plan selection, and compliant setup.</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDeveloperGuide(true)}
              className="flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 text-xs font-semibold text-slate-300 transition-colors hover:border-slate-700 hover:text-white"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Developer Guide</span>
            </button>
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2 text-right">
              <div className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Provisioning Portal</div>
              <div className="mt-1 flex items-center gap-2 text-sm font-semibold text-white">
                <Scale className="w-4 h-4 text-blue-400" />
                <span>LawStack SaaS Onboarding</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Steps indicators */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-lg shadow-slate-950/20">
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
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/20">
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
          <div className="space-y-4">
            <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
              <div className="mb-3 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-400" />
                <h3 className="text-sm font-semibold text-white">Choose practice type</h3>
              </div>
              <p className="text-xs text-slate-400">Select the workspace model that best fits the legal practice being onboarded.</p>
            </div>
            <Select
              label="Workspace Practice Classification"
              options={[
                { label: "Individual Advocate Room", value: "Individual Advocate" },
                { label: "Small Law Firm Suite", value: "Small Law Firm" },
              ]}
              value={wType}
              onChange={(e) => setWType(e.target.value)}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
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
          <div className="space-y-4">
            <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
              <div className="mb-3 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-semibold text-white">Firm identity and namespace</h3>
              </div>
              <p className="text-xs text-slate-400">Define the tenant name and the public workspace URL that will be used for the new practice.</p>
            </div>
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
          <div className="space-y-4">
            <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
              <div className="mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-violet-400" />
                <h3 className="text-sm font-semibold text-white">Regulatory credentials</h3>
              </div>
              <p className="text-xs text-slate-400">Capture the legal registrations and compliance identifiers required for the tenant profile.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Bar Council Reg. Number"
                value={barNumber}
                error={credentialErrors.barNumber}
                onChange={(e) => {
                  setBarNumber(e.target.value);
                  updateCredentialError("barNumber", e.target.value);
                }}
                placeholder="e.g. D/2026/8840"
              />
              <Input
                label="State Bar Council"
                value={stateBar}
                error={credentialErrors.stateBar}
                onChange={(e) => {
                  setStateBar(e.target.value);
                  updateCredentialError("stateBar", e.target.value);
                }}
              />
              <Input
                label="Firm GSTIN Number (Optional)"
                value={gstNum}
                error={credentialErrors.gstNum}
                onChange={(e) => {
                  setGstNum(e.target.value);
                  updateCredentialError("gstNum", e.target.value);
                }}
                placeholder="07AAAAA1111A1Z1"
              />
              <Input
                label="PAN Card Number"
                value={panNum}
                error={credentialErrors.panNum}
                onChange={(e) => {
                  setPanNum(e.target.value);
                  updateCredentialError("panNum", e.target.value);
                }}
                placeholder="ABCDE1234F"
              />
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
            <div className="flex flex-wrap items-center gap-3 rounded-lg border border-slate-800 bg-slate-950/40 p-3">
              <Button variant="secondary" onClick={handleVerifyCredentials}>
                Verify Details
              </Button>
              {credentialStatus === "verified" && (
                <span className="text-[11px] font-semibold text-emerald-400">Verification successful. You can continue.</span>
              )}
              {credentialStatus === "failed" && (
                <span className="text-[11px] font-semibold text-amber-400">Please correct the highlighted fields and verify again.</span>
              )}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
              <div className="mb-3 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-semibold text-white">Owner and admin access</h3>
              </div>
              <p className="text-xs text-slate-400">Create the primary administrative account for the new tenant and prepare MFA enrollment.</p>
            </div>
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
          <div className="space-y-4">
            <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
              <div className="mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-semibold text-white">Office location</h3>
              </div>
              <p className="text-xs text-slate-400">Add the operating address for the firm so the tenant profile is complete.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
              <Input label="State" value={state} onChange={(e) => setState(e.target.value)} />
              <Input label="City" value={city} onChange={(e) => setCity(e.target.value)} />
              <Input label="Office address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Connaught Place, Block E" />
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="space-y-4">
            <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
              <div className="mb-3 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-semibold text-white">Choose subscription plan</h3>
              </div>
              <p className="text-xs text-slate-400">Select the tier that matches the firm’s expected size, storage needs, and module requirements.</p>
            </div>
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
          <div className="space-y-4">
            <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
              <div className="mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-400" />
                <h3 className="text-sm font-semibold text-white">Enable practice modules</h3>
              </div>
              <p className="text-xs text-slate-400">Turn on the modules that the new tenant will use immediately after provisioning.</p>
            </div>
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
          <div className="space-y-4 text-slate-300">
            <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
              <div className="mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-semibold text-white">Review your provisioning setup</h3>
              </div>
              <p className="text-xs text-slate-400">Check every detail before the tenant is initialized and made available in the platform.</p>
            </div>
            <h3 className="font-bold text-white uppercase text-[10px] tracking-wider border-b border-slate-800 pb-2">Review Workspace Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg border border-slate-800 bg-slate-950/30">
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
            <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-emerald-400" />
            </div>
            <p className="font-bold text-sm text-white">Workspace Initialization Complete</p>
            <p className="text-slate-400 max-w-sm mx-auto leading-relaxed text-xs">
              The new tenant namespace is now ready for use. Bar credentials, admin access, and the selected modules have been prepared for the new practice environment.
            </p>
            <div className="mx-auto flex max-w-md items-center justify-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-[10px] uppercase tracking-[0.3em] text-emerald-300">
              <LogIn className="w-3.5 h-3.5" />
              <span>Admin credentials will be delivered to {adminEmail || "the admin email"}</span>
            </div>
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

      {showDeveloperGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
          <div className="w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-blue-400">Developer Guide</p>
                <h2 className="text-lg font-bold text-white">Provision Tenant Handoff Notes</h2>
              </div>
              <button
                onClick={() => setShowDeveloperGuide(false)}
                className="rounded-lg border border-slate-700 p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
                aria-label="Close developer guide"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-6 p-5 text-sm text-slate-300">
              <section>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">What this page is for</h3>
                <p>
                  This page is the tenant onboarding wizard for the platform. It should collect enough information to create a new tenant workspace, assign an admin user, define a subscription tier, and prepare the tenant for first use. The latest implementation should be paired with the provisioning service so credential verification, form validation, and final tenant creation stay consistent with the platform’s auth and tenant management flows.
                </p>
              </section>

              <section>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">What each step should do</h3>
                <div className="grid gap-3 md:grid-cols-2">
                  {[
                    {
                      title: "Step 1 – Type",
                      detail: "Let the admin choose whether the new workspace is for an individual advocate or a small law firm. This should set the initial tenant type and shape the experience for the rest of the form."
                    },
                    {
                      title: "Step 2 – Details",
                      detail: "Capture the firm practice name, display title, and subdomain. The subdomain should be used to build the tenant workspace URL such as https://subdomain.lawstack.com."
                    },
                    {
                      title: "Step 3 – Bar Credentials",
                      detail: "Collect the bar registration number, state bar council, GSTIN, PAN, practice year, and firm size. These values should be validated before the user proceeds."
                    },
                    {
                      title: "Step 4 – Admin",
                      detail: "Create the primary admin account for the tenant. The form should gather the admin name, email, mobile number, and password and prepare for MFA enrollment."
                    },
                    {
                      title: "Step 5 – Office",
                      detail: "Collect the office location details so the tenant profile is complete and ready for professional setup."
                    },
                    {
                      title: "Step 6 – Plan",
                      detail: "Allow the operator to choose a subscription plan such as Starter, Professional, or Enterprise. The selected plan should affect the billing and module assumptions for the tenant."
                    },
                    {
                      title: "Step 7 – Modules",
                      detail: "Let the admin decide which modules should be enabled for the tenant, such as cases, clients, documents, billing, calendar, and AI tools."
                    },
                    {
                      title: "Step 8 – Review",
                      detail: "Show a concise summary of the tenant information before provisioning. This should make it easy to verify that all important information is correct."
                    },
                    {
                      title: "Step 9 – Provision",
                      detail: "Show the final completion state and confirm that the workspace is ready. In the prototype, this should trigger a success toast and route the user back to the tenant administration list."
                    },
                  ].map((item) => (
                    <div key={item.title} className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                      <p className="mb-1 font-semibold text-white">{item.title}</p>
                      <p className="text-xs leading-5 text-slate-400">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">Field-by-field implementation logic</h3>
                <div className="space-y-3">
                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                    <p className="mb-2 font-semibold text-white">Firm Practice Name</p>
                    <p className="text-xs leading-5 text-slate-400">This should capture the legal entity name or practice name. It is the public-facing identity of the firm and should be stored as the tenant’s display name. It should be required and should appear in the review summary.</p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                    <p className="mb-2 font-semibold text-white">Workspace Display Title</p>
                    <p className="text-xs leading-5 text-slate-400">This is the friendly workspace name shown inside the product. It can be different from the legal firm name, so the developer should treat it as a separate field and store it independently.</p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                    <p className="mb-2 font-semibold text-white">Subdomain Namespace</p>
                    <p className="text-xs leading-5 text-slate-400">This should be lowercased, sanitized, and validated for URL-safe characters. The preview URL should update in real time and the final value should be used to build the tenant domain.</p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                    <p className="mb-2 font-semibold text-white">Bar Council Reg. Number</p>
                    <p className="text-xs leading-5 text-slate-400">This should be required and validated before the user can continue. In a real backend version, this can be verified against the bar council registry or a licensed compliance service for the relevant state.</p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                    <p className="mb-2 font-semibold text-white">State Bar Council</p>
                    <p className="text-xs leading-5 text-slate-400">This should be required and matched to the state or bar council that governs the practice. A real implementation can map this to the specific bar council registry for that state.</p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                    <p className="mb-2 font-semibold text-white">Firm GSTIN Number (Optional)</p>
                    <p className="text-xs leading-5 text-slate-400">This is optional. If filled, it should be validated with the GSTIN structure and, in a backend version, could be checked against the GST portal or a compliance lookup service.</p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                    <p className="mb-2 font-semibold text-white">Practice Starting Year</p>
                    <p className="text-xs leading-5 text-slate-400">This should be a simple year field. The developer should ensure it is numeric and within a reasonable range, such as 1900 to the current year.</p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                    <p className="mb-2 font-semibold text-white">Firm Size</p>
                    <p className="text-xs leading-5 text-slate-400">This should define how many attorneys or staff the tenant is expected to have. It can influence default seat allocations, module recommendations, and pricing assumptions.</p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                    <p className="mb-2 font-semibold text-white">PAN Card Number</p>
                    <p className="text-xs leading-5 text-slate-400">This should be required and validated using the standard PAN pattern. For a real backend integration, this can be verified via the Income Tax Department’s official systems or through a licensed KYC/compliance provider.</p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                    <p className="mb-2 font-semibold text-white">Primary Admin Name / Email / Mobile / Password</p>
                    <p className="text-xs leading-5 text-slate-400">These fields should create the tenant administrator account. The email should be validated, the phone should follow a reasonable phone format, and the password should be strong enough for onboarding. In a real implementation, the admin should receive a verification email or OTP.</p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                    <p className="mb-2 font-semibold text-white">Country / State / City / Office Address</p>
                    <p className="text-xs leading-5 text-slate-400">These fields should be stored as the tenant’s primary business address. In a future backend version, the developer can use a location service or geocoding API to validate and normalize them.</p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">How the developer can use this page</h3>
                <ul className="space-y-2">
                  <li><span className="font-semibold text-white">Where to find it:</span> the page lives in the tenant provisioning wizard route and should be treated as the onboarding screen for creating a new tenant.</li>
                  <li><span className="font-semibold text-white">How to implement it:</span> build the flow with React state, one step at a time, and keep the values in component state until the final provisioning step is complete.</li>
                  <li><span className="font-semibold text-white">How to make it production-ready:</span> replace mock validation with API calls to backend services that verify credentials, normalize address and legal identity fields, and create the tenant and admin identity together.</li>
                  <li><span className="font-semibold text-white">How to keep it consistent:</span> use the same visual hierarchy, card layout, and status UI across the dashboard, tenant management, auth flows, and provisioning screens.</li>
                </ul>
              </section>

              <section>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">How to verify Bar Council Reg. Number, PAN, and GSTIN from real data</h3>
                <ul className="space-y-2">
                  <li><span className="font-semibold text-white">Bar Council Reg. Number:</span> in a real system, this should be validated against the relevant State Bar Council registry or a licensed legal-identity verification provider. For India, the developer should check the official bar council website for the respective state and use a backend service or API integration if available.</li>
                  <li><span className="font-semibold text-white">PAN Card Number:</span> this can be verified against the Income Tax Department’s official systems or through a trusted KYC provider. A common backend approach is to call a compliance or eKYC partner service that validates PAN status and name matching.</li>
                  <li><span className="font-semibold text-white">GSTIN:</span> this can be validated against the GST portal or a GST verification service. In production, the developer should confirm that the GSTIN format and validation rules match the current government guidelines.</li>
                  <li><span className="font-semibold text-white">Recommended backend pattern:</span> send the values from the frontend to a backend endpoint, then call the third-party or official verification service, and return a structured response with status, matched name, and an error message.</li>
                </ul>
              </section>

              <section>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">Where the developer can look for APIs</h3>
                <ul className="space-y-2">
                  <li><span className="font-semibold text-white">Government / official sources:</span> check the official websites of the Income Tax Department, GST portal, and the relevant State Bar Council for any published APIs, portal access, or partner integration guidance.</li>
                  <li><span className="font-semibold text-white">Compliance / KYC providers:</span> use licensed identity verification providers for PAN, GSTIN, Aadhaar, and business verification if the product needs a fully reliable enterprise workflow.</li>
                  <li><span className="font-semibold text-white">Backend implementation idea:</span> create an internal endpoint such as /api/tenant/verify-credentials that receives the submitted values and returns a verification result.</li>
                </ul>
              </section>

              <section>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">What the Verify Details button should do</h3>
                <ul className="space-y-2">
                  <li><span className="font-semibold text-white">Frontend behavior:</span> it should validate the entered values locally and show inline errors when something is missing or malformed.</li>
                  <li><span className="font-semibold text-white">Backend behavior:</span> in a real implementation, it should call a backend verification endpoint for PAN, GSTIN, and bar council data and show the result to the user.</li>
                  <li><span className="font-semibold text-white">Success state:</span> when all verification checks pass, it should mark the credentials as verified and let the user continue.</li>
                  <li><span className="font-semibold text-white">Failure state:</span> if verification fails, it should keep the user on the same step and show clear reasons such as invalid PAN, unrecognized bar council number, or missing state council mapping.</li>
                </ul>
              </section>

              <section>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">Modules section</h3>
                <div className="space-y-3">
                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                    <p className="mb-2 font-semibold text-white">Configure Enabled Practice Modules</p>
                    <p className="text-xs leading-5 text-slate-400">This section should let the platform admin enable the modules that the tenant needs from the start. Each toggle should update the tenant’s initial module configuration, and the final review should show which modules are enabled.</p>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    {[
                      { title: "Cases Manager", detail: "Used for case lifecycle management and matter tracking." },
                      { title: "Documents", detail: "Used for document storage and legal document handling." },
                      { title: "Task Dockets", detail: "Used for workflow tasks, deadlines, and docket tracking." },
                      { title: "Calendar", detail: "Used for scheduling hearings, appointments, and deadlines." },
                      { title: "Clients Profiles", detail: "Used to manage client-related records and contact data." },
                      { title: "Hearings Registry", detail: "Used for hearing scheduling, status, and case-linked events." },
                      { title: "Invoices Billing", detail: "Used for billing, invoices, and subscription-related financial records." },
                      { title: "AI Legal Assistant", detail: "Used for AI-driven legal help, document support, and drafting assistance." },
                    ].map((item) => (
                      <div key={item.title} className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                        <p className="mb-1 font-semibold text-white">{item.title}</p>
                        <p className="text-xs leading-5 text-slate-400">{item.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">Implementation notes for developers</h3>
                <ul className="space-y-2">
                  <li><span className="font-semibold text-white">Frontend-only:</span> keep this as a prototype experience using local state and mock data.</li>
                  <li><span className="font-semibold text-white">State handling:</span> keep all form values in component state so the wizard can move between steps smoothly.</li>
                  <li><span className="font-semibold text-white">Toast feedback:</span> show success and warning feedback as the flow progresses.</li>
                  <li><span className="font-semibold text-white">UI direction:</span> keep the design polished, legal-focused, and structured like a secure onboarding workflow.</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
