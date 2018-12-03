import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom'
import { UserContext } from './App'
import * as routes from '../constants/routes';
import { PasswordForgetForm } from './PasswordForget';
import PasswordChangeForm from './PasswordChange';

const AccountPage = () => {

  const authUser = useContext(UserContext)
  return (
    !authUser ? <Redirect to={routes.LANDING} /> :
      <div>
        <h1>Account: {authUser.email}</h1>
        <div>
          <p>Forgot Password?</p>
          <PasswordForgetForm />
        </div>
        <div>
          <p>Change Password</p>
          <PasswordChangeForm />
        </div>
      </div>
    )
}

export default (AccountPage);
