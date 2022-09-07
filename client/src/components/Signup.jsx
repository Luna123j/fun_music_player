import React from "react";
import axios from "axios";


const Signup = () => {
  const submitHandler =(e) => {
    e.preventDefault();
    const data = {
      username: e.target[0].value,
      password: e.target[1].value
    }
    axios.post("/signup", data).then((res)=> {
      console.log(res)
    })

  }

  return (
    <div>
      <form >
        <div>
          <span>username</span>
          <input type="text" name="username" placeholder="Username" />
        </div>
        <div>
          <span>password</span>
          <input type="password" name="password" placeholder="Password" />
        </div>
        <div>
          <button type="submit">Sign up</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
