import React from 'react';
import { Link } from 'react-router-dom';
import "./Navigation.css";
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
    <li><Link to={routes.LANDING}><img src="grocery-bag.ico" width="32" height="32" alt="grocery-bag-icon"></img><span className='GBTitle'>Grocery Buddy</span></Link></li>
    <li><Link to={routes.HOME}>Home</Link></li>
    <li><Link to={routes.ACCOUNT}>Account</Link></li>
    <li style={{ float: 'right'}}><SignOutButton /></li>
  </ul>

const NavigationNonAuth = () =>
  <ul>
    <li><Link to={routes.LANDING}><img src="grocery-bag.ico" width="32" height="32" alt="grocery-bag-icon"></img><span className='GBTitle'>Grocery Buddy</span></Link></li>
    <li style={{ float: 'right'}}><Link to={routes.SIGN_IN}>Sign In</Link></li>
  </ul>

  // const Ul = styled('ul')({
  //   listStyleType: 'none',
  //   margin: 0,
  //   padding: 0,
  //   overflow: 'hidden',
  //   backgroundColor: '#333',
  // })
  //
  // const Li = styled('li')({
  //   float: 'left',
  //   borderRight: 1, 'solid','#bbb',
  //   display: 'block',
  //   color: 'white',
  //   textAlign: 'center',
  //   padding: 16,
  //   textDecoration: 'none',
  //   '&:hover': {
  //     backgroundColor: '#111',
  //   },
  //   '&:active': {
  //     backgroundColor:'#82A3A1'
  //   },
  // })

export default Navigation;
