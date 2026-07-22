"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Breadcrumb, Button } from "@/components/ui";
import { MOCK_CLIENTS } from "@/mocks/clients";
import { Users, ArrowLeft, BookOpen, X } from "lucide-react";

export default function ClientDetailsLayout({ children, params }: { children: React.ReactNode; params: Promise<{ id: string }> }) {
  const { id } = React.use(params) as { id: string };
  const pathname = usePathname();
  const [showDeveloperGuide, setShowDeveloperGuide] = useState(false);

  const clientData = MOCK_CLIENTS.find((c) => c.id === id);

  if (!clientData) {
    return (
      <div className="p-8 text-center text-xs text-red-400">
        Error: Client profile ID "{id}" does not exist in directory database.
      </div>
    );
  }

  const tabs = [
    { name: "Overview", path: "overview" },
    { name: "Direct Client Messaging", path: "messages" },
    { name: "Matters", path: "matters" },
    { name: "Documents", path: "documents" },
    { name: "Billing", path: "billing" },
    { name: "Contacts", path: "contacts" },
    { name: "Activity", path: "activity" },
    { name: "AI Panel", path: "ai" },
    { name: "Notes", path: "notes" },
    { name: "Settings", path: "settings" }
  ];

  return (
    <div className="space-y-6">
      {/* Header Info Panel */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Clients", href: "/workspace/clients" }, { name: clientData.name }]} />
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">{clientData.name}</h1>
            </div>
            <p className="text-xs text-slate-400">Company: <strong className="text-slate-200">{clientData.companyName || "Personal Case"}</strong> • Email: {clientData.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              leftIcon={<BookOpen className="w-4 h-4" />}
              onClick={() => setShowDeveloperGuide(true)}
            >
              Developer Guide
            </Button>
            <Link href="/workspace/clients">
              <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors bg-slate-900 border border-slate-800 hover:border-slate-700 px-3 py-1.5 rounded-lg font-semibold">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Clients List</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Tab Links Row */}
        <div className="flex border-b border-slate-800 overflow-x-auto gap-2">
          {tabs.map((tab) => {
            const isSelected = pathname.endsWith(`/workspace/clients/${id}/${tab.path}`) || (tab.path === "overview" && pathname.endsWith(`/workspace/clients/${id}`));
            return (
              <Link
                key={tab.path}
                href={`/workspace/clients/${id}/${tab.path}`}
                className={`px-4 py-2 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors ${
                  isSelected ? "border-emerald-500 text-emerald-400 bg-emerald-500/5 font-bold" : "border-transparent text-slate-400 hover:text-white"
                }`}
              >
                {tab.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Tab Panels Contents */}
      <div className="bg-slate-900/30 border border-slate-800/80 rounded-xl p-5 md:p-6 min-h-[300px]">
        {children}
      </div>

      {/* Developer Guide Modal */}
      {showDeveloperGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
          <div className="w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 sticky top-0 bg-slate-900 z-10">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-emerald-400">Senior Advocate & Judicial Guidance</p>
                <h2 className="text-lg font-bold text-white">Client Profile Workspace — Developer Guide ({clientData.name})</h2>
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
                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  1. Core Purpose & Mandatory Overview
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs leading-relaxed space-y-3">
                  <div>
                    <strong className="text-white text-sm block mb-1">What it is:</strong>
                    <p className="text-slate-300">
                      This is the 360-degree Client Profile Workspace opened when an Advocate clicks the **Action button** ("Open Client Record") on any client row. It provides 10 sub-tabs for managing <strong className="text-white">{clientData.name}</strong> (Client ID: <code className="text-emerald-400">{id}</code>).
                    </p>
                  </div>
                  <div className="border-t border-slate-800/80 pt-2">
                    <strong className="text-white text-sm block mb-1">Why it is needed (Advocate's Perspective):</strong>
                    <p className="text-slate-400">
                      Managing client relationships in an Indian law firm requires strict statutory compliance and unified record-keeping:
                      <br />
                      • **DPDP Act 2023 Compliance:** Attorneys must manage digital data consent records and privacy preferences for each client.
                      <br />
                      • **BCI Rule 36 Compliance:** Direct client messaging occurs over a secure, closed-network invitation channel rather than open public forums.
                      <br />
                      • **Multi-Matter & Retainer Oversight:** A corporate client (e.g. Reliance Retail) may retain the firm across 12 different court cases. Advocates need a single hub to track all active matters, paid retainers, and pending invoices.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 2: Beginner Legal Glossary for Developers (Zero Legal Knowledge Required) */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  2. Client Management Concepts Explained for Software Engineers
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-3 leading-relaxed">
                  <p className="text-slate-300">
                    If you are a software developer with zero background in Indian legal systems, here are the essential terms used in this Client Workspace:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-300">
                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">1. Closed-Network Chat Channel</strong>
                      <p className="text-slate-400 text-[11px]">
                        A private, encrypted messaging portal (BCI Rule 36 compliant) restricted exclusively to the Advocate and invited client contacts.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">2. Retainer Deposit Ledger</strong>
                      <p className="text-slate-400 text-[11px]">
                        The advance fee paid by the client into the firm's trust ledger before work begins, drawn down as billable hours are logged.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">3. Corporate Entity vs Individual</strong>
                      <p className="text-slate-400 text-[11px]">
                        Corporate clients have multiple authorized signatories (CFOs, Legal Officers) in the Contacts tab, whereas Individual clients have a single profile.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">4. DPDP Consent Revocation</strong>
                      <p className="text-slate-400 text-[11px]">
                        Under DPDP Act 2023, a client can request data deletion or consent revocation when their court case is completed.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 3: 10 Sub-Tabs Breakdown */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  3. Complete Client Workspace Sub-Tabs Breakdown (10 Sub-Tabs)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      1. Overview (`/overview`)
                    </p>
                    <p className="text-slate-400">Primary client details: entity type, contact info, primary attorney assigned, DPDP Act consent status, and client portal status.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-blue-400" />
                      2. Direct Messaging (`/messages`)
                    </p>
                    <p className="text-slate-400">Closed-network BCI Rule 36 compliant chat channel between the advocate and client for secure file sharing and status updates.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-amber-400" />
                      3. Matters (`/matters`)
                    </p>
                    <p className="text-slate-400">List of all active and archived court cases and legal matters retaining this client.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-cyan-400" />
                      4. Documents (`/documents`)
                    </p>
                    <p className="text-slate-400">Client document vault: Retainer agreements, KYC identity documents, corporate articles, and shared petitions.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-teal-400" />
                      5. Billing (`/billing`)
                    </p>
                    <p className="text-slate-400">Financial ledger: retainer deposit balances, outstanding invoices, payments received, and trust account ledger.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-indigo-400" />
                      6. Contacts (`/contacts`)
                    </p>
                    <p className="text-slate-400">Directory of corporate officers, legal counsel, CFOs, and authorized representatives for corporate clients.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-purple-400" />
                      7. Activity (`/activity`)
                    </p>
                    <p className="text-slate-400">Real-time audit log of client portal logins, document downloads, message dispatches, and consent changes.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-red-400" />
                      8. AI Panel (`/ai`)
                    </p>
                    <p className="text-slate-400">AI Legal Copilot for summarizing client communication history, generating retainer briefs, and drafting client updates.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      9. Notes (`/notes`)
                    </p>
                    <p className="text-slate-400">Private advocate scratchpad notes, consultation memos, and privileged client briefing records.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-slate-400" />
                      10. Settings (`/settings`)
                    </p>
                    <p className="text-slate-400">Client portal access permissions, DPDP Act consent revocation settings, and automated WhatsApp alert preferences.</p>
                  </div>
                </div>
              </section>

              {/* Section 4: Backend API Checklist */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  4. Backend Developer API Checklist for Client Workspace
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-2">
                  <ul className="space-y-1.5 text-slate-300">
                    <li>• <strong className="text-white">Get Client Profile:</strong> <code className="text-blue-400">GET /api/clients/{id}</code></li>
                    <li>• <strong className="text-white">Get Client Matters:</strong> <code className="text-blue-400">GET /api/clients/{id}/matters</code></li>
                    <li>• <strong className="text-white">Get Client Invoices:</strong> <code className="text-blue-400">GET /api/clients/{id}/billing</code></li>
                    <li>• <strong className="text-white">Send Closed-Network Message:</strong> <code className="text-blue-400">POST /api/clients/{id}/messages</code></li>
                    <li>• <strong className="text-white">Update DPDP Consent:</strong> <code className="text-blue-400">PATCH /api/clients/{id}/dpdp-consent</code></li>
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


