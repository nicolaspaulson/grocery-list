import React from 'react';
import styled from 'react-emotion'
import { auth } from '../firebase';

const SignOutButton = () =>
  <SOutButton
    type="button"
    onClick={auth.doSignOut}
  >
    Sign Out
  </SOutButton>

const SOutButton = styled('button')({
  color: 'white',
  backgroundColor: '233D4D',
  background: 'none',
  border: 'none',
  '&:hover':{
    backgroundColor: '#377771'
  },
  height: '100%'
})

export default SignOutButton;
