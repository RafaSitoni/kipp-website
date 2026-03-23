import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ResultsCarousel } from "@/components/results-carousel"
import { FoundersSection } from "@/components/founders-section"
import { CTABanner } from "@/components/cta-banner"
import { PlansComparison } from "@/components/plans-comparison"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ResultsCarousel />
      <FoundersSection />
      <CTABanner />
      <PlansComparison />
      <ContactSection />
      <Footer />
    </main>
  )
}
