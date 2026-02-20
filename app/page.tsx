"use client";

import Link from "next/link";
import { GlassPane } from "@/components/ui/GlassPane";

const OPERATOR_TIER = [
  { label: "Dive Center", href: "/dc", icon: "scuba_diving", desc: "Booking calendar, manifest, New Booking" },
  { label: "Agent", href: "/agent", icon: "support_agent", desc: "Referral tracking, booking calendar" },
  { label: "Liveaboard", href: "/liveaboard", icon: "sailing", desc: "Voyage calendar, vessel occupancy" },
  { label: "Dive Resort", href: "/resort", icon: "holiday_village", desc: "Booking calendar, room availability" },
];

const RESOURCE_TIER = [
  { label: "Instructor", href: "/instructor", icon: "person", desc: "Schedule, open requests, availability" },
  { label: "Boat Operator", href: "/boat", icon: "directions_boat", desc: "Trip assignments, availability" },
  { label: "Equipment Manager", href: "/gear", icon: "inventory_2", desc: "Equipment allocation requests" },
  { label: "Pool Operator", href: "/pool", icon: "pool", desc: "Session scheduling, availability" },
  { label: "Compressor Operator", href: "/air", icon: "compress", desc: "Fill schedule, air/nitrox requests" },
  { label: "Dive Site Operator", href: "/site", icon: "location_on", desc: "Coming in V1.1" },
];

const SHARED = [
  { label: "Landing", href: "/landing", icon: "home" },
  { label: "Sign In", href: "/signin", icon: "login" },
  { label: "Sign Up", href: "/signup", icon: "person_add" },
  { label: "Settings", href: "/settings", icon: "settings" },
  { label: "Help", href: "/help", icon: "help" },
  { label: "Customer Portal", href: "/customer", icon: "badge" },
];

export default function ScaffoldingMap() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="px-8 py-8">
        <span className="uppercase tracking-[0.3em] font-bold text-[10px] text-white">
          Dive Dispatch
        </span>
      </header>

      <main className="flex-1 px-8 pb-16 max-w-screen-xl mx-auto w-full">
        <h1 className="text-4xl font-light tracking-tight text-white text-center mb-2">
          Scaffolding Map
        </h1>
        <p className="text-sm text-white/50 text-center mb-12">
          All stakeholder dashboards and shared pages
        </p>

        {/* Operator Tier */}
        <section className="mb-12">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-4">
            Operator Tier (Booking Owners)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {OPERATOR_TIER.map((item) => (
              <Link key={item.href} href={item.href} className="no-underline group">
                <GlassPane className="p-5 h-full hover:border-primary/40 hover:shadow-[0_0_20px_var(--color-glass-glow)] transition-all">
                  <span className="material-symbols-outlined text-primary text-[24px] mb-3 block">
                    {item.icon}
                  </span>
                  <p className="text-sm font-semibold text-white group-hover:text-primary transition-colors">
                    {item.label}
                  </p>
                  <p className="text-[11px] text-white/40 mt-1">{item.desc}</p>
                  <p className="text-[10px] font-mono text-white/20 mt-2">{item.href}</p>
                </GlassPane>
              </Link>
            ))}
          </div>
        </section>

        {/* Resource Tier */}
        <section className="mb-12">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-4">
            Resource Tier (Accept Bookings)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {RESOURCE_TIER.map((item) => (
              <Link key={item.href} href={item.href} className="no-underline group">
                <GlassPane className="p-5 h-full hover:border-primary/40 hover:shadow-[0_0_20px_var(--color-glass-glow)] transition-all">
                  <span className="material-symbols-outlined text-primary text-[24px] mb-3 block">
                    {item.icon}
                  </span>
                  <p className="text-sm font-semibold text-white group-hover:text-primary transition-colors">
                    {item.label}
                  </p>
                  <p className="text-[11px] text-white/40 mt-1">{item.desc}</p>
                  <p className="text-[10px] font-mono text-white/20 mt-2">{item.href}</p>
                </GlassPane>
              </Link>
            ))}
          </div>
        </section>

        {/* Shared Pages */}
        <section>
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-4">
            Shared Pages
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {SHARED.map((item) => (
              <Link key={item.href} href={item.href} className="no-underline group">
                <GlassPane className="p-4 text-center hover:border-primary/40 hover:shadow-[0_0_20px_var(--color-glass-glow)] transition-all">
                  <span className="material-symbols-outlined text-primary text-[20px] mb-2 block">
                    {item.icon}
                  </span>
                  <p className="text-[11px] font-semibold text-white group-hover:text-primary transition-colors">
                    {item.label}
                  </p>
                  <p className="text-[9px] font-mono text-white/20 mt-1">{item.href}</p>
                </GlassPane>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
          <p>&copy; 2026 Dive Dispatch.</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Support</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
