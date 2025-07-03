import React from 'react'
// import UserProfile from '../userProfile/UserProfile';
import {useForm} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { LoginContext } from '../../ContextApis/LoginContext';
import { useContext } from 'react';
// importing css file
import "./Login.css";

function Login() {

  // use form 
  const {register,reset,handleSubmit,formState:{errors}}=useForm();

  // importing states from context provider
  const [user,errorInLogin,userLoginStatus,setUserLoginStatus,loginUser]=useContext(LoginContext);

  // function to handle submit
  const submitForm=(dataFromForm)=>{
    loginUser(dataFromForm);
    reset();
  }

  return (
    <div>
      <div className="row col-sm-9 col-md-8 col-lg-6 m-auto">
        {errorInLogin?<h4 className="text-danger text-center loginErrorMessage fs-4">*{errorInLogin}</h4>:<h4 className="text-success display-6 text-center mb-3 login-here-text">Login Here.</h4>}
        <form onSubmit={handleSubmit(submitForm)}>
          {/* email */}
          <div className="form-floating">
            <input type="email" placeholder="email" className="form-control mb-3" {...register("email",{required:true})}/>
            <label htmlFor="userName">email</label>
            {errors.email?.type=="required" && <p className="text-danger">*email is required</p>}
          </div>
          {/* password */}
          <div className="form-floating">
            <input type="password" placeholder="password" className="form-control mb-3" {...register("password",{required:true})}/>
            <label htmlFor="password">password</label>
            {errors.password?.type=="required" && <p className="text-danger">*password is required.</p>}
          </div>
          <button type="submit" className="btn btn-success"><FaUser /> Login</button>
        </form>
      </div>

    </div>
  )
}

export default Login;