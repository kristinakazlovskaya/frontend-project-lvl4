import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import io from 'socket.io-client';
import filter from 'leo-profanity';
import AuthProvider from './contexts/AuthProvider.jsx';
import store from './slices/index.js';
import ContentProvider from './contexts/ContentProvider.jsx';
import App from './components/App.jsx';
import ru from './locales/ru.js';

const init = async () => {
  const i18nextInstance = i18n.createInstance();

  await i18nextInstance
    .use(initReactI18next)
    .init({
      debug: false,
      lng: 'ru',
      resources: {
        ru,
      },
    });

  const socket = io();

  filter.add(filter.getDictionary('ru'));

  return (
    <Provider store={store}>
      <AuthProvider>
        <ContentProvider socket={socket}>
          <BrowserRouter>
            <I18nextProvider i18n={i18nextInstance}>
              <App />
            </I18nextProvider>
          </BrowserRouter>
        </ContentProvider>
      </AuthProvider>
    </Provider>
  );
};

export default init;
