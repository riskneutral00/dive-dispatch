"use client";

import { useState } from "react";
import { PortalHeader } from "@/components/customer/PortalHeader";
import { BookingBanner } from "@/components/customer/BookingBanner";
import { ProgressTracker } from "@/components/customer/ProgressTracker";

export default function CustomerLiabilityPage() {
  const [ack, setAck] = useState(false);
  const [insurance, setInsurance] = useState<string>("");

  return (
    <div className="min-h-screen flex flex-col">
      <PortalHeader />

      <main className="flex-grow py-8 px-5">
        <div className="max-w-[600px] mx-auto">
          <BookingBanner formsComplete={2} />
          <ProgressTracker currentStep={3} />

          <form
            className="space-y-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <h2 className="text-lg font-bold text-white mb-1">
                Liability Release
              </h2>
              <p className="text-xs text-white/40">
                Release of Liability / Assumption of Risk (PADI 10086). Please
                read carefully and sign.
              </p>
            </div>

            {/* Non-Agency Disclosure */}
            <div>
              <p className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-3">
                NON-AGENCY DISCLOSURE AND ACKNOWLEDGMENT AGREEMENT
              </p>
              <div>
                <label
                  className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1.5"
                  htmlFor="nad-member"
                >
                  PADI Member / Store / Resort Name{" "}
                  <span className="text-red-400">*</span>
                </label>
                <input
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-primary"
                  id="nad-member"
                  type="text"
                  defaultValue="Matt & Ms. Mermaid's Dive Center"
                />
              </div>
              <div className="mt-4 text-[11px] text-white/40 leading-relaxed p-4 bg-white/5 rounded-lg border border-white/10 max-h-40 overflow-y-auto">
                I understand and agree that PADI Members, including Matt &amp;
                Ms. Mermaid&apos;s Dive Center, and/or any individual PADI
                Instructors and Divemasters associated with the program in which
                I am participating, are licensed to use various PADI Trademarks
                and to conduct PADI training, but are not agents, employees or
                franchisees of PADI Americas, Inc., or its parent, subsidiary
                and affiliated corporations (&ldquo;PADI&rdquo;). I further
                understand that Member business activities are independent, and
                are neither owned nor operated by PADI, and that while PADI
                establishes the standards for PADI diver training programs, it is
                not responsible for, nor does it have the right to control, the
                operation of the Members&apos; business activities and the
                day-to-day conduct of PADI programs and supervision of divers by
                the Members or their associated staff.
              </div>
            </div>

            {/* Liability Release */}
            <div>
              <p className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-3">
                LIABILITY RELEASE AND ASSUMPTION OF RISK AGREEMENT
              </p>
              <div>
                <label
                  className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1.5"
                  htmlFor="lr-name"
                >
                  Your Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary"
                  id="lr-name"
                  type="text"
                  placeholder="I, _______________"
                />
              </div>
              <div className="mt-4 text-[11px] text-white/40 leading-relaxed p-4 bg-white/5 rounded-lg border border-white/10 max-h-52 overflow-y-auto">
                <p className="mb-3">
                  I hereby affirm that I am a certified scuba diver trained in
                  safe dive practices, or a student diver under the control and
                  supervision of a certified scuba instructor. I know that skin
                  diving, freediving and scuba diving have inherent risks
                  including those risks associated with boat travel to and from
                  the dive site (hereinafter &ldquo;Excursion&rdquo;), which may
                  result in serious injury or death.
                </p>
                <p className="mb-3">
                  I understand and agree that neither Matt &amp; Ms.
                  Mermaid&apos;s Dive Center; nor the dive professional(s) who
                  may be present at the dive site, nor PADI Americas, Inc., nor
                  any of their affiliate and subsidiary corporations, nor any of
                  their respective employees, officers, agents, contractors and
                  assigns (hereinafter &ldquo;Released Parties&rdquo;) may be
                  held liable or responsible in any way for any injury, death or
                  other damages to me, my family, estate, heirs or assigns.
                </p>
                <p className="font-semibold text-white/60">
                  I hereby state and agree that this Agreement will be effective
                  for all Excursions in which I participate for{" "}
                  <strong>one (1) year</strong> from the date on which I sign
                  this Agreement.
                </p>
              </div>
            </div>

            {/* Acknowledgment checkbox */}
            <label className="flex items-center gap-3 py-2 cursor-pointer">
              <input
                type="checkbox"
                checked={ack}
                onChange={(e) => setAck(e.target.checked)}
                className="w-4 h-4 accent-primary"
              />
              <span className="text-xs text-white/70 leading-relaxed">
                I have read and fully understand this Release of Liability /
                Assumption of Risk Agreement. I am of lawful age and legally
                competent to sign it of my own free act.
              </span>
            </label>

            {/* Insurance declaration */}
            <div>
              <p className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-3">
                Diver Accident Insurance
              </p>
              <div className="flex items-center gap-6 mb-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="insurance"
                    value="yes"
                    checked={insurance === "yes"}
                    onChange={() => setInsurance("yes")}
                    className="w-4 h-4 accent-primary"
                  />
                  <span className="text-sm text-white/70">
                    Yes, I hold diver accident insurance
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="insurance"
                    value="no"
                    checked={insurance === "no"}
                    onChange={() => setInsurance("no")}
                    className="w-4 h-4 accent-primary"
                  />
                  <span className="text-sm text-white/70">No</span>
                </label>
              </div>
              <div>
                <label
                  className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1.5"
                  htmlFor="insurance-policy"
                >
                  Policy Number
                </label>
                <input
                  className="w-full max-w-[260px] bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary"
                  id="insurance-policy"
                  type="text"
                  placeholder="Policy number"
                />
              </div>
            </div>

            {/* Signature placeholder */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1.5">
                Participant Signature <span className="text-red-400">*</span>
              </label>
              <div className="w-full border-2 border-dashed border-white/10 rounded-lg overflow-hidden bg-white/5 h-24 flex items-center justify-center">
                <p className="text-xs text-white/30">
                  Signature pad (requires canvas integration)
                </p>
              </div>
            </div>

            {/* Parent/guardian */}
            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <p className="text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-1">
                Participant under 18?
              </p>
              <p className="text-xs text-amber-400/70 mb-3">
                A parent or guardian must also sign this form.
              </p>
              <div className="space-y-3">
                <div>
                  <label
                    className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1.5"
                    htmlFor="guardian-name"
                  >
                    Parent / Guardian Name
                  </label>
                  <input
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary"
                    id="guardian-name"
                    type="text"
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1.5">
                    Parent / Guardian Signature
                  </label>
                  <div className="w-full border-2 border-dashed border-white/10 rounded-lg overflow-hidden bg-white/5 h-20 flex items-center justify-center">
                    <p className="text-xs text-white/30">
                      Signature pad (requires canvas integration)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label
                className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1.5"
                htmlFor="l-date"
              >
                Date <span className="text-red-400">*</span>
              </label>
              <input
                className="w-full max-w-[200px] bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-primary"
                id="l-date"
                type="date"
              />
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
