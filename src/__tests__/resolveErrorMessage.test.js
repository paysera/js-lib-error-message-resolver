import resolveErrorMessage from '../resolveErrorMessage';
import HttpErrorMessageConfig from '../entity/HttpErrorMessageConfig';
import ErrorMessageConfig from '../entity/ErrorMessageConfig';
import ErrorMessage from '../entity/ErrorMessage';

describe('resolveErrorMessage', () => {
    test.each([
        [
            'Not http error',
            null,
            new ErrorMessageConfig(new HttpErrorMessageConfig('Default message'), 'Error Default message'),
            new ErrorMessage('Error Default message'),
        ],
        [
            'Resolve custom message',
            { data: true },
            new ErrorMessageConfig(new HttpErrorMessageConfig('Default message'), 'Error default message')
                .setCustom((error) => {
                    if (error.data) {
                        return 'Some error';
                    }

                    return null;
                }),
            new ErrorMessage('Some error'),
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
            new ErrorMessageConfig(new HttpErrorMessageConfig('Default message'), 'Error Default message'),
            new ErrorMessage('Default message', ['Error code: abc']),
        ],
    ])(
        '%s',
        async (title, error, message, expected) => {
            expect(await resolveErrorMessage(error, message)).toStrictEqual(expected);
        },
    );
});
