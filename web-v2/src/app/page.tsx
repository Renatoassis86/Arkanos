import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { StatsSection } from "@/components/stats-section";
import { QuemSomosSection } from "@/components/quem-somos-section";
import { AudienceSection } from "@/components/audience-section";
import { TriviumSection } from "@/components/trivium-section";
import { GamesSection } from "@/components/games-section";
import { ProgramacaoSection } from "@/components/programacao-section";
import { FeatureRow } from "@/components/feature-row";
import { ClubeDoLivroSection } from "@/components/clube-do-livro-section";
import { UniversoSection } from "@/components/universo-section";
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
    <div className="min-h-screen overflow-x-hidden bg-[#eaf2ff] text-slate-800">
      <SiteHeader authed={!!user} />

      {/* 1. Institucional / Hero */}
      <Hero authed={!!user} />
      {/* 2. Credibilidade */}
      <StatsSection />
      {/* 3. Quem somos / Manifesto */}
      <QuemSomosSection />
      {/* 4. Para Escolas × Para Famílias */}
      <AudienceSection />
      {/* 5. As 7 Artes Liberais */}
      <TriviumSection />
      {/* 6. Jogos / Programas */}
      <GamesSection authed={!!user} />
      {/* 7. Programação (nova linguagem) */}
      <ProgramacaoSection />

      {/* 8. Gamificação com propósito */}
      <FeatureRow
        eyebrow="Engajamento com propósito"
        color="#f59e0b"
        bg="bg-[#fffbeb]"
        title="Aprender de forma divertida e formativa"
        body="A gamificação da Arkanos serve à formação da virtude, não ao vício: cada conquista (Arks, orbes, medalhas e títulos) aponta para a Verdade, a Bondade e a Beleza."
        imageSrc="/img/fotos/gamificacao-familia-xp.png"
        photoCard
        alt="Família comemorando conquistas na plataforma Arkanos"
        bullets={[
          { strong: "Coleção e níveis", text: "orbes, medalhas e títulos celebram cada avanço." },
          { strong: "Crônica do Guardião", text: "curiosidade e reforço do conteúdo a cada questão." },
          { strong: "Ofensivas e missões", text: "constância diária que forja o hábito de estudar." },
          { strong: "Virtude, não vício", text: "o jogo a serviço do bem e do pensamento claro." },
        ]}
      />

      {/* 9. Clube do Livro */}
      <ClubeDoLivroSection />
      {/* 10. Universo Arkanos (guardiões animados) */}
      <UniversoSection />

      {/* 11. Consultoria / Relatórios em tempo real */}
      <FeatureRow
        eyebrow="Escola e Família · Tempo Real"
        color="#3b82f6"
        bg="bg-[#eef4ff]"
        title="Dados e relatórios em tempo real"
        body="Acompanhe o progresso de cada estudante e turma com evidências de aprendizagem, para que a escola e a família enxerguem o mesmo caminho e ajam no tempo certo."
        imageSrc="/img/fotos/consultoria-executiva.png"
        photoCard
        alt="Consultora da Arkanos apresentando relatórios de aprendizagem"
        reverse
        bullets={[
          { strong: "Pontuação por TRI", text: "mede a habilidade real, não só a quantidade de acertos." },
          { strong: "Por aluno e por turma", text: "progresso individual e coletivo, sempre atualizado." },
          { strong: "Intervenção rápida", text: "identifique lacunas e aja antes que virem defasagem." },
          { strong: "Consultoria dedicada", text: "acompanhamento à luz das 7 Artes, com propósito formativo." },
        ]}
        cta={{ label: "Pedir demonstração", href: "/signup" }}
      />

      {/* 12. Depoimentos */}
      <TestimonialsSection />
      {/* 13. CTA */}
      <CtaSection authed={!!user} />
      {/* 14. Contato / Footer */}
      <SiteFooter />
    </div>
  );
}
