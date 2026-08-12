import { siteConfig } from "@/content/site";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { SchedulingButton } from "@/components/ui/scheduling-button";

export function Cta() {
  return (
    <section className="bg-hero py-20 text-white sm:py-28">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-label text-primary">Agendamento</p>
        <h2 className="mt-3 font-display text-3xl sm:text-4xl">
          Pronto para cuidar do seu sorriso?
        </h2>
        <p className="mt-4 text-lg text-white/70">
          Agende online ou entre em contato pelo WhatsApp na{" "}
          {siteConfig.name}. Estamos no bairro {siteConfig.address.neighborhood},{" "}
          {siteConfig.address.city}.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <SchedulingButton className="rounded-full px-10" />
          <WhatsAppButton
            variant="outline"
            className="rounded-full border-white/30 bg-transparent px-10 text-white hover:bg-white/10 hover:text-white"
          />
        </div>
        <p className="mt-4 text-sm text-white/50">
          {siteConfig.whatsapp.display} · {siteConfig.hours.full}
        </p>
      </div>
    </section>
  );
}
