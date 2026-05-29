import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { StatsSection } from "@/components/stats-section";
import { GamesSection } from "@/components/games-section";
import { TriviumSection } from "@/components/trivium-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { CtaSection } from "@/components/cta-section";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0b1222]">
      <SiteHeader />
      <Hero />
      <StatsSection />
      <GamesSection />
      <TriviumSection />
      <TestimonialsSection />
      <CtaSection />
      <SiteFooter />
    </div>
  );
}
