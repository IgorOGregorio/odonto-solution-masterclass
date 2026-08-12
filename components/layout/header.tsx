"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/content/site";
import { SchedulingButton } from "@/components/ui/scheduling-button";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-hero/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6 md:h-16 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Image
            src={siteConfig.logo}
            alt={siteConfig.name}
            width={694}
            height={694}
            className="h-16 w-auto md:h-12"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-white/80 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <SchedulingButton className="rounded-full" />
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
            >
              <Menu className="size-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 gap-0 px-6 py-8">
            <SheetHeader className="p-0">
              <SheetTitle className="pr-10 font-display text-left text-xl">
                {siteConfig.name}
              </SheetTitle>
            </SheetHeader>
            <nav className="mt-8 flex flex-col gap-5">
              {siteConfig.nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-lg text-foreground/80 transition-colors hover:text-primary"
                >
                  {item.label}
                </a>
              ))}
              <SchedulingButton className="mt-2 w-full rounded-full" />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
