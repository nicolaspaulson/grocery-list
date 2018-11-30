import React, { useState, useReducer, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
 } from "react-router-dom";
import { firebase } from "../firebase"
import { database } from "../firebase/firebase"
import Navigation from "./Navigation";
import LandingPage from './Landing';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import PasswordForgetPage from './PasswordForget';
import HomePage from './Home';
import AccountPage from './Account';
import * as routes from '../constants/routes';
import "normalize.css";
import "./App.css";
import CreateBox from "./CreateBox";
import TodoList from "./TodoList";
import shortid from "shortid";
import ls from "local-storage";
import styled from "react-emotion";

export const TodosContext = React.createContext([]);

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

  return (
    <div className="App">
      <TodosContext.Provider value={{ todos, dispatch }}>
        <Title>React Hooks Todo</Title>
        <Router>
          <div>
            <Navigation authUser={authUser} />

            <hr/>

            <Route
              exact path={routes.LANDING}
              component={LandingPage}
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
              component={HomePage}
            />
            <Route
              exact path={routes.ACCOUNT}
              component={AccountPage}
            />
          </div>
        </Router>
        <Description>
          Full-featured Grocery List app written partly with React Hooks.{" "}
        </Description>
        <CreateBox
          onSubmit={handleSubmit}
          disabled={authUser ? false : true} />
        <TodoList todos={todos} />
      </TodosContext.Provider>
    </div>
  );
};

const Title = styled("h1")({
  textAlign: "center"
});

const Description = styled('p')({
  textAlign: 'center'
})

export default App;
