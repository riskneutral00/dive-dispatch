"use client";

import { StatusBadge } from "@/components/ui/StatusBadge";

export interface ResourceItem {
  id: string;
  title: string;
  meta: string[];
  status: "pending" | "active" | "completed" | "confirmed" | "approved" | "requested" | "allocated" | "not-requested";
  statusLabel?: string;
  actionLabel?: string;
  details?: string[];
  slotType?: "am" | "pm";
  slotLabel?: string;
  fillType?: "air" | "nitrox";
}

interface ResourceListProps {
  title: string;
  items: ResourceItem[];
}

const FILL_TYPE_STYLES: Record<string, string> = {
  air: "bg-sky-500/10 text-sky-300",
  nitrox: "bg-green-500/10 text-green-300",
};

const SLOT_STYLES: Record<string, string> = {
  am: "bg-sky-500/10 text-sky-300",
  pm: "bg-violet-500/10 text-violet-300",
};

export function ResourceList({ title, items }: ResourceListProps) {
  return (
    <div className="backdrop-blur-xl bg-glass-pane border border-glass-border rounded-lg overflow-hidden">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 px-5 pt-5 pb-0 mb-4">
        {title}
      </p>

      {items.map((item) => (
        <div
          key={item.id}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-5 py-4 border-b border-glass-border last:border-0"
        >
          <div className="flex-1">
            <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-1">
              {item.id}
            </p>
            <p className="text-sm font-semibold text-white/90">
              {item.title}
            </p>
            <div className="text-xs text-white/50 mt-1.5 flex flex-col gap-1">
              {item.meta.map((m, i) => (
                <span key={i}>
                  {item.slotType && i === 0 ? (
                    <>
                      {m.split("·")[0]}
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ml-1 ${SLOT_STYLES[item.slotType]}`}>
                        {item.slotLabel ?? item.slotType.toUpperCase()}
                      </span>
                    </>
                  ) : item.fillType && i === 0 ? (
                    <>
                      {m.split("·")[0]}
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ml-1 ${FILL_TYPE_STYLES[item.fillType]}`}>
                        {item.fillType}
                      </span>
                    </>
                  ) : (
                    m
                  )}
                </span>
              ))}
            </div>
            {item.details && (
              <div className="text-xs text-white/60 space-y-0.5 mt-2">
                {item.details.map((d, i) => (
                  <div key={i}>{d}</div>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status={item.status} label={item.statusLabel} />
            {item.actionLabel && (
              <button className="text-[10px] font-bold uppercase tracking-widest text-primary hover:text-primary/80 border border-primary/30 hover:border-primary/60 px-3 py-1.5 rounded-md transition-colors">
                {item.actionLabel}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
