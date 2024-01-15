import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
    {
        path: '',
        component: GameComponent,
    },
];

@NgModule({
    declarations: [GameComponent],
    imports: [CommonModule, TranslateModule, RouterModule.forChild(routes)],
})
export class GameModule {}
