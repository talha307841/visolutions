import { test, expect } from "@playwright/test";
const routes = [
  "/",
  "/solutions",
  "/solutions/industrial-safety",
  "/solutions/healthcare",
  "/solutions/warehousing",
  "/solutions/retail",
  "/platform",
  "/how-it-works",
  "/demo",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
];
test("every route renders with unique title, one main heading and working assets", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("response", (r) => {
    if (r.status() >= 400 && !r.url().includes("favicon"))
      errors.push(`${r.status()}: ${r.url()}`);
  });
  const titles = new Set();
  for (const route of routes) {
    await page.goto(route);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("main")).toBeVisible();
    titles.add(await page.title());
    expect(
      new URL(
        (await page.locator('link[rel="canonical"]').getAttribute("href"))!,
      ).pathname,
    ).toBe(route);
  }
  expect(titles.size).toBe(routes.length);
  expect(errors).toEqual([]);
});
test("desktop navigation and solution dropdown", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Solutions", exact: true }).click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Industrial safety", exact: true })
    .click();
  await expect(page).toHaveURL(/industrial-safety/);
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Interactive demo", exact: true })
    .click();
  await expect(page).toHaveURL(/demo/);
});
test("warehouse predictions filter, seek and inspect the actual sampled objects", async ({
  page,
}) => {
  await page.goto("/demo");
  await expect(page.locator(".sc-main-head")).toContainText(
    "Warehouse intelligence",
  );
  await page.getByRole("button", { name: "Play video", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Pause video", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Pause video", exact: true }).click();
  await page
    .getByRole("button", { name: "Fullscreen video", exact: true })
    .click();
  await expect
    .poll(() => page.evaluate(() => !!document.fullscreenElement))
    .toBe(true);
  await page.evaluate(() => document.exitFullscreen());
  await expect(
    page.getByText("RECORDED VIDEO · ACTUAL MODEL OUTPUT"),
  ).toBeVisible();
  await page.getByLabel("Seek video").fill("0.3");
  const items = page.locator(".warehouse-object-list button");
  await expect(items.first()).toBeVisible();
  const firstId = await items.first().locator("span").nth(1).innerText();
  await items.first().click();
  await expect(page.locator(".warehouse-inspector")).toContainText(firstId);
  await expect(page.locator(".warehouse-inspector")).toContainText(
    "MODEL SCORE",
  );
  await page
    .getByRole("group", { name: "Filter objects by class" })
    .getByRole("button", { name: /People/ })
    .click();
  await expect(
    page.locator(".warehouse-object-list button strong").first(),
  ).toHaveText("PERSON");
  await page.getByRole("button", { name: /Overlays on/ }).click();
  await expect(page.locator(".warehouse-stage .warehouse-overlay")).toHaveCount(
    0,
  );
  await page.getByLabel("Seek video").fill("2.8");
  await expect(page.locator(".warehouse-sample-time")).toContainText("2.72");
  await expect(page.locator(".warehouse-inspector")).toContainText(
    "Explore an object",
  );
});

