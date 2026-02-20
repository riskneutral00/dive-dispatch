"use client";

import { useState } from "react";
import { PortalHeader } from "@/components/customer/PortalHeader";
import { BookingBanner } from "@/components/customer/BookingBanner";
import { ProgressTracker } from "@/components/customer/ProgressTracker";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const BOOT_SIZES = ["3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"];
const BRINGING_OPTIONS = [
  "BCD",
  "Regulator",
  "Wetsuit",
  "Mask",
  "Fins",
  "Dive Computer",
  "Torch / Light",
];

export default function CustomerEquipmentPage() {
  const [bringing, setBringing] = useState<Set<string>>(new Set());
  const [lenses, setLenses] = useState<string>("");

  function toggleBringing(item: string) {
    setBringing((prev) => {
      const next = new Set(prev);
      if (next.has(item)) next.delete(item);
      else next.add(item);
      return next;
    });
  }

  return (
    <div className="min-h-screen flex flex-col">
      <PortalHeader />

      <main className="flex-grow py-8 px-5">
        <div className="max-w-[600px] mx-auto">
          <BookingBanner formsComplete={3} />
          <ProgressTracker currentStep={4} />

          <form
            className="space-y-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <h2 className="text-lg font-bold text-white mb-1">
                Equipment Sizing
              </h2>
              <p className="text-xs text-white/40">
                Provide your measurements and equipment preferences.
              </p>
            </div>

            {/* Body Measurements */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white/80 border-b border-white/10 pb-2">
                Body Measurements
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1.5"
                    htmlFor="e-height-value"
                  >
                    Height
                  </label>
                  <div className="flex gap-2">
                    <input
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary"
                      id="e-height-value"
                      type="number"
                      placeholder="e.g. 175"
                    />
                    <select
                      className="bg-white/5 border border-white/10 rounded-lg px-3 py-3 text-sm text-white focus:outline-none focus:border-primary"
                      style={{ flex: "0 0 80px" }}
                    >
                      <option>cm</option>
                      <option>in</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label
                    className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1.5"
                    htmlFor="e-weight-value"
                  >
                    Weight
                  </label>
                  <div className="flex gap-2">
                    <input
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary"
                      id="e-weight-value"
                      type="number"
                      placeholder="e.g. 70"
                    />
                    <select
                      className="bg-white/5 border border-white/10 rounded-lg px-3 py-3 text-sm text-white focus:outline-none focus:border-primary"
                      style={{ flex: "0 0 80px" }}
                    >
                      <option>kg</option>
                      <option>lbs</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label
                    className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1.5"
                    htmlFor="e-shoe-value"
                  >
                    Shoe Size
                  </label>
                  <div className="flex gap-2">
                    <input
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary"
                      id="e-shoe-value"
                      type="text"
                      placeholder="e.g. 42"
                    />
                    <select
                      className="bg-white/5 border border-white/10 rounded-lg px-3 py-3 text-sm text-white focus:outline-none focus:border-primary"
                      style={{ flex: "0 0 80px" }}
                    >
                      <option>EU</option>
                      <option>US</option>
                      <option>JP</option>
                      <option>CN</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Equipment Sizes */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white/80 border-b border-white/10 pb-2">
                Equipment Sizes
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1.5"
                    htmlFor="e-wetsuit"
                  >
                    Wetsuit Size
                  </label>
                  <select
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-primary"
                    id="e-wetsuit"
                  >
                    <option value="">Select (optional)</option>
                    {SIZES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1.5"
                    htmlFor="e-bcd"
                  >
                    BCD Size
                  </label>
                  <select
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-primary"
                    id="e-bcd"
                  >
                    <option value="">Select (optional)</option>
                    {SIZES.slice(0, 5).map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1.5"
                    htmlFor="e-fins"
                  >
                    Fin Size
                  </label>
                  <select
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-primary"
                    id="e-fins"
                  >
                    <option value="">Select (optional)</option>
                    {SIZES.slice(0, 5).map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1.5"
                    htmlFor="e-boots"
                  >
                    Boot Size
                  </label>
                  <select
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-primary"
                    id="e-boots"
                  >
                    <option value="">Select (optional)</option>
                    {BOOT_SIZES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1.5"
                    htmlFor="e-mask"
                  >
                    Mask Size
                  </label>
                  <select
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-primary"
                    id="e-mask"
                  >
                    <option value="">Select (optional)</option>
                    {["XS", "S", "M", "L"].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Powered Lenses */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white/80 border-b border-white/10 pb-2">
                Powered Lenses
              </h3>
              <div>
                <p className="text-sm text-white/70 mb-3">
                  Do you need corrective lenses in your mask?
                </p>
                <div className="flex items-center gap-6 mb-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="powered-lenses"
                      value="yes"
                      checked={lenses === "yes"}
                      onChange={() => setLenses("yes")}
                      className="w-4 h-4 accent-primary"
                    />
                    <span className="text-sm text-white/70">Yes</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="powered-lenses"
                      value="no"
                      checked={lenses === "no"}
                      onChange={() => setLenses("no")}
                      className="w-4 h-4 accent-primary"
                    />
                    <span className="text-sm text-white/70">No</span>
                  </label>
                </div>
                <div>
                  <label
                    className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1.5"
                    htmlFor="e-prescription"
                  >
                    Prescription Details (if applicable)
                  </label>
                  <textarea
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary"
                    id="e-prescription"
                    rows={2}
                    placeholder="e.g. Left: -2.00, Right: -2.50"
                  />
                </div>
              </div>
            </div>

            {/* Equipment You're Bringing */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white/80 border-b border-white/10 pb-2">
                Equipment You&apos;re Bringing
              </h3>
              <p className="text-xs text-white/40 mb-3">
                Select any equipment you plan to bring:
              </p>
              <div className="space-y-2">
                {BRINGING_OPTIONS.map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-3 py-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={bringing.has(item)}
                      onChange={() => toggleBringing(item)}
                      className="w-4 h-4 accent-primary"
                    />
                    <span className="text-sm text-white/70">{item}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Additional Notes */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white/80 border-b border-white/10 pb-2">
                Additional Notes
              </h3>
              <div>
                <label
                  className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1.5"
                  htmlFor="e-notes"
                >
                  Equipment Notes or Special Requests
                </label>
                <textarea
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary"
                  id="e-notes"
                  rows={3}
                  placeholder="Any special equipment needs, preferences, or allergies to wetsuit materials?"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-8 py-3 bg-primary text-white rounded-sm text-[11px] font-bold uppercase tracking-widest hover:bg-primary/90 transition-all shadow-md shadow-primary/20"
              >
                Submit Form
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
