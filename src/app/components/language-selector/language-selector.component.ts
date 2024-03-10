import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

interface Language {
    code: string;
    label: string;
}

@Component({
    selector: 'ax-language-selector',
    templateUrl: './language-selector.component.html',
})
export class LanguageSelectorComponent implements OnInit {
    languages: Language[] = [
        { code: 'en', label: 'languages.english' },
        { code: 'es', label: 'languages.spanish' },
        { code: 'fr', label: 'languages.french' },
        { code: 'pt', label: 'languages.portugues' },
    ];

    selected = 'en';

    constructor(private translateService: TranslateService) {}

    ngOnInit(): void {
        this.selected = this.translateService.currentLang || 'en';
    }

    onLanguageChange(language: Language): void {
        this.selected = language.code;

        this.translateService.use(language.code);
    }
}
