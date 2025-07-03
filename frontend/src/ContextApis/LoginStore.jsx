// importing modules
import { LoginContext} from "./LoginContext";
import {useState,useEffect} from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

// building an context provider
// context provider to respective children
function LoginStore({children}){
// user state
    const [user,setUser]=useState({});

// user Login status
const [userLoginStatus,setUserLoginStatus]=useState(false);

// using navigate
const navigate=useNavigate();

// error state
 const [errorInLogin,setErrorInLogin]=useState("");

// function to make an http request too http server(user login)
// importing login url from .env
const login_url_env=import.meta.env.VITE_LOGIN_URL;

const loginUser=async(userObject)=>{
    try{
    const LoginResult=await axios.post(login_url_env,userObject);
    if(LoginResult.data.message==="success"){
        // creating an session storage and inserting token
        sessionStorage.setItem('token',LoginResult.data.token);
        setUser({...LoginResult.data.payload});
        setUserLoginStatus(true);
        setErrorInLogin("");
    }else{
        setErrorInLogin(LoginResult.data.message);
    }
    }
    catch(errorObject){
        if(errorObject.response){
            setErrorInLogin(`Something went wrong: ${errorObject.message || LoginResult.data.message}`);
        }else if(errorObject.request){
            setErrorInLogin("connection error, please check your internet connection and try again");
        }else{
            setErrorInLogin(`error occured while logging:${setErrorInLogin(errorObject.message)}`);
        }
    }
}

// useeffect for programmatical navigation to user profile
useEffect(()=>{
    if(userLoginStatus==true){
        navigate('/user-profile');
    }
},[userLoginStatus])

    return(
        <div>
            <LoginContext.Provider value={[user,errorInLogin,userLoginStatus,setUserLoginStatus,loginUser]}>
                {children}
            </LoginContext.Provider>
        </div>
    )
}

export default LoginStore;