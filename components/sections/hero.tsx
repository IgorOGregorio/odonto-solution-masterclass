import Image from "next/image";
import { MapPin, Clock } from "lucide-react";
import { siteConfig } from "@/content/site";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { SchedulingButton } from "@/components/ui/scheduling-button";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-screen bg-hero pt-20 text-white md:pt-16">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_oklch(0.55_0.06_65_/_0.15),_transparent_60%)]" />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:py-24">
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-label text-primary">
              {siteConfig.subtitle} · Itajubá-MG
            </p>
            <h1 className="font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
              {siteConfig.name}
            </h1>
            <p className="max-w-lg text-lg text-white/75 sm:text-xl">
              {siteConfig.tagline}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <SchedulingButton className="rounded-full px-8" />
            <WhatsAppButton
              variant="outline"
              className="rounded-full border-white/30 bg-transparent px-8 text-white hover:bg-white/10 hover:text-white"
            />
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <a href="#localizacao">
                <MapPin className="size-4" />
                Ver localização
              </a>
            </Button>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm text-white/70">
            <div className="flex gap-2">
              <Clock className="mt-0.5 size-4 shrink-0 text-primary" />
              <div className="space-y-0.5">
                <p>{siteConfig.hours.weekdays}</p>
                <p>{siteConfig.hours.saturday}</p>
              </div>
            </div>
            <span className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>
                {siteConfig.address.neighborhood}, {siteConfig.address.city}
              </span>
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
            <Image
              src={siteConfig.heroImage}
              alt={siteConfig.professional.name}
              fill
              className="object-cover object-top"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-hero/90 to-transparent p-6">
              <p className="font-display text-xl">{siteConfig.professional.name}</p>
              <p className="text-sm text-white/70">
                {siteConfig.professional.credentials.join(" · ")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
