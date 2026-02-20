"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50">
        <div className="w-full px-6 py-6 md:px-12 md:py-8 flex justify-between items-start">
          <span className="font-bold text-[10px] uppercase tracking-[0.3em] text-white">
            Dive Dispatch
          </span>
          <nav>
            <Link
              className="text-[11px] font-semibold uppercase tracking-widest text-white/80 hover:text-primary transition-colors no-underline"
              href="/help"
            >
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-6 w-full relative">
        <div className="w-full max-w-5xl text-center space-y-16">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-normal leading-tight tracking-tight text-white">
            Dive your plan, plan your dive.
            <br />
            Anywhere, every time.
          </h1>
          <div className="flex flex-col items-center space-y-12">
            <div className="flex items-center space-x-12">
              <Link
                className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] border-b border-white pb-1 hover:opacity-60 transition-opacity text-white no-underline"
                href="/signup"
              >
                Sign Up
              </Link>
              <Link
                className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] border-b border-white pb-1 hover:opacity-60 transition-opacity text-white no-underline"
                href="/signin"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full px-6 py-8 md:px-12 md:py-10">
        <div className="flex flex-col md:flex-row justify-between items-center text-[10px] font-medium uppercase tracking-[0.2em] text-white/60">
          <p>&copy; 2026 Dive Dispatch.</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms</span>
            <span className="hover:text-white transition-colors cursor-pointer">Support</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
