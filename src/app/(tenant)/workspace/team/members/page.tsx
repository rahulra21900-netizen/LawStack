"use client";

import React, { useState } from "react";
import { Breadcrumb, Badge, Button } from "@/components/ui";
import { DataTable } from "@/components/tables";
import { MOCK_USERS } from "@/mocks/users";
import { Users, BookOpen, X } from "lucide-react";

export default function TeamMembersPage() {
  const [showDeveloperGuide, setShowDeveloperGuide] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Team", href: "/workspace/team" }, { name: "Members" }]} />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-500" />
            <span>Members Directory</span>
          </h1>
          <p className="text-xs text-slate-400">View Chandra & Associates associate clearances and permissions.</p>
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

      <DataTable
        title="Complete Employee Roster"
        data={MOCK_USERS}
        columns={[
          { header: "Associate Name", accessor: (u) => <span className="font-bold text-white">{u.name}</span> },
          { header: "Email Address", accessor: (u) => <span className="font-mono text-slate-400">{u.email}</span> },
          { header: "Administrative Role", accessor: (u) => <Badge label={u.role} variant="info" /> }
        ]}
      />

      {/* Developer Guide Modal */}
      {showDeveloperGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
          <div className="w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 sticky top-0 bg-slate-900 z-10">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-indigo-400">Senior Advocate & Judicial Guidance</p>
                <h2 className="text-lg font-bold text-white">Members Directory — Developer Guide</h2>
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
                      The Members Directory is the master roster listing all advocates, paralegals, partners, and administrative staff registered within the firm's tenant workspace.
                    </p>
                  </div>
                  <div className="border-t border-slate-800/80 pt-2">
                    <strong className="text-white text-sm block mb-1">Why it is needed (Advocate's Perspective):</strong>
                    <p className="text-slate-400">
                      Ensures compliance with Bar Council of India (BCI) advocate registration rules and multi-tenant Role-Based Access Control (RBAC) permissions (Senior Partner vs Associate vs Clerk).
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 2: Backend API Checklist */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  2. Backend Developer API Checklist
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-2">
                  <ul className="space-y-1 text-slate-300">
                    <li>• <strong className="text-white">List Members API:</strong> <code className="text-blue-400">GET /api/team/members</code></li>
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

