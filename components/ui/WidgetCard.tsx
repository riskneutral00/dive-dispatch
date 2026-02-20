"use client";

interface WidgetCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function WidgetCard({ title, children, className = "" }: WidgetCardProps) {
  return (
    <div
      className={`backdrop-blur-xl bg-glass-pane border border-glass-border rounded-lg p-5 ${className}`}
    >
      {title && (
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-4">
          {title}
        </p>
      )}
      {children}
    </div>
  );
}
