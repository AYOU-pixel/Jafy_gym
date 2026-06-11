"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ArrowRight, MapPin, Users, Star } from "lucide-react";

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

export function HeroSection() {
  const [clubModalOpen, setClubModalOpen] = useState(false);

  return (
    <>
      <section
        id="home"
        className="relative overflow-hidden pb-28 pt-40 text-white lg:pb-36 lg:pt-48"
        style={{ backgroundColor: "#050505" }}
      >
        {/* Atmospheric glow — single source, far right, very dim */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-10%] top-[20%] h-[600px] w-[600px] rounded-full blur-[200px]"
          style={{ background: "rgba(144, 0, 232, 0.05)" }}
        />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-20 lg:grid-cols-2 lg:gap-24">

            {/* ── Left column ─────────────────────────────────── */}
            <div className="flex flex-col gap-9 animate-in fade-in slide-in-from-left-4 duration-700">

              {/* Headline — maximum weight, ultra-tight */}
              <div className="flex flex-col gap-1">
                <h1
                  className="font-display font-extrabold tracking-[-0.05em] leading-[0.98] text-white"
                  style={{ fontSize: "clamp(3.25rem, 6vw, 5rem)" }}
                >
                  No Excuses.
                </h1>
                <h1
                  className="font-display font-extrabold tracking-[-0.05em] leading-[0.98]"
                  style={{ fontSize: "clamp(3.25rem, 6vw, 5rem)" }}
                >
                  Just{" "}
                  <span className="text-gradient">Results.</span>
                </h1>
              </div>

              {/* Body — refined opacity, tighter max-width */}
              <p
                className="max-w-[22rem] text-[15px] leading-[1.8] font-light"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                Two clubs. US-grade equipment. Dedicated zones for men and women.{" "}
                <span style={{ color: "rgba(255,255,255,0.75)" }}>
                  One membership, both locations.
                </span>
              </p>

              {/* ── CTAs ── */}
              <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <button
                  onClick={() => scrollToSection("pricing")}
                  className="btn-primary"
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

              {/* ── Stats ── */}
              {/* FIX: Improved text size and readability without changing colors */}
              <div
                className="grid max-w-xs grid-cols-3 gap-0 pt-10"
                style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
              >
                {stats.map((s, i) => (
                  <div
                    key={s.label}
                    className="flex flex-col gap-1.5 pr-5"
                    style={
                      i < stats.length - 1
                        ? { borderRight: "1px solid rgba(255,255,255,0.05)" }
                        : {}
                    }
                  >
                    {i > 0 && <div className="pl-5" />}
                    {/* Increased font size from 1.625rem to 2rem for better visibility */}
                    <div
                      className={`font-display text-[2rem] font-extrabold leading-none tracking-tight stat-value${i > 0 ? " pl-5" : ""}`}
                    >
                      {s.value}
                    </div>
                    {/* Increased from text-[10px] to text-[12px] and improved tracking */}
                    <div
                      className={`text-[12px] font-semibold uppercase tracking-[0.12em]${i > 0 ? " pl-5" : ""}`}
                      style={{ color: "rgba(255,255,255,0.45)" }}
                    >
                      {s.label}
                    </div>
                    {/* Increased from text-[10px] to text-[11px] and improved opacity for better contrast */}
                    <div
                      className={`hidden text-[11px] leading-relaxed sm:block${i > 0 ? " pl-5" : ""}`}
                      style={{ color: "rgba(255,255,255,0.45)" }}
                    >
                      {s.sublabel}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right column — hero image ─────────────────── */}
            <div className="relative animate-in fade-in slide-in-from-right-4 duration-700 delay-150">

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
                  sizes="(min-width: 1024px) 440px, 92vw"
                />

                {/* Gradient overlay — bottom-heavy */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, #050505 0%, rgba(5,5,5,0.45) 40%, transparent 100%)",
                  }}
                />

                {/* Subtle purple edge vignette */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse at 0% 0%, rgba(144,0,232,0.06) 0%, transparent 55%)",
                  }}
                />

                {/* Bottom info card */}
                <div
                  className="absolute bottom-5 left-5 right-5 flex items-center gap-3 rounded-xl p-4"
                  style={{
                    border: "1px solid rgba(255,255,255,0.06)",
                    background: "rgba(5,5,5,0.72)",
                    backdropFilter: "blur(24px)",
                  }}
                >
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                    style={{ background: "var(--gradient-primary-135)" }}
                  >
                    <MapPin className="h-3.5 w-3.5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div
                      className="text-[9px] uppercase tracking-[0.16em] mb-0.5"
                      style={{ color: "rgba(255,255,255,0.25)" }}
                    >
                      Abonnement unique
                    </div>
                    <div
                      className="truncate text-[12px] font-semibold"
                      style={{ color: "rgba(255,255,255,0.88)" }}
                    >
                      Accès aux 2 clubs
                    </div>
                  </div>
                  <div
                    className="flex items-center gap-1.5 rounded-full px-2.5 py-1"
                    style={{ background: "rgba(144,0,232,0.10)" }}
                  >
                    <span
                      className="h-1 w-1 rounded-full"
                      style={{ backgroundColor: "#9000E8" }}
                    />
                    <span
                      className="text-[9px] font-semibold tracking-wide"
                      style={{ color: "#A020F0" }}
                    >
                      Ouvert
                    </span>
                  </div>
                </div>

                {/* Rating badge */}
                <div
                  className="absolute right-5 top-5 flex items-center gap-1.5 rounded-full px-3 py-1.5"
                  style={{
                    border: "1px solid rgba(255,255,255,0.07)",
                    background: "rgba(5,5,5,0.65)",
                    backdropFilter: "blur(20px)",
                  }}
                >
                  <Star
                    className="h-2.5 w-2.5"
                    style={{ fill: "#D4FF00", color: "#D4FF00" }}
                  />
                  <span
                    className="text-[12px] font-semibold"
                    style={{ color: "rgba(255,255,255,0.88)" }}
                  >
                    5.0
                  </span>
                  <span
                    className="text-[9px]"
                    style={{ color: "rgba(255,255,255,0.25)" }}
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
