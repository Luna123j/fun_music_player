import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {  useDispatch } from "react-redux";
import { userState } from "../redux/user";
import { useCookies } from "react-cookie";

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
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <span>username</span>
          <input type="text" name="username" placeholder="Username" />
        </div>
        <div>
          <span>password</span>
          <input type="password" name="password" placeholder="Password" />
        </div>
        <div>
          <button type="submit" >Sign up</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
