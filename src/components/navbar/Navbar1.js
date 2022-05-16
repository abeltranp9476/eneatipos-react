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
                style={{ backgroundColor: 'red' }}
            >
                <NavbarBrand href="/">
                    {props.title} {(props.start) ? (+ ' ' + props.counter + '/' + props.total) : (<></>)}
                </NavbarBrand>
                <NavbarToggler onClick={function noRefCheck() { }} />
                <Collapse navbar>
                    <Nav
                        className="me-auto"
                        navbar
                    >
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    )
}

export default Navbar1