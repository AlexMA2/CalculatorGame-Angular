import {
    AfterViewInit,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    ElementRef,
    EventEmitter,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { DynamicComponentDirective } from 'src/app/directives/dynamic-component/dynamic-component.directive';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
})
export class ModalComponent {
    childComponentType: any;
    options: any;

    @Output() close = new EventEmitter();
    @Output() submit = new EventEmitter();

    constructor(private elementRef: ElementRef) {}

    onClose(): void {
        this.elementRef.nativeElement.remove();
        this.close.emit();
    }

    onSubmit(): void {
        this.elementRef.nativeElement.remove();
        this.submit.emit();
    }
}
