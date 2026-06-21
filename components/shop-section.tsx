"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ShoppingBag } from "lucide-react"
import { cn } from "@/lib/utils"

const photos = [
  { id: "01", image: "1.jpg" }, // TODO: "/shop/accessories.jpg"
  { id: "02", image: "2.jpg" }, // TODO: "/shop/bulk.jpg"
  { id: "03", image: "3.jpg" }, // TODO: "/shop/drinks.jpg"
  { id: "04", image: "4.jpg" }, 
  { id: "05", image: "6.jpg" },// TODO: "/shop/caps.jpg" // TODO: "/shop/nutrition.jpg"
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
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, visible }
}

export function ShopSection() {
  const { ref: sectionRef, visible } = useScrollReveal()

  return (
    <section
      ref={sectionRef}
      id="shop"
      className="relative overflow-hidden"
      style={{
        backgroundColor: "#080808",
        paddingTop: "clamp(5rem, 10vw, 8.75rem)",
        paddingBottom: "clamp(5rem, 10vw, 8.75rem)",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-8%] top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full blur-[200px] opacity-50"
        style={{ background: "rgba(144, 0, 232, 0.04)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <div
          className={`mb-16 transition-all duration-700 sm:mb-20 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="eyebrow">
            <span className="h-[5px] w-[5px] rounded-full" style={{ background: "var(--gradient-primary-135)" }} />
            In-Club Shop
          </span>
          <h2
            className="mt-7 font-display font-extrabold leading-[1.02] tracking-[-0.045em] text-white"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
          >
            Everything you need.{" "}
            <span className="text-gradient">Right here.</span>
          </h2>
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {photos.map((photo, idx) => (
            <div
              key={photo.id}
              className={cn(
                "group relative overflow-hidden rounded-2xl transition-all duration-700",
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{
                border: "1px solid rgba(255,255,255,0.04)",
                background: "#0f0f0f",
                transitionDelay: `${idx * 60}ms`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(144,0,232,0.18)"
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.04)"
              }}
            >
              {photo.image ? (
                <Image
                  src={photo.image}
                  alt=""
                  width={800}
                  height={600}
                  className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.04]"
                  sizes="(max-width: 640px) 50vw, 33vw"
                  loading="lazy"
                />
              ) : (
                <div 
                  className="flex items-center justify-center"
                  style={{ aspectRatio: "4/3" }}
                >
                  <ShoppingBag
                    strokeWidth={1.25}
                    style={{ width: "1.75rem", height: "1.75rem", color: "rgba(144,0,232,0.2)" }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}