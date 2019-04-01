import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Container
} from 'reactstrap';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';

class AppNavbar extends Component {
    state = {
        isOpen: false
    };

    toggle = () => {
        this.setState({
          isOpen: !this.state.isOpen
        });
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <Fragment>
                <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                    <span className="navbar-text">
                        <strong>{ user ? `Welcome ${user.name}` : '' }</strong>
                    </span>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem tag={Link} to="/dashboard">
                    Dashboard
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    <Logout />
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Fragment>
        );

        const guestLinks = (
            <Fragment>
                <NavItem>
                    <RegisterModal />
                </NavItem>
                <NavItem>
                        <LoginModal/>
                </NavItem>  
            </Fragment>
        );
        return (
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand tag={Link} to="/">BlogApp</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen}  navbar>
                            <Nav className="mr-auto" navbar>
                                <NavItem>
                                    <NavLink tag={Link} to="/posts">Posts</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} to="/about">About</NavLink>
                                </NavItem>
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                { isAuthenticated ? authLinks : guestLinks }
                            </Nav>
                        </Collapse>
                    </Container>     
                </Navbar>
            </div>
        );
    }
}

AppNavbar.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(AppNavbar);