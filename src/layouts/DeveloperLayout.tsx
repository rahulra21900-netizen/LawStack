"use client";

import React, { useState } from "react";
import { Header } from "@/components/navigation/Header";
import { Sidebar } from "@/components/navigation/Sidebar";

export function DeveloperLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans">
      <Header layoutType="dev" onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          layoutType="dev"
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <main
          id="main-content"
          className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-900/40"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
