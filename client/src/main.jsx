import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Route, Routes, Outlet } from 'react-router-dom'; // Import necessary components and hooks

import App from './App.jsx';
import Home from './pages/Home';
import CategoryDetail from './pages/CategoryDetail'; // Import your CategoryDetail component
import Signup from './pages/Signup';
import Login from './pages/Login';
import ErrorPage from './pages/Error';
import Slideshow from './pages/Slideshow'; // Import your Slideshow component
import AuthService from './utils/auth'; // Import your authentication service

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: AuthService.loggedIn() ? <Home /> : <Login />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/category/:categoryId', // Define the parameter name as "categoryId"
        element: AuthService.loggedIn() ? <CategoryDetail /> : <Login />, // Render a different component or handle authentication as needed
      },
      {
        path: '/slideshow',
        element: <Slideshow />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
