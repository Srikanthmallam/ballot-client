import { createBrowserRouter } from 'react-router-dom';

import UserProvider from '../context/userContex';

import Layoout from '../components/Layoout'
import Home from '../pages/Home'
import Login from '../pages/Login';
import Admin from '../pages/Admin';
import ErrorPage from '../pages/ErrorPage';
import Logout from '../pages/Logout';


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <UserProvider>
        <Layoout/>
      </UserProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/logout",
        element: <Logout/>
      }
    ],
  },
]);

export default router