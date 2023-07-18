import { useState } from 'react';
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

import { getUser } from '../../../redux/usersRedux';
import { useSelector } from 'react-redux';

const MainMenu = () => {
  const loggedInUser = useSelector(getUser);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    window.location.reload();
  };

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">BorderAds</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar className="justify-content-between">
          <div>
          </div>
          <div>
            <Nav className="ml-auto align-items-center" navbar>
                <NavItem>
                  <NavLink href="/logout">
                  {loggedInUser &&<Button outline color="warning" onClick={handleLogout}>
                      Logout
                    </Button>}
                  </NavLink>
                </NavItem>
                  <NavItem>
                    <NavLink href="/login">
                    {!loggedInUser &&<Button outline color="warning">
                        Login
                      </Button>}
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/register">
                    {!loggedInUser &&<Button outline color="warning">
                        Register
                      </Button>}
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
