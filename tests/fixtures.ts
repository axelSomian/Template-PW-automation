import{test as base} from '@playwright/test';
import { MembersPage } from './pages/memberPage';
import { ClubPage } from './pages/clubPage';

type Fixtures = {
  membersPage: MembersPage;
  clubPage: ClubPage;
};

export const test = base.extend<Fixtures>({
    membersPage: async ({ page }, use) => {
        const membersPage = new MembersPage(page);
        await membersPage.goto();
        await use(membersPage);
    },
    clubPage: async ({ page }, use) => {
        const clubPage = new ClubPage(page);
        await clubPage.goto();
        await use(clubPage);
    }
})

export { expect } from '@playwright/test';