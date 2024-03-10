import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { WatchComponent } from 'src/app/components/watch/watch.component';
import { OperationModule } from 'src/app/pipes/operation/operation.module';
import { MatDialogModule } from '@angular/material/dialog';
import { GameComponent } from './game.component';
import { ShareDialogComponent } from './share-dialog/share-dialog.component';
import { DummyComponentsModule } from 'src/app/components/dummy-components.module';
import { ResultsComponent } from './results/results.component';

const routes: Routes = [
    {
        path: '',
        component: GameComponent,
    },
];

@NgModule({
    declarations: [GameComponent, ShareDialogComponent, ResultsComponent],
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        OperationModule,
        RouterModule.forChild(routes),
        DummyComponentsModule,
        MatDialogModule,
    ],
})
export class GameModule {}
