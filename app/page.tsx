import { HeroSection } from "@/components/landing/heroSection"
import { FeatureCards } from "@/components/landing/featureCards"
import { TypingPreview } from "@/components/landing/typingPreview"
import { Footer } from "@/components/landing/footer"

export default function LandingPage() {
  return (
    <main className="overflow-x-hidden">
      <HeroSection />
      <FeatureCards />
      <TypingPreview />
      <Footer />
    </main>
  )
}
