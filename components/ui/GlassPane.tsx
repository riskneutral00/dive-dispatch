"use client";

interface GlassPaneProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassPane({ children, className = "" }: GlassPaneProps) {
  return (
    <div
      className={`backdrop-blur-xl bg-glass-pane border border-glass-border rounded-lg shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}
