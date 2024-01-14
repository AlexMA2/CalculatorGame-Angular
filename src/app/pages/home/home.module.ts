import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipDirective } from 'src/app/directives/tooltip/tooltip.directive';
import { TooltipModule } from 'src/app/directives/tooltip/tooltip.module';

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
        RouterModule.forChild(routes),
    ],
})
export class HomeModule {}
