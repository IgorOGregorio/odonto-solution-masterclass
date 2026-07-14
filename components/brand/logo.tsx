import Image from "next/image";

interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
}

// Cropped assets are ~1200×619 (wordmark lockup, transparent background).
const SOURCE_BY_VARIANT = {
  light: "/brand/logo.png",
  dark: "/brand/logo-dark.png",
} as const;

export function Logo({ variant = "light", className }: LogoProps) {
  return (
    <Image
      src={SOURCE_BY_VARIANT[variant]}
      alt="Odonto Solution"
      width={1200}
      height={619}
      className={className}
      priority
    />
  );
}
