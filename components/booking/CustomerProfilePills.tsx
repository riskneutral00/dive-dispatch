"use client";

interface Customer {
  name: string;
  flags?: string[];
  profileSteps: {
    contact: boolean;
    medical: boolean;
    liability: boolean;
    equipment: boolean;
    payment: boolean;
  };
}

interface CustomerProfilePillsProps {
  customers: Customer[];
  showRemoveButton?: boolean;
}

function StatusPill({
  label,
  active,
  variant,
}: {
  label: string;
  active: boolean;
  variant?: "blue";
}) {
  return (
    <div
      className={`w-7 h-7 flex items-center justify-center rounded-full text-[10px] font-bold transition-all ${
        active
          ? variant === "blue"
            ? "bg-blue-500 text-white"
            : "bg-primary text-white"
          : "bg-white/5 text-white/30"
      }`}
      title={label}
    >
      {label[0]}
    </div>
  );
}

export function CustomerProfilePills({
  customers,
  showRemoveButton = false,
}: CustomerProfilePillsProps) {
  return (
    <div className="divide-y divide-white/5">
      {customers.map((c, i) => (
        <div
          key={i}
          className="flex items-center justify-between py-4 -mx-4 px-4 rounded-lg hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40">
              <span className="material-symbols-outlined text-lg">person</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white">
                  {c.name}
                </span>
                {c.flags?.map((flag, fi) => (
                  <span key={fi} className="text-base leading-none">
                    {flag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <StatusPill label="Contact" active={c.profileSteps.contact} />
            <StatusPill label="Medical" active={c.profileSteps.medical} />
            <StatusPill label="Liability" active={c.profileSteps.liability} />
            <StatusPill label="Equipment" active={c.profileSteps.equipment} />
            <StatusPill
              label="Payment"
              active={c.profileSteps.payment}
              variant="blue"
            />
            {showRemoveButton && (
              <button
                className="ml-2 w-6 h-6 flex items-center justify-center rounded-full text-white/20 hover:text-red-400 transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
