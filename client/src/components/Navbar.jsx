import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, signup, favourite, recent } from "../redux/visualMode";
import SearchMusic from "./SearchMusic";
import "../components/Navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { resetUserState } from "../redux/user";
import { useCookies } from "react-cookie";

const Navbar = (props) => {
  const { transcriptValues, searchHandler } = props;
  // const { transcript} = transcriptValues
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { username } = useSelector((state) => state.user);
  const [cookie, removeCookie] = useCookies();
  const logouthandler = () => {
    if (cookie.username !== "") {
      dispatch(resetUserState());
      removeCookie("username");
      navigate("/login");
    }
  };

  return (
    <nav
      style={{ position: "fixed", backgroundColor: "#6c584c" }}
      className="navbar navbar-expand-lg"
    >
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
          <Link id="funplayer" to="/">
            Fun Music Player
          </Link>
        </span>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="partial navbar-nav mb-2 mb-lg-0">
            <li className="nav-item list-style">
              <span className="nav-link ">
                <Link id="favourite" style={{ textDecoration: "none" }} to="/users/favourite">
                  | Favourite |
                </Link>
              </span>
            </li>
            <li className="nav-item list-style">
              <span className="nav-link">
                <Link id="history" style={{ textDecoration: "none" }} to="/history">
                  {" "}
                  History |
                </Link>
              </span>
            </li>
            <li className="nav-item">
              <span className="nav-link">
                <SearchMusic
                  transcriptValues={transcriptValues}
                  searchHandler={searchHandler}
                />
              </span>
            </li>
          </ul>
        </div>
        <div className="partial2">
          {cookie.username === "undefined" ? (
            <>
              <li className="nav-item list-style">
                <span className="nav-link">
                  <Link id="login" to="/login">
                    | Login |
                  </Link>
                </span>
              </li>
              <li className="nav-item list-style">
                <span className="nav-link">
                  <Link
                    id="signup"
                    style={{ textDecoration: "none" }}
                    to="/signup"
                  >
                    {" "}
                    Sign up |
                  </Link>
                </span>
              </li>
            </>
          ) : (
            <ul className="logout navbar-nav  mb-2 mb-lg-0">
              <li className="nav-item list-style">
                <span className="nav-link" id="unlogin">
                  {cookie.username}
                </span>
              </li>
              <li onClick={logouthandler} className="nav-item list-style">
                <span className="nav-link" id="unlogin">
                  | Log out |
                </span>
              </li>
            </ul>
          )}
        </div>
        {/* <SearchMusic /> */}
      </div>
    </nav>
  );
};

export default Navbar;
