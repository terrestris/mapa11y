import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import deTranslation from './locales/de.json';
import enTranslation from './locales/en.json';

export const NAMESPACE = 'mapa11y';

export const resources = {
  en: enTranslation.mapa11y,
  de: deTranslation.mapa11y,
};

let i18nInstance: typeof i18next | null = null;

const getI18n = () => {
  if (!i18nInstance) {
    // eslint-disable-next-line import/no-named-as-default-member
    i18nInstance = i18next.createInstance();
    i18nInstance.use(initReactI18next).init({
      lng: 'en',
      fallbackLng: 'en',
      ns: [NAMESPACE],
      defaultNS: NAMESPACE,
      resources: {
        en: { [NAMESPACE]: resources.en },
        de: { [NAMESPACE]: resources.de },
      },
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
    });
  }
  return i18nInstance;
};

export const addTranslations = (
  externalI18n?: typeof i18next
): Promise<void> => {
  return new Promise(resolve => {
    if (externalI18n) {
      Object.entries(resources).forEach(([lng, resource]) => {
        externalI18n.addResourceBundle(lng, NAMESPACE, resource, true, true);
      });
    } else {
      getI18n();
    }
    resolve();
  });
};

getI18n();

export default i18nInstance;
