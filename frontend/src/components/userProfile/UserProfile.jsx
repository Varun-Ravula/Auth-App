// importing modules
import React,{ useContext } from 'react'
import {Outlet} from 'react-router-dom';
import { LoginContext } from '../../ContextApis/LoginContext';
import { NavLink } from 'react-router-dom';
import "./UserProfile.css"

function UserProfile() {
  // destructuring the states from context api
  const [user,errorInLogin,userLoginStatus,setUserLoginStatus,loginUser]=useContext(LoginContext);

  return (
    <div>
      <div className="user-info">
        <img src={user.image} alt={user.userName} height="75px" width="75px" className="user-profile-picture"></img>
        <p className="mt-3">Welcome <b className="text-capitalize">{user.userName}</b></p>
        <p className=' text-secondary'>{user.email}</p>
      </div>
      <div className="user-profile-content">
        <h4 className="text-center mt-3 mb-3">Available categories:</h4>
        <ul className="navbar-nav user-profile-navbar">
          <li className="nav-item user-profile-nav-item"><NavLink className="nav-link btn btn-warning p-2" to="/user-profile">Products</NavLink></li>
          <li className="nav-item user-profile-nav-item"><NavLink className="nav-link btn btn-warning p-2" to="Cart">Cart</NavLink></li>
        </ul>
      </div>
      <Outlet/>
    </div>
  )
}

export default UserProfile;