import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

export default defineConfig({
  // Dossier où Playwright cherche les fichiers *.spec.ts
  testDir: './tests',

  // Échoue si un test.only traîne dans le code commité
  forbidOnly: !!process.env.CI,

  // Réessaie 2 fois en CI, 0 fois en local
  retries: process.env.CI ? 2 : 0,

  // Rapport HTML consultable après le run
  reporter: 'html',

  use: {
    // baseURL : permet d'écrire page.goto('/login') au lieu de l'URL complète
    baseURL: process.env.ATC_BASE_URL,

    // Enregistre une trace rejouable au 1er échec (timeline + DOM + réseau)
    trace: 'on-first-retry',
  },

  // Un seul navigateur pour commencer ; on en ajoutera d'autres plus tard
  projects: [
    // 1. Tourne en premier. Ne matche QUE les fichiers *.setup.ts
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },

    // 2. Les vrais tests. Démarrent connectés grâce à storageState.
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
  ],
});
