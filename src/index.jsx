import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import AuthProvider from './contexts/AuthProvider.jsx';
import store from './slices/index.js';
import ContentProvider from './contexts/ContentProvider.jsx';
import App from './components/App.jsx';

const init = (socket) => (
  <Provider store={store}>
    <AuthProvider>
      <ContentProvider socket={socket}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ContentProvider>
    </AuthProvider>
  </Provider>
);

export default init;
