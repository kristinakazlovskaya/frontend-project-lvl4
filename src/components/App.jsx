import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import AuthProvider from '../contexts/AuthProvider.jsx';
import store from '../slices/index.js';
import Header from './Header.jsx';
import Login from './Login.jsx';
import NotFound from './NotFound.jsx';
import Main from './Main.jsx';
import PrivateRoute from './PrivateRoute.jsx';

const App = () => (
  <Provider store={store}>
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
  </Provider>
);

export default App;
