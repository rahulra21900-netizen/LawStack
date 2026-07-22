"use client";

import React, { useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { Breadcrumb, Button, Badge } from "@/components/ui";
import { MOCK_CALENDAR_EVENTS } from "@/mocks/calendar";
import { Calendar as CalendarIcon, Plus, Clock, Scale, Users, TriangleAlert as AlertTriangle, BookOpen, X } from "lucide-react";
import { MetricCard, Card } from "@/components/cards";

export default function MasterCalendarPage() {
  const { addToast } = useNotifications();
  const [viewType, setViewType] = useState<"month" | "week" | "day">("month");
  const [showDeveloperGuide, setShowDeveloperGuide] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "Calendar" }]} />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-amber-600/15 border border-amber-500/30">
              <CalendarIcon className="w-4 h-4 text-amber-400" />
            </span>
            <span>Master Practice Calendar</span>
          </h1>
          <p className="text-xs text-slate-400">Track trials, depositions, filing deadlines, and client consults.</p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDeveloperGuide(true)}
            className="border-amber-500/40 text-amber-300 hover:bg-amber-500/10"
            leftIcon={<BookOpen className="h-4 w-4" />}
          >
            Developer Guide
          </Button>
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => addToast("Add Appointment", "Simulated event scheduler form launched.", "info")}
          >
            Add Calendar Event
          </Button>
        </div>
      </div>

      {/* Urgent AI Escalation Alert Banner (Ram's Case Study Scenario) */}
      <div className="p-4 bg-red-950/40 border border-red-500/40 rounded-xl space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-red-500/20 text-red-400 mt-0.5">
              <AlertTriangle className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">CRITICAL HEARING ESCALATION: State v. Sharma</span>
                <Badge label="24-Hour Urgent Alert" variant="error" size="sm" />
              </div>
              <p className="text-xs text-red-200 mt-0.5">
                Court notice issued: Hearing date advanced to <strong>Tomorrow (8:30 AM)</strong>. Opposing counsel requested bail reduction hearing.
              </p>
              <p className="text-[11px] text-red-300 font-mono mt-1">
                ⚠️ Schedule Clash Detected: Priya Chandra (High Court Bench 3) clashes with Arjun Mehta (Sessions Court).
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => addToast("Escalation Dispatched", "WhatsApp, SMS & Email alerts sent to Priya Chandra, 3 Junior Advocates, and 10 Interns.", "success")}
            >
              Dispatch Multi-Channel Alerts
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => addToast("Clash Resolved", "Reassigned High Court Bench 3 appearance to Senior Associate Rohan Deshpande.", "info")}
            >
              Resolve Clash
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Events (30d)" value={MOCK_CALENDAR_EVENTS.length} info="Scheduled" trend="up" />
        <MetricCard title="Critical Hearings" value="1 Urgent" info="Next 24 Hours" trend="down" change="Requires Action" />
        <MetricCard title="Deadlines Due" value="2" info="Filing due" trend="neutral" change="Approaching" />
        <MetricCard title="Schedule Clashes" value="1 Clash" info="Needs Reassignment" trend="down" />
      </div>

      {/* Switcher & Calendar Frame */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden p-5 space-y-4">
        <div className="flex gap-2 border-b border-slate-850 pb-3">
          {["month", "week", "day"].map((v) => (
            <button
              key={v}
              onClick={() => setViewType(v as any)}
              className={`px-3 py-1 text-xs font-semibold rounded capitalize ${
                viewType === v ? "bg-blue-600 text-white font-bold" : "text-slate-400 hover:text-white"
              }`}
            >
              {v} View
            </button>
          ))}
        </div>

        {/* Visual calendar grid mockup */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-3 bg-slate-950 p-6 rounded-xl border border-slate-850 min-h-[350px] flex flex-col justify-between text-xs text-slate-400">
            <div className="grid grid-cols-7 gap-2 text-center font-bold text-white border-b border-slate-900 pb-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <div key={d}>{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2 h-full py-4 text-slate-600">
              {Array.from({ length: 28 }).map((_, idx) => {
                const dayNum = idx + 1;
                const hasEvent = dayNum === 14 || dayNum === 18;
                return (
                  <div key={idx} className={`p-2 rounded border border-slate-900 min-h-[50px] flex flex-col justify-between ${
                    hasEvent ? "bg-blue-900/10 border-blue-500/30" : "bg-slate-950/20"
                  }`}>
                    <span className="font-bold text-slate-500">{dayNum}</span>
                    {hasEvent && <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mx-auto" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Agenda listing */}
          <div className="md:col-span-1 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Scheduled Events</h3>
            <div className="space-y-2">
              {MOCK_CALENDAR_EVENTS.map((e) => (
                <div key={e.id} className="p-3 bg-slate-950 border border-slate-850 rounded-lg text-[10px] space-y-1">
                  <p className="font-bold text-white">{e.title}</p>
                  <p className="text-slate-500">{new Date(e.startDateTime).toLocaleDateString()} • {e.location || "Zoom"}</p>
                  <Badge label={e.type} variant="info" className="text-[8px]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Developer Guide Modal */}
      {showDeveloperGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
          <div className="w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 sticky top-0 bg-slate-900 z-10">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-amber-400">Senior Advocate & Judicial Guidance</p>
                <h2 className="text-lg font-bold text-white">Master Practice Calendar — Developer Guide</h2>
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
                      The Master Practice Calendar is the central operational schedule tracking trial court appearances, High Court Cause List item numbers, statutory limitation deadlines, client consultation slots, and team counsel assignments.
                    </p>
                  </div>
                  <div className="border-t border-slate-800/80 pt-2">
                    <strong className="text-white text-sm block mb-1">Why it is needed (Senior Advocate & Judicial Officer's Perspective):</strong>
                    <p className="text-slate-400">
                      In Indian litigation, missing a calendar deadline carries catastrophic legal consequences:
                      <br />
                      • **Limitation Act, 1963 Statutory Deadlines:** Missing a 30-day appeal deadline or 120-day Commercial Courts Act filing limit permanently extinguishes the client's legal remedy.
                      <br />
                      • **Courtroom Schedule Clashes & Pass-overs:** Senior Advocates manage cases across High Courts, District Courts, and Tribunals simultaneously. When two courtrooms list the Advocate's cases at the exact same hour, automated multi-channel alerts (WhatsApp, SMS, Email) must notify junior advocates to seek a pass-over or reassign counsel.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 2: Beginner Legal Glossary for Developers (Zero Legal Knowledge Required) */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  2. Indian Court Calendar Concepts Explained for Software Engineers
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-3 leading-relaxed">
                  <p className="text-slate-300">
                    If you are a software developer with zero background in Indian legal systems, here are the essential terms used in this calendar:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-300">
                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">1. Limitation Act 1963 Deadline</strong>
                      <p className="text-slate-400 text-[11px]">
                        Strict statutory deadline period set by Indian law for filing suits, appeals, and rejoinders. Missed limitation periods result in case dismissal.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">2. Courtroom Schedule Clash</strong>
                      <p className="text-slate-400 text-[11px]">
                        When an Advocate's name appears on the official Cause List in two different courtrooms (e.g. High Court Bench 3 & Sessions Court 5) at the same time.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">3. Pass-Over Request</strong>
                      <p className="text-slate-400 text-[11px]">
                        A formal request made by a Junior Advocate or Munshi to the Judge asking to hold the item number until Senior Counsel finishes in another court.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                      <strong className="text-white font-bold block">4. Multi-Channel Emergency Dispatch</strong>
                      <p className="text-slate-400 text-[11px]">
                        Automated multi-channel alerts (WhatsApp, SMS, Email, Push) sent to the case team when a hearing date is unexpectedly advanced by court order.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 3: Component Breakdown */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  3. Complete Component & Feature Breakdown
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5 col-span-1 md:col-span-2">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-red-400 animate-pulse" />
                      1. Urgent AI Escalation Alert Banner (State v. Sharma Case Study)
                    </p>
                    <p className="text-slate-400">
                      Highlighted red banner alerting attorneys that court notice was issued advancing a hearing date to tomorrow 8:30 AM. Detects schedule clashes between counsel (<strong className="text-white">Priya Chandra</strong> vs <strong className="text-white">Arjun Mehta</strong>) and includes 1-click buttons to <strong className="text-white">Dispatch Multi-Channel Alerts</strong> or <strong className="text-white">Resolve Clash</strong>.
                    </p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-amber-400" />
                      2. Metric Cards (4 Cards)
                    </p>
                    <p className="text-slate-400">Displays counts for <strong className="text-slate-200">Events (30d)</strong>, <strong className="text-slate-200">Critical Hearings</strong> (Next 24 Hours), <strong className="text-slate-200">Deadlines Due</strong> (Limitation Act 1963), and <strong className="text-slate-200">Schedule Clashes</strong>.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-blue-400" />
                      3. View Mode Switcher
                    </p>
                    <p className="text-slate-400">Toggles calendar display between <strong className="text-white">Month</strong>, <strong className="text-white">Week</strong>, and <strong className="text-white">Day</strong> views.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-cyan-400" />
                      4. Visual Calendar Grid
                    </p>
                    <p className="text-slate-400">Interactive 7-day calendar grid displaying day numbers and dot indicators for scheduled court hearings and filing deadlines.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-purple-400" />
                      5. Scheduled Events Agenda Listing
                    </p>
                    <p className="text-slate-400">Side-panel agenda list detailing event title, start date/time, location (Court Bench / Zoom link), and event type badge.</p>
                  </div>
                </div>
              </section>

              {/* Section 4: Navigation & Button Actions Map */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  4. Button Actions & Navigation Links
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                        <th className="pb-2">UI Action</th>
                        <th className="pb-2">Behavior</th>
                        <th className="pb-2">Target Action / Result</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300">
                      <tr>
                        <td className="py-2 font-semibold text-white">Add Calendar Event Button</td>
                        <td className="py-2">Launches appointment scheduler modal</td>
                        <td className="py-2 font-mono text-blue-400">In-page form modal</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold text-white">Dispatch Multi-Channel Alerts</td>
                        <td className="py-2">Sends WhatsApp, SMS, and Email alerts to case team</td>
                        <td className="py-2 font-mono text-emerald-400">POST /api/calendar/dispatch-alerts</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold text-white">Resolve Clash Button</td>
                        <td className="py-2">Reassigns High Court appearance to Senior Associate</td>
                        <td className="py-2 font-mono text-blue-400">PATCH /api/calendar/resolve-clash</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Section 5: Backend API Checklist */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                  5. Backend Developer API Checklist
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-2">
                  <ul className="space-y-1.5 text-slate-300">
                    <li>• <strong className="text-white">Get Calendar Events:</strong> <code className="text-blue-400">GET /api/calendar/events?start=&end=</code></li>
                    <li>• <strong className="text-white">Create Calendar Event:</strong> <code className="text-blue-400">POST /api/calendar/events</code></li>
                    <li>• <strong className="text-white">Dispatch Multi-Channel Alerts:</strong> <code className="text-blue-400">POST /api/calendar/dispatch-alerts</code></li>
                    <li>• <strong className="text-white">Resolve Schedule Clash:</strong> <code className="text-blue-400">PATCH /api/calendar/resolve-clash</code></li>
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

