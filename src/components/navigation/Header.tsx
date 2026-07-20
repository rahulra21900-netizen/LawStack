"use client";

import React, { useState } from "react";
import { useSimulation } from "@/providers/SimulationProvider";
import { useTheme } from "@/providers/ThemeProvider";
import { useNotifications } from "@/providers/NotificationProvider";
import { useCommandPalette } from "@/providers/CommandPaletteProvider";
import { MOCK_CASES } from "@/mocks/cases";
import { searchArray } from "@/utils/search";
import {
  Search,
  Bell,
  HelpCircle,
  Sun,
  Moon,
  Shield,
  Building,
  Menu,
  LogOut,
  Settings,
  Briefcase,
  Check,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "../ui";

interface HeaderProps {
  onToggleSidebar?: () => void;
  layoutType: "public" | "platform" | "tenant" | "client" | "dev";
}

export function Header({ onToggleSidebar, layoutType }: HeaderProps) {
  const {
    activeUser,
    activeRole,
  } = useSimulation();

  const { theme, setTheme } = useTheme();
  const { notifications, unreadCount, markAsRead, clearAll } = useNotifications();
  const { isOpen: isSearchOpen, setIsOpen: setIsSearchOpen } = useCommandPalette();

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const searchResults = searchQuery
    ? searchArray(MOCK_CASES, searchQuery, ["title", "caseNumber", "practiceArea"])
    : [];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-900/90 backdrop-blur-md text-white h-16 px-4 flex items-center justify-between">
      {/* Left side: Menu toggle (Mobile) & Logo */}
      <div className="flex items-center gap-3">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="p-2 -ml-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white md:hidden transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle Navigation Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-wider text-blue-400">
          <Shield className="w-6 h-6 text-blue-500 animate-pulse" />
          <span>LAWSTACK <span className="text-white text-xs font-semibold px-1.5 py-0.5 bg-blue-600 rounded">V2</span></span>
        </Link>

        {/* Layout Badge Indicator */}
        <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-xs font-medium uppercase bg-slate-800 text-slate-300 border border-slate-700">
          {layoutType}
        </span>
      </div>

      {/* Center: Search & Command Palette Placeholder */}
      <div className="hidden md:flex flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search cases, documents, or run command (Ctrl+K)..."
            onClick={() => setIsSearchOpen(true)}
            className="block w-full pl-9 pr-4 py-1.5 bg-slate-950/50 border border-slate-800 rounded-lg text-sm text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
            readOnly
          />
        </div>
      </div>

      {/* Right side: Tools, Tenant Selector, Profiler */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Skip Link Helper for keyboard navigation */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md">
          Skip to main content
        </a>

        {/* Global Search Button (Mobile/Tablet) */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white md:hidden transition-colors"
          aria-label="Open Search Command Palette"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Notifications Button */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors relative focus:ring-2 focus:ring-blue-500"
            aria-label="View recent alerts"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-blue-600 rounded-full text-[9px] font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-lg shadow-xl py-1 z-50">
              <div className="px-4 py-2 border-b border-slate-800 text-slate-300 font-bold text-xs flex justify-between items-center">
                <span>Recent System Alerts</span>
                <button onClick={clearAll} className="text-[10px] text-blue-400 hover:underline">
                  Mark All Read
                </button>
              </div>
              <div className="divide-y divide-slate-800 max-h-60 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-xs text-slate-500">No alert logs.</div>
                ) : (
                  notifications.map((n) => (
                    <div key={n.id} className={`p-3 text-xs hover:bg-slate-800/50 transition-colors ${!n.read ? "bg-blue-600/5" : ""}`}>
                      <div className="flex justify-between items-start">
                        <p className="font-semibold text-white">{n.title}</p>
                        {!n.read && (
                          <button onClick={() => markAsRead(n.id)} className="text-[9px] text-blue-400 hover:underline flex items-center gap-0.5">
                            <Check className="w-2.5 h-2.5" /> Read
                          </button>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5">{n.message}</p>
                      <span className="text-[8px] text-slate-500 block mt-1">
                        {new Intl.DateTimeFormat("en-US", {
                          hour: "numeric",
                          minute: "2-digit",
                          timeZone: "UTC",
                        }).format(new Date(n.createdAt))}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Theme Switcher Toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors focus:ring-2 focus:ring-blue-500"
          aria-label="Toggle color theme"
        >
          {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Help Center */}
        <button
          className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors focus:ring-2 focus:ring-blue-500"
          aria-label="Documentation Help Desk"
        >
          <HelpCircle className="w-5 h-5" />
        </button>

        {/* Profile Switcher & Menu */}
        <div className="relative">
          <button
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className="flex items-center gap-2 p-1 rounded-full border border-slate-700 hover:border-slate-500 transition-colors focus:ring-2 focus:ring-blue-500"
            aria-label="User profile settings menu"
          >
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
              {activeUser.name.charAt(0)}
            </div>
          </button>

          {showProfileDropdown && (
            <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-lg shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="px-4 py-2 border-b border-slate-800">
                <p className="text-sm font-semibold text-white truncate">{activeUser.name}</p>
                <p className="text-xs text-slate-400 truncate">{activeUser.email}</p>
                <div className="mt-1.5 flex items-center gap-1.5">
                  <span className="text-[10px] px-2 py-0.5 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded font-semibold">
                    Role: {activeRole}
                  </span>
                </div>
              </div>

              <div className="border-t border-slate-800 mt-2 pt-1">
                <button className="w-full text-left px-4 py-2 text-xs text-red-400 hover:bg-slate-800/80 flex items-center gap-2 transition-colors">
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Global Command Palette / Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-start justify-center pt-24 px-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-slate-800 flex items-center gap-3">
              <Search className="w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search cases or execute actions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-0 outline-none text-white w-full text-sm placeholder-slate-500 focus:ring-0"
                autoFocus
              />
              <button
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery("");
                }}
                className="text-xs bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded text-slate-400 hover:text-white font-bold"
              >
                ESC
              </button>
            </div>
            <div className="p-4 max-h-[300px] overflow-y-auto">
              {searchQuery ? (
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-2">Search Matches ({searchResults.length})</p>
                  {searchResults.length === 0 ? (
                    <div className="p-4 text-center text-xs text-slate-500">No cases matched your query.</div>
                  ) : (
                    <div className="space-y-1">
                      {searchResults.map((res) => (
                        <div
                          key={res.id}
                          onClick={() => {
                            setIsSearchOpen(false);
                            setSearchQuery("");
                          }}
                          className="p-2.5 rounded-lg hover:bg-slate-800/50 cursor-pointer flex items-center justify-between text-xs text-slate-300"
                        >
                          <div className="flex items-center gap-2">
                            <Briefcase className="w-3.5 h-3.5 text-blue-400" />
                            <span>{res.title}</span>
                          </div>
                          <span className="text-[9px] px-1.5 py-0.5 bg-slate-800 text-slate-400 rounded font-mono">{res.caseNumber}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-2">Quick Navigation Shortcuts</p>
                  <div className="space-y-1">
                    <Link
                      href="/platform/dashboard"
                      onClick={() => setIsSearchOpen(false)}
                      className="p-2.5 rounded-lg hover:bg-slate-800/50 cursor-pointer flex items-center justify-between text-xs text-slate-300"
                    >
                      <div className="flex items-center gap-2">
                        <Building className="w-3.5 h-3.5 text-blue-400" />
                        <span>Go to Tenant Provisioning</span>
                      </div>
                      <span className="text-[10px] text-slate-500">Navigation</span>
                    </Link>
                    <Link
                      href="/dev"
                      onClick={() => setIsSearchOpen(false)}
                      className="p-2.5 rounded-lg hover:bg-slate-800/50 cursor-pointer flex items-center justify-between text-xs text-slate-300"
                    >
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>Launch Workspace Overview</span>
                      </div>
                      <span className="text-[10px] text-slate-500">Developer</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <div className="p-3 bg-slate-950 border-t border-slate-800 text-[10px] text-slate-500 flex justify-between items-center">
              <span>Use ↑↓ to navigate, Enter to select</span>
              <span>LawStack Command Palette v2.0</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
