import React, {  useEffect, useReducer,  useMemo } from 'react';
import axios from 'axios';
import List from './List';
import { todoListReducer } from './Reducer'
import { useFormInput } from './forms';


const Todo = props => {
   // const [inputIsValid, setInputIsValid] = useState(false);
   const [todoList, dispatch] = useReducer(todoListReducer, []);
   // const todoInputRef = useRef();
   const todoInput = useFormInput();
   const URI = 'https://hooks-44d95.firebaseio.com/todos.json'

   useEffect(() => {
      axios.get(URI).then(result => {
         console.log(result);
         const todoData = result.data;
         const todos = [];
         for (const key in todoData) {
            todos.push({ id: key, name: todoData[key].name });
         }
         dispatch({ type: 'SET', payload: todos });
      });
      return () => {
         console.log('Cleanup');
      };
   }, []);

   // const inputValidationHandler = event => {
   //    if (event.target.value.trim() === '') {
   //       setInputIsValid(false);
   //    } else {
   //       setInputIsValid(true);
   //    }
   // };

   const todoAddHandler = () => {
      const todoName = todoInput.value;
      axios
         .post(URI, { name: todoName })
         .then(res => {
            setTimeout(() => {
               const todoItem = { id: res.data.name, name: todoName };
               dispatch({ type: 'ADD', payload: todoItem });
            }, 1);
         })
         .catch(err => {
            console.log(err);
         });
   };

   const todoRemoveHandler = todoId => {
      axios
         .delete(URI)
         .then(res => {
            dispatch({ type: 'REMOVE', payload: todoId });
         })
         .catch(err => console.log(err));
   };

   return (
      <React.Fragment>
         <input
            type="text"
            placeholder="Todo"
            onChange={todoInput.onChange}
            value={todoInput.value}
            // ref={todoInputRef}
            // onChange={inputValidationHandler}
            style={{ backgroundColor: todoInput.validity === true ? 'transparent' : 'red' }}
         />
         <button type="button" onClick={todoAddHandler}>
            Add
         </button>
         {useMemo(
            () => (
               <List items={todoList} onClick={todoRemoveHandler} />
            ),
            [todoList]
         )}
      </React.Fragment>
   );
};

export default Todo;