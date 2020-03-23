import resolveErrorSecondaryMessages from '../resolveErrorSecondaryMessages';

describe('resolveErrorSecondaryMessages', () => {
    test.each([
        [
            'Not http error',
            { config: {} },
            [],
        ],
        [
            'Http error without correlation key in response header',
            {
                config: {},
                request: {},
                response: {
                    status: 500,
                    data: {},
                    headers: {
                        'content-encoding': 'gzip',
                    },
                },
            },
            [],
        ],
        [
            'Http error with correlation key in response header',
            {
                config: {},
                request: {},
                response: {
                    status: 500,
                    data: {},
                    headers: {
                        'paysera-correlation-id': 'abc',
                    },
                },
            },
            ['Error code: abc'],
        ],
    ])(
        '%s',
        async (title, error, expected) => {
            expect(await resolveErrorSecondaryMessages(error)).toStrictEqual(expected);
        },
    );
});
