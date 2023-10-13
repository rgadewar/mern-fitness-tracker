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
        
      </div>
    </header>
  
  );
};

export default Header;
