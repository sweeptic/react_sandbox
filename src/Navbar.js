import React, { Suspense } from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { NavLink, Switch, Route } from 'react-router-dom'
import Homepage from './Homepage'
// import FullPost from './FullProductRoute'

const FromLocal = React.lazy(() => import('./FromLocal'))
const FromServer = React.lazy(() => import('./FromServer'))

const FromServerRoute = React.lazy(() => import('./FromServerRoute'))
const NewPost = React.lazy(() => import('./NewProductRoute'))
const FullPost = React.lazy(() => import('./FullProductRoute'))

const FromRedux = React.lazy(() => import('./FromRedux'))
const FromForms = React.lazy(() => import('./FromForms'))


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

                        <Nav.Link as={NavLink} to="/" exact activeStyle={myActiveStyle}>welcome</Nav.Link>
                        <Nav.Link as={NavLink} to="/link2/" activeStyle={myActiveStyle}>Data from local file(async)</Nav.Link>

                        <Nav.Link as={NavLink} to="/link3/" activeStyle={myActiveStyle}>Data from server(fetch)</Nav.Link>

                        <Nav.Link as={NavLink} to="/link4/" activeStyle={myActiveStyle}>Home</Nav.Link>


                        <Nav.Link as={NavLink} to={{
                           pathname: '/new-post',
                           hash: '#submit',
                           search: '?quick-submit=true'
                        }} activeStyle={myActiveStyle}>New Post</Nav.Link>


                        <Nav.Link as={NavLink} to="/:id" activeStyle={myActiveStyle}>FullPost</Nav.Link>


                        <Nav.Link as={NavLink} to="/link5/" activeStyle={myActiveStyle}>Forms</Nav.Link>
                        <Nav.Link as={NavLink} to="/link6/" activeStyle={myActiveStyle}>Redux</Nav.Link>
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
            <Route exact path="/" component={Homepage} />

            <Route path="/link2" render={(props) =>
               <Suspense fallback={<div>Loading...</div>}><FromLocal {...props} /></Suspense>} />

            <Route path="/link3" render={() =>
               <Suspense fallback={<div>Loading...</div>}><FromServer /></Suspense>} />

            <Route path="/link4" render={() =>
               <Suspense fallback={<div>Loading...</div>}><FromServerRoute /></Suspense>} />

            <Route path="/new-post" render={() =>
               <Suspense fallback={<div>Loading...</div>}><NewPost /></Suspense>} />

            <Route path="/:id" exact render={(props) =>
               <Suspense fallback={<div>Loading...</div>}><FullPost {...props} /></Suspense>} />

            {/* <Route path="/:id" exact component={FullPost} /> */}



            <Route path="/link5" render={() =>
               <Suspense fallback={<div>Loading...</div>}><FromForms /></Suspense>} />

            <Route path="/link6" render={() =>
               <Suspense fallback={<div>Loading...</div>}><FromRedux /></Suspense>} />


            <Route render={() => <h1>Not found</h1>} />
         </Switch>

      </React.Fragment>
   )
}

export default NavbarComponent