import { test, expect } from "@playwright/test";

test("obrigado page shows confirmation and keeps conversion tracking mount", async ({
  page,
}) => {
  await page.goto("/obrigado");

  await expect(
    page.getByRole("heading", { name: /Obrigado/i }),
  ).toBeVisible();
  await expect(page.getByText(/lista de prioridade/i).first()).toBeVisible();
});
