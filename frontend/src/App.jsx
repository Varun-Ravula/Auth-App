import './App.css';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/register/Register';
import AboutUs from './components/aboutUs/AboutUs';
import RootLayout from './RootLayout';
import ErrorPage from './ErrorPage';
import UserProfile from './components/userProfile/UserProfile';
import Products from './components/products/Products';
import Cart from './components/cart/Cart';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/Register', element: <Register /> },
      { path: '/Login', element: <Login /> },
      { path: '/About-us', element: <AboutUs /> },
      {
        path: '/user-profile',
        element: <UserProfile />,
        children: [
          { path: '/user-profile', element: <Products /> },
          { path: 'cart', element: <Cart /> }
        ]
      }
    ]
  }
]);

function App() {
  return (
    <div className="App-content">
      <RouterProvider router={browserRouter} />
    </div>
  );
}

export default App;
