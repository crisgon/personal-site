import { test, expect } from '@playwright/test';

test('Back to top button should appear on scroll and scroll to top on click', async ({ page }) => {
    // Go to a blog post page (assuming there is at least one post)
    // We can use the blog list page first to find a link, or just go to a known route if possible.
    // For stability, let's go to the blog list page which we know exists.
    await page.goto('https://www.cristiano.dev//blog');

    // The button should not be visible initially
    const backToTopButton = page.getByLabel('Voltar ao topo');
    await expect(backToTopButton).toBeHidden();

    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 500));

    // The button should be visible now
    await expect(backToTopButton).toBeVisible();

    // Click the button
    await backToTopButton.click();

    // Wait for scroll to finish (smooth scroll takes time)
    // We can check if window.scrollY becomes 0
    await expect.poll(() => page.evaluate(() => window.scrollY), {
        timeout: 3000,
    }).toBe(0);

    // The button should be hidden again
    await expect(backToTopButton).toBeHidden();
});
