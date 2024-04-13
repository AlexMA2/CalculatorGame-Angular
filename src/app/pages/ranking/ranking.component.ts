import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { Game } from 'src/app/shared/models/game.model';
import { GraphqlService } from 'src/app/shared/services/graphql.service';

@Component({
    selector: 'app-ranking',
    templateUrl: './ranking.component.html',
})
export class RankingComponent implements AfterViewInit, OnInit {
    displayedColumns: string[] = [
        'position',
        'user',
        'puntuation',
        'time',
        'date',
    ];
    dataSource = new MatTableDataSource<Game>([]);

    constructor(
        private graphQl: GraphqlService,
        private translateService: TranslateService
    ) {}

    @ViewChild(MatSort) sort!: MatSort;

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
        this.getRanking();
    }

    ngOnInit() {
        this.translateService.onLangChange.subscribe(() => {
            const time = Intl.DateTimeFormat(
                localStorage.getItem('language') ?? 'en',
                {
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                }
            );

            this.dataSource.data = this.dataSource.data.map((game: Game) => {
                return {
                    ...game,
                    date: time.format(
                        new Date(game.noParsedDate ?? new Date())
                    ),
                };
            });
        });
    }

    getRanking() {
        this.graphQl
            .getGames({
                direction: 'DESC',
                field: 'puntuation',
            })
            .subscribe({
                next: (result) => {
                    const time = Intl.DateTimeFormat(
                        localStorage.getItem('language') ?? 'en',
                        {
                            hour: 'numeric',
                            minute: 'numeric',
                            second: 'numeric',
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                        }
                    );

                    this.dataSource.data = result.data.games.map(
                        (game: Game, index: number) => {
                            return {
                                position: index + 1,
                                user: game.user,
                                puntuation: game.puntuation,
                                time: game.time,
                                date: time.format(new Date(game.date)),
                                noParsedDate: game.date,
                            };
                        }
                    );
                    this.dataSource.sort = this.sort;
                },
                error: (error) => {
                    console.log(
                        '🚀 ~ RankingComponent ~ this.graphQl.getGames ~ error:',
                        error
                    );
                },
            });
    }

    announceSortChange(sortState: any) {
        // This example uses English messages. If your application supports
        // multiple language, you would internationalize these strings.
        // Furthermore, you can customize the message to add additional
        // details about the values being sorted.
        console.log(
            sortState,
            `Sorting ${sortState.direction} by ${sortState.active}`
        );
    }
}
