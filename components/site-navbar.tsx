"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import Image from "next/image";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import { useActiveSection } from "@/hooks/use-active-section";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function SiteNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const sectionIds = useMemo(() => NAV_LINKS.map((l) => l.href.replace("#", "")), []);
  const activeSection = useActiveSection(sectionIds);

  useScrollLock(open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = useCallback((href: string) => {
    setOpen(false);
    scrollToSection(href.replace("#", ""));
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-[rgba(7,7,7,0.85)] backdrop-blur-xl"
            : "bg-transparent"
        )}
        style={scrolled ? { borderBottom: "1px solid rgba(255,255,255,0.04)" } : {}}
      >
        <div className="mx-auto flex h-[68px] max-w-[1200px] items-center justify-between px-6 sm:px-10">
          {/* Logo */}
          <button
            type="button"
            onClick={() => handleNavClick("#home")}
            className="flex shrink-0 items-center gap-2.5 bg-transparent border-none cursor-pointer p-0"
            aria-label="Go to top"
          >
            <Image
              src="/icone.png"
              alt="Olympic Jafy Gym"
              width={52}
              height={52}
              className="object-contain"
              priority
            />
          </button>

          {/* Desktop nav */}
          <nav
            aria-label="Primary"
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex"
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
                    "group relative bg-transparent border-none cursor-pointer py-1 text-[13px] font-medium tracking-wide transition-colors duration-300",
                    isActive ? "text-white" : "text-white/50 hover:text-white/90"
                  )}
                >
                  {label}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 right-0 h-[2px] rounded-full transition-all duration-300 origin-left",
                      isActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
                    )}
                    style={{ background: "var(--gradient-primary)" }}
                  />
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            {/* Desktop CTA — cleaner, no excessive glow */}
            <button
              type="button"
              onClick={() => handleNavClick("#pricing")}
              className="hidden lg:inline-flex items-center rounded-lg px-5 py-2.5 text-[13px] font-semibold uppercase tracking-wider text-white transition-all duration-300 active:scale-[0.98] hover:translate-y-[-1px]"
              style={{
                background: "var(--gradient-primary)",
              }}
            >
              Join Now
            </button>

            {/* Hamburger */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-lg transition-colors lg:hidden"
              style={{
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.03)",
              }}
            >
              <span className={cn("block h-[1.5px] w-5 rounded-sm bg-white/80 transition-all duration-300", open && "translate-y-[6.5px] rotate-45")} />
              <span className={cn("block h-[1.5px] w-5 rounded-sm bg-white/80 transition-opacity duration-300", open && "opacity-0")} />
              <span className={cn("block h-[1.5px] w-5 rounded-sm bg-white/80 transition-all duration-300", open && "-translate-y-[6.5px] -rotate-45")} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
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
          "fixed left-0 right-0 top-[68px] z-[45] p-6 pb-8 transition-all duration-300 lg:hidden",
          open ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-2 opacity-0 pointer-events-none"
        )}
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.04)",
          backgroundColor: "rgba(10,10,10,0.97)",
          backdropFilter: "blur(20px)",
        }}
      >
        <nav aria-label="Mobile primary">
          <ul className="mb-6 flex flex-col gap-1">
            {NAV_LINKS.map(({ href, label }) => {
              const id = href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <li key={href}>
                  <button
                    type="button"
                    onClick={() => handleNavClick(href)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-lg px-4 py-3.5 text-left text-[15px] font-medium transition-all duration-200",
                      isActive ? "text-white" : "text-white/70 hover:text-white hover:bg-white/[0.03]"
                    )}
                    style={
                      isActive
                        ? {
                            background: "rgba(161,0,255,0.06)",
                          }
                        : {}
                    }
                  >
                    {label}
                    {isActive && (
                      <span
                        className="h-1.5 w-1.5 rounded-full"
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
            className="flex w-full items-center justify-center rounded-lg py-4 text-[13px] font-semibold uppercase tracking-wider text-white transition-transform active:scale-[0.98]"
            style={{
              background: "var(--gradient-primary)",
            }}
          >
            Join Now — Start Today
          </button>
        </nav>
      </div>
    </>
  );
}
