"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Check, ChevronUp, ChevronDown } from "lucide-react";

// Pagination Component
export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
}) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-slate-800/80 bg-slate-950/40 text-xs text-slate-400">
      <div>
        <span>
          Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
        </span>
        {totalItems !== undefined && (
          <span className="ml-2 text-[10px] text-slate-500 font-mono">({totalItems} items total)</span>
        )}
      </div>
      <div className="flex gap-2">
        <button
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300 disabled:opacity-40 disabled:pointer-events-none transition-colors"
        >
          Previous
        </button>
        <button
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300 disabled:opacity-40 disabled:pointer-events-none transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export interface Column<T> {
  header: string;
  accessor: (item: T) => React.ReactNode;
  sortKey?: keyof T;
  className?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  title?: string;
  onRowClick?: (item: T) => void;
  selectable?: boolean;
  selectedIds?: string[];
  onSelectionChange?: (selectedIds: string[]) => void;
  getRowId?: (item: T) => string;
  density?: "comfortable" | "compact";
  rowsPerPage?: number;
}

export function DataTable<T>({
  data,
  columns,
  title,
  onRowClick,
  selectable = false,
  selectedIds = [],
  onSelectionChange,
  getRowId = (item: any) => item.id || String(Math.random()),
  density = "comfortable",
  rowsPerPage = 8,
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(Math.ceil(data.length / rowsPerPage), 1);
  const paginatedData = data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const allPageIds = paginatedData.map(getRowId);
  const isAllPageSelected = allPageIds.length > 0 && allPageIds.every((id) => selectedIds.includes(id));

  const toggleSelectAll = () => {
    if (!onSelectionChange) return;
    if (isAllPageSelected) {
      onSelectionChange(selectedIds.filter((id) => !allPageIds.includes(id)));
    } else {
      const unique = Array.from(new Set([...selectedIds, ...allPageIds]));
      onSelectionChange(unique);
    }
  };

  const toggleSelectRow = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!onSelectionChange) return;
    if (selectedIds.includes(id)) {
      onSelectionChange(selectedIds.filter((i) => i !== id));
    } else {
      onSelectionChange([...selectedIds, id]);
    }
  };

  const pyClass = density === "compact" ? "py-2 px-3" : "py-3.5 px-4";

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden shadow-xl shadow-slate-950/20 backdrop-blur-md">
      {title && (
        <div className="p-4 border-b border-slate-800/80 bg-slate-950/20 flex justify-between items-center">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">{title}</h2>
          <span className="text-[10px] text-slate-500 font-mono">{data.length} records</span>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950/80 text-slate-400 uppercase text-[9px] font-bold border-b border-slate-800 sticky top-0 backdrop-blur-md">
            <tr>
              {selectable && (
                <th className={`w-10 text-center ${pyClass}`}>
                  <input
                    type="checkbox"
                    checked={isAllPageSelected}
                    onChange={toggleSelectAll}
                    className="rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-blue-500 focus:ring-offset-slate-900 cursor-pointer"
                  />
                </th>
              )}
              {columns.map((col, idx) => (
                <th key={idx} className={cn(pyClass, "tracking-wider font-semibold", col.className)}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className="p-10 text-center text-slate-500">
                  <p className="font-semibold text-slate-400">No matching records found</p>
                  <p className="text-[11px] text-slate-600 mt-1">Try adjusting your filters or search terms.</p>
                </td>
              </tr>
            ) : (
              paginatedData.map((item, rowIdx) => {
                const rowId = getRowId(item);
                const isSelected = selectedIds.includes(rowId);

                return (
                  <tr
                    key={rowId || rowIdx}
                    onClick={() => onRowClick && onRowClick(item)}
                    className={cn(
                      "transition-colors group",
                      onRowClick && "cursor-pointer hover:bg-slate-800/60",
                      isSelected ? "bg-blue-600/10 hover:bg-blue-600/15" : "hover:bg-slate-800/40"
                    )}
                  >
                    {selectable && (
                      <td className={`text-center ${pyClass}`} onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => toggleSelectRow(rowId, e as any)}
                          className="rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                      </td>
                    )}
                    {columns.map((col, colIdx) => (
                      <td key={colIdx} className={cn(pyClass, col.className)}>
                        {col.accessor(item)}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={data.length}
        />
      )}
    </div>
  );
}
