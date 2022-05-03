import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthProvider from '../contexts/AuthProvider.jsx';
import Header from './Header.jsx';
import Login from './Login.jsx';
import NotFound from './NotFound.jsx';
import Main from './Main.jsx';
import PrivateRoute from './PrivateRoute.jsx';

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <Header />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={(
              <PrivateRoute>
                <Main />
              </PrivateRoute>
            )}
          />
        </Routes>
      </div>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
