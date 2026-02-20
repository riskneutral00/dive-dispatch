"use client";

import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { BookingCalendar, type BookingBar } from "@/components/dashboard/BookingCalendar";
import { WidgetCard } from "@/components/ui/WidgetCard";
import Link from "next/link";

const WEEK1: BookingBar[] = [
  { cols: [1, 2, 3], status: "completed", divers: [{ name: "Pranee S.", abbrev: "OW" }, { name: "Kiri D.", abbrev: "OW" }] },
  { cols: [4, 5], status: "completed", divers: [{ name: "Thana N.", abbrev: "AOW" }, { name: "Bua W.", abbrev: "AOW" }, { name: "Dao M.", abbrev: "AOW" }] },
];

const WEEK2: BookingBar[] = [
  { cols: [1], status: "completed", divers: [{ name: "John K.", abbrev: "FD" }, { name: "Sara L.", abbrev: "FD" }] },
  { cols: [4, 5, 6], status: "completed", divers: [{ name: "Marco F.", abbrev: "OW" }, { name: "Lucia R.", abbrev: "OW" }, { name: "Amit S.", abbrev: "OW" }] },
];

const WEEK3: BookingBar[] = [
  { cols: [0, 1], status: "active", divers: [{ name: "Valentina C.", abbrev: "AOW" }, { name: "Sofia E.", abbrev: "AOW" }] },
  { cols: [2], status: "draft", divers: [{ name: "Patel R.", abbrev: "FD" }, { name: "Nguyen T.", abbrev: "FD" }] },
  { cols: [3, 4, 5], status: "pending", divers: [{ name: "Tanaka H.", abbrev: "OW" }, { name: "Kim J.", abbrev: "OW" }] },
  { cols: [6], status: "pending", divers: [{ name: "Garcia M.", abbrev: "TD" }] },
];

const WEEK4: BookingBar[] = [
  { cols: [0], status: "pending", divers: [{ name: "Chen W.", abbrev: "TD" }, { name: "Park S.", abbrev: "TD" }, { name: "Sato K.", abbrev: "TD" }] },
  { cols: [2], status: "pending", divers: [{ name: "Smith J.", abbrev: "TD" }, { name: "Lee C.", abbrev: "TD" }] },
  { cols: [3], status: "draft", divers: [{ name: "Rodriguez M.", abbrev: "FD" }, { name: "Torres L.", abbrev: "FD" }, { name: "Silva A.", abbrev: "FD" }, { name: "Kim D.", abbrev: "FD" }] },
];

interface DraftRequest {
  divecenter: string;
  dateStr: string;
  courseLabel: string;
  diverCount: number;
}

const OPEN_REQUESTS: DraftRequest[] = [
  { divecenter: "Matt & Ms. Mermaid's Dive Center", dateStr: "Feb 17", courseLabel: "Fun Dive", diverCount: 2 },
  { divecenter: "Similan Dive Center", dateStr: "Feb 25", courseLabel: "Fun Dive", diverCount: 4 },
  { divecenter: "Matt & Ms. Mermaid's Dive Center", dateStr: "Mar 1-2", courseLabel: "Adv. Open Water", diverCount: 2 },
];

export default function InstructorDashboard() {
  return (
    <>
      <DashboardNav
        roleName=""
        userName="Riya"
        userInitials="R"
        showBackButton
      />
      <DashboardShell>
        {/* Top widget placeholder */}
        <div className="backdrop-blur-xl bg-glass-pane border border-glass-border rounded-lg p-5 mb-6 min-h-[80px]" />

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

        {/* Widgets row */}
        <div className="flex gap-6 mt-6 items-start">
          {/* Open Requests */}
          <WidgetCard title="Open Requests" className="flex-1">
            <div className="space-y-3">
              {OPEN_REQUESTS.map((req, i) => (
                <div
                  key={i}
                  className="rounded-md border border-glass-border p-3"
                >
                  <p className="text-[9px] font-bold uppercase tracking-widest text-white/40 mb-1">
                    {req.divecenter}
                  </p>
                  <p className="text-sm font-medium text-white/90 mb-1">
                    {req.dateStr} &mdash; {req.courseLabel} &middot; {req.diverCount} diver{req.diverCount !== 1 ? "s" : ""}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/5 text-white/40 flex-shrink-0">
                      Draft
                    </span>
                    <button className="flex-1 text-center text-[10px] font-bold uppercase tracking-wider text-primary hover:text-primary/80 transition-colors">
                      View Details
                    </button>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        className="w-6 h-6 flex items-center justify-center rounded-full text-red-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                        title="Decline"
                      >
                        <span className="material-symbols-outlined text-[16px]">close</span>
                      </button>
                      <button
                        className="w-6 h-6 flex items-center justify-center rounded-full text-green-400 hover:text-green-500 hover:bg-green-500/10 transition-colors"
                        title="Accept"
                      >
                        <span className="material-symbols-outlined text-[16px]">check</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </WidgetCard>

          {/* Manage Availability */}
          <WidgetCard className="flex-1">
            <Link
              href="/resources/instructors"
              className="flex items-center gap-3 group no-underline"
            >
              <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-primary text-[18px]">
                  calendar_month
                </span>
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-white/80 group-hover:text-primary transition-colors">
                  Manage Availability
                </p>
                <p className="text-[10px] text-white/40 mt-0.5">
                  Block or open dates
                </p>
              </div>
              <span className="material-symbols-outlined text-white/20 text-[16px] ml-auto group-hover:text-primary transition-colors">
                chevron_right
              </span>
            </Link>
          </WidgetCard>
        </div>
      </DashboardShell>
    </>
  );
}
