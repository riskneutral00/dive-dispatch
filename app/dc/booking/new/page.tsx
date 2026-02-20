"use client";

import { useState } from "react";
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

const MOCK_INSTRUCTORS = [
  { name: "Camille Dubois", flags: ["\u{1F1EB}\u{1F1F7}"], specialties: "PADI" },
  {
    name: "Julien Moreau",
    flags: ["\u{1F1EB}\u{1F1F7}", "\u{1F1EA}\u{1F1F8}"],
    specialties: "PADI",
  },
  {
    name: "Riya Lee",
    flags: ["\u{1F1EB}\u{1F1F7}", "\u{1F1F9}\u{1F1ED}", "\u{1F1EC}\u{1F1E7}"],
    specialties: "PADI \u2022 Nitrox \u2022 DPV",
  },
  { name: "Antoine Lefevre", flags: ["\u{1F1EB}\u{1F1F7}"], specialties: "PADI" },
  { name: "Sophie Bernard", flags: ["\u{1F1EB}\u{1F1F7}"], specialties: "PADI" },
];

const MOCK_BOATS = [
  "Seven Seas | 38/52",
  "Deep Blue Explorer",
  "Coral Runner",
  "North Star",
];

export default function NewBookingPage() {
  const [instructorOpen, setInstructorOpen] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState<number | null>(
    null
  );
  const [selectedBoat, setSelectedBoat] = useState("");

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
            New Booking
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
            <h2 className="text-center text-[10px] uppercase tracking-[0.2em] font-bold text-white/40 -mt-8">
              Booking Details
            </h2>

            {/* Customer list */}
            <GlassPane className="p-6">
              <div className="w-full max-w-[420px] mx-auto space-y-0">
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

            {/* Stakeholder assignment */}
            <div className="space-y-6 pt-6 border-t border-white/10 relative z-20">
              <div className="grid grid-cols-2 gap-6">
                {/* Instructor dropdown */}
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-white/40 mb-2">
                    Instructor <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setInstructorOpen(!instructorOpen)}
                      className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-sm transition-all flex items-center justify-between hover:border-white/20 cursor-pointer ${
                        instructorOpen
                          ? "border-primary rounded-b-none"
                          : "border-white/10"
                      }`}
                    >
                      <div className="flex flex-col text-left">
                        <div className="flex items-center gap-2">
                          {selectedInstructor !== null ? (
                            <>
                              <span className="text-white">
                                {MOCK_INSTRUCTORS[selectedInstructor].name}
                              </span>
                              {MOCK_INSTRUCTORS[selectedInstructor].flags.map(
                                (f, i) => (
                                  <span key={i} className="text-base">
                                    {f}
                                  </span>
                                )
                              )}
                            </>
                          ) : (
                            <span className="text-white/30 italic">
                              Select
                            </span>
                          )}
                        </div>
                        {selectedInstructor !== null && (
                          <span className="text-[9px] text-white/40 mt-0.5">
                            {MOCK_INSTRUCTORS[selectedInstructor].specialties}
                          </span>
                        )}
                      </div>
                      <span className="material-symbols-outlined text-white/40 text-lg flex-shrink-0">
                        {instructorOpen ? "expand_less" : "expand_more"}
                      </span>
                    </button>
                    {instructorOpen && (
                      <div className="absolute left-0 right-0 top-full bg-glass-pane backdrop-blur-xl border-x border-b border-primary rounded-b-lg shadow-xl z-50 overflow-hidden">
                        {MOCK_INSTRUCTORS.map((inst, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => {
                              setSelectedInstructor(i);
                              setInstructorOpen(false);
                            }}
                            className="flex items-center justify-between w-full px-4 py-3 hover:bg-white/5 cursor-pointer transition-colors border-b border-white/5 last:border-0 text-left"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-white">
                                {inst.name}
                              </span>
                              {inst.flags.map((f, fi) => (
                                <span key={fi} className="text-base">
                                  {f}
                                </span>
                              ))}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Boat dropdown */}
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-white/40 mb-2">
                    Boat <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <select
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-primary appearance-none cursor-pointer hover:border-white/20"
                      value={selectedBoat}
                      onChange={(e) => setSelectedBoat(e.target.value)}
                    >
                      <option value="">Select</option>
                      {MOCK_BOATS.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <span className="material-symbols-outlined text-white/40 text-lg">
                        expand_more
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional services */}
            <div className="space-y-6 pt-6 border-t border-white/10 relative z-10">
              <h2 className="text-center text-[10px] uppercase tracking-[0.2em] font-bold text-white/40">
                Additional Services (Optional)
              </h2>
              <div className="flex flex-wrap gap-4 justify-center">
                {["Liveaboard", "Pool", "Compressor"].map((svc) => (
                  <button
                    key={svc}
                    type="button"
                    className="flex items-center gap-1.5 px-6 py-3 border border-white/10 rounded-sm text-[11px] font-bold uppercase tracking-widest text-white/40 hover:border-primary hover:text-primary transition-all bg-transparent hover:bg-white/5 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      add
                    </span>
                    {svc}
                  </button>
                ))}
              </div>
            </div>

            {/* Real-time availability panel (spec requirement) */}
            <div className="pt-6 border-t border-white/10">
              <GlassPane className="p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-3">
                  Real-Time Availability
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-xs text-white/60">
                      Instructor: Available
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-xs text-white/60">
                      Boat: Available
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                    <span className="text-xs text-white/40">
                      Equipment: N/A
                    </span>
                  </div>
                </div>
                <p className="text-[10px] text-white/30 mt-2">
                  Subscribes to AvailabilitySnapshot via Convex (live when connected)
                </p>
              </GlassPane>
            </div>

            {/* Action buttons */}
            <div className="flex flex-row items-center justify-center gap-6 pt-8">
              <Link
                href="/dc"
                className="px-8 bg-transparent border border-white/10 text-white/40 hover:text-white/70 hover:border-white/20 font-bold py-4 rounded-sm text-[11px] uppercase tracking-widest transition-all w-48 text-center no-underline"
              >
                Cancel
              </Link>
              <button
                type="button"
                className="px-8 bg-white/10 border border-white/10 text-white/60 hover:bg-white/20 font-bold py-4 rounded-sm text-[11px] uppercase tracking-widest transition-all w-48"
              >
                Send to Customer
              </button>
              <button
                type="submit"
                className="px-8 bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-sm transition-all text-[11px] uppercase tracking-widest shadow-lg shadow-primary/20 hover:shadow-primary/30 w-48"
              >
                Submit to Draft
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
