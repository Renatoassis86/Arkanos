import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { StatsSection } from "@/components/stats-section";
import { GamesSection } from "@/components/games-section";
import { TriviumSection } from "@/components/trivium-section";
import { ProgramacaoSection } from "@/components/programacao-section";
import { AudienceSection } from "@/components/audience-section";
import { FeatureRow } from "@/components/feature-row";
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
    <div className="min-h-screen bg-white text-slate-800">
      <SiteHeader authed={!!user} />
      <Hero />
      <StatsSection />
      <GamesSection />
      <TriviumSection />
      <ProgramacaoSection />
      <AudienceSection />

      <FeatureRow
        eyebrow="Escola e Família · Tempo Real"
        color="#3b82f6"
        title="Dados e relatórios em tempo real"
        body="Acompanhe o progresso de cada estudante e turma com evidências de aprendizagem — a escola e a família enxergam o mesmo caminho e agem no tempo certo."
        guardian="aion"
        bullets={[
          { strong: "Pontuação por TRI", text: "mede a habilidade real, não só a quantidade de acertos." },
          { strong: "Por aluno e por turma", text: "progresso individual e coletivo, sempre atualizado." },
          { strong: "Intervenção rápida", text: "identifique lacunas e aja antes que virem defasagem." },
          { strong: "À luz das 7 Artes", text: "do Trivium ao Quadrivium, com propósito formativo." },
        ]}
        cta={{ label: "Pedir demonstração", href: "/signup" }}
      />

      <FeatureRow
        eyebrow="Engajamento com propósito"
        color="#ec4899"
        title="Aprender de forma divertida e formativa"
        body="A gamificação da Arkanos serve à formação da virtude, não ao vício: cada conquista aponta para a Verdade, a Bondade e a Beleza."
        guardian="lyra"
        reverse
        bullets={[
          { strong: "Guardiões que ensinam", text: "Lyra, Aion e Kael narram cada passo da jornada." },
          { strong: "Coleção e níveis", text: "orbes, medalhas e títulos celebram cada avanço." },
          { strong: "Crônica do Guardião", text: "curiosidade e reforço do conteúdo a cada questão." },
          { strong: "Virtude, não vício", text: "o jogo a serviço do bem e do pensamento claro." },
        ]}
      />

      <TestimonialsSection />
      <CtaSection />
      <SiteFooter />
    </div>
  );
}
