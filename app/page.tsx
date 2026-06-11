import { Suspense } from "react"
import { SiteNavbar } from "@/components/site-navbar"
import { HeroSection } from "@/components/hero-section"
import { ProgramsSection } from "@/components/programs-section"
import { AboutSection } from "@/components/about-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { PricingSection } from "@/components/pricing-section"
import { FinalCta } from "@/components/final-cta"
import { SiteFooter } from "@/components/site-footer"

function SectionSkeleton({ className }: { className?: string }) {
  return (
    <section
      className={`animate-pulse ${className}`}
      style={{ backgroundColor: "#080808" }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
        <div className="h-8 w-32 rounded bg-white/5 mb-8" />
        <div className="h-12 w-3/4 rounded bg-white/5 mb-6" />
        <div className="h-4 w-1/2 rounded bg-white/5" />
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <>
      <SiteNavbar />
      <HeroSection />
      <ProgramsSection />
      <AboutSection />
      <Suspense fallback={<SectionSkeleton />}>
        <TestimonialsSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <PricingSection />
      </Suspense>
      <FinalCta />
      <SiteFooter />
    </>
  )
}
