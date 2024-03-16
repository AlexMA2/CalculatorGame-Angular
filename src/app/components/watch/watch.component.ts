import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import { Howl } from 'howler';

@Component({
    selector: 'app-watch',
    templateUrl: './watch.component.html',
    styleUrls: ['./watch.component.scss'],
})
export class WatchComponent implements OnInit, OnDestroy {
    @Input() counterTime: 'slow' | 'medium' | 'fast' = 'medium';

    @Input() enabledSound = true;
    @Output() finished = new EventEmitter<void>();

    sound = new Howl({
        src: ['/assets/sounds/clock-ticking.mp3'],
        volume: 0.1,
    });

    counter = 60;

    interval!: ReturnType<typeof setInterval>;

    ngOnInit(): void {
        if (this.counterTime === 'slow') {
            this.counter = 90;
        } else if (this.counterTime === 'medium') {
            this.counter = 60;
        } else if (this.counterTime === 'fast') {
            this.counter = 30;
        }

        this.interval = setInterval(() => {
            this.counter--;

            if (this.counter === 10 && this.enabledSound) {
                this.sound.play();
            }

            if (this.counter === 0) {
                clearInterval(this.interval);
                if (this.enabledSound) this.sound.stop();
                this.finished.emit();
            }
        }, 1000);
    }

    ngOnDestroy(): void {
        clearInterval(this.interval);
        this.sound.stop();
    }
}
