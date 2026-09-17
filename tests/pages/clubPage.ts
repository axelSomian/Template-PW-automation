import { type Page,type Locator,expect} from '@playwright/test';


export class ClubPage {
    readonly page: Page;
    readonly clubLinks: Locator
    readonly clubcards: Locator
    readonly searchInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.clubLinks = page.locator('a[href*="/clubs/"]');
        this.clubcards = page.locator('.club-card');
        this.searchInput = page.getByPlaceholder(/Rechercher un club…/);

    }


    async goto() {
        await this.page.goto('/clubs');
        await expect(this.page).toHaveURL(/\/clubs$/);
        await expect(this.page.getByRole('heading', { name: /clubs/i })).toBeVisible();
    }

    async searchClub(name: string) {
        await this.searchInput.fill(name);
    }

}