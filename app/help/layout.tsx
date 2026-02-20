import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Help Center",
  description: "Get help with Dive Dispatch — guides, FAQs, and support for dive operations management.",
  openGraph: {
    title: "Help Center | Dive Dispatch",
    description: "Guides and support for Dive Dispatch users.",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Help Center",
  description: "Get help with Dive Dispatch — guides, FAQs, and support.",
  url: "https://dive-dispatch.vercel.app/help",
  isPartOf: {
    "@type": "WebApplication",
    name: "Dive Dispatch",
    url: "https://dive-dispatch.vercel.app",
  },
};

export default function HelpLayout({
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
