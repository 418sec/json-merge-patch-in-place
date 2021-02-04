import { patch } from '../src';

describe('Tests:', () => {

    test('patches a value', () => {
        const item = {
            a: 42
        };
        patch(item, { a: 100 });
        expect(item).toStrictEqual({
            a: 100
        });
    });

    test('patches a value', () => {
        const item: { a: number, b?: string } = {
            a: 42
        };

        patch(item, { b: "hello" });
        expect(item).toStrictEqual({
            a: 42,
            b: "hello"
        });
    });

    test('clears a value', () => {
        const item: { a: number, b?: string | null } = {
            a: 42,
            b: "hello"
        };

        patch(item, { b: null });
        expect(item).toStrictEqual({
            a: 42,
            b: null
        });
    });

    test('patches recursive values', () => {
        const item = {
            a: 42,
            b: {
                c: true,
                d: "foo"
            }
        };

        patch(item, { b: { d: "hello" } });
        expect(item).toStrictEqual({
            a: 42,
            b: {
                c: true,
                d: "hello"
            }
        });
    });

    test('patches recursive values', () => {
        const item: { a: number, b?: { c: boolean, d: string } | null } = {
            a: 42,
            b: {
                c: true,
                d: "foo"
            }
        };

        patch(item, { b: { d: "hello" } });
        expect(item).toStrictEqual({
            a: 42,
            b: {
                c: true,
                d: "hello"
            }
        });
    });


    test('patches delete values', () => {
        const item: { a: number, b: { c: boolean, d: string | null } } = {
            a: 42,
            b: {
                c: true,
                d: "foo"
            }
        };

        patch(item, { b: { d: null } });
        expect(item).toStrictEqual({
            a: 42,
            b: {
                c: true,
                d: null
            }
        });
    });

    test('patches delete objects', () => {
        const item: { a: number, b?: { c: boolean, d: string } | null } = {
            a: 42,
            b: {
                c: true,
                d: "foo"
            }
        };

        patch(item, { b: null });
        expect(item).toStrictEqual({
            a: 42,
            b: null
        });
    });

    test('patches replace arrays', () => {
        const item = {
            a: 42,
            b: {
                c: [1, 2, 3],
                d: "foo"
            }
        };

        patch(item, { b: { c: [3, 4, 5] } });
        expect(item).toStrictEqual({
            a: 42,
            b: {
                c: [3, 4, 5],
                d: "foo"
            }
        });
    });

    test('patches can contain multiple items', () => {
        const item = {
            a: 42,
            b: {
                c: [1, 2, 3],
                d: "foo"
            },
            e: {
                f: {
                    g: true,
                    h: false
                },
                i: 50,
                j: "baz"
            }
        };

        patch(item, {
            b: {
                c: [3, 4, 5],
                d: "bar"
            },
            e: {
                f: {
                    g: false
                }
            }
        });
        expect(item).toStrictEqual({
            a: 42,
            b: {
                c: [3, 4, 5],
                d: "bar"
            },
            e: {
                f: {
                    g: false,
                    h: false
                },
                i: 50,
                j: "baz"
            }
        });
    });

    test('patches cannot pollute prototype', () => {
        const item = {};

        patch(item, JSON.parse('{"__proto__": {"polluted": true}}'));
        expect(Object.keys(Object.prototype).includes('polluted')).toBe(false);
    });

});
