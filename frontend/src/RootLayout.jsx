import React from 'react';
import NavigationBar from './components/navigationBar/NavigationBar';
import Footer from './components/footer/Footer';
import { Outlet } from 'react-router-dom';
import './RootLayout.css';
import LoginStore from './ContextApis/LoginStore'; 

function RootLayout() {
  return (
    <LoginStore>
      <div>
        <NavigationBar />
        <div className='container mt-3' style={{minHeight:"70vh"}}>
          <Outlet />
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </LoginStore>
  );
}

export default RootLayout;
