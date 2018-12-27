import React, { useState, useContext } from 'react';
import { UserContext } from './App'
import { withRouter, Redirect } from 'react-router-dom';
import { SignUpLink } from './SignUp';
import { auth } from '../firebase';
import { PasswordForgetLink } from './PasswordForget'
import * as routes from '../constants/routes';
import styled from 'react-emotion'

const SignInPage = ({ history }) =>
  <div>
    <Subtitle>Sign In</Subtitle>
    <SignInForm history={history} />
  </div>

const SignInForm = ({history}) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const authUser = useContext(UserContext)

  const onSubmit = (event) => {

    auth.doSignInWithEmailAndPassword(email, password)
      .catch(error => {
        setError(error)
      });

    event.preventDefault();
  }

  const isInvalid =
    password === '' ||
    email === '';

  return (
    authUser ? <Redirect to={routes.HOME} /> :
    <OuterWrapper>
      <Wrapper onSubmit={onSubmit}>
        <Input
          value={email}
          onChange={event => setEmail(event.target.value)}
          type="text"
          placeholder="Email Address"
        />
        <p />
        <Input
          value={password}
          onChange={event => setPassword(event.target.value)}
          type="password"
          placeholder="Password"
        />
        <PasswordForgetLink />
        <p />
        <SignInButton disabled={isInvalid} type="submit">
          Sign In
        </SignInButton>
        <SignUpLink />
        { error && <p>{error.message}</p> }
      </Wrapper>
    </OuterWrapper>
  )
}

const Subtitle = styled("h3")({
  textAlign: "center"
});

const Input = styled("input")({
  textAlign: 'center',
  background: "rgba(255,255,255,.3)",
  padding: '0px 8px',
  border: "3px solid rgb(218, 218, 218)",
  borderRadius: 6,
  fontWeight: 600,
  margin: "-2px 0px -2px -5px",
  outline: "none",
  height: 40
});

const Wrapper = styled("form")({
  display: "flex",
  width: "100%",
  justifyContent: "center",
  marginTop: 30,
  marginBottom: 30,
  flexDirection: "column",
  maxWidth: 400,
  '@media (max-width: 700px)': {
    padding: '0px 10px'
  }
});

const OuterWrapper = styled("div")({
  display: "flex",
  width: "100%",
  justifyContent: "center",
  flexDirection: "row",
  '@media (max-width: 700px)': {
    padding: '0px 10px'
  }
});

const SignInButton = styled("button")({
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
  },
  '@media (max-width: 700px)': {
    padding: '5px 10px'
  }
})

export default withRouter(SignInPage);

export {
  SignInForm,
};
