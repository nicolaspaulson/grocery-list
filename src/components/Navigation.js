import React from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from "./SignOut"
import * as routes from '../constants/routes';

const Navigation = ({ authUser }) =>
  <div>
    { authUser
        ? <NavigationAuth />
        : <NavigationNonAuth />
    }
  </div>

const NavigationAuth = () =>
  <ul>
    <li><Link to={routes.LANDING}><img src="grocery-bag.ico" width="32" height="32" alt="grocery-bag-icon"></img>Grocery Buddy</Link></li>
    <li><Link to={routes.HOME}>Home</Link></li>
    <li><Link to={routes.ACCOUNT}>Account</Link></li>
    <li><SignOutButton /></li>
  </ul>

const NavigationNonAuth = () =>
  <ul>
    <li><Link to={routes.LANDING}>Grocery Buddy</Link></li>
    <li><Link to={routes.SIGN_IN}>Sign In</Link></li>
  </ul>

export default Navigation;
