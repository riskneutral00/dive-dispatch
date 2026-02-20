"use client";

import { PortalHeader } from "@/components/customer/PortalHeader";
import { GlassPane } from "@/components/ui/GlassPane";

export default function CustomerExpiredPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PortalHeader centerName="Dive Center Portal" />

      <main className="flex-grow py-12 px-5 flex items-center justify-center">
        <div className="max-w-[600px] w-full">
          {/* Warning icon */}
          <div className="mb-8 flex justify-center">
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-red-500/20">
              <span
                className="material-symbols-outlined text-red-500"
                style={{ fontSize: 48 }}
              >
                error
              </span>
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-10">
            <h1 className="text-2xl font-bold text-white mb-2">
              This Link Has Expired
            </h1>
            <p className="text-sm text-white/50">
              Your booking link is no longer active. Please contact your dive
              center.
            </p>
          </div>

          {/* Dive center info */}
          <GlassPane className="p-5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-4">
              Dive Center Contact Info
            </p>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-white/40 mb-0.5">Name</p>
                <p className="text-sm font-semibold text-white">
                  Matt &amp; Ms. Mermaid&apos;s Dive Center
                </p>
              </div>
              <div>
                <p className="text-xs text-white/40 mb-0.5">Email</p>
                <p className="text-sm font-semibold text-primary">
                  info@mattandmsmermaid.com
                </p>
              </div>
              <div>
                <p className="text-xs text-white/40 mb-0.5">Phone</p>
                <p className="text-sm font-semibold text-primary">
                  +1 (555) 123-4567
                </p>
              </div>
            </div>
          </GlassPane>
        </div>
      </main>
    </div>
  );
}
