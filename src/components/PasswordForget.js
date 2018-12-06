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
      <OuterWrapper>
          <Wrapper onSubmit={onSubmit}>
            <Input
              name="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
              type="text"
              placeholder="Email Address"
            />
          <p />
            <ResetButton disabled={isInvalid} type="submit">
              Reset My Password
            </ResetButton>

            {error && <p>{error.message}</p>}
          </Wrapper>
      </OuterWrapper>
    );
}

const PasswordForgetLink = () => (
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
);

const Subtitle = styled("h2")({
  textAlign: "center"
});

const OuterWrapper = styled("div")({
  display: "flex",
  width: "100%",
  justifyContent: "center",
  flexDirection: "row",
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

const Input = styled("input")({
  textAlign: 'center',
  background: "rgba(255,255,255,.3)",
  padding: 5,
  border: "3px solid rgb(218, 218, 218)",
  borderRadius: 6,
  fontWeight: 600,
  margin: "-2px 0px -2px -5px",
  outline: "none"
});

const ResetButton = styled("button")({
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

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
