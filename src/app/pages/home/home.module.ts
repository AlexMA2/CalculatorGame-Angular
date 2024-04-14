import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { DummyComponentsModule } from 'src/app/components/dummy-components.module';

import { HomeComponent } from './home.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
];

@NgModule({
    declarations: [HomeComponent, SettingsComponent],
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
        DummyComponentsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatSliderModule,
        MatButtonToggleModule,
        MatSlideToggleModule,
        MatCheckboxModule,
        MatButtonModule,
        MatRippleModule,
        MatTooltipModule,
        RouterModule.forChild(routes),
    ],
})
export class HomeModule {}
