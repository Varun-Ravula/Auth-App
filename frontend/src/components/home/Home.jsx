import React from 'react'
import './Home.css';
import productImage from '../../images/product management.jpg' ;

// importing the installed modules
import { MdPersonAddAlt1 } from "react-icons/md";
import { LuLogIn } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';

function Home() {
// use navigate
const navigate=useNavigate();

  return (
    <div className="container">
        <button className="btn-success btn mt-3 me-3" onClick={()=>navigate('/Register')}><MdPersonAddAlt1 className='me-3'/>Register</button>
        <button className="btn-primary btn mt-3" onClick={()=>navigate('/Login')}><MdPersonAddAlt1 className='me-3'/>Login</button>
        <h4 className="text-success display-6 text-center mt-5 mb-5 home-main-heading">Welcome to Product Management.</h4>
      <div className='row col-sm-9 col-md-7 col-lg-5 m-auto'>
      <div className="card shadow">
        <div className="card-header">
          <img src={productImage} alt="product image" className="card-img-top" />
        </div>
        <div className="card-body">
          <p>Here when you register and login with your credentials then you can view/add/update/delete your products and you can manage your products easily.</p>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Home;