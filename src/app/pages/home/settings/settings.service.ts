import { Injectable } from '@angular/core';
import { Settings, Times } from 'src/app/shared/models/settings.model';
import {
    readLocalStorageData,
    saveLocalStorageData,
} from 'src/app/shared/utils/localStorage';

@Injectable({
    providedIn: 'root',
})
export class SettingsService {
    private readonly LS_KEY = 'settings';

    get settings(): Settings {
        let settings: Settings | null = readLocalStorageData(
            this.LS_KEY
        ) as Settings | null;

        if (!settings) {
            settings = {
                theme: 'light',
                times: Times.MEDIUM,
                addOperator: {
                    enabled: true,
                    min: 1,
                    max: 200,
                },
                subtractOperator: {
                    enabled: true,
                    min: 1,
                    max: 200,
                },
                multiplyOperator: {
                    enabled: true,
                    min: 1,
                    max: 30,
                },
                divisionOperator: {
                    enabled: true,
                    min: 1,
                    max: 30,
                },
                sound: true,
            };
        }

        return settings;
    }

    set settings(settings: Settings) {
        saveLocalStorageData(this.LS_KEY, settings);
    }
}
