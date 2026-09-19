import {test, expect} from './fixtures';

test('have clubs list',async({clubPage})=>{
    const clubcards =  clubPage.clubcards;
    await expect(clubcards.first()).toBeVisible();
    await expect(clubcards).not.toHaveCount(0)
})

test('search for a club',async({clubPage})=>{
   await expect(clubPage.searchInput).toBeVisible();
   await clubPage.searchClub('sol béni');
  await expect( clubPage.clubLinks).toHaveCount(1);
   await expect( clubPage.clubLinks.first()).toContainText('Sol Béni');})