/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MovementComponentsPage, MovementDeleteDialog, MovementUpdatePage } from './movement.page-object';

const expect = chai.expect;

describe('Movement e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let movementUpdatePage: MovementUpdatePage;
    let movementComponentsPage: MovementComponentsPage;
    /*let movementDeleteDialog: MovementDeleteDialog;*/

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Movements', async () => {
        await navBarPage.goToEntity('movement');
        movementComponentsPage = new MovementComponentsPage();
        expect(await movementComponentsPage.getTitle()).to.eq('Movements');
    });

    it('should load create Movement page', async () => {
        await movementComponentsPage.clickOnCreateButton();
        movementUpdatePage = new MovementUpdatePage();
        expect(await movementUpdatePage.getPageTitle()).to.eq('Create or edit a Movement');
        await movementUpdatePage.cancel();
    });

    /* it('should create and save Movements', async () => {
        const nbButtonsBeforeCreate = await movementComponentsPage.countDeleteButtons();

        await movementComponentsPage.clickOnCreateButton();
        await promise.all([
            movementUpdatePage.setLocationInput('location'),
            movementUpdatePage.typeSelectLastOption(),
            movementUpdatePage.setTimeStampInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            movementUpdatePage.visitorSelectLastOption(),
        ]);
        expect(await movementUpdatePage.getLocationInput()).to.eq('location');
        expect(await movementUpdatePage.getTimeStampInput()).to.contain('2001-01-01T02:30');
        await movementUpdatePage.save();
        expect(await movementUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await movementComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });*/

    /* it('should delete last Movement', async () => {
        const nbButtonsBeforeDelete = await movementComponentsPage.countDeleteButtons();
        await movementComponentsPage.clickOnLastDeleteButton();

        movementDeleteDialog = new MovementDeleteDialog();
        expect(await movementDeleteDialog.getDialogTitle())
            .to.eq('Are you sure you want to delete this Movement?');
        await movementDeleteDialog.clickOnConfirmButton();

        expect(await movementComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
