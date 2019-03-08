import { element, by, ElementFinder } from 'protractor';

export class EmployeeComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-employee div table .btn-danger'));
    title = element.all(by.css('jhi-employee div h2#page-heading span')).first();

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

export class EmployeeUpdatePage {
    pageTitle = element(by.id('jhi-employee-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    employeeIdInput = element(by.id('field_employeeId'));
    employeeNameInput = element(by.id('field_employeeName'));
    photoInput = element(by.id('field_photo'));
    emailInput = element(by.id('field_email'));
    passwordInput = element(by.id('field_password'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setEmployeeIdInput(employeeId) {
        await this.employeeIdInput.sendKeys(employeeId);
    }

    async getEmployeeIdInput() {
        return this.employeeIdInput.getAttribute('value');
    }

    async setEmployeeNameInput(employeeName) {
        await this.employeeNameInput.sendKeys(employeeName);
    }

    async getEmployeeNameInput() {
        return this.employeeNameInput.getAttribute('value');
    }

    async setPhotoInput(photo) {
        await this.photoInput.sendKeys(photo);
    }

    async getPhotoInput() {
        return this.photoInput.getAttribute('value');
    }

    async setEmailInput(email) {
        await this.emailInput.sendKeys(email);
    }

    async getEmailInput() {
        return this.emailInput.getAttribute('value');
    }

    async setPasswordInput(password) {
        await this.passwordInput.sendKeys(password);
    }

    async getPasswordInput() {
        return this.passwordInput.getAttribute('value');
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

export class EmployeeDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-employee-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-employee'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
