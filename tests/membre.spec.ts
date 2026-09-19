import {test, expect} from './fixtures';




test('have members list',async({membersPage})=>{
  
    await expect( membersPage.memberLinks.first()).toBeVisible();
    await expect(membersPage.memberLinks).not.toHaveCount(0)
  
})

test('search for a member',async({membersPage})=>{

   await expect(membersPage.searchInput).toBeVisible();
   await membersPage.searchMember('Pablo Rims');
  await expect( membersPage.memberLinks).toHaveCount(1);
   await expect( membersPage.memberLinks.first()).toContainText('Pablo Rims');

})

test('le filtre de niveau ne montre que le niveau choisi', async ({ membersPage }) => {
  await expect(membersPage.memberLinks.first()).toBeVisible();          // liste chargée
  await membersPage.filterByLevel('Débutant');
  await expect( membersPage.memberLinks).not.toHaveCount(0);

  // et aucun ne porte un autre niveau
  await expect(
    membersPage.levellabels.filter({ hasNotText: 'Débutant' })
  ).toHaveCount(0);
});
