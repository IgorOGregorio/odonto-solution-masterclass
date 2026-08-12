import { siteConfig } from "@/content/site";

export function getWhatsAppUrl(message?: string): string {
  const text = encodeURIComponent(message ?? siteConfig.whatsapp.message);
  return `https://wa.me/${siteConfig.whatsapp.phone}?text=${text}`;
}
