import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Customer Portal",
  description:
    "Complete your dive booking forms — contact information, medical questionnaire, liability release, and equipment sizing.",
  openGraph: {
    title: "Customer Portal | Dive Dispatch",
    description:
      "Complete your dive booking forms online. Secure, paperless pre-dive documentation.",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Customer Portal",
  description:
    "Complete your dive booking forms — contact information, medical questionnaire, liability release, and equipment sizing.",
  url: "https://dive-dispatch.vercel.app/customer",
  isPartOf: {
    "@type": "WebApplication",
    name: "Dive Dispatch",
    url: "https://dive-dispatch.vercel.app",
  },
};

export default function CustomerLayout({
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
