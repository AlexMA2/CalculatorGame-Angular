import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperationPipe } from './operation.pipe';

@NgModule({
    declarations: [OperationPipe],
    imports: [CommonModule],
    exports: [OperationPipe],
})
export class OperationModule {}
