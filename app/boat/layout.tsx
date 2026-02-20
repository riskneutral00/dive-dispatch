import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Boat Operator Dashboard",
  description:
    "Trip assignments, vessel availability, and scheduling for dive boat operators.",
  openGraph: {
    title: "Boat Operator Dashboard | Dive Dispatch",
    description:
      "Manage boat trips and vessel availability for dive operations.",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Dive Dispatch — Boat Operator Dashboard",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Trip scheduling and availability management for dive boat operators.",
  url: "https://dive-dispatch.vercel.app/boat",
};

export default function BoatLayout({
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
