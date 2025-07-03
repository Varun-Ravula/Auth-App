import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaUserPlus } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { LoginContext } from '../../ContextApis/LoginContext';

// impooerting styling file
import './Register.css';

// impoerting react icon
import { ImSpinner9 } from "react-icons/im";

function Register() {

  // use form 
  const { register, reset, handleSubmit, formState: { errors } } = useForm();

  // use navigate
  const navigate = useNavigate();

  // using states of context
  const [user, loginUser, errorInLogin] = useContext(LoginContext);
  // error state
  const [errorDisplayState, setErrorDisplayState] = useState("");

  // register succefully message state
  const [registerMessage, setRegisterMessage] = useState("");

  // profile picture state
  const [selectedProfile, setSelectedProfile] = useState(null);

  // state for is submitting -> preventing the multiple submissions of images in to cloud
  // if the isSubmitting button state is false it shows the submitting and whenever it is true then it will be shown as enabled button 
  const [isSubmitting,setIsSubmitting]=useState(false);


  // function to handling the submitted data
  const submitForm = (newUser) => {
  // accessing register url from env file
  const register_url_env=import.meta.env.VITE_REGISTER_URL;

    setIsSubmitting(true);
    // creating an instance of form data and including the multi part data
    const fd = new FormData();
    // appending the user string with user details and converting them into javascript object->json object 
    fd.append("user", JSON.stringify(newUser));
    // appending the profile name with details of user selected file
    fd.append("profile", selectedProfile);
    // sending the form data instead of individual new user details
    axios.post(register_url_env, fd)
      .then(response => {
        if (response.status == 201) {
          setRegisterMessage(response.data.message);
          reset();
          navigate('/login');
        } else if (response.status !== 201) {
          setErrorDisplayState(response.data.message);
        }
      })
      .catch(error => {
        // if any url mistakes happen then it will be triggered
        if (error.response) {
          setErrorDisplayState(error.message);
        }
        // if any coonection error ocuur then it will be triggered
        else if (error.request) {
          setErrorDisplayState("Sorry, there was an connection error, check you connection!")
        }
        // other errors handling
        else {
          setErrorDisplayState(error.message);
        }
      }).finally(()=>{
        setIsSubmitting(false);
      })
  }

  // onInput will be fired before submission by this we can extract the image and its details for submitting 
  const selectedFile = (event) => {
    setSelectedProfile(event.target.files[0]);
  }
  return (
    <div>
      {errorDisplayState ? <p className="text-danger text-center display-5 mt-5">{errorDisplayState}</p> :
        <div>
          {registerMessage ? <p className="text-success text-center display-6 text-capitalized">{registerMessage}</p> : <h4 className="display-6 text-success text-center register-here-text">Register Here.</h4>}
          <div className='m-auto row col-sm-9 col-md-8 col-lg-6 mt-3'>
            <form onSubmit={handleSubmit(submitForm)}>
              {/* user name */}
              <div className="form-floating">
                <input type="text" className='form-control mb-3' {...register('userName', { required: true, minLength: 3, maxLength: 15 })} placeholder='User Name'></input>
                <label htmlFor='userName'>user name</label>
                {errors.userName?.type == "required" && <p className="text-danger">*user name is required.</p>}
                {errors.userName?.type == "minLength" && <p className="text-danger">*min 3 characters is required.</p>}
                {errors.userName?.type == "maxLength" && <p className="text-danger">*max 15 characters is required.</p>}
              </div>
              {/* pasword */}
              <div className="form-floating">
                <input type="password" className='form-control mb-3' {...register('password', { required: true, minLength: 3, maxLength: 15 })} placeholder='Password'></input>
                <label htmlFor='Password text-secondary'>password</label>
                {errors.password?.type == "required" && <p className='text-danger'>*password is required.</p>}
                {errors.password?.type == "minLength" && <p className='text-danger'>*min 3 characters is required.</p>}
                {errors.password?.type == "maxLength" && <p className='text-danger'>*max 15 characters is required.</p>}
              </div>
              {/* email */}
              <div className="form-floating">
                <input type="email" className='form-control mb-3' {...register('email', { required: true })} placeholder='example@gmail.com'></input>
                <label htmlFor='email'>email</label>
                {errors.email?.type == "required" && <p className="text-danger">*email is required</p>}
              </div>
              {/* mobile number */}
              <div className="form-floating">
                <input type="number" className='form-control mb-3' {...register('mobile', { required: true })} placeholder='Mobile Number'></input>
                <label htmlFor='Mobile'>mobile number</label>
                {errors.mobile?.type == "required" && <p className='text-danger'>*mobile number is required.</p>}
              </div>
              {/* date of birth */}
              <div className="form-floating">
                <input type="date" className='form-control mb-3' {...register('dob', { required: true })} placeholder='DOB'></input>
                <label htmlFor='dob'>date of birth</label>
                {errors.dob?.type == "required" && <p className='text-danger'>*date of birth is required.</p>}
              </div>

              {/* user profile picture */}
              <div className="form-floating">
                <input type="file" className="form-control" onInput={selectedFile} {...register('profilePicture', { required: true })} />
                <label htmlFor="profilePicture">Select Profile Picture</label>
                {errors.profilePicture?.type == 'required' && <p className="text-danger">*File is required.</p>}
              </div>
              {/* register button */}
              <button type="submit" disabled={isSubmitting} className="btn btn-success mt-2">{isSubmitting ? <span >Registering <ImSpinner9 className="spin" /></span>:<><FaUserPlus /> Register</>}</button>

            </form>
          </div>
        </div>
      }
    </div>
  )
}

export default Register;