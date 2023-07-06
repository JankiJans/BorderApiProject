import { useState } from 'react';
import { Form } from 'react-bootstrap';
import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

const MainMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">BorderAds</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar className="justify-content-between">
          <div>
            <Nav className="ml-auto align-items-center" navbar>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
              </Form>
            </Nav>
          </div>
          <div>
            <Nav className="ml-auto align-items-center" navbar>
              <NavItem>
                <NavLink href="/login">
                  <Button outline color="warning">
                    Login
                  </Button>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/register">
                  <Button outline color="warning">
                    Register
                  </Button>
                </NavLink>
              </NavItem>
            </Nav>
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default MainMenu;
