import { Pipe, PipeTransform } from '@angular/core';
import { Operation } from './operation.model';

@Pipe({
    name: 'operation',
})
export class OperationPipe implements PipeTransform {
    transform(value: Operation): string {
        return `${value.firstNumber} ${value.operator} ${value.secondNumber}`;
    }
}
