import { type Page, type Locator, expect } from '@playwright/test';


export class MembersPage {

    readonly page: Page;
    readonly memberLinks: Locator;
    readonly searchInput: Locator;
    readonly levellabels: Locator;

    constructor(page: Page) {
    this.page = page;
    this.memberLinks = page.locator('a[href^="/members/"]');
    this.searchInput = page.getByPlaceholder(/rechercher un membre/i);
    this.levellabels = page.locator('a[href^="/members/"] .row-level-label');
  }


    async goto() {
        await this.page.goto('/members');
        await expect(this.page).toHaveURL(/\/members$/);
        await expect(this.page.getByRole('heading', { name: /membres/i })).toBeVisible();
    }

    async searchMember(name: string) {
    await this.searchInput.fill(name);
    }

    async filterByLevel(level: string) {
        await this.page.getByRole('button', { name: level, exact: true }).click();
    }

    


}
