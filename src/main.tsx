/* eslint-disable import/no-named-as-default-member */
import React from 'react';

import i18next from 'i18next';
import ReactDOM from 'react-dom/client';
import { initReactI18next } from 'react-i18next';

import App from './App';
import { addTranslations } from './i18n';
import './index.css';

i18next.use(initReactI18next).init({
  lng: 'de',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

await addTranslations(i18next);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
