import React, { useState } from 'react';
import { auth } from '../firebase';
import { Link, /*Redirect*/ } from 'react-router-dom';
import { withFirebase } from '../firebase/firebase';
import * as ROUTES from '../constants/routes';
import "normalize.css";
import styled from "react-emotion";

const PasswordForgetPage = () => (
  <div>
    <Subtitle>Forgot Password</Subtitle>
    <PasswordForgetForm />
  </div>
);

const PasswordForgetFormBase = ({history}) => {

  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)

  const onSubmit = (event) => {

    auth.doPasswordReset(email)
      .catch(error => {
        setError(error)
      });

    event.preventDefault();
  }

  const isInvalid = email === '';

    return (
      <form onSubmit={onSubmit}>
        <Input
          name="email"
          value={email}
          onChange={event => setEmail(event.target.value)}
          type="text"
          placeholder="Email Address"
        />
        <ResetButton disabled={isInvalid} type="submit">
          Reset My Password
        </ResetButton>

        {error && <p>{error.message}</p>}
      </form>
    );
}

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

const Subtitle = styled("h2")({
  textAlign: "center"
});

const Input = styled("input")({
  textAlign: 'center'
  // background: "rgba(255,255,255,.3)",
  // padding: 5,
  // width: "100%",
  // border: "none",
  // fontWeight: 600,
  // borderRadius: 4,
  // margin: "-2px 0px -2px -5px",
  // outline: "none"
});

const ResetButton = styled('button')({
  textAlign: 'center'
})

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
