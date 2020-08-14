import React from "react";
import {
  Navbar,
  Nav,
  NavbarText
} from "reactstrap";

export const Footer = props => {
  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <Nav className="mr-auto" navbar>
        <NavbarText>All rights reserved @ 2020 . Frontline Ed</NavbarText>
        </Nav>
        <NavbarText>All rights reserved @ 2020</NavbarText>
      </Navbar>
    </div>
  );
};

