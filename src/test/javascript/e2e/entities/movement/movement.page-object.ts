import { element, by, ElementFinder } from 'protractor';

export class MovementComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-movement div table .btn-danger'));
    title = element.all(by.css('jhi-movement div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getText();
    }
}

export class MovementUpdatePage {
    pageTitle = element(by.id('jhi-movement-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    locationInput = element(by.id('field_location'));
    typeSelect = element(by.id('field_type'));
    timeStampInput = element(by.id('field_timeStamp'));
    visitorSelect = element(by.id('field_visitor'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setLocationInput(location) {
        await this.locationInput.sendKeys(location);
    }

    async getLocationInput() {
        return this.locationInput.getAttribute('value');
    }

    async setTypeSelect(type) {
        await this.typeSelect.sendKeys(type);
    }

    async getTypeSelect() {
        return this.typeSelect.element(by.css('option:checked')).getText();
    }

    async typeSelectLastOption() {
        await this.typeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setTimeStampInput(timeStamp) {
        await this.timeStampInput.sendKeys(timeStamp);
    }

    async getTimeStampInput() {
        return this.timeStampInput.getAttribute('value');
    }

    async visitorSelectLastOption() {
        await this.visitorSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async visitorSelectOption(option) {
        await this.visitorSelect.sendKeys(option);
    }

    getVisitorSelect(): ElementFinder {
        return this.visitorSelect;
    }

    async getVisitorSelectedOption() {
        return this.visitorSelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class MovementDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-movement-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-movement'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
