import React from 'react';
import Auth from '../../utils/auth';
import logoImage from '/assets/logo1.png';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import styles from "./header.module.css"
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';


const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (

    <header className={styles['headerCard']} >
      <Grid container spacing={2} justifyContent="right">
        <div>
          <Grid item container justifyContent="center">
            <p className="m-0" style={{ fontSize: '1.75rem', fontWeight: '700', fontFamily: 'Roboto', color: 'white', textAlign: 'center' }}>
              Keep your life on Track. From step to finish.</p>
            <Grid item xs={12} container justifyContent="right">

              <Link href="/signup" style={{ width: "5rem", textAlign: 'right', color: 'white', fontFamily: 'Roboto' }}>
                About Us
              </Link>
              {Auth.loggedIn() ? (<Link href="/signup" style={{ width: "5rem", textAlign: 'right', color: 'white', fontFamily: 'Roboto' }}>
                Logout
              </Link>) : (<Link href="/login" style={{ width: "5rem", textAlign: 'right', color: 'white', fontFamily: 'Roboto' }}>
                Login
              </Link>)}

              <Link href="/signup" style={{ width: "5rem", textAlign: 'right', color: 'white', fontFamily: 'Roboto' }}>
                Sign Up
              </Link>
              {/* <a href="/signup">
                <p style={{ width: "5rem", height: "auto", textAlign: 'right', color: 'white', fontFamily: 'Roboto' }}>
                Sign Up
              </p>
              </a> */}
            </Grid >
          </Grid >
        </div>
      </Grid>
    </header>

  );
};

export default Header;
