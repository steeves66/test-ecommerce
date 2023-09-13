import React from 'react'
import {Container} from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { LinkContainer } from 'react-router-bootstrap'

function Header() {
  return (
        <header> 
            <Navbar expand="lg" bg="dark" variant='dark'>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand href="/">ProShop</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">  
                        <LinkContainer to="/cart"> 
                            <Nav.Link ><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/login">
                            <Nav.Link><i className="fas fa-user "></i>Login</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header