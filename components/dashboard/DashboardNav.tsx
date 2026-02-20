"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface NavLink {
  label: string;
  href: string;
  active?: boolean;
}

interface ResourceLink {
  label: string;
  href: string;
  icon: string;
}

interface DashboardNavProps {
  roleName: string;
  userName: string;
  userInitials: string;
  navLinks?: NavLink[];
  showResources?: boolean;
  showBackButton?: boolean;
}

const RESOURCE_LINKS: ResourceLink[] = [
  { label: "Instructors", href: "/resources/instructors", icon: "person" },
  { label: "Boats", href: "/resources/boats", icon: "directions_boat" },
  { label: "Equipment", href: "/resources/equipment", icon: "inventory_2" },
  { label: "Pools", href: "/resources/pools", icon: "pool" },
  { label: "Compressors", href: "/resources/compressors", icon: "compress" },
  { label: "Dive Sites", href: "/resources/dive-sites", icon: "location_on" },
];

export function DashboardNav({
  roleName,
  userName,
  userInitials,
  navLinks = [],
  showResources = false,
  showBackButton = false,
}: DashboardNavProps) {
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const resRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (resRef.current && !resRef.current.contains(e.target as Node)) {
        setResourcesOpen(false);
      }
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setUserOpen(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <nav className="sticky top-0 z-40 backdrop-blur-xl bg-glass-pane border-b border-glass-border">
      <div className="px-8 h-16 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-4">
          {showBackButton ? (
            <Link
              href="/"
              className="flex items-center gap-1 text-white/60 hover:text-primary transition-colors no-underline w-fit"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
              <span className="text-[11px] font-semibold uppercase tracking-widest">Back</span>
            </Link>
          ) : (
            <Link href="/" className="no-underline">
              <span className="uppercase tracking-[0.3em] font-bold text-[10px] text-white">
                Dive Dispatch
              </span>
            </Link>
          )}
          {roleName && !showBackButton && (
            <span className="text-[10px] font-semibold uppercase tracking-widest text-white/50">
              {roleName}
            </span>
          )}
        </div>

        {/* Centre nav */}
        <div className="hidden md:flex items-center gap-8 flex-1 justify-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[11px] font-semibold uppercase tracking-widest transition-colors no-underline ${
                link.active
                  ? "text-primary"
                  : "text-white/50 hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {showResources && (
            <div className="relative" ref={resRef}>
              <button
                onClick={() => {
                  setResourcesOpen(!resourcesOpen);
                  setUserOpen(false);
                }}
                className="text-[11px] font-semibold uppercase tracking-widest text-white/50 hover:text-primary transition-colors flex items-center gap-0.5"
              >
                Resources
                <span className="material-symbols-outlined text-[14px] leading-none">
                  {resourcesOpen ? "expand_less" : "expand_more"}
                </span>
              </button>
              {resourcesOpen && (
                <div className="absolute top-full left-0 mt-2 w-52 backdrop-blur-xl bg-glass-pane border border-glass-border rounded-lg shadow-xl z-50 py-1.5">
                  {RESOURCE_LINKS.map((r) => (
                    <Link
                      key={r.href}
                      href={r.href}
                      className="flex items-center gap-3 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-white/50 hover:bg-white/5 hover:text-primary transition-colors no-underline"
                      onClick={() => setResourcesOpen(false)}
                    >
                      <span className="material-symbols-outlined text-[16px]">{r.icon}</span>
                      {r.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: user menu */}
        <div className="flex items-center gap-3">
          <div className="relative" ref={userRef}>
            <button
              onClick={() => {
                setUserOpen(!userOpen);
                setResourcesOpen(false);
              }}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity ml-1"
            >
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                {userInitials}
              </div>
              <span className="hidden md:block text-[11px] font-semibold uppercase tracking-widest text-white/80">
                {userName}
              </span>
              <span className="material-symbols-outlined text-white/40 text-[14px] hidden md:block">
                expand_more
              </span>
            </button>
            {userOpen && (
              <div className="absolute top-full right-0 mt-2 w-44 backdrop-blur-xl bg-glass-pane border border-glass-border rounded-lg shadow-xl z-50 py-1.5">
                <Link
                  href="/settings"
                  className="flex items-center gap-3 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-white/50 hover:bg-white/5 hover:text-primary transition-colors no-underline"
                  onClick={() => setUserOpen(false)}
                >
                  <span className="material-symbols-outlined text-[16px]">settings</span>
                  Settings
                </Link>
                <div className="my-1 border-t border-glass-border" />
                <Link
                  href="/signin"
                  className="flex items-center gap-3 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-white/50 hover:bg-white/5 hover:text-red-400 transition-colors no-underline"
                  onClick={() => setUserOpen(false)}
                >
                  <span className="material-symbols-outlined text-[16px]">logout</span>
                  Sign Out
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
