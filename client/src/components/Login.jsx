import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../redux/visualMode";

const Login = () => {
  const { mode } = useSelector((state) => state.userMode);
  const dispatch = useDispatch();
  const clickHandler = () => {
    dispatch(login());
  };
  return (
    <div onClick={clickHandler}>
      <form type="submit">
        <div>
          <span>username</span>
          <input />
        </div>
        <div>
          <span>passworkd</span>
          <input />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
