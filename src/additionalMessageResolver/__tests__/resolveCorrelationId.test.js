import resolveCorrelationId from '../resolveCorrelationId';

describe('resolveCorrelationId', () => {
    test.each([
        [
            'For not http error returns null',
            {
                config: {},
            },
            null,
        ],
        [
            'For http errors with a status lower than 500 and not equal to 401 and 403 returns null',
            {
                config: {},
                request: {},
                response: {
                    status: 400,
                    data: {},
                    headers: {
                        'paysera-correlation-id': 'abc',
                    },
                },
            },
            null,
        ],
        [
            'For http errors with a status equal to 401 returns `paysera-correlation-id` from response headers',
            {
                config: {},
                request: {},
                response: {
                    status: 401,
                    data: {},
                    headers: {
                        'paysera-correlation-id': 'abc',
                    },
                },
            },
            'Error code: abc',
        ],
        [
            'For http errors with a status equal to 403 returns `paysera-correlation-id` from response headers',
            {
                config: {},
                request: {},
                response: {
                    status: 403,
                    data: {},
                    headers: {
                        'paysera-correlation-id': 'abc',
                    },
                },
            },
            'Error code: abc',
        ],
        [
            'For http errors with a status equal to 500 returns `paysera-correlation-id` from response headers',
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
            'Error code: abc',
        ],
        [
            'For http errors with a status greater than 500 returns `paysera-correlation-id` from response headers',
            {
                config: {},
                request: {},
                response: {
                    status: 503,
                    data: {},
                    headers: {
                        'paysera-correlation-id': 'abc',
                    },
                },
            },
            'Error code: abc',
        ],
    ])(
        '%s',
        async (desc, error, expected) => {
            expect(await resolveCorrelationId(error)).toStrictEqual(expected);
        },
    );
});
