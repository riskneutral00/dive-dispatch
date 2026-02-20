import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Dive Dispatch account to access your dashboard.",
  openGraph: {
    title: "Sign In | Dive Dispatch",
    description: "Sign in to manage your dive operations.",
    type: "website",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
