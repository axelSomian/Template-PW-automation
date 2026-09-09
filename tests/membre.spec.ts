import {test,expect} from '@playwright/test';


test.beforeEach(async({page})=>{
    await page.goto('/members');
    await expect (page).toHaveURL(/\/members$/)
})



test('have members list',async({page})=>{
   const memberLinks = page.locator('a[href^="/members/"]');
   await expect(memberLinks.first()).toBeVisible();
    expect(await memberLinks.count()).toBeGreaterThan(0);
  
})

test('search for a member',async({page})=>{
   const memberLinks = page.locator('a[href^="/members/"]');
   const search = page.getByPlaceholder(/rechercher un membre/i);
   await expect(search).toBeVisible();
   await search.fill('Pablo Rims');
   await expect(memberLinks).toHaveCount(1);
   await expect(memberLinks.first()).toContainText('Pablo Rims');

})

test('le filtre de niveau ne montre que le niveau choisi', async ({ page }) => {
  const memberLinks = page.locator('a[href^="/members/"]');
  await expect(memberLinks.first()).toBeVisible();          // liste chargée

  await page.getByRole('button', { name: 'Débutant', exact: true }).click();

   await expect(memberLinks).not.toHaveCount(0);

  // et aucun ne porte un autre niveau
  await expect(
    page.locator('a[href^="/members/"] .row-level-label').filter({ hasNotText: 'Débutant' })
  ).toHaveCount(0);
});
