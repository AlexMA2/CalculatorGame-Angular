import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject, filter, fromEvent, takeUntil } from 'rxjs';
import { SettingsComponent } from './settings/settings.component';
import { GraphqlService } from 'src/app/shared/services/graphql.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit, OnDestroy {
    private readonly LS_KEY = 'nick';

    ngUnsubscribe = new Subject<void>();
    nickControl = new FormControl('', [
        Validators.required,
        Validators.minLength(3),
    ]);

    constructor(
        private router: Router,
        private matDialog: MatDialog,
        private graphQl: GraphqlService
    ) {}

    ngOnInit(): void {
        const nick = localStorage.getItem(this.LS_KEY);
        if (nick) this.nickControl.setValue(nick);

        fromEvent<KeyboardEvent>(document, 'keydown')
            .pipe(
                takeUntil(this.ngUnsubscribe),
                filter((event) => ['Enter'].includes(event.key))
            )
            .subscribe(() => {
                if (this.nickControl.valid) {
                    this.saveNick();
                }
            });
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

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

    saveNick(): void {
        if (!this.nickControl.value) return;
        localStorage.setItem(this.LS_KEY, this.nickControl.value);
        this.router.navigate(['/game']);

        this.graphQl.createUser(this.nickControl.value).subscribe({
            next: (result) => {
                console.log(result);
            },
            error: (error) => {
                console.error(error);
            },
        });
    }
}
