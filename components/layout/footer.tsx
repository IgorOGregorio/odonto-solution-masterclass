import Image from "next/image";
import { siteConfig } from "@/content/site";
import { InstagramIcon, TikTokIcon } from "@/components/icons/social";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const { address, professional, social, whatsapp } = siteConfig;

  return (
    <footer className="bg-hero text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-4">
            <Image
              src={siteConfig.logo}
              alt={siteConfig.name}
              width={694}
              height={694}
              className="h-16 w-auto"
            />
            <p className="text-sm text-white/70">{siteConfig.tagline}</p>
            <div className="flex gap-3">
              <a
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex size-10 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-primary hover:bg-primary/20"
              >
                <InstagramIcon className="size-4" />
              </a>
              <a
                href={social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="flex size-10 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-primary hover:bg-primary/20"
              >
                <TikTokIcon className="size-4" />
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-label text-white/50">Contato</h3>
            <p className="text-sm text-white/80">{address.full}</p>
            <a
              href={`tel:+${whatsapp.phone}`}
              className="block text-sm text-primary transition-colors hover:text-gold-light"
            >
              {whatsapp.display}
            </a>
            <p className="text-sm text-white/60">{siteConfig.hours.full}</p>
          </div>

          <div className="space-y-3">
            <h3 className="text-label text-white/50">Responsável técnica</h3>
            <p className="font-display text-lg">{professional.name}</p>
            <p className="text-sm text-white/70">
              {professional.credentials.join(" · ")}
            </p>
          </div>
        </div>

        <Separator className="my-8 bg-white/10" />

        <p className="text-center text-xs text-white/40">
          © {new Date().getFullYear()} {siteConfig.name}. CNPJ{" "}
          {siteConfig.cnpj}
        </p>
      </div>
    </footer>
  );
}
