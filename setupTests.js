import i18next from 'i18next';

import enTranslations from './translations/error-message-resolver/en.json';

i18next.init({
    appendNamespaceToCIMode: true,
    lng: 'en',
    resources: {
        en: {
            'error-message-resolver': enTranslations,
        },
    },
    keySeparator: '',
    interpolation: {
        prefix: '%',
        suffix: '%',
        escapeValue: false,
    },
});
