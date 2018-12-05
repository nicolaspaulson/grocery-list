import React, { useState, useReducer, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect
 } from "react-router-dom";
import { firebase } from "../firebase"
import { database } from "../firebase/firebase"
import Navigation from "./Navigation";
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import PasswordForgetPage from './PasswordForget';
import AccountPage from './Account';
import * as routes from '../constants/routes';
import "normalize.css";
import "./App.css";
import CreateBox from "./CreateBox";
import TodoList from "./TodoList";
import shortid from "shortid";
import styled from "react-emotion";

export const TodosContext = React.createContext([]);
export const UserContext = React.createContext(null);

const setTodoKeyByIndex = ({ todos, key, value, index }) => [
  ...todos.slice(0, index),
  { ...todos[index], [key]: value },
  ...todos.slice(index + 1)
];

const App = () => {
  const [authUser, setAuthUser] = useState(null);
  const [todosFetched, setTodosFetched] = useState(false);

  const [todos, dispatch] = useReducer((todos, action) => {
    switch (action.type) {
      case "ADD_TODO":
        return [
          { done: false, text: action.todo, id: shortid.generate() },
          ...todos
        ];
      case "CLEAR_TODOS":
          return [];
      case "SET_DONE":
        return setTodoKeyByIndex({
          todos,
          key: "done",
          value: action.done,
          index: action.index
        }).sort((a, b) => {
          if (a.done) return 1;
          if (b.done) return -1;
          return 0;
        });
      case "SET_TEXT":
        return setTodoKeyByIndex({
          todos,
          key: "text",
          value: action.text,
          index: action.index
        });
      case "SET_TODOS":
        return action.todos;
      case "DELETE_TODO":
        return [
          ...todos.slice(0, action.index),
          ...todos.slice(action.index + 1)
        ];
      default:
        return todos;
    }
  }, []);

  useEffect(
    () => {
    const unsubscribe = firebase.auth.onAuthStateChanged(authUser => {
        if(authUser)
        {
          setAuthUser(authUser)
        }
        else
        {
          setAuthUser(null)
          setTodosFetched(false)
          dispatch({type: 'CLEAR_TODOS'})
        }
      });
    return unsubscribe;
  },
  []
  )

  useEffect(
    () => {
      if (authUser && todosFetched)
      database.ref('todos/' + authUser.uid).set(todos);
  },
  [authUser, todosFetched, todos]
  )

  useEffect(
    () => {
      if (authUser)
      {
        const unsubscribe = database.ref('todos/' + authUser.uid).on('value', snapshot => {
          if(snapshot)
            {
              dispatch({type: 'SET_TODOS', todos: snapshot.val() || []})
            }

          setTodosFetched(true)
        } );
        return unsubscribe;
      }
  },
  [authUser, todosFetched]
  )

  const handleSubmit = todo => {
    dispatch({
      type: "ADD_TODO",
      todo
    });
  };
//console.log(props)
  return (
    <div className="App" /*style={{backgroundColor: '#82A3A1'}}*/>
      <UserContext.Provider value={authUser}>
        <TodosContext.Provider value={{ todos, dispatch }}>
          <Router>
            <div>
              <Navigation authUser={authUser} />
              <Route
                exact path={routes.LANDING}
                render={props => (
                  <React.Fragment>
                    <Description>
                      Full-featured Grocery List app written entirely with React Hooks. Please sign in to continue!{" "}
                    </Description>
                  </React.Fragment>
                )}
              />
              <Route
                exact path={routes.SIGN_UP}
                component={SignUpPage}
              />
              <Route
                exact path={routes.SIGN_IN}
                component={SignInPage}
              />
              <Route
                exact path={routes.PASSWORD_FORGET}
                component={PasswordForgetPage}
              />
              <Route
                exact path={routes.HOME}
                render={props => (
                  <React.Fragment>
                    <CreateBox
                      onSubmit={handleSubmit}
                      disabled={authUser ? false : true}
                    />
                    <TodoList todos={todos} />
                    {!authUser && <Redirect to={routes.LANDING} />}
                  </React.Fragment>
                )}
              />
              <Route
                exact path={routes.ACCOUNT}
                component={AccountPage}
              />
            </div>
          </Router>
        </TodosContext.Provider>
      </UserContext.Provider>
    </div>
  );
};

const Description = styled('p')({
  textAlign: 'center'
})

// const mainStyle = {
//   color: '#262121',
//   background: '#89B3A1'
// }

export default App;
