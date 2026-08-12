import Image from "next/image";
import { siteConfig } from "@/content/site";

export function Gallery() {
  return (
    <section id="resultados" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-label text-primary">Resultados</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl">
            Transformações reais
          </h2>
          <p className="mt-4 text-muted-foreground">
            Casos clínicos e procedimentos realizados pela nossa equipe.
            Acompanhe mais no{" "}
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Instagram
            </a>
            .
          </p>
        </div>

        <div className="mt-14 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {siteConfig.gallery.map((item) => (
            <figure
              key={item.src}
              className="mb-4 break-inside-avoid overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm"
            >
              <div className="relative">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={600}
                  height={800}
                  className="w-full object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              {item.caption && (
                <figcaption className="px-4 py-3 text-sm text-muted-foreground">
                  {item.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
