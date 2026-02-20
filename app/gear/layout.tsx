import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Equipment Manager Dashboard",
  description:
    "Equipment allocation, inventory tracking, and sizing requests for dive equipment managers.",
  openGraph: {
    title: "Equipment Manager Dashboard | Dive Dispatch",
    description:
      "Manage dive equipment inventory and allocation requests.",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Dive Dispatch — Equipment Manager Dashboard",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Equipment inventory and allocation management for dive operations.",
  url: "https://dive-dispatch.vercel.app/gear",
};

export default function GearLayout({
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
