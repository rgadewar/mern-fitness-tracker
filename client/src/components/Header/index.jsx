import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import logoImage from '/assets/logo1.png';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import styles from "./header.module.css"
import Grid from '@mui/material/Grid';



const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (

    <header className={styles['headerCard']} >
      <Grid container spacing={2} justifyContent="center">
        <div>
          <Grid item  container justifyContent="center">
            <p className="m-0" style={{ fontSize: '1.75rem', fontWeight: '700', fontFamily: 'Roboto', color: 'white', textAlign: 'center' }}>
              Keep your life on Track. From step to finish.</p>
            <Grid item  xs={12} container justifyContent="center">
              <a href="/signup">
                <p style={{ width: "5rem", height: "auto", textAlign: 'center', color: 'white', fontFamily: 'Roboto' }}>
                Sign Up
              </p>
              </a>
              <a href="/login">
              <p component={Link} to="/login" style={{ width: "5rem", height: "auto", textAlign: 'center', color: 'white', fontFamily: 'Roboto' }} >
                Login
              </p>
              </a>
              <a href="/#">
              <p component={Link} to="/#" style={{ width: "5rem", height: "auto", textAlign: 'center', color: 'white', fontFamily: 'Roboto' }} >
                About Us
              </p>
              </a>
            </Grid >
          </Grid >
        </div>
      </Grid>
    </header>

  );
};

export default Header;
