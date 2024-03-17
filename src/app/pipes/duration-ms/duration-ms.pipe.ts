import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'durationMs',
})
export class DurationMsPipe implements PipeTransform {
    transform(value?: number): string {
        if (value === undefined) {
            return '0 s';
        }
        return (value / 1000).toFixed(2) + ' s';
    }
}
