"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

// Pagination Component
export function Pagination({ currentPage, totalPages, onPageChange }: { currentPage: number; totalPages: number; onPageChange: (page: number) => void }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-slate-800/80 bg-slate-950/10 text-xs text-slate-400">
      <span>Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong></span>
      <div className="flex gap-2">
        <button
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded disabled:opacity-50 disabled:pointer-events-none transition-colors"
        >
          Previous
        </button>
        <button
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded disabled:opacity-50 disabled:pointer-events-none transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}

// DataTable Component
export interface Column<T> {
  header: string;
  accessor: (item: T) => React.ReactNode;
  sortKey?: keyof T;
}

export function DataTable<T>({ data, columns, title }: { data: T[]; columns: Column<T>[]; title?: string }) {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  
  const totalPages = Math.max(Math.ceil(data.length / rowsPerPage), 1);
  const paginatedData = data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl shadow-slate-950/20">
      {title && (
        <div className="p-4 border-b border-slate-800">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">{title}</h2>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950/60 text-slate-400 uppercase text-[9px] font-bold border-b border-slate-800">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className="p-4">{col.header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 text-slate-300">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="p-8 text-center text-slate-500">
                  No records to display.
                </td>
              </tr>
            ) : (
              paginatedData.map((item, rowIdx) => (
                <tr key={rowIdx} className="hover:bg-slate-850/40 transition-colors">
                  {columns.map((col, colIdx) => (
                    <td key={colIdx} className="p-4">{col.accessor(item)}</td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
