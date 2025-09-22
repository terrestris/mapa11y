import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import { resources } from '../i18n';

// eslint-disable-next-line import/no-named-as-default-member
const i18n = i18next.createInstance();

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  ns: ['mapa11y'],
  defaultNS: 'mapa11y',
  resources: {
    en: { mapa11y: resources.en },
    de: { mapa11y: resources.de },
  },
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
