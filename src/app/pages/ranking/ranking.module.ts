import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RankingComponent } from './ranking.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { DummyComponentsModule } from 'src/app/components/dummy-components.module';
import { MatTableModule } from '@angular/material/table';

const routes = [
    {
        path: '',
        component: RankingComponent,
    },
];

@NgModule({
    declarations: [RankingComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        TranslateModule,
        FormsModule,
        DummyComponentsModule,
        MatTableModule,
    ],
})
export class RankingModule {}
