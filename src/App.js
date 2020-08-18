import Persons from './Persons';
import React, { PureComponent } from 'react'
import data from '../src/data/data.json'
import MouseTracker from './MouseTracker';

export const AuthContext = React.createContext(false);

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = ({
      data: null,
      showPerson: false,
      clickCounter: 0,
      greenArea: false,
      authenticated: false,
      x: 0,
      y: 0
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

  deleteHandler = (index) => {
    const postList = [...this.state.data];
    postList.splice(index, 1);
    this.setState((prevState, props) => ({
      data: postList
    }))
  }

  loginHandler = () => {
    this.setState((prevState, props) => ({
      authenticated: !prevState.authenticated
    }))
  }

  areaClickHandler = () => {

    this.setState((prevState, props) => ({
      greenArea: !prevState.greenArea
    }))
  }

  render() {
    let persons = this.state.showPerson ? (
      <Persons
        data={this.state.data}
        onChangeHandler={this.personTitleChangeHandler}
        deleteHandler={this.deleteHandler}
      />) : null;

    let greenArea = this.state.greenArea ? <MouseTracker /> : null;


    return (
      <div>
        {greenArea}
        <p>{this.state.clickCounter}</p>
        <button onClick={this.loginHandler}>Login / Logout</button>
        <button onClick={this.personToggleHandler}>Toggle Persons</button>
        <button onClick={this.personClickHandler}>Show Persons</button>
        <button onClick={this.areaClickHandler}>Toggle green area</button>
        <AuthContext.Provider value={this.state.authenticated}>
          {persons}
        </AuthContext.Provider>
      </div>
    )
  }
}

export default App;