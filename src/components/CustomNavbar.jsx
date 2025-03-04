import { React, useState } from "react";
import Logo from "../MovieLogo.png";
import { NavLink as ReactLink } from "react-router-dom";
import {
  Navbar,
  NavLink,
  NavbarBrand,
  Collapse,
  NavItem,
  Nav,
  NavbarToggler,
  Input,
} from "reactstrap";

const CustomNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Navbar expand="md" fixed="" className="px-3 bg-yellow-600 pt-0 pb-0">
      <NavbarBrand>
        <img
          className="w-[50px] transition delay-100 duration-200 ease-in-out hover:-translate-y-1 hover:scale-100"
          src={Logo}
          alt=""
        />
      </NavbarBrand>
      <NavbarToggler
        className="border-black p-1"
        onClick={() => setIsOpen(!isOpen)}
      />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="" navbar>
          <NavItem>
            <NavLink
              tag={ReactLink}
              to="/"
              className="hover:!underline !underline-offset-4 !font-semibold transition delay-100 duration-200 ease-in-out hover:-translate-y-1 hover:scale-100 me-3"
            >
              Movies
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              tag={ReactLink}
              to="/watchlist"
              className="hover:!underline !underline-offset-4 !font-semibold transition delay-100 duration-200 ease-in-out hover:-translate-y-1 hover:scale-100"
            >
              Watchlist
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
