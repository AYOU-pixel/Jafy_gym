"use client"

import Link from "next/link"
import Image from "next/image"
import { Instagram, Facebook, MapPin, Phone, MessageCircle } from "lucide-react"
import { WHATSAPP_NUMBER } from "@/lib/constants"

const currentYear = 2026

const socialLinks = [
  {
    Icon: Instagram,
    href: "https://www.instagram.com/olympicjafygym/",
    label: "Instagram",
  },
  {
    Icon: Facebook,
    href: "https://www.facebook.com/people/Olympic-Jafy-GYM/100095294122044/",
    label: "Facebook",
  },
]

const exploreLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#programs", label: "Programs" },
  { href: "#pricing", label: "Pricing" },
]

export function SiteFooter() {
  return (
    <footer
      className="text-white"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.04)",
        backgroundColor: "#030303",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:gap-16">

          {/* ── Brand column ──────────────────────────────── */}
          <div className="col-span-2">
            <Link href="#home" className="inline-block">
              <Image
                src="/brand.png"
                alt="Olympic Jafy Gym"
                width={240}
                height={240}
                className="h-auto w-40 sm:w-56 opacity-90"
                sizes="(max-width: 768px) 160px, 224px"
                loading="lazy"
              />
            </Link>

            <p
              className="mt-5 max-w-[22rem] text-[13.5px] leading-[1.8] font-light"
              style={{ color: "rgba(255,255,255,0.38)" }}
            >
              Two premium fitness clubs in Layayda. US equipment, dedicated
              women's zone, and one membership that unlocks both locations.
            </p>

            <div className="mt-6 flex items-center gap-2.5">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-250"
                  style={{
                    border: "1px solid rgba(255,255,255,0.07)",
                    background: "rgba(255,255,255,0.018)",
                    color: "rgba(255,255,255,0.45)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(144,0,232,0.35)";
                    el.style.color = "#A020F0";
                    el.style.background = "rgba(144,0,232,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(255,255,255,0.07)";
                    el.style.color = "rgba(255,255,255,0.45)";
                    el.style.background = "rgba(255,255,255,0.018)";
                  }}
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Explore column ────────────────────────────── */}
          <div>
            <h3
              className="font-display text-[11px] font-bold uppercase tracking-[0.16em]"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              Explore
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {exploreLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[13px] transition-colors duration-200"
                    style={{ color: "rgba(255,255,255,0.40)" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.80)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.40)";
                    }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact column ────────────────────────────── */}
          <div>
            <h3
              className="font-display text-[11px] font-bold uppercase tracking-[0.16em]"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              Visit Us
            </h3>
            <ul className="mt-5 flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin
                  className="mt-0.5 h-3.5 w-3.5 shrink-0"
                  style={{ color: "#9000E8" }}
                />
                <span
                  className="text-[13px] leading-[1.7]"
                  style={{ color: "rgba(255,255,255,0.38)" }}
                >
                  <strong style={{ color: "rgba(255,255,255,0.65)" }}>Club 1:</strong>{" "}
                  Laayayda Hey Chems,
                  <br />
                  across from Halima 2
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin
                  className="mt-0.5 h-3.5 w-3.5 shrink-0"
                  style={{ color: "#E8264E" }}
                />
                <span
                  className="text-[13px] leading-[1.7]"
                  style={{ color: "rgba(255,255,255,0.38)" }}
                >
                  <strong style={{ color: "rgba(255,255,255,0.65)" }}>Club 2:</strong>{" "}
                  Hay Chemaou,
                  <br />
                  next to Alyakad 2 School
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone
                  className="h-3.5 w-3.5 shrink-0"
                  style={{ color: "#9000E8" }}
                />
                <a
                  href={`tel:+212688896895`}
                  className="text-[13px] transition-colors duration-200"
                  style={{ color: "rgba(255,255,255,0.38)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.75)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.38)";
                  }}
                >
                  +212 688896895
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle
                  className="h-3.5 w-3.5 shrink-0"
                  style={{ color: "#9000E8" }}
                />
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] transition-colors duration-200"
                  style={{ color: "rgba(255,255,255,0.38)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.75)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.38)";
                  }}
                >
                  Message on WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ──────────────────────────────────── */}
        <div
          className="mt-14 flex flex-col-reverse items-start justify-between gap-4 pt-7 sm:flex-row sm:items-center"
          style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
        >
          <p
            className="text-[11px] tracking-wide"
            style={{ color: "rgba(255,255,255,0.22)" }}
          >
            © {currentYear} Olympic Jafy Gym. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
