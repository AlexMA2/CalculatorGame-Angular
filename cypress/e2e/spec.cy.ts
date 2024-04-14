import { subtract } from 'cypress/types/lodash';

describe('Home Page', () => {
    it('Random button set a random name and active the start button', () => {
        cy.visit('/');
        cy.get('[data-test="random-name-button"]').click();
        cy.get('input[name="nick"]').invoke('val').should('not.be.empty');
        cy.get('[data-test="start-button"]').should('not.be.disabled');
        cy.get('[data-test="start-button"]').trigger('mouseover');
        cy.get('[data-test="start-button"]').then(($button) => {
            expect($button).attr('ng-reflect-message').be.eq('');
        });
    });

    it('Settings form should store the values on local storage', () => {
        const expectedStoredData = {
            theme: 'light',
            times: 'slow',
            addOperator: {
                enabled: false,
                min: 1,
                max: 200,
            },
            subtractOperator: {
                enabled: true,
                min: 30,
                max: 150,
            },
            multiplyOperator: {
                enabled: true,
                min: 17,
                max: 100,
            },
            divisionOperator: {
                enabled: true,
                min: 17,
                max: 100,
            },
            sound: true,
        };

        cy.visit('/');
        cy.get('[data-test="settings-button"]').click();
        cy.wait(100);
        cy.get('#mat-button-toggle-1').click();

        cy.get('mat-slider').as('slider');

        // Selecciona el MatSlider

        cy.get('@slider')
            .eq(0)
            .find('[formControlName="min"]')
            .invoke('val', expectedStoredData.addOperator.min)
            .trigger('input');
        cy.get('@slider')
            .eq(0)
            .find('[formControlName="max"]')
            .invoke('val', expectedStoredData.addOperator.max)
            .trigger('input');

        cy.get('@slider')
            .eq(1)
            .find('[formControlName="min"]')
            .invoke('val', expectedStoredData.subtractOperator.min)
            .trigger('input');
        cy.get('@slider')
            .eq(1)
            .find('[formControlName="max"]')
            .invoke('val', expectedStoredData.subtractOperator.max)
            .trigger('input');

        cy.get('@slider')
            .eq(2)
            .find('[formControlName="min"]')
            .invoke('val', expectedStoredData.multiplyOperator.min)
            .trigger('input');
        cy.get('@slider')
            .eq(2)
            .find('[formControlName="max"]')
            .invoke('val', expectedStoredData.multiplyOperator.max)
            .trigger('input');

        cy.get('@slider')
            .eq(3)
            .find('[formControlName="min"]')
            .invoke('val', expectedStoredData.divisionOperator.min)
            .trigger('input');
        cy.get('@slider')
            .eq(3)
            .find('[formControlName="max"]')
            .invoke('val', expectedStoredData.divisionOperator.max)
            .trigger('input');

        cy.get('#mat-mdc-checkbox-1-input').uncheck();
        cy.get('#mat-mdc-checkbox-2-input').check();
        cy.get('#mat-mdc-checkbox-3-input').check();
        cy.get('#mat-mdc-checkbox-4-input').check();

        cy.get('[data-test="save-button"]').click();

        cy.window().then((win) => {
            const storedData = win.localStorage.getItem('settings');
            expect(storedData).to.equal(JSON.stringify(expectedStoredData));
        });
    });
});
