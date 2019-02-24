import { element, by, ElementFinder } from 'protractor';

export class VisitorComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-visitor div table .btn-danger'));
    title = element.all(by.css('jhi-visitor div h2#page-heading span')).first();

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

export class VisitorUpdatePage {
    pageTitle = element(by.id('jhi-visitor-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    visitorIdInput = element(by.id('field_visitorId'));
    typeSelect = element(by.id('field_type'));
    allowedFromInput = element(by.id('field_allowedFrom'));
    allowedToInput = element(by.id('field_allowedTo'));
    locationInput = element(by.id('field_location'));
    emailInput = element(by.id('field_email'));
    phoneInput = element(by.id('field_phone'));
    statusInput = element(by.id('field_status'));
    qrStringInput = element(by.id('field_qrString'));
    employeeSelect = element(by.id('field_employee'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async setVisitorIdInput(visitorId) {
        await this.visitorIdInput.sendKeys(visitorId);
    }

    async getVisitorIdInput() {
        return this.visitorIdInput.getAttribute('value');
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

    async setAllowedFromInput(allowedFrom) {
        await this.allowedFromInput.sendKeys(allowedFrom);
    }

    async getAllowedFromInput() {
        return this.allowedFromInput.getAttribute('value');
    }

    async setAllowedToInput(allowedTo) {
        await this.allowedToInput.sendKeys(allowedTo);
    }

    async getAllowedToInput() {
        return this.allowedToInput.getAttribute('value');
    }

    async setLocationInput(location) {
        await this.locationInput.sendKeys(location);
    }

    async getLocationInput() {
        return this.locationInput.getAttribute('value');
    }

    async setEmailInput(email) {
        await this.emailInput.sendKeys(email);
    }

    async getEmailInput() {
        return this.emailInput.getAttribute('value');
    }

    async setPhoneInput(phone) {
        await this.phoneInput.sendKeys(phone);
    }

    async getPhoneInput() {
        return this.phoneInput.getAttribute('value');
    }

    getStatusInput() {
        return this.statusInput;
    }
    async setQrStringInput(qrString) {
        await this.qrStringInput.sendKeys(qrString);
    }

    async getQrStringInput() {
        return this.qrStringInput.getAttribute('value');
    }

    async employeeSelectLastOption() {
        await this.employeeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async employeeSelectOption(option) {
        await this.employeeSelect.sendKeys(option);
    }

    getEmployeeSelect(): ElementFinder {
        return this.employeeSelect;
    }

    async getEmployeeSelectedOption() {
        return this.employeeSelect.element(by.css('option:checked')).getText();
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

export class VisitorDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-visitor-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-visitor'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
