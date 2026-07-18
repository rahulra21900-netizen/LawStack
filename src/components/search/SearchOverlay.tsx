"use client";

import React, { useState, useEffect } from "react";
import { Search, Sparkles, X } from "lucide-react";
import { MOCK_CASES } from "@/mocks/cases";
import { MOCK_CLIENTS } from "@/mocks/clients";

export function SearchOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const results = query
    ? [
        ...MOCK_CASES.filter((c) => c.title.toLowerCase().includes(query.toLowerCase())).map((c) => ({ type: "Matter", title: c.title })),
        ...MOCK_CLIENTS.filter((c) => c.name.toLowerCase().includes(query.toLowerCase())).map((c) => ({ type: "Client", title: c.name }))
      ]
    : [];

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-start justify-center pt-[10vh] text-xs">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[60vh]">
        {/* Input Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search matters, clients, documents, invoices..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-0 outline-none text-white placeholder-slate-500 text-xs"
            autoFocus
          />
          <button onClick={onClose} className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {query ? (
            results.length > 0 ? (
              <div className="space-y-2">
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Search Results</h3>
                {results.map((res, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-950/40 border border-slate-850 hover:border-slate-700 rounded-lg flex justify-between items-center text-slate-200 cursor-pointer">
                    <span className="font-semibold">{res.title}</span>
                    <span className="text-[9px] bg-slate-850 text-slate-400 px-2 py-0.5 rounded-full font-bold uppercase">{res.type}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-slate-500">No results found matching "{query}"</div>
            )
          ) : (
            <div className="p-8 text-center text-slate-500 flex flex-col items-center gap-2">
              <Sparkles className="w-6 h-6 text-blue-500 animate-pulse" />
              <span>Type to search LawStack index database (Ctrl + K)</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
