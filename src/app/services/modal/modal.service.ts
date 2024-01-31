import {
    ApplicationRef,
    ComponentFactoryResolver,
    ComponentRef,
    ElementRef,
    EmbeddedViewRef,
    Injectable,
    Injector,
} from '@angular/core';
import { ModalComponent } from './modal.component';

@Injectable({
    providedIn: 'root',
})
export class ModalService {
    private componentRef: ComponentRef<any> | null = null;

    constructor(
        private elementRef: ElementRef,
        private appRef: ApplicationRef,
        private componentFactoryResolver: ComponentFactoryResolver,
        private injector: Injector
    ) {}

    openDialog() {
        const componentFactory =
            this.componentFactoryResolver.resolveComponentFactory(
                ModalComponent
            );

        this.componentRef = componentFactory.create(this.injector);
        this.appRef.attachView(this.componentRef.hostView);
        const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>)
            .rootNodes[0] as HTMLElement;
        document.body.appendChild(domElem);
    }
}
