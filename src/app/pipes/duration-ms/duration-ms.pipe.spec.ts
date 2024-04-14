import { DurationMsPipe } from './duration-ms.pipe';

describe('DurationMsPipe', () => {
    let pipe: DurationMsPipe;

    beforeEach(() => {
        pipe = new DurationMsPipe();
    });

    it('should create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should return "0 s" when value is undefined', () => {
        const transformedValue = pipe.transform(undefined);
        expect(transformedValue).toEqual('0 s');
    });

    it('should convert milliseconds to seconds with two decimal places', () => {
        const milliseconds = 1500;
        const transformedValue = pipe.transform(milliseconds);
        expect(transformedValue).toEqual('1.50 s');
    });

    it('should handle milliseconds greater than 1000', () => {
        const milliseconds = 3000;
        const transformedValue = pipe.transform(milliseconds);
        expect(transformedValue).toEqual('3.00 s');
    });
});
