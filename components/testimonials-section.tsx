"use client"

import { useEffect, useRef, useState } from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    name: "Anass",
    initials: "A",
    quote:
      "10/10 gym. Great equipment, well-maintained, clean, has great lighting. All staff members are polite and have great customer service (My favorite is Omar, because he reminds people to use their towels. Please keep Omar!)",
  },
  {
    name: "Houssam Eddine",
    initials: "HE",
    quote:
      "The owner is gym rat who's passionate about sports and he clearly does everything it takes to leverage the sports game in the region.",
  },
  {
    name: "Adam Zerhouni",
    initials: "AZ",
    quote: "Amazing gym, good equipement and good vibes",
  },
  {
    name: "Youssef Aitouihy",
    initials: "YA",
    quote: "Saraha la salle wa3r kolchi fih zwin kantmna dima tb9aw haka 😍",
  },
]

function StarRow({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="h-3.5 w-3.5"
          style={{ fill: "#FFC107", color: "#FFC107" }}
          aria-hidden="true"
        />
      ))}
      <span className="sr-only">5 out of 5 stars</span>
    </div>
  )
}

function InitialAvatar({ initials }: { initials: string }) {
  return (
    <div
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-display text-[13px] font-bold uppercase tracking-wide"
      style={{
        background: "linear-gradient(135deg, #A100FF22, #FF2D5518)",
        border: "1px solid rgba(161,0,255,0.12)",
        color: "rgba(255,255,255,0.8)",
      }}
    >
      {initials}
    </div>
  )
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
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, visible }
}

export function TestimonialsSection() {
  const { ref: sectionRef, visible } = useScrollReveal()

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative overflow-hidden"
      style={{
        backgroundColor: "#0a0a0a",
        paddingTop: "clamp(5rem, 10vw, 8rem)",
        paddingBottom: "clamp(5rem, 10vw, 8rem)",
      }}
    >
      {/* Subtle ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] rounded-full blur-[140px] opacity-50"
        style={{ background: "rgba(161,0,255,0.03)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-lg">
            <span className="eyebrow">
              <span className="h-[5px] w-[5px] rounded-full" style={{ background: "var(--gradient-primary-135)" }} />
              Google Reviews
            </span>
            <h2
              className="mt-7 font-display font-extrabold leading-[1.05] tracking-[-0.045em] text-white text-balance"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}
            >
              What our{" "}
              <span className="text-gradient">members say</span>.
            </h2>
          </div>

          <div className="flex items-center gap-4 lg:pb-1">
            <div className="flex flex-col items-end gap-1.5">
              <StarRow />
              <p className="text-right text-[12px] text-white/40">
                5.0 · 80+ reviews
              </p>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {testimonials.map((t, idx) => (
            <article
              key={t.name}
              className={`rounded-xl p-7 sm:p-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{
                background: "#0e0e0e",
                border: "1px solid rgba(255,255,255,0.04)",
                transitionDelay: `${idx * 100}ms`,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(161,0,255,0.12)"
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.04)"
              }}
            >
              <div className="flex items-start gap-3.5">
                <InitialAvatar initials={t.initials} />
                <div className="flex flex-col gap-1.5">
                  <div className="text-[15px] font-semibold text-white/90">
                    {t.name}
                  </div>
                  <StarRow />
                </div>
              </div>

              <blockquote className="mt-5 text-[14px] leading-[1.7] text-white/70">
                "{t.quote}"
              </blockquote>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 flex items-center justify-center">
          <a
            href="https://www.google.com/maps/place/Olympic+Jafy+Gym/@34.0915914,-6.7701705,17z/data=!3m1!4b1!4m6!3m5!1s0xda76929e2fd2703:0x7f1de442e3171261!8m2!3d34.0915914!4d-6.7701705!16s%2Fg%2F11tbz3d8gr?entry=ttu&g_ep=EgoyMDI2MDYwMy4xIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-[13px] font-medium text-white/40 transition-all duration-300 hover:text-white/70 hover:border-white/[0.10]"
            style={{
              border: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            <Star className="h-3.5 w-3.5" style={{ fill: "#FFC107", color: "#FFC107" }} />
            See all reviews on Google Maps
          </a>
        </div>
      </div>
    </section>
  )
}