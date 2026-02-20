import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Dive Center Dashboard",
  description:
    "Manage dive bookings, instructor assignments, boat scheduling, and customer manifests from your dive center dashboard.",
  openGraph: {
    title: "Dive Center Dashboard | Dive Dispatch",
    description:
      "Centralized booking calendar and operations management for dive centers.",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Dive Dispatch — Dive Center Dashboard",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Booking calendar, manifest management, and instructor coordination for dive centers.",
  url: "https://dive-dispatch.vercel.app/dc",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function DcLayout({
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
