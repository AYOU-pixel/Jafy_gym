"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, Star, Users, Clock } from "lucide-react"
import { WHATSAPP_NUMBER } from "@/lib/constants"

const socialProofItems = [
  { icon: Star, label: "5.0 on Google" },
  { icon: Users, label: "500+ members" },
  { icon: Clock, label: "Reply in 5 min" },
]

const whatsappMessage =
  "Hi, I want to join Olympic Jafy Gym. Can you tell me more about membership?"

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
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, visible }
}

export function FinalCta() {
  const { ref: sectionRef, visible } = useScrollReveal()

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden"
      style={{
        backgroundColor: "#050505",
        paddingTop: "clamp(6rem, 12vw, 10rem)",
        paddingBottom: "clamp(6rem, 12vw, 10rem)",
      }}
    >
      {/* Atmospheric glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[200px] opacity-50"
        style={{ background: "rgba(144, 0, 232, 0.035)" }}
      />

      <div className="relative mx-auto max-w-2xl px-6 text-center">
        {/* Eyebrow */}
        <span className="eyebrow mx-auto">
          <span className="h-[5px] w-[5px] rounded-full" style={{ background: "var(--gradient-primary-135)" }} />
          Two Clubs · One Membership
        </span>

        {/* Headline */}
        <h2
          className={`mt-8 font-display font-extrabold leading-[0.98] tracking-[-0.05em] text-white text-balance transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}
        >
          Ready to change?
          <br />
          <span className="text-gradient">Let's go.</span>
        </h2>

        <p
          className={`mx-auto mt-8 max-w-md text-[15px] leading-[1.8] font-light transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ color: "rgba(255,255,255,0.50)" }}
        >
          Join a gym where coaches know your name, members push each other
          forward, and every workout brings you closer to your goals.
        </p>

        {/* Social proof pills */}
        <div
          className={`mt-10 flex flex-wrap items-center justify-center gap-2.5 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          {socialProofItems.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-medium"
              style={{
                border: "1px solid rgba(255,255,255,0.05)",
                background: "rgba(255,255,255,0.018)",
                color: "rgba(255,255,255,0.45)",
              }}
            >
              <Icon className="h-3 w-3" strokeWidth={1.75} style={{ color: "rgba(255,255,255,0.35)" }} />
              {label}
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div
          className={`mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary min-h-[52px] px-8"
          >
            Join Now via WhatsApp
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
          <a href="#programs" className="btn-text">
            See our programs first
          </a>
        </div>

        {/* Micro-copy */}
        <p
          className={`mt-10 text-[11px] tracking-wide transition-all duration-700 delay-400 ${visible ? "opacity-100" : "opacity-0"}`}
          style={{ color: "rgba(255,255,255,0.30)" }}
        >
          No commitment required · We reply within minutes
        </p>
      </div>
    </section>
  )
}
