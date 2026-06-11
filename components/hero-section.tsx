"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ArrowRight, MapPin, Star } from "lucide-react";

const ClubSelectorModal = dynamic(
  () => import("@/components/ClubSelectorModal").then((m) => m.ClubSelectorModal),
  { ssr: false }
);

const stats = [
  { value: "2", label: "Clubs", sublabel: "One membership" },
  { value: "100%", label: "Women's Zone", sublabel: "Private & dedicated" },
  { value: "5.0", label: "Google", sublabel: "Member rated" },
];

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function useCountUp(end: number, duration: number = 2000, start: boolean = true) {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [end, duration, start]);

  return count;
}

export function HeroSection() {
  const [clubModalOpen, setClubModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        id="home"
        className="relative overflow-hidden"
        style={{
          backgroundColor: "#050505",
          paddingTop: "clamp(7rem, 12vw, 12rem)",
          paddingBottom: "clamp(5rem, 8vw, 9rem)",
        }}
      >
        {/* Atmospheric glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-8%] top-[15%] h-[500px] w-[500px] rounded-full blur-[200px] opacity-60"
          style={{ background: "rgba(144, 0, 232, 0.04)" }}
        />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">

            {/* ── Left column ── */}
            <div
              className={`flex flex-col gap-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            >
              {/* Headline */}
              <div className="flex flex-col gap-2">
                <h1
                  className="font-display font-extrabold tracking-[-0.05em] leading-[0.95] text-white"
                  style={{ fontSize: "clamp(2.75rem, 6.5vw, 5.5rem)" }}
                >
                  No Excuses.
                </h1>
                <h1
                  className="font-display font-extrabold tracking-[-0.05em] leading-[0.95]"
                  style={{ fontSize: "clamp(2.75rem, 6.5vw, 5.5rem)" }}
                >
                  Just{" "}
                  <span className="text-gradient">Results.</span>
                </h1>
              </div>

              {/* Body */}
              <p
                className="max-w-md text-[15px] leading-[1.8] font-light"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Two clubs. US-grade equipment. Dedicated zones for men and women.{" "}
                <span style={{ color: "rgba(255,255,255,0.75)" }}>
                  One membership, both locations.
                </span>
              </p>

              {/* CTAs */}
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <button
                  onClick={() => scrollToSection("pricing")}
                  className="btn-primary min-h-[52px] px-8"
                >
                  Join Now
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>

                <button
                  onClick={() => setClubModalOpen(true)}
                  className="btn-text"
                >
                  View our clubs
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>

              {/* Stats */}
              <div
                className="grid max-w-sm grid-cols-3 gap-0 pt-10 mt-2"
                style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
              >
                {stats.map((s, i) => (
                  <div
                    key={s.label}
                    className="flex flex-col gap-2"
                    style={
                      i < stats.length - 1
                        ? { borderRight: "1px solid rgba(255,255,255,0.05)", paddingRight: "1.25rem" }
                        : {}
                    }
                  >
                    {i > 0 && <div className="pl-5" />}
                    <div
                      className={`font-display text-[2rem] font-extrabold leading-none tracking-tight stat-value${i > 0 ? " pl-5" : ""}`}
                    >
                      {s.value}
                    </div>
                    <div
                      className={`text-[11px] font-semibold uppercase tracking-[0.14em]${i > 0 ? " pl-5" : ""}`}
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      {s.label}
                    </div>
                    <div
                      className={`hidden text-[11px] leading-relaxed sm:block${i > 0 ? " pl-5" : ""}`}
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                      {s.sublabel}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right column ── */}
            <div
              className={`relative transition-all duration-700 delay-150 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            >
              <div
                className="relative mx-auto aspect-[3/4] max-w-[420px] overflow-hidden rounded-2xl"
                style={{ border: "1px solid rgba(255,255,255,0.04)" }}
              >
                <Image
                  src="/hero.jpg"
                  alt="Athlete training at Olympic Jafy Gym"
                  fill
                  priority
                  className="object-cover"
                  sizes="(min-width: 1024px) 420px, 92vw"
                />

                {/* Gradient overlays */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to top, #050505 0%, rgba(5,5,5,0.45) 40%, transparent 100%)",
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: "radial-gradient(ellipse at 0% 0%, rgba(144,0,232,0.06) 0%, transparent 55%)",
                  }}
                />

                {/* Bottom info card */}
                <div
                  className="absolute bottom-6 left-6 right-6 flex items-center gap-3.5 rounded-xl p-4"
                  style={{
                    border: "1px solid rgba(255,255,255,0.06)",
                    background: "rgba(5,5,5,0.72)",
                    backdropFilter: "blur(24px)",
                  }}
                >
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                    style={{ background: "var(--gradient-primary-135)" }}
                  >
                    <MapPin className="h-4 w-4 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div
                      className="text-[9px] uppercase tracking-[0.16em] mb-0.5"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                      Abonnement unique
                    </div>
                    <div
                      className="truncate text-[13px] font-semibold"
                      style={{ color: "rgba(255,255,255,0.9)" }}
                    >
                      Accès aux 2 clubs
                    </div>
                  </div>
                  <div
                    className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
                    style={{ background: "rgba(144,0,232,0.10)" }}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: "#9000E8" }}
                    />
                    <span
                      className="text-[10px] font-semibold tracking-wide"
                      style={{ color: "#A020F0" }}
                    >
                      Ouvert
                    </span>
                  </div>
                </div>

                {/* Rating badge */}
                <div
                  className="absolute right-6 top-6 flex items-center gap-1.5 rounded-full px-3 py-1.5"
                  style={{
                    border: "1px solid rgba(255,255,255,0.07)",
                    background: "rgba(5,5,5,0.65)",
                    backdropFilter: "blur(20px)",
                  }}
                >
                  <Star
                    className="h-3 w-3"
                    style={{ fill: "#D4FF00", color: "#D4FF00" }}
                  />
                  <span
                    className="text-[13px] font-semibold"
                    style={{ color: "rgba(255,255,255,0.9)" }}
                  >
                    5.0
                  </span>
                  <span
                    className="text-[10px]"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  >
                    Google
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ClubSelectorModal
        isOpen={clubModalOpen}
        onClose={() => setClubModalOpen(false)}
      />
    </>
  );
}