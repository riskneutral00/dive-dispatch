"use client";

import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { BookingCalendar, type BookingBar } from "@/components/dashboard/BookingCalendar";
import Link from "next/link";

const WEEK1: BookingBar[] = [
  { cols: [0, 1], status: "completed", divers: [{ name: "Rodriguez M.", abbrev: "FD" }, { name: "Osei K.", abbrev: "FD" }] },
  { cols: [2, 3, 4], status: "completed", divers: [{ name: "Chen Wei", abbrev: "OW" }, { name: "Park Ji-yeon", abbrev: "OW" }] },
  { cols: [5, 6], status: "completed", divers: [{ name: "Yamamoto K.", abbrev: "AOW" }, { name: "Hassan F.", abbrev: "AOW" }] },
  { cols: [0], status: "completed", divers: [{ name: "Davis K.", abbrev: "TD" }] },
];

const WEEK2: BookingBar[] = [
  { cols: [0], status: "completed", divers: [{ name: "Kim D.", abbrev: "TD" }, { name: "Petrov A.", abbrev: "TD" }, { name: "Santos R.", abbrev: "TD" }] },
  { cols: [1, 2, 3], status: "completed", divers: [{ name: "Singh R.", abbrev: "OW" }, { name: "Nakamura T.", abbrev: "OW" }] },
  { cols: [4, 5], status: "completed", divers: [{ name: "Volkov D.", abbrev: "FD" }, { name: "Chen X.", abbrev: "FD" }] },
  { cols: [6], status: "active", divers: [{ name: "Valentina Conti", abbrev: "AOW" }, { name: "Marco Ferretti", abbrev: "FD" }] },
];

const WEEK3: BookingBar[] = [
  { cols: [0], status: "active", divers: [{ name: "Valentina Conti", abbrev: "AOW" }, { name: "Marco Ferretti", abbrev: "FD" }] },
  { cols: [1], status: "pending", divers: [{ name: "Shi Zhen", abbrev: "TD" }, { name: "Liang Hua", abbrev: "TD" }] },
  { cols: [2, 3, 4], status: "pending", divers: [{ name: "Bernstein E.", abbrev: "OW" }, { name: "Tanaka H.", abbrev: "OW" }, { name: "Lopez C.", abbrev: "OW" }] },
  { cols: [4, 5, 6], status: "pending", divers: [{ name: "Kowalski P.", abbrev: "OW" }, { name: "Dubois C.", abbrev: "OW" }] },
  { cols: [6], status: "draft", divers: [{ name: "Johnson B.", abbrev: "TD" }, { name: "White C.", abbrev: "TD" }] },
];

const WEEK4: BookingBar[] = [
  { cols: [0, 1, 2, 3], status: "pending", divers: [{ name: "Nakamura S.", abbrev: "OW+FD" }, { name: "Torres M.", abbrev: "OW+FD" }] },
  { cols: [4, 5, 6], status: "draft", divers: [{ name: "Hassan M.", abbrev: "FD" }, { name: "Singh A.", abbrev: "FD" }] },
  { cols: [0, 1, 2], status: "pending", divers: [{ name: "Schmidt O.", abbrev: "OW" }, { name: "Ferreira L.", abbrev: "OW" }] },
  { cols: [5, 6], status: "draft", divers: [{ name: "Jensen M.", abbrev: "OW" }, { name: "Andersen P.", abbrev: "OW" }] },
];

export default function DiveCenterDashboard() {
  return (
    <>
      <DashboardNav
        roleName=""
        userName="Matt Lee"
        userInitials="ML"
        navLinks={[{ label: "Dive Center", href: "/dc", active: true }]}
        showResources
      />
      <DashboardShell>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex-1" />
          <h1 className="text-3xl font-light tracking-tight text-white">
            Matt & Ms. Mermaid&apos;s Dive Center
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
        />
      </DashboardShell>
    </>
  );
}
