import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, signup, favourite, recent } from '../redux/visualMode'
const Navbar = () => {
  const { mode } = useSelector(state => state.userMode)
  const dispatch = useDispatch()
 
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <span className="navbar-brand" >FunPlayer</span>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <span className="nav-link active" aria-current="page" >Home</span>
            </li>
            <li className="nav-item">
              <span className="nav-link" >Favourite</span>
            </li>
            <li className="nav-item">
              <span className="nav-link" >History</span>
            </li>
            <li className="nav-item">
              <span className="nav-link" onClick={()=>dispatch(login())}>Login</span>
            </li>
            <li className="nav-item">
              <span className="nav-link" onClick={()=>dispatch(signup())}>Signup</span>
            </li>
          </ul>
          <form className="d-flex" role="search" >
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  )
}

export default Navbar