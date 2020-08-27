import React, { Component } from 'react'
import AddPersonRedux from './AddPersonRedux'
import PersonRedux from './PersonRedux'
import { connect } from 'react-redux'
import * as actionTypes from './store/actions'

class ReduxPersons extends Component {
   render() {
      return (
         <div>

            {/* input box and button */}
            <AddPersonRedux personAdded={this.props.onAddedPerson} />

            {/* person table */}
            {this.props.prs.map(person => (
               <PersonRedux
                  key={person.id}
                  name={person.name}
                  age={person.age}
                  clicked={() => this.props.onRemovePerson(person.id)}
               />
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
      onAddedPerson: (name, age) => dispatch({ type: actionTypes.ADD_PERSON, personData: { name: name, age: age } }),

      onRemovePerson: (id) => dispatch({ type: actionTypes.REMOVE_PERSON, id: id })
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxPersons)