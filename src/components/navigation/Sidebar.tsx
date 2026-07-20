"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSimulation } from "@/providers/SimulationProvider";
import {
  LayoutDashboard,
  Building2,
  ShieldAlert,
  Settings,
  Briefcase,
  Users,
  FileText,
  Calendar,
  Scale,
  CheckSquare,
  UserCheck,
  DollarSign,
  BarChart2,
  PieChart,
  BookOpen,
  FileCode,
  Sparkles,
  BrainCircuit,
  Activity,
  Bell,
  MessageSquare,
  User,
  LifeBuoy,
  Database,
  Layers,
  X,
} from "lucide-react";

interface SidebarProps {
  layoutType: "platform" | "tenant" | "client" | "dev";
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export function Sidebar({ layoutType, isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { activeTenant } = useSimulation();

  // Define Platform Sidebar Items
  const platformItems: MenuItem[] = [
    { name: "Dashboard", href: "/platform/dashboard", icon: LayoutDashboard },
    { name: "Tenant Administration", href: "/platform/tenant-administration", icon: Building2, badge: "5" },
    { name: "Audit Center", href: "/platform/audit", icon: ShieldAlert },
    { name: "Platform Settings", href: "/platform/settings", icon: Settings },
  ];

  // Define Tenant Sidebar Items
  const tenantItems: MenuItem[] = [
    { name: "Dashboard", href: "/workspace/dashboard", icon: LayoutDashboard },
    { name: "Cases", href: "/workspace/cases", icon: Briefcase },
    { name: "Clients", href: "/workspace/clients", icon: Users },
    { name: "Documents", href: "/workspace/documents", icon: FileText, badge: "Update" },
    { name: "Calendar", href: "/workspace/calendar", icon: Calendar },
    { name: "Hearings", href: "/workspace/hearings", icon: Scale },
    { name: "Tasks", href: "/workspace/tasks", icon: CheckSquare },
    { name: "Team", href: "/workspace/team", icon: UserCheck },
    { name: "Billing", href: "/workspace/billing", icon: DollarSign },
    { name: "Reports", href: "/workspace/reports", icon: BarChart2 },
    { name: "Knowledge Base", href: "/workspace/knowledge-base", icon: BookOpen },
    { name: "Templates", href: "/workspace/templates", icon: FileCode },
    { name: "Intelligence", href: "/workspace/intelligence", icon: BrainCircuit, badge: "New" },
    { name: "AI Workspace", href: "/workspace/ai-workspace", icon: Sparkles, badge: "New" },
    { name: "Activity", href: "/workspace/activity", icon: Activity },
    { name: "Notifications", href: "/workspace/notifications", icon: Bell },
    { name: "Settings", href: "/workspace/settings", icon: Settings },
  ];

  // Define Client Sidebar Items
  const clientItems: MenuItem[] = [
    { name: "Dashboard", href: "/client/dashboard", icon: LayoutDashboard },
    { name: "My Matters", href: "/client/matters", icon: Briefcase },
    { name: "Documents", href: "/client/documents", icon: FileText },
    { name: "Invoices & Billing", href: "/client/billing", icon: DollarSign, badge: "2 Due" },
    { name: "Messages", href: "/client/messages", icon: MessageSquare },
    { name: "Profile", href: "/client/profile", icon: User },
    { name: "Support", href: "/client/support", icon: LifeBuoy },
  ];

  // Define Developer Sidebar Items
  const devItems: MenuItem[] = [
    { name: "Overview", href: "/dev", icon: LayoutDashboard },
    { name: "Components", href: "/dev?tab=components", icon: Layers },
    { name: "Mock Data", href: "/dev?tab=mockdata", icon: Database },
  ];

  // Map type to items list
  const itemsMap = {
    platform: platformItems,
    tenant: tenantItems,
    client: clientItems,
    dev: devItems,
  };

  const currentItems = itemsMap[layoutType] || [];

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-30 bg-slate-950/60 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-slate-800 bg-slate-950 text-slate-300 transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:static md:h-[calc(100vh-64px)]`}
      >
        {/* Mobile header inside sidebar */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-slate-900 md:hidden">
          <span className="font-bold text-xs uppercase tracking-wider text-slate-400">Navigation Menu</span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-900 text-slate-400 hover:text-white"
            aria-label="Close Navigation Sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Context Panel (Only for tenant/client scope) */}
        {(layoutType === "tenant" || layoutType === "client") && (
          <div className="p-4 border-b border-slate-900 bg-slate-900/20">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Firm Tenant Scope</span>
            </div>
            <p className="mt-1 text-sm font-semibold text-white truncate">{activeTenant.name}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Tier: {activeTenant.tier} • status: {activeTenant.status}</p>
          </div>
        )}

        {/* Sidebar items list */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1.5" aria-label={`${layoutType} Navigation Sidebar`}>
          {currentItems.map((item) => {
            const Icon = item.icon;
            // Check if active (we match href but handle dev query params)
            const isActive =
              layoutType === "dev"
                ? pathname.startsWith("/dev") // For simplicity in dev simulator
                : pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`group flex items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-900/35"
                    : "hover:bg-slate-900 hover:text-white text-slate-400"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? "text-white" : "text-slate-500 group-hover:text-blue-400"}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className={`px-2 py-0.5 text-[9px] rounded font-bold uppercase ${
                    isActive ? "bg-blue-800 text-white" : "bg-slate-800 text-blue-400"
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer Info */}
        <div className="p-4 border-t border-slate-900 bg-slate-950/60 text-center">
          <p className="text-[9px] text-slate-600">LawStack V2 Prototype</p>
          <p className="text-[8px] text-slate-700 mt-0.5">Build 2026.07.18 • Sprint 1 Foundation</p>
        </div>
      </aside>
    </>
  );
}
