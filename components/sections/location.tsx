import { MapPin, Navigation } from "lucide-react";
import { siteConfig } from "@/content/site";
import { Button } from "@/components/ui/button";

export function Location() {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${siteConfig.address.mapsQuery}`;
  const embedUrl = `https://maps.google.com/maps?q=${siteConfig.address.mapsQuery}&hl=pt-BR&z=16&output=embed`;

  return (
    <section id="localizacao" className="bg-muted/40 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-6">
            <div>
              <p className="text-label text-primary">Localização</p>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl">
                Venha nos visitar
              </h2>
            </div>

            <div className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-sm">
              <div className="flex gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-primary" />
                <div>
                  <p className="font-medium">{siteConfig.address.street}</p>
                  <p className="text-muted-foreground">
                    {siteConfig.address.neighborhood} — {siteConfig.address.city}{" "}
                    - {siteConfig.address.state}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    CEP {siteConfig.address.cep}
                  </p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                {siteConfig.hours.full}
              </p>

              <Button asChild className="w-full rounded-full sm:w-auto">
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                  <Navigation className="size-4" />
                  Como chegar
                </a>
              </Button>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
            <iframe
              src={embedUrl}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização Odonto Solution no Google Maps"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
