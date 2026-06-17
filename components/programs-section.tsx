"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Dumbbell, Heart, Users, ArrowUpRight, Clock, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

const ProgramModal = dynamic(
  () => import("@/components/ProgramModal").then((m) => m.ProgramModal),
  { ssr: false }
);

const programs = [
  {
    icon: Dumbbell,
    number: "01",
    title: "Strength Training",
    tag: "Most Popular",
    description:
      "Build muscle and raw power with professional-grade US equipment, free weights, and personalized coaching.",
    cta: "Start Strength Program",
    image: "/p1.jpg",
    images: ["/p1.jpg", "/p4.jpg", "/p5.jpg"],
    accentLabel: "Power & Muscle",
    bullets: [
      "Gain visible muscle in 6–8 weeks",
      "Personalized coaching included",
      "Access to pro-level US equipment",
    ],
    whatsappMessage: "Hi, I'm interested in the Strength Training program",
    featured: true,
  },
  {
    icon: Heart,
    number: "02",
    title: "Cardio Fitness",
    tag: null,
    description:
      "Burn calories and elevate endurance on premium machines with high-intensity coached sessions.",
    cta: "Join Cardio Plan",
    image: "/p2.jpg",
    images: ["/p2.jpg", "/p7.jpg", "/p6.jpg"],
    accentLabel: "Burn & Endure",
    bullets: [
      "Burn fat faster with guided sessions",
      "Improve stamina in weeks, not months",
      "Modern cardio machines with coaching",
    ],
    whatsappMessage: "Hi, I want to join the Cardio Fitness plan",
    featured: false,
  },
  {
    icon: Users,
    number: "03",
    title: "Women-Only Zone",
    tag: null,
    description:
      "Train comfortably in a dedicated, private fitness room designed exclusively for women.",
    cta: "Try Women's Program",
    image: "/p3.jpg",
    images: ["/p3.jpg", "/p8.jpg", "/p9.jpg"],
    accentLabel: "Private & Safe",
    bullets: [
      "Private and comfortable space",
      "No overcrowding, no waiting",
      "Female-friendly coaching environment",
    ],
    whatsappMessage: "Hi, I'm interested in the Women's Fitness program",
    featured: false,
  },
];

