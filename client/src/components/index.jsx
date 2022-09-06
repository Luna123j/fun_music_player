import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Login from './Login';
import {login, signup} from "../redux/visualMode"
import Signup from './Signup';

const Userview = () => {
 
  const { mode } = useSelector(state => state.userMode);
  
  return (
    <div>
      { mode === 'login' && <Login />}
      { mode === 'signup' && <Signup />}
    </div>
  )
}

export default Userview;