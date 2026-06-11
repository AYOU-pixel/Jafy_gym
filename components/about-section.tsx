"use client"

import Image from "next/image"
import { MapPin, Clock, Shield, Award } from "lucide-react"

const points = [
  {
    icon: Award,
    title: "Pro-level equipment",
    detail: "US machines across both clubs — the same gear serious athletes demand.",
  },
  {
    icon: Shield,
    title: "Certified coaching",
    detail: "Every trainer is dedicated to your progress, not just filling a shift.",
  },
  {
    icon: MapPin,
    title: "Two full gyms",
    detail: "Musculation, cardio, and women's zones — one membership unlocks both.",
  },
  {
    icon: Clock,
    title: "Open every day",
    detail: "Early mornings to late nights, 7 days a week. No excuses about hours.",
  },
]

const stats = [
  { value: "2+", label: "Years serving Layayda" },
  { value: "500+", label: "Active members" },
  { value: "7", label: "Days open every week" },
]

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden py-24 lg:py-36"
      style={{ backgroundColor: "#080808" }}
    >
      {/* Atmospheric glow — left edge, far dim */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-8%] top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full blur-[180px]"
        style={{ background: "rgba(144, 0, 232, 0.045)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">

          {/* ── Image column ────────────────────────────────── */}
          <div className="relative">
            <div
              className="relative aspect-[4/5] overflow-hidden rounded-2xl"
              style={{ border: "1px solid rgba(255,255,255,0.04)" }}
            >
              <Image
                src="/A1.jpg"
                alt="Olympic Jafy Gym training floor"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 90vw"
                loading="lazy"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(8,8,8,0.55) 0%, rgba(8,8,8,0.04) 50%, transparent 100%)",
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at 0% 0%, rgba(144,0,232,0.06) 0%, transparent 55%)",
                }}
              />
            </div>

            {/* Inset secondary image */}
            <div
              className="absolute bottom-8 right-8 h-44 w-36 overflow-hidden rounded-xl sm:h-52 sm:w-44"
              style={{ border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <Image
                src="/c2.jpg"
                alt="Olympic Jafy Gym Club 2"
                fill
                className="object-cover"
                sizes="176px"
                loading="lazy"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(8,8,8,0.6) 0%, transparent 100%)",
                }}
              />
              <div className="absolute bottom-3 left-0 right-0 text-center">
                <span
                  className="text-[9px] font-semibold uppercase tracking-[0.18em]"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  Club 2
                </span>
              </div>
            </div>

            {/* Location badge */}
            <div
              className="absolute left-5 top-5 flex items-center gap-2 rounded-full px-3 py-1.5"
              style={{
                background: "rgba(8,8,8,0.65)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <MapPin className="h-3 w-3" style={{ color: "rgba(255,255,255,0.40)" }} />
              <span
                className="text-[10px] font-medium uppercase tracking-[0.14em]"
                style={{ color: "rgba(255,255,255,0.50)" }}
              >
                Club 1 · Layayda
              </span>
            </div>
          </div>

          {/* ── Content column ──────────────────────────────── */}
          <div className="flex flex-col">
            <span className="eyebrow w-fit">
              <span
                className="h-[5px] w-[5px] rounded-full"
                style={{ background: "var(--gradient-primary-135)" }}
              />
              About Us
            </span>

            <h2
              className="mt-6 font-display font-extrabold leading-[1.02] tracking-[-0.045em] text-white text-balance"
              style={{ fontSize: "clamp(2.25rem, 4vw, 3.25rem)" }}
            >
              Olympic Jafy Gym —<br />
              Two Clubs.{" "}
              <span className="text-gradient">One Membership.</span>
            </h2>

            <p
              className="mt-6 max-w-lg text-[15px] leading-[1.8] font-light"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              Founded in Layayda, Olympic Jafy Gym is built for athletes who want
              real results. From first-timers to experienced lifters, everyone
              trains with US equipment in a space designed to push limits —
              including a dedicated women-only zone for comfortable, focused
              training.
            </p>

            {/* Feature points */}
            <ul className="mt-10 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {points.map((point) => (
                <li
                  key={point.title}
                  className="flex flex-col gap-2 rounded-xl p-4 transition-all duration-350"
                  style={{
                    border: "1px solid rgba(255,255,255,0.03)",
                    background: "rgba(255,255,255,0.012)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(144,0,232,0.13)";
                    el.style.background = "rgba(144,0,232,0.03)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(255,255,255,0.03)";
                    el.style.background = "rgba(255,255,255,0.012)";
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                      style={{
                        background: "rgba(144,0,232,0.09)",
                        color: "#A020F0",
                      }}
                    >
                      <point.icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                    </span>
                    <span
                      className="text-[13px] font-semibold"
                      style={{ color: "rgba(255,255,255,0.88)" }}
                    >
                      {point.title}
                    </span>
                  </div>
                  <p
                    className="pl-[2.375rem] text-[12.5px] leading-[1.7]"
                    style={{ color: "rgba(255,255,255,0.50)" }}
                  >
                    {point.detail}
                  </p>
                </li>
              ))}
            </ul>

            {/* Stats */}
            <div
              className="mt-12 grid grid-cols-3 gap-0 pt-10"
              style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
            >
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className="pr-6"
                  style={
                    i < stats.length - 1
                      ? { borderRight: "1px solid rgba(255,255,255,0.05)" }
                      : {}
                  }
                >
                  {i > 0 && <div className="pl-6" />}
                  <div
                    className={`font-display font-extrabold leading-none stat-value${i > 0 ? " pl-6" : ""}`}
                    style={{ fontSize: "clamp(1.75rem, 3vw, 2.375rem)" }}
                  >
                    {s.value}
                  </div>
                  <div
                    className={`mt-2 text-[10px] font-medium uppercase tracking-[0.12em] leading-relaxed${i > 0 ? " pl-6" : ""}`}
                    style={{ color: "rgba(255,255,255,0.28)" }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
