import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
const NavBar = () => {
  return (
<Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">E-Commerce</Navbar.Brand>
        <Nav className="ml-auto">
          <NavLink to="/" className="nav-link" style={{ color: 'white' }}>
            Home
          </NavLink>
          <NavLink to="/orderHistory" className="nav-link" style={{ color: 'white' }}>
            My orders
          </NavLink>
          <NavLink to="/cart" className="nav-link" style={{ color: 'white' }}>
            Cart
          </NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
