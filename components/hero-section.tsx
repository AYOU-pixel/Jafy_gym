"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ArrowRight, MapPin, Star, ChevronDown } from "lucide-react";

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
  if (el) {
    const offset = 80;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

export function HeroSection() {
  const [clubModalOpen, setClubModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Staggered reveal
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        id="home"
        className="relative overflow-hidden"
        style={{
          backgroundColor: "#050505",
          paddingTop: "clamp(6rem, 11vw, 11rem)",
          paddingBottom: "clamp(4rem, 7vw, 7.5rem)",
        }}
      >
        {/* Atmospheric glow — refined */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-10%] top-[10%] h-[550px] w-[550px] rounded-full opacity-50"
          style={{ 
            background: "radial-gradient(circle, rgba(144, 0, 232, 0.05) 0%, transparent 70%)",
            filter: "blur(80px)"
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[-5%] bottom-[20%] h-[300px] w-[300px] rounded-full opacity-30"
          style={{ 
            background: "radial-gradient(circle, rgba(232, 38, 78, 0.04) 0%, transparent 70%)",
            filter: "blur(60px)"
          }}
        />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:gap-16 xl:gap-20 lg:grid-cols-2">

            {/* ── Left column ── */}
            <div
              className={`flex flex-col gap-7 transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
            >
              {/* Eyebrow badge */}
              <div 
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 w-fit"
                style={{
                  background: "rgba(144,0,232,0.08)",
                  border: "1px solid rgba(144,0,232,0.15)",
                }}
              >
                <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#9000E8" }} />
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: "#B04AFF" }}>
                  Premium Fitness in Salé
                </span>
              </div>

              {/* Headline — improved hierarchy */}
              <div className="flex flex-col gap-1">
                <h1
                  className="font-display font-extrabold tracking-[-0.04em] leading-[0.98] text-white"
                  style={{ fontSize: "clamp(2.5rem, 6vw, 5.25rem)" }}
                >
                  No Excuses.
                </h1>
                <h1
                  className="font-display font-extrabold tracking-[-0.04em] leading-[0.98]"
                  style={{ fontSize: "clamp(2.5rem, 6vw, 5.25rem)" }}
                >
                  Just{" "}
                  <span className="text-gradient">Results.</span>
                </h1>
              </div>

              {/* Body — improved readability */}
              <p
                className="max-w-lg text-[15px] leading-[1.75] font-light"
                style={{ color: "rgba(255,255,255,0.50)" }}
              >
                Two clubs. US-grade equipment. Dedicated zones for men and women.{" "}
                <span style={{ color: "rgba(255,255,255,0.78)", fontWeight: 400 }}>
                  One membership, both locations.
                </span>{" "}
                Start your transformation today.
              </p>

              {/* CTAs — enhanced prominence */}
              <div className="flex flex-col items-start gap-3.5 sm:flex-row sm:items-center">
                <button
                  onClick={() => scrollToSection("pricing")}
                  className="btn-primary min-h-[52px] px-8 text-[11px] tracking-[0.16em]"
                >
                  Join Now
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                </button>

                <button
                  onClick={() => setClubModalOpen(true)}
                  className="btn-text"
                >
                  View our clubs
                  <ArrowRight className="h-3 w-3" strokeWidth={2} />
                </button>
              </div>

              {/* Trust bar */}
              <div className="flex items-center gap-2 mt-1">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map((i) => (
                    <div 
                      key={i} 
                      className="h-7 w-7 rounded-full border-2 border-[#050505] bg-white/10 flex items-center justify-center"
                    >
                      <span className="text-[9px] font-bold text-white/60">★</span>
                    </div>
                  ))}
                </div>
                <span className="text-[12px] text-white/35 ml-1">
                  <span className="text-white/60 font-semibold">500+</span> members joined this year
                </span>
              </div>

              {/* Stats — improved readability */}
              <div
                className="grid max-w-md grid-cols-3 gap-0 pt-8 mt-2"
                style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
              >
                {stats.map((s, i) => (
                  <div
                    key={s.label}
                    className="flex flex-col gap-1.5"
                    style={
                      i < stats.length - 1
                        ? { borderRight: "1px solid rgba(255,255,255,0.06)", paddingRight: "1.5rem" }
                        : {}
                    }
                  >
                    {i > 0 && <div className="pl-5" />}
                    <div
                      className={`font-display text-[1.75rem] sm:text-[2rem] font-extrabold leading-none tracking-tight stat-value${i > 0 ? " pl-5" : ""}`}
                    >
                      {s.value}
                    </div>
                    <div
                      className={`text-[11px] font-semibold uppercase tracking-[0.14em]${i > 0 ? " pl-5" : ""}`}
                      style={{ color: "rgba(255,255,255,0.45)" }}
                    >
                      {s.label}
                    </div>
                    <div
                      className={`hidden text-[11px] leading-relaxed sm:block${i > 0 ? " pl-5" : ""}`}
                      style={{ color: "rgba(255,255,255,0.28)" }}
                    >
                      {s.sublabel}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right column ── */}
            <div
              className={`relative transition-all duration-700 delay-200 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
            >
              <div
                className="relative mx-auto aspect-[3/4] max-w-[400px] overflow-hidden rounded-2xl"
                style={{ 
                  border: "1px solid rgba(255,255,255,0.05)",
                  boxShadow: "0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03)"
                }}
              >
                <Image
                  src="/hero.jpg"
                  alt="Athlete training at Olympic Jafy Gym"
                  fill
                  priority
                  className={`object-cover transition-all duration-1000 ${imageLoaded ? 'scale-100 blur-0' : 'scale-105 blur-sm'}`}
                  sizes="(min-width: 1024px) 400px, 92vw"
                  onLoad={() => setImageLoaded(true)}
                />

                {/* Gradient overlays — refined */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to top, #050505 0%, rgba(5,5,5,0.50) 45%, transparent 70%)",
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: "radial-gradient(ellipse at 0% 0%, rgba(144,0,232,0.08) 0%, transparent 55%)",
                  }}
                />

                {/* Bottom info card — enhanced */}
                <div
                  className="absolute bottom-5 left-5 right-5 flex items-center gap-3 rounded-xl p-4"
                  style={{
                    border: "1px solid rgba(255,255,255,0.07)",
                    background: "rgba(5,5,5,0.78)",
                    backdropFilter: "blur(24px) saturate(1.2)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                  }}
                >
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                    style={{ background: "var(--gradient-primary-135)" }}
                  >
                    <MapPin className="h-4 w-4 text-white" strokeWidth={2} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div
                      className="text-[9px] uppercase tracking-[0.16em] mb-0.5"
                      style={{ color: "rgba(255,255,255,0.35)" }}
                    >
                      Abonnement unique
                    </div>
                    <div
                      className="truncate text-[13px] font-semibold"
                      style={{ color: "rgba(255,255,255,0.92)" }}
                    >
                      Accès aux 2 clubs
                    </div>
                  </div>
                  <div
                    className="flex items-center gap-1.5 rounded-full px-3 py-1.5 shrink-0"
                    style={{ background: "rgba(144,0,232,0.12)" }}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full animate-pulse"
                      style={{ backgroundColor: "#9000E8" }}
                    />
                    <span
                      className="text-[10px] font-bold tracking-wide"
                      style={{ color: "#B04AFF" }}
                    >
                      Ouvert
                    </span>
                  </div>
                </div>

                {/* Rating badge — enhanced */}
                <div
                  className="absolute right-5 top-5 flex items-center gap-1.5 rounded-full px-3 py-1.5"
                  style={{
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(5,5,5,0.70)",
                    backdropFilter: "blur(20px) saturate(1.2)",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                  }}
                >
                  <Star
                    className="h-3.5 w-3.5"
                    style={{ fill: "#D4FF00", color: "#D4FF00" }}
                  />
                  <span
                    className="text-[13px] font-bold"
                    style={{ color: "rgba(255,255,255,0.92)" }}
                  >
                    5.0
                  </span>
                  <span
                    className="text-[10px]"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                  >
                    Google
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div 
          className={`absolute bottom-6 left-1/2 -translate-x-1/2 transition-all duration-700 delay-700 ${isVisible ? "opacity-40" : "opacity-0"}`}
        >
          <button 
            onClick={() => scrollToSection("programs")}
            className="flex flex-col items-center gap-1 text-white/30 hover:text-white/50 transition-colors"
            aria-label="Scroll to programs"
          >
            <span className="text-[9px] uppercase tracking-[0.2em]">Scroll</span>
            <ChevronDown className="h-4 w-4 animate-bounce" />
          </button>
        </div>
      </section>

      <ClubSelectorModal
        isOpen={clubModalOpen}
        onClose={() => setClubModalOpen(false)}
      />
    </>
  );
}