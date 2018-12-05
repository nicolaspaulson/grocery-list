import React, { useState } from 'react';
import { auth } from '../firebase';
import { withFirebase } from '../firebase/firebase';
import styled from 'react-emotion'

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
      <OuterWrapper>
        <Wrapper onSubmit={onSubmit}>
          <Input
            name="passwordOne"
            value={passwordOne}
            onChange={event => setPasswordOne(event.target.value)}
            type="password"
            placeholder="New Password"
          />
          <p />
          <Input
            name="passwordTwo"
            value={passwordTwo}
            onChange={event => setPasswordTwo(event.target.value)}
            type="password"
            placeholder="Confirm New Password"
          />
          <p />
          <ResetButton disabled={isInvalid} type="submit">
            Reset My Password
          </ResetButton>
          {successMessage && <p>{successMessage}</p>}
          {error && <p>{error.message}</p>}
        </Wrapper>
      </OuterWrapper>
    );
}


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

const ResetButton = styled("button")({
  display: "flex",
  textAlign: "center",
  justifyContent: "center",
  fontWeight: 600,
  border: "3px solid rgb(218, 218, 218)",
  padding: 5,
  margin: "-2px 0px -2px -5px",
  outline: "none",
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

export default withFirebase(PasswordChangeForm);
