"use client";

import React, { useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { Breadcrumb, Button, Badge } from "@/components/ui";
import { Input } from "@/components/forms";
import { Sparkles, Send, Paperclip } from "lucide-react";

export default function AiChatPage() {
  const { addToast } = useNotifications();
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hello! I am your AI Legal Assistant. Select a case matter or type a query to draft briefs, review contract clauses, or search precedent cases." }
  ]);
  const [inputVal, setInputVal] = useState("");

  const handleSend = () => {
    if (!inputVal) return;
    setMessages((prev) => [...prev, { role: "user", text: inputVal }]);
    setInputVal("");
    addToast("Analyzing Query", "AI assistant processing dockets context.", "info");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "I have scanned the referenced dockets files. Based on NCLT Mumbai court precedents, the limitation timeline triggers within 14 business days of initial filings." }
      ]);
      addToast("Analysis Complete", "Response compiled with citations.", "success");
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Breadcrumb items={[{ name: "Workspace", href: "/workspace/dashboard" }, { name: "AI Workspace", href: "/workspace/ai-workspace/dashboard" }, { name: "Chat" }]} />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-400 animate-pulse" />
          <span>AI Legal Copilot Chat</span>
        </h1>
        <p className="text-xs text-slate-400">Conversational interface referencing case matters and documents.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left pane: history */}
        <div className="md:col-span-1 bg-slate-950/40 border border-slate-850 p-4 rounded-xl space-y-3 text-xs">
          <h3 className="font-bold text-white uppercase tracking-wider text-[10px]">Session Logs</h3>
          <div className="space-y-2 text-slate-400">
            <div className="p-2 hover:bg-slate-900 rounded cursor-pointer font-semibold text-white bg-slate-900/50">High Court filings outline</div>
            <div className="p-2 hover:bg-slate-900 rounded cursor-pointer">Sublicense Indemnity extraction</div>
          </div>
        </div>

        {/* Center: chat bubbles */}
        <div className="md:col-span-3 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col h-[450px]">
          <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`p-3.5 rounded-xl max-w-lg leading-relaxed ${
                  m.role === "user" ? "bg-blue-600 text-white" : "bg-slate-950 border border-slate-850 text-slate-300"
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Form input */}
          <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex gap-2 items-center">
            <button className="p-2 hover:bg-slate-800 rounded text-slate-500 hover:text-white" title="Attach Brief File">
              <Paperclip className="w-4 h-4" />
            </button>
            <input
              type="text"
              placeholder="Ask AI assistant about Indian statute, case timelines, or draft contract terms..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 bg-transparent border-0 outline-none text-white text-xs placeholder-slate-500 focus:ring-0"
            />
            <Button variant="primary" className="px-3" onClick={handleSend}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
