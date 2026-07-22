"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BellRing,
  Briefcase,
  ChevronRight,
  ClipboardList,
  Gavel,
  Mic,
  MicOff,
  Radio,
  Scale,
  ShieldAlert,
  Signal,
  Sparkles,
  Timer,
  WifiOff,
  BookOpen,
  X,
} from "lucide-react";

/**
 * Court Mode — mobile-first, offline-friendly companion for advocates in courtrooms.
 * Public route (no auth wall). Designed for a phone in portrait, but graceful on desktop.
 */

const causeList = [
  {
    id: "cl-1",
    caseTitle: "State v. Rakesh Sharma",
    caseNumber: "CRLM.A. 4382/2026",
    court: "Delhi HC · Court No. 24",
    hearingType: "Anticipatory Bail Arguments",
    time: "10:30",
    status: "next", // next, upcoming, done, adjourned
    minutesAway: 42,
    seniorRequired: true,
    section: "BNSS §482",
  },
  {
    id: "cl-2",
    caseTitle: "Reliance Retail v. QuickCart",
    caseNumber: "CS(COMM) 942/2026",
    court: "Delhi HC · Court No. 8 (IP Div)",
    hearingType: "Interim Injunction",
    time: "11:45",
    status: "upcoming",
    minutesAway: 117,
    seniorRequired: false,
    section: "Trade Marks Act §29(4)",
  },
  {
    id: "cl-3",
    caseTitle: "Durga Prasad v. Nova Motors India",
    caseNumber: "CC/2026/0742",
    court: "State Consumer Commission, Lucknow",
    hearingType: "Evidence Framing",
    time: "14:15",
    status: "upcoming",
    minutesAway: 267,
    seniorRequired: false,
    section: "Consumer Protection Act §35",
  },
  {
    id: "cl-0",
    caseTitle: "In re Oakwood Estates",
    caseNumber: "CP(CAA) 118/2026",
    court: "NCLT Mumbai",
    hearingType: "Scheme approval",
    time: "09:15",
    status: "adjourned",
    minutesAway: -30,
    seniorRequired: false,
    section: "Companies Act §230",
  },
];

const quickNotes = [
  { id: "qn-1", time: "09:52", text: "Opposing counsel arrived; carrying additional affidavit — request certified copy." },
  { id: "qn-2", time: "09:48", text: "Bench in a good mood — Justice Kumar mentioned Sibbia precedent voluntarily." },
];

const statusColor: Record<string, string> = {
  next: "border-amber-500/60 bg-amber-500/10",
  upcoming: "border-slate-800 bg-slate-950/60",
  done: "border-emerald-500/40 bg-emerald-500/5 opacity-70",
  adjourned: "border-red-500/40 bg-red-500/10",
};

const statusChip: Record<string, string> = {
  next: "bg-amber-500 text-slate-950",
  upcoming: "bg-slate-800 text-slate-300",
  done: "bg-emerald-500/20 text-emerald-300",
  adjourned: "bg-red-500/20 text-red-300",
};

