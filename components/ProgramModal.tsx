"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { X, MessageCircle, ArrowRight, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface ProgramModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  images: string[];
  bullets: string[];
  whatsappMessage: string;
}

export function ProgramModal({
  isOpen,
  onClose,
  title,
  images,
  bullets,
  whatsappMessage,
}: ProgramModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useScrollLock(isOpen);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
      setTimeout(() => closeBtnRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    if (isOpen) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, prevImage, nextImage]);

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
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        ref={modalRef}
        className="relative my-auto w-full max-w-lg overflow-hidden rounded-2xl bg-[#0f0f0f] shadow-2xl animate-in zoom-in-95 fade-in duration-300"
      >
        <button
          ref={closeBtnRef}
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative aspect-[16/10] overflow-hidden bg-[#0a0a0a]">
          <Image
            src={images[currentImageIndex]}
            alt={`${title} - Image ${currentImageIndex + 1}`}
            fill
            className="object-cover transition-opacity duration-300"
            sizes="(max-width: 768px) 100vw, 512px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/20 to-transparent" />

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-all hover:bg-black/70"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                aria-label="Next image"
                className="absolute right-4 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-all hover:bg-black/70"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          )}

          <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between gap-4">
            <h3 className="font-display text-2xl font-extrabold leading-tight text-white sm:text-3xl">
              {title}
            </h3>
            {images.length > 1 && (
              <div className="flex shrink-0 items-center gap-1.5 pb-1">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(index);
                    }}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      index === currentImageIndex
                        ? "w-5 bg-primary"
                        : "w-1.5 bg-white/30 hover:bg-white/60"
                    )}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-3 border-b border-white/8 pb-6">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/15">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            </div>
            <p className="text-sm text-white/50">
              <span className="font-semibold text-white/80">We reply in under 5 minutes</span>
              {" "}· Available now on WhatsApp
            </p>
          </div>

          <ul className="mb-8 flex flex-col gap-3.5">
            {bullets.map((bullet, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-primary/20 text-primary">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                <span className="text-sm leading-relaxed text-white/70">{bullet}</span>
              </li>
            ))}
          </ul>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex w-full items-center justify-center gap-2.5 rounded-md bg-primary px-8 py-4 text-sm font-bold uppercase tracking-wider text-[#0a0a0a] transition-all hover:scale-[1.02] hover:shadow-[0_0_32px_rgba(214,255,0,0.4)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
          >
            <MessageCircle className="h-4 w-4" />
            Join via WhatsApp
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>

          <p className="mt-3 text-center text-[11px] text-white/30">
            No commitment required · Cancel anytime
          </p>
        </div>
      </div>
    </div>
  );
}