"use client"

import { useState } from "react"
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

export function PricingSection() {
  const [duration, setDuration] = useState<"semestriel" | "annuel">("annuel")
  const currentPlans = duration === "semestriel" ? semestrielPlans : annuelPlans

  return (
    <section
      id="pricing"
      className="py-24 lg:py-36"
      style={{ backgroundColor: "#080808" }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* ── Section header ─────────────────────────────── */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="eyebrow">
            <span
              className="h-[5px] w-[5px] rounded-full"
              style={{ background: "var(--gradient-primary-135)" }}
            />
            Memberships & Pricing
          </span>

          <h2
            className="mt-6 font-display font-extrabold leading-[1.02] tracking-[-0.045em] text-white text-balance"
            style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.25rem)" }}
          >
            Our Promotional{" "}
            <span className="text-gradient">Plans.</span>
          </h2>
          <p className="mt-4 text-[13px]" style={{ color: "rgba(255,255,255,0.50)" }}>
            Exclusive offers valid for both men and women.
          </p>

          {/* Trust pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {trustItems.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium"
                style={{
                  border: "1px solid rgba(255,255,255,0.05)",
                  background: "rgba(255,255,255,0.018)",
                  color: "rgba(255,255,255,0.38)",
                }}
              >
                <Check
                  className="h-2.5 w-2.5"
                  style={{ color: "#A020F0" }}
                  strokeWidth={3}
                />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* ── Duration Toggle ─────────────────────────────── */}
        <div className="mb-16 flex justify-center">
          <div 
            className="grid w-full max-w-[340px] grid-cols-2 gap-1 rounded-xl p-1"
            style={{
              background: "rgba(255,255,255,0.018)",
              border: "1px solid rgba(255,255,255,0.05)"
            }}
          >
            <button
              onClick={() => setDuration("semestriel")}
              className={cn(
                "rounded-lg py-2 text-[11px] font-bold uppercase tracking-wider transition-all duration-200",
                duration === "semestriel" 
                  ? "text-white shadow-lg bg-[#0e0e0e]" 
                  : "text-white/35 hover:text-white/60"
              )}
              style={duration === "semestriel" ? { border: "1px solid rgba(144,0,232,0.22)" } : {}}
            >
              6 Months
            </button>
            <button
              onClick={() => setDuration("annuel")}
              className={cn(
                "rounded-lg py-2 text-[11px] font-bold uppercase tracking-wider transition-all duration-200",
                duration === "annuel" 
                  ? "text-white shadow-lg bg-[#0e0e0e]" 
                  : "text-white/35 hover:text-white/60"
              )}
              style={duration === "annuel" ? { border: "1px solid rgba(144,0,232,0.22)" } : {}}
            >
              1 Year
            </button>
          </div>
        </div>

        {/* ── Plans grid ─────────────────────────────────── */}
        <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-3">
          {currentPlans.map((plan) => (
            <div
              key={plan.name}
              className="relative flex flex-col rounded-2xl transition-all duration-350"
              style={
                plan.highlighted
                  ? {
                      background: "#0e0e0e",
                      border: "1px solid rgba(144,0,232,0.22)",
                    }
                  : {
                      background: "#0a0a0a",
                      border: "1px solid rgba(255,255,255,0.035)",
                    }
              }
              onMouseEnter={(e) => {
                if (!plan.highlighted) {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(144,0,232,0.14)";
                }
              }}
              onMouseLeave={(e) => {
                if (!plan.highlighted) {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(255,255,255,0.035)";
                }
              }}
            >
              {/* Badge */}
              {plan.badge && (
                <span
                  className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-white"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  <Zap className="h-2.5 w-2.5 fill-current" strokeWidth={0} />
                  {plan.badge}
                </span>
              )}

              <div className="flex flex-1 flex-col p-7 sm:p-8">

                {/* Plan name & tagline */}
                <div>
                  <h3
                    className="font-display text-[1.0625rem] font-bold tracking-tight"
                    style={{ color: "rgba(255,255,255,0.88)" }}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className="mt-1 text-[12.5px]"
                    style={{ color: "rgba(255,255,255,0.50)" }}
                  >
                    {plan.valueLine}
                  </p>
                </div>

                {/* Pricing */}
                <div
                  className="mt-7 pb-7"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.045)" }}
                >
                  <div className="flex items-baseline gap-1.5">
                    <span
                      className="text-[12px] font-medium"
                      style={{ color: "rgba(255,255,255,0.28)" }}
                    >
                      DH
                    </span>
                    <span
                      className="font-display text-[3.25rem] font-extrabold leading-none tracking-[-0.04em]"
                      style={
                        plan.highlighted
                          ? { color: "#A020F0" }
                          : { color: "rgba(255,255,255,0.92)" }
                      }
                    >
                      {plan.price}
                    </span>
                    <span
                      className="text-[12px]"
                      style={{ color: "rgba(255,255,255,0.28)" }}
                    >
                      {duration === "semestriel" ? "/ 6 mos" : "/ yr"}
                    </span>
                  </div>
                  <p
                    className="mt-1.5 text-[11px]"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                  >
                    ≈ DH {plan.daily} / day
                  </p>
                </div>

                {/* Features */}
                <ul className="mt-7 flex flex-1 flex-col gap-3">
                  {plan.features.map((feature) => (
                    <li key={feature.text} className="flex items-start gap-3">
                      <span
                        className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full"
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
                      <span
                        className="text-[13px] leading-[1.65] text-white/65"
                      >
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
                    "mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg py-3.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-all duration-200 focus-visible:outline focus-visible:outline-2 hover:-translate-y-0.5",
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
          className="mt-10 text-center text-[11px] tracking-wide"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          <span className="inline-flex items-center gap-2">
            <span
              className="h-1 w-1 rounded-full"
              style={{ background: "var(--gradient-primary-135)" }}
            />
            Spots are limited — join now to secure your promotional offer.
          </span>
        </p>
      </div>
    </section>
  )
}
