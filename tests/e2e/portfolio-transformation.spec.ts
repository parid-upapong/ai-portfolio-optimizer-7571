import { test, expect } from '@playwright/test';

test.describe('Portfolio Transformation Flow', () => {
  test('should allow a creator to enhance a project narrative using AI', async ({ page }) => {
    // 1. Navigate to Dashboard
    await page.goto('/dashboard');
    await expect(page).toHaveTitle(/Dashboard/);

    // 2. Select a Project
    await page.click('text="Project: Mobile Banking App"');
    
    // 3. Trigger Narrative Engineering
    const narrativeTextarea = page.locator('textarea[name="project-description"]');
    const initialText = await narrativeTextarea.inputValue();
    
    await page.click('button:has-text("AI Enhance Narrative")');
    
    // 4. Wait for AI processing state
    await expect(page.locator('text="Analyzing Impact..."')).toBeVisible();
    
    // 5. Verify Content Update
    // AI should transform "I built a UI" into a strategic story
    await expect(narrativeTextarea).not.toHaveValue(initialText, { timeout: 10000 });
    const enhancedText = await narrativeTextarea.inputValue();
    expect(enhancedText.toLowerCase()).toContain('impact');
    
    // 6. Save and Preview
    await page.click('button:has-text("Save Changes")');
    await page.click('text="View Public Portfolio"');
    
    const publicDescription = page.locator('.portfolio-content p');
    await expect(publicDescription).toContainText(enhancedText);
  });

  test('should display market alignment insights', async ({ page }) => {
    await page.goto('/analytics/market-fit');
    await expect(page.locator('canvas')).toBeVisible(); // Chart.js or similar
    await expect(page.locator('text="Skill Gap Analysis"')).toBeVisible();
  });
});