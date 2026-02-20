"use client";

interface ControlField {
  label: string;
  value: string;
  required?: boolean;
}

interface ControlStripProps {
  fields: ControlField[];
}

export function ControlStrip({ fields }: ControlStripProps) {
  return (
    <div
      className="grid gap-px backdrop-blur-xl bg-glass-pane border border-glass-border rounded-lg overflow-hidden"
      style={{ gridTemplateColumns: `repeat(${fields.length}, 1fr)` }}
    >
      {fields.map((field, i) => (
        <button
          key={i}
          type="button"
          className="flex flex-col items-start px-3 py-2 border-r border-white/5 last:border-r-0 hover:bg-white/5 transition-all text-left"
        >
          <span className="text-[9px] uppercase tracking-wider font-bold text-white/40 mb-1">
            {field.label}
            {field.required && <span className="text-red-400 ml-0.5">*</span>}
          </span>
          <span className="text-xs font-semibold truncate w-full text-white/80">
            {field.value}
          </span>
        </button>
      ))}
    </div>
  );
}
