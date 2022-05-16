import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import SignupPage from '../pages/SignupPage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import ChatPage from '../pages/ChatPage.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import Modal from './Modal.jsx';

const App = () => (
  <>
    <div className="d-flex flex-column h-100">
      <Header />
      <Modal />
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
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
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  </>
);

export default App;
