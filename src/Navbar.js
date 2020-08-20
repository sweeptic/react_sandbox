import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const NavbarComponent = () => {

   const myActiveStyle = { color: "white", borderBottom: "1px solid white", transition: 'all 0.2s' }

   return (
      <header>
         <Navbar style={{ width: '100vw', overflowX: 'hidden' }} fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container >
               <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
               <Navbar.Toggle aria-controls="responsive-navbar-nav" />
               <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="ml-auto">
                     <Nav.Link as={NavLink} to="/link1/" activeStyle={myActiveStyle}>Data from local file</Nav.Link>
                     <Nav.Link as={NavLink} to="/link2/" activeStyle={myActiveStyle}>Data from server</Nav.Link>
                     <Nav.Link as={NavLink} to="/link3/" activeStyle={myActiveStyle}>Forms</Nav.Link>
                     <Nav.Link as={NavLink} to="/link4/" activeStyle={myActiveStyle}>Redux</Nav.Link>
                     {/* <Nav.Link as={NavLink} activeStyle={myActiveStyle} to={{
                        pathname: '/new-post',
                        hash: '#submit',
                        search: '?quick-submit=true'
                     }}>New Post</Nav.Link> */}
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </Navbar>
      </header>
   )
}

export default NavbarComponent