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
    private readonly LS_KEY = 'language';

    languages: Language[] = [
        { code: 'en', label: 'English' },
        { code: 'es', label: 'Español' },
        { code: 'fr', label: 'Français' },
        { code: 'pt', label: 'Português' },
    ];

    selected = 'en';

    constructor(private translateService: TranslateService) {}

    ngOnInit(): void {
        this.selected = localStorage.getItem(this.LS_KEY) || 'en';
    }

    onLanguageChange(language: Language): void {
        this.selected = language.code;
        this.translateService.use(language.code);

        localStorage.setItem(this.LS_KEY, language.code);
    }
}
