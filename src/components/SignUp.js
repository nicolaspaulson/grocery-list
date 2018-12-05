import React, { useState, useContext } from 'react';
import {
  Link,
  withRouter,
  Redirect,
} from 'react-router-dom';
import { UserContext } from './App'
import { auth } from "../firebase"
import * as routes from '../constants/routes';

const SignUpPage = ({ history }) =>
  <div>
    <h1>Sign Up</h1>
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
      <form onSubmit={onSubmit}>
        <input
          value={username}
          onChange={event => setUsername(event.target.value)}
          type="text"
          placeholder="Full Name"
        />
        <input
          value={email}
          onChange={event => setEmail(event.target.value)}
          type="text"
          placeholder="Email Address"
        />
        <input
          value={passwordOne}
          onChange={event => setPasswordOne(event.target.value)}
          type="password"
          placeholder="Password"
        />
        <input
          value={passwordTwo}
          onChange={event => setPasswordTwo(event.target.value)}
          type="password"
          placeholder="Confirm Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>

        { error && <p>{error.message}</p> }
      </form>
    );
  }

const SignUpLink = () =>
  <p>
    Don't have an account?
    {' '}
    <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>

export default withRouter(SignUpPage);

export {
  SignUpForm,
  SignUpLink,
};
