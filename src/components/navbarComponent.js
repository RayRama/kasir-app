import React from "react";
import { Navbar, Container } from "react-bootstrap";
import logo from "../logo.svg";

const NavbarComponent = () => {
  return (
    <Navbar expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="#">
          <img alt="logo" src={logo} width={50} />
          <strong>Kasir</strong> App
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
