import type { Metadata } from "next";
import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { ConversionEvents } from "@/components/tracking/conversion-events";

export const metadata: Metadata = {
  title: "Obrigado — Masterclass Odonto Solution",
  description:
    "Você entrou para a lista de prioridade da Masterclass Odonto Solution.",
};

export default function ObrigadoPage() {
  return (
    <main className="bg-page-atmosphere relative flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <ConversionEvents />

      <div className="relative z-10 flex max-w-lg flex-col items-center gap-9">
        <Logo className="animate-enter h-auto w-64 sm:w-80" />

        <div className="animate-enter animate-enter-delay-1 flex flex-col items-center gap-4">
          <p className="font-sans text-[0.7rem] font-semibold tracking-[0.22em] text-brand-terracotta uppercase">
            Inscrição recebida
          </p>
          <h1 className="font-serif text-3xl font-semibold leading-tight text-balance text-brand-ink sm:text-4xl">
            Obrigado pelo seu interesse
          </h1>
          <p className="font-sans text-base leading-relaxed text-brand-muted sm:text-lg">
            Você entrou para nossa lista de prioridade. Em breve nossa equipe
            entrará em contato pelo WhatsApp com todas as informações sobre a
            Masterclass, condições especiais de lançamento e possíveis bônus
            exclusivos para os primeiros inscritos.
          </p>
        </div>

        <div className="animate-enter animate-enter-delay-2 w-full rounded-2xl border border-brand-ink/8 bg-surface/85 px-6 py-5 shadow-[var(--shadow-soft)] backdrop-blur-sm">
          <p className="font-sans text-sm leading-relaxed text-brand-muted">
            Fique de olho no WhatsApp — a mensagem virá do número oficial da
            Odonto Solution.
          </p>
        </div>

        <Link
          href="/masterclass"
          className="animate-enter animate-enter-delay-3 font-sans text-sm font-medium text-brand-terracotta underline-offset-4 transition-colors duration-200 hover:text-brand-clay hover:underline"
        >
          Voltar ao formulário
        </Link>
      </div>
    </main>
  );
}
