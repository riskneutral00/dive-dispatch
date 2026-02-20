import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Dive Resort Dashboard",
  description:
    "Booking calendar, room availability, and guest coordination for dive resorts.",
  openGraph: {
    title: "Dive Resort Dashboard | Dive Dispatch",
    description:
      "Manage resort bookings, room availability, and dive scheduling.",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Dive Dispatch — Dive Resort Dashboard",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Booking calendar and room management for dive resorts.",
  url: "https://dive-dispatch.vercel.app/resort",
};

export default function ResortLayout({
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
