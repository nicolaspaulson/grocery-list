import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom'
import { UserContext } from './App'
import * as routes from '../constants/routes';
import PasswordChangeForm from './PasswordChange';
import styled from 'react-emotion'

const AccountPage = () => {

  const authUser = useContext(UserContext)
  return (
    !authUser ? <Redirect to={routes.LANDING} /> :
    <Wrapper>
      <div>
        <Title>Account: {authUser.email}</Title>
        <div>
          <Subtitle>Change Password</Subtitle>
          <PasswordChangeForm />
        </div>
      </div>
    </Wrapper>
    )
}

const Subtitle = styled("h3")({
  textAlign: "center"
});

const Title = styled("h1")({
  '@media (max-width: 700px)': {
    fontSize: 18
  }
})

const Wrapper = styled("div")({
  display: "flex",
  width: "100%",
  justifyContent: "center",
  marginTop: 30,
  marginBottom: 30
});

export default (AccountPage);
