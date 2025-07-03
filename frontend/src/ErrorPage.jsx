import React from 'react'
import { useRouteError } from 'react-router-dom';
// importing an image 
import pageNotFound from './images/page not found.svg';

function ErrorPage() {
const routeError=useRouteError();

    return (
    <div>
<img src={pageNotFound} alt="page not found" width="350px" className='d-block m-auto mt-5 mb-5'/>
<p className="text-danger lead text-center display-5">Oops! something went wrong in Routing.</p>
<p className="text-danger lead text-center fs-3 ">Error Status:{routeError.statusText}</p>
    </div>
  )
}

export default ErrorPage;