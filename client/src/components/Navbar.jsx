<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import SearchMusic from './SearchMusic';

export default function Navbar() {

  return (
    <nav class="navbar navbar-expand-lg bg-light">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <a class="navbar-brand" href="#">Navbar</a>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled">Disabled</a>
            </li>
          </ul>
          <SearchMusic/>
=======
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
>>>>>>> master
        </div>
      </div>
    </nav>
  )
<<<<<<< HEAD
}
=======
}

export default Navbar
>>>>>>> master
