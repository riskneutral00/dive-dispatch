import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { JsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

const inter = Inter({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Dive Dispatch",
    template: "%s | Dive Dispatch",
  },
  description:
    "Dive operations management platform. Coordinate instructors, boats, equipment, and bookings for dive centers, agents, liveaboards, and resorts.",
  metadataBase: new URL("https://dive-dispatch.vercel.app"),
  openGraph: {
    title: "Dive Dispatch",
    description:
      "Dive your plan, plan your dive. Anywhere, every time.",
    siteName: "Dive Dispatch",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dive Dispatch",
    description:
      "Dive operations management platform for dive centers, agents, liveaboards, and resorts.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Dive Dispatch",
  url: "https://dive-dispatch.vercel.app",
  description:
    "Dive operations management platform for dive centers, agents, liveaboards, and resorts.",
};

const navigationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SiteNavigationElement",
  name: "Main Navigation",
  url: "https://dive-dispatch.vercel.app",
  hasPart: [
    { "@type": "SiteNavigationElement", name: "Dive Center", url: "https://dive-dispatch.vercel.app/dc" },
    { "@type": "SiteNavigationElement", name: "Agent", url: "https://dive-dispatch.vercel.app/agent" },
    { "@type": "SiteNavigationElement", name: "Liveaboard", url: "https://dive-dispatch.vercel.app/liveaboard" },
    { "@type": "SiteNavigationElement", name: "Dive Resort", url: "https://dive-dispatch.vercel.app/resort" },
    { "@type": "SiteNavigationElement", name: "Instructor", url: "https://dive-dispatch.vercel.app/instructor" },
    { "@type": "SiteNavigationElement", name: "Boat Operator", url: "https://dive-dispatch.vercel.app/boat" },
    { "@type": "SiteNavigationElement", name: "Equipment Manager", url: "https://dive-dispatch.vercel.app/gear" },
    { "@type": "SiteNavigationElement", name: "Pool Operator", url: "https://dive-dispatch.vercel.app/pool" },
    { "@type": "SiteNavigationElement", name: "Compressor Operator", url: "https://dive-dispatch.vercel.app/air" },
    { "@type": "SiteNavigationElement", name: "Customer Portal", url: "https://dive-dispatch.vercel.app/customer" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <JsonLd data={websiteJsonLd} />
        <JsonLd data={navigationJsonLd} />
      </head>
      <body className={`${inter.variable} font-[family-name:var(--font-display)] antialiased min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
