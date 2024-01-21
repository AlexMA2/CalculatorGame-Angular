import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OperationModule } from 'src/app/pipes/operation/operation.module';
import { WatchComponent } from 'src/app/components/watch/watch.component';

const routes: Routes = [
    {
        path: '',
        component: GameComponent,
    },
];

@NgModule({
    declarations: [GameComponent],
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        OperationModule,
        RouterModule.forChild(routes),
        WatchComponent,
    ],
})
export class GameModule {}
