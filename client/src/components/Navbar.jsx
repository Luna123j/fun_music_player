import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, signup, favourite, recent } from "../redux/visualMode";
import SearchMusic from "./SearchMusic";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { resetUserState } from "../redux/user";
import { useCookies } from "react-cookie";


const Navbar = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { username } = useSelector((state) => state.user);
  const [cookie, removeCookie] = useCookies()
  const logouthandler = () => {
    if (cookie.username !== "") {
      console.log("removeCookie")
      dispatch(resetUserState());
      removeCookie('username')
      navigate("/login");
    }
  };
  console.log("cookieUsername", cookie.username)

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <span className="navbar-brand">
          <Link to="/">FunPlayer</Link>
        </span>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <span className="nav-link active" aria-current="page"></span>
            </li>
            <li className="nav-item">
              <span className="nav-link">
                <Link to="/favourite">Favourite</Link>
              </span>
            </li>
            <li className="nav-item">
              <span className="nav-link">
                <Link to="/history">History</Link>
              </span>
            </li>
            
              {cookie.username === "undefined" ? (
                <>
                  <li className="nav-item">
                    <span className="nav-link">
                      <Link to="/login">Login</Link>
                    </span>
                  </li>
                  <li className="nav-item">
                    <span className="nav-link">
                      <Link to="/signup">Sign up</Link>
                    </span>
                  </li>
                </>
              ) :
              (
                <li onClick={logouthandler}>
                  <span className="nav-link">Log out</span>
                </li>
              )}
            
          </ul>
          <SearchMusic />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
