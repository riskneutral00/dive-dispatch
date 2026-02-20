import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Dive Your Plan, Plan Your Dive",
  description:
    "Dive Dispatch is a dive operations management platform. Coordinate instructors, boats, equipment, and bookings for dive centers, agents, liveaboards, and resorts.",
  openGraph: {
    title: "Dive Dispatch — Dive Your Plan, Plan Your Dive",
    description:
      "Operations management for dive centers, agents, liveaboards, and resorts. Anywhere, every time.",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Dive Dispatch",
  url: "https://dive-dispatch.vercel.app",
  description:
    "Dive operations management platform for dive centers, agents, liveaboards, and resorts.",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://dive-dispatch.vercel.app/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function LandingLayout({
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
