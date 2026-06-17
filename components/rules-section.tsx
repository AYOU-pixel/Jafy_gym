"use client"

import { useEffect, useRef, useState } from "react"
import { ShieldCheck, AlertTriangle, Clock, Dumbbell, Droplets, Footprints, Smartphone, Utensils, Users, FileText, UserX } from "lucide-react"

const rules = [
  {
    number: "01",
    icon: ShieldCheck,
    title: "Train with purpose",
    text: "Gym access is for athletic activity only. Compliance with club rules is mandatory for all members.",
  },
  {
    number: "02",
    icon: Clock,
    title: "Pay on time",
    text: "Monthly fees are due without delay. No exceptions.",
  },
  {
    number: "03",
    icon: Users,
    title: "Respect everyone",
    text: "Treat staff and fellow members with respect. Keep noise and behavior appropriate at all times.",
  },
  {
    number: "04",
    icon: Dumbbell,
    title: "Rack your weights",
    text: "Return all equipment after use. Never drop or leave weights on the floor.",
  },
  {
    number: "05",
    icon: Smartphone,
    title: "Secure your valuables",
    text: "Hand phones and cash to the manager before training. Keep your belongings safe.",
  },
  {
    number: "06",
    icon: AlertTriangle,
    title: "No liability for losses",
    text: "The club is not responsible for lost or stolen valuables left unattended on the premises.",
  },
  {
    number: "07",
    icon: Clock,
    title: "4 sessions max / week",
    text: "Members are limited to four training sessions per week.",
  },
  {
    number: "08",
    icon: Droplets,
    title: "2-minute shower rule",
    text: "Showers are for rinsing off sweat only — not bathing. Two minutes maximum.",
  },
  {
    number: "09",
    icon: Footprints,
    title: "Wear proper footwear",
    text: "Athletic shoes are mandatory for every session. No exceptions.",
  },
  {
    number: "10",
    icon: Droplets,
    title: "Bring a towel",
    text: "A personal towel is required at every session. No towel, no training.",
  },
  {
    number: "11",
    icon: FileText,
    title: "No refunds after 3 sessions",
    text: "Once your fee is paid and 3+ sessions attended that month, no refunds or extensions apply.",
  },
  {
    number: "12",
    icon: FileText,
    title: "Stay informed",
    text: "Read all club announcements. Your feedback and suggestions are always welcome.",
  },
  {
    number: "13",
    icon: Utensils,
    title: "No gum inside",
    text: "Chewing gum is strictly forbidden on the gym floor.",
  },
  {
    number: "14",
    icon: UserX,
    title: "Violations = expulsion",
    text: "The club reserves the right to remove any member who breaches these regulations.",
  },
]

function useScrollReveal(threshold = 0.06) {
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
      { threshold, rootMargin: "0px 0px -50px 0px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, visible }
}

export function RulesSection() {
  const { ref: sectionRef, visible } = useScrollReveal()

  return (
    <section
      ref={sectionRef}
      id="rules"
      className="relative overflow-hidden"
      style={{
        backgroundColor: "#050505",
        paddingTop: "clamp(5rem, 10vw, 8.5rem)",
        paddingBottom: "clamp(5rem, 10vw, 8.5rem)",
      }}
    >
      {/* Atmospheric glow — refined */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] top-1/3 h-[600px] w-[600px] rounded-full opacity-35"
        style={{ 
          background: "radial-gradient(circle, rgba(144, 0, 232, 0.05) 0%, transparent 70%)",
          filter: "blur(100px)"
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        {/* Section header — improved */}
        <div
          className={`mb-12 sm:mb-16 flex flex-col gap-5 transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <span className="eyebrow w-fit">
            <span
              className="h-[5px] w-[5px] rounded-full"
              style={{ background: "var(--gradient-primary-135)" }}
            />
            Club Rules
          </span>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2
              className="font-display font-extrabold leading-[1.02] tracking-[-0.04em] text-white text-balance"
              style={{ fontSize: "clamp(1.875rem, 4vw, 3.25rem)" }}
            >
              Train hard.{" "}
              <span className="text-gradient">Play fair.</span>
            </h2>
            <p
              className="max-w-xs text-[14px] leading-[1.75]"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              14 rules. One standard. A gym that works for everyone.
            </p>
          </div>
        </div>

        {/* Rules grid — refined cards */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-2">
          {rules.map((rule, idx) => (
            <div
              key={rule.number}
              className={`group flex items-start gap-4 sm:gap-5 rounded-2xl p-5 sm:p-6 transition-all duration-700 ease-out ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{
                border: "1px solid rgba(255,255,255,0.04)",
                background: "rgba(255,255,255,0.015)",
                transitionDelay: `${Math.min(idx * 35, 350)}ms`,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = "rgba(144,0,232,0.16)"
                el.style.background = "rgba(144,0,232,0.03)"
                el.style.transform = "translateY(-2px)"
                el.style.boxShadow = "0 8px 24px rgba(144,0,232,0.04)"
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = "rgba(255,255,255,0.04)"
                el.style.background = "rgba(255,255,255,0.015)"
                el.style.transform = "translateY(0)"
                el.style.boxShadow = "none"
              }}
            >
              {/* Icon + number */}
              <div className="flex shrink-0 flex-col items-center gap-2">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300"
                  style={{ background: "rgba(144,0,232,0.08)", color: "#B04AFF" }}
                >
                  <rule.icon strokeWidth={1.75} className="h-[1.125rem] w-[1.125rem]" />
                </span>
                <span
                  className="font-display text-[10px] font-bold tabular-nums"
                  style={{ color: "rgba(144,0,232,0.35)" }}
                >
                  {rule.number}
                </span>
              </div>

              {/* Text — improved readability */}
              <div className="flex flex-col gap-1 pt-0.5 min-w-0">
                <span
                  className="text-[13px] font-semibold tracking-wide"
                  style={{ color: "rgba(255,255,255,0.90)" }}
                >
                  {rule.title}
                </span>
                <p
                  className="text-[13px] leading-[1.7]"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  {rule.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer badge — enhanced */}
        <div
          className={`mt-12 sm:mt-14 flex justify-center transition-all duration-700 delay-400 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <div
            className="flex items-center gap-3 rounded-full px-6 py-3 transition-all duration-300"
            style={{
              border: "1px solid rgba(144,0,232,0.14)",
              background: "rgba(144,0,232,0.04)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = "rgba(144,0,232,0.22)"
              el.style.background = "rgba(144,0,232,0.06)"
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = "rgba(144,0,232,0.14)"
              el.style.background = "rgba(144,0,232,0.04)"
            }}
          >
            <ShieldCheck className="h-4 w-4 shrink-0" style={{ color: "#B04AFF" }} strokeWidth={1.75} />
            <span className="text-[12px] font-medium" style={{ color: "rgba(255,255,255,0.50)" }}>
              These rules exist to protect your training — and everyone else's.
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}