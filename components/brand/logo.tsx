import Image from "next/image";

interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
}

// Source files are 4134x4134 squares with generous built-in padding around
// the compact mark, so 240x240 keeps the wordmark legible without cropping.
const SOURCE_BY_VARIANT = {
  light: "/brand/logo.png",
  dark: "/brand/logo-dark.png",
} as const;

export function Logo({ variant = "light", className }: LogoProps) {
  return (
    <Image
      src={SOURCE_BY_VARIANT[variant]}
      alt="Odonto Solution"
      width={240}
      height={240}
      className={className}
      priority
    />
  );
}
