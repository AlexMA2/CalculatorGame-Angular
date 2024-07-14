import { TestBed } from '@angular/core/testing';
import { TranslateTestingModule } from 'src/test-utils/translate-module/translate-testing.module';

import { LanguageSelectorComponent } from './language-selector.component';
import { TranslateService } from '@ngx-translate/core';
import { MatMenuModule } from '@angular/material/menu';

describe('LanguageSelectorComponent', () => {
    let component: LanguageSelectorComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LanguageSelectorComponent],
            imports: [TranslateTestingModule, MatMenuModule],
        })
            .compileComponents()
            .then(() => {
                component = TestBed.createComponent(
                    LanguageSelectorComponent
                ).componentInstance;
            });
    });

    it('onLanguageChange method should set the language into service and ls ', () => {
        const language = { code: 'en', label: 'English' };
        const translateService = TestBed.inject(TranslateService);
        const setSpy = spyOn(translateService, 'use');
        const setItemSpy = spyOn(localStorage, 'setItem');

        component.onLanguageChange(language);

        expect(component.selected).toBe('en');
        expect(setSpy).toHaveBeenCalledWith('en');
        expect(setItemSpy).toHaveBeenCalledWith('language', 'en');
    });
});
