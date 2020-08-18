import resolveHttpErrorMessage from '../resolveHttpErrorMessage';
import HttpErrorMessageConfig from '../entity/HttpErrorMessageConfig';
import ErrorDataMessageConfig from '../entity/ErrorDataMessageConfig';
import ErrorStatusMessageConfig from '../entity/ErrorStatusMessageConfig';
import translations from '../../translations/error-message-resolver/en.json';

describe('resolveHttpErrorMessage', () => {
    test.each([
        [
            'Not http error',
            null,
            (new HttpErrorMessageConfig('Default message')),
            'Default message',
        ],
        [
            'Network error',
            { request: { status: 0 }, config: {} },
            (new HttpErrorMessageConfig('Default message'))
                .setNetwork('Custom network error message'),
            'Custom network error message',
        ],
        [
            'Network error without given error translation',
            { request: { status: 0 }, config: {} },
            new HttpErrorMessageConfig('Default message'),
            translations.network_error,
        ],

        [
            'Resolves message by response data error',
            {
                config: {},
                request: {},
                response: { data: { error: 'unknown_error' } },
            },
            (new HttpErrorMessageConfig('Default message')).setErrorData(
                (new ErrorDataMessageConfig()).setConfig({ unknown_error: 'Invalid request' }),
            ),
            'Invalid request',
        ],
        [
            'Resolves default message if translation for given error is not provided',
            {
                config: {},
                request: {},
                response: { data: { error: 'unknown_error' } },
            },
            new HttpErrorMessageConfig('Default message'),
            'Default message',
        ],

        [
            'Resolves message by response status',
            {
                config: {},
                request: {},
                response: { status: 404 },
            },
            (new HttpErrorMessageConfig('Default message')).setStatus((new ErrorStatusMessageConfig()).setConfig({ 404: 'Not found' })),
            'Not found',
        ],
        [
            'Resolves default message by response status if translation for given status is not provided',
            {
                config: {},
                request: {},
                response: { status: 404 },
            },
            new HttpErrorMessageConfig('Default message'),
            'Default message',
        ],

        [
            'Resolves first message from response data errors field',
            {
                config: {},
                request: {},
                response: { data: { errors: [{ message: 'Internal error' }] } },
            },
            new HttpErrorMessageConfig('Default message'),
            'Internal error',
        ],

        [
            'Resolves message from response data error description field',
            {
                config: {},
                request: {},
                response: { data: { error_description: 'Error description' } },
            },
            new HttpErrorMessageConfig('Default message'),
            'Error description',
        ],

        [
            'Resolves default message by response data error field if no translations was provided',
            {
                config: {},
                request: {},
                response: { data: { error: 'invalid_parameters' } },
            },
            new HttpErrorMessageConfig('Default message'),
            translations.invalid_parameters,
        ],
    ])(
        '%s',
        async (title, error, message, expected) => {
            expect(await resolveHttpErrorMessage(error, message)).toStrictEqual(expected);
        },
    );

    test.each([
        [
            {
                status: 500,
                data: {
                    error: 'internal_server_error',
                    errors: null,
                    error_description: 'Internal error',
                },
            },
            'Internal server error',
        ],
        [
            {
                status: 400,
                data: {
                    error: 'invalid_request',
                    errors: [{ message: 'Email is required' }],
                    error_description: 'Invalid request',
                },
            },
            'Invalid request(error data)',
        ],
        [
            {
                status: 400,
                data: {
                    errors: [{ message: 'Email is required' }],
                    error_description: 'Invalid request',
                },
            },
            'Invalid request(status)',
        ],
        [
            {
                data: {
                    errors: [{ message: 'Email is required' }],
                    error_description: 'Invalid request',
                },
            },
            'Email is required',
        ],
        [
            { data: { error_description: 'Invalid request' } },
            'Invalid request',
        ],
        [
            { data: { error: 'forbidden' } },
            translations.forbidden,
        ],
    ])(
        '%# order',
        async (errorResponse, expected) => {
            expect(await resolveHttpErrorMessage(
                {
                    config: {},
                    request: {},
                    response: errorResponse,
                },
                new HttpErrorMessageConfig('Default message')
                    .setNetwork('Network error')
                    .setErrorData(
                        (new ErrorDataMessageConfig()).setConfig({ invalid_request: 'Invalid request(error data)' }),
                    )
                    .setStatus(
                        (new ErrorStatusMessageConfig()).setConfig({ 400: 'Invalid request(status)' }),
                    ),
            )).toStrictEqual(expected);
        },
    );
});
