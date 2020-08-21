import Persons from './Persons';
import React, { PureComponent } from 'react'
import data from './data/data.json'
import MouseTracker from './MouseTracker';
import Login from './Login';
import Profile from './Profile';
import AuthContext from './Auth-context';
import Page from './Page';
import ThemedButton from './themed-button';
import { ThemeContext, themes } from './theme-context';

function Toolbar(props) {
  return (
    <ThemedButton onClick={props.changeTheme}>
      Change Theme <br /> using context
    </ThemedButton>
  );
}

class Local extends PureComponent {
  constructor(props) {
    super(props);

    this.state = ({
      data: null,
      showPerson: false,
      clickCounter: 0,
      greenArea: false,
      isAuth: false,
      x: 0,
      y: 0,
      theme: themes.light,
    })

    // this.toggleTheme = () => {
    //   this.setState(state => ({
    //     theme:
    //       state.theme === themes.dark
    //         ? themes.light
    //         : themes.dark,
    //   }));
    // };

  }

  toggleTheme = () => {
    this.setState(state => ({
      theme:
        state.theme === themes.dark
          ? themes.light
          : themes.dark,
    }));
  };

  componentDidMount() {
    const componentData = data;
    this.setState(() => ({
      data: componentData
    }))
  }

  personClickHandler = () => {
    this.setState((prevState, props) => ({
      showPerson: true,
      clickCounter: prevState.clickCounter + 1
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

  toggleAuth = () => {
    this.setState((prevState, props) => ({
      isAuth: !prevState.isAuth
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
      />
    ) : null;

    let greenArea = this.state.greenArea ? <MouseTracker /> : null;
    // const avatarSize = 40;

    return (

      <div>
        <div>
          <h1>Data From Local File</h1>
          {greenArea}
          <Page />
          <p>Click counter: {this.state.clickCounter}</p>
          <ThemeContext.Provider value={this.state.theme}>
            <Toolbar changeTheme={this.toggleTheme} />
            <button onClick={this.personToggleHandler}>Toggle Persons <br />show/hide</button>
            <ThemedButton>Im Themed Button <br /> change theme!</ThemedButton>
            <button onClick={this.personClickHandler}>Show Persons <br />(purecomponent)</button>
            <button onClick={this.areaClickHandler}>Toggle green area <br />(render prop)</button>
          </ThemeContext.Provider>
          <AuthContext.Provider value={{ isAuth: this.state.isAuth, toggleAuth: this.toggleAuth }}>
            <Login />
            <Profile />
            {persons}
          </AuthContext.Provider>
        </div>
      </div>


    )
  }
}

export default Local;