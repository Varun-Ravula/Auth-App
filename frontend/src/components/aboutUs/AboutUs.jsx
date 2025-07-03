import React from 'react';
import productImage from '../../images/product management.jpg' ;

function AboutUs() {
  return (
<div className="container">
        <h4 className="text-success display-6 text-center mt-5 mb-5 home-main-heading">Product Management Sytem.</h4>
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
    </div>  )
}

export default AboutUs;