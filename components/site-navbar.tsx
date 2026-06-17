"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import Image from "next/image";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import { useActiveSection } from "@/hooks/use-active-section";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    const offset = 80;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

export function SiteNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const sectionIds = useMemo(() => NAV_LINKS.map((l) => l.href.replace("#", "")), []);
  const activeSection = useActiveSection(sectionIds);

  useScrollLock(open);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = useCallback((href: string) => {
    setOpen(false);
    // Small delay to allow menu close animation
    requestAnimationFrame(() => {
      scrollToSection(href.replace("#", ""));
    });
  }, []);

  const toggleMenu = useCallback(() => {
    setIsAnimating(true);
    setOpen((v) => !v);
    setTimeout(() => setIsAnimating(false), 350);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out",
          scrolled
            ? "bg-[rgba(5,5,5,0.92)] backdrop-blur-xl border-b border-white/[0.05] shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto flex h-[70px] max-w-[1200px] items-center justify-between px-5 sm:px-8 lg:px-10">
          {/* Logo */}
          <button
            type="button"
            onClick={() => handleNavClick("#home")}
            className="flex shrink-0 items-center gap-2.5 bg-transparent border-none cursor-pointer p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xl transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
            aria-label="Go to top"
          >
            <Image
              src="/icone.png"
              alt="Olympic Jafy Gym"
              width={44}
              height={44}
              className="object-contain"
              priority
            />
          </button>

          {/* Desktop nav */}
          <nav
            aria-label="Primary"
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 xl:gap-10 lg:flex"
          >
            {NAV_LINKS.map(({ href, label }) => {
              const id = href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <button
                  key={href}
                  type="button"
                  onClick={() => handleNavClick(href)}
                  className={cn(
                    "group relative bg-transparent border-none cursor-pointer py-2 text-[13px] font-medium tracking-wide transition-colors duration-300",
                    isActive ? "text-white" : "text-white/40 hover:text-white/85"
                  )}
                >
                  {label}
                  <span
                    className={cn(
                      "absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full transition-all duration-350 origin-left ease-out",
                      isActive
                        ? "scale-x-100 opacity-100"
                        : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
                    )}
                    style={{ background: "var(--gradient-primary)" }}
                  />
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            {/* Desktop CTA */}
            <button
              type="button"
              onClick={() => handleNavClick("#pricing")}
              className="hidden lg:inline-flex items-center rounded-lg px-6 py-2.5 text-[12px] font-bold uppercase tracking-[0.14em] text-white transition-all duration-300 active:scale-[0.97] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(144,0,232,0.30)]"
              style={{ background: "var(--gradient-primary)" }}
            >
              Join Now
            </button>

            {/* Hamburger */}
            <button
              type="button"
              onClick={toggleMenu}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className={cn(
                "flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-xl transition-all duration-300 lg:hidden border",
                open 
                  ? "border-white/[0.12] bg-white/[0.06]" 
                  : "border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/[0.12]"
              )}
            >
              <span 
                className={cn(
                  "block h-[1.5px] rounded-sm bg-white/80 transition-all duration-300 ease-out",
                  open ? "w-5 translate-y-[6.5px] rotate-45" : "w-5"
                )} 
              />
              <span 
                className={cn(
                  "block h-[1.5px] w-5 rounded-sm bg-white/80 transition-all duration-300 ease-out",
                  open && "opacity-0 scale-x-0"
                )} 
              />
              <span 
                className={cn(
                  "block h-[1.5px] rounded-sm bg-white/80 transition-all duration-300 ease-out",
                  open ? "w-5 -translate-y-[6.5px] -rotate-45" : "w-5"
                )} 
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-all duration-400 lg:hidden",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile menu */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={cn(
          "fixed left-0 right-0 top-[70px] z-[45] p-5 pb-8 transition-all duration-350 ease-out lg:hidden",
          open ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-3 opacity-0 pointer-events-none"
        )}
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          backgroundColor: "rgba(8,8,8,0.98)",
          backdropFilter: "blur(24px) saturate(1.2)",
        }}
      >
        <nav aria-label="Mobile primary">
          <ul className="mb-6 flex flex-col gap-0.5">
            {NAV_LINKS.map(({ href, label }) => {
              const id = href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <li key={href}>
                  <button
                    type="button"
                    onClick={() => handleNavClick(href)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-[15px] font-medium transition-all duration-250",
                      isActive
                        ? "text-white bg-[rgba(144,0,232,0.08)]"
                        : "text-white/55 hover:text-white/90 hover:bg-white/[0.03]"
                    )}
                  >
                    {label}
                    {isActive && (
                      <span
                        className="h-1.5 w-1.5 rounded-full shrink-0 ml-2"
                        style={{ background: "var(--gradient-primary-135)" }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Mobile CTA */}
          <button
            type="button"
            onClick={() => handleNavClick("#pricing")}
            className="flex w-full items-center justify-center rounded-xl py-4 text-[13px] font-bold uppercase tracking-[0.12em] text-white transition-all duration-200 active:scale-[0.97] hover:shadow-[0_8px_32px_rgba(144,0,232,0.25)]"
            style={{ background: "var(--gradient-primary)" }}
          >
            Join Now — Start Today
          </button>

          <p className="mt-4 text-center text-[11px] text-white/25">
            Two clubs in Salé · One membership
          </p>
        </nav>
      </div>
    </>
  );
}