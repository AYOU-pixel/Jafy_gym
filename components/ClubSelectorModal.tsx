"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { X, MessageCircle, ArrowRight, Check, MapPin } from "lucide-react";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import { WHATSAPP_NUMBER } from "@/lib/constants";

const clubs = [
  {
    name: "Club 1 — Hey Chems, Salé",
    image: "/s1.jpg",
    features: [
      "Premium US equipment",
      "Women-only zone available",
      "Open 7 days a week",
    ],
    whatsappMessage: "Hi, I want to join Layayda Club 1 (Hey Chems)",
  },
  {
    name: "Club 2 — Hay Chemaou, Salé",
    image: "/s2.jpg",
    features: [
      "Modern cardio & strength area",
      "Dedicated women's fitness room",
      "Early morning to late night access",
    ],
    whatsappMessage: "Hi, I'm interested in Layayda Club 2 (Chemaou) membership",
  },
];

interface ClubSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ClubSelectorModal({ isOpen, onClose }: ClubSelectorModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useScrollLock(isOpen);

  useEffect(() => {
    if (isOpen) setTimeout(() => closeBtnRef.current?.focus(), 50);
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) onClose();
    },
    [onClose]
  );

  if (!isOpen) return null;

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 pb-10 pt-20 backdrop-blur-md animate-in fade-in duration-200"
      style={{ background: "rgba(0,0,0,0.88)" }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-4xl overflow-hidden rounded-2xl shadow-2xl animate-in zoom-in-95 fade-in duration-300"
        style={{
          background: "#0a0a0a",
          border: "1px solid rgba(161,0,255,0.18)",
          boxShadow: "0 0 80px rgba(161,0,255,0.12), 0 40px 80px rgba(0,0,0,0.6)",
        }}
      >
        {/* Close button */}
        <button
          ref={closeBtnRef}
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full text-white transition-all duration-200 hover:bg-white/[0.12] hover:text-[#A100FF]"
          style={{ background: "rgba(255,255,255,0.06)" }}
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <div className="px-8 pb-12 pt-12 text-center sm:px-12 sm:pb-14 sm:pt-14">
          <h2 className="font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            Choose your nearest club
          </h2>
          <p className="mt-4 text-[15px] text-white/50 max-w-md mx-auto leading-relaxed">
            Select a location and start your membership instantly
          </p>
          <div
            className="mt-6 inline-flex items-center gap-2.5 rounded-full px-5 py-2 text-[11px] font-semibold uppercase tracking-wider"
            style={{
              background: "rgba(161,0,255,0.08)",
              border: "1px solid rgba(161,0,255,0.2)",
              color: "#A100FF",
            }}
          >
            <span
              className="h-2 w-2 animate-pulse rounded-full"
              style={{ backgroundColor: "#A100FF" }}
            />
            Limited spots available this month
          </div>
        </div>

        {/* Club cards */}
        <div className="px-8 pb-12 sm:px-12 sm:pb-14">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {clubs.map((club, idx) => (
              <div
                key={club.name}
                className="group flex flex-col overflow-hidden rounded-xl transition-all duration-300"
                style={{
                  border: "1px solid rgba(161,0,255,0.1)",
                  background: "rgba(255,255,255,0.02)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(161,0,255,0.35)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(161,0,255,0.03)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(161,0,255,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(161,0,255,0.1)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden" style={{ background: "#111111" }}>
                  <Image
                    src={club.image}
                    alt={club.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 384px"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(to top, #0a0a0a 0%, transparent 60%)",
                    }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: idx === 0
                        ? "linear-gradient(135deg, rgba(161,0,255,0.06) 0%, transparent 60%)"
                        : "linear-gradient(135deg, rgba(255,45,85,0.05) 0%, transparent 60%)",
                    }}
                  />

                  {/* Location badge */}
                  <div
                    className="absolute left-5 top-5 flex items-center gap-2 rounded-full px-3.5 py-1.5"
                    style={{
                      background: "rgba(7,7,7,0.75)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(161,0,255,0.18)",
                    }}
                  >
                    <MapPin
                      className="h-3.5 w-3.5"
                      style={{ color: idx === 0 ? "#A100FF" : "#FF2D55" }}
                    />
                    <span className="text-xs font-semibold text-white">Layayda, Salé</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-display text-lg font-bold text-white">{club.name}</h3>
                  <ul className="mt-5 flex flex-1 flex-col gap-3">
                    {club.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3">
                        <span
                          className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md"
                          style={{
                            background: "rgba(161,0,255,0.1)",
                            color: "#A100FF",
                          }}
                        >
                          <Check className="h-3.5 w-3.5" strokeWidth={3} />
                        </span>
                        <span className="text-[13px] leading-relaxed text-white/60">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(club.whatsappMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-7 flex w-full items-center justify-center gap-3 rounded-lg px-6 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all duration-200"
                    style={{
                      background: "linear-gradient(90deg, #A100FF, #FF2D55)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "scale(1.02)";
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        "0 0 32px rgba(161,0,255,0.4), 0 0 60px rgba(255,45,85,0.15)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }}
                  >
                    <MessageCircle className="h-4 w-4" />
                    Join this club
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}