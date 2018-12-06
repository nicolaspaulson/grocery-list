import React, { useState, useContext } from 'react';
import {
  Link,
  withRouter,
  Redirect,
} from 'react-router-dom';
import { UserContext } from './App'
import { auth } from "../firebase"
import * as routes from '../constants/routes';
import styled from 'react-emotion'

const SignUpPage = ({ history }) =>
  <div>
    <Subtitle>Sign Up</Subtitle>
    <SignUpForm history={history} />
  </div>

const SignUpForm = ({history}) => {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [passwordOne, setPasswordOne] = useState('')
  const [passwordTwo, setPasswordTwo] = useState('')
  const [error, setError] = useState(null)

  const authUser = useContext(UserContext)

  const onSubmit = (event) => {

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .catch(error => {
        setError(error)
      });

    event.preventDefault();
  }

  const isInvalid =
   passwordOne !== passwordTwo ||
   passwordOne === '' ||
   email === '' ||
   username === '';

    return (
      authUser ? <Redirect to={routes.HOME} /> :
      <OuterWrapper>
        <Wrapper onSubmit={onSubmit}>
          <Input
            value={username}
            onChange={event => setUsername(event.target.value)}
            type="text"
            placeholder="Full Name"
          />
          <p />
          <Input
            value={email}
            onChange={event => setEmail(event.target.value)}
            type="text"
            placeholder="Email Address"
          />
          <p />
          <Input
            value={passwordOne}
            onChange={event => setPasswordOne(event.target.value)}
            type="password"
            placeholder="Password"
          />
          <p />
          <Input
            value={passwordTwo}
            onChange={event => setPasswordTwo(event.target.value)}
            type="password"
            placeholder="Confirm Password"
          />
          <p />
          <SignUpButton disabled={isInvalid} type="submit">
            Sign Up
          </SignUpButton>

          { error && <p>{error.message}</p> }
        </Wrapper>
      </OuterWrapper>
    );
  }

const SignUpLink = () =>
  <p>
    Don't have an account? {' '}<Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>

  const Subtitle = styled("h3")({
    textAlign: "center"
  });

  const Input = styled("input")({
    textAlign: 'center',
    background: "rgba(255,255,255,.3)",
    padding: 8,
    border: "3px solid rgb(218, 218, 218)",
    borderRadius: 6,
    fontWeight: 600,
    margin: "-2px 0px -2px -5px",
    outline: "none"
  });

  const Wrapper = styled("form")({
    display: "flex",
    width: "100%",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 30,
    flexDirection: "column",
    maxWidth: 400
  });

  const OuterWrapper = styled("div")({
    display: "flex",
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
  });

  const SignUpButton = styled("button")({
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
    fontWeight: 600,
    border: "none",
    padding: 5,
    margin: "-2px 0px -2px -5px",
    outline: "none",
    '&:enabled':{
      backgroundColor: "#9FC490"
    },
    '&:hover':{
      backgroundColor: "#C0DFA1"
        },
    '&:disabled':{
      backgroundColor: "buttonface",
      '&:hover': {
        backgroundColor: "buttonface",
      }
    }
  })


export default withRouter(SignUpPage);

export {
  SignUpForm,
  SignUpLink,
};
