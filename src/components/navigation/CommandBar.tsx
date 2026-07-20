"use client";

import React from "react";
import {
  Plus,
  Filter,
  Download,
  Trash2,
  RefreshCw,
  Search,
  LayoutGrid,
  List,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { Button, Badge } from "@/components/ui";

export interface CommandBarProps {
  onNew?: () => void;
  onRefresh?: () => void;
  onExport?: () => void;
  onDeleteSelected?: () => void;
  selectedCount?: number;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  filterCount?: number;
  onToggleFilter?: () => void;
  density?: "comfortable" | "compact";
  onDensityChange?: (density: "comfortable" | "compact") => void;
  newLabel?: string;
  customActions?: React.ReactNode;
}

export function CommandBar({
  onNew,
  onRefresh,
  onExport,
  onDeleteSelected,
  selectedCount = 0,
  searchQuery = "",
  onSearchChange,
  filterCount = 0,
  onToggleFilter,
  density = "comfortable",
  onDensityChange,
  newLabel = "New Record",
  customActions,
}: CommandBarProps) {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 shadow-lg shadow-slate-950/20 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between backdrop-blur-md">
      {/* Left Group: Action Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        {onNew && (
          <Button
            onClick={onNew}
            variant="primary"
            size="sm"
            className="bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-md shadow-blue-600/20 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>{newLabel}</span>
          </Button>
        )}

        {selectedCount > 0 ? (
          <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1 rounded-lg border border-slate-700">
            <span className="text-xs font-semibold text-blue-400">{selectedCount} selected</span>
            {onDeleteSelected && (
              <button
                onClick={onDeleteSelected}
                className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 font-medium transition-colors px-1 py-0.5 rounded hover:bg-red-500/10"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            )}
          </div>
        ) : (
          <>
            {onRefresh && (
              <button
                onClick={onRefresh}
                className="px-2.5 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 rounded-lg transition-colors flex items-center gap-1.5 font-medium"
              >
                <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Refresh</span>
              </button>
            )}

            {onExport && (
              <button
                onClick={onExport}
                className="px-2.5 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 rounded-lg transition-colors flex items-center gap-1.5 font-medium"
              >
                <Download className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Export</span>
              </button>
            )}
          </>
        )}

        {customActions}
      </div>

      {/* Right Group: Search & View Controls */}
      <div className="flex items-center gap-2">
        {onSearchChange && (
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Filter list..."
              className="w-full bg-slate-950/60 border border-slate-800 rounded-lg pl-8 pr-8 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        )}

        {onToggleFilter && (
          <button
            onClick={onToggleFilter}
            className={`px-2.5 py-1.5 text-xs rounded-lg border transition-colors flex items-center gap-1.5 font-medium relative ${
              filterCount > 0
                ? "bg-blue-600/20 text-blue-400 border-blue-500/40"
                : "bg-slate-800/60 text-slate-300 border-slate-700/60 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Filters</span>
            {filterCount > 0 && (
              <Badge variant="primary" size="sm" className="px-1.5 py-0 text-[10px]">
                {filterCount}
              </Badge>
            )}
          </button>
        )}

        {onDensityChange && (
          <div className="hidden sm:flex items-center bg-slate-950/60 p-0.5 rounded-lg border border-slate-800">
            <button
              onClick={() => onDensityChange("comfortable")}
              title="Comfortable Row Density"
              className={`p-1 rounded text-xs transition-colors ${
                density === "comfortable" ? "bg-slate-800 text-white font-semibold" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <List className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onDensityChange("compact")}
              title="Compact Row Density"
              className={`p-1 rounded text-xs transition-colors ${
                density === "compact" ? "bg-slate-800 text-white font-semibold" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
