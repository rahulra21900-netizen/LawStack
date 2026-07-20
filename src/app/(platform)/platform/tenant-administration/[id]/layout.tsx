"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Breadcrumb } from "@/components/ui";
import { MOCK_TENANTS } from "@/mocks/tenants";
import { ArrowLeft, BookOpen, X } from "lucide-react";

export default function TenantDetailsLayout({ children, params }: { children: React.ReactNode; params: Promise<{ id: string }> }) {
  const { id } = React.use(params) as { id: string };
  const pathname = usePathname();
  const [showDeveloperGuide, setShowDeveloperGuide] = React.useState(false);

  const tenantData = MOCK_TENANTS.find((t) => t.id === id);

  if (!tenantData) {
    return (
      <div className="p-8 text-center text-xs text-red-400">
        Error: Tenant ID "{id}" does not exist in platform records.
      </div>
    );
  }

  const tabs = [
    { name: "Overview", path: "overview" },
    { name: "Users", path: "users" },
    { name: "Workspaces", path: "workspaces" },
    { name: "Activity", path: "activity" },
    { name: "Settings", path: "settings" }
  ];

  return (
    <div className="space-y-6">
      {/* Header Info Panel */}
      <div className="space-y-4">
        <div className="flex flex-wrap justify-between items-start gap-3">
          <div className="space-y-1">
            <Breadcrumb items={[{ name: "Platform", href: "/platform/dashboard" }, { name: "Tenants", href: "/platform/tenant-administration" }, { name: tenantData.name }]} />
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">{tenantData.name}</h1>
            </div>
            <p className="text-xs text-slate-400">ID: <strong className="font-mono text-slate-200">{tenantData.id}</strong> • Status: {tenantData.status} • Tier: {tenantData.tier}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowDeveloperGuide(true)}
              className="flex items-center gap-1 text-xs text-slate-300 hover:text-white transition-colors bg-slate-900 border border-slate-800 hover:border-slate-700 px-3 py-1.5 rounded-lg font-semibold"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Developer Guide</span>
            </button>
            <Link href="/platform/tenant-administration">
              <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors bg-slate-900 border border-slate-800 hover:border-slate-700 px-3 py-1.5 rounded-lg font-semibold">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Tenants Directory</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Tab Links Row */}
        <div className="flex border-b border-slate-800 overflow-x-auto gap-2">
          {tabs.map((tab) => {
            const isSelected = pathname.endsWith(`/platform/tenant-administration/${id}/${tab.path}`) || (tab.path === "overview" && pathname.endsWith(`/platform/tenant-administration/${id}`));
            return (
              <Link
                key={tab.path}
                href={`/platform/tenant-administration/${id}/${tab.path}`}
                className={`px-4 py-2 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors ${
                  isSelected ? "border-blue-500 text-blue-400 bg-blue-500/5 font-bold" : "border-transparent text-slate-400 hover:text-white"
                }`}
              >
                {tab.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Tab Panels Contents */}
      <div className="bg-slate-900/30 border border-slate-800/80 rounded-xl p-5 md:p-6 min-h-[300px]">
        {children}
      </div>

      {showDeveloperGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
          <div className="w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-blue-400">Developer Guide</p>
                <h2 className="text-lg font-bold text-white">Firm Details Page Handoff Notes</h2>
              </div>
              <button
                onClick={() => setShowDeveloperGuide(false)}
                className="rounded-lg border border-slate-700 p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
                aria-label="Close developer guide"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-6 p-5 text-sm text-slate-300">
              <section>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">What this page is for</h3>
                <p>
                  This page is the main firm-level detail experience for a tenant in the platform. It should give a platform admin a quick, structured view of the tenant’s identity, health, subscriptions, activity, and administrative controls. The latest implementation should stay linked to the tenant administration flow and reflect the new workspace and provisioning context for each firm.
                </p>
              </section>

              <section>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">Why each section matters and what logic should power it</h3>
                <div className="grid gap-3 md:grid-cols-2">
                  {[
                    {
                      title: "Header summary",
                      detail: "This section should show the tenant name, tenant ID, current status, and tier. The page should read the current tenant from the URL parameter so it can render the correct record instead of a generic placeholder."
                    },
                    {
                      title: "Overview tab",
                      detail: "This is the core firm details view. It should present the firm identity, namespace health, subscription plan, quota limits, and recent activity. This is the first place a platform admin will look when they need to understand the tenant quickly."
                    },
                    {
                      title: "Users tab",
                      detail: "This area should show the tenant’s assigned users and membership state. The logic should support role-based viewing, showing active staff, pending invites, and maybe access restrictions for that tenant."
                    },
                    {
                      title: "Workspaces tab",
                      detail: "This section should represent the tenant’s internal workspaces or matters. The implementation should model how each tenant is organized and how workspace-level objects are grouped under the firm."
                    },
                    {
                      title: "Activity tab",
                      detail: "This tab should display a history of platform events relevant to the tenant. It should be built around audit-style records such as sign-ins, configuration changes, invitations, billing updates, and security actions."
                    },
                    {
                      title: "Settings tab",
                      detail: "This tab is where tenant-level configuration should live. It should cover billing controls, compliance settings, workspace defaults, and policy preferences that are specific to this firm."
                    },
                  ].map((item) => (
                    <div key={item.title} className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                      <p className="mb-1 font-semibold text-white">{item.title}</p>
                      <p className="text-xs leading-5 text-slate-400">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">What each action should do</h3>
                <ul className="space-y-2">
                  <li><span className="font-semibold text-white">Tenants Directory:</span> should return the admin to the main tenant administration list at /platform/tenant-administration.</li>
                  <li><span className="font-semibold text-white">Developer Guide:</span> should open this implementation guide so the team can review the page’s purpose and expected behavior.</li>
                  <li><span className="font-semibold text-white">Overview tab:</span> should remain the default landing view and act as the main firm summary experience.</li>
                  <li><span className="font-semibold text-white">View full:</span> should route the user to the Activity tab for the selected tenant so they can inspect a deeper history.</li>
                  <li><span className="font-semibold text-white">Modify Subscription:</span> should open a subscription management flow or modal instead of being a dead button in a production build.</li>
                  <li><span className="font-semibold text-white">Tabs:</span> should switch content without losing the selected tenant context, so the current tenant ID remains active while navigating between sections.</li>
                  <li><span className="font-semibold text-white">Provisioning context:</span> when the tenant was created through the provisioning wizard, the detail page should reflect that origin and link back to the onboarding state where relevant.</li>
                </ul>
              </section>

              <section>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">Detailed implementation notes for every section</h3>
                <div className="space-y-4">
                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                    <p className="mb-2 font-semibold text-white">Tenant Identity</p>
                    <ul className="space-y-1 text-xs leading-5 text-slate-400">
                      <li><span className="font-semibold text-white">Firm Name / Individual Advocate Name:</span> display the legal entity or advocate name prominently and make it the main identity label for the tenant.</li>
                      <li><span className="font-semibold text-white">Tenant ID:</span> show a unique identifier that is easy to reference for internal support and administration.</li>
                      <li><span className="font-semibold text-white">Workspace URL:</span> show the tenant’s subdomain or workspace URL in a monospace style so it feels like a technical address.</li>
                      <li><span className="font-semibold text-white">Tier:</span> show the current subscription level such as Basic, Professional, or Enterprise.</li>
                      <li><span className="font-semibold text-white">Joined Date:</span> display the date the firm joined the platform so admins can understand onboarding history.</li>
                    </ul>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                    <p className="mb-2 font-semibold text-white">Namespace Health</p>
                    <ul className="space-y-1 text-xs leading-5 text-slate-400">
                      <li><span className="font-semibold text-white">Database Isolation:</span> show whether this tenant’s data is segregated and isolated from other tenants.</li>
                      <li><span className="font-semibold text-white">Row-Level Security:</span> explain that this protects records so users only access what they are meant to access.</li>
                      <li><span className="font-semibold text-white">Auth Service:</span> show whether login and identity operations are healthy and operational.</li>
                      <li><span className="font-semibold text-white">Object Storage:</span> show whether files and documents for the tenant are available and mounted correctly.</li>
                    </ul>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                    <p className="mb-2 font-semibold text-white">Subscription</p>
                    <ul className="space-y-1 text-xs leading-5 text-slate-400">
                      <li><span className="font-semibold text-white">Current Plan:</span> show the active product tier the tenant is currently paying for.</li>
                      <li><span className="font-semibold text-white">MRR:</span> this stands for Monthly Recurring Revenue, which is the predictable monthly revenue generated by the tenant’s subscription.</li>
                      <li><span className="font-semibold text-white">Seats Used:</span> show how many user seats are currently occupied or in use.</li>
                      <li><span className="font-semibold text-white">Modify Subscription:</span> this action should open a modal or side panel to change the plan, revise pricing assumptions, and update the displayed subscription state.</li>
                    </ul>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                    <p className="mb-2 font-semibold text-white">Tenant Activity</p>
                    <ul className="space-y-1 text-xs leading-5 text-slate-400">
                      <li><span className="font-semibold text-white">What it should show:</span> recent events such as user invitations, matter creation, security changes, subscription changes, and system actions.</li>
                      <li><span className="font-semibold text-white">What each row should contain:</span> who performed the action, what happened, which entity or item was affected, and when it happened.</li>
                    </ul>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                    <p className="mb-2 font-semibold text-white">Users tab</p>
                    <ul className="space-y-2 text-xs leading-5 text-slate-400">
                      <li><span className="font-semibold text-white">Provisioned User Accounts:</span> list each user with Name, Email, Designated Role, Primary Workspace Room, Workspace Name, and Status.</li>
                      <li><span className="font-semibold text-white">Audit Logs Trail:</span> show a historical log with Action, Item, Triggered By, Entity Class, Timestamp, and Log.</li>
                      <li><span className="font-semibold text-white">Namespace Lockdown Status:</span> show whether the tenant environment is locked down, restricted, or operating normally for security and compliance reasons.</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">What should happen when the user clicks Modify Subscription</h3>
                <ul className="space-y-2">
                  <li><span className="font-semibold text-white">Open a modal or side panel:</span> the button should open a focused subscription editor rather than doing nothing.</li>
                  <li><span className="font-semibold text-white">Display current plan:</span> show the current tier and allow the admin to compare it with other plans.</li>
                  <li><span className="font-semibold text-white">Show plan options:</span> present the available options such as Basic, Professional, or Enterprise with pricing context.</li>
                  <li><span className="font-semibold text-white">Allow selection and save:</span> when the user chooses a new plan, update the current plan, MRR, and seat-related values locally in the UI.</li>
                  <li><span className="font-semibold text-white">Show confirmation:</span> after save, show a confirmation or success message so the admin knows the change was applied.</li>
                </ul>
              </section>

              <section>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">Implementation notes for developers</h3>
                <ul className="space-y-2">
                  <li><span className="font-semibold text-white">Data source:</span> one tenant should be resolved from the URL parameter and matched against mock tenant data for now.</li>
                  <li><span className="font-semibold text-white">Fallback state:</span> if no tenant is found, render a visible error state instead of a blank panel.</li>
                  <li><span className="font-semibold text-white">Shared layout:</span> keep the tenant header, tab navigation, and return action in the common layout so every subpage shares the same view context.</li>
                  <li><span className="font-semibold text-white">Tab structure:</span> each child tab should remain focused on the selected firm and avoid introducing unrelated platform-wide state.</li>
                  <li><span className="font-semibold text-white">Design direction:</span> keep the page calm and operational, with strong hierarchy, status indicators, and compact summaries that support quick review.</li>
                </ul>
              </section>

              <section>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">Simple glossary</h3>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                    <p className="mb-2 font-semibold text-white">Tenant</p>
                    <p className="text-xs leading-5 text-slate-400">A tenant is a separate firm or client organization using the system. It has its own users, configuration, and data boundaries.</p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                    <p className="mb-2 font-semibold text-white">Namespace</p>
                    <p className="text-xs leading-5 text-slate-400">The namespace is the tenant’s isolated environment. It helps the platform keep data and services separated for each organization.</p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                    <p className="mb-2 font-semibold text-white">Subscription</p>
                    <p className="text-xs leading-5 text-slate-400">The subscription controls the tenant’s plan, permitted quota, seat allowance, and billing status.</p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                    <p className="mb-2 font-semibold text-white">Activity feed</p>
                    <p className="text-xs leading-5 text-slate-400">The activity feed is a timeline of important events such as invites, policy actions, upgrades, and system events tied to the tenant.</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
