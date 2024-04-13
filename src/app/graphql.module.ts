import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { NgModule } from '@angular/core';
import { ApolloClientOptions, InMemoryCache, split } from '@apollo/client/core';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

const uri = 'http://localhost:4000/graphql'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
    const httpHandler = httpLink.create({ uri });
    const wsHandler = new GraphQLWsLink(
        createClient({
            url: 'ws://localhost:4000/graphql',
        })
    );

    // The split function takes three parameters:

    //

    // * A function that's called for each operation to execute

    // * The Link to use for an operation if the function returns a "truthy" value

    // * The Link to use for an operation if the function returns a "falsy" value

    const splitLink = split(
        ({ query }) => {
            const definition = getMainDefinition(query);

            return (
                definition.kind === 'OperationDefinition' &&
                definition.operation === 'subscription'
            );
        },
        wsHandler,
        httpHandler
    );

    return {
        link: splitLink,
        cache: new InMemoryCache(),
    };
}

@NgModule({
    exports: [ApolloModule],
    providers: [
        {
            provide: APOLLO_OPTIONS,
            useFactory: createApollo,
            deps: [HttpLink],
        },
    ],
})
export class GraphQLModule {}
