"use client";

import React, { useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { Breadcrumb, Button, Badge } from "@/components/ui";
import { MOCK_CALENDAR_EVENTS } from "@/mocks/calendar";
import { Calendar as CalendarIcon, Plus, Clock, Scale, Users, TriangleAlert as AlertTriangle } from "lucide-react";
import { MetricCard, Card } from "@/components/cards";

export default function MasterCalendarPage() {
  const { addToast } = useNotifications();
  const [viewType, setViewType] = useState<"month" | "week" | "day">("month");

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
        <Button
          variant="primary"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => addToast("Add Appointment", "Simulated event scheduler form launched.", "info")}
        >
          Add Calendar Event
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Events (30d)" value={MOCK_CALENDAR_EVENTS.length} info="Scheduled" trend="up" />
        <MetricCard title="Hearings" value="3" info="Court appearances" trend="neutral" />
        <MetricCard title="Deadlines" value="2" info="Filing due" trend="down" change="Approaching" />
        <MetricCard title="Consults" value="4" info="Client meetings" trend="up" />
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
    </div>
  );
}
