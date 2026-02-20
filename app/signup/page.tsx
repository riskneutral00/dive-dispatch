"use client";

import { useState } from "react";
import Link from "next/link";

const ROLES = [
  { key: "boat", label: "Boat" },
  { key: "pool", label: "Pool" },
  { key: "agent", label: "Agent" },
  { key: "equipment", label: "Equipment" },
  { key: "liveaboard", label: "Liveaboard" },
  { key: "diveSite", label: "Dive Site" },
  { key: "diveResort", label: "Dive Resort" },
  { key: "diveCenter", label: "Dive Center" },
  { key: "compressor", label: "Compressor" },
  { key: "instructor", label: "Instructor" },
];

export default function SignUpPage() {
  const [selectedRoles, setSelectedRoles] = useState<Set<string>>(new Set());

  function toggleRole(key: string) {
    setSelectedRoles((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="w-full py-8 px-8 md:px-12 flex justify-between items-center fixed top-0 z-20">
        <Link
          className="flex items-center gap-2 text-[11px] font-semibold text-white/80 transition-colors uppercase tracking-widest hover:text-primary no-underline"
          href="/landing"
        >
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_back</span>
          <span className="hidden sm:inline">Back</span>
        </Link>
        <Link
          className="text-[11px] font-semibold text-white/80 transition-colors uppercase tracking-widest hover:text-primary no-underline"
          href="/help"
        >
          Contact
        </Link>
      </nav>

      {/* Main */}
      <main className="flex-grow flex items-center justify-center py-24 px-4 sm:px-6 relative z-10">
        <div className="w-full max-w-[420px] flex flex-col items-center">
          <div className="mb-14 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-white uppercase">
              Dive Dispatch
            </h1>
          </div>

          <form
            className="w-full space-y-10"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="space-y-8">
              <div className="relative group">
                <label
                  className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1 transition-colors group-focus-within:text-primary"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="w-full py-2 border-0 border-b border-white/10 bg-transparent text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary"
                  id="name"
                  placeholder="Full name"
                  required
                  type="text"
                />
              </div>
              <div className="relative group">
                <label
                  className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1 transition-colors group-focus-within:text-primary"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="w-full py-2 border-0 border-b border-white/10 bg-transparent text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary"
                  id="email"
                  placeholder="name@example.com"
                  required
                  type="email"
                />
              </div>
              <div className="relative group">
                <label
                  className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1 transition-colors group-focus-within:text-primary"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="w-full py-2 border-0 border-b border-white/10 bg-transparent text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary"
                  id="password"
                  placeholder="--------"
                  required
                  type="password"
                />
              </div>
            </div>

            {/* Role selection */}
            <div className="pt-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-6 text-center">
                Select Roles
              </p>
              <div className="grid grid-cols-2 gap-3">
                {ROLES.map((role) => (
                  <button
                    key={role.key}
                    type="button"
                    onClick={() => toggleRole(role.key)}
                    className={`w-full py-2.5 px-3 text-[11px] uppercase tracking-wider border transition-all text-center rounded-sm ${
                      selectedRoles.has(role.key)
                        ? "bg-primary border-primary text-white hover:bg-primary/90"
                        : "border-white/10 text-white/50 bg-transparent hover:border-white/20 hover:text-white/70"
                    }`}
                  >
                    {role.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6">
              <button
                className="w-full py-4 bg-primary text-white text-[11px] font-bold uppercase tracking-[0.25em] rounded-sm hover:bg-primary/90 transition-all shadow-md shadow-primary/20"
                type="submit"
              >
                Create Account
              </button>
            </div>
          </form>

          <div className="mt-12 text-center">
            <p className="text-[10px] text-white/30 tracking-wider uppercase">
              Already have an account?{" "}
              <Link
                className="text-white font-bold hover:text-primary transition-colors ml-1 no-underline"
                href="/signin"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
