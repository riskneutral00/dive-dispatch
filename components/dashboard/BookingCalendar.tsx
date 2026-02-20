"use client";

export interface Diver {
  name: string;
  abbrev: string;
}

export interface BookingBar {
  cols: number[];
  status: "draft" | "pending" | "active" | "completed" | "referred";
  divers: Diver[];
}

interface WeekData {
  data: BookingBar[];
  startDate: number;
}

interface BookingCalendarProps {
  month: string;
  year: number;
  weeks: WeekData[];
  todayDate?: number;
  legendStatuses?: string[];
}

const STATUS_COLORS: Record<string, string> = {
  draft: "bg-white/5 text-white/40 border-white/10",
  pending: "bg-amber-500/10 text-amber-300 border-amber-500/20",
  active: "bg-green-500/10 text-green-300 border-green-500/20",
  completed: "bg-primary/10 text-blue-300 border-primary/20",
  referred: "bg-purple-500/10 text-purple-300 border-purple-500/20",
};

const LEGEND_COLORS: Record<string, string> = {
  Draft: "bg-white/30",
  Pending: "bg-amber-400",
  Active: "bg-green-500",
  Completed: "bg-primary",
  Referred: "bg-purple-400",
};

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const COL_LEFT = [
  "left-0",
  "left-[14.286%]",
  "left-[28.571%]",
  "left-[42.857%]",
  "left-[57.143%]",
  "left-[71.429%]",
  "left-[85.714%]",
];

const COL_WIDTH: Record<number, string> = {
  1: "w-[14.286%]",
  2: "w-[28.571%]",
  3: "w-[42.857%]",
  4: "w-[57.143%]",
  5: "w-[71.429%]",
  6: "w-[85.714%]",
  7: "w-full",
};

const DIVER_HEIGHT = 14;
const PADDING = 12;
const GAP = 4;

function bookingHeight(diverCount: number) {
  return diverCount * DIVER_HEIGHT + PADDING + GAP;
}

interface PlacedBooking extends BookingBar {
  y: number;
}

function pack(bookings: BookingBar[]): { placed: PlacedBooking[]; height: number } {
  const skyline = [0, 0, 0, 0, 0, 0, 0];
  const placed: PlacedBooking[] = [];
  const remaining = bookings.map((b) => ({ ...b, ey: 0 }));

  while (remaining.length > 0) {
    for (const b of remaining) {
      b.ey = Math.max(...b.cols.map((c) => skyline[c]));
    }
    remaining.sort((a, b) => {
      if (a.ey !== b.ey) return a.ey - b.ey;
      if (a.cols.length !== b.cols.length) return a.cols.length - b.cols.length;
      return bookingHeight(a.divers.length) - bookingHeight(b.divers.length);
    });
    const best = remaining.shift()!;
    const h = bookingHeight(best.divers.length);
    const y = best.ey;
    for (const c of best.cols) {
      skyline[c] = y + h;
    }
    placed.push({ ...best, y });
  }

  return { placed, height: Math.max(...skyline, 24) };
}

function WeekRow({
  bookings,
  dates,
  todayDate,
}: {
  bookings: BookingBar[];
  dates: number[];
  todayDate?: number;
}) {
  const { placed, height } = pack(bookings);

  return (
    <div className="border-b border-glass-border last:border-0">
      {/* Date numbers */}
      <div className="grid grid-cols-7 divide-x divide-glass-border">
        {dates.map((d) => (
          <div
            key={d}
            className={`px-2 pt-2 pb-1 flex justify-end ${
              d === todayDate ? "bg-primary/10" : ""
            }`}
          >
            <span
              className={`w-7 h-7 flex items-center justify-center rounded-full text-sm font-medium ${
                d === todayDate
                  ? "bg-primary text-white font-bold"
                  : "text-white/50"
              }`}
            >
              {d}
            </span>
          </div>
        ))}
      </div>

      {/* Events layer */}
      <div className="relative w-full" style={{ height: `${height}px` }}>
        {placed.map((b, i) => (
          <div
            key={i}
            className={`absolute text-[9px] leading-tight rounded-sm px-1.5 py-1 cursor-pointer hover:opacity-80 transition-opacity border mx-[2px] ${STATUS_COLORS[b.status]}`}
            style={{
              top: `${b.y}px`,
            }}
          >
            <div className={`absolute inset-0 ${COL_LEFT[b.cols[0]]} ${COL_WIDTH[b.cols.length]}`} style={{ position: 'relative' }}>
              {b.divers.map((d, j) => (
                <div key={j} className="flex items-baseline justify-between gap-1">
                  <span className="font-medium truncate">{d.name}</span>
                  <span className="font-bold flex-shrink-0">{d.abbrev}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BookingCalendar({
  month,
  year,
  weeks,
  todayDate,
  legendStatuses = ["Draft", "Pending", "Active", "Completed"],
}: BookingCalendarProps) {
  return (
    <div className="backdrop-blur-xl bg-glass-pane border border-glass-border rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-glass-border">
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 flex items-center justify-center rounded-md text-white/40 hover:text-primary hover:bg-white/5 transition-colors">
            <span className="material-symbols-outlined text-lg">chevron_left</span>
          </button>
          <h2 className="text-sm font-semibold text-white w-36 text-center">
            {month} {year}
          </h2>
          <button className="w-8 h-8 flex items-center justify-center rounded-md text-white/40 hover:text-primary hover:bg-white/5 transition-colors">
            <span className="material-symbols-outlined text-lg">chevron_right</span>
          </button>
        </div>
        <button className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-primary px-3 py-1.5 rounded-md hover:bg-white/5 transition-colors border border-glass-border">
          Today
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 border-b border-glass-border">
        {DAYS.map((d) => (
          <div
            key={d}
            className="py-3 text-center text-[10px] font-bold uppercase tracking-widest text-white/40"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Week rows */}
      <div>
        {weeks.map((week, i) => {
          const dates = Array.from({ length: 7 }, (_, j) => week.startDate + j);
          return (
            <WeekRow
              key={i}
              bookings={week.data}
              dates={dates}
              todayDate={todayDate}
            />
          );
        })}
      </div>

      {/* Legend */}
      <div className="px-5 py-3 border-t border-glass-border flex items-center gap-5 flex-wrap">
        <span className="text-[9px] font-bold uppercase tracking-widest text-white/20">
          Status
        </span>
        {legendStatuses.map((s) => (
          <div key={s} className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${LEGEND_COLORS[s] ?? "bg-white/30"}`} />
            <span className="text-[10px] text-white/40">{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
