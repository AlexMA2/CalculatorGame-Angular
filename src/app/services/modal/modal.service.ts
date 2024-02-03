import { DOCUMENT } from '@angular/common';
import {
    ComponentFactoryResolver,
    Inject,
    Injectable,
    Injector,
    TemplateRef,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { ModalComponent } from './modal.component';

@Injectable({
    providedIn: 'root',
})
export class ModalService {
    // private componentRef: ComponentRef<any> | null = null;

    private modalNotifier!: Subject<any>;

    constructor(
        private resolver: ComponentFactoryResolver,
        private injector: Injector,
        @Inject(DOCUMENT) private document: Document
    ) {}

    openDialog(content: TemplateRef<any>, options?: any): Observable<any> {
        const modalComponentFactory =
            this.resolver.resolveComponentFactory(ModalComponent);
        const contentViewRef = content.createEmbeddedView(null);
        const componentRef = modalComponentFactory.create(this.injector, [
            contentViewRef.rootNodes,
        ]);

        componentRef.instance.options = options;

        componentRef.instance.close.subscribe(() => {
            this.closeModal();
        });

        componentRef.instance.submit.subscribe(() => {
            this.submitModal();
        });

        componentRef.hostView.detectChanges();

        this.document.body.appendChild(componentRef.location.nativeElement);

        this.modalNotifier = new Subject();
        return this.modalNotifier.asObservable();
    }

    closeModal(): void {
        this.modalNotifier.complete();
    }

    submitModal(): void {
        this.modalNotifier.next('confirm');
        this.closeModal();
    }
}
