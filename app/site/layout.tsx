import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Dive Site Operator",
  description:
    "Dive site management and conditions reporting. Coming in V1.1.",
  openGraph: {
    title: "Dive Site Operator | Dive Dispatch",
    description: "Dive site management — coming in V1.1.",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Dive Dispatch — Dive Site Operator",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: "Dive site management and conditions reporting.",
  url: "https://dive-dispatch.vercel.app/site",
};

export default function SiteLayout({
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
