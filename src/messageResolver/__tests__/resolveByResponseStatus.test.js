import resolveByResponseStatus from '../resolveByResponseStatus';
import ErrorResponse from '../../entity/ErrorResponse';
import ErrorStatusMessageConfig from '../../entity/ErrorStatusMessageConfig';

describe('resolveByResponseStatus', () => {
    test.each([
        [
            'Response status is null',
            new ErrorResponse(),
            new ErrorStatusMessageConfig(),
            null,
        ],
        [
            'Resolves message(string) by status',
            (new ErrorResponse()).setStatus(2),
            (new ErrorStatusMessageConfig()).setConfig({
                1: 'First error message',
                2: 'Second error message',
            }),
            'Second error message',
        ],
        [
            'Resolves message(function) by status',
            (new ErrorResponse()).setStatus(2),
            (new ErrorStatusMessageConfig()).setConfig({
                1: 'First error message',
                2: () => 'Second error message',
            }),
            'Second error message',
        ],
        [
            'Resolves message(function that returns promise) by status',
            (new ErrorResponse()).setStatus(2),
            (new ErrorStatusMessageConfig()).setConfig({
                1: 'First error message',
                2: () => Promise.resolve('Second error message'),
            }),
            'Second error message',
        ],
    ])(
        '%s',
        async (title, errorResponse, statusMessage, expected) => {
            expect(await resolveByResponseStatus(errorResponse, statusMessage)).toStrictEqual(expected);
        },
    );
});
