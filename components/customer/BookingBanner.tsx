"use client";

import { GlassPane } from "@/components/ui/GlassPane";

interface BookingBannerProps {
  formsComplete: number;
  totalForms?: number;
  courseName?: string;
  dates?: string;
  centerName?: string;
}

export function BookingBanner({
  formsComplete,
  totalForms = 4,
  courseName = "Advanced Open Water \u2014 PADI",
  dates = "March 1 \u2013 2, 2025",
  centerName = "Matt & Ms. Mermaid's Dive Center",
}: BookingBannerProps) {
  const allDone = formsComplete >= totalForms;

  return (
    <GlassPane className="mb-6 p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
          Your Booking
        </p>
        <p
          className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
            allDone
              ? "bg-emerald-500/20 text-emerald-400"
              : "bg-amber-500/20 text-amber-400"
          }`}
        >
          {formsComplete} of {totalForms} forms done
        </p>
      </div>
      <div>
        <p className="text-sm font-semibold text-white">{courseName}</p>
        <p className="text-xs text-white/40 mt-0.5">
          {dates} &middot; {centerName}
        </p>
      </div>
    </GlassPane>
  );
}
