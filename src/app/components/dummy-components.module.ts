import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';

import { FooterComponent } from './footer/footer.component';
import { LanguageSelectorComponent } from './language-selector/language-selector.component';
import { WatchComponent } from './watch/watch.component';

@NgModule({
    declarations: [FooterComponent, WatchComponent, LanguageSelectorComponent],
    imports: [CommonModule, MatTooltipModule, TranslateModule, MatMenuModule],
    exports: [FooterComponent, WatchComponent, LanguageSelectorComponent],
})
export class DummyComponentsModule {}
