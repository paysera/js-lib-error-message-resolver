import HttpErrorMessageConfig from '../HttpErrorMessageConfig';
import ErrorDataMessageConfig from '../ErrorDataMessageConfig';
import ErrorStatusMessageConfig from '../ErrorStatusMessageConfig';

describe('HttpErrorMessageConfig', () => {
    test.each([
        [
            'default message merge',
            new HttpErrorMessageConfig('Default message 1'),
            new HttpErrorMessageConfig('Default message 2'),
            new HttpErrorMessageConfig('Default message 1'),
        ],

        [
            'network message merge when initial config is empty',
            new HttpErrorMessageConfig('Default message'),
            (new HttpErrorMessageConfig('Default message')).setNetwork('Network error'),
            (new HttpErrorMessageConfig('Default message')).setNetwork('Network error'),
        ],
        [
            'network message merge',
            (new HttpErrorMessageConfig('Default message')).setNetwork('Network error 1'),
            (new HttpErrorMessageConfig('Default message')).setNetwork('Network error 2'),
            (new HttpErrorMessageConfig('Default message')).setNetwork('Network error 1'),
        ],

        [
            'too many requests message merge when initial config is empty',
            new HttpErrorMessageConfig('Default message'),
            (new HttpErrorMessageConfig('Default message')).setTooManyRequests('Too many requests'),
            (new HttpErrorMessageConfig('Default message')).setTooManyRequests('Too many requests'),
        ],
        [
            'too many requests message merge',
            (new HttpErrorMessageConfig('Default message')).setTooManyRequests('Too many requests 1'),
            (new HttpErrorMessageConfig('Default message')).setTooManyRequests('Too many requests 2'),
            (new HttpErrorMessageConfig('Default message')).setTooManyRequests('Too many requests 1'),
        ],

        [
            'status message merge with different status config',
            (new HttpErrorMessageConfig('Default message')).setStatus((new ErrorStatusMessageConfig()).setConfig({ 500: 'Internal server error' })),
            (new HttpErrorMessageConfig('Default message')).setStatus((new ErrorStatusMessageConfig()).setConfig({ 404: 'Not found' })),
            (new HttpErrorMessageConfig('Default message')).setStatus((new ErrorStatusMessageConfig()).setConfig({
                500: 'Internal server error',
                404: 'Not found',
            })),
        ],
        [
            'status message merge with same status config',
            (new HttpErrorMessageConfig('Default message')).setStatus((new ErrorStatusMessageConfig()).setConfig({ 404: 'Not found 1' })),
            (new HttpErrorMessageConfig('Default message')).setStatus((new ErrorStatusMessageConfig()).setConfig({ 404: 'Not found 2' })),
            (new HttpErrorMessageConfig('Default message')).setStatus((new ErrorStatusMessageConfig()).setConfig({ 404: 'Not found 1' })),
        ],

        [
            'error data message merge with different error data config',
            (new HttpErrorMessageConfig('Default message')).setErrorData((new ErrorDataMessageConfig()).setConfig({ invalid_request: 'Invalid request' })),
            (new HttpErrorMessageConfig('Default message')).setErrorData((new ErrorDataMessageConfig()).setConfig({ forbidden: 'Forbidden' })),
            (new HttpErrorMessageConfig('Default message')).setErrorData((new ErrorDataMessageConfig()).setConfig({
                invalid_request: 'Invalid request',
                forbidden: 'Forbidden',
            })),
        ],
        [
            'error data message merge with same error data config',
            (new HttpErrorMessageConfig('Default message')).setErrorData((new ErrorDataMessageConfig()).setConfig({ invalid_request: 'Invalid request 1' })),
            (new HttpErrorMessageConfig('Default message')).setErrorData((new ErrorDataMessageConfig()).setConfig({ invalid_request: 'Invalid request 2' })),
            (new HttpErrorMessageConfig('Default message')).setErrorData((new ErrorDataMessageConfig()).setConfig({ invalid_request: 'Invalid request 1' })),
        ],
    ])(
        'message configs merge: %s',
        (title, messageConfig, sourceMessageConfig, expectedMessageConfig) => {
            expect(HttpErrorMessageConfig.merge(messageConfig, sourceMessageConfig))
                .toStrictEqual(expectedMessageConfig);
        },
    );

    test('custom function merge', () => {
        const customFunction1 = () => {};
        const customFunction2 = () => {};

        const messageConfig = (new HttpErrorMessageConfig('Default message')).setCustom(customFunction1);
        const sourceMessageConfig = (new HttpErrorMessageConfig('Default message')).setCustom(customFunction2);
        const expectedMessageConfig = (new HttpErrorMessageConfig('Default message')).setCustom(customFunction1);

        expect(HttpErrorMessageConfig.merge(messageConfig, sourceMessageConfig)).toStrictEqual(expectedMessageConfig);
    });
});
