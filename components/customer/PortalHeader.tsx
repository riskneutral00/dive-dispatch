"use client";

interface PortalHeaderProps {
  centerName?: string;
}

export function PortalHeader({
  centerName = "Matt & Ms. Mermaid's Dive Center",
}: PortalHeaderProps) {
  return (
    <header className="backdrop-blur-xl bg-glass-pane border-b border-glass-border">
      <div className="max-w-[600px] mx-auto px-5 h-14 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
            Dive Dispatch
          </p>
          <p className="text-xs font-semibold text-white/80">{centerName}</p>
        </div>
      </div>
    </header>
  );
}
