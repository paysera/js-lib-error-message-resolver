import resolveByResponseErrors from '../resolveByResponseErrors';
import ErrorResponse from '../../entity/ErrorResponse';

describe('resolveByResponseStatus', () => {
    test.each([
        [
            'Empty error response',
            new ErrorResponse(),
            null,
        ],
        [
            'Response data is empty object',
            (new ErrorResponse()).setData({}),
            null,
        ],
        [
            'Response data errors is array of strings',
            (new ErrorResponse()).setData({ errors: ['error1', 'error2'] }),
            null,
        ],
        [
            'Response data errors is array of strings',
            (new ErrorResponse()).setData({ errors: null }),
            null,
        ],
        [
            'Resolves first message from response data errors',
            (new ErrorResponse()).setData({
                errors: [
                    'error0',
                    { message: 'error1' },
                    { message: 'error2' },
                ],
            }),
            'error1',
        ],
    ])(
        '%s',
        async (title, errorResponse, expected) => {
            expect(await resolveByResponseErrors(errorResponse)).toStrictEqual(expected);
        },
    );
});
