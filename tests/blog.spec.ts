import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("https://www.cristiano.dev/");

  await expect(page).toHaveTitle(/Cristiano/);
});

test("open about", async ({ page }) => {
  await page.goto("https://www.cristiano.dev/");

  await page.getByRole("link", { name: "Sobre" }).click();

  await page.waitForLoadState("networkidle");
  await expect(
    page.getByRole("heading", { name: "Eu sou o Cristiano Gonçalves" }),
  ).toBeVisible();
});

test("download curriculo", async ({ context }) => {
  const page = await context.newPage();
  await page.goto("https://www.cristiano.dev/about");

  const [newPage] = await Promise.all([
    context.waitForEvent("page"),

    page.getByRole("link", { name: "Download Resumo" }).click(),
  ]);

  await expect(newPage).toHaveTitle(/Curriculo - Front - Cristiano/);
});

test("open post list and open post", async ({ page }) => {
  await page.goto("https://www.cristiano.dev/");
  await page.getByRole("link", { name: "Blog" }).click();

  await page.getByRole("heading", { name: "Entendendo Variáveis CSS" }).click();

  await page.waitForLoadState("load");

  await expect(
    page.getByText(/Atualmente as aplicações web tem se /),
  ).toBeVisible();
});

test("comment block load on post", async ({ page }) => {
  await page.goto(
    "https://www.cristiano.dev/blog/2022-07-21-entendendo-variaveis-css",
  );

  await page.waitForLoadState("networkidle");

  await expect(
    page
      .frameLocator('iframe[title="Comments"]')
      .getByRole("heading", { name: "comentários" }),
  ).toBeVisible();

  await expect(
    page
      .frameLocator('iframe[title="Comments"]')
      .getByRole("heading", { name: "reações" }),
  ).toBeVisible();
});
