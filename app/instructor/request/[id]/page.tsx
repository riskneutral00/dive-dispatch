"use client";

import Link from "next/link";
import { GlassPane } from "@/components/ui/GlassPane";
import { CustomerProfilePills } from "@/components/booking/CustomerProfilePills";

const MOCK_CUSTOMERS = [
  {
    name: "Joe Smith",
    flags: ["\u{1F1EB}\u{1F1F7}"],
    profileSteps: {
      contact: true,
      medical: true,
      liability: false,
      equipment: false,
      payment: true,
    },
  },
  {
    name: "Jane Smith",
    flags: ["\u{1F1EB}\u{1F1F7}", "\u{1F1EA}\u{1F1F8}"],
    profileSteps: {
      contact: true,
      medical: true,
      liability: true,
      equipment: true,
      payment: false,
    },
  },
];

export default function InstructorRequestPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="sticky top-0 z-40 backdrop-blur-xl bg-glass-pane border-b border-glass-border">
        <div className="px-8 h-16 flex items-center">
          <div className="flex-1">
            <Link
              href="/instructor"
              className="flex items-center gap-1 text-white/60 hover:text-primary transition-colors no-underline w-fit"
            >
              <span className="material-symbols-outlined text-[20px]">
                arrow_back
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-widest">
                Back
              </span>
            </Link>
          </div>
          <span className="text-sm font-semibold text-white tracking-tight">
            Booking Request
          </span>
          <div className="flex-1" />
        </div>
      </nav>

      <main className="flex-1 px-4 py-10">
        <div className="max-w-[700px] mx-auto">
          {/* Booking Summary Card */}
          <GlassPane className="p-6 space-y-6 mb-6">
            <h2 className="text-center text-[10px] uppercase tracking-[0.2em] font-bold text-white/40">
              Booking Summary
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1.5">
                  Dates
                </p>
                <p className="text-sm font-medium text-white">
                  3/1 &ndash; 3/2, 2026
                </p>
              </div>
              <div>
                <p className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1.5">
                  Dive Type
                </p>
                <p className="text-sm font-medium text-white">
                  Advanced Open Water
                </p>
              </div>
              <div>
                <p className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1.5">
                  Agency
                </p>
                <p className="text-sm font-medium text-white">PADI</p>
              </div>
              <div>
                <p className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1.5">
                  Specialties
                </p>
                <p className="text-sm font-medium text-white">Nitrox, DPV</p>
              </div>
              <div>
                <p className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1.5">
                  Boat
                </p>
                <p className="text-sm font-medium text-white">Seven Seas</p>
              </div>
              <div>
                <p className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1.5">
                  Booking Owner
                </p>
                <p className="text-sm font-medium text-white">
                  Matt &amp; Ms. Mermaid&apos;s Dive Center
                </p>
              </div>
            </div>
          </GlassPane>

          {/* Customer List Card */}
          <GlassPane className="p-6 mb-6">
            <CustomerProfilePills customers={MOCK_CUSTOMERS} />
          </GlassPane>

          {/* Missing data badges (spec: system surfaces missing fields) */}
          <GlassPane className="p-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-400 text-[16px]">
                warning
              </span>
              <span className="text-xs text-amber-400">
                Joe Smith: Liability &amp; Equipment forms pending
              </span>
            </div>
          </GlassPane>

          {/* Handshake Terms Card */}
          <GlassPane className="p-6 mb-10">
            <h2 className="text-center text-[10px] uppercase tracking-[0.2em] font-bold text-white/40 mb-4">
              Your Handshake Terms
            </h2>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-2 text-sm text-white/50">
                <span className="text-primary mt-0.5 flex-shrink-0">
                  &bull;
                </span>
                50% payment guaranteed on cancellation within 48 hours.
              </li>
              <li className="flex items-start gap-2 text-sm text-white/50">
                <span className="text-primary mt-0.5 flex-shrink-0">
                  &bull;
                </span>
                72-hour minimum cancellation notice required.
              </li>
            </ul>
            <p className="text-[10px] text-white/30 italic">
              These terms will be recorded upon acceptance.
            </p>
          </GlassPane>

          {/* Actions */}
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/instructor"
              className="bg-transparent border border-white/10 text-white/40 font-bold py-4 px-8 w-48 text-[11px] uppercase tracking-widest rounded-sm hover:text-white/70 hover:border-white/20 transition-all text-center no-underline"
            >
              Decline
            </Link>
            <button
              type="button"
              className="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 w-48 text-[11px] uppercase tracking-widest rounded-sm shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
            >
              Accept Booking
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
