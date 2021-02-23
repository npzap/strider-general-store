import React, { Component } from 'react';
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Button, Image } from 'react-bootstrap';


class HeaderNavbar extends Component {

    render() {
        const { openLoginModal, logoutUser, authedUser } = this.props;

        return(
            <div>
                <Navbar bg="dark" variant="dark"  className="fixed-top">
                    <Image className='nav-icon' src='/images/direction.png' rounded style={{height: 50}}/>
                    <Navbar.Brand>Strider Store</Navbar.Brand>
                    <Navbar.Collapse>
                        {authedUser != null ? (
                            <Nav justify>
                                <NavLink to='/home' className='nav-link'>Home</NavLink>
                                <NavLink to='/purchase' className='nav-link'>Purchase</NavLink>
                                <NavLink to='/receipts' className='nav-link'>Receipts</NavLink>
                            </Nav>
                        ):(
                            <Nav justify>
                                <NavLink to='/home' className='nav-link'>Home</NavLink>
                            </Nav>
                        )}


                        {authedUser != null ? (
                            <Nav className="ml-auto">
                                <Image className='nav-icon' src='/images/user-icon.png' rounded style={{height: 50}}/>
                                <NavDropdown title={authedUser.username}>
                                    <NavDropdown.Item onClick={logoutUser}>Sign Out</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        ):(
                            <Nav className="ml-auto">
                                <Button variant="outline-info" onClick={openLoginModal}>Login</Button>
                            </Nav>
                        )}
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

function mapStateToProps({ authedUser }, props){
    return {
        authedUser,
        ...props
    }
}

export default connect(mapStateToProps)(HeaderNavbar);