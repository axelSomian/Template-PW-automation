import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page, request }) => {
  // 1. Login via l'API — plus rapide et plus stable que remplir le formulaire
  const res = await request.post('/api/v1/auth/login', {
    data: {
      email: process.env.ATC_USER,
      password: process.env.ATC_PASSWORD,
    },
  });
  expect(res.ok()).toBeTruthy();

  const { accessToken } = await res.json();
  expect(accessToken).toBeTruthy();

  // 2. Placer le token là où l'app le cherche : localStorage.atc_token
  //    Il faut être sur le bon domaine pour écrire dans son localStorage.
  await page.goto('/');
  await page.evaluate((token) => {
    window.localStorage.setItem('atc_token', token);
  }, accessToken);

  // 3. Sauvegarder cookies + localStorage dans un fichier JSON
  await page.context().storageState({ path: authFile });
});
