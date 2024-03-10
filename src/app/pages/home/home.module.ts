import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipModule } from 'src/app/directives/tooltip/tooltip.module';

import { HomeComponent } from './home.component';
import { DummyComponentsModule } from 'src/app/components/dummy-components.module';
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
];

@NgModule({
    declarations: [HomeComponent],
    imports: [
        CommonModule,
        TranslateModule,
        TooltipModule,
        FormsModule,
        DummyComponentsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
    ],
})
export class HomeModule {}
