"use client";

import { PortalHeader } from "@/components/customer/PortalHeader";
import { BookingBanner } from "@/components/customer/BookingBanner";
import { ProgressTracker } from "@/components/customer/ProgressTracker";

export default function CustomerConfirmationPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PortalHeader />

      <main className="flex-grow py-12 px-5 flex items-center justify-center">
        <div className="max-w-[600px] w-full">
          {/* Success icon */}
          <div className="mb-8 flex justify-center">
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-emerald-500 text-white">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 48 }}
              >
                check
              </span>
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">
              All Forms Submitted
            </h1>
            <p className="text-sm text-white/50">
              Your dive center will be in touch. See you in the water!
            </p>
          </div>

          <BookingBanner formsComplete={4} />
          <ProgressTracker currentStep={5} />

          {/* Contact link */}
          <div className="text-center mt-4">
            <button
              type="button"
              className="text-primary hover:text-primary/80 font-semibold text-sm transition-colors"
            >
              Contact Dive Center &rarr;
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
