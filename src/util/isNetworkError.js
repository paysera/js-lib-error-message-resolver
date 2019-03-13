import get from 'lodash/get';

export default error => get(error, 'request.status') <= 0;
