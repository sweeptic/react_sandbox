import Persons from './Persons';
import React, { PureComponent } from 'react'
import data from '../src/data/data.json'

export const AuthContext = React.createContext(false);

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = ({
      data: null,
      showPerson: false,
      clickCounter: 0,
      authenticated: false
    })
  }

  componentDidMount() {
    const componentData = data;
    this.setState(() => ({
      data: componentData
    }))
  }

  personClickHandler = () => {
    this.setState((prevState, props) => ({
      showPerson: true
    }))
  }

  personToggleHandler = () => {
    this.setState((prevState, props) => ({
      showPerson: !prevState.showPerson,
      clickCounter: prevState.clickCounter + 1
    }))
  }

  personTitleChangeHandler = (event, id) => {
    const personIndex = [...this.state.data].findIndex(item => item.id === id);
    const modifiedPerson = { ...this.state.data[personIndex] };
    const person = [...this.state.data];
    modifiedPerson.title = event.target.value;
    person[personIndex] = modifiedPerson;
    this.setState((prevState, props) => ({
      data: person
    }))
  }

  deleteHandler = (id) => {
    const personIndex = [...this.state.data].findIndex(item => item.id === id);
    const postList = [...this.state.data];
    postList.splice(personIndex, 1);
    this.setState((prevState, props) => ({
      data: postList
    }))
  }

  loginHandler = () => {
    this.setState((prevState, props) => ({
      authenticated: !prevState.authenticated
    }))
  }

  render() {
    let persons = this.state.showPerson ? (
      <Persons
        data={this.state.data}
        onChangeHandler={this.personTitleChangeHandler}
        deleteHandler={this.deleteHandler} />) : null;

    return (
      <div>
        <p>{this.state.clickCounter}</p>
        <button onClick={this.loginHandler}>Login / Logout</button>
        <button onClick={this.personToggleHandler}>Toggle Persons</button>
        <button onClick={this.personClickHandler}>Show Persons</button>
        <AuthContext.Provider value={this.state.authenticated}>
          {persons}
        </AuthContext.Provider>


      </div>
    )
  }
}

export default App;