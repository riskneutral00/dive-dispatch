"use client";

type BadgeStatus =
  | "draft"
  | "pending"
  | "active"
  | "completed"
  | "confirmed"
  | "referred"
  | "approved"
  | "requested"
  | "allocated"
  | "not-requested"
  | "expired";

const statusStyles: Record<BadgeStatus, string> = {
  draft: "bg-slate-100/80 text-slate-500",
  pending: "bg-amber-100/80 text-amber-700",
  active: "bg-green-100/80 text-green-700",
  completed: "bg-blue-100/80 text-blue-700",
  confirmed: "bg-green-100/80 text-green-700",
  referred: "bg-purple-100/80 text-purple-700",
  approved: "bg-green-100/80 text-green-700",
  requested: "bg-amber-100/80 text-amber-700",
  allocated: "bg-green-100/80 text-green-700",
  "not-requested": "bg-slate-100/80 text-slate-700",
  expired: "bg-red-100/80 text-red-700",
};

interface StatusBadgeProps {
  status: BadgeStatus;
  label?: string;
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wider whitespace-nowrap ${statusStyles[status]}`}
    >
      {label ?? status}
    </span>
  );
}
