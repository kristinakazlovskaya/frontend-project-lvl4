import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import AuthProvider from '../contexts/AuthProvider.jsx';
import store from '../slices/index.js';
import Header from './Header.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import ChatPage from '../pages/ChatPage.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import ContentProvider from '../contexts/ContentProvider.jsx';
import Modal from './Modal.jsx';

const App = () => (
  <Provider store={store}>
    <AuthProvider>
      <ContentProvider>
        <BrowserRouter>
          <div className="d-flex flex-column h-100">
            <Header />
            <Modal />
            <Routes>
              <Route path="*" element={<NotFoundPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/"
                element={(
                  <PrivateRoute>
                    <ChatPage />
                  </PrivateRoute>
                )}
              />
            </Routes>
          </div>
        </BrowserRouter>
      </ContentProvider>
    </AuthProvider>
  </Provider>
);

export default App;
