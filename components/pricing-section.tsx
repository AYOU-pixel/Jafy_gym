"use client"

import { useState, useEffect, useRef } from "react"
import { Check, Zap, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { WHATSAPP_NUMBER } from "@/lib/constants"

const trustItems = [
  "No hidden fees",
  "Free Shaker & Towel depending on plan",
  "Full Gym & Cardio access",
  "Instant registration",
]

const semestrielPlans = [
  {
    name: "Standard Promo (6 Months)",
    price: "899",
    daily: 5,
    valueLine: "Essential budget-friendly plan.",
    features: [
      { text: "Full Gym & Cardio access", inherited: false },
      { text: "Validity: 6 Months + 15 Free Days", inherited: false },
      { text: "1x Free Shaker included", inherited: false },
      { text: "1x Free Protein Bar included", inherited: false },
    ],
    cta: "Choose Standard 6M",
    whatsappMessage: "Hello, I would like to take advantage of the Standard Promo 6 Months (899 DH)",
    highlighted: false,
    badge: null,
  },
  {
    name: "Gold Promo (6 Months)",
    price: "999",
    daily: 5.5,
    valueLine: "Best value for a 6-month period.",
    features: [
      { text: "Full Gym & Cardio access", inherited: false },
      { text: "Validity: 6 Months + 20 Free Days", inherited: false },
      { text: "1x Shaker + 1x Protein Bar", inherited: false },
      { text: "1x Free Sports Towel included", inherited: false },
    ],
    cta: "Choose Gold 6M",
    whatsappMessage: "Hello, I would like to take advantage of the Gold Promo 6 Months (999 DH)",
    highlighted: true,
    badge: "Popular 6M",
  },
  {
    name: "Premium Promo (6 Months)",
    price: "1150",
    daily: 6.3,
    valueLine: "The complete experience without compromise.",
    features: [
      { text: "Full Gym & Cardio access", inherited: false },
      { text: "Premium Cardio option included", inherited: false },
      { text: "1x Shaker + 1x Protein Bar", inherited: false },
      { text: "1x Free Sports Towel included", inherited: false },
    ],
    cta: "Choose Premium 6M",
    whatsappMessage: "Hello, I would like to take advantage of the Premium Promo 6 Months (1150 DH)",
    highlighted: false,
    badge: null,
  },
]

const annuelPlans = [
  {
    name: "Standard Promo (1 Year)",
    price: "1499",
    daily: 4,
    valueLine: "Train all year round at the best rate.",
    features: [
      { text: "Full Gym & Cardio access", inherited: false },
      { text: "Validity: 1 Year + 1 Free Month", inherited: false },
      { text: "1x Free Shaker included", inherited: false },
      { text: "1x Free Protein Bar included", inherited: false },
    ],
    cta: "Choose Standard 1 Year",
    whatsappMessage: "Hello, I would like to take advantage of the Annual Standard Promo (1499 DH)",
    highlighted: false,
    badge: null,
  },
  {
    name: "Gold Promo (1 Year)",
    price: "1599",
    daily: 4.3,
    valueLine: "Our most recommended offer.",
    features: [
      { text: "Full Gym & Cardio access", inherited: false },
      { text: "Validity: 1 Year + 2 Free Months", inherited: false },
      { text: "1x Shaker + 1x Protein Bar", inherited: false },
      { text: "1x Free Sports Towel included", inherited: false },
    ],
    cta: "Choose Gold 1 Year",
    whatsappMessage: "Hello, I would like to take advantage of the Annual Gold Promo (1599 DH)",
    highlighted: true,
    badge: "Best Offer",
  },
  {
    name: "Premium Promo (1 Year)",
    price: "1699",
    daily: 4.6,
    valueLine: "The ultimate pack for maximum results.",
    features: [
      { text: "Full Gym & Cardio access", inherited: false },
      { text: "1 Year Cardio option included", inherited: false },
      { text: "1x Shaker + 1x Protein Bar", inherited: false },
      { text: "1x Free Sports Towel included", inherited: false },
    ],
    cta: "Choose Premium 1 Year",
    whatsappMessage: "Hello, I would like to take advantage of the Annual Premium Promo (1699 DH)",
    highlighted: false,
    badge: null,
  },
]

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
      { threshold: 0.05, rootMargin: "0px 0px -60px 0px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, visible }
}

export function PricingSection() {
  const [duration, setDuration] = useState<"semestriel" | "annuel">("annuel")
  const currentPlans = duration === "semestriel" ? semestrielPlans : annuelPlans
  const { ref: sectionRef, visible } = useScrollReveal()

  return (
    <section
      ref={sectionRef}
      id="pricing"
      style={{
        backgroundColor: "#080808",
        paddingTop: "clamp(5rem, 10vw, 8.75rem)",
        paddingBottom: "clamp(5rem, 10vw, 8.75rem)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="eyebrow mx-auto">
            <span className="h-[5px] w-[5px] rounded-full" style={{ background: "var(--gradient-primary-135)" }} />
            Memberships & Pricing
          </span>

          <h2
            className="mt-7 font-display font-extrabold leading-[1.02] tracking-[-0.045em] text-white text-balance"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}
          >
            Our Promotional{" "}
            <span className="text-gradient">Plans.</span>
          </h2>
          <p className="mt-5 text-[14px]" style={{ color: "rgba(255,255,255,0.45)" }}>
            Exclusive offers valid for both men and women.
          </p>

          {/* Trust pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
            {trustItems.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-medium"
                style={{
                  border: "1px solid rgba(255,255,255,0.05)",
                  background: "rgba(255,255,255,0.018)",
                  color: "rgba(255,255,255,0.40)",
                }}
              >
                <Check className="h-3 w-3" style={{ color: "#A020F0" }} strokeWidth={3} />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Duration Toggle */}
        <div className="mb-16 flex justify-center">
          <div
            className="grid w-full max-w-[360px] grid-cols-2 gap-1 rounded-xl p-1"
            style={{
              background: "rgba(255,255,255,0.018)",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <button
              onClick={() => setDuration("semestriel")}
              className={cn(
                "rounded-lg py-2.5 text-[11px] font-bold uppercase tracking-wider transition-all duration-200",
                duration === "semestriel"
                  ? "text-white shadow-lg bg-[#0e0e0e]"
                  : "text-white/30 hover:text-white/55"
              )}
              style={duration === "semestriel" ? { border: "1px solid rgba(144,0,232,0.22)" } : {}}
            >
              6 Months
            </button>
            <button
              onClick={() => setDuration("annuel")}
              className={cn(
                "rounded-lg py-2.5 text-[11px] font-bold uppercase tracking-wider transition-all duration-200",
                duration === "annuel"
                  ? "text-white shadow-lg bg-[#0e0e0e]"
                  : "text-white/30 hover:text-white/55"
              )}
              style={duration === "annuel" ? { border: "1px solid rgba(144,0,232,0.22)" } : {}}
            >
              1 Year
            </button>
          </div>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-3">
          {currentPlans.map((plan, idx) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{
                ...(plan.highlighted
                  ? {
                      background: "#0e0e0e",
                      border: "1px solid rgba(144,0,232,0.22)",
                    }
                  : {
                      background: "#0a0a0a",
                      border: "1px solid rgba(255,255,255,0.035)",
                    }),
                transitionDelay: `${idx * 100}ms`,
              }}
              onMouseEnter={(e) => {
                if (!plan.highlighted) {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(144,0,232,0.14)"
                }
              }}
              onMouseLeave={(e) => {
                if (!plan.highlighted) {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.035)"
                }
              }}
            >
              {/* Badge */}
              {plan.badge && (
                <span
                  className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  <Zap className="h-2.5 w-2.5 fill-current" strokeWidth={0} />
                  {plan.badge}
                </span>
              )}

              <div className="flex flex-1 flex-col p-8 sm:p-9">
                {/* Plan name */}
                <div>
                  <h3
                    className="font-display text-[1.125rem] font-bold tracking-tight"
                    style={{ color: "rgba(255,255,255,0.88)" }}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className="mt-1.5 text-[13px]"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    {plan.valueLine}
                  </p>
                </div>

                {/* Pricing */}
                <div
                  className="mt-8 pb-8"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.045)" }}
                >
                  <div className="flex items-baseline gap-1.5">
                    <span
                      className="text-[13px] font-medium"
                      style={{ color: "rgba(255,255,255,0.30)" }}
                    >
                      DH
                    </span>
                    <span
                      className="font-display text-[3.5rem] font-extrabold leading-none tracking-[-0.04em]"
                      style={
                        plan.highlighted
                          ? { color: "#A020F0" }
                          : { color: "rgba(255,255,255,0.92)" }
                      }
                    >
                      {plan.price}
                    </span>
                    <span
                      className="text-[13px]"
                      style={{ color: "rgba(255,255,255,0.30)" }}
                    >
                      {duration === "semestriel" ? "/ 6 mos" : "/ yr"}
                    </span>
                  </div>
                  <p
                    className="mt-2 text-[12px]"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                  >
                    ≈ DH {plan.daily} / day
                  </p>
                </div>

                {/* Features */}
                <ul className="mt-8 flex flex-1 flex-col gap-3.5">
                  {plan.features.map((feature) => (
                    <li key={feature.text} className="flex items-start gap-3">
                      <span
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                        style={
                          plan.highlighted
                            ? {
                                background: "var(--gradient-primary-135)",
                                color: "#ffffff",
                              }
                            : {
                                background: "rgba(144,0,232,0.10)",
                                color: "#A020F0",
                              }
                        }
                      >
                        <Check className="h-2.5 w-2.5" strokeWidth={3} />
                      </span>
                      <span className="text-[13px] leading-[1.65] text-white/60">
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(plan.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "mt-9 inline-flex w-full items-center justify-center gap-2 rounded-xl py-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition-all duration-200 focus-visible:outline focus-visible:outline-2 hover:-translate-y-0.5 min-h-[52px]",
                    plan.highlighted ? "btn-primary" : "btn-ghost"
                  )}
                >
                  {plan.cta}
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p
          className="mt-12 text-center text-[12px] tracking-wide"
          style={{ color: "rgba(255,255,255,0.30)" }}
        >
          <span className="inline-flex items-center gap-2.5">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--gradient-primary-135)" }}
            />
            Spots are limited — join now to secure your promotional offer.
          </span>
        </p>
      </div>
    </section>
  )
}
