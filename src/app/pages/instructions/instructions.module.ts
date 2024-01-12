import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstructionsComponent } from './instructions.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: InstructionsComponent,
    },
];

@NgModule({
    declarations: [InstructionsComponent],
    imports: [CommonModule, RouterModule.forChild(routes)],
})
export class InstructionsModule {}
