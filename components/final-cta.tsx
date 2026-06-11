"use client"

import { ArrowRight, Star, Users, Clock } from "lucide-react"
import { WHATSAPP_NUMBER } from "@/lib/constants"

const socialProofItems = [
  { icon: Star, label: "5.0 on Google" },
  { icon: Users, label: "500+ members" },
  { icon: Clock, label: "Reply in 5 min" },
]

const whatsappMessage =
  "Hi, I want to join Olympic Jafy Gym. Can you tell me more about membership?"

export function FinalCta() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden py-28 text-white lg:py-40"
      style={{ backgroundColor: "#050505" }}
    >
      {/* Atmospheric glow — central, very dim */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[200px]"
        style={{ background: "rgba(144, 0, 232, 0.04)" }}
      />

      <div className="relative mx-auto max-w-2xl px-6 text-center">

        {/* Eyebrow */}
        <span className="eyebrow">
          <span
            className="h-[5px] w-[5px] rounded-full"
            style={{ background: "var(--gradient-primary-135)" }}
          />
          Two Clubs · One Membership
        </span>

        {/* Headline */}
        <h2
          className="mt-8 font-display font-extrabold leading-[1.0] tracking-[-0.05em] text-white text-balance"
          style={{ fontSize: "clamp(2.75rem, 6vw, 4.5rem)" }}
        >
          Ready to change?
          <br />
          <span className="text-gradient">Let&apos;s go.</span>
        </h2>

        <p
          className="mx-auto mt-8 max-w-md text-[15px] leading-[1.8] font-light"
          style={{ color: "rgba(255,255,255,0.55)" }}
        >
          Join a gym where coaches know your name, members push each other
          forward, and every workout brings you closer to your goals.
        </p>

        {/* Social proof pills */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {socialProofItems.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-medium"
              style={{
                border: "1px solid rgba(255,255,255,0.05)",
                background: "rgba(255,255,255,0.018)",
                color: "rgba(255,255,255,0.50)",
              }}
            >
              <Icon
                className="h-3 w-3"
                strokeWidth={1.75}
                style={{ color: "rgba(255,255,255,0.35)" }}
              />
              {label}
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={`https://api.whatsapp.com/send/?phone=0633535717&text=Hi%2C+I+want+to+join+Olympic+Jafy+Gym.+Can+you+tell+me+more+about+membership%3F&type=phone_number&app_absent=0`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Join Now via WhatsApp
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
          <a
            href="#programs"
            className="btn-text"
          >
            See our programs first
          </a>
        </div>

        {/* Micro-copy */}
        <p
          className="mt-8 text-[11px] tracking-wide"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          No commitment required · We reply within minutes
        </p>
      </div>
    </section>
  )
}
