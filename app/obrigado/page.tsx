import type { Metadata } from "next";

import { Logo } from "@/components/brand/logo";
import { ConversionEvents } from "@/components/tracking/conversion-events";

export const metadata: Metadata = {
  title: "Obrigado — Masterclass Odonto Solution",
  description: "Você entrou para a lista de prioridade da Masterclass Odonto Solution.",
};

export default function ObrigadoPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-8 bg-brand-cream px-6 py-24 text-center">
      <ConversionEvents />
      <Logo className="h-24 w-24" />

      <div className="flex max-w-lg flex-col gap-4">
        <h1 className="font-serif text-3xl font-semibold leading-tight text-brand-terracotta sm:text-4xl">
          🎉 Obrigado pelo seu interesse!
        </h1>
        <p className="font-sans text-base leading-relaxed text-brand-ink/80 sm:text-lg">
          Você entrou para nossa lista de prioridade. Em breve nossa equipe
          entrará em contato pelo WhatsApp com todas as informações sobre a
          Masterclass, condições especiais de lançamento e possíveis bônus
          exclusivos para os primeiros inscritos.
        </p>
      </div>
    </main>
  );
}
