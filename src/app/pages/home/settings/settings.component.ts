import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { saveLocalStorageData } from 'src/app/shared/utils/localStorage';

enum Times {
    Slow = 90,
    Medium = 60,
    Fast = 30,
}

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
})
export class SettingsComponent {
    private readonly LS_KEY = 'settings';

    formGroup: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<SettingsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        formBuilder: FormBuilder
    ) {
        this.formGroup = formBuilder.group({
            theme: [localStorage.getItem(this.LS_KEY) || 'light'],
            times: [Times.Medium],
            addOperator: formBuilder.group({
                enabled: [true],
                min: [0],
                max: [10],
            }),
            subtractOperator: formBuilder.group({
                enabled: [true],
                min: [0],
                max: [10],
            }),
            multiplyOperator: formBuilder.group({
                enabled: [false],
                min: [0],
                max: [10],
            }),
            divideOperator: formBuilder.group({
                enabled: [false],
                min: [0],
                max: [10],
            }),
            sound: [true],
        });
    }

    saveSettings(formGroup: FormGroup) {
        saveLocalStorageData(this.LS_KEY, formGroup.value);

        console.log(
            '🚀 ~ SettingsComponent ~ saveSettings ~ formGroup.value:',
            formGroup.value
        );
        this.dialogRef.close();
    }
}
