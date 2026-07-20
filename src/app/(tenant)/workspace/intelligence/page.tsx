"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useSimulation } from "@/providers/SimulationProvider";
import { Breadcrumb, Badge, Button } from "@/components/ui";
import { MetricCard, Card } from "@/components/cards";
import {
  AlertTriangle,
  ArrowRight,
  BrainCircuit,
  CalendarClock,
  Clock3,
  DatabaseZap,
  FileSearch,
  Link2,
  Mail,
  MessageSquareText,
  ScanText,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  BookOpen,
  Copy,
  Check,
  Scale,
  Building,
} from "lucide-react";
import { useNotifications } from "@/hooks/useNotifications";

const BNS_CONCORDANCE_DB: Record<
  string,
  {
    bnsSection: string;
    bnsTitle: string;
    ambiguityFlag: boolean;
    ambiguityReason?: string;
    mpHcFootnote: string;
    delhiHcFootnote: string;
  }
> = {
  "ipc 302": {
    bnsSection: "BNS Section 103(1)",
    bnsTitle: "Punishment for Murder",
    ambiguityFlag: false,
    mpHcFootnote: "See Sec. 103(1), Bharatiya Nyaya Sanhita, 2023 (corresponding to legacy Sec. 302, Indian Penal Code, 1860).",
    delhiHcFootnote: "1. Sec. 103(1), Bharatiya Nyaya Sanhita, 2023 [formerly Sec. 302, IPC].",
  },
  "ipc 420": {
    bnsSection: "BNS Section 318(4)",
    bnsTitle: "Cheating and dishonestly inducing delivery of property",
    ambiguityFlag: true,
    ambiguityReason: "⚠️ Ambiguity Flag: IPC 420 is split in BNS. Sub-section (2) governs simple cheating; Sub-section (4) governs cheating with property delivery. Confirm charge sheet sub-clause.",
    mpHcFootnote: "See Sec. 318(4), Bharatiya Nyaya Sanhita, 2023 (corresponding to legacy Sec. 420, Indian Penal Code, 1860).",
    delhiHcFootnote: "1. Sec. 318(4), Bharatiya Nyaya Sanhita, 2023 [formerly Sec. 420, IPC].",
  },
  "crpc 154": {
    bnsSection: "BNSS Section 173",
    bnsTitle: "Information in cognizable cases & Zero FIR",
    ambiguityFlag: false,
    mpHcFootnote: "See Sec. 173, Bharatiya Nagarik Suraksha Sanhita, 2023 (corresponding to legacy Sec. 154, Code of Criminal Procedure, 1973).",
    delhiHcFootnote: "1. Sec. 173, Bharatiya Nagarik Suraksha Sanhita, 2023 [formerly Sec. 154, CrPC].",
  },
  "ipc 376": {
    bnsSection: "BNS Section 64 / Section 70",
    bnsTitle: "Punishment for Rape & Gang Rape",
    ambiguityFlag: true,
    ambiguityReason: "⚠️ Redefined: Aggravated gang rape and offences against minors are split into BNS 64, 65, and 70. Please verify victim category.",
    mpHcFootnote: "See Sec. 64 & 70, Bharatiya Nyaya Sanhita, 2023 (corresponding to legacy Sec. 376, Indian Penal Code, 1860).",
    delhiHcFootnote: "1. Sec. 64 / 70, Bharatiya Nyaya Sanhita, 2023 [formerly Sec. 376, IPC].",
  },
  "ipc 437": {
    bnsSection: "BNSS Section 480",
    bnsTitle: "Bail in non-bailable offences (Magistrate discretion)",
    ambiguityFlag: true,
    ambiguityReason: "🚨 CITATION ERROR WARNING (Ram Case Study): Section 437 applies to non-bailable bail before a Magistrate. If seeking anticipatory bail prior to arrest, cite Section 438 (BNSS 482) instead!",
    mpHcFootnote: "See Sec. 480, Bharatiya Nagarik Suraksha Sanhita, 2023.",
    delhiHcFootnote: "1. Sec. 480, BNSS 2023 [formerly Sec. 437, CrPC].",
  },
  "ipc 438": {
    bnsSection: "BNSS Section 482",
    bnsTitle: "Direction for grant of bail to person apprehending arrest (Anticipatory Bail)",
    ambiguityFlag: false,
    mpHcFootnote: "See Sec. 482, Bharatiya Nagarik Suraksha Sanhita, 2023 (Anticipatory Bail).",
    delhiHcFootnote: "1. Sec. 482, BNSS 2023 [formerly Sec. 438, CrPC].",
  },
  "contract 38": {
    bnsSection: "Indian Contract Act Sec 38",
    bnsTitle: "Effect of refusal to accept offer of performance",
    ambiguityFlag: true,
    ambiguityReason: "🚨 CITATION WARNING (Priya Case Study): Section 38 applies to undisclosed principals/refusal of performance. For specific performance of contract disputes, cite Sections 12 & 13 instead!",
    mpHcFootnote: "See Sec. 38, Indian Contract Act, 1872.",
    delhiHcFootnote: "1. Sec. 38, Contract Act.",
  },
  "contract 12": {
    bnsSection: "Indian Contract Act Sec 12 & 13",
    bnsTitle: "Specific Performance & Mutual Consent",
    ambiguityFlag: false,
    mpHcFootnote: "See Sec. 12 & 13, Indian Contract Act, 1872.",
    delhiHcFootnote: "1. Sec. 12-13, Contract Act.",
  },
};

