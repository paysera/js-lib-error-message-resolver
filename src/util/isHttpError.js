import get from 'lodash/get';
import isObject from 'lodash/isObject';

export default error => (
    (
        isObject(get(error, 'config'))
        && isObject(get(error, 'request'))
    )
);
