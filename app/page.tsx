import { Suspense } from "react"
import { SiteNavbar } from "@/components/site-navbar"
import { HeroSection } from "@/components/hero-section"
import { ProgramsSection } from "@/components/programs-section"
import { AboutSection } from "@/components/about-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { PricingSection } from "@/components/pricing-section"
import { FinalCta } from "@/components/final-cta"
import { SiteFooter } from "@/components/site-footer"

function SectionSkeleton() {
  return (
    <section className="animate-pulse bg-[#080808]" style={{ minHeight: "60vh" }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-32 lg:py-40">
        <div className="h-3 w-24 rounded-full bg-white/5 mb-10" />
        <div className="h-14 w-2/3 rounded-lg bg-white/5 mb-8" />
        <div className="h-5 w-1/2 rounded-lg bg-white/5" />
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <>
      <SiteNavbar />
      <main>
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
      </main>
      <SiteFooter />
    </>
  )
}
