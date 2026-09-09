import {test,expect} from '@playwright/test';


test('smoke test',async({page})=>{
    await page.goto('/');
    await page.getByRole('link', { name: 'Membres', exact: true }).click();
    await expect(page).toHaveURL(/\/members$/);
    await expect(page.getByRole('heading', { name: 'Membres' })).toBeVisible();
    await page.getByRole('link', { name: 'Clubs', exact: true }).click();
    await expect(page).toHaveURL(/\/clubs$/);
    await expect(page.getByRole('heading', { name: 'Clubs' })).toBeVisible();


})