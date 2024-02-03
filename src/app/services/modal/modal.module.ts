import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from './modal.service';
import { ModalComponent } from './modal.component';
import { DynamicComponentDirective } from 'src/app/directives/dynamic-component/dynamic-component.directive';
import { DynamicComponentModule } from 'src/app/directives/dynamic-component/dynamic-component.module';

@NgModule({
    declarations: [ModalComponent],
    imports: [CommonModule, DynamicComponentModule],
    exports: [],
})
export class ModalModule {}