test("scripted events occur only at their clip timestamp and concepts stay separate", async ({
  page,
}) => {
  await page.goto("/demo");
  await page.getByRole("button", { name: /Forklift & people/ }).click();
  await expect(page.locator(".sc-event")).toHaveCount(0);
  await expect(
    page.getByText("Play the clip to reveal the example event at 00:03."),
  ).toBeVisible();
  await page
    .locator(".sc-video-frame video")
    .evaluate((v: HTMLVideoElement) => {
      v.currentTime = 4;
    });
  await expect(page.locator(".sc-event")).toContainText(
    "Example shared-zone review",
  );
  await page.getByRole("button", { name: "Acknowledge example" }).click();
  await expect(
    page.getByRole("button", { name: "Acknowledged", exact: true }),
  ).toBeDisabled();
  await page.getByLabel("Filter events").selectOption("open");
  await expect(page.getByText("No events match this filter.")).toBeVisible();
  await page.getByLabel("Filter events").selectOption("reviewed");
  await expect(page.locator(".sc-event")).toBeVisible();
  await page.getByRole("button", { name: /Cash drawer/ }).click();
  await expect(
    page.getByText("Purpose-built footage is not yet available."),
  ).toBeVisible();
  await expect(page.locator(".sc-video-frame video")).toHaveCount(0);
  await expect(page.locator(".sc-inspector")).toContainText(
    "No drawer footage",
  );
});
test("comparison, architecture and FAQ controls", async ({ page }) => {
  await page.goto("/platform");
  await page.getByRole("button", { name: /VISOLUTION Alerts/ }).click();
  await expect(
    page.getByRole("heading", { name: "The next action, made clearer" }),
  ).toBeVisible();
  await page.goto("/how-it-works");
  await page.getByRole("button", { name: /02 \/ CAPTURE/ }).click();
  await expect(page.locator(".pipeline-detail")).toContainText(
    "Capacity depends",
  );
  await page.getByText("Do we need new cameras?", { exact: true }).click();
  await expect(page.getByText(/Not necessarily. We assess/)).toBeVisible();
});
test("mobile menu and layouts at all requested sizes", async ({ page }) => {
  for (const width of [360, 390, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of ["/", "/demo", "/contact", "/platform"]) {
      await page.goto(route);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth,
      );
      expect(overflow, `${route} overflows at ${width}`).toBe(false);
    }
    if (width === 390) {
      await page.getByRole("button", { name: "Open navigation" }).click();
      await page
        .getByRole("navigation")
        .getByRole("link", { name: "About", exact: true })
        .click();
      await expect(page).toHaveURL(/about/);
      await expect(
        page.getByRole("button", { name: "Open navigation" }),
      ).toBeVisible();
    }
  }
});
test("form validates and reports unconfigured delivery honestly", async ({
  page,
}) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: "Discuss my pilot" }).click();
  await expect(page.getByText("Full name is required.")).toBeVisible();
  await page.getByLabel("Full name", { exact: true }).fill("Test Operator");
  await page.getByLabel("Work email").fill("test@example.com");
  await page.getByLabel("Company name").fill("Test Company");
  await page.getByLabel("Job title").fill("Operations Manager");
  await page.getByLabel("City / country").fill("Karachi, Pakistan");
  await page
    .getByLabel("Industry", { exact: true })
    .selectOption("Manufacturing");
  await page
    .getByLabel("Primary operational challenge")
    .fill("Evaluate obstructed exit monitoring.");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Discuss my pilot" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Your inquiry has not been sent.",
  );
});
test("keyboard focus, reduced motion and screenshots", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  const style = await page
    .getByRole("link", { name: "Skip to content" })
    .evaluate((el) => getComputedStyle(el).outlineStyle);
  expect(style).not.toBe("none");
  await page.locator(".hero-v2-visual").waitFor();
  await page.screenshot({
    path: "test-results/home-desktop.png",
    fullPage: true,
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({
    path: "test-results/home-mobile.png",
    fullPage: true,
  });
  await page.goto("/demo");
  await page.screenshot({
    path: "test-results/demo-mobile.png",
    fullPage: true,
  });
});
test("metadata endpoints and missing route", async ({ request }) => {
  for (const path of [
    "/sitemap.xml",
    "/robots.txt",
    "/icon.svg",
    "/opengraph-image",
  ])
    expect((await request.get(path)).ok()).toBeTruthy();
  expect((await request.get("/does-not-exist")).status()).toBe(404);
});

test("mobile scenario selector and playback controls", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/demo");
  await page.getByRole("button", { name: /Protective equipment/ }).click();
  await expect(page.locator(".sc-main-head")).toContainText(
    "Protective equipment",
  );
  await expect(
    page.getByRole("button", { name: "Play video", exact: true }),
  ).toBeVisible();
  await expect(page.getByLabel("Seek video")).toBeVisible();
  await page.getByRole("button", { name: /Waste handling/ }).click();
  await expect(page.locator(".sc-inspector")).toContainText(
    "No suitable waste-handling footage",
  );
});

test("video pages hydrate when a browser extension injects playback controls", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.addInitScript(() => {
    const injected = new WeakSet<Element>();
    const addControls = (root: Node) => {
      if (!(root instanceof Element)) return;
      const videos = [
        ...(root.matches("video") ? [root] : []),
        ...root.querySelectorAll("video"),
      ];
      for (const video of videos) {
        if (injected.has(video) || !video.parentElement?.parentElement)
          continue;
        injected.add(video);
        const panel = document.createElement("div");
        panel.className = "PlayBackRatePanelYPSC";
        panel.style.display = "none";
        video.parentElement.parentElement.insertBefore(
          panel,
          video.parentElement,
        );
      }
    };
    new MutationObserver((records) => {
      for (const record of records)
        for (const node of record.addedNodes) addControls(node);
    }).observe(document, { childList: true, subtree: true });
  });
  await page.goto("/");
  await expect(page.locator(".hero-v2-visual video")).toBeAttached();
  await page.getByRole("link", { name: "Explore interactive demo" }).click();
  await expect(page.locator(".warehouse-stage video")).toBeAttached();
  await page.getByRole("button", { name: /Forklift & people/ }).click();
  await expect(page.locator(".sc-video-frame video")).toBeAttached();
  await page.getByRole("button", { name: /Protective equipment/ }).click();
  await expect(page.locator(".sc-video-frame video")).toBeAttached();
  expect(errors).toEqual([]);
});
