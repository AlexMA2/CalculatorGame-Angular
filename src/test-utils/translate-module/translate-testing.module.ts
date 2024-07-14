import { NgModule } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateLoaderMock } from './translate-loader-mock';

@NgModule({
    imports: [
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useClass: TranslateLoaderMock,
            },
        }),
    ],
    exports: [TranslateModule],
})
export class TranslateTestingModule {}
