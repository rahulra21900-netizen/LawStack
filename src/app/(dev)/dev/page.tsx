"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSimulation } from "@/providers/SimulationProvider";
import { useTheme } from "@/providers/ThemeProvider";
import { useNotifications } from "@/providers/NotificationProvider";
import { MOCK_USERS } from "@/mocks/users";
import { MOCK_ROLES } from "@/mocks/roles";
import { MOCK_TENANTS } from "@/mocks/tenants";
import { MOCK_CASES } from "@/mocks/cases";
import { MOCK_CLIENTS } from "@/mocks/clients";
import { MOCK_DOCUMENTS } from "@/mocks/documents";
import {
  UserCheck,
  Building,
  Database,
  Layers,
  ToggleLeft,
  Compass,
  Terminal,
  Sun,
  Moon,
  Sparkles,
  Play,
  FileText,
  AlertCircle,
  Eye,
  Clock,
} from "lucide-react";
import {
  SuccessBanner,
  ErrorBanner,
  WarningBanner,
  InfoBanner,
  StatusBadge,
  ProgressIndicator,
  ToastContainer,
} from "@/components/feedback";
import {
  SkeletonCard,
  SkeletonTable,
  SkeletonForm,
} from "@/components/loading";
import {
  NoData,
  NoSearchResults,
  NoNotifications,
  NoAiHistory,
} from "@/components/empty-states";

// Design System Imports
import { Button, Avatar, Badge, Breadcrumb, Accordion } from "@/components/ui";
import { Input, Textarea, Select, Switch } from "@/components/forms";
import { Card, MetricCard } from "@/components/cards";
import { DataTable } from "@/components/tables";
import { Modal, Drawer } from "@/components/dialogs";

function DeveloperSimulatorContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = searchParams.get("tab") || "role";

  const {
    activeUser,
    activeRole,
    activeTenant,
    featureFlags,
    setActiveUser,
    setActiveRole,
    setActiveTenant,
    toggleFeatureFlag,
  } = useSimulation();

  const { theme, setTheme } = useTheme();
  const { addToast } = useNotifications();

  const [isLoadingDemo, setIsLoadingDemo] = useState(false);
  const [demoProgress, setDemoProgress] = useState(45);
  
  // Gallery control states
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [switchVal, setSwitchVal] = useState(true);
  const [formName, setFormName] = useState("");
  const [formText, setFormText] = useState("");

  const setTab = (tabName: string) => {
    router.push(`/dev?tab=${tabName}`);
  };

  const triggerMockDelay = () => {
    setIsLoadingDemo(true);
    setTimeout(() => {
      setIsLoadingDemo(false);
      addToast("Ledger Loaded", "Simulated database rows retrieved successfully.", "success");
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Toast popups container */}
      <ToastContainer />

      {/* Page Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Terminal className="w-6 h-6 text-amber-500" />
            <span>Developer Sandbox & Simulator</span>
          </h1>
          <p className="text-xs text-slate-400">
            Sprint 1 Blueprint verification panel. Monitor theme variables, active roles, and feature flags.
          </p>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="flex border-b border-slate-800 overflow-x-auto gap-2">
        {[
          { id: "role", label: "Role Simulator", icon: UserCheck },
          { id: "tenant", label: "Tenant Simulator", icon: Building },
          { id: "mockdata", label: "Mock Data Browser", icon: Database },
          { id: "components", label: "Component Gallery", icon: Layers },
          { id: "flags", label: "Feature Flags", icon: ToggleLeft },
          { id: "explorer", label: "Registry Explorer", icon: Compass },
        ].map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 text-xs font-semibold whitespace-nowrap transition-colors focus:outline-none ${
                isSelected
                  ? "border-amber-500 text-amber-400 bg-amber-500/5"
                  : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 md:p-6 min-h-[350px]">
        {/* Tab 1: Role Simulator */}
        {activeTab === "role" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-sm font-bold text-white mb-1">Simulate User Personas</h2>
              <p className="text-xs text-slate-400">Selecting a persona updates the active session user, primary role, and scope.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Select Preset User Persona</h3>
                <div className="space-y-2">
                  {MOCK_USERS.map((user) => {
                    const isSelected = activeUser.id === user.id;
                    return (
                      <button
                        key={user.id}
                        onClick={() => {
                          setActiveUser(user as any);
                          addToast("Persona Switched", `Simulated user profile loaded for ${user.name}.`, "info");
                        }}
                        className={`w-full text-left p-3 rounded-lg border text-xs flex justify-between items-center transition-all ${
                          isSelected
                            ? "bg-amber-500/10 border-amber-500 text-white font-bold"
                            : "bg-slate-950/40 border-slate-800 text-slate-300 hover:border-slate-700"
                        }`}
                      >
                        <div>
                          <p>{user.name}</p>
                          <p className="text-[10px] text-slate-500 mt-0.5">{user.email}</p>
                        </div>
                        <span className={`text-[9px] px-2 py-0.5 rounded font-semibold ${
                          isSelected ? "bg-amber-500 text-slate-950" : "bg-slate-800 text-slate-400"
                        }`}>
                          {user.role}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Specific Role override */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Simulate Specific Role Override</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {MOCK_ROLES.map((role) => {
                    const isSelected = activeRole === role.name;
                    return (
                      <button
                        key={role.id}
                        onClick={() => {
                          setActiveRole(role.name);
                          addToast("Role Overridden", `Assigned simulated permissions clearance: ${role.name}.`, "warning");
                        }}
                        className={`text-left p-3 rounded-lg border text-xs transition-all ${
                          isSelected
                            ? "bg-amber-500/10 border-amber-500 text-white font-bold"
                            : "bg-slate-950/40 border-slate-800 text-slate-300 hover:border-slate-700"
                        }`}
                      >
                        <p className="font-semibold">{role.name}</p>
                        <p className="text-[9px] text-slate-500 mt-1 capitalize">Scope: {role.scope}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Tenant Simulator */}
        {activeTab === "tenant" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-sm font-bold text-white mb-1">Simulate Tenant Contexts</h2>
              <p className="text-xs text-slate-400">Switching tenants isolates document access, theme indicators, and configuration flags.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-semibold">Active Tenant Selector</h3>
                <div className="space-y-2">
                  {MOCK_TENANTS.map((tenant) => {
                    const isSelected = activeTenant.id === tenant.id;
                    return (
                      <button
                        key={tenant.id}
                        onClick={() => {
                          setActiveTenant(tenant);
                          addToast("Tenant Switch", `Workspace set to ${tenant.name}.`, "success");
                        }}
                        className={`w-full text-left p-3.5 rounded-lg border text-xs flex justify-between items-center transition-all ${
                          isSelected
                            ? "bg-amber-500/10 border-amber-500 text-white font-bold"
                            : "bg-slate-950/40 border-slate-800 text-slate-300 hover:border-slate-700"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: tenant.primaryColor }} />
                          <div>
                            <p className="font-bold">{tenant.name}</p>
                            <p className="text-[9px] text-slate-500 mt-0.5 font-mono">{tenant.subdomain}.lawstack.com</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase block ${
                            tenant.status === "Active" ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
                          }`}>
                            {tenant.status}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Branding and theme preview */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Dynamic Branding Preview</h3>
                <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full animate-pulse" style={{ backgroundColor: activeTenant.primaryColor }} />
                    <span className="text-sm font-semibold text-white">Active Branding Palette</span>
                  </div>
                  <div className="h-8 rounded-lg flex items-center justify-center text-[10px] font-bold text-white uppercase tracking-wider" style={{ backgroundColor: activeTenant.primaryColor }}>
                    Primary Color: {activeTenant.primaryColor}
                  </div>
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs space-y-1.5">
                    <p className="text-slate-400">Simulated styling updates class layouts automatically. Tenant scope is isolated dynamically.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Mock Data Browser */}
        {activeTab === "mockdata" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-sm font-bold text-white mb-1">Mock Database Browser</h2>
              <p className="text-xs text-slate-400">Directly inspect active state objects that populate the front-end prototype.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                <p className="text-xs font-bold text-slate-300 flex items-center gap-1">
                  <Building className="w-4 h-4 text-blue-500" />
                  <span>Cases ({MOCK_CASES.length})</span>
                </p>
                <div className="overflow-y-auto max-h-60 space-y-1">
                  {MOCK_CASES.map(c => (
                    <div key={c.id} className="p-2 bg-slate-900 rounded text-[10px] text-slate-400">
                      <p className="font-bold text-white truncate">{c.title}</p>
                      <p className="mt-0.5">{c.caseNumber} • Lead: {c.leadCounsel}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                <p className="text-xs font-bold text-slate-300 flex items-center gap-1">
                  <UserCheck className="w-4 h-4 text-emerald-500" />
                  <span>Clients ({MOCK_CLIENTS.length})</span>
                </p>
                <div className="overflow-y-auto max-h-60 space-y-1">
                  {MOCK_CLIENTS.map(cl => (
                    <div key={cl.id} className="p-2 bg-slate-900 rounded text-[10px] text-slate-400">
                      <p className="font-bold text-white">{cl.name}</p>
                      <p className="mt-0.5">{cl.companyName || "Personal"} • {cl.email}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                <p className="text-xs font-bold text-slate-300 flex items-center gap-1">
                  <FileText className="w-4 h-4 text-indigo-500" />
                  <span>Documents ({MOCK_DOCUMENTS.length})</span>
                </p>
                <div className="overflow-y-auto max-h-60 space-y-1">
                  {MOCK_DOCUMENTS.map(doc => (
                    <div key={doc.id} className="p-2 bg-slate-900 rounded text-[10px] text-slate-400">
                      <p className="font-bold text-white truncate">{doc.title}</p>
                      <p className="mt-0.5">{doc.type} • v{doc.version} • {doc.status}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Component Gallery */}
        {activeTab === "components" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-sm font-bold text-white mb-1">Design System Component Previews</h2>
              <p className="text-xs text-slate-400">Test states of reusable buttons, inputs, selects, cards, tables, and dialog overlays.</p>
            </div>

            {/* Breadcrumb & Avatars */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">1. Core UI Elements</h3>
              <Breadcrumb items={[{ name: "Developer" }, { name: "Simulator" }, { name: "Design Gallery" }]} />
              <div className="flex items-center gap-4 flex-wrap">
                <Avatar name={activeUser.name} isOnline size="lg" />
                <div className="flex gap-2">
                  <Badge label="Active Tenant" variant="success" />
                  <Badge label="Platform Tier" variant="info" />
                  <Badge label="Pending Signature" variant="warning" />
                </div>
              </div>
            </div>

            {/* Accordion Example */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">2. Expandable Accordions</h3>
              <Accordion
                items={[
                  { title: "Docket Rule 210 Filing Schedule", content: "Under court rule 210, affidavits must be compiled within 14 business days of initial dockets." },
                  { title: "AI Assistant Context Limits", content: "The current LLM partition processes up to 128k context tokens with strict isolation." }
                ]}
              />
            </div>

            {/* Interactive Buttons */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">3. Interactive Buttons</h3>
              <div className="flex gap-3 flex-wrap">
                <Button variant="primary" onClick={() => addToast("Primary Clicked", "Action execution triggered.", "success")}>Primary</Button>
                <Button variant="secondary" onClick={() => addToast("Secondary Clicked", "Secondary action triggered.", "info")}>Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive" onClick={() => addToast("Warning", "Dangerous operation requested.", "warning")}>Destructive</Button>
                <Button variant="primary" isLoading>Loading State</Button>
              </div>
            </div>

            {/* Form Inputs Showcase */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">4. Form Inputs & Switches</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Simulated Client Name"
                  placeholder="Enter company name..."
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                />
                <Select
                  label="Practice Jurisdiction"
                  options={[
                    { label: "New York Federal", value: "ny" },
                    { label: "NCLT Mumbai", value: "de" },
                    { label: "California Superior", value: "ca" }
                  ]}
                  onChange={(e) => addToast("Jurisdiction Selected", `Scope updated to ${e.target.value}.`, "info")}
                />
                <Textarea
                  label="Matter Brief Notes"
                  placeholder="Write draft overview..."
                  value={formText}
                  onChange={(e) => setFormText(e.target.value)}
                />
                <div className="flex flex-col justify-end gap-3 pb-2">
                  <Switch
                    checked={switchVal}
                    onChange={(val) => {
                      setSwitchVal(val);
                      addToast("Toggle Switch", `System value is now ${val ? "ON" : "OFF"}.`, "info");
                    }}
                    label="Toggle Active Session Log"
                  />
                </div>
              </div>
            </div>

            {/* Cards & Metric Cards */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">5. Cards & Metrics</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <MetricCard title="Billable Hours YTD" value="1,842.5" change="+12% from Q1" trend="up" />
                <MetricCard title="Outstanding Balances" value="₹12,450.00" change="-4% paid down" trend="down" />
                <Card header={<div className="font-bold text-white text-xs">Simulated Case Card</div>}>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Arc Reactor Patents file is in active discovery stage with pending tasks assignees.
                  </p>
                </Card>
              </div>
            </div>

            {/* Interactive Data Table */}
            <div className="space-y-3">
              <DataTable
                title="DataTable Preview: Simulated Client List"
                data={MOCK_CLIENTS}
                columns={[
                  { header: "Client Name", accessor: (c) => <span className="font-bold text-white">{c.name}</span> },
                  { header: "Company", accessor: (c) => <span>{c.companyName || "Individual"}</span> },
                  { header: "Email", accessor: (c) => <span className="font-mono text-slate-400">{c.email}</span> },
                  { header: "Status", accessor: (c) => <Badge label={c.status} variant={c.status === "Active" ? "success" : "neutral"} /> }
                ]}
              />
            </div>

            {/* Modals & Overlay triggers */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">6. Dialogs, Modals, & Drawers</h3>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setModalOpen(true)}>Launch Overlay Modal</Button>
                <Button variant="outline" onClick={() => setDrawerOpen(true)}>Launch Right Drawer</Button>
              </div>

              {/* Modal Component */}
              <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Interactive Modal Dialog">
                <div className="space-y-3 text-xs">
                  <p className="text-slate-400 leading-relaxed">
                    This modal dialog box runs using direct component state triggers. Use it to showcase overlays, confirmation boxes, or warning fallbacks.
                  </p>
                  <div className="flex justify-end gap-2 pt-2">
                    <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
                    <Button variant="primary" onClick={() => { setModalOpen(false); addToast("Confirmed", "Modal form saved.", "success"); }}>Confirm Action</Button>
                  </div>
                </div>
              </Modal>

              {/* Drawer Component */}
              <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} title="Active Matter Log">
                <div className="space-y-4 text-xs">
                  <p className="text-slate-400 leading-relaxed">
                    This right-anchored side drawer holds detailed activity logs or context sidebars.
                  </p>
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg space-y-1">
                    <p className="font-bold text-white">Event Log #9042</p>
                    <p className="text-[10px] text-slate-500">Priya Chandra edited brief documents.</p>
                  </div>
                  <Button variant="secondary" className="w-full mt-4" onClick={() => setDrawerOpen(false)}>Close Panel</Button>
                </div>
              </Drawer>
            </div>
          </div>
        )}

        {/* Tab 5: Feature Flags */}
        {activeTab === "flags" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-sm font-bold text-white mb-1">Simulated Feature Flags</h2>
              <p className="text-xs text-slate-400">Toggle features instantly. Verify how layouts behave when custom modules are turned off/on.</p>
            </div>

            <div className="space-y-3">
              {featureFlags.map((flag) => (
                <div key={flag.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                  <div className="space-y-1 pr-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-xs">{flag.name}</span>
                      <span className="text-[9px] font-mono bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded text-slate-400">{flag.id}</span>
                    </div>
                    <p className="text-[10px] text-slate-400">{flag.description}</p>
                  </div>
                  <button
                    onClick={() => {
                      toggleFeatureFlag(flag.id);
                      addToast("Flag Toggled", `Feature "${flag.name}" is now ${!flag.enabled ? "Active" : "Inactive"}.`, "warning");
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      flag.enabled
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25"
                        : "bg-red-500/10 text-red-400 border border-red-500/25"
                    }`}
                  >
                    {flag.enabled ? "Active / Enabled" : "Inactive / Disabled"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 6: Registry Explorer */}
        {activeTab === "explorer" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-sm font-bold text-white mb-1">Registry Explorer</h2>
              <p className="text-xs text-slate-400">Inspect system layout mappings, theme status indicators, and general developer notes.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Theme & Layout Inspector */}
              <div className="space-y-4 bg-slate-950 p-4 border border-slate-800 rounded-xl">
                <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Active Context & Theme Inspector</h3>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between border-b border-slate-900 pb-1.5">
                    <span className="text-slate-500">Active Theme</span>
                    <span className="text-white font-bold capitalize">{theme}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-900 pb-1.5">
                    <span className="text-slate-500">Active User Persona</span>
                    <span className="text-white font-bold">{activeUser.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-900 pb-1.5">
                    <span className="text-slate-500">Active Role Scope</span>
                    <span className="text-white font-bold">{activeRole}</span>
                  </div>
                  <div className="flex justify-between pb-1.5">
                    <span className="text-slate-500">Theme Switcher Controls</span>
                    <div className="flex gap-1.5">
                      <button onClick={() => setTheme("light")} className="p-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white" title="Light Mode">
                        <Sun className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => setTheme("dark")} className="p-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white" title="Dark Mode">
                        <Moon className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Developer notes */}
              <div className="space-y-3 bg-slate-950 p-4 border border-slate-800 rounded-xl text-xs leading-relaxed text-slate-400">
                <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Developer Architectural Notes</h3>
                <p>
                  LawStack V2 utilizes Next.js App Router route grouping structure: <code>(public)</code>, <code>(platform)</code>, <code>(tenant)</code>, <code>(client)</code>, and <code>(dev)</code>.
                </p>
                <p>
                  All state changes are driven by React context selectors. Real-time updates immediately propagate styling color blocks and navigation item visibility permissions.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DeveloperSimulator() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-slate-500 font-semibold">Loading sandbox controls...</div>}>
      <DeveloperSimulatorContent />
    </Suspense>
  );
}
