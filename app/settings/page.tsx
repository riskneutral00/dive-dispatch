"use client";

import { useState } from "react";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { GlassPane } from "@/components/ui/GlassPane";

const ROLES = [
  "Dive Center",
  "Instructor",
  "Agent",
  "Boat Manager",
  "Equipment",
  "Liveaboard",
];

export default function SettingsPage() {
  const [activeRoles, setActiveRoles] = useState<Set<string>>(
    new Set(["Dive Center"])
  );
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [language, setLanguage] = useState("en");

  function toggleRole(role: string) {
    setActiveRoles((prev) => {
      const next = new Set(prev);
      if (next.has(role)) next.delete(role);
      else next.add(role);
      return next;
    });
  }

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardNav
        roleName=""
        userName="Matt"
        userInitials="M"
        navLinks={[
          { label: "Dashboard", href: "/dc" },
          { label: "Settings", href: "/settings", active: true },
        ]}
      />

      <main className="flex-grow py-8 px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>

          {/* Profile Section */}
          <GlassPane className="p-5 mb-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-4">
              Profile
            </p>
            <div className="space-y-6">
              <div>
                <label
                  className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2"
                  htmlFor="profile-name"
                >
                  Full Name
                </label>
                <input
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white/50 cursor-not-allowed"
                  id="profile-name"
                  type="text"
                  defaultValue="Matt Johnson"
                  disabled
                />
                <p className="text-xs text-white/30 mt-1">Managed by Clerk</p>
              </div>
              <div>
                <label
                  className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2"
                  htmlFor="profile-email"
                >
                  Email
                </label>
                <input
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white/50 cursor-not-allowed"
                  id="profile-email"
                  type="email"
                  defaultValue="matt@example.com"
                  disabled
                />
                <p className="text-xs text-white/30 mt-1">Managed by Clerk</p>
              </div>
            </div>
          </GlassPane>

          {/* Roles Section */}
          <GlassPane className="p-5 mb-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-4">
              Roles
            </p>
            <p className="text-xs text-white/50 mb-4">
              Select one or more roles to manage
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {ROLES.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => toggleRole(role)}
                  className={`w-full py-2.5 px-3 text-[10px] uppercase tracking-wider border transition-all text-center rounded-sm ${
                    activeRoles.has(role)
                      ? "bg-primary border-primary text-white hover:bg-primary/90"
                      : "border-white/10 text-white/40 bg-transparent hover:border-white/20 hover:text-white/60"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </GlassPane>

          {/* Preferences Section */}
          <GlassPane className="p-5 mb-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-4">
              Preferences
            </p>
            <div className="space-y-6">
              {/* Theme */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">
                  Theme
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setTheme("light")}
                    className={`flex items-center gap-3 p-3 border rounded-lg transition-all flex-1 ${
                      theme === "light"
                        ? "border-primary bg-primary/10"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    <span className="material-symbols-outlined text-lg text-white/60">
                      light_mode
                    </span>
                    <span className="text-[10px] font-semibold text-white/60">
                      Light
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTheme("dark")}
                    className={`flex items-center gap-3 p-3 border rounded-lg transition-all flex-1 ${
                      theme === "dark"
                        ? "border-primary bg-primary/10"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    <span className="material-symbols-outlined text-lg text-white/60">
                      dark_mode
                    </span>
                    <span className="text-[10px] font-semibold text-white/60">
                      Dark
                    </span>
                  </button>
                </div>
              </div>

              {/* Language */}
              <div>
                <label
                  className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2"
                  htmlFor="language"
                >
                  Language
                </label>
                <select
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary"
                  id="language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="en">English</option>
                  <option value="es">Espanol</option>
                  <option value="fr">Francais</option>
                  <option value="de">Deutsch</option>
                  <option value="th">Thai</option>
                </select>
              </div>
            </div>
          </GlassPane>

          {/* Save button */}
          <div className="flex justify-end">
            <button
              type="button"
              className="px-8 py-3 bg-primary text-white rounded-sm text-[11px] font-bold uppercase tracking-widest hover:bg-primary/90 transition-all shadow-md shadow-primary/20"
            >
              Save Changes
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
