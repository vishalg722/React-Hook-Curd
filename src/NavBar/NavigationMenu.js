import React from "react";
import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  Button
} from "reactstrap";

import { useSelector } from 'react-redux';

export const NavigationMenu = props => {
  const user = useSelector(state => state.authentication.user);
  
  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href="/">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/list">Routes</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/register">Register</NavLink>
          </NavItem>
        </Nav>
        
        <Nav>
         <NavItem>
         { user && user.token ? <NavLink href="/login"><Button color="secondary">Logout</Button></NavLink>
         : <NavLink href="/login">Login</NavLink>
           
         }
         </NavItem>  
        </Nav>
        
      </Navbar>
    </div>
  );
};
