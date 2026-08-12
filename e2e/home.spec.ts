import { test, expect } from "@playwright/test";

test("home does not redirect to masterclass and shows clinic brand", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page).not.toHaveURL(/\/masterclass/);
  await expect(page.getByText("Odonto Solution").first()).toBeVisible();
});
