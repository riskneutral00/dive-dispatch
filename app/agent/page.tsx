"use client";

import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { BookingCalendar, type BookingBar } from "@/components/dashboard/BookingCalendar";
import { WidgetCard } from "@/components/ui/WidgetCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import Link from "next/link";

const WEEK1: BookingBar[] = [
  { cols: [0, 1, 2], status: "completed", divers: [{ name: "Chen Wei", abbrev: "OW" }, { name: "Park Ji", abbrev: "OW" }] },
  { cols: [2, 3, 4], status: "referred", divers: [{ name: "Rodriguez M.", abbrev: "OW" }, { name: "Torres A.", abbrev: "OW" }] },
  { cols: [5, 6], status: "completed", divers: [{ name: "Yamamoto K.", abbrev: "FD" }] },
];

const WEEK2: BookingBar[] = [
  { cols: [0, 1, 2], status: "referred", divers: [{ name: "Muller F.", abbrev: "FD" }, { name: "Schmidt O.", abbrev: "FD" }, { name: "Wagner H.", abbrev: "FD" }, { name: "Becker L.", abbrev: "FD" }] },
  { cols: [3, 4, 5], status: "active", divers: [{ name: "Petrov A.", abbrev: "AOW" }, { name: "Volkov D.", abbrev: "AOW" }] },
  { cols: [6], status: "active", divers: [{ name: "Hassan F.", abbrev: "FD" }] },
];

const WEEK3: BookingBar[] = [
  { cols: [1, 2, 3], status: "active", divers: [{ name: "Tanaka H.", abbrev: "OW" }, { name: "Suzuki M.", abbrev: "OW" }] },
  { cols: [4, 5], status: "pending", divers: [{ name: "Singh R.", abbrev: "AOW" }] },
  { cols: [0], status: "pending", divers: [{ name: "Ali M.", abbrev: "TD" }] },
  { cols: [5, 6], status: "referred", divers: [{ name: "Nguyen T.", abbrev: "AOW" }, { name: "Tran V.", abbrev: "AOW" }, { name: "Le H.", abbrev: "AOW" }] },
];

const WEEK4: BookingBar[] = [
  { cols: [0, 1], status: "pending", divers: [{ name: "Costa R.", abbrev: "FD" }, { name: "Santos J.", abbrev: "FD" }] },
  { cols: [2, 3, 4], status: "draft", divers: [{ name: "Gomez C.", abbrev: "OW" }, { name: "Reyes A.", abbrev: "OW" }] },
  { cols: [5, 6], status: "draft", divers: [{ name: "Kim S.", abbrev: "TD" }] },
];

const REFERRED_BOOKINGS = [
  { id: "BK-026-R01", status: "referred" as const, desc: "OW Course -- 2 divers", date: "Feb 3-5 -- Blue Horizon DC" },
  { id: "BK-026-R02", status: "active" as const, desc: "Fun Dive -- 4 divers", date: "Feb 12 -- Blue Horizon DC" },
  { id: "BK-026-R03", status: "pending" as const, desc: "AOW Course -- 3 divers", date: "Feb 22-23 -- Blue Horizon DC" },
];

export default function AgentDashboard() {
  return (
    <>
      <DashboardNav
        roleName=""
        userName="Matt Lee"
        userInitials="ML"
        navLinks={[{ label: "Dashboard", href: "/agent", active: true }]}
        showResources
      />
      <DashboardShell>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex-1" />
          <h1 className="text-3xl font-light tracking-tight text-white">
            Island Hoppers Travel Agency
          </h1>
          <div className="flex-1 flex justify-end">
            <Link
              href="/booking/new"
              className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-md text-[11px] uppercase tracking-widest transition-all shadow-md shadow-primary/20 hover:shadow-primary/30 flex items-center gap-2 no-underline"
            >
              <span className="material-symbols-outlined text-base">add</span>
              New Booking
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
          {/* Calendar */}
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
            legendStatuses={["Pending", "Active", "Completed", "Referred"]}
          />

          {/* Sidebar */}
          <div className="flex flex-col gap-4">
            <WidgetCard title="Referred Bookings">
              <div className="flex flex-col divide-y divide-glass-border">
                {REFERRED_BOOKINGS.map((bk) => (
                  <div key={bk.id} className="py-3 first:pt-0 last:pb-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-[11px] font-bold uppercase tracking-widest text-white/40">
                        {bk.id}
                      </p>
                      <StatusBadge status={bk.status} />
                    </div>
                    <p className="text-sm font-medium text-white/80">{bk.desc}</p>
                    <p className="text-[11px] text-white/50 mt-0.5">{bk.date}</p>
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
