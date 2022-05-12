import React from 'react';
import { Navbar, NavbarBrand, NavbarText, NavbarToggler, UncontrolledDropdown, DropdownMenu, NavItem, Nav, NavLink, DropdownToggle, Collapse, DropdownItem } from 'reactstrap';

function Navbar1(props) {
    return (
        <div>
            <Navbar
                color="dark"
                dark
                expand="md"
                fixed="top"
                light
            >
                <NavbarBrand href="/">
                    {props.title + ' ' + props.counter}
                </NavbarBrand>
                <NavbarToggler onClick={function noRefCheck() { }} />
                <Collapse navbar>
                    <Nav
                        className="me-auto"
                        navbar
                    >
                        <NavItem>
                            <NavLink href="/components/">
                                Components
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="https://github.com/reactstrap/reactstrap">
                                GitHub
                            </NavLink>
                        </NavItem>
                        <UncontrolledDropdown
                            inNavbar
                            nav
                        >
                            <DropdownToggle
                                caret
                                nav
                            >
                                Options
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    Option 1
                                </DropdownItem>
                                <DropdownItem>
                                    Option 2
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    Reset
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                    <NavbarText>
                        Simple Text
                    </NavbarText>
                </Collapse>
            </Navbar>
        </div>
    )
}

export default Navbar1