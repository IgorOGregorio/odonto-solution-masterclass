import { test, expect } from "@playwright/test";

test("masterclass page shows heading and labeled required fields", async ({
  page,
}) => {
  await page.goto("/masterclass");

  await expect(
    page.getByRole("heading", { name: /Masterclass/i }),
  ).toBeVisible();
  await expect(page.getByLabel(/Nome completo/i)).toBeVisible();
});
