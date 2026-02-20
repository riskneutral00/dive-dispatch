import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Liveaboard Dashboard",
  description:
    "Voyage calendar, cabin occupancy, and guest management for liveaboard operators.",
  openGraph: {
    title: "Liveaboard Dashboard | Dive Dispatch",
    description:
      "Manage voyages, cabins, and guest bookings for liveaboard dive vessels.",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Dive Dispatch — Liveaboard Dashboard",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Voyage calendar and cabin management for liveaboard dive operators.",
  url: "https://dive-dispatch.vercel.app/liveaboard",
};

export default function LiveaboardLayout({
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
