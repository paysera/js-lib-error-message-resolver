import resolveErrorMessage from '../resolveErrorMessage';
import HttpErrorMessageConfig from '../entity/HttpErrorMessageConfig';
import ErrorMessageConfig from '../entity/ErrorMessageConfig';

describe('resolveErrorMessage', () => {
    test.each([
        [
            'Not http error',
            null,
            new ErrorMessageConfig(new HttpErrorMessageConfig('Default message'), 'Error Default message'),
            'Error Default message',
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
            'Some error',
        ],
    ])(
        '%s',
        async (title, error, message, expected) => {
            expect(await resolveErrorMessage(error, message)).toStrictEqual(expected);
        },
    );
});
