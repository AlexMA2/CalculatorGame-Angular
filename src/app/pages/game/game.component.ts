import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
})
export class GameComponent implements OnInit {
    interval!: ReturnType<typeof setInterval>;

    counter = 5;

    ngOnInit(): void {
        this.interval = setInterval(() => {
            this.counter--;
            if (this.counter === 0) {
                clearInterval(this.interval);
            }
        }, 1000);
    }
}
