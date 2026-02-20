import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Pool Operator Dashboard",
  description:
    "Session scheduling, availability management, and pool bookings for confined water training.",
  openGraph: {
    title: "Pool Operator Dashboard | Dive Dispatch",
    description:
      "Manage pool sessions and availability for dive training facilities.",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Dive Dispatch — Pool Operator Dashboard",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Pool session scheduling for confined water dive training.",
  url: "https://dive-dispatch.vercel.app/pool",
};

export default function PoolLayout({
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
