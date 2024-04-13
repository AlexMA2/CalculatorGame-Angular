import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { DummyComponentsModule } from 'src/app/components/dummy-components.module';

import { RankingComponent } from './ranking.component';

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
        DummyComponentsModule,
        MatTableModule,
        MatSortModule,
    ],
})
export class RankingModule {}
