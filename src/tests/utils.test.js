// some basic utility tests
import { describe, it, expect } from 'vitest';

describe('Basic utility tests', () => {

    it('string concatenation works', () => {
        const result = 'Hello' + ' ' + 'World';
        expect(result).toBe('Hello World');
    });

    it('array filter works', () => {
        const arr = [1, 2, 3, 4, 5];
        const filtered = arr.filter(n => n > 3);
        expect(filtered).toEqual([4, 5]);
    });

    it('object spread works', () => {
        const obj1 = { a: 1, b: 2 };
        const obj2 = { ...obj1, c: 3 };
        expect(obj2).toEqual({ a: 1, b: 2, c: 3 });
    });

    it('array map works', () => {
        const arr = [1, 2, 3];
        const doubled = arr.map(n => n * 2);
        expect(doubled).toEqual([2, 4, 6]);
    });

    it('json parse and stringify', () => {
        const obj = { name: 'Test', value: 123 };
        const str = JSON.stringify(obj);
        const parsed = JSON.parse(str);
        expect(parsed.name).toBe('Test');
    });
});
