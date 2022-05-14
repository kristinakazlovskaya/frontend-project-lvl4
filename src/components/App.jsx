import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './Header.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import SignUpPage from '../pages/SignUpPage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import ChatPage from '../pages/ChatPage.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import Modal from './Modal.jsx';

const App = () => (
  <div className="d-flex flex-column h-100">
    <Header />
    <Modal />
    <Routes>
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
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
);

export default App;
