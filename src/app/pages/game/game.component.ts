import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, filter, fromEvent, takeUntil } from 'rxjs';
import { Operation } from 'src/app/pipes/operation/operation.model';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ShareDialogComponent } from './share-dialog/share-dialog.component';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
})
export class GameComponent implements OnInit, OnDestroy {
    interval!: ReturnType<typeof setInterval>;

    counter = 5;
    ngUnsubscribe = new Subject<void>();
    textField = new FormControl('');

    buttons = [
        'backspace.label',
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        'send.label',
    ];

    operators = ['+', '-', '*', '/'];
    operations: Operation[] = [];
    operation!: Operation;

    operationsSolved = 0;

    finished = false;

    result: any = {
        correct: 0,
        incorrect: 0,
        score: 0,
    };

    constructor(private modalService: ModalService) {}

    ngOnInit(): void {
        this.startGame();
    }

    startGame(): void {
        this.textField.setValue('');
        this.createOperations();
        this.interval = setInterval(() => {
            this.counter--;
            if (this.counter === -1) {
                clearInterval(this.interval);

                fromEvent<KeyboardEvent>(document, 'keydown')
                    .pipe(
                        takeUntil(this.ngUnsubscribe),
                        filter((event) =>
                            [
                                '0',
                                '1',
                                '2',
                                '3',
                                '4',
                                '5',
                                '6',
                                '7',
                                '8',
                                '9',
                                'Enter',
                                'Backspace',
                            ].includes(event.key)
                        )
                    )
                    .subscribe((event) => {
                        this.handleKeyDown(event);
                    });
            }
        }, 1000);
    }

    onButtonClick(button: string): void {
        switch (button) {
            case 'backspace.label':
                if (this.textField.value && this.textField.value.length > 0) {
                    this.textField.setValue(this.textField.value!.slice(0, -1));
                }
                break;
            case 'send.label':
                if (!this.textField.value) {
                    return;
                }

                this.operations[this.operationsSolved].userResult = Number(
                    this.textField.value
                );

                this.textField.setValue('');

                this.operationsSolved++;
                this.operation = this.operations[this.operationsSolved];

                if (this.operationsSolved === this.operations.length) {
                    this.onFinishTimer();
                }

                break;
            default:
                this.textField.setValue(this.textField.value + button);
                break;
        }
    }

    createOperations(): void {
        for (let i = 0; i < 50; i++) {
            const index = Math.floor(Math.random() * this.operators.length);
            let firstNumber = 0;
            let secondNumber = 0;

            if (this.operators[index] === '+') {
                firstNumber = Math.floor(Math.random() * 201);
                secondNumber = Math.floor(Math.random() * 201);
            }

            if (this.operators[index] === '-') {
                firstNumber = Math.floor(Math.random() * 201);
                secondNumber = Math.floor(Math.random() * firstNumber);
            }

            if (this.operators[index] === '*') {
                firstNumber = Math.floor(Math.random() * 30 + 1);
                secondNumber = Math.floor(Math.random() * 30 + 1);
            }

            if (this.operators[index] === '/') {
                let quotient = Math.floor(Math.random() * 30 + 1);
                let divisor = Math.floor(Math.random() * 30 + 1);

                firstNumber = quotient * divisor;
                secondNumber = divisor;
            }

            this.operations.push({
                firstNumber,
                secondNumber,
                operator: this.operators[index],
                result: eval(
                    `${firstNumber} ${this.operators[index]} ${secondNumber}`
                ),
            });
        }

        this.operation = this.operations[0];
    }

    handleKeyDown(event: KeyboardEvent): void {
        if (event.key === 'Enter') {
            this.onButtonClick('send.label');
        }

        if (event.key === 'Backspace') {
            this.onButtonClick('backspace.label');
        }

        if (
            ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(
                event.key
            )
        ) {
            this.onButtonClick(event.key);
        }
    }

    onFinishTimer(): void {
        this.finished = true;
        this.operations = this.operations.slice(0, this.operationsSolved);

        this.operations.forEach((operation) => {
            if (operation.userResult === operation.result) {
                this.result.correct++;
            } else {
                this.result.incorrect++;
            }
        });
        this.ngUnsubscribe.next();
        this.result.score =
            Math.floor(this.result.correct * 10) -
            Math.floor(this.result.incorrect * 1.5);
    }

    onPlayAgain(): void {
        this.counter = 5;
        this.operationsSolved = 0;
        this.finished = false;
        this.result = {
            correct: 0,
            incorrect: 0,
            score: 0,
        };
        this.operations = [];

        this.textField.reset();

        this.startGame();
    }

    onShare(template: TemplateRef<any>): void {
        const message = `I just scored ${this.result.score} points in the Calculator Game!`;
        const url = `https://math-game-frontend.herokuapp.com/`;
        const hashtags = 'calculator,math,game,angular';

        // window.open(
        //     `https://twitter.com/intent/tweet?text=${message}&url=${url}&hashtags=${hashtags}`,
        //     '_blank'
        // );

        this.modalService
            .openDialog(template, {
                message,
                url,
                hashtags,
            })
            .subscribe((action: any) => {
                console.log('Dialog closed', action);
            });
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        clearInterval(this.interval);
    }
}
