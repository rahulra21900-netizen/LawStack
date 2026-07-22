"use client";

import React, { useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { Breadcrumb, Button, Badge } from "@/components/ui";
import { DataTable } from "@/components/tables";
import { MOCK_KNOWLEDGE_ARTICLES } from "@/mocks/knowledge";
import { BookOpen, Plus, Star, Clock, TrendingUp, X } from "lucide-react";
import { MetricCard } from "@/components/cards";

export default function KnowledgeBasePage() {
  const { addToast } = useNotifications();
  const [showDeveloperGuide, setShowDeveloperGuide] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Knowledge Base" }]} />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/15 border border-indigo-500/30">
              <BookOpen className="w-4 h-4 text-indigo-400" />
            </span>
            <span>Firm Knowledge Base</span>
          </h1>
          <p className="text-xs text-slate-400">Access research, Supreme Court rules summaries, and precedents libraries.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDeveloperGuide(true)}
            className="border-indigo-500/40 text-indigo-300 hover:bg-indigo-500/10"
            leftIcon={<BookOpen className="h-4 w-4" />}
          >
            Developer Guide
          </Button>
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => addToast("Create Precedent Article", "Content editor template opened.", "info")}
          >
            New Article
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Articles" value={MOCK_KNOWLEDGE_ARTICLES.length} info="Published" trend="up" />
        <MetricCard title="Categories" value="6" info="Practice areas" trend="neutral" />
        <MetricCard title="Favorites" value="24" info="Bookmarked" trend="up" />
        <MetricCard title="Views (30d)" value="412" info="Read" trend="up" change="+18%" />
      </div>

      <DataTable
        title="Shared Knowledge Base Precedents"
        data={MOCK_KNOWLEDGE_ARTICLES}
        columns={[
          { header: "Article Title", accessor: (a) => <span className="font-bold text-white">{a.title}</span> },
          { header: "Category", accessor: (a) => <Badge label={a.category.replace(/_/g, ' ')} variant="info" /> },
          { header: "Author", accessor: (a) => <span className="font-semibold text-slate-300">{a.author}</span> },
          { header: "Content Sneak Peek", accessor: (a) => <p className="text-slate-400 truncate max-w-sm">{a.content}</p> },
          { header: "Last Updated", accessor: (a) => <span className="text-[10px] text-slate-500 font-mono">{a.lastUpdated}</span> }
        ]}
      />

      {/* Developer Guide Modal */}
      {showDeveloperGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
          <div className="w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 sticky top-0 bg-slate-900 z-10">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-indigo-400">Senior Advocate & Judicial Guidance</p>
                <h2 className="text-lg font-bold text-white">Firm Knowledge Base & Precedents Library — Developer Guide</h2>
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
                      The Firm Knowledge Base is the internal digital legal encyclopedia housing Supreme Court judgment summaries, BNS/BNSS transition guides, High Court filing manuals, and landmark precedent ratio analyses.
                    </p>
                  </div>
                  <div className="border-t border-slate-800/80 pt-2">
                    <strong className="text-white text-sm block mb-1">Why it is needed (Senior Advocate & Judicial Officer's Perspective):</strong>
                    <p className="text-slate-400">
                      Law practices rely on accumulated institutional legal knowledge:
                      <br />
                      • <strong>Knowledge Retention Across Advocate Ranks:</strong> Senior Advocates hold decades of trial strategy. Junior associates and interns need a central internal repository to quickly access landmark precedents without reinventing legal research for every new case brief.
                      <br />
                      • <strong>Standardized Practice Manuals:</strong> Houses office notes on BNS/BNSS statutory transitions, High Court registry filing compliance checklists, and standard operating procedures for court appearances.
                      <br />
                      • <strong>Preserving Firm Wisdom:</strong> Ensures legal research and case ratio summaries remain preserved when partners retire or associates transition.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 2: Beginner Legal Glossary for Developers (Zero Legal Knowledge Required) */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  2. Indian Law Knowledge Concepts Explained for Software Engineers
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-3 leading-relaxed">
                  <p className="text-slate-300">
                    If you are a software developer with zero background in law firm knowledge management, here are the key concepts:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-300">
                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">1. Ratio Decidendi Summary</strong>
                      <p className="text-slate-400 text-[11px]">
                        Distilled legal principle or core holding of a Supreme Court or High Court judgment stored for internal reference.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">2. Practice Manual & Filing Guide</strong>
                      <p className="text-slate-400 text-[11px]">
                        Internal firm documentation detailing registry rules, stamp duty rates, and court submission checklists.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">3. Precedent Repository</strong>
                      <p className="text-slate-400 text-[11px]">
                        Curated library of landmark judgments categorized by practice area (e.g. Constitutional Law, Commercial Suits, Criminal Bail, Tax Appeals).
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">4. Article Bookmarking / Favorites Roster</strong>
                      <p className="text-slate-400 text-[11px]">
                        Ability for advocates to pin frequently cited precedents and filing notes to their personal dashboard.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 3: Component Breakdown */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  3. Complete Component & Feature Breakdown
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-indigo-400" />
                      1. Metric Cards (4 Cards)
                    </p>
                    <p className="text-slate-400">Displays counts for <strong className="text-slate-200">Articles Published</strong>, <strong className="text-slate-200">Practice Area Categories</strong>, <strong className="text-slate-200">Favorites Count</strong>, and <strong className="text-slate-200">30d Views</strong>.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      2. New Article Trigger Button
                    </p>
                    <p className="text-slate-400">Launches markdown content editor for partners to publish new precedent ratio summaries or office notes.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5 col-span-1 md:col-span-2">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-purple-400" />
                      3. Shared Precedents Data Table
                    </p>
                    <p className="text-slate-400">DataTable displaying Article Title, Practice Area Category Badge, Author Advocate Name, Content Preview Sneak Peek, and Last Updated Timestamp.</p>
                  </div>
                </div>
              </section>

              {/* Section 4: Navigation & Button Actions Map */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  4. Button Actions & Interactive Controls Navigation Map
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                        <th className="pb-2">UI Action</th>
                        <th className="pb-2">Behavior</th>
                        <th className="pb-2">Target Action / Route</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300">
                      <tr>
                        <td className="py-2 font-semibold text-white">New Article Button</td>
                        <td className="py-2">Opens article authoring editor modal</td>
                        <td className="py-2 font-mono text-indigo-400">Article Editor</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Section 5: Backend API Checklist */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  5. Backend Developer API Checklist
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-2">
                  <ul className="space-y-1.5 text-slate-300">
                    <li>• <strong className="text-white">List Knowledge Articles:</strong> <code className="text-blue-400">GET /api/knowledge/articles</code></li>
                    <li>• <strong className="text-white">Publish New Article:</strong> <code className="text-blue-400">POST /api/knowledge/articles</code></li>
                    <li>• <strong className="text-white">Bookmark / Favorite Article:</strong> <code className="text-blue-400">POST /api/knowledge/articles/[id]/favorite</code></li>
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

