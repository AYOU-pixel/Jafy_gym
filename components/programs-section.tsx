"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Dumbbell, Heart, Users, ArrowUpRight } from "lucide-react";
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

function useScrollReveal() {
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
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
          paddingTop: "clamp(5rem, 10vw, 8.75rem)",
          paddingBottom: "clamp(5rem, 10vw, 8.75rem)",
        }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Section header */}
          <div className="mb-16 flex flex-col gap-10 sm:mb-20 sm:flex-row sm:items-end sm:justify-between lg:mb-24">
            <div className="max-w-xl">
              <span className="eyebrow">
                <span className="h-[5px] w-[5px] rounded-full" style={{ background: "var(--gradient-primary-135)" }} />
                Programs
              </span>
              <h2
                className="mt-7 font-display font-extrabold leading-[1.02] tracking-[-0.045em] text-white text-balance"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
              >
                Designed for every{" "}
                <span className="text-gradient">athlete</span>.
              </h2>
            </div>

            {/* Program index — desktop */}
            <div className="hidden items-end gap-10 sm:flex lg:pb-1">
              {programs.map((p) => (
                <button
                  key={p.title}
                  onClick={() => openModal(p)}
                  className="group flex flex-col items-center gap-2"
                  style={{ background: "none", border: "none", cursor: "pointer" }}
                >
                  <span
                    className="text-[10px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 group-hover:text-white/25"
                    style={{ color: "rgba(255,255,255,0.10)" }}
                  >
                    {p.number}
                  </span>
                  <span
                    className="block h-[1px] w-6 transition-all duration-300 group-hover:w-8 group-hover:opacity-25"
                    style={{ background: "rgba(255,255,255,0.08)" }}
                  />
                  <span
                    className="whitespace-nowrap text-[10px] font-medium tracking-wide transition-colors duration-300 group-hover:text-white/25"
                    style={{ color: "rgba(255,255,255,0.12)" }}
                  >
                    {p.title.split(" ")[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-5">
            {/* Featured Card */}
            <article
              onClick={() => openModal(featured)}
              onKeyDown={(e) => handleKeyDown(e, featured)}
              role="button"
              tabIndex={0}
              aria-label={`Open ${featured.title} details`}
              className={cn(
                "group relative cursor-pointer overflow-hidden rounded-2xl md:col-span-2 lg:col-span-3 transition-all duration-700",
                sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{
                minHeight: "clamp(420px, 50vw, 580px)",
                border: "1px solid rgba(255,255,255,0.04)",
                transition: "border-color 0.4s ease, opacity 0.7s ease, transform 0.7s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(144,0,232,0.16)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.04)";
              }}
            >
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 100vw, 60vw"
                priority
              />

              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to top, #050505 0%, rgba(5,5,5,0.48) 48%, rgba(5,5,5,0.04) 100%)",
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: "radial-gradient(ellipse at 0% 0%, rgba(144,0,232,0.07) 0%, transparent 50%)",
                }}
              />

              {/* Ghost number */}
              <span
                className="absolute left-8 top-8 font-display text-[5rem] font-extrabold leading-none select-none lg:text-[6.5rem]"
                style={{ color: "rgba(255,255,255,0.03)", letterSpacing: "-0.05em" }}
              >
                {featured.number}
              </span>

              {/* Tag badge */}
              {featured.tag && (
                <span
                  className="absolute right-7 top-7 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  {featured.tag}
                </span>
              )}

              {/* Bottom content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10 md:p-12">
                <div className="mb-3 flex items-center gap-2.5">
                  <span
                    className="h-px w-4"
                    style={{ background: "var(--gradient-primary)" }}
                  />
                  <span
                    className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                    style={{ color: "#A020F0" }}
                  >
                    {featured.accentLabel}
                  </span>
                </div>

                <h3
                  className="font-display font-extrabold tracking-tight text-white"
                  style={{ fontSize: "clamp(1.875rem, 3vw, 2.75rem)", letterSpacing: "-0.04em" }}
                >
                  {featured.title}
                </h3>

                <p
                  className="mt-4 max-w-sm text-[14px] leading-[1.75]"
                  style={{ color: "rgba(255,255,255,0.42)" }}
                >
                  {featured.description}
                </p>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                  <span className="btn-primary text-[10px]">
                    {featured.cta}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>

                  <div className="flex gap-1.5">
                    {featured.images.map((_, i) => (
                      <span
                        key={i}
                        className="rounded-full transition-all duration-300"
                        style={
                          i === 0
                            ? {
                                width: "1.375rem",
                                height: "2px",
                                background: "var(--gradient-primary)",
                              }
                            : {
                                width: "0.375rem",
                                height: "2px",
                                background: "rgba(255,255,255,0.10)",
                              }
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
            </article>

            {/* Secondary Cards */}
            <div className="grid grid-cols-1 gap-5 md:col-span-2 lg:col-span-2">
              {secondary.map((p, idx) => (
                <article
                  key={p.title}
                  onClick={() => openModal(p)}
                  onKeyDown={(e) => handleKeyDown(e, p)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Open ${p.title} details`}
                  className={cn(
                    "group relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-700",
                    sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  )}
                  style={{
                    minHeight: "clamp(240px, 22vw, 280px)",
                    border: "1px solid rgba(255,255,255,0.03)",
                    transitionDelay: `${(idx + 1) * 150}ms`,
                    transition: "border-color 0.4s ease, opacity 0.7s ease, transform 0.7s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(144,0,232,0.14)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.03)";
                  }}
                >
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 40vw"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(to top, #050505 0%, rgba(5,5,5,0.45) 55%, transparent 100%)",
                    }}
                  />

                  <span
                    className="absolute left-6 top-6 font-display text-[4rem] font-extrabold leading-none select-none sm:text-[4.5rem]"
                    style={{ color: "rgba(255,255,255,0.028)", letterSpacing: "-0.05em" }}
                  >
                    {p.number}
                  </span>

                  <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-8">
                    <div className="mb-2.5 flex items-center gap-2">
                      <span className="h-px w-3" style={{ background: "var(--gradient-primary)" }} />
                      <span
                        className="text-[10px] font-semibold uppercase tracking-[0.18em]"
                        style={{ color: "#E8264E" }}
                      >
                        {p.accentLabel}
                      </span>
                    </div>

                    <h3
                      className="font-display font-bold tracking-tight text-white"
                      style={{ fontSize: "clamp(1.125rem, 2vw, 1.5rem)", letterSpacing: "-0.04em" }}
                    >
                      {p.title}
                    </h3>

                    <p
                      className="mt-2 line-clamp-2 text-[13px] leading-[1.7]"
                      style={{ color: "rgba(255,255,255,0.38)" }}
                    >
                      {p.description}
                    </p>

                    <span className="btn-text mt-5 text-[10px]">
                      {p.cta}
                      <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </div>
                </article>
              ))}
            </div>
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