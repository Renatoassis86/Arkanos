import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { StatsSection } from "@/components/stats-section";
import { GamesSection } from "@/components/games-section";
import { TriviumSection } from "@/components/trivium-section";
import { AudienceSection } from "@/components/audience-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { CtaSection } from "@/components/cta-section";
import { SiteFooter } from "@/components/site-footer";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-[#0b1222]">
      <SiteHeader authed={!!user} />
      <Hero />
      <StatsSection />
      <GamesSection />
      <TriviumSection />
      <AudienceSection />
      <TestimonialsSection />
      <CtaSection />
      <SiteFooter />
    </div>
  );
}
