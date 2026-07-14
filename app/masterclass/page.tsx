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
    <main className="bg-page-atmosphere relative flex flex-1 flex-col items-center px-4 py-12 sm:px-6 sm:py-20">
      <div className="relative z-10 flex w-full max-w-xl flex-col items-center gap-10">
        <header className="animate-enter flex flex-col items-center gap-7 text-center">
          <Logo className="h-auto w-64 sm:w-80" />

          <div className="flex flex-col items-center gap-4">
            <p className="font-sans text-[0.7rem] font-semibold tracking-[0.22em] text-brand-terracotta uppercase">
              Lista de prioridade
            </p>
            <h1 className="max-w-lg font-serif text-[1.85rem] font-semibold leading-[1.15] text-balance text-brand-ink sm:text-4xl">
              Masterclass em Toxina Botulínica e Preenchimento Facial Avançado
            </h1>
            <p className="max-w-md font-sans text-base leading-relaxed text-brand-muted">
              {introText}
            </p>
          </div>
        </header>

        <div className="animate-enter animate-enter-delay-2 w-full">
          <InterestForm />
        </div>
      </div>
    </main>
  );
}
