import Persons from './Persons';
import React, { PureComponent } from 'react'
import data from '../src/data/data.json'

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = ({
      data: null,
      showPerson: false,
      clickCounter: 0
    })
  }

  componentDidMount() {
    const componentData = data;
    this.setState(() => ({
      data: componentData
    }))
  }

  componentDidUpdate() {
    console.log('component did update')
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
    console.log(id)
    const postList = [...this.state.data];
    postList.splice(personIndex, 1);
    this.setState((prevState, props) => ({
      data: postList
    }))
  }

  render() {
    console.log('render')
    let persons = this.state.showPerson ? (
      <Persons
        data={this.state.data}
        onChangeHandler={this.personTitleChangeHandler}
        deleteHandler={this.deleteHandler} />) : null;

    return (
      <div>
        <p>{this.state.clickCounter}</p>
        <button onClick={this.personToggleHandler}>Toggle Persons</button>
        <button onClick={this.personClickHandler}>Show Persons</button>
        {persons}
      </div>
    )
  }
}

export default App;