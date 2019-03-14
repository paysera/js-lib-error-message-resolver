# @paysera/error-message-resolver

[![Build Status](https://travis-ci.com/paysera/js-lib-error-message-resolver.svg?branch=master)](https://travis-ci.com/paysera/js-lib-error-message-resolver)
[![Coverage Status](https://coveralls.io/repos/github/paysera/js-lib-error-message-resolver/badge.svg?branch=master)](https://coveralls.io/github/paysera/js-lib-error-message-resolver?branch=master)

## Services

### isHttpError

Checks if given error is `axios` http error.

Arguments:

| argument  | type  | default | required           | description |
|-----------|-------|---------|--------------------|-------------|
| **error** | `any` |         | :white_check_mark: | Threw error |

Returns:

| type        | description                                    |
|-------------|------------------------------------------------|
| **boolean** | True if error is http error, false - otherwise |

Example:
```js
const error = { config: {}, request: {} };
isHttpError(error); // => true
```

### isNetworkError

Checks if given error is `axios` network error. Network error can happen for a number of reasons, for example poor 
network, CSP, etc.

Arguments:

| argument  | type  | default | required           | description |
|-----------|-------|---------|--------------------|-------------|
| **error** | `any` |         | :white_check_mark: | Threw error |

Returns:

| type        | description                                       |
|-------------|---------------------------------------------------|
| **boolean** | True if error is network error, false - otherwise |

Example:
```js
const error = { request: { status: 0 } };
isNetworkError(error); // => true
```

### resolveErrorMessage
 
`resolveErrorMessage` checks if an error is HTTP and if it is, passes to the `resolveHttpErrorMessage` to be handled. If
error isn't HTTP, resolver will try to resolve correct message from `message.custom` or `message.default`.

Arguments:

| argument    | type                 | default | required           | description                                                        |
|-------------|----------------------|---------|--------------------|--------------------------------------------------------------------|
| **error**   | `any`                |         | :white_check_mark: | Error. `resolveErrorMessage` checks if it http error               |
| **message** | `ErrorMessageConfig` |         | :white_check_mark: | Messages for error                                                 |


Example of `message` config:
```js
const error = { config: {}, request: {}, response: { status: 400 } };

resolveErrorMessage(
    error,
    (new ErrorMessageConfig(
        (new HttpErrorMessageConfig('Http default message'))
            .setCustom((errorResponse) => {
                if (errorResponse.getStatus() <= 0 || errorResponse.getStatus() >= 500) {
                    return 'message';
                }

                if (
                    isObject(errorResponse.getData())
                    && isUndefined((errorResponse.getData()).error_description)
                ) {
                    return 'other_message';
                }

                return null;
            }),
        'Default message'
    ))
        .setCustom((errorData) => {
            if (errorData instanceof SomeError) {
                return 'any_message';
            }

            return null;
        }),
    );
```

### resolveHttpErrorMessage (private function)

`resolveHttpErrorMessage` trying to find correct message for given error.
It only resolves message for http errors so if given error is not http error it will return `message.default` message.
If it can't resolve message - returns `message.default`.

Flow:
- checks if it is http error
- checks if it is network error
- checks `response.data.error`
- checks `response.status` if it is 429
- checks `response.status`
- checks `response.data.errors`
- checks `response.data.error_description`
- checks `response.data.error` with default translations

Arguments:

| argument    | type                     | default | required           | description                                                                                                  |
|-------------|--------------------------|---------|--------------------|--------------------------------------------------------------------------------------------------------------|
| **error**   | `any`                    |         | :white_check_mark: | Error. `resolveHttpErrorMessage` checks if it http error                                                     |
| **message** | `HttpErrorMessageConfig` |         | :white_check_mark: | Messages for error. Default message and network error must be provided(`message.default`, `message.network`) |

> `message.status.429` - if function is provided this function will receive an additional argument `waitForDuration`(if
it find `gf-wait-for` property in response header). `waitForDuration` will be `moment` duration.

Returns:

| type       | description             |
|------------|-------------------------|
| **string** | Message for given error |


Example:
```js
const error = { config: {}, request: {}, response: { status: 400 } };
resolveHttpErrorMessage(error, { default: 'Default message', status: { 400: 'Not found' } }); // => Not found
```

Example of `message` config:
```js
resolveHttpErrorMessage(
    error,
    (new HttpErrorMessageConfig())
        .setDefault('Default message')
        .setNetwork('Network error message')
        .setErrorData((new ErrorDataMessageConfig()).setConfig({
            'unknown_error': 'Error: unknown_error', // string
            'rate_limit_exceeded': (errorResponse) => { // function
               return 'Error: rate_limit_exceeded';
            },
            'invalid_credentials': (errorResponse) => { // async function
               return Promise.resolve('Error: invalid_credentials');
            },
            'invalid_request': Promise.resolve('Error: invalid_request'), // async string
        }))
        .setStatus((new StatusMessageConfig()).setConfig({
            429: (errorResponse, waitForDuration) => { // too many request function
                if (waitForDuration !== null) {
                    return `Too many requests, wait for: ${waitFor.asSeconds()}`;
                }
                return 'Too many requests';
            },
            500: 'Response status: 500', // string
            501: (errorResponse) => { // function
                return 'Response status: 501';
            },
            502: (errorResponse) => { // async function
                return Promise.resolve('Response status: 502');
            },
            503: Promise.resolve('Response status: 503'), // async string
        }))
);
```


