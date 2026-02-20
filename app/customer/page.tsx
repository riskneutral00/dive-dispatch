"use client";

import { PortalHeader } from "@/components/customer/PortalHeader";
import { BookingBanner } from "@/components/customer/BookingBanner";
import { ProgressTracker } from "@/components/customer/ProgressTracker";

export default function CustomerContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PortalHeader />

      <main className="flex-grow py-8 px-5">
        <div className="max-w-[600px] mx-auto">
          <BookingBanner formsComplete={0} />
          <ProgressTracker currentStep={1} />

          <form
            className="space-y-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <h2 className="text-lg font-bold text-white mb-1">
                Contact Information
              </h2>
              <p className="text-xs text-white/40">
                Your personal and emergency contact details.
              </p>
            </div>

            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white/80 border-b border-white/10 pb-2">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label
                    className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1.5"
                    htmlFor="c-name"
                  >
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary"
                    id="c-name"
                    type="text"
                    placeholder="First and last name"
                  />
                </div>
                <div>
                  <label
                    className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1.5"
                    htmlFor="c-email"
                  >
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary"
                    id="c-email"
                    type="email"
                    placeholder="name@example.com"
                  />
                </div>
                <div>
                  <label
                    className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1.5"
                    htmlFor="c-phone"
                  >
                    Phone <span className="text-red-400">*</span>
                  </label>
                  <input
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary"
                    id="c-phone"
                    type="tel"
                    placeholder="+1 555 000 0000"
                  />
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white/80 border-b border-white/10 pb-2">
                Emergency Contact
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1.5"
                    htmlFor="c-ec-name"
                  >
                    Emergency Contact Name{" "}
                    <span className="text-red-400">*</span>
                  </label>
                  <input
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary"
                    id="c-ec-name"
                    type="text"
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label
                    className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1.5"
                    htmlFor="c-ec-phone"
                  >
                    Emergency Contact Phone{" "}
                    <span className="text-red-400">*</span>
                  </label>
                  <input
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary"
                    id="c-ec-phone"
                    type="tel"
                    placeholder="+1 555 000 0000"
                  />
                </div>
                <div>
                  <label
                    className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1.5"
                    htmlFor="c-ec-relation"
                  >
                    Relationship to You
                  </label>
                  <input
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary"
                    id="c-ec-relation"
                    type="text"
                    placeholder="e.g. Spouse, Parent, Friend"
                  />
                </div>
              </div>
            </div>

            {/* Diving Certification */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white/80 border-b border-white/10 pb-2">
                Diving Certification
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1.5"
                    htmlFor="c-agency"
                  >
                    Cert Agency
                  </label>
                  <select
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-primary"
                    id="c-agency"
                  >
                    <option value="">Select</option>
                    <option>PADI</option>
                    <option>SSI</option>
                    <option>NAUI</option>
                    <option>BSAC</option>
                    <option>CMAS</option>
                    <option>None</option>
                  </select>
                </div>
                <div>
                  <label
                    className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1.5"
                    htmlFor="c-cert"
                  >
                    Certification Level
                  </label>
                  <select
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-primary"
                    id="c-cert"
                  >
                    <option value="">Select</option>
                    <option>Open Water</option>
                    <option>Advanced Open Water</option>
                    <option>Rescue Diver</option>
                    <option>Divemaster</option>
                    <option>Instructor</option>
                    <option>None</option>
                  </select>
                </div>
                <div>
                  <label
                    className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1.5"
                    htmlFor="c-certnum"
                  >
                    Cert Number
                  </label>
                  <input
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary"
                    id="c-certnum"
                    type="text"
                    placeholder="e.g. 1234567890"
                  />
                </div>
                <div>
                  <label
                    className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1.5"
                    htmlFor="c-exp"
                  >
                    Years of Diving Experience
                  </label>
                  <select
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-primary"
                    id="c-exp"
                  >
                    <option value="">Select</option>
                    <option>Less than 1 year</option>
                    <option>1-3 years</option>
                    <option>3-5 years</option>
                    <option>5-10 years</option>
                    <option>10+ years</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Health Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white/80 border-b border-white/10 pb-2">
                Health Information
              </h3>
              <div>
                <label
                  className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1.5"
                  htmlFor="c-allergies"
                >
                  Known Allergies{" "}
                  <span className="text-white/30">
                    (food, medication, environmental)
                  </span>
                </label>
                <textarea
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary"
                  id="c-allergies"
                  rows={2}
                  placeholder="List any known allergies, or write 'None'"
                />
              </div>
              <div>
                <label
                  className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1.5"
                  htmlFor="c-medical-conditions"
                >
                  Medical Conditions{" "}
                  <span className="text-white/30">(if any)</span>
                </label>
                <textarea
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary"
                  id="c-medical-conditions"
                  rows={2}
                  placeholder="Any relevant medical conditions we should know about"
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
