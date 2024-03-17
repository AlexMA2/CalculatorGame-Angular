import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { DummyComponentsModule } from 'src/app/components/dummy-components.module';

import { GameComponent } from './game.component';
import { ResultsComponent } from './results/results.component';
import { PipesModule } from 'src/app/pipes/pipes.module';

const routes: Routes = [
    {
        path: '',
        component: GameComponent,
    },
];

@NgModule({
    declarations: [GameComponent, ResultsComponent],
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        PipesModule,
        RouterModule.forChild(routes),
        DummyComponentsModule,
        MatDialogModule,
        MatTooltipModule,
    ],
})
export class GameModule {}
