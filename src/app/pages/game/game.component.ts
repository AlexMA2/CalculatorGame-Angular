import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { filter, fromEvent, Subject, takeUntil } from 'rxjs';
import { Operation } from 'src/app/pipes/operation/operation.model';
import { ShareDialogComponent } from './share-dialog/share-dialog.component';
import { GameResult, Operators } from 'src/app/shared/models/game.model';
import { Router } from '@angular/router';
import { Settings } from 'src/app/shared/models/settings.model';
import { readLocalStorageData } from 'src/app/shared/utils/localStorage';
import { SettingsService } from '../home/settings/settings.service';
import { randomNumber } from 'src/app/shared/utils/random';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
})
export class GameComponent implements OnInit, OnDestroy {
    interval!: ReturnType<typeof setInterval>;

    counterToStartGame = 5;

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

    operators: Operators[];
    operations: Operation[] = [];
    operation!: Operation;

    operationsSolved = 0;

    finished = false;

    result: GameResult = {
        correct: 0,
        incorrect: 0,
        score: 0,
    };

    settings: Settings;

    constructor(
        private matDialog: MatDialog,
        private settingsService: SettingsService
    ) {
        this.settings = this.settingsService.settings;

        const operators = [];
        if (this.settings.addOperator.enabled) {
            operators.push(Operators.Add);
        }
        if (this.settings.subtractOperator.enabled) {
            operators.push(Operators.Subtract);
        }
        if (this.settings.multiplyOperator.enabled) {
            operators.push(Operators.Multiply);
        }
        if (this.settings.divisionOperator.enabled) {
            operators.push(Operators.Division);
        }

        this.operators = operators;
    }

    ngOnInit(): void {
        this.startGame();
    }

    /**
     * Start the game and set the interval to 1 second
     */
    startGame(): void {
        this.textField.setValue('');
        this.createOperations();

        this.interval = setInterval(() => {
            this.counterToStartGame--;
            if (this.counterToStartGame > -1) return;

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

            clearInterval(this.interval);
        }, 1000);
    }

    /**
     * Handle the button click event if it's a number, backspace or enter.
     * @param button : string - The button label clicked. It can be a number, backspace or send
     */
    onButtonClick(button: string): void {
        switch (button) {
            case 'backspace.label':
                if (this.textField.value && this.textField.value.length > 0) {
                    this.textField.setValue(this.textField.value!.slice(0, -1));
                }
                break;
            case 'send.label':
                if (!this.textField.value) return;

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

    /**
     * Create 50 operations with random numbers and operators
     */
    private createOperations(): void {
        for (let i = 0; i < 50; i++) {
            const index = Math.floor(Math.random() * this.operators.length);
            let firstNumber = 0;
            let secondNumber = 0;

            if (this.operators[index] === Operators.Add) {
                const { min, max } = this.settings.addOperator;
                firstNumber = randomNumber(min, max);
                secondNumber = randomNumber(min, max);
            }

            if (this.operators[index] === Operators.Subtract) {
                const { min, max } = this.settings.subtractOperator;
                firstNumber = randomNumber(min, max);
                secondNumber = randomNumber(min, max);
            }

            if (this.operators[index] === Operators.Multiply) {
                const { min, max } = this.settings.multiplyOperator;
                firstNumber = randomNumber(min, max);
                secondNumber = randomNumber(min, max);
            }

            if (this.operators[index] === Operators.Division) {
                const { min, max } = this.settings.divisionOperator;

                let divisor = randomNumber(min, max);
                let quotient = randomNumber(
                    Math.ceil(min / divisor),
                    Math.ceil(max / divisor)
                );

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

    /**
     * Handle the keyboard events like Enter, Backspace and numbers
     * @param event KeyboardEvent
     */
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

    /**
     * Finish the game and calculate the score
     */
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

    /**
     * Returns every value to the initial state
     */
    onPlayAgain(): void {
        this.counterToStartGame = 5;
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

    /**
     * Open the share dialog
     */
    onShare(): void {
        this.matDialog
            .open(ShareDialogComponent, {
                data: this.result,
                maxWidth: '800px',
                width: '100%',
                panelClass: 'ax-dialog',
            })
            .afterClosed()
            .subscribe(() => {});
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        clearInterval(this.interval);
    }
}
