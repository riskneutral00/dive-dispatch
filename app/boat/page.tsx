"use client";

import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { ResourceList, type ResourceItem } from "@/components/dashboard/ResourceList";

const TRIPS: ResourceItem[] = [
  {
    id: "BK-2025-001",
    title: "Coral Reef Exploration",
    meta: ["March 1, 2025 -- 8:00 AM - 2:00 PM", "4 divers -- Twin Waves Boat"],
    status: "active",
    statusLabel: "ACTIVE",
  },
  {
    id: "BK-2025-008",
    title: "Advanced Open Water Course",
    meta: ["March 2, 2025 -- 7:00 AM - 4:00 PM", "6 divers -- Twin Waves Boat"],
    status: "pending",
    statusLabel: "PENDING",
  },
  {
    id: "BK-2025-015",
    title: "Night Dive Adventure",
    meta: ["March 7, 2025 -- 5:00 PM - 8:00 PM", "3 divers -- Speed Demon Boat"],
    status: "pending",
    statusLabel: "PENDING",
  },
  {
    id: "BK-2025-023",
    title: "Wreck Dive Training",
    meta: ["February 28, 2025 -- 10:00 AM - 3:00 PM", "2 divers -- Twin Waves Boat"],
    status: "completed",
    statusLabel: "COMPLETED",
  },
];

export default function BoatDashboard() {
  return (
    <>
      <DashboardNav
        roleName="Boat Manager"
        userName="Matt"
        userInitials="M"
        navLinks={[
          { label: "Trips", href: "/boat", active: true },
          { label: "Availability", href: "/resources/boats" },
        ]}
      />
      <DashboardShell>
        <h1 className="text-3xl font-bold text-white mb-8">
          This Week&apos;s Trips
        </h1>
        <ResourceList title="Assigned Trips" items={TRIPS} />
      </DashboardShell>
    </>
  );
}
