"use client";

import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { BookingCalendar, type BookingBar } from "@/components/dashboard/BookingCalendar";
import { WidgetCard } from "@/components/ui/WidgetCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import Link from "next/link";

const WEEK1: BookingBar[] = [
  { cols: [2, 3, 4, 5, 6], status: "completed", divers: [{ name: "Raja Ampat Explorer", abbrev: "7d" }, { name: "12 divers", abbrev: "" }] },
];

const WEEK2: BookingBar[] = [
  { cols: [0, 1], status: "completed", divers: [{ name: "Raja Ampat (cont.)", abbrev: "" }] },
  { cols: [3, 4, 5, 6], status: "active", divers: [{ name: "Komodo Expedition", abbrev: "5d" }, { name: "8 divers", abbrev: "" }] },
];

const WEEK3: BookingBar[] = [
  { cols: [1, 2, 3, 4, 5], status: "active", divers: [{ name: "Komodo (cont.)", abbrev: "" }] },
];

const WEEK4: BookingBar[] = [
  { cols: [3, 4, 5, 6], status: "pending", divers: [{ name: "Banda Sea Deep", abbrev: "10d" }, { name: "6 divers", abbrev: "" }] },
];

const VOYAGES = [
  { name: "Raja Ampat Explorer", desc: "7 days -- Feb 3-9 -- 12 cabins", status: "completed" as const, label: "Done", filled: 12, total: 12 },
  { name: "Komodo Expedition", desc: "5 days -- Feb 17-21 -- 10 cabins", status: "active" as const, label: "Active", filled: 8, total: 10 },
  { name: "Banda Sea Deep", desc: "10 days -- Feb 25-Mar 6 -- 12 cabins", status: "pending" as const, label: "Pending", filled: 6, total: 12 },
];

export default function LiveaboardDashboard() {
  return (
    <>
      <DashboardNav
        roleName=""
        userName="Matt Lee"
        userInitials="ML"
        navLinks={[
          { label: "Dashboard", href: "/liveaboard", active: true },
          { label: "Voyages", href: "#" },
          { label: "Cabins", href: "#" },
        ]}
        showResources
      />
      <DashboardShell>
        <div className="flex items-center justify-between mb-8">
          <div className="flex-1" />
          <h1 className="text-3xl font-light tracking-tight text-white">
            Deep Blue Liveaboard
          </h1>
          <div className="flex-1 flex justify-end">
            <Link
              href="/booking/new"
              className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-md text-[11px] uppercase tracking-widest transition-all shadow-md shadow-primary/20 hover:shadow-primary/30 flex items-center gap-2 no-underline"
            >
              <span className="material-symbols-outlined text-base">add</span>
              New Voyage
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
          <BookingCalendar
            month="February"
            year={2026}
            todayDate={20}
            weeks={[
              { data: WEEK1, startDate: 1 },
              { data: WEEK2, startDate: 8 },
              { data: WEEK3, startDate: 15 },
              { data: WEEK4, startDate: 22 },
            ]}
          />

          <div className="flex flex-col gap-4">
            <WidgetCard title="Vessel Occupancy">
              <div className="flex flex-col gap-5">
                {VOYAGES.map((v) => (
                  <div key={v.name}>
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <p className="text-sm font-semibold text-white/90">{v.name}</p>
                        <p className="text-[11px] text-white/50">{v.desc}</p>
                      </div>
                      <StatusBadge status={v.status} label={v.label} />
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-2 rounded-full bg-primary transition-all"
                          style={{ width: `${(v.filled / v.total) * 100}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-semibold text-white/70">
                        {v.filled}/{v.total}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </WidgetCard>
          </div>
        </div>
      </DashboardShell>
    </>
  );
}
