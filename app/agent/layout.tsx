import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Agent Dashboard",
  description:
    "Referral tracking, booking calendar, and commission overview for dive booking agents.",
  openGraph: {
    title: "Agent Dashboard | Dive Dispatch",
    description:
      "Manage referrals and track bookings as a dive booking agent.",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Dive Dispatch — Agent Dashboard",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Referral tracking and booking calendar for dive booking agents.",
  url: "https://dive-dispatch.vercel.app/agent",
};

export default function AgentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={jsonLd} />
      {children}
    </>
  );
}
