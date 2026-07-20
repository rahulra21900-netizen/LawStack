"use client";

import React, { useState } from "react";
import { Breadcrumb, Badge, Button } from "@/components/ui";
import { Card } from "@/components/cards";
import { LifeBuoy, ShieldCheck, Mail, Phone, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import { useNotifications } from "@/hooks/useNotifications";

export default function ClientSupportPage() {
  const { addToast } = useNotifications();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;
    setSubmitted(true);
    addToast("Support Ticket Raised", "Your inquiry has been sent to your advocate's office.", "success");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Portal", href: "/client/dashboard" }, { name: "Support" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/15 border border-indigo-500/30">
            <LifeBuoy className="w-4 h-4 text-indigo-400" />
          </span>
          <span>Client Portal Help & Legal Support</span>
        </h1>
        <p className="text-xs text-slate-400">Reach your advocate's practice office or get technical help with the client portal.</p>
      </div>

      {/* BCI Notice */}
      <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-start gap-3 text-xs text-blue-300">
        <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-white">Closed-Network Confidential Support</p>
          <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
            All support requests are encrypted and routed exclusively to your assigned legal team at <strong>Chandra & Associates</strong>.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Submit Ticket Form */}
        <Card
          className="lg:col-span-2"
          header={
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-400" />
              <span className="font-bold text-white text-xs">Send Inquiry to Law Office</span>
            </div>
          }
        >
          {submitted ? (
            <div className="p-6 text-center space-y-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h3 className="text-base font-bold text-white">Inquiry Dispatched</h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Your support request has been logged. Senior Counsel Priya Chandra's desk will review your note shortly.
              </p>
              <Button variant="secondary" size="sm" onClick={() => setSubmitted(false)}>
                Submit Another Request
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Subject / Matter Reference</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Question regarding hearing date on Matter #CS-2026-084"
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Message Detail</label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your question or document request..."
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <Button type="submit" variant="primary" leftIcon={<Send className="w-3.5 h-3.5" />}>
                Submit Inquiry
              </Button>
            </form>
          )}
        </Card>

        {/* Contact Info Card */}
        <div className="space-y-4">
          <Card
            header={
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-white text-xs">Direct Law Office Contact</span>
              </div>
            }
          >
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
                <p className="text-[10px] text-slate-500 font-bold uppercase">Law Firm Desk</p>
                <p className="font-bold text-white text-sm mt-0.5">Chandra & Associates</p>
                <p className="text-[11px] text-slate-400">High Court Bench Division</p>
              </div>

              <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-500 font-bold">Office Helpline</p>
                  <p className="font-mono text-xs text-white">+91 (022) 4982-1049</p>
                </div>
              </div>

              <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-500 font-bold">Primary Desk Email</p>
                  <p className="font-mono text-xs text-white">support@oakwoodlaw.in</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
