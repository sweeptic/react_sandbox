import * as actionTypes from './actions'

// this is the store
const initialState = {
   persons: []
}

// this is the reducer
const reducer = (state = initialState, action) => {
   switch (action.type) {
      case actionTypes.ADD_PERSON:
         const newPerson = {
            id: Math.random(),
            name: action.personData.name,
            age: action.personData.age
         }
         return {
            ...state,
            persons: state.persons.concat(newPerson)
         }

      case actionTypes.REMOVE_PERSON:
         return {
            ...state,
            persons: state.persons.filter(item => item.id !== action.id)
         }

      default:
         return {
            ...state
         }
   }
}

export default reducer;