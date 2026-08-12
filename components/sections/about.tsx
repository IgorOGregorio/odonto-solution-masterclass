import Image from "next/image";
import { siteConfig } from "@/content/site";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";

export function About() {
  return (
    <section id="sobre" className="bg-muted/40 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            <div className="relative aspect-square max-w-md overflow-hidden rounded-2xl border border-border bg-hero shadow-xl lg:max-w-none">
              <Image
                src={siteConfig.logo}
                alt={siteConfig.name}
                width={694}
                height={694}
                className="size-full object-contain p-10"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 hidden aspect-[3/4] w-40 overflow-hidden rounded-xl border-4 border-background shadow-lg sm:block lg:-right-8 lg:w-48">
              <Image
                src={siteConfig.heroImage}
                alt={siteConfig.professional.name}
                width={192}
                height={256}
                className="size-full object-cover object-top"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-label text-primary">A clínica</p>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl">
                Excelência em odontologia em Itajubá
              </h2>
            </div>

            <p className="text-lg leading-relaxed text-muted-foreground">
              {siteConfig.tagline}. Na {siteConfig.name}, oferecemos um
              atendimento humanizado e personalizado, com tecnologia de ponta e
              profissionais qualificados para cuidar da saúde bucal de toda a
              família.
            </p>

            <p className="leading-relaxed text-muted-foreground">
              Sob a responsabilidade técnica da{" "}
              <strong className="text-foreground">
                {siteConfig.professional.name}
              </strong>{" "}
              ({siteConfig.professional.credentials.join(" · ")}), nossa equipe
              está preparada para atender desde consultas de rotina até
              procedimentos estéticos e reabilitadores.
            </p>

            <WhatsAppButton className="rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
