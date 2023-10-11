import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import logoImage from '/assets/logo1.png';
import Box from '@mui/material/Box';


const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <Box
    sx={{
      width: 1000,
      height: 1000,
      backgroundColor: 'primary.dark',
      '&:hover': {
        backgroundColor: 'primary.main',
        opacity: [0.9, 0.8, 0.7],
      },
    }}
  > 
    <header className="bg-info text-dark mb-4 py-3 display-flex align-center">
      <div className="container flex-column justify-space-between-lg justify-center align-center text-center">
        <Link className="text-dark text-decoration-none d-flex align-center" to="/">
          {/* <img src={logoImage} alt="TrackLogo" className="logo" /> */}
          {/* <h1 className="m-0" style={{ fontSize: '3rem', marginLeft: '10px' }}>
            Fitness Tracker
          </h1> */}
        </Link>
        <p className="m-0" style={{ fontSize: '1.75rem', fontWeight: '700' }}>
        </p>
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg btn-primary m-2" to="/">
                Home
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/slideshow">
                Slideshow
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/log">
                Activity Logs
              </Link>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
              
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-primary m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/signup">
                Signup
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/slideshow">
                Slideshow
              </Link>
              
            </>
          )}
        </div>
      </div>
    </header>
    </Box>
  );
};

export default Header;
