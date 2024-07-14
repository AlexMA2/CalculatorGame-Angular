import { TestBed } from '@angular/core/testing';
import { GraphQLModule } from 'src/app/graphql.module';

import { GraphqlService } from './graphql.service';
import { HttpClientModule } from '@angular/common/http';

describe('graphql Service', () => {
    let service: GraphqlService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [GraphQLModule, HttpClientModule],
        });
        service = TestBed.inject(GraphqlService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    // it('getUsersGames method should users names', (done: DoneFn) => {
    //     service.getUsersGames().subscribe((result) => {
    //         console.log('🚀 ~ service.getUsersGames ~ result:', result);
    //         expect(result.data.users[0].username).toBe('user1');
    //         done();
    //     });
    // });
});
