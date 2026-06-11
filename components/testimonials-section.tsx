"use client"

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
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-[13px] font-bold uppercase tracking-wide"
      style={{
        background: "linear-gradient(135deg, #A100FF22, #FF2D5518)",
        border: "1px solid rgba(161,0,255,0.15)",
        color: "rgba(255,255,255,0.8)",
      }}
    >
      {initials}
    </div>
  )
}

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden py-24 text-white lg:py-32"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      {/* Subtle ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] rounded-full blur-[140px]"
        style={{ background: "rgba(161,0,255,0.03)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-lg">
            <span
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.15em]"
              style={{
                border: "1px solid rgba(161,0,255,0.12)",
                background: "rgba(161,0,255,0.04)",
                color: "#A100FF",
              }}
            >
              <span className="h-1 w-1 rounded-full" style={{ backgroundColor: "#A100FF" }} />
              Google Reviews
            </span>
            <h2 className="mt-5 font-display text-[2.5rem] font-bold leading-[1.08] tracking-tight text-balance sm:text-5xl">
              What our{" "}
              <span className="text-gradient">members say</span>.
            </h2>
          </div>

          <div className="flex items-center gap-3 lg:pb-1">
            <div className="flex flex-col items-end gap-1">
              <StarRow />
              <p className="text-right text-[11px] text-white/50">
                5.0 · 80+ reviews
              </p>
            </div>
          </div>
        </div>

        {/* Reviews Grid — Google Maps style */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {testimonials.map((t) => (
            <article
              key={t.name}
              className="rounded-xl p-5 sm:p-6"
              style={{
                background: "#0e0e0e",
                border: "1px solid rgba(255,255,255,0.04)",
                transition: "border-color 0.3s ease",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(161,0,255,0.12)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.04)";
              }}
            >
              {/* Google Maps style header: Avatar + Name + Stars */}
              <div className="flex items-start gap-3">
                <InitialAvatar initials={t.initials} />
                
                <div className="flex flex-col gap-1">
                  <div className="text-[14px] font-semibold text-white/90">
                    {t.name}
                  </div>
                  <StarRow />
                </div>
              </div>

              {/* Review text */}
              <blockquote className="mt-4 text-[14px] leading-[1.65] text-white/75">
                {t.quote}
              </blockquote>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 flex items-center justify-center">
          <a
            href="https://www.google.com/maps/place/Olympic+Jafy+Gym/@34.0915914,-6.7701705,17z/data=!3m1!4b1!4m6!3m5!1s0xda76929e2fd2703:0x7f1de442e3171261!8m2!3d34.0915914!4d-6.7701705!16s%2Fg%2F11tbz3d8gr?entry=ttu&g_ep=EgoyMDI2MDYwMy4xIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[12px] font-medium text-white/40 transition-all duration-300 hover:text-white/70"
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