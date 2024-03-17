import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DurationMsPipe } from './duration-ms/duration-ms.pipe';
import { OperationPipe } from './operation/operation.pipe';

@NgModule({
    declarations: [DurationMsPipe, OperationPipe],
    imports: [CommonModule],
    exports: [DurationMsPipe, OperationPipe],
})
export class PipesModule {}
