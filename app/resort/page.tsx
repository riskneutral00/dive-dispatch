"use client";

import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { BookingCalendar, type BookingBar } from "@/components/dashboard/BookingCalendar";
import { WidgetCard } from "@/components/ui/WidgetCard";
import Link from "next/link";

const WEEK1: BookingBar[] = [
  { cols: [0, 1, 2], status: "completed", divers: [{ name: "Chen W. -- Clownfish Suite", abbrev: "3d" }] },
  { cols: [3, 4, 5, 6], status: "completed", divers: [{ name: "Park J. -- Manta Room", abbrev: "4d" }] },
];

const WEEK2: BookingBar[] = [
  { cols: [1, 2], status: "completed", divers: [{ name: "Yamamoto K. -- Turtle Bay", abbrev: "2d" }] },
  { cols: [4, 5, 6], status: "active", divers: [{ name: "Hassan F. -- Manta Room", abbrev: "3d" }] },
  { cols: [0], status: "completed", divers: [{ name: "Singh R. -- Clownfish Suite", abbrev: "1d" }] },
];

const WEEK3: BookingBar[] = [
  { cols: [0, 1, 2, 3, 4], status: "active", divers: [{ name: "Valentina C. -- Clownfish Suite", abbrev: "5d" }] },
  { cols: [1, 2, 3], status: "active", divers: [{ name: "Tanaka H. -- Whale Shark Dorm", abbrev: "3d" }] },
  { cols: [5, 6], status: "pending", divers: [{ name: "Lopez C. -- Turtle Bay", abbrev: "2d" }] },
];

const WEEK4: BookingBar[] = [
  { cols: [0, 1, 2, 3], status: "pending", divers: [{ name: "Nguyen T. -- Manta Room", abbrev: "4d" }] },
  { cols: [4, 5, 6], status: "draft", divers: [{ name: "Schmidt O. -- Clownfish Suite", abbrev: "3d" }] },
];

const ROOMS = [
  { name: "Clownfish Suite", status: "occupied" },
  { name: "Manta Room", status: "occupied" },
  { name: "Whale Shark Dorm", status: "available" },
  { name: "Turtle Bay Room", status: "occupied" },
];

export default function ResortDashboard() {
  const occupiedCount = ROOMS.filter((r) => r.status === "occupied").length;

  return (
    <>
      <DashboardNav
        roleName=""
        userName="Matt Lee"
        userInitials="ML"
        navLinks={[
          { label: "Dashboard", href: "/resort", active: true },
          { label: "Rooms", href: "#" },
        ]}
        showResources
      />
      <DashboardShell>
        <div className="flex items-center justify-between mb-8">
          <div className="flex-1" />
          <h1 className="text-3xl font-light tracking-tight text-white">
            Coral House Dive Resort
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
            <WidgetCard title="Room Availability -- Today">
              <div className="flex flex-col gap-2">
                {ROOMS.map((room) => (
                  <div
                    key={room.name}
                    className="flex items-center justify-between py-2 border-b border-glass-border last:border-0"
                  >
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px] text-white/40">
                        hotel
                      </span>
                      <span className="text-sm font-medium text-white/80">
                        {room.name}
                      </span>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[10px] font-semibold ${
                        room.status === "occupied"
                          ? "bg-green-500/10 text-green-300"
                          : "bg-white/5 text-white/40"
                      }`}
                    >
                      {room.status === "occupied" ? "Occupied" : "Available"}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-glass-border text-[11px] text-white/50">
                {occupiedCount} of {ROOMS.length} rooms occupied tonight
              </div>
            </WidgetCard>
          </div>
        </div>
      </DashboardShell>
    </>
  );
}
