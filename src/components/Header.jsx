import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth.js';

const Header = () => {
  const { t } = useTranslation();

  const auth = useAuth();

  return (
    <Navbar bg="white" variant="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand href="/">{t('header.logo')}</Navbar.Brand>
        {auth.loggedIn && <Button variant="primary" onClick={auth.logOut}>{t('header.button')}</Button>}
      </Container>
    </Navbar>
  );
};

export default Header;
