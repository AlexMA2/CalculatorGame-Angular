import { OperationPipe } from './operation.pipe';

describe('OperationPipe', () => {
    let pipe: OperationPipe;

    beforeEach(() => {
        pipe = new OperationPipe();
    });

    it('should create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should return the operator values converted into a readable string', () => {
        const operation = {
            firstNumber: 65,
            secondNumber: 35,
            operator: '+',
            result: 100,
        };
        const transformedValue = pipe.transform(operation);
        expect(transformedValue).toEqual('65 + 35');
    });
});
