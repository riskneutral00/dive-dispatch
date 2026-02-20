import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Compressor Operator Dashboard",
  description:
    "Fill schedules, air and nitrox requests, and tank management for compressor operators.",
  openGraph: {
    title: "Compressor Operator Dashboard | Dive Dispatch",
    description:
      "Manage air fills, nitrox mixing, and compressor scheduling.",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Dive Dispatch — Compressor Operator Dashboard",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Fill scheduling and air/nitrox management for dive compressor operators.",
  url: "https://dive-dispatch.vercel.app/air",
};

export default function AirLayout({
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
