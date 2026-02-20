"use client";

import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { ResourceList, type ResourceItem } from "@/components/dashboard/ResourceList";

const FILLS: ResourceItem[] = [
  {
    id: "FL-026-007",
    title: "8x Nitrox 32% -- AOW Group",
    meta: ["Feb 16, 2026 -- 07:00 AM -- Nitrox", "BK-026-007 -- Riya S. -- 8 tanks"],
    status: "confirmed",
    statusLabel: "CONFIRMED",
    actionLabel: "View",
    fillType: "nitrox",
  },
  {
    id: "FL-026-008",
    title: "12x Air -- Fun Dive Day Trip",
    meta: ["Feb 17, 2026 -- 07:30 AM -- Air", "BK-026-009 -- Marco F. -- 12 tanks"],
    status: "confirmed",
    statusLabel: "CONFIRMED",
    actionLabel: "View",
    fillType: "air",
  },
  {
    id: "FL-026-011",
    title: "20x Air -- Liveaboard Departure",
    meta: ["Feb 23, 2026 -- 06:00 AM -- Air", "BK-026-012 -- Capt. Torres -- 20 tanks"],
    status: "pending",
    statusLabel: "PENDING",
    actionLabel: "Confirm",
    fillType: "air",
  },
  {
    id: "FL-026-012",
    title: "4x Nitrox 36% -- Tech Diver",
    meta: ["Feb 25, 2026 -- 08:00 AM -- Nitrox", "BK-026-015 -- Ahmed S. -- 4 tanks"],
    status: "pending",
    statusLabel: "PENDING",
    actionLabel: "Confirm",
    fillType: "nitrox",
  },
  {
    id: "FL-026-003",
    title: "16x Air -- Open Water Course",
    meta: ["Feb 9, 2026 -- 07:00 AM -- Air", "BK-026-005 -- Riya S. -- 16 tanks"],
    status: "completed",
    statusLabel: "COMPLETED",
    actionLabel: "View",
    fillType: "air",
  },
];

export default function CompressorDashboard() {
  return (
    <>
      <DashboardNav
        roleName="Compressor Manager"
        userName="Matt"
        userInitials="M"
        navLinks={[
          { label: "Fill Schedule", href: "/air", active: true },
          { label: "Availability", href: "/resources/compressors" },
        ]}
      />
      <DashboardShell>
        <h1 className="text-3xl font-bold text-white mb-8">
          Fill Schedule
        </h1>
        <ResourceList title="Fill Requests" items={FILLS} />
      </DashboardShell>
    </>
  );
}
