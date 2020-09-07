import React from "react";
import { NavLink } from 'react-router-dom'
import { connect } from "react-redux";
import { Navbar, Nav, Container } from 'react-bootstrap'

import { logout } from "../reducer/actions/auth";


const NavbarComponent = (props) => {

   const myActiveStyle = { color: "white", borderBottom: "1px solid white", transition: 'all 0.2s' }

   let navLinks = props.isAuthUser ? (

      <>
         <Nav.Link as={NavLink} to="/home" activeStyle={myActiveStyle}>Home</Nav.Link>

         <Nav.Link as={NavLink} to="/shared2" activeStyle={myActiveStyle}>Shared 2</Nav.Link>
         <Nav.Link as={NavLink} to="/shared3" activeStyle={myActiveStyle}>Shared 3</Nav.Link>
         <Nav.Link as={NavLink} to="/shared4" activeStyle={myActiveStyle}>Shared 4</Nav.Link>
         <Nav.Link as={NavLink} to="/shared5" activeStyle={myActiveStyle}>Shared 5</Nav.Link>

         <Nav.Link as={NavLink} to="/my-account" activeStyle={myActiveStyle}>My Account</Nav.Link>
         <Nav.Link as={NavLink} to="/my-account1" activeStyle={myActiveStyle}>My Account1</Nav.Link>
         <Nav.Link as={NavLink} to="/my-account2" activeStyle={myActiveStyle}>My Account2</Nav.Link>
         <Nav.Link as={NavLink} to="/my-account3" activeStyle={myActiveStyle}>My Account3</Nav.Link>

         <Nav.Link as={NavLink} to="/" exact onClick={props.logout} >Logout</Nav.Link>
      </>

   ) : (

         <>
            <Nav.Link as={NavLink} to="/login" activeStyle={myActiveStyle}>Login</Nav.Link>

            <Nav.Link as={NavLink} to="/guest1" activeStyle={myActiveStyle}>Guest1</Nav.Link>

            <Nav.Link as={NavLink} to="/shared2" activeStyle={myActiveStyle}>Shared 2</Nav.Link>
            <Nav.Link as={NavLink} to="/shared3" activeStyle={myActiveStyle}>Shared 3</Nav.Link>
            <Nav.Link as={NavLink} to="/shared4" activeStyle={myActiveStyle}>Shared 4</Nav.Link>
            <Nav.Link as={NavLink} to="/shared5" activeStyle={myActiveStyle}>Shared 5</Nav.Link>

         </>
      )


   return (
      <React.Fragment>
         <header style={{ paddingBottom: '70px' }}>
            <Navbar style={{ width: '100vw', overflowX: 'hidden' }} fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
               <Container >
                  {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
                  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  <Navbar.Collapse id="responsive-navbar-nav">
                     <Nav className="mr-auto">
                        {navLinks}
                     </Nav>
                  </Navbar.Collapse>
               </Container>
            </Navbar>
         </header>
      </React.Fragment>
   )
}


export default connect(({ isAuthUser }) => ({ isAuthUser }), { logout })(NavbarComponent);