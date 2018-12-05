import React, { useState, useContext } from 'react';
import { UserContext } from './App'
import { withRouter, Redirect } from 'react-router-dom';
import { SignUpLink } from './SignUp';
import { auth } from '../firebase';
import { PasswordForgetLink } from './PasswordForget'
import * as routes from '../constants/routes';

const SignInPage = ({ history }) =>
  <div>
    <h1>Sign In</h1>
    <SignInForm history={history} />
    <PasswordForgetLink />
    <SignUpLink />
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
    <form onSubmit={onSubmit}>
      <input
        value={email}
        onChange={event => setEmail(event.target.value)}
        type="text"
        placeholder="Email Address"
      />
      <input
        value={password}
        onChange={event => setPassword(event.target.value)}
        type="password"
        placeholder="Password"
      />
      <button disabled={isInvalid} type="submit">
        Sign In
      </button>

      { error && <p>{error.message}</p> }
    </form>
  )
}

export default withRouter(SignInPage);

export {
  SignInForm,
};
