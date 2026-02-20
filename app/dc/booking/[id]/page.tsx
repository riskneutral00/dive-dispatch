"use client";

import Link from "next/link";
import { GlassPane } from "@/components/ui/GlassPane";
import { CustomerProfilePills } from "@/components/booking/CustomerProfilePills";
import { ControlStrip } from "@/components/booking/ControlStrip";
import { SpecialtyPills } from "@/components/booking/SpecialtyPills";

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

export default function BookingDetailPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="sticky top-0 z-40 backdrop-blur-xl bg-glass-pane border-b border-glass-border">
        <div className="px-8 h-16 flex items-center">
          <div className="flex-1">
            <Link
              href="/dc"
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
            Matt &amp; Ms. Mermaid&apos;s Dive Center
          </span>
          <div className="flex-1" />
        </div>
      </nav>

      <main className="flex-grow flex items-center justify-center py-12 px-6">
        <div className="w-full max-w-[700px]">
          <form
            className="space-y-12"
            onSubmit={(e) => e.preventDefault()}
          >
            <h2 className="text-center text-[10px] uppercase tracking-[0.2em] font-bold text-white/40">
              Booking Details
            </h2>

            {/* Status banner with TTL countdown (spec: Draft result UI) */}
            <GlassPane className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-[20px]">
                    schedule
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Draft - Inventory Reserved
                    </p>
                    <p className="text-[10px] text-white/40">
                      Holds expire in 11h 42m
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-bold px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full">
                  Draft
                </span>
              </div>
            </GlassPane>

            {/* Customer list */}
            <GlassPane className="p-6">
              <div className="w-full max-w-[420px] mx-auto">
                <div className="border-b border-white/5 mb-6">
                  <CustomerProfilePills
                    customers={MOCK_CUSTOMERS}
                    showRemoveButton
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    type="button"
                    className="flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors text-[11px] font-bold uppercase tracking-widest border border-dashed border-primary/30 px-6 py-2 rounded-full hover:bg-primary/5 hover:border-primary"
                  >
                    <span className="material-symbols-outlined text-base">
                      add
                    </span>
                    Add Customer
                  </button>
                </div>
              </div>
            </GlassPane>

            {/* Control strip */}
            <ControlStrip
              fields={[
                { label: "Date", value: "1/3 - 2/3", required: true },
                {
                  label: "Dive Type",
                  value: "Advanced Open Water",
                  required: true,
                },
                { label: "Agency", value: "PADI", required: true },
              ]}
            />

            {/* Specialties */}
            <SpecialtyPills initialSelected={["Nitrox", "DPV"]} />

            {/* Stakeholder assignment (read-only display from mockup) */}
            <div className="space-y-6 pt-6 border-t border-white/10 relative z-20">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-white/40 mb-2">
                    Instructor <span className="text-red-400">*</span>
                  </label>
                  <GlassPane className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-primary text-[18px]">
                          person
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-sm font-semibold text-white">
                            Riya Lee
                          </span>
                          <span className="text-base">
                            {"\u{1F1EB}\u{1F1F7}"}
                          </span>
                          <span className="text-base">
                            {"\u{1F1F9}\u{1F1ED}"}
                          </span>
                          <span className="text-base">
                            {"\u{1F1EC}\u{1F1E7}"}
                          </span>
                        </div>
                        <p className="text-[10px] text-white/40">
                          PADI &bull; Nitrox &bull; DPV
                        </p>
                      </div>
                    </div>
                  </GlassPane>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-white/40 mb-2">
                    Boat <span className="text-red-400">*</span>
                  </label>
                  <GlassPane className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-white/40 text-[18px]">
                          directions_boat
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="mb-0.5">
                          <span className="text-sm font-semibold text-white">
                            Seven Seas
                          </span>
                        </div>
                        <p className="text-[10px] text-white/40 leading-relaxed">
                          Hin Daeng | Capacity: 42/52
                        </p>
                      </div>
                    </div>
                  </GlassPane>
                </div>
              </div>
            </div>

            {/* Held units list with TTL (spec: success with held units + TTL countdown) */}
            <GlassPane className="p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-3">
                Held Inventory
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-400 text-[16px]">
                      check_circle
                    </span>
                    <span className="text-xs text-white/70">
                      Instructor: Riya Lee
                    </span>
                  </div>
                  <span className="text-[10px] text-white/40">
                    Hold expires 11:42:00
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-400 text-[16px]">
                      check_circle
                    </span>
                    <span className="text-xs text-white/70">
                      Boat: Seven Seas (2 berths)
                    </span>
                  </div>
                  <span className="text-[10px] text-white/40">
                    Hold expires 11:42:00
                  </span>
                </div>
              </div>
            </GlassPane>

            {/* Action buttons */}
            <div className="flex flex-row items-center justify-center gap-6 pt-8 border-t border-transparent relative z-0">
              <button
                type="button"
                className="px-8 bg-red-600 hover:bg-red-700 text-white border border-red-700 font-bold py-4 rounded-sm text-[11px] uppercase tracking-widest transition-all w-48 text-center"
              >
                Cancel Booking
              </button>
              <button
                type="submit"
                className="px-8 bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-sm transition-all text-[11px] uppercase tracking-widest shadow-lg shadow-primary/20 hover:shadow-primary/30 w-48"
              >
                Edit Booking
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
