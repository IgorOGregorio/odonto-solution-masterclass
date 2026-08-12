import { Clock, Award } from "lucide-react";
import { siteConfig } from "@/content/site";
import { InstagramIcon, TikTokIcon } from "@/components/icons/social";

export function TrustBar() {
  return (
    <section className="border-y border-border bg-muted/50">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-3 sm:px-6 lg:px-8">
        <div className="flex items-start gap-3">
          <Clock className="mt-0.5 size-5 shrink-0 text-primary" />
          <div>
            <p className="text-label text-muted-foreground">Horário</p>
            <p className="text-sm font-medium">{siteConfig.hours.weekdays}</p>
            <p className="text-sm text-muted-foreground">
              {siteConfig.hours.saturday}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Award className="mt-0.5 size-5 shrink-0 text-primary" />
          <div>
            <p className="text-label text-muted-foreground">
              Responsável técnica
            </p>
            <p className="text-sm font-medium">
              {siteConfig.professional.name}
            </p>
            <p className="text-sm text-muted-foreground">
              {siteConfig.professional.credentials.join(" · ")}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <InstagramIcon className="mt-0.5 size-5 shrink-0 text-primary" />
          <div>
            <p className="text-label text-muted-foreground">Redes sociais</p>
            <div className="mt-1 flex flex-col gap-1">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-primary hover:underline"
              >
                @odonto.solution
              </a>
              <a
                href={siteConfig.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary"
              >
                <TikTokIcon className="size-3.5" />
                TikTok
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
