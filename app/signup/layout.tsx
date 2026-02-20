import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create your Dive Dispatch account and start managing dive operations.",
  openGraph: {
    title: "Sign Up | Dive Dispatch",
    description: "Join Dive Dispatch to coordinate dive bookings and operations.",
    type: "website",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
