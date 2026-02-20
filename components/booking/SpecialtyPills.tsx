"use client";

import { useState } from "react";

const ALL_SPECIALTIES = [
  "Nitrox",
  "DPV",
  "Deep",
  "Wreck",
  "Night",
  "PPB",
  "Drift",
  "Sidemount",
  "Dry Suit",
  "Underwater Photography",
  "Other",
];

interface SpecialtyPillsProps {
  initialSelected?: string[];
  readOnly?: boolean;
}

export function SpecialtyPills({
  initialSelected = [],
  readOnly = false,
}: SpecialtyPillsProps) {
  const [selected, setSelected] = useState<Set<string>>(
    new Set(initialSelected)
  );

  function toggle(s: string) {
    if (readOnly) return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(s)) next.delete(s);
      else next.add(s);
      return next;
    });
  }

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg p-6">
      <div className="flex flex-wrap gap-3 justify-center">
        {ALL_SPECIALTIES.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => toggle(s)}
            className={`px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all border ${
              selected.has(s)
                ? "bg-primary border-primary text-white shadow-md shadow-primary/20"
                : "bg-transparent border-white/10 text-white/40 hover:border-primary/50 hover:text-primary"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
