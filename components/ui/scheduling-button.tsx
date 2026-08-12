import { CalendarDays } from "lucide-react";
import { siteConfig } from "@/content/site";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SchedulingButtonProps = {
  variant?: "default" | "outline";
  className?: string;
  label?: string;
  href?: string;
};

export function SchedulingButton({
  variant = "default",
  className,
  label,
  href,
}: SchedulingButtonProps) {
  const text = label ?? siteConfig.scheduling.ctaLabel;
  const link = href ?? siteConfig.scheduling.url;

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
      <a href={link} target="_blank" rel="noopener noreferrer">
        <CalendarDays className="size-4" />
        {text}
      </a>
    </Button>
  );
}
