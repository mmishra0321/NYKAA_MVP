import { test, expect } from "@playwright/test";

test.describe("Confidence-to-Cart happy path", () => {
  test("home badges → bell sidebar → cart → look → confirm", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page.getByText("Saved for you")).toBeVisible();
    const badges = page.locator("[data-fit-source]");
    await expect(badges.first()).toBeVisible();
    await expect(page.locator('[data-fit-source="personal"]').first()).toBeVisible();
    await expect(page.locator('[data-fit-source="crowd"]').first()).toBeVisible();
    await expect(
      page.locator('[data-fit-source="insufficient"]').first(),
    ).toBeVisible();

    await page.getByTestId("bell-button").click();
    await expect(page.getByTestId("notification-sidebar")).toBeVisible();
    await page.getByRole("button", { name: "Back in stock" }).click();
    await expect(page.getByText(/Back in stock/i).first()).toBeVisible();

    await page
      .getByTestId("notification-sidebar")
      .getByRole("button", { name: "Close" })
      .click();
    await expect(page.getByTestId("notification-layer")).toHaveAttribute(
      "data-open",
      "false",
    );

    await page
      .locator("#home-card-aurelia-floral-dress")
      .getByRole("button", { name: "Move to Cart" })
      .click();

    await expect(page.getByRole("heading", { name: "Bag" })).toBeVisible();
    await expect(page.getByText("Size L").first()).toBeVisible();
    await expect(page.getByText("Complete the look", { exact: true })).toBeVisible();

    const lookAdd = page.getByRole("button", { name: /Add ·/i }).first();
    if (await lookAdd.isVisible()) {
      await lookAdd.click();
    }

    await page.getByRole("button", { name: "Proceed" }).click();
    await expect(page.getByText(/fit notes checked/i)).toBeVisible();
    await expect(page.getByText(/coupon|%\s*off|cashback/i)).toHaveCount(0);
  });
});
