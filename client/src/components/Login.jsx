import React from "react";
import axios from "axios";
import {  useDispatch } from "react-redux";
import { userState } from "../redux/user";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import '../components/Login.scss';

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [cookie, setCookie] = useCookies('username')
  const submitHandler =(e) => {
    e.preventDefault();
    const data = {
      username: e.target[0].value,
      password: e.target[1].value
    }
    axios.post("/login", data).then((res)=> {
      console.log(res)
      if (res.data.error === "User not exist") {
        alert("User not exist!!!")
        navigate('/signup')
      } else if(res.data.error ==="password is wrong") {
        alert("Password is wrong")
      } else {
        setCookie("username", data.username)
        // dispatch(userState({type: 'user/username', payload: res.data.username}))
        navigate('/');
      }
    }).catch(err=>console.log(err));
  }
  
  return (
    <div>
      <form onSubmit={submitHandler}>
     <div id="signinContainer">

        <div>

          <div id="username1">username</div>
          <input />
        </div>
        
        <div>

          <div id="password1">password</div>
          <input />
        </div>
        
        <div>
          <button id="loginbutton"type="submit">Login</button>
        </div>
     </div>
      </form>
    </div>
  );
};

export default Login;
