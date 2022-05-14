import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import useAuth from '../hooks/useAuth.js';

const Header = () => {
  const auth = useAuth();

  return (
    <Navbar bg="white" variant="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
        {auth.loggedIn && <Button variant="primary" onClick={auth.logOut}>Выйти</Button>}
      </Container>
    </Navbar>
  );
};

export default Header;
