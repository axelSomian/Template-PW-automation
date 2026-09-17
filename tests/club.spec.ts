import {test,expect} from '@playwright/test';

import { ClubPage } from './pages/clubPage';

let clubPage: ClubPage;
test.beforeEach(async({page})=>{
  clubPage = new ClubPage(page);
    await clubPage.goto();
})

test('have clubs list',async({page})=>{
    const clubcards =  clubPage.clubcards;
    await expect(clubcards.first()).toBeVisible();
    await expect(clubcards).not.toHaveCount(0)
})

test('search for a club',async({page})=>{
   await expect(clubPage.searchInput).toBeVisible();
   await clubPage.searchClub('sol béni');
  await expect( clubPage.clubLinks).toHaveCount(1);
   await expect( clubPage.clubLinks.first()).toContainText('Sol Béni');})