import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';

class AppNavbar extends Component {
    state = {
        isOpen: false
    };

    toggle = () => {
        this.setState({
          isOpen: !this.state.isOpen
        });
    }

    close = () => {
        this.setState({
          isOpen: false
        });
    }

    render() {
        return (
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand tag={Link} to="/" onClick={this.close}>BloggApp</NavbarBrand>
                        <NavbarToggler onClick={this.toggle}></NavbarToggler>
                        <Collapse isOpen={this.state.isOpen} onClick={this.toggle} navbar>
                            <Nav className="mr-auto" navbar>
                                <NavItem>
                                    <NavLink tag={Link} to="/posts">Posts</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} to="/about">About</NavLink>
                                </NavItem>
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink href="#">Register</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="#">Login</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Container>     
                </Navbar>
            </div>
        );
    }
}

export default AppNavbar;