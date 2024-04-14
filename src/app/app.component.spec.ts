import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { AppComponent } from './app.component';
import { DummyComponentsModule } from './components/dummy-components.module';

// Mock del TranslateLoader
class TranslateLoaderMock implements TranslateLoader {
    getTranslation(lang: string) {
        // Simular la carga de traducciones
        return of({});
    }
}

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AppComponent],
            imports: [
                DummyComponentsModule,
                HttpClientTestingModule, // Importar HttpClientTestingModule para simular peticiones HTTP
                TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useClass: TranslateLoaderMock,
                    }, // Utilizar el Mock del TranslateLoader
                }),
                RouterModule,
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the app', () => {
        expect(component).toBeTruthy();
    });

    // Agrega más pruebas según sea necesario para el componente AppComponent
});
