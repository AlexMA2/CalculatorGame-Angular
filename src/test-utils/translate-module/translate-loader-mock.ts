import { TranslateLoader } from '@ngx-translate/core';
import { of } from 'rxjs';

export class TranslateLoaderMock implements TranslateLoader {
    getTranslation(lang: string) {
        // Simular la carga de traducciones
        return of({});
    }
}
