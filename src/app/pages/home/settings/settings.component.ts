import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Settings } from 'src/app/shared/models/settings.model';
import {
    readLocalStorageData,
    saveLocalStorageData,
} from 'src/app/shared/utils/localStorage';
import { SettingsService } from './settings.service';

enum Times {
    Slow = 90,
    Medium = 60,
    Fast = 30,
}

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {
    formGroup: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<SettingsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        formBuilder: FormBuilder,
        private settingsService: SettingsService
    ) {
        this.formGroup = formBuilder.group({
            theme: ['light'],
            times: [Times.Medium],
            addOperator: formBuilder.group({
                enabled: [true],
                min: [1],
                max: [200],
            }),
            subtractOperator: formBuilder.group({
                enabled: [true],
                min: [1],
                max: [200],
            }),
            multiplyOperator: formBuilder.group({
                enabled: [true],
                min: [1],
                max: [30],
            }),
            divisionOperator: formBuilder.group({
                enabled: [true],
                min: [1],
                max: [30],
            }),
            sound: [true],
        });
    }

    ngOnInit(): void {
        this.subscribeToEnableChanges();

        const settings = this.settingsService.settings;

        this.formGroup.patchValue(settings);
    }

    subscribeToEnableChanges() {
        this.subscribeToOperatorChanges('addOperator', this.formGroup);
        this.subscribeToOperatorChanges('subtractOperator', this.formGroup);
        this.subscribeToOperatorChanges('multiplyOperator', this.formGroup);
        this.subscribeToOperatorChanges('divisionOperator', this.formGroup);
    }

    toggleSound(value: boolean) {
        this.formGroup.get('sound')?.setValue(value);
    }

    private subscribeToOperatorChanges(
        operatorName: string,
        formGroup: FormGroup
    ) {
        formGroup
            .get(`${operatorName}.enabled`)
            ?.valueChanges.subscribe((enabled) => {
                const operator = formGroup.get(operatorName);
                if (enabled) {
                    operator?.get('min')?.enable();
                    operator?.get('max')?.enable();
                } else {
                    operator?.get('min')?.disable();
                    operator?.get('max')?.disable();
                }
            });
    }

    saveSettings(formGroup: FormGroup) {
        this.settingsService.settings = formGroup.getRawValue() as Settings;
        this.dialogRef.close();
    }

    cancel() {
        this.dialogRef.close();
    }
}
