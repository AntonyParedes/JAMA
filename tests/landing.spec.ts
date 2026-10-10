import { test, expect } from "@playwright/test";
test("catalog, navigation, dialog, partner form and responsive layout", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Comida rica de hoy, más barata y cerca de ti.",
  );
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator(".offer-card")).toHaveCount(3);
  // WebKit defers offscreen images; verify each asset after it enters the viewport.
  for (const image of await page.locator("img").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        image.evaluate(
          (element: HTMLImageElement) =>
            element.complete && element.naturalWidth > 0,
        ),
      )
      .toBe(true);
  }
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page.getByRole("button", { name: "Panadería", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Combo de pan artesanal" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Torta de chocolate" }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: "Todas", exact: true }).click();
  await page
    .getByRole("button", { name: "Ver detalles de Torta de chocolate" })
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("dialog")).toContainText("No está a la venta");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Ver detalles de Torta de chocolate" }),
  ).toBeFocused();
  await page.getByRole("searchbox").fill("inexistente");
  await expect(page.getByText("No encontramos ese antojo.")).toBeVisible();
  await page.getByRole("button", { name: "Ver todos los ejemplos" }).click();
  await page.getByLabel("Nombre del negocio").fill("Negocio de prueba");
  await page.getByLabel("Correo de contacto").fill("invalid");
  await page.getByLabel("Zona de Ayacucho").selectOption("Huamanga");
  await page.getByRole("button", { name: "Validar mis datos" }).click();
  await expect(page.getByRole("status")).toHaveCount(0);
  await page.getByLabel("Correo de contacto").fill("prueba@example.com");
  await page.getByRole("button", { name: "Validar mis datos" }).click();
  await expect(page.getByRole("status")).toContainText("No se enviaron");
  const mobile = page.viewportSize()!.width < 700;
  await expect(
    page.getByRole("navigation", { name: "Navegación móvil" }),
  ).toBeVisible({ visible: mobile });
  expect(errors).toEqual([]);
});