function useScrollReveal(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

export function ProgramsSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<(typeof programs)[0] | null>(null);

  const featured = useMemo(() => programs.find((p) => p.featured)!, []);
  const secondary = useMemo(() => programs.filter((p) => !p.featured), []);

  const { ref: sectionRef, visible: sectionVisible } = useScrollReveal();

  const openModal = useCallback((program: (typeof programs)[0]) => {
    setSelectedProgram(program);
    setModalOpen(true);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, program: (typeof programs)[0]) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(program);
      }
    },
    [openModal]
  );

  return (
    <>
      <section
        id="programs"
        ref={sectionRef}
        className="overflow-hidden"
        style={{
          backgroundColor: "#080808",
          paddingTop: "clamp(5rem, 10vw, 8.5rem)",
          paddingBottom: "clamp(5rem, 10vw, 8.5rem)",
        }}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          {/* Section header — improved hierarchy */}
          <div className="mb-14 sm:mb-16 lg:mb-20 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-lg">
              <span className="eyebrow">
                <span className="h-[5px] w-[5px] rounded-full" style={{ background: "var(--gradient-primary-135)" }} />
                Programs
              </span>
              <h2
                className="mt-6 font-display font-extrabold leading-[1.02] tracking-[-0.04em] text-white text-balance"
                style={{ fontSize: "clamp(1.875rem, 4vw, 3.25rem)" }}
              >
                Designed for every{" "}
                <span className="text-gradient">athlete</span>.
              </h2>
              <p className="mt-4 text-[15px] leading-[1.7] max-w-md" style={{ color: "rgba(255,255,255,0.45)" }}>
                Three specialized programs tailored to your goals. Professional coaching, premium equipment, real results.
              </p>
            </div>

            {/* Program index — desktop */}
            <div className="hidden items-end gap-8 sm:flex lg:pb-1">
              {programs.map((p) => (
                <button
                  key={p.title}
                  onClick={() => openModal(p)}
                  className="group flex flex-col items-center gap-2"
                  style={{ background: "none", border: "none", cursor: "pointer" }}
                >
                  <span
                    className="text-[10px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 group-hover:text-white/30"
                    style={{ color: "rgba(255,255,255,0.12)" }}
                  >
                    {p.number}
                  </span>
                  <span
                    className="block h-[1px] w-5 transition-all duration-300 group-hover:w-7 group-hover:opacity-30"
                    style={{ background: "rgba(255,255,255,0.08)" }}
                  />
                  <span
                    className="whitespace-nowrap text-[10px] font-medium tracking-wide transition-colors duration-300 group-hover:text-white/30"
                    style={{ color: "rgba(255,255,255,0.15)" }}
                  >
                    {p.title.split(" ")[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Cards grid — refined spacing */}
          <div className="grid grid-cols-1 gap-4 md:gap-5 md:grid-cols-2 lg:grid-cols-5">
            {/* Featured Card — enhanced */}
            <article
              onClick={() => openModal(featured)}
              onKeyDown={(e) => handleKeyDown(e, featured)}
              role="button"
              tabIndex={0}
              aria-label={`Open ${featured.title} details`}
              className={cn(
                "group relative cursor-pointer overflow-hidden rounded-2xl md:col-span-2 lg:col-span-3 transition-all duration-700 ease-out",
                sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              )}
              style={{
                minHeight: "clamp(400px, 48vw, 560px)",
                border: "1px solid rgba(255,255,255,0.05)",
                transition: "border-color 0.4s ease, opacity 0.7s ease, transform 0.7s ease, box-shadow 0.4s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(144,0,232,0.20)";
                el.style.boxShadow = "0 24px 64px rgba(0,0,0,0.4), 0 0 48px rgba(144,0,232,0.06)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(255,255,255,0.05)";
                el.style.boxShadow = "none";
              }}
            >
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
                sizes="(max-width: 768px) 100vw, 60vw"
                priority
              />

              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to top, #050505 0%, rgba(5,5,5,0.55) 50%, rgba(5,5,5,0.06) 100%)",
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: "radial-gradient(ellipse at 0% 0%, rgba(144,0,232,0.10) 0%, transparent 50%)",
                }}
              />

              {/* Ghost number */}
              <span
                className="absolute left-7 top-7 font-display text-[5rem] font-extrabold leading-none select-none lg:text-[6rem]"
                style={{ color: "rgba(255,255,255,0.04)", letterSpacing: "-0.05em" }}
              >
                {featured.number}
              </span>

              {/* Tag badge — enhanced */}
              {featured.tag && (
                <span
                  className="absolute right-6 top-6 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white"
                  style={{ 
                    background: "var(--gradient-primary)",
                    boxShadow: "0 4px 16px rgba(144,0,232,0.25)"
                  }}
                >
                  {featured.tag}
                </span>
              )}

              {/* Bottom content — improved spacing */}
              <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-9 md:p-10">
                <div className="mb-3 flex items-center gap-2.5">
                  <span
                    className="h-px w-5"
                    style={{ background: "var(--gradient-primary)" }}
                  />
                  <span
                    className="text-[11px] font-bold uppercase tracking-[0.18em]"
                    style={{ color: "#B04AFF" }}
                  >
                    {featured.accentLabel}
                  </span>
                </div>

                <h3
                  className="font-display font-extrabold tracking-tight text-white"
                  style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", letterSpacing: "-0.04em" }}
                >
                  {featured.title}
                </h3>

                <p
                  className="mt-3 max-w-sm text-[14px] leading-[1.75]"
                  style={{ color: "rgba(255,255,255,0.48)" }}
                >
                  {featured.description}
                </p>

                <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
                  <span className="btn-primary text-[10px] tracking-[0.14em]">
                    {featured.cta}
                    <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </span>

                  <div className="flex gap-1.5">
                    {featured.images.map((_, i) => (
                      <span
                        key={i}
                        className="rounded-full transition-all duration-300"
                        style={
                          i === 0
                            ? {
                                width: "1.5rem",
                                height: "2.5px",
                                background: "var(--gradient-primary)",
                              }
                            : {
                                width: "0.5rem",
                                height: "2.5px",
                                background: "rgba(255,255,255,0.12)",
                              }
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
            </article>

            {/* Secondary Cards — enhanced */}
            <div className="grid grid-cols-1 gap-4 md:gap-5 md:col-span-2 lg:col-span-2">
              {secondary.map((p, idx) => (
                <article
                  key={p.title}
                  onClick={() => openModal(p)}
                  onKeyDown={(e) => handleKeyDown(e, p)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Open ${p.title} details`}
                  className={cn(
                    "group relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-700 ease-out",
                    sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  )}
                  style={{
                    minHeight: "clamp(220px, 20vw, 270px)",
                    border: "1px solid rgba(255,255,255,0.04)",
                    transitionDelay: `${(idx + 1) * 120}ms`,
                    transition: "border-color 0.4s ease, opacity 0.7s ease, transform 0.7s ease, box-shadow 0.4s ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(144,0,232,0.18)";
                    el.style.boxShadow = "0 16px 48px rgba(0,0,0,0.3), 0 0 32px rgba(144,0,232,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(255,255,255,0.04)";
                    el.style.boxShadow = "none";
                  }}
                >
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
                    sizes="(max-width: 768px) 100vw, 40vw"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(to top, #050505 0%, rgba(5,5,5,0.50) 55%, transparent 100%)",
                    }}
                  />

                  <span
                    className="absolute left-6 top-6 font-display text-[3.5rem] font-extrabold leading-none select-none sm:text-[4rem]"
                    style={{ color: "rgba(255,255,255,0.035)", letterSpacing: "-0.05em" }}
                  >
                    {p.number}
                  </span>

                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="h-px w-3" style={{ background: "var(--gradient-primary)" }} />
                      <span
                        className="text-[10px] font-bold uppercase tracking-[0.18em]"
                        style={{ color: "#E8264E" }}
                      >
                        {p.accentLabel}
                      </span>
                    </div>

                    <h3
                      className="font-display font-bold tracking-tight text-white"
                      style={{ fontSize: "clamp(1.125rem, 2vw, 1.375rem)", letterSpacing: "-0.03em" }}
                    >
                      {p.title}
                    </h3>

                    <p
                      className="mt-2 line-clamp-2 text-[13px] leading-[1.7]"
                      style={{ color: "rgba(255,255,255,0.42)" }}
                    >
                      {p.description}
                    </p>

                    <span className="btn-text mt-4 text-[10px] tracking-[0.14em]">
                      {p.cta}
                      <ArrowUpRight className="h-3 w-3" strokeWidth={2} />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* ── Group Classes Schedule ── */}
          <div
            className={`mt-16 sm:mt-20 transition-all duration-700 delay-300 ease-out ${sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            {/* Header */}
            <div className="mb-10 sm:mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="eyebrow">
                  <span className="h-[5px] w-[5px] rounded-full" style={{ background: "var(--gradient-primary-135)" }} />
                  Women-Only · Group Classes
                </span>
                <h3
                  className="mt-5 font-display font-extrabold leading-[1.05] tracking-[-0.035em] text-white"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
                >
                  100% Femme —{" "}
                  <span className="text-gradient">Nos Cours</span>
                </h3>
              </div>
              <p className="max-w-xs text-[14px] leading-[1.75]" style={{ color: "rgba(255,255,255,0.40)" }}>
                Two groups, flexible schedules. One membership covers all group classes.
              </p>
            </div>

            {/* Class icons row — refined */}
            <div className="mb-10 grid grid-cols-3 gap-3 sm:grid-cols-6">
              {[
                {
                  label: "Body Combat",
                  sublabel: "Cardio & Combat",
                  svg: (
                    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6">
                      <circle cx="20" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.75"/>
                      <path d="M20 12v10M14 16l-5 6M26 16l5 6M16 22l-2 8M24 22l2 8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
                      <path d="M9 22l2-2M31 22l-2-2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
                    </svg>
                  ),
                },
                {
                  label: "Zumba",
                  sublabel: "Énergie & Fun",
                  svg: (
                    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6">
                      <circle cx="20" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.75"/>
                      <path d="M20 12v8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
                      <path d="M14 15c0 0 2 4 6 4s6-4 6-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
                      <path d="M15 20l-4 5 3 1M25 20l4 5-3 1" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 30l1-6M24 30l-1-6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
                    </svg>
                  ),
                },
                {
                  label: "Danse Orientale",
                  sublabel: "Grâce & Élégance",
                  svg: (
                    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6">
                      <circle cx="20" cy="8" r="3.5" stroke="currentColor"                      strokeWidth="1.75"/>
                      <path d="M20 12v9" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
                      <path d="M13 17c2 3 4 4 7 4s5-1 7-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
                      <path d="M13 21c-3 2-4 5-2 7M27 21c3 2 4 5 2 7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
                      <path d="M17 30l-1-6M23 30l1-6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
                    </svg>
                  ),
                },
                {
                  label: "Corso Training",
                  sublabel: "Force & Endurance",
                  svg: (
                    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6">
                      <circle cx="20" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.75"/>
                      <path d="M20 12v10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
                      <path d="M12 17h16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
                      <path d="M10 17l-2 2M30 17l2 2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
                      <path d="M15 22l-2 8M25 22l2 8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
                    </svg>
                  ),
                },
                {
                  label: "Body Step",
                  sublabel: "Rythme & Cardio",
                  svg: (
                    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6">
                      <circle cx="20" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.75"/>
                      <path d="M20 12l-3 8h6l-3 8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 25h24" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
                      <path d="M13 25v5M27 25v5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
                    </svg>
                  ),
                },
                {
                  label: "Baton",
                  sublabel: "Discipline & Précision",
                  svg: (
                    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6">
                      <circle cx="20" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.75"/>
                      <path d="M20 12v10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
                      <path d="M8 18l24 6M8 24l24-6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
                      <path d="M16 22l-2 8M24 22l2 8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
                    </svg>
                  ),
                },
              ].map((cls) => (
                <div
                  key={cls.label}
                  className="flex flex-col items-center gap-3 rounded-2xl p-5 transition-all duration-300 ease-out"
                  style={{
                    border: "1px solid rgba(255,255,255,0.04)",
                    background: "rgba(255,255,255,0.015)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(144,0,232,0.20)";
                    el.style.background = "rgba(144,0,232,0.04)";
                    el.style.transform = "translateY(-2px)";
                    el.style.boxShadow = "0 8px 24px rgba(144,0,232,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(255,255,255,0.04)";
                    el.style.background = "rgba(255,255,255,0.015)";
                    el.style.transform = "translateY(0)";
                    el.style.boxShadow = "none";
                  }}
                >
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300"
                    style={{ background: "rgba(144,0,232,0.10)", color: "#B04AFF" }}
                  >
                    {cls.svg}
                  </span>
                  <div className="text-center">
                    <div className="text-[12px] font-semibold text-white/85">{cls.label}</div>
                    <div className="mt-0.5 text-[10px] leading-relaxed" style={{ color: "rgba(255,255,255,0.32)" }}>
                      {cls.sublabel}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Schedule grid — enhanced cards */}
            <div className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2">
              {[
                {
                  group: "Groupe 1",
                  sessions: [
                    { day: "Mardi", time: "18:00 – 19:00" },
                    { day: "Samedi", time: "09:00 – 10:00" },
                  ],
                },
                {
                  group: "Groupe 2",
                  sessions: [
                    { day: "Jeudi", time: "19:30 – 20:30" },
                    { day: "Samedi", time: "10:30 – 11:30" },
                  ],
                },
              ].map((g, gi) => (
                <div
                  key={g.group}
                  className="overflow-hidden rounded-2xl transition-all duration-300"
                  style={{
                    border: "1px solid rgba(144,0,232,0.14)",
                    background: "rgba(144,0,232,0.03)",
                  }}
                >
                  {/* Group header */}
                  <div
                    className="flex items-center gap-3 px-6 py-5 sm:px-7"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                  >
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-[12px] font-bold text-white"
                      style={{ background: "var(--gradient-primary-135)" }}
                    >
                      {gi + 1}
                    </span>
                    <div>
                      <div className="text-[15px] font-bold text-white">{g.group}</div>
                      <div className="text-[11px]" style={{ color: "rgba(255,255,255,0.38)" }}>
                        {g.sessions.length} séances / semaine
                      </div>
                    </div>
                    <div
                      className="ml-auto flex items-center gap-1.5 rounded-full px-3 py-1.5 shrink-0"
                      style={{ background: "rgba(144,0,232,0.10)" }}
                    >
                      <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#9000E8" }} />
                      <span className="text-[10px] font-bold" style={{ color: "#B04AFF" }}>
                        Inscriptions ouvertes
                      </span>
                    </div>
                  </div>

                  {/* Sessions */}
                  <div className="flex flex-col">
                    {g.sessions.map((s, si) => (
                      <div
                        key={s.day}
                        className="flex items-center justify-between px-6 py-4.5 sm:px-7 transition-colors duration-200 hover:bg-white/[0.02]"
                        style={
                          si < g.sessions.length - 1
                            ? { borderBottom: "1px solid rgba(255,255,255,0.04)" }
                            : {}
                        }
                      >
                        <div className="flex items-center gap-3.5">
                          <span
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-[10px] font-bold uppercase tracking-wider"
                            style={{
                              background: "rgba(255,255,255,0.04)",
                              color: "rgba(255,255,255,0.55)",
                            }}
                          >
                            {s.day.slice(0, 3)}
                          </span>
                          <span className="text-[14px] font-medium text-white/80">{s.day}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-3.5 w-3.5" style={{ color: "rgba(255,255,255,0.25)" }} />
                          <span
                            className="font-display text-[15px] font-bold tabular-nums tracking-tight"
                            style={{ color: "#B04AFF" }}
                          >
                            {s.time}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer note */}
            <p
              className="mt-6 text-center text-[12px] leading-relaxed"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              Espace 100% féminin · Réservé aux femmes · Encadrement professionnel · Équipement dédié
            </p>
          </div>
        </div>
      </section>

      {selectedProgram && (
        <ProgramModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={selectedProgram.title}
          images={selectedProgram.images}
          bullets={selectedProgram.bullets}
          whatsappMessage={selectedProgram.whatsappMessage}
        />
      )}
    </>
  );
}