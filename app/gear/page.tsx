"use client";

import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { ResourceList, type ResourceItem } from "@/components/dashboard/ResourceList";

const BOOKINGS: ResourceItem[] = [
  {
    id: "BK-2025-001",
    title: "Coral Reef Exploration",
    meta: ["4 customers -- March 1, 2025"],
    status: "allocated",
    statusLabel: "ALLOCATED",
    actionLabel: "View",
    details: [
      "Wetsuits: S x2, M x2",
      "Fins: M x2, L x2",
      "BCD: M x3, L x1",
    ],
  },
  {
    id: "BK-2025-008",
    title: "Advanced Open Water Course",
    meta: ["6 customers -- March 2-3, 2025"],
    status: "requested",
    statusLabel: "REQUESTED",
    actionLabel: "Allocate",
    details: [
      "Wetsuits: XS x1, S x2, M x2, L x1",
      "Fins: S x1, M x3, L x2",
      "BCD: S x1, M x3, L x2",
      "Tanks: HP100 x12 (doubles x4)",
    ],
  },
  {
    id: "BK-2025-015",
    title: "Night Dive Adventure",
    meta: ["3 customers -- March 7, 2025"],
    status: "not-requested",
    statusLabel: "NOT REQUESTED",
    details: [
      "Wetsuits: M x2, L x1",
      "Fins: M x2, L x1",
      "BCD: M x2, L x1",
      "Lights: Backup x3",
    ],
  },
  {
    id: "BK-2025-023",
    title: "Wreck Dive Training",
    meta: ["2 customers -- March 8-9, 2025"],
    status: "requested",
    statusLabel: "REQUESTED",
    actionLabel: "Allocate",
    details: [
      "Wetsuits: M x1, L x1",
      "Fins: M x1, L x1",
      "BCD: M x1, L x1",
      "Reel & Line Kit x2",
    ],
  },
];

export default function EquipmentDashboard() {
  return (
    <>
      <DashboardNav
        roleName="Equipment Manager"
        userName="Matt"
        userInitials="M"
        navLinks={[
          { label: "Equipment Requests", href: "/gear", active: true },
        ]}
      />
      <DashboardShell>
        <h1 className="text-3xl font-bold text-white mb-8">
          Equipment Allocation
        </h1>
        <ResourceList
          title="Upcoming Bookings with Equipment Requests"
          items={BOOKINGS}
        />
      </DashboardShell>
    </>
  );
}
