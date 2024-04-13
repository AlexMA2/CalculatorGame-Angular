import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
})
export class FooterComponent {
    active = 'game';

    constructor(private router: Router) {}

    goTo(route: string): void {
        this.active = route;

        switch (route) {
            case 'tournament':
                this.router.navigate(['/tournament']);
                break;
            case 'game':
                this.router.navigate(['/game']);
                break;
            case 'scores':
                this.router.navigate(['/ranking']);
                break;
            default:
                this.router.navigate(['/']);
                break;
        }
    }
}
