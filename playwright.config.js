// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',

  /* OAuth flows should not run fully parallel */
  fullyParallel: false,

  forbidOnly: !!process.env.CI,

  /* Fail fast – no retries for auth */
  retries: 0,

  /* Deterministic CI */
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['allure-playwright']
  ],

  use: {
    browserName: 'chromium',
    headless: true,

    /* 📸 Screenshot for EVERY test (pass + fail) */
    screenshot: 'on',

    /* 🎥 Video ONLY when test fails */
    video: 'retain-on-failure',

    /* Traces only when retrying (kept minimal) */
    trace: 'on-first-retry',

    actionTimeout: 15_000,
    navigationTimeout: 30_000,
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],

  outputDir: 'test-results',
});
