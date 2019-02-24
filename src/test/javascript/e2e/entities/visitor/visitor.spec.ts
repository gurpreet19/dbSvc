/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { VisitorComponentsPage, VisitorDeleteDialog, VisitorUpdatePage } from './visitor.page-object';

const expect = chai.expect;

describe('Visitor e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let visitorUpdatePage: VisitorUpdatePage;
    let visitorComponentsPage: VisitorComponentsPage;
    /*let visitorDeleteDialog: VisitorDeleteDialog;*/

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Visitors', async () => {
        await navBarPage.goToEntity('visitor');
        visitorComponentsPage = new VisitorComponentsPage();
        expect(await visitorComponentsPage.getTitle()).to.eq('Visitors');
    });

    it('should load create Visitor page', async () => {
        await visitorComponentsPage.clickOnCreateButton();
        visitorUpdatePage = new VisitorUpdatePage();
        expect(await visitorUpdatePage.getPageTitle()).to.eq('Create or edit a Visitor');
        await visitorUpdatePage.cancel();
    });

    /* it('should create and save Visitors', async () => {
        const nbButtonsBeforeCreate = await visitorComponentsPage.countDeleteButtons();

        await visitorComponentsPage.clickOnCreateButton();
        await promise.all([
            visitorUpdatePage.setNameInput('name'),
            visitorUpdatePage.setVisitorIdInput('5'),
            visitorUpdatePage.typeSelectLastOption(),
            visitorUpdatePage.setAllowedFromInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            visitorUpdatePage.setAllowedToInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            visitorUpdatePage.setLocationInput('location'),
            visitorUpdatePage.setEmailInput('email'),
            visitorUpdatePage.setPhoneInput('5'),
            visitorUpdatePage.setQrStringInput('qrString'),
            visitorUpdatePage.employeeSelectLastOption(),
        ]);
        expect(await visitorUpdatePage.getNameInput()).to.eq('name');
        expect(await visitorUpdatePage.getVisitorIdInput()).to.eq('5');
        expect(await visitorUpdatePage.getAllowedFromInput()).to.contain('2001-01-01T02:30');
        expect(await visitorUpdatePage.getAllowedToInput()).to.contain('2001-01-01T02:30');
        expect(await visitorUpdatePage.getLocationInput()).to.eq('location');
        expect(await visitorUpdatePage.getEmailInput()).to.eq('email');
        expect(await visitorUpdatePage.getPhoneInput()).to.eq('5');
        const selectedStatus = visitorUpdatePage.getStatusInput();
        if (await selectedStatus.isSelected()) {
            await visitorUpdatePage.getStatusInput().click();
            expect(await visitorUpdatePage.getStatusInput().isSelected()).to.be.false;
        } else {
            await visitorUpdatePage.getStatusInput().click();
            expect(await visitorUpdatePage.getStatusInput().isSelected()).to.be.true;
        }
        expect(await visitorUpdatePage.getQrStringInput()).to.eq('qrString');
        await visitorUpdatePage.save();
        expect(await visitorUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await visitorComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });*/

    /* it('should delete last Visitor', async () => {
        const nbButtonsBeforeDelete = await visitorComponentsPage.countDeleteButtons();
        await visitorComponentsPage.clickOnLastDeleteButton();

        visitorDeleteDialog = new VisitorDeleteDialog();
        expect(await visitorDeleteDialog.getDialogTitle())
            .to.eq('Are you sure you want to delete this Visitor?');
        await visitorDeleteDialog.clickOnConfirmButton();

        expect(await visitorComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
