import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { NavLink, Switch, Route } from 'react-router-dom'
import FromLocal from './FromLocal'
import FromServer from './FromServer'
import FromRedux from './FromRedux'
import FromForms from './FromForms'

const NavbarComponent = () => {

   const myActiveStyle = { color: "white", borderBottom: "1px solid white", transition: 'all 0.2s' }

   return (
      <React.Fragment>
         <header style={{ paddingBottom: '70px' }}>
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

         <Switch>
            <Route path="/link1" component={FromLocal} />
            <Route path="/link2" component={FromServer} />
            <Route path="/link3" component={FromForms} />
            <Route path="/link4" component={FromRedux} />
            <Route render={() => <h1>Not found</h1>}/>
         </Switch>

      </React.Fragment>
   )
}

export default NavbarComponent