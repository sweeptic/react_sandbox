import React, { Component } from 'react'
import AddPersonRedux from './AddPersonRedux'
import PersonRedux from './PersonRedux'
import { connect } from 'react-redux'
import * as actionTypes from './store/actions'

class ReduxPersons extends Component {
   render() {
      return (
         <div>
            <AddPersonRedux personAdded={this.props.onAddedPerson} />
            {this.props.prs.map(person => (
               <PersonRedux
                  key={person.id}
                  name={person.name}
                  age={person.age} />
            ))}
         </div>
      )
   }
}

// redux store state to this component props
const mapStateToProps = (state) => {
   return {
      prs: state.persons
   }

}
// redux dispatch action to this component props
const mapDispatchToProps = (dispatch) => {
   return {
      onAddedPerson: (name, age) => dispatch({ type: actionTypes.ADD_PERSON, personData: { name: name, age: age } })
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxPersons)