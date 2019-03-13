import isNetworkError from '../isNetworkError';

describe('isNetworkError', () => {
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
        [{ request: { status: 500 } }],
    ])(
        'error: %p is not network error',
        (error) => {
            expect(isNetworkError(error)).toStrictEqual(false);
        },
    );

    test.each([
        [{ request: { status: 0 } }],
    ])(
        'error: %p is network error',
        (error) => {
            expect(isNetworkError(error)).toStrictEqual(true);
        },
    );
});
