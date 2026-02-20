"use client";

import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { GlassPane } from "@/components/ui/GlassPane";

export default function HelpPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <DashboardNav
        roleName=""
        userName="Matt"
        userInitials="M"
        navLinks={[
          { label: "Dashboard", href: "/dc" },
          { label: "Help", href: "/help", active: true },
        ]}
      />

      <main className="flex-grow py-8 px-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">
            Contact Support
          </h1>

          <GlassPane className="p-8">
            <form
              className="space-y-6"
              onSubmit={(e) => e.preventDefault()}
            >
              {/* Name (auto-filled) */}
              <div>
                <label
                  className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2"
                  htmlFor="help-name"
                >
                  Your Name
                </label>
                <input
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white/50 cursor-not-allowed"
                  id="help-name"
                  type="text"
                  defaultValue="Matt Johnson"
                  disabled
                />
              </div>

              {/* Email (auto-filled) */}
              <div>
                <label
                  className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2"
                  htmlFor="help-email"
                >
                  Your Email
                </label>
                <input
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white/50 cursor-not-allowed"
                  id="help-email"
                  type="email"
                  defaultValue="matt@example.com"
                  disabled
                />
              </div>

              {/* Subject */}
              <div>
                <label
                  className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2"
                  htmlFor="help-subject"
                >
                  Subject{" "}
                  <span className="text-red-400">*</span>
                </label>
                <input
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary"
                  id="help-subject"
                  type="text"
                  placeholder="What can we help with?"
                  required
                />
              </div>

              {/* Message */}
              <div>
                <label
                  className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2"
                  htmlFor="help-message"
                >
                  Message{" "}
                  <span className="text-red-400">*</span>
                </label>
                <textarea
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary resize-none"
                  id="help-message"
                  rows={6}
                  placeholder="Describe your issue or question in detail..."
                  required
                />
              </div>

              {/* Send button */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="px-8 py-3 bg-primary text-white rounded-sm text-[11px] font-bold uppercase tracking-widest hover:bg-primary/90 transition-all shadow-md shadow-primary/20"
                >
                  Send Message
                </button>
              </div>
            </form>
          </GlassPane>
        </div>
      </main>
    </div>
  );
}
