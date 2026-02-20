import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Instructor Dashboard",
  description:
    "View your schedule, manage availability, and respond to booking requests as a dive instructor.",
  openGraph: {
    title: "Instructor Dashboard | Dive Dispatch",
    description:
      "Schedule management and booking request handling for dive instructors.",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Dive Dispatch — Instructor Dashboard",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Schedule and availability management for dive instructors.",
  url: "https://dive-dispatch.vercel.app/instructor",
};

export default function InstructorLayout({
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
