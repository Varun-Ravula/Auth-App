import React, { useContext } from 'react'
import Home from '../home/Home';
import Register from '../register/Register';
import Login from '../login/Login';
import AboutUs from '../aboutUs/AboutUs';
import productLogo from '../../images/productLogo.svg';
import './NavigationBar.css';
// importing installed modules
import { NavLink } from 'react-router-dom';
import { GoHomeFill } from "react-icons/go";
import { MdPersonAddAlt1 } from "react-icons/md";
import { LuLogIn } from "react-icons/lu";
import { RiInformationLine } from "react-icons/ri";
import { LoginContext } from '../../ContextApis/LoginContext';
import { CgLogOut } from "react-icons/cg";

function NavigationBar() {

  // importing the states from login context
  const [user,errorInLogin,userLoginStatus,setUserLoginStatus,loginUser]=useContext(LoginContext);

  // function to log out
  const logOut=()=>{
    setUserLoginStatus(false);
    sessionStorage.clear();

  }
  return (
    <div>
      <div className="navigation-bar navbar">
        <ul className="nav">
          <li className="nav-brand"><NavLink to="/"><img src={productLogo} alt="product logo" width="100px"/></NavLink></li>
          <li className="nav-item"><NavLink className="nav-link" to="/"><GoHomeFill className='nav-icon'/>Home</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link" to="/Register"><MdPersonAddAlt1 className='nav-icon'/>Register</NavLink></li>
          {
          userLoginStatus?<li className="nav-item"><NavLink className="nav-link active" to="/Login" onClick={logOut}><CgLogOut className='nav-icon'/>Logout</NavLink></li>:<li className="nav-item"><NavLink className="nav-link" to="/Login"><LuLogIn className='nav-icon'/>Login</NavLink></li>
          }
          <li className="nav-item"><NavLink className="nav-link" to="/About-us"><RiInformationLine className='nav-icon'/>About us</NavLink></li>
        </ul>
      </div>
    </div>
  )
}

export default NavigationBar;