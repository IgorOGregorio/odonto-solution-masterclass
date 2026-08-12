import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/content/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type WhatsAppButtonProps = {
  variant?: "default" | "outline" | "fab";
  className?: string;
  label?: string;
};

export function WhatsAppButton({
  variant = "default",
  className,
  label,
}: WhatsAppButtonProps) {
  const text = label ?? siteConfig.whatsapp.ctaLabel;

  if (variant === "fab") {
    return (
      <a
        href={getWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={text}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 hover:shadow-xl",
          className
        )}
      >
        <MessageCircle className="size-7 fill-white" />
      </a>
    );
  }

  return (
    <Button
      asChild
      variant={variant === "outline" ? "outline" : "default"}
      size="lg"
      className={cn(
        variant === "default" &&
          "bg-primary text-primary-foreground hover:bg-primary/90",
        className
      )}
    >
      <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
        <MessageCircle className="size-4" />
        {text}
      </a>
    </Button>
  );
}
