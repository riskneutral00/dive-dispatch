"use client";

const STEPS = ["Contact", "Medical", "Liability", "Equipment"];

interface ProgressTrackerProps {
  currentStep: number; // 1-based: 1=Contact, 2=Medical, 3=Liability, 4=Equipment
}

export function ProgressTracker({ currentStep }: ProgressTrackerProps) {
  return (
    <div className="mb-6 p-4 backdrop-blur-xl bg-white/5 rounded-lg border border-white/10">
      <div className="flex items-center justify-between gap-3">
        {STEPS.map((step, i) => {
          const stepNum = i + 1;
          const isDone = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;

          return (
            <div key={step} className="contents">
              {i > 0 && (
                <div className="flex-1 h-px bg-white/10" />
              )}
              <div className="flex flex-col items-center gap-1.5 flex-1">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-[12px] font-bold ${
                    isDone
                      ? "bg-emerald-500 text-white"
                      : isCurrent
                        ? "bg-primary text-white"
                        : "text-white/40"
                  }`}
                >
                  {isDone ? (
                    <span className="material-symbols-outlined text-[18px]">
                      check
                    </span>
                  ) : (
                    stepNum
                  )}
                </div>
                <p
                  className={`text-[10px] font-bold uppercase tracking-widest ${
                    isDone || isCurrent ? "text-white/80" : "text-white/40"
                  }`}
                >
                  {step}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
