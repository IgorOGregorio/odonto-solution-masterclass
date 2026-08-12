import { describe, expect, it } from "vitest";

import { siteConfig } from "@/content/site";

describe("siteConfig.nav", () => {
  it("includes Masterclass pointing to /masterclass", () => {
    expect(siteConfig.nav).toContainEqual({
      label: "Masterclass",
      href: "/masterclass",
    });
  });
});
