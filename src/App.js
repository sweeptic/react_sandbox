import React, { Component } from 'react'
import NavbarComponent from './Navbar'
import { connect } from 'react-redux';
import * as actions from '../src/redux_auth/Redux_actions_index';

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <div>
        <NavbarComponent />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(null, mapDispatchToProps)(App)