export default function CourtMode() {
  const [now, setNow] = useState<string>("--:--");
  const [isOnline, setIsOnline] = useState(true);
  const [recording, setRecording] = useState(false);
  const [notes, setNotes] = useState(quickNotes);
  const [clashOpen, setClashOpen] = useState(false);
  const [showDeveloperGuide, setShowDeveloperGuide] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const nextHearing = useMemo(() => causeList.find((c) => c.status === "next"), []);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setNow(
        d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false })
      );
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!recording) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [recording]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  const addNote = (text: string) => {
    const time = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false });
    setNotes((prev) => [{ id: `qn-${Date.now()}`, time, text }, ...prev]);
  };

  const stopRecording = () => {
    if (seconds > 0) {
      addNote(`Voice memo captured (${mm}:${ss}). Auto-transcript pending sync.`);
    }
    setRecording(false);
    setSeconds(0);
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-slate-950 text-white overflow-hidden">
      {/* Top bar */}
      <header className="shrink-0 flex items-center justify-between px-4 py-3 border-b border-slate-900 bg-slate-950/95 backdrop-blur">
        <Link href="/workspace/dashboard" className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 hover:text-white" data-testid="court-mode-back">
          <ArrowLeft className="w-3.5 h-3.5" />
          Exit Court Mode
        </Link>

        <div className="flex items-center gap-2.5 text-[10px]">
          <button
            onClick={() => setShowDeveloperGuide(true)}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-blue-500/40 bg-blue-500/10 text-blue-300 text-[10px] font-bold uppercase tracking-wider hover:bg-blue-500/20 transition-colors"
          >
            <BookOpen className="w-3 h-3" />
            Guide
          </button>
          <span className="font-mono font-bold text-white text-sm tabular-nums">{now}</span>
          <button
            onClick={() => setIsOnline((v) => !v)}
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[9px] font-bold uppercase tracking-wider ${
              isOnline
                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                : "border-slate-700 bg-slate-900 text-slate-400"
            }`}
            title="Toggle simulated connectivity"
            data-testid="court-mode-connectivity-toggle"
          >
            {isOnline ? <Signal className="w-2.5 h-2.5" /> : <WifiOff className="w-2.5 h-2.5" />}
            {isOnline ? "Live" : "Offline"}
          </button>
        </div>
      </header>

      {/* Mobile-shaped canvas centered on desktop */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-md px-4 py-4 space-y-4">
          {/* Hero: next hearing countdown */}
          {nextHearing && (
            <section
              className="relative overflow-hidden rounded-3xl border border-amber-500/40 bg-gradient-to-br from-amber-950/60 via-slate-950 to-slate-950 p-5 shadow-xl shadow-amber-900/20"
              data-testid="court-mode-next-hearing"
            >
              <div className="flex items-center gap-2 text-[10px] font-bold text-amber-300 uppercase tracking-[0.2em]">
                <Gavel className="w-3.5 h-3.5" />
                Up Next
              </div>

              <h1 className="mt-2 font-serif text-2xl font-bold leading-tight tracking-tight">
                {nextHearing.caseTitle}
              </h1>
              <p className="mt-1 text-[11px] font-mono text-slate-400">{nextHearing.caseNumber} · CNR live</p>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
                  <div className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">In</div>
                  <div className="mt-1 text-3xl font-extrabold tabular-nums text-amber-300">{nextHearing.minutesAway}<span className="text-sm text-slate-400 ml-1">min</span></div>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
                  <div className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Court</div>
                  <div className="mt-1 text-xs font-semibold text-white leading-tight">{nextHearing.court}</div>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3 col-span-2">
                  <div className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Purpose</div>
                  <div className="mt-0.5 text-sm text-white">{nextHearing.hearingType}</div>
                  <div className="text-[10px] text-slate-400 font-mono mt-1">{nextHearing.section}</div>
                </div>
              </div>

              {/* Big red clash button */}
              <button
                onClick={() => setClashOpen(true)}
                className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-900/40 border border-red-400/40 active:scale-[0.98] transition-transform"
                data-testid="court-mode-clash-btn"
              >
                <ShieldAlert className="w-4 h-4" />
                Flag Clash / Escalate Bench
              </button>
            </section>
          )}

          {/* Voice memo capture */}
          <section
            className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5 shadow-xl shadow-slate-950/40"
            data-testid="court-mode-voice-memo"
          >
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
              <Radio className="w-3.5 h-3.5 text-emerald-400" />
              Voice Memo
            </div>

            <div className="mt-3 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-white">
                  {recording ? "Recording…" : "Tap to capture note"}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  Auto-transcribed &amp; attached to the active matter
                </div>
              </div>
              <button
                onClick={() => (recording ? stopRecording() : setRecording(true))}
                className={`w-14 h-14 rounded-full inline-flex items-center justify-center border-2 transition-all active:scale-95 ${
                  recording
                    ? "bg-red-600 border-red-300 shadow-lg shadow-red-900/40 animate-pulse"
                    : "bg-emerald-600 border-emerald-300 shadow-lg shadow-emerald-900/40"
                }`}
                data-testid="court-mode-record-btn"
                aria-label={recording ? "Stop recording" : "Start recording"}
              >
                {recording ? <MicOff className="w-6 h-6 text-white" /> : <Mic className="w-6 h-6 text-white" />}
              </button>
            </div>

            {recording && (
              <div className="mt-3 flex items-center justify-between rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-mono">
                <span className="text-red-300 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                  REC
                </span>
                <span className="text-white tabular-nums">{mm}:{ss}</span>
              </div>
            )}
          </section>

          {/* Cause list */}
          <section
            className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5"
            data-testid="court-mode-cause-list"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                <ClipboardList className="w-3.5 h-3.5 text-blue-400" />
                Today's Cause List
              </div>
              <span className="text-[9px] text-slate-500 font-mono">
                {isOnline ? "Synced 30s ago" : "Cached · will sync when online"}
              </span>
            </div>

            <div className="mt-3 space-y-2">
              {causeList.map((c) => (
                <div
                  key={c.id}
                  className={`rounded-2xl border p-3 ${statusColor[c.status]} transition-colors`}
                  data-testid={`court-mode-cause-${c.id}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-xs font-bold text-white tabular-nums">{c.time}</span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${statusChip[c.status]}`}>
                          {c.status}
                        </span>
                        {c.seniorRequired && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/25">
                            Senior
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm font-semibold text-white leading-tight truncate">{c.caseTitle}</p>
                      <p className="text-[10px] text-slate-400 font-mono truncate">{c.caseNumber}</p>
                      <p className="text-[10px] text-slate-500 truncate">{c.court}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-600 shrink-0 mt-1" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Live notes feed */}
          <section
            className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5"
            data-testid="court-mode-live-notes"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                Live Notes
              </div>
              <button
                onClick={() => addNote("Quick tag: bench observation logged.")}
                className="text-[10px] text-blue-400 font-semibold uppercase tracking-wider"
                data-testid="court-mode-add-note-btn"
              >
                + Quick tag
              </button>
            </div>

            <div className="mt-3 space-y-2 max-h-[220px] overflow-y-auto pr-1">
              {notes.length === 0 && (
                <p className="text-[11px] text-slate-500 italic">No live notes yet. Tap the mic or add a quick tag.</p>
              )}
              {notes.map((n) => (
                <div key={n.id} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3 space-y-1">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-slate-500">{n.time}</span>
                  <p className="text-[12px] text-slate-200 leading-relaxed">{n.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Footer meta */}
          <div className="pb-4 pt-2 text-center text-[9px] font-mono uppercase tracking-wider text-slate-600">
            LawStack Court Mode · Optimised for court corridors on 4G
          </div>
        </div>
      </div>

      {/* Clash confirmation sheet */}
      {clashOpen && (
        <div className="absolute inset-0 z-40 flex items-end justify-center bg-slate-950/60 backdrop-blur-sm" onClick={() => setClashOpen(false)}>
          <div
            className="w-full max-w-md rounded-t-3xl border-t border-l border-r border-slate-800 bg-slate-950 p-5 space-y-3"
            onClick={(e) => e.stopPropagation()}
            data-testid="court-mode-clash-sheet"
          >
            <div className="mx-auto h-1 w-10 rounded-full bg-slate-800" />
            <div className="flex items-center gap-2 text-red-400">
              <ShieldAlert className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-[0.2em]">Escalate this matter</span>
            </div>
            <p className="text-xs text-slate-300">
              Notify Adv. <strong>Priya Chandra</strong> and Adv. <strong>Rohan Deshpande</strong> that senior support is
              required at <strong>Delhi HC · Court No. 24</strong> in the next 45 minutes.
            </p>

            <div className="grid grid-cols-3 gap-2 text-[10px]">
              <button className="rounded-xl border border-blue-500/40 bg-blue-500/10 px-2 py-2 text-blue-300 font-bold uppercase tracking-wider" data-testid="court-mode-clash-whatsapp">WhatsApp</button>
              <button className="rounded-xl border border-slate-800 bg-slate-900 px-2 py-2 text-slate-300 font-bold uppercase tracking-wider" data-testid="court-mode-clash-sms">SMS</button>
              <button className="rounded-xl border border-slate-800 bg-slate-900 px-2 py-2 text-slate-300 font-bold uppercase tracking-wider" data-testid="court-mode-clash-call">Call</button>
            </div>

            <button
              onClick={() => setClashOpen(false)}
              className="w-full rounded-2xl bg-gradient-to-r from-red-600 to-red-500 px-4 py-3 text-sm font-bold text-white active:scale-[0.98]"
              data-testid="court-mode-clash-confirm"
            >
              Dispatch Escalation
            </button>
            <button
              onClick={() => setClashOpen(false)}
              className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs font-semibold text-slate-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Developer Guide Modal */}
      {showDeveloperGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
          <div className="w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 sticky top-0 bg-slate-900 z-10">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-amber-400">Senior Advocate & Judicial Guidance</p>
                <h2 className="text-lg font-bold text-white">Court Mode — Mobile Companion Implementation Guide</h2>
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
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  1. Core Purpose & Mandatory Overview
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs leading-relaxed space-y-3">
                  <div>
                    <strong className="text-white text-sm block mb-1">What it is:</strong>
                    <p className="text-slate-300">
                      Court Mode is a high-contrast, mobile-first companion web page designed specifically for Advocates standing inside busy Indian courtrooms or court corridors holding their mobile phone in one hand.
                    </p>
                  </div>
                  <div className="border-t border-slate-800/80 pt-2">
                    <strong className="text-white text-sm block mb-1">Why it is needed (Advocate's Perspective):</strong>
                    <p className="text-slate-400">
                      Indian court corridors (e.g. Delhi High Court, Tis Hazari, Bombay High Court) present extreme real-world challenges for lawyers:
                      <br />
                      • **Weak Internet Signal:** Court basements and thick stone walls frequently block 4G/5G mobile signals. Advocates need an **offline-first** mode cached in browser memory (`IndexedDB`).
                      <br />
                      • **Rapid Item Changes:** Item numbers move fast. Advocates need a large countdown timer showing when their case is called.
                      <br />
                      • **Courtroom Clashes:** An Advocate might have Item #14 in Courtroom 4 and Item #18 in Courtroom 12 at the exact same time. They need a 1-tap emergency **Flag Clash** button to send WhatsApp alerts to colleagues for a pass-over.
                      <br />
                      • **Voice Notes Between Arguments:** Advocates don't have time to type on a keyboard while running between courts. They need a 1-tap **Voice Memo Recorder** to record judge remarks.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 2: Beginner Legal Glossary for Developers (Zero Legal Knowledge Required) */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  2. Courtroom Corridor Concepts Explained for Software Engineers
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-3 leading-relaxed">
                  <p className="text-slate-300">
                    If you are a software developer with zero background in Indian legal systems, here are the essential concepts you need to know to build this page:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-300">
                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">1. Item Number</strong>
                      <p className="text-slate-400 text-[11px]">
                        Cases are listed sequentially on the courtroom door (e.g. Item #1 to #60). The court crier calls out item numbers in order.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">2. Courtroom Clash</strong>
                      <p className="text-slate-400 text-[11px]">
                        When an Advocate's cases are called simultaneously in two different courtrooms, requiring instant escalation to a partner or clerk for a pass-over.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">3. Pass-Over Request</strong>
                      <p className="text-slate-400 text-[11px]">
                        Asking the presiding judge to skip a case temporarily and call it later in the afternoon when senior counsel arrives.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">4. Voice Dictation Memo</strong>
                      <p className="text-slate-400 text-[11px]">
                        Advocates record 15-second audio notes immediately after stepping out of court to capture oral directions given by the judge.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 3: Feature Breakdown */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  3. Complete Feature & Component Breakdown
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      1. Top Bar & Simulated Offline Switch
                    </p>
                    <p className="text-slate-400"><strong className="text-slate-200">Exit Court Mode:</strong> Redirects back to <code className="text-blue-400">/workspace/dashboard</code>.<br /><strong className="text-slate-200">Digital Clock:</strong> Displays live time in HH:MM format.<br /><strong className="text-slate-200">Connectivity Toggle:</strong> Switches simulated network mode (<span className="text-emerald-400 font-semibold">Live</span> vs <span className="text-slate-400 font-semibold">Offline</span>).</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-amber-400" />
                      2. Up Next Hearing Countdown Card
                    </p>
                    <p className="text-slate-400"><strong className="text-slate-200">Hero Card:</strong> Displays the case scheduled up next (<code className="text-amber-300">status: "next"</code>).<br /><strong className="text-slate-200">Countdown:</strong> Shows exact minutes away (e.g. <span className="text-amber-300 font-bold">42 min</span>).<br /><strong className="text-slate-200">Details:</strong> Shows case title, CNR number, court room, purpose, and legal section (e.g. BNSS §482).</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-red-400" />
                      3. Flag Clash / Escalate Bench Sheet
                    </p>
                    <p className="text-slate-400">A big red emergency button. When pressed, it opens a sheet allowing the advocate to dispatch WhatsApp, SMS, or Direct Call alerts to senior colleagues when two court hearings clash simultaneously.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      4. One-Tap Voice Memo Recorder
                    </p>
                    <p className="text-slate-400">Large circular microphone button. Tapping starts audio recording with a live timer (<code className="text-red-300">mm:ss</code>). Stopping the recording saves a voice memo note with simulated speech-to-text auto-transcription.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-blue-400" />
                      5. Today's Cause List
                    </p>
                    <p className="text-slate-400">Daily court schedule list. Displays status chips (<span className="text-amber-400 font-semibold">next</span>, <span className="text-slate-300 font-semibold">upcoming</span>, <span className="text-emerald-400 font-semibold">done</span>, <span className="text-red-400 font-semibold">adjourned</span>), hearing time, court room, and <code className="text-blue-300">Senior Required</code> tags.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-purple-400" />
                      6. Live Notes Feed
                    </p>
                    <p className="text-slate-400">Timestamped feed of quick notes taken by the lawyer during court arguments. Includes a <strong className="text-white">+ Quick tag</strong> button for instant logging of bench remarks or opposing counsel statements.</p>
                  </div>
                </div>
              </section>

              {/* Section 4: Navigation Map */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  4. Button Actions & Interactive Controls
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-2">
                  <ul className="space-y-2 text-slate-300">
                    <li><strong className="text-white font-semibold">Exit Court Mode:</strong> Redirects to workspace dashboard (<code className="text-blue-400">/workspace/dashboard</code>).</li>
                    <li><strong className="text-white font-semibold">Offline / Live Toggle:</strong> Simulates network status state (<code className="text-emerald-400">isOnline</code> flag).</li>
                    <li><strong className="text-white font-semibold">Flag Clash / Escalate Bench Button:</strong> Opens the emergency escalation modal sheet.</li>
                    <li><strong className="text-white font-semibold">Mic Record Button:</strong> Toggles Web MediaRecorder audio capture state.</li>
                    <li><strong className="text-white font-semibold">+ Quick Tag Button:</strong> Appends a new timestamped note entry to state.</li>
                  </ul>
                </div>
              </section>

              {/* Section 5: Technical Architecture */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  5. Technical & Offline Architecture
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-2">
                  <p><strong className="text-white">Offline-First Storage:</strong> Uses browser <code className="text-blue-300">IndexedDB</code> / <code className="text-blue-300">localStorage</code> to cache today's cause list so lawyers can view their schedule in courtroom basements without mobile network signal.</p>
                  <p><strong className="text-white">Web MediaRecorder API:</strong> Uses browser native audio recording for voice memos, which syncs to backend speech-to-text API upon network re-connection.</p>
                </div>
              </section>

              {/* Section 6: Backend API Checklist */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  6. Backend Developer API Checklist
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-2">
                  <ul className="space-y-1.5 text-slate-300">
                    <li>• <strong className="text-white">Cause List API:</strong> <code className="text-blue-400">GET /api/court-mode/cause-list</code></li>
                    <li>• <strong className="text-white">Voice Memo Upload API:</strong> <code className="text-blue-400">POST /api/court-mode/voice-memo</code></li>
                    <li>• <strong className="text-white">Clash Escalation API:</strong> <code className="text-blue-400">POST /api/court-mode/escalate</code></li>
                    <li>• <strong className="text-white">Quick Notes API:</strong> <code className="text-blue-400">POST /api/court-mode/notes</code></li>
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


