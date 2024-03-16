import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Operation } from 'src/app/pipes/operation/operation.model';

@Component({
    selector: 'ax-results',
    templateUrl: './results.component.html',
})
export class ResultsComponent {
    @Input() result: any;
    @Input() operationsSolved = 0;
    @Input() operations: Operation[] = [];

    @Output() playAgain = new EventEmitter<void>();
    @Output() share = new EventEmitter<void>();

    onPlayAgain(): void {
        this.playAgain.emit();
    }

    onShare(): void {
        this.share.emit();
    }
}
