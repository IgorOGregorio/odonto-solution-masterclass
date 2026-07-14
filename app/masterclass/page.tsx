import type { Metadata } from "next";

import { Logo } from "@/components/brand/logo";
import { InterestForm } from "@/components/form/interest-form";

const introText =
  "Parabéns pelo interesse! Preencha este formulário para entrar na lista de prioridade. Assim que as inscrições forem abertas, nossa equipe entrará em contato com todas as informações sobre valores, formas de pagamento, datas e bônus exclusivos.";

export const metadata: Metadata = {
  title: "Lista de Interesse — Masterclass Odonto Solution",
  description: introText,
};

export default function MasterclassPage() {
  return (
    <main className="flex flex-1 flex-col items-center bg-brand-cream px-4 py-10 sm:px-6 sm:py-16">
      <div className="flex w-full max-w-xl flex-col items-center gap-8">
        <Logo className="h-20 w-20" />

        <div className="flex flex-col gap-4 text-center">
          <h1 className="font-serif text-2xl font-semibold leading-tight text-brand-terracotta sm:text-3xl">
            🚀 Lista de Interesse – Masterclass em Toxina Botulínica na
            Odontologia e Preenchimento Facial Avançado
          </h1>
          <p className="font-sans text-base leading-relaxed text-brand-ink/80">
            {introText}
          </p>
        </div>

        <InterestForm />
      </div>
    </main>
  );
}
