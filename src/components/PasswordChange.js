import React, { useState } from 'react';
import { auth } from '../firebase';
// import {
//   Link,
//   withRouter,
//   Redirect,
// } from 'react-router-dom';
import * as routes from '../constants/routes';
import { withFirebase } from '../firebase/firebase';

const PasswordChangeForm = ({history}) => {

  const [passwordOne, setPasswordOne] = useState('')
  const [passwordTwo, setPasswordTwo] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [error, setError] = useState(null)

  const onSubmit = (event) => {

    auth.doPasswordUpdate(passwordOne)
      .then(() => {
        setSuccessMessage("Submitted successfully.")
      })
      .catch(error => {
        setError(error)
      });

    event.preventDefault();
  }

  const isInvalid =
    passwordOne !== passwordTwo || passwordOne === '';

    return (
      <form onSubmit={onSubmit}>
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={event => setPasswordOne(event.target.value)}
          type="password"
          placeholder="New Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={event => setPasswordTwo(event.target.value)}
          type="password"
          placeholder="Confirm New Password"
        />
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>
        {successMessage && <p>{successMessage}</p>}
        {error && <p>{error.message}</p>}
      </form>
    );
}

export default withFirebase(PasswordChangeForm);
