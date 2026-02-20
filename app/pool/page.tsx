"use client";

import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { ResourceList, type ResourceItem } from "@/components/dashboard/ResourceList";

const SESSIONS: ResourceItem[] = [
  {
    id: "SN-026-001",
    title: "OW Confined Water -- Day 1",
    meta: ["Feb 16, 2026 -- AM 08:00-12:00", "4 divers -- Aqua Center -- Lead: Riya S."],
    status: "active",
    statusLabel: "ACTIVE",
    actionLabel: "Manage",
    slotType: "am",
    slotLabel: "AM 08:00-12:00",
  },
  {
    id: "SN-026-002",
    title: "Rescue Skill Review",
    meta: ["Feb 16, 2026 -- PM 13:00-17:00", "6 divers -- Aqua Center -- Lead: Marco F."],
    status: "active",
    statusLabel: "ACTIVE",
    actionLabel: "Manage",
    slotType: "pm",
    slotLabel: "PM 13:00-17:00",
  },
  {
    id: "SN-026-005",
    title: "OW Confined Water -- Day 2",
    meta: ["Feb 19, 2026 -- AM 08:00-12:00", "4 divers -- Aqua Center -- Lead: Riya S."],
    status: "pending",
    statusLabel: "PENDING",
    actionLabel: "View",
    slotType: "am",
    slotLabel: "AM 08:00-12:00",
  },
  {
    id: "SN-026-008",
    title: "DSD Try Dive -- Group Session",
    meta: ["Feb 22, 2026 -- PM 13:00-17:00", "8 divers -- Aqua Center -- Lead: Priya K."],
    status: "pending",
    statusLabel: "PENDING",
    actionLabel: "View",
    slotType: "pm",
    slotLabel: "PM 13:00-17:00",
  },
  {
    id: "SN-026-003",
    title: "AOW Skills Practice",
    meta: ["Feb 9, 2026 -- AM 08:00-12:00", "3 divers -- Aqua Center -- Lead: Marco F."],
    status: "completed",
    statusLabel: "COMPLETED",
    actionLabel: "View",
    slotType: "am",
    slotLabel: "AM 08:00-12:00",
  },
];

export default function PoolDashboard() {
  return (
    <>
      <DashboardNav
        roleName="Pool Manager"
        userName="Matt"
        userInitials="M"
        navLinks={[
          { label: "Sessions", href: "/pool", active: true },
          { label: "Availability", href: "/resources/pools" },
        ]}
      />
      <DashboardShell>
        <h1 className="text-3xl font-bold text-white mb-8">
          Upcoming Sessions
        </h1>
        <ResourceList title="Assigned Sessions" items={SESSIONS} />
      </DashboardShell>
    </>
  );
}
