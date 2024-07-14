import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { DummyComponentsModule } from 'src/app/components/dummy-components.module';
import { GraphQLModule } from 'src/app/graphql.module';
import { GraphqlService } from 'src/app/shared/services/graphql.service';
import { TranslateTestingModule } from 'src/test-utils/translate-module/translate-testing.module';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    let router: Router;
    let graphQlService: GraphqlService;
    let saveNickSpy: jasmine.Spy;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HomeComponent],
            imports: [
                DummyComponentsModule,
                ReactiveFormsModule,
                MatDialogModule,
                MatSliderModule,
                MatButtonToggleModule,
                MatSlideToggleModule,
                MatCheckboxModule,
                MatButtonModule,
                MatRippleModule,
                MatTooltipModule,
                GraphQLModule,
                HttpClientTestingModule, // Importar HttpClientTestingModule para simular peticiones HTTP
                TranslateTestingModule,
                RouterModule,
            ],
            providers: [GraphqlService],
        }).compileComponents();

        router = TestBed.inject(Router);
        graphQlService = TestBed.inject(GraphqlService);
        spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        saveNickSpy = spyOn(component, 'saveNick').and.callThrough();
    });

    it('should create an instance', () => {
        expect(component).toBeTruthy();
    });

    it('should save nickname to localStorage and navigate to "/game"', () => {
        const nick = 'testNick';
        component.nickControl.setValue(nick); // Configura un valor para nickControl

        spyOn(localStorage, 'setItem'); // Espía el método setItem de localStorage
        spyOn(graphQlService, 'createUser').and.returnValue(of({}));

        component.saveNick();

        expect(localStorage.setItem).toHaveBeenCalledWith(
            component['LS_KEY'],
            nick
        );
        expect(router.navigate).toHaveBeenCalledWith(['/game']);
        expect(graphQlService.createUser).toHaveBeenCalledWith(nick);
    });

    it('random name function should generate a word with minimum 3 letters and maximum 8 letters', () => {
        component.generateRandomName();

        expect(component.nickControl.value).toMatch(/^[a-z]{3,8}$/);
    });

    it('random name function should have maximum 2 vowels together and 2 consonants together', () => {
        component.generateRandomName();
        expect(component.nickControl.value).not.toMatch(
            /([aeiou]{3,})|([bcdfghjklmnpqrstvwxyz]{3,})/
        );
    });

    it('should call saveNick when Enter key is pressed and nickControl is valid', () => {
        component.nickControl.setValue('test');

        // Simula un evento de teclado 'Enter'
        const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
        document.dispatchEvent(enterEvent);
        expect(saveNickSpy).toHaveBeenCalled();
    });

    it('should not save nickname if nickControl value is empty', () => {
        spyOn(localStorage, 'setItem');
        spyOn(graphQlService, 'createUser');
        component.nickControl.setValue(null);
        component.saveNick();

        expect(localStorage.setItem).not.toHaveBeenCalled();
        expect(graphQlService.createUser).not.toHaveBeenCalled();
    });
});
