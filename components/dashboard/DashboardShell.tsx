"use client";

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <main className="px-8 py-8 max-w-screen-xl mx-auto">
      {children}
    </main>
  );
}
