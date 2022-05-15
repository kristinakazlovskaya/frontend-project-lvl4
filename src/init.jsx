import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import filter from 'leo-profanity';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import AuthProvider from './contexts/AuthProvider.jsx';
import store from './slices/index.js';
import ContentProvider from './contexts/ContentProvider.jsx';
import App from './components/App.jsx';
import ru from './locales/ru.js';

const init = async (socket) => {
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

  filter.add(filter.getDictionary('ru'));

  const rollbarConfig = {
    accessToken: '727490be71ca4ebfa3f32d1e901bd0f3',
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: 'production',
    },
  };

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
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
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
