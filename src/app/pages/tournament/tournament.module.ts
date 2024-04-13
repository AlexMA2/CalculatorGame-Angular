import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournamentComponent } from './tournament.component';
import { RouterModule } from '@angular/router';
import { DummyComponentsModule } from 'src/app/components/dummy-components.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

const routes = [
    {
        path: '',
        component: TournamentComponent,
    },
];

@NgModule({
    declarations: [TournamentComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        DummyComponentsModule,
        MatInputModule,
    ],
})
export class TournamentModule {}
