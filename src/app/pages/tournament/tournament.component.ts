import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Tournament } from 'src/app/shared/models/game.model';
import { GraphqlService } from 'src/app/shared/services/graphql.service';

@Component({
    selector: 'app-tournament',
    templateUrl: './tournament.component.html',
})
export class TournamentComponent implements OnInit, OnDestroy {
    tournaments: Tournament[] = [
        {
            id: '1',
            name: 'Tournament 1',
            maxPlayers: 2,
            password: '123456',
        },
    ];

    formGroup: FormGroup;

    private onDestroy = new Subject<void>();

    constructor(private graphqlService: GraphqlService) {
        this.formGroup = new FormGroup({
            name: new FormControl('', [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(64),
            ]),
            maxPlayers: new FormControl(2, [
                Validators.required,
                Validators.min(2),
                Validators.max(10),
            ]),
            password: new FormControl('', [
                Validators.minLength(6),
                Validators.maxLength(20),
            ]),
        });
    }

    ngOnInit(): void {
        this.graphqlService.subscribeToTournaments().subscribe((tournament) => {
            this.tournaments.push(tournament.data.tournamentCreated);
            this.tournaments = [...this.tournaments];
        });
    }

    onCreateTournament() {
        const { name, maxPlayers, password } = this.formGroup.value;
        this.graphqlService
            .createTournament(name, maxPlayers, password)
            .pipe(takeUntil(this.onDestroy))
            .subscribe(() => {
                this.formGroup.reset();
            });
    }

    onJoinTournament(tournamentId: string) {
        console.log(
            '🚀 ~ TournamentComponent ~ onJoinTournament ~ tournamentId',
            tournamentId
        );
    }

    ngOnDestroy(): void {
        this.onDestroy.next();
        this.onDestroy.complete();
    }
}
