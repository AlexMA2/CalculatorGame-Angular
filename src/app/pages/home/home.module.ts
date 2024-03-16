import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { HomeComponent } from './home.component';
import { DummyComponentsModule } from 'src/app/components/dummy-components.module';
import { SettingsComponent } from './settings/settings.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';

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
