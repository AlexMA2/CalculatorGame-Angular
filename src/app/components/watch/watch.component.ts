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
    selector: 'ax-watch',
    templateUrl: './watch.component.html',
    styleUrls: ['./watch.component.scss'],
})
export class WatchComponent implements OnInit, OnDestroy {
    private interval!: ReturnType<typeof setInterval>;
    private sound = new Howl({
        src: ['/assets/sounds/clock-ticking.mp3'],
        volume: 0.1,
    });
    private readonly intervalSeconds = 1000;

    public counter = 60;

    @Input() counterTime: 'slow' | 'medium' | 'fast' = 'medium';
    @Input() enabledSound = true;
    @Output() finished = new EventEmitter<void>();

    ngOnInit(): void {
        this.counter = this.getCounterTime();

        this.interval = setInterval(() => {
            this.handleCounter();
        }, this.intervalSeconds);
    }

    ngOnDestroy(): void {
        clearInterval(this.interval);
        this.sound.stop();
    }

    private getCounterTime(): number {
        switch (this.counterTime) {
            case 'slow':
                return 90;
            case 'medium':
                return 60;
            case 'fast':
                return 30;
            default:
                return 60;
        }
    }

    private handleCounter(): void {
        this.counter--;

        if (this.counter === 10 && this.enabledSound) {
            this.sound.play();
        }

        if (this.counter === 0) {
            clearInterval(this.interval);
            if (this.enabledSound) this.sound.stop();
            this.finished.emit();
        }
    }
}
