"use client";

import { useState } from "react";
import { PortalHeader } from "@/components/customer/PortalHeader";
import { BookingBanner } from "@/components/customer/BookingBanner";
import { ProgressTracker } from "@/components/customer/ProgressTracker";

const QUESTIONS = [
  "1. I have had problems with my lungs/breathing, heart, blood, or have been diagnosed with COVID-19.",
  "2. I am over 45 years of age.",
  "3. I struggle to perform moderate exercise (walk 1.6 km/one mile in 14 minutes) or swim 200 m/yards without resting.",
  "4. I have had problems with my eyes, ears, or nasal passages/sinuses.",
  "5. I have had surgery within the last 12 months, or ongoing problems related to past surgery.",
  "6. I have lost consciousness, had migraine headaches, seizures, stroke, or significant head injury.",
  "7. I am currently undergoing treatment for psychological problems, panic attacks, or addiction.",
  "8. I have had back problems, hernia, ulcers, or diabetes.",
  "9. I have had stomach or intestine problems, including recent diarrhea.",
  "10. I am taking prescription medications (except birth control or anti-malarial drugs other than mefloquine).",
];

export default function CustomerMedicalPage() {
  const [answers, setAnswers] = useState<Record<number, "yes" | "no">>({});

  function setAnswer(idx: number, val: "yes" | "no") {
    setAnswers((prev) => ({ ...prev, [idx]: val }));
  }

  return (
    <div className="min-h-screen flex flex-col">
      <PortalHeader />

      <main className="flex-grow py-8 px-5">
        <div className="max-w-[600px] mx-auto">
          <BookingBanner formsComplete={1} />
          <ProgressTracker currentStep={2} />

          <form
            className="space-y-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <h2 className="text-lg font-bold text-white mb-1">
                Medical Questionnaire
              </h2>
              <p className="text-xs text-white/40 leading-relaxed">
                Diver Medical | Participant Questionnaire (PADI 10346). Please
                answer all questions honestly.
              </p>
            </div>

            {/* PADI Intro */}
            <div className="text-xs text-white/50 leading-relaxed p-4 bg-white/5 rounded-lg border border-white/10">
              Recreational scuba diving and freediving requires good physical and
              mental health. There are a few medical conditions which can be
              hazardous while diving. This questionnaire provides a basis to
              determine if you should seek out a physician&apos;s evaluation.
              Answer all questions honestly.
              <br />
              <br />
              <strong className="text-white/70">Note to women:</strong> If you
              are pregnant, or attempting to become pregnant, do not dive.
            </div>

            {/* Questions */}
            <div className="backdrop-blur-xl bg-glass-pane border border-glass-border rounded-lg p-5 space-y-0">
              {QUESTIONS.map((q, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-4 py-3 border-b border-white/5 last:border-0"
                >
                  <span className="flex-1 text-sm text-white/70 leading-relaxed">
                    {q}
                  </span>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => setAnswer(i, "yes")}
                      className={`px-3 py-1.5 rounded text-[11px] font-bold uppercase tracking-wider border transition-all ${
                        answers[i] === "yes"
                          ? "bg-red-500 border-red-500 text-white"
                          : "bg-transparent border-white/10 text-white/40 hover:border-white/30"
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => setAnswer(i, "no")}
                      className={`px-3 py-1.5 rounded text-[11px] font-bold uppercase tracking-wider border transition-all ${
                        answers[i] === "no"
                          ? "bg-emerald-500 border-emerald-500 text-white"
                          : "bg-transparent border-white/10 text-white/40 hover:border-white/30"
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Participant statement */}
            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
              <p className="text-[10px] text-white/40 leading-relaxed">
                I have answered all questions honestly, and understand that I
                accept responsibility for any consequences resulting from any
                questions I may have answered inaccurately or for my failure to
                disclose any existing or past health conditions.
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-8 py-3 bg-primary text-white rounded-sm text-[11px] font-bold uppercase tracking-widest hover:bg-primary/90 transition-all shadow-md shadow-primary/20"
              >
                Submit Form
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
