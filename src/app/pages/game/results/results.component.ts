import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import html2canvas from 'html2canvas';
import { Operation } from 'src/app/pipes/operation/operation.model';
import { GameResult } from 'src/app/shared/models/game.model';

@Component({
    selector: 'ax-results',
    templateUrl: './results.component.html',
})
export class ResultsComponent implements OnChanges {
    @ViewChild('resultContent') contentToConvert!: ElementRef;
    @Input() operationsSolved = 0;
    @Input() operations: Operation[] = [];

    @Output() playAgain = new EventEmitter<void>();
    @Output() share = new EventEmitter<void>();

    result!: GameResult;

    onPlayAgain(): void {
        this.playAgain.emit();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['operations']?.currentValue) {
            const result = {
                correct: 0,
                incorrect: 0,
                score: 0,
            };

            let answerLessThan2Seconds = 0;

            this.operations.forEach((operation) => {
                if (operation.userResult === operation.result) {
                    result.correct++;
                } else {
                    result.incorrect++;
                }

                if (operation.userTime && operation.userTime < 2000) {
                    answerLessThan2Seconds++;
                }
            });

            result.score =
                Math.floor(result.correct * 10) -
                Math.floor(result.incorrect * 1.5) +
                Math.floor(answerLessThan2Seconds * 1.2);

            this.result = result;
        }
    }

    /**
     * Open the share dialog
     */
    download(): void {
        const content = this.contentToConvert.nativeElement;

        html2canvas(content).then((canvas) => {
            const imageData = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = imageData;

            const name =
                'CalculatorGame_Score_' +
                localStorage.getItem('nick') +
                '_' +
                new Date().toISOString() +
                '.png';
            link.download = name;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
}
