"use client";

import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="w-full py-8 px-8 md:px-12 flex justify-between items-center fixed top-0 z-20">
        <Link
          className="flex items-center gap-2 text-[11px] font-semibold text-white/80 transition-colors uppercase tracking-widest hover:text-primary no-underline"
          href="/landing"
        >
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_back</span>
          <span className="hidden sm:inline">Back</span>
        </Link>
        <Link
          className="text-[11px] font-semibold text-white/80 transition-colors uppercase tracking-widest hover:text-primary no-underline"
          href="/help"
        >
          Contact
        </Link>
      </nav>

      {/* Main */}
      <main className="flex-grow flex items-center justify-center py-24 px-4 sm:px-6 relative z-10">
        <div className="w-full max-w-[420px] flex flex-col items-center">
          <div className="mb-14 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-white uppercase">
              Dive Dispatch
            </h1>
          </div>

          <form
            className="w-full space-y-8"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="space-y-8">
              <div className="relative group">
                <label
                  className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1 transition-colors group-focus-within:text-primary"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="w-full py-2 border-0 border-b border-white/10 bg-transparent text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary"
                  id="email"
                  placeholder="name@example.com"
                  required
                  type="email"
                />
              </div>
              <div className="relative group">
                <label
                  className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1 transition-colors group-focus-within:text-primary"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="w-full py-2 border-0 border-b border-white/10 bg-transparent text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary"
                  id="password"
                  placeholder="--------"
                  required
                  type="password"
                />
                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    className="text-[10px] text-white/30 uppercase tracking-wider hover:text-primary transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>
              </div>
            </div>
            <div className="pt-2">
              <button
                className="w-full py-4 bg-primary text-white text-[11px] font-bold uppercase tracking-[0.25em] rounded-sm hover:bg-primary/90 transition-all shadow-md shadow-primary/20"
                type="submit"
              >
                Sign In
              </button>
            </div>
          </form>

          <div className="mt-12 mb-8 flex justify-center">
            <span className="text-[10px] text-white/30 uppercase tracking-wider">
              or continue with
            </span>
          </div>

          <div className="flex justify-center items-center gap-8">
            {["Google", "Apple", "Facebook"].map((provider) => (
              <button
                key={provider}
                className="w-10 h-10 rounded-full backdrop-blur-xl bg-glass-pane border border-glass-border flex items-center justify-center text-white/40 hover:text-primary hover:border-primary/40 transition-all"
                title={provider}
              >
                <span className="text-[11px] font-bold">{provider[0]}</span>
              </button>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-[10px] text-white/30 tracking-wider uppercase">
              Don&apos;t have an account?{" "}
              <Link
                className="text-white font-bold hover:text-primary transition-colors ml-1 no-underline"
                href="/signup"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
