import React, { Suspense } from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { NavLink, Switch, Route } from 'react-router-dom'
import Homepage from './Homepage'

const FromLocal = React.lazy(() => import('./FromLocal'))
const FromServer = React.lazy(() => import('./FromServer'))
const FromServerRoute = React.lazy(() => import('./FromServerRoute'))
const NewPost = React.lazy(() => import('./NewProductRoute'))
const FromRedux = React.lazy(() => import('./FromRedux'))
const FromReduxAdv = React.lazy(() => import('./FromReduxAdv'))
const FromAuth = React.lazy(() => import('./FromAuth'))
const FromForms = React.lazy(() => import('./FromForms'))


const NavbarComponent = () => {

   const myActiveStyle = { color: "white", borderBottom: "1px solid white", transition: 'all 0.2s' }

   return (
      <React.Fragment>
         <header style={{ paddingBottom: '70px' }}>
            <Navbar style={{ width: '100vw', overflowX: 'hidden' }} fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
               <Container >
                  {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
                  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  <Navbar.Collapse id="responsive-navbar-nav">
                     <Nav className="mx-auto">

                        <Nav.Link as={NavLink} to="/" exact activeStyle={myActiveStyle}>Welcome</Nav.Link>
                        <Nav.Link as={NavLink} to="/link2/" activeStyle={myActiveStyle}>From Local</Nav.Link>
                        <Nav.Link as={NavLink} to="/link3/" activeStyle={myActiveStyle}>From server</Nav.Link>
                        <Nav.Link as={NavLink} to="/posts/" exact activeStyle={myActiveStyle}>Home</Nav.Link>

                        <Nav.Link as={NavLink}
                           to={{
                              pathname: '/new-post',
                              hash: '#submit',
                              search: '?quick-submit=true'
                           }}
                           activeStyle={myActiveStyle}>New Post
                        </Nav.Link>

                        <Nav.Link as={NavLink} to="/link5/" activeStyle={myActiveStyle}>Forms</Nav.Link>
                        <Nav.Link as={NavLink} to="/link6/" activeStyle={myActiveStyle}>Redux</Nav.Link>
                        <Nav.Link as={NavLink} to="/link7/" activeStyle={myActiveStyle}>R. Adv</Nav.Link>
                        <Nav.Link as={NavLink} to="/link8/" activeStyle={myActiveStyle}>Auth</Nav.Link>
                        <Nav.Link as={NavLink} to="/link9/" activeStyle={myActiveStyle}>Anim</Nav.Link>
                        <Nav.Link as={NavLink} to="/link10/" activeStyle={myActiveStyle}>Saga</Nav.Link>
                        <Nav.Link as={NavLink} to="/link11/" activeStyle={myActiveStyle}>Hooks</Nav.Link>

                     </Nav>
                  </Navbar.Collapse>
               </Container>
            </Navbar>
         </header>

         <div className="container">
            <Switch>


               <Route exact path="/" component={Homepage} />

               <Route path="/link2" render={(props) =>
                  <Suspense fallback={<div>Loading...</div>}><FromLocal {...props} /></Suspense>} />

               <Route path="/link3" render={() =>
                  <Suspense fallback={<div>Loading...</div>}><FromServer /></Suspense>} />

               <Route path="/new-post" render={(props) =>
                  <Suspense fallback={<div>Loading...</div>}><NewPost  {...props} /></Suspense>} />

               <Route path="/posts" render={(props) =>
                  <Suspense fallback={<div>Loading...</div>}><FromServerRoute {...props} /></Suspense>} />

               <Route path="/link5" render={() =>
                  <Suspense fallback={<div>Loading...</div>}><FromForms /></Suspense>} />

               <Route path="/link6" render={() =>
                  <Suspense fallback={<div>Loading...</div>}><FromRedux /></Suspense>} />

               <Route path="/link7" render={() =>
                  <Suspense fallback={<div>Loading...</div>}><FromReduxAdv /></Suspense>} />

               <Route path="/link8" render={() =>
                  <Suspense fallback={<div>Loading...</div>}><FromAuth /></Suspense>} />


               {/* 404 */}
               <Route render={() => <h1>Not found</h1>} />
            </Switch>
         </div>
      </React.Fragment>
   )
}

export default NavbarComponent