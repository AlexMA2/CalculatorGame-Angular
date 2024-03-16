import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject, filter, fromEvent, takeUntil } from 'rxjs';
import { SettingsComponent } from './settings/settings.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit, OnDestroy {
    ngUnsubscribe = new Subject<void>();
    constructor(private router: Router, private matDialog: MatDialog) {}

    ngOnInit(): void {
        fromEvent<KeyboardEvent>(document, 'keydown')
            .pipe(
                takeUntil(this.ngUnsubscribe),
                filter((event) => ['Enter'].includes(event.key))
            )
            .subscribe(() => {
                if (this.nickControl.valid) {
                    this.router.navigate(['/game']);
                }
            });
    }

    nickControl = new FormControl('', [
        Validators.required,
        Validators.minLength(3),
    ]);

    generateRandomName(): void {
        const amountLetters = Math.random() * 5 + 3;

        const vowels = 'aeiou';
        const consonants = 'bcdfghjklmnpqrstvwxyz';

        let word = '';

        let consonantsFlag = 0;
        let vowelsFlag = 0;

        for (let i = 0; i < amountLetters; i++) {
            if (consonantsFlag >= 2) {
                word += vowels[Math.floor(Math.random() * vowels.length)];
                consonantsFlag = 0;
                vowelsFlag++;
                continue;
            }

            if (vowelsFlag >= 2) {
                word +=
                    consonants[Math.floor(Math.random() * consonants.length)];
                consonantsFlag++;
                vowelsFlag = 0;
                continue;
            }

            const isVowel = Math.random() > 0.4;
            if (isVowel) {
                word += vowels[Math.floor(Math.random() * vowels.length)];
                vowelsFlag++;
            } else {
                word +=
                    consonants[Math.floor(Math.random() * consonants.length)];
                consonantsFlag++;
            }
        }

        this.nickControl.setValue(word);
    }

    openDialogToViewSettings(): void {
        this.matDialog.open(SettingsComponent, {
            width: '100%',
            maxWidth: '600px',
        });
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