const courtSyncItems = [
  { name: "Madhya Pradesh High Court (Jabalpur)", status: "Synced 4 mins ago · CNR MP-HC-2026-0042", severity: "good" },
  { name: "Delhi High Court e-Filing Portal", status: "3 new hearing notices retrieved", severity: "warning" },
  { name: "Bombay High Court & District Cause-Lists", status: "Updated 18 mins ago · eCourts / NJDG Feed", severity: "good" },
];

export default function IntelligencePage() {
  const { activeTenant } = useSimulation();
  const { addToast } = useNotifications();

  // IPC -> BNS Lookup State
  const [legacyInput, setLegacyInput] = useState("ipc 420");
  const [copiedFootnote, setCopiedFootnote] = useState(false);

  // CNR Lookup State
  const [cnrInput, setCnrInput] = useState("MPHC010049212026");
  const [cnrResult, setCnrResult] = useState<any>(null);
  const [cnrLoading, setCnrLoading] = useState(false);

  // Defect Checker State
  const [defectSummary, setDefectSummary] = useState<string | null>(null);

  const matchedBns = useMemo(() => {
    const key = legacyInput.trim().toLowerCase();
    return BNS_CONCORDANCE_DB[key] || null;
  }, [legacyInput]);

  const handleFetchCnr = () => {
    if (!cnrInput.trim()) return;
    setCnrLoading(true);
    setTimeout(() => {
      setCnrLoading(false);
      setCnrResult({
        cnr: cnrInput.toUpperCase(),
        court: "High Court of Madhya Pradesh (Jabalpur Bench)",
        caseTitle: "Acme Infra vs. State of MP & Ors.",
        caseNumber: "WP-8840/2026",
        stage: "Admission / Hearing",
        nextDate: "2026-08-12 · 10:30 AM",
        judge: "Hon. Justice R.K. Verma",
        lastOrder: "Notice issued to respondent No. 1 & 2. Reply to be filed within 3 weeks.",
      });
      addToast("eCourts Sync Complete", `Fetched CNR ${cnrInput.toUpperCase()} from NJDG live feed.`, "success");
    }, 600);
  };

  const runDefectCheck = () => {
    setDefectSummary("3 High Court formatting defects flagged: 1. Missing advocate bar enrolment stamp on page 3. 2. Indexing margin violates Delhi HC 2026 rules. 3. Verification clause date unsealed.");
  };

  const handleCopyFootnote = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFootnote(true);
    addToast("Footnote Copied", "Formatted High Court citation copied to clipboard.", "info");
    setTimeout(() => setCopiedFootnote(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Intelligence Center" }]} />
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <BrainCircuit className="w-6 h-6 text-blue-400" />
            <span>Indian Legal Intelligence Suite</span>
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            IPC/CrPC → BNS/BNSS criminal code concordance, eCourts CNR auto-fetcher, and High Court defect scanner for {activeTenant.name}.
          </p>
        </div>
        <Badge label="BNS 2023 & eCourts 3.0 Ready" variant="success" />
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <MetricCard title="Concordance DB" value="IPC → BNS" trend="up" change="2023 Enactments" info="100% Mapped" />
        <MetricCard title="eCourts NJDG Sync" value="98%" trend="up" change="Live Feed" info="MP, Delhi, Bombay" />
        <MetricCard title="Filing Defect Rules" value="High Courts" trend="neutral" change="2026 Manuals" info="Delhi & Bombay" />
        <MetricCard title="BCI Rule 36 Portal" value="Invite-Only" trend="up" change="No Public Touting" info="Compliant" />
      </div>

      {/* Main Grid: IPC->BNS Concordance & CNR eCourts Fetcher */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* Section 4.11 Differentiator 1: IPC/CrPC -> BNS/BNSS Converter */}
        <Card
          header={
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-white">IPC/CrPC → BNS/BNSS Criminal Law Concordance</span>
              </div>
              <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded font-mono font-semibold">
                Section 4.11 Feature
              </span>
            </div>
          }
        >
          <div className="space-y-4">
            <p className="text-xs text-slate-400">
              Type a legacy section number (e.g. <span className="font-mono text-amber-400 cursor-pointer" onClick={() => setLegacyInput("IPC 302")}>IPC 302</span>, <span className="font-mono text-amber-400 cursor-pointer" onClick={() => setLegacyInput("IPC 420")}>IPC 420</span>, <span className="font-mono text-amber-400 cursor-pointer" onClick={() => setLegacyInput("CrPC 154")}>CrPC 154</span>, <span className="font-mono text-amber-400 cursor-pointer" onClick={() => setLegacyInput("IPC 376")}>IPC 376</span>) to view its Bharatiya Nyaya Sanhita equivalent, ambiguity flags, and High Court citation footnotes.
            </p>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                value={legacyInput}
                onChange={(e) => setLegacyInput(e.target.value)}
                placeholder="Try 'IPC 420' or 'CrPC 154'..."
                className="w-full rounded-lg border border-slate-800 bg-slate-950/60 py-2.5 pl-10 pr-3 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-500/50"
              />
            </div>

            {matchedBns ? (
              <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-emerald-400">{matchedBns.bnsSection}</span>
                  <Badge variant={matchedBns.ambiguityFlag ? "warning" : "success"}>
                    {matchedBns.bnsTitle}
                  </Badge>
                </div>

                {matchedBns.ambiguityFlag && (
                  <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-300">
                    {matchedBns.ambiguityReason}
                  </div>
                )}

                {/* High Court Citation Footnote Generator */}
                <div className="pt-2 border-t border-slate-800 space-y-2 text-xs">
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                    High Court Citation Footnote Formatter
                  </span>

                  <div className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 flex items-center justify-between text-slate-300 font-mono text-[11px]">
                    <span className="truncate pr-2">{matchedBns.mpHcFootnote}</span>
                    <button
                      onClick={() => handleCopyFootnote(matchedBns.mpHcFootnote)}
                      className="p-1 text-amber-400 hover:text-white shrink-0"
                      title="Copy MP High Court Footnote"
                    >
                      {copiedFootnote ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-slate-800/80 bg-slate-950/40 p-4 text-center text-xs text-slate-500">
                Type an old code section like <strong>IPC 302</strong>, <strong>IPC 420</strong>, or <strong>CrPC 154</strong> to search the concordance index.
              </div>
            )}
          </div>
        </Card>

        {/* Module 3: AI Landmark Precedent & Judgment Assistant (Priya Case Study Feature) */}
        <Card
          header={
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white">AI Landmark Precedent & Judgment Assistant</span>
              </div>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-mono font-semibold">
                Case Law Auto-Finder
              </span>
            </div>
          }
        >
          <div className="space-y-4 text-xs">
            <p className="text-slate-400">
              Automated Supreme Court & High Court judgment retriever. Prevents missed precedents during litigation (e.g. Contract Specific Performance or Anticipatory Bail).
            </p>

            <div className="space-y-2">
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">Rajesh Masrani v. Tech Corp (2018 SC 412)</span>
                  <Badge label="Landmark Precedent" variant="success" size="sm" />
                </div>
                <p className="text-slate-400 text-[11px]">
                  <strong>Subject:</strong> Specific Performance & Injunction Under Indian Contract Act Sec 12-13.
                </p>
                <p className="text-emerald-400 font-mono text-[10px] bg-emerald-950/30 p-1.5 rounded border border-emerald-500/20">
                  Ratio: Held that interim relief and damages can be claimed simultaneously without waiving specific performance rights.
                </p>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">Gurbaksh Singh Sibbia v. State of Punjab (1980 SC 1632)</span>
                  <Badge label="Constitutional Bench" variant="info" size="sm" />
                </div>
                <p className="text-slate-400 text-[11px]">
                  <strong>Subject:</strong> Anticipatory Bail Guidelines under CrPC 438 / BNSS 482.
                </p>
                <p className="text-blue-400 font-mono text-[10px] bg-blue-950/30 p-1.5 rounded border border-blue-500/20">
                  Ratio: Anticipatory bail cannot be limited by time duration unless special circumstances exist.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Section 4.7: eCourts / NJDG CNR Case Fetcher */}
        <Card
          header={
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DatabaseZap className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-bold text-white">eCourts / NJDG CNR Direct Case Fetcher</span>
              </div>
              <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded font-mono font-semibold">
                Section 4.7 Feature
              </span>
            </div>
          }
        >
          <div className="space-y-4">
            <p className="text-xs text-slate-400">
              Enter a 16-digit CNR case number to fetch real-time docket status, judge assignments, and cause lists directly from eCourts & NJDG.
            </p>

            <div className="flex gap-2">
              <input
                value={cnrInput}
                onChange={(e) => setCnrInput(e.target.value)}
                placeholder="e.g. MPHC010049212026"
                className="w-full rounded-lg border border-slate-800 bg-slate-950/60 p-2.5 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 font-mono"
              />
              <Button variant="primary" onClick={handleFetchCnr} isLoading={cnrLoading} className="shrink-0">
                Fetch Status
              </Button>
            </div>

            {cnrResult && (
              <div className="rounded-xl border border-blue-500/20 bg-blue-600/5 p-4 space-y-3 text-xs">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-bold text-white text-sm block">{cnrResult.caseTitle}</span>
                    <span className="text-[10px] text-blue-400 font-mono">{cnrResult.cnr} · {cnrResult.caseNumber}</span>
                  </div>
                  <Badge variant="info">{cnrResult.stage}</Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                  <div>
                    <span className="text-slate-500 block text-[9px] uppercase font-bold">Court & Forum</span>
                    <span className="text-slate-200 font-semibold">{cnrResult.court}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[9px] uppercase font-bold">Next Hearing Date</span>
                    <span className="text-emerald-400 font-semibold">{cnrResult.nextDate}</span>
                  </div>
                </div>

                <div className="text-[11px]">
                  <span className="text-slate-500 block text-[9px] uppercase font-bold mb-0.5">Bench / Presiding Judge</span>
                  <span className="text-slate-300 font-semibold">{cnrResult.judge}</span>
                </div>

                <div className="text-[11px] bg-slate-900 p-2.5 rounded border border-slate-800/80">
                  <span className="text-slate-400 block text-[9px] font-bold uppercase mb-1">Latest Order Sheet Excerpt</span>
                  <p className="text-slate-300 italic">"{cnrResult.lastOrder}"</p>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Row 2: High Court Defect Checker & Court Data Feed Status */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* Section 4.11 Differentiator 3: Automatic Filing Defect Checker */}
        <Card
          header={
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span className="text-xs font-bold text-white">High Court Automatic Filing Defect Scanner</span>
              </div>
              <span className="text-[10px] bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded font-mono font-semibold">
                Delhi & Bombay HC Manuals
              </span>
            </div>
          }
        >
          <div className="space-y-3">
            <textarea
              rows={4}
              className="w-full rounded-lg border border-slate-800 bg-slate-950/60 p-3 text-xs text-slate-200 placeholder-slate-500"
              placeholder="Paste draft petition or court filing to scan against High Court registry rules..."
              defaultValue="IN THE HIGH COURT OF DELHI AT NEW DELHI. Writ Petition (Civil) No. 402/2026. Memorandum of parties submitted without advocate bar enrolment stamp and unsealed verification."
            />
            <Button variant="primary" onClick={runDefectCheck} leftIcon={<ShieldCheck className="w-4 h-4" />}>
              Scan for Filing Defects
            </Button>
            {defectSummary && (
              <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-300 space-y-1">
                <span className="font-bold block">Defect Scanner Result:</span>
                <p>{defectSummary}</p>
              </div>
            )}
          </div>
        </Card>

        {/* Section 4.7: Live Court Data Sync Feeds */}
        <Card
          header={
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-white">Active High Court & District Feed Connections</span>
            </div>
          }
        >
          <div className="space-y-2">
            {courtSyncItems.map((item) => (
              <div key={item.name} className="rounded-lg border border-slate-800 bg-slate-950/40 p-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-white">{item.name}</p>
                  <Badge label={item.severity === "good" ? "Healthy" : "Alert"} variant={item.severity === "good" ? "success" : "warning"} />
                </div>
                <p className="mt-1 text-[10px] text-slate-500">{item.status}</p>
              </div>
            ))}
          </div>
        </Card>

      </div>
    </div>
  );
}
