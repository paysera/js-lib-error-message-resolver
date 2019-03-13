import resolveByResponseError from '../resolveByResponseError';
import ErrorResponse from '../../entity/ErrorResponse';
import ErrorDataMessageConfig from '../../entity/ErrorDataMessageConfig';

describe('resolveByResponseError', () => {
    test.each([
        [
            'Empty error response',
            new ErrorResponse(),
            new ErrorDataMessageConfig(),
            null,
        ],
        [
            'Response data is empty object',
            (new ErrorResponse()).setData({}),
            new ErrorDataMessageConfig(),
            null,
        ],
        [
            'Response data error is null',
            (new ErrorResponse()).setData({ error: null }),
            new ErrorDataMessageConfig(),
            null,
        ],
        [
            'Resolves message(string) by response data error',
            (new ErrorResponse()).setData({ error: 'error2' }),
            (new ErrorDataMessageConfig()).setConfig({
                error1: 'First error message',
                error2: 'Second error message',
            }),
            'Second error message',
        ],
        [
            'Resolves message(function) by response data error',
            (new ErrorResponse()).setData({ error: 'error2' }),
            (new ErrorDataMessageConfig()).setConfig({
                error1: 'First error message',
                error2: () => 'Second error message',
            }),
            'Second error message',
        ],
        [
            'Resolves message(function that returns promise) by response data error',
            (new ErrorResponse()).setData({ error: 'error2' }),
            (new ErrorDataMessageConfig()).setConfig({
                error1: 'First error message',
                error2: () => Promise.resolve('Second error message'),
            }),
            'Second error message',
        ],
    ])(
        '%s',
        async (title, errorResponse, errorDataMessage, expected) => {
            expect(await resolveByResponseError(errorResponse, errorDataMessage)).toStrictEqual(expected);
        },
    );
});
