import Image from "next/image";
import { siteConfig } from "@/content/site";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function ServiceMedia({
  image,
  video,
  title,
}: {
  image: string | null;
  video: string | null;
  title: string;
}) {
  if (video && !image) {
    return (
      <div className="relative aspect-[4/5] overflow-hidden bg-hero">
        <video
          src={video}
          autoPlay
          muted
          loop
          playsInline
          className="size-full object-cover"
          aria-label={title}
        />
      </div>
    );
  }

  if (image) {
    return (
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
        {video && (
          <video
            src={video}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden
          />
        )}
      </div>
    );
  }

  return null;
}

export function Services() {
  return (
    <section id="servicos" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-label text-primary">Nossos serviços</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl">
            Cuidado completo para o seu sorriso
          </h2>
          <p className="mt-4 text-muted-foreground">
            Especialidades em destaque no nosso Instagram — do preventivo ao
            estético avançado.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.highlights.map((service) => (
            <Card
              key={service.title}
              className="group overflow-hidden border-border/60 p-0 shadow-sm transition-shadow hover:shadow-md"
            >
              <ServiceMedia
                image={service.image}
                video={service.video}
                title={service.title}
              />
              <CardHeader className="gap-3 pt-5 pb-6">
                <div className="flex items-center justify-between gap-2">
                  <CardTitle className="font-display text-xl">
                    {service.title}
                  </CardTitle>
                  {service.video && (
                    <Badge variant="secondary" className="text-xs">
                      Reel
                    </Badge>
                  )}
                </div>
                <CardDescription className="text-sm leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
