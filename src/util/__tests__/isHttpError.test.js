import isHttpError from '../isHttpError';

describe('isHttpError', () => {
    test.each([
        [null],
        [true],
        [false],
        [0],
        ['httpError'],
        [{}],
        [{ config: {} }],
        [{ request: {} }],
        [{ config: 'config', request: 'request' }],
    ])(
        'error: %p is not http error',
        (error) => {
            expect(isHttpError(error)).toStrictEqual(false);
        },
    );

    test.each([
        [{ config: {}, request: {} }, true],
    ])(
        'error: %p is http error',
        (error) => {
            expect(isHttpError(error)).toStrictEqual(true);
        },
    );
});
