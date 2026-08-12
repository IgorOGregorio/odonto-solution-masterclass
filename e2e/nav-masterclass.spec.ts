import { test, expect } from "@playwright/test";

test("landing nav includes Masterclass link to /masterclass", async ({
  page,
}) => {
  await page.goto("/");

  const link = page.getByRole("link", { name: "Masterclass" });
  await expect(link).toBeVisible();
  await expect(link).toHaveAttribute("href", "/masterclass");
});
