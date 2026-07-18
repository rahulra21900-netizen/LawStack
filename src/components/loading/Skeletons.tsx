"use client";

import React from "react";

export function SkeletonHeader() {
  return (
    <div className="h-16 w-full bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 bg-slate-800 rounded"></div>
        <div className="w-32 h-4 bg-slate-800 rounded"></div>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-24 h-8 bg-slate-800 rounded-lg"></div>
        <div className="w-8 h-8 bg-slate-800 rounded-full"></div>
      </div>
    </div>
  );
}

export function SkeletonSidebar() {
  return (
    <div className="w-64 h-[calc(100vh-64px)] bg-slate-950 border-r border-slate-800 p-4 space-y-4 animate-pulse">
      <div className="w-full h-12 bg-slate-900 rounded-lg"></div>
      <div className="space-y-2.5">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="w-full h-8 bg-slate-900 rounded-md"></div>
        ))}
      </div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-3 animate-pulse">
      <div className="flex justify-between">
        <div className="w-16 h-3 bg-slate-800 rounded"></div>
        <div className="w-4 h-4 bg-slate-800 rounded"></div>
      </div>
      <div className="w-24 h-6 bg-slate-800 rounded"></div>
      <div className="w-32 h-3 bg-slate-800 rounded"></div>
    </div>
  );
}

export function SkeletonTable() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden space-y-4 p-4 animate-pulse">
      <div className="flex justify-between items-center pb-2">
        <div className="w-32 h-4 bg-slate-800 rounded"></div>
        <div className="w-16 h-6 bg-slate-800 rounded"></div>
      </div>
      <div className="space-y-3">
        <div className="w-full h-8 bg-slate-950 rounded"></div>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="w-full h-10 bg-slate-800/50 rounded"></div>
        ))}
      </div>
    </div>
  );
}

export function SkeletonForm() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 max-w-lg animate-pulse">
      <div className="w-40 h-5 bg-slate-800 rounded"></div>
      <div className="space-y-3">
        <div>
          <div className="w-16 h-3 bg-slate-800 rounded mb-1.5"></div>
          <div className="w-full h-9 bg-slate-950 rounded-lg"></div>
        </div>
        <div>
          <div className="w-24 h-3 bg-slate-800 rounded mb-1.5"></div>
          <div className="w-full h-24 bg-slate-950 rounded-lg"></div>
        </div>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <div className="w-16 h-8 bg-slate-800 rounded-lg"></div>
        <div className="w-24 h-8 bg-slate-800 rounded-lg"></div>
      </div>
    </div>
  );
}

export function SkeletonDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center animate-pulse">
        <div className="space-y-2">
          <div className="w-48 h-6 bg-slate-900 rounded"></div>
          <div className="w-32 h-3 bg-slate-900 rounded"></div>
        </div>
        <div className="w-24 h-8 bg-slate-900 rounded-lg"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SkeletonTable />
        </div>
        <div>
          <SkeletonTable />
        </div>
      </div>
    </div>
  );
}
