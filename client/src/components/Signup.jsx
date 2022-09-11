import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {  useDispatch } from "react-redux";
import { userState } from "../redux/user";
import { useCookies } from "react-cookie";
import '../components/Signup.scss';

const Signup = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [cookie, setCookie] = useCookies('username')

  const submitHandler =(e) => {
    e.preventDefault();
    const data = {
      username: e.target[0].value,
      password: e.target[1].value
    }
    axios.post("/signup", data).then((res)=> {
      console.log(res)
      if (res.data.error === "User exist" ) {
        alert("User exist!!!")
        navigate('/login')
        return;
      } else {
        dispatch(userState({type: 'user/username', payload: res.data.username}))
        setCookie('username', res.data.username)
        navigate('/');
      }
    });
  }

  return (
      <form onSubmit={submitHandler}>
    <div id="signupcontainer">
        <div>
          <span id="username">username</span>
          <div></div>
          <input type="text" name="username" placeholder="Username" />
        </div>
        <div>
          <span id="password">password</span>
          <div></div>
          <input type="password" name="password" placeholder="Password" />
        </div>
        <div>
        <div></div>
        </div>
          <button id="signup1"type="submit" >Sign up</button>
    </div>
      </form>
  );
};

export default Signup;
