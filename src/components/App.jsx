import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Header.jsx';
import Login from './Login.jsx';
import NotFound from './NotFound.jsx';

const App = () => (
  <BrowserRouter>
    <div className="d-flex flex-column h-100">
      <Header />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  </BrowserRouter>
);

export default App;
