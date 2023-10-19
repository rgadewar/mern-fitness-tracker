import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Route, Routes, Outlet } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home';
import CategoryDetail from './pages/CategoryDetail';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Log from './pages/LogPage.jsx';
import AboutUs from './pages/AboutUs.jsx';
// import Donation from './pages/Donations.jsx';
import ErrorPage from './pages/ErrorBoundary.jsx'; // Import your ErrorPage component
import Slideshow from './pages/Slideshow';
import AuthService from './utils/auth';



// Import the service worker module
// import { Workbox } from 'workbox-window';
// // Create a new instance of Workbox
// const wb = new Workbox('/serviceWorker.js'); // Replace with the correct path to your service worker file
// // Register the service worker
// wb.register().then((registration) => {
//   // Service worker registration successful
//   console.log('Service Worker registered with scope:', registration.scope);
// }).catch((error) => {
//   // Service worker registration failed
//   console.error('Service Worker registration failed:', error);
// });

// console.log('PUBLIC_URL:', process.env.PUBLIC_URL);

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker
//     .register('/serviceWorker.js') // Path to your service worker file
//     .then((registration) => {
//       console.log('Service Worker registered with scope:', registration.scope);
//     })
//     .catch((error) => {
//       console.error('Service Worker registration failed:', error);
//     });
// }
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
        path: '/aboutus',
        element: <AboutUs />,
      },

      {
        // path: '/category/:categoryId',
        path: '/category/:name',
        element: AuthService.loggedIn() ? <CategoryDetail /> : <Login />,
      },
      {
        path: '/slideshow',
        element: <Slideshow />,
      },
      {
        path: '/log',
        element: AuthService.loggedIn() ? <Log /> : <Login />,
      },
      // {
      //   path: '/donation',
      //   element: <Donation />,
      // },
    ],
  },
  // Catch-all route for handling unknown routes (404)
  {
    path: '*',
    element: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
