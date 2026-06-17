"use client"

import { useEffect, useRef, useState } from "react"
import { Clock, Moon } from "lucide-react"
import { cn } from "@/lib/utils"

const schedule = {
  hours: [
    { day: "Monday – Thursday", hours: "08:30 – 23:00" },
    { day: "Friday", hours: "08:30 – 12:00  ·  15:00 – 23:00", split: true },
    { day: "Saturday", hours: "08:30 – 23:00" },
    { day: "Sunday", hours: "09:30 – 15:00" },
  ],
  ramadan: {
    regular: [
      { label: "Session 1", hours: "14:30 – 18:00" },
      { label: "Session 2", hours: "20:30 – 00:30" },
    ],
    sunday: "14:00 – 18:00",
  },
}

function useScrollReveal() {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, visible }
}

export function HoursSection() {
  const { ref: sectionRef, visible } = useScrollReveal()

  const rows = schedule.hours

  return (
    <section
      ref={sectionRef}
      id="hours"
      className="relative overflow-hidden"
      style={{
        backgroundColor: "#050505",
        paddingTop: "clamp(5rem, 10vw, 8.75rem)",
        paddingBottom: "clamp(5rem, 10vw, 8.75rem)",
      }}
    >
      {/* Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-8%] top-1/3 h-[560px] w-[560px] rounded-full blur-[200px] opacity-50"
        style={{ background: "rgba(144, 0, 232, 0.045)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <div
          className={`mb-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <span className="eyebrow">
            <span className="h-[5px] w-[5px] rounded-full" style={{ background: "var(--gradient-primary-135)" }} />
            Opening Hours
          </span>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2
              className="font-display font-extrabold leading-[1.02] tracking-[-0.045em] text-white"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
            >
              We're open.{" "}
              <span className="text-gradient">Every day.</span>
            </h2>
            <p className="max-w-[220px] text-[13px] leading-[1.85]" style={{ color: "rgba(255,255,255,0.30)" }}>
              Both clubs. Same schedule.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">

          {/* ── Left: Schedule table ── */}
          <div
            className={`flex flex-col transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            {/* Schedule rows */}
            <div
              className="overflow-hidden rounded-2xl"
              style={{ border: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.013)" }}
            >
              {rows.map((row, idx) => (
                <div
                  key={row.day}
                  className="flex items-center justify-between gap-4 px-7 py-5 transition-colors duration-200 hover:bg-white/[0.025]"
                  style={idx < rows.length - 1 ? { borderBottom: "1px solid rgba(255,255,255,0.04)" } : {}}
                >
                  {/* Day */}
                  <div className="flex items-center gap-3.5">
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                      style={{ background: "rgba(144,0,232,0.09)" }}
                    >
                      <Clock strokeWidth={1.6} style={{ width: "0.875rem", height: "0.875rem", color: "#A020F0" }} />
                    </span>
                    <span className="text-[14px] font-medium" style={{ color: "rgba(255,255,255,0.72)" }}>
                      {row.day}
                    </span>
                  </div>

                  {/* Hours */}
                  <div className="flex flex-col items-end gap-1">
                    {row.split ? (
                      <>
                        <span className="font-display text-[13px] font-bold tabular-nums tracking-tight" style={{ color: "#A020F0" }}>
                          08:30 – 12:00
                        </span>
                        <span className="font-display text-[13px] font-bold tabular-nums tracking-tight" style={{ color: "#A020F0" }}>
                          15:00 – 23:00
                        </span>
                      </>
                    ) : (
                      <span className="font-display text-[15px] font-bold tabular-nums tracking-tight" style={{ color: "#A020F0" }}>
                        {row.hours}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Live badge */}
            <div className="mt-5 flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ backgroundColor: "#22c55e" }} />
              <span className="text-[12px]" style={{ color: "rgba(255,255,255,0.28)" }}>
                Open now · Closes at 23:00
              </span>
            </div>
          </div>

          {/* ── Right: Ramadan block ── */}
          <div
            className={`transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div
              className="relative h-full overflow-hidden rounded-2xl p-8 sm:p-10"
              style={{
                border: "1px solid rgba(144,0,232,0.18)",
                background: "rgba(144,0,232,0.03)",
              }}
            >
              {/* Subtle glow inside card */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full blur-[80px]"
                style={{ background: "rgba(144,0,232,0.09)" }}
              />

              {/* Ramadan header */}
              <div className="relative mb-8 flex items-center gap-4">
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: "rgba(144,0,232,0.12)", border: "1px solid rgba(144,0,232,0.2)" }}
                >
                  <Moon strokeWidth={1.5} style={{ width: "1.1rem", height: "1.1rem", color: "#A020F0" }} />
                </span>
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: "rgba(144,0,232,0.7)" }}>
                    Special Schedule
                  </div>
                  <div className="mt-0.5 font-display text-[1.4rem] font-extrabold tracking-tight text-white">
                    Ramadan Hours
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="mb-7 text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: "rgba(255,255,255,0.25)" }}>
                Monday – Saturday
              </div>

              {/* Sessions */}
              <div className="relative flex flex-col gap-4">
                {schedule.ramadan.regular.map((s, idx) => (
                  <div
                    key={s.label}
                    className="flex items-center justify-between rounded-xl px-6 py-4"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <span className="text-[13px] font-medium" style={{ color: "rgba(255,255,255,0.50)" }}>
                      {s.label}
                    </span>
                    <span className="font-display text-[16px] font-bold tabular-nums tracking-tight" style={{ color: "#A020F0" }}>
                      {s.hours}
                    </span>
                  </div>
                ))}
              </div>

              {/* Sunday Ramadan */}
              <div
                className="mt-5 flex items-center justify-between rounded-xl px-6 py-4"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.04)",
                }}
              >
                <span className="text-[13px] font-medium" style={{ color: "rgba(255,255,255,0.40)" }}>
                  Sunday
                </span>
                <span className="font-display text-[16px] font-bold tabular-nums tracking-tight" style={{ color: "#A020F0" }}>
                  {schedule.ramadan.sunday}
                </span>
              </div>

              {/* Note */}
              <p className="mt-7 text-[12px] leading-[1.8]" style={{ color: "rgba(255,255,255,0.22)" }}>
                Ramadan schedule applies to all locations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}