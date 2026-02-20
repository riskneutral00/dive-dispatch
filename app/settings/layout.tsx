import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your Dive Dispatch account settings, preferences, and stakeholder profile.",
  openGraph: {
    title: "Settings | Dive Dispatch",
    description: "Account settings and stakeholder preferences.",
    type: "website",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
