"use client";

import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { GlassPane } from "@/components/ui/GlassPane";

// [DEFERRED -- see build-spec.md]
// DiveSiteOperator is deferred to V1.1. This is a placeholder page only.

export default function DiveSiteDashboard() {
  return (
    <>
      <DashboardNav
        roleName="Dive Site Manager"
        userName="Matt"
        userInitials="M"
        navLinks={[
          { label: "Site Access", href: "/site", active: true },
        ]}
      />
      <DashboardShell>
        <div className="flex items-center justify-center min-h-[60vh]">
          <GlassPane className="max-w-md w-full text-center p-8">
            <span className="material-symbols-outlined text-[48px] text-primary/60 mb-4 block">
              location_on
            </span>
            <h1 className="text-2xl font-bold text-white mb-2">
              Dive Site Manager
            </h1>
            <p className="text-sm text-white/50 mb-4">
              Site access management, conditions reporting, and permit tracking are coming in V1.1.
            </p>
            <span className="inline-flex items-center px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest bg-amber-500/10 text-amber-300 border border-amber-500/20">
              Coming in V1.1
            </span>
          </GlassPane>
        </div>
      </DashboardShell>
    </>
  );
}
