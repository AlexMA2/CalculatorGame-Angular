import { Injectable } from '@angular/core';
import { ApolloQueryResult, FetchResult } from '@apollo/client/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
    providedIn: 'root',
})
export class GraphqlService {
    private query = gql`
        query {
            users {
                id
                username
                playedGames {
                    id
                }
            }
            games {
                id
                user {
                    username
                }
            }
        }
    `;
    constructor(private apollo: Apollo) {}
    public getUsersGames(): Observable<ApolloQueryResult<any>> {
        return this.apollo.watchQuery({
            query: this.query,
        }).valueChanges;
    }

    createUser(username: string): Observable<any> {
        const mutation = gql`
            mutation CreateUser($user: CreateUserInput) {
                createUser(user: $user) {
                    username
                }
            }
        `;
        return this.apollo.mutate({
            mutation,
            variables: {
                user: {
                    username,
                },
            },
        });
    }

    getGames(order?: Order): Observable<ApolloQueryResult<any>> {
        const query = gql`
            query Games($order: Order) {
                games(order: $order) {
                    id
                    puntuation
                    time
                    date
                    user {
                        username
                    }
                }
            }
        `;

        const body: any = {
            query: query,
        };

        if (order) {
            body['variables'] = {
                order: {
                    field: order.field,
                    direction: order.direction,
                },
            };
        }
        return this.apollo.watchQuery(body).valueChanges;
    }

    createTournament(
        name: string,
        maxPlayers: number,
        password?: string
    ): Observable<any> {
        const mutation = gql`
            mutation Mutation($createdTournamentInput: CreatedTournamentInput) {
                createTournament(
                    createdTournamentInput: $createdTournamentInput
                ) {
                    id
                    maxPlayers
                    name
                    password
                }
            }
        `;

        return this.apollo.mutate({
            mutation,
            variables: {
                createdTournamentInput: {
                    name,
                    maxPlayers,
                    password: password ?? null,
                },
            },
        });
    }

    subscribeToTournaments(): Observable<any> {
        const subscription = gql`
            subscription Subscription {
                tournamentCreated {
                    id
                    name
                    password
                    maxPlayers
                }
            }
        `;

        return this.apollo.subscribe({
            query: subscription,
        });
    }
}
