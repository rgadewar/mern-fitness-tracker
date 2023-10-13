import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import logoImage from '/assets/logo1.png';

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from '@mui/material';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'teal', marginBottom: 4 }}>
      <Container>
        <Toolbar>
          <Box display="flex" alignItems="center">
            {/* <img src={logoImage} alt="Logo" style={{ height: '50px', marginRight: '10px' }} /> */}
            <Typography variant="h4" sx={{ fontFamily: 'cursive', fontWeight: 'bold', fontSize: '3rem' }}>
              TRACK
            </Typography>
          </Box>
          <div style={{ marginLeft: 'auto' }}>
            {Auth.loggedIn() ? (
              <>
                <Button
                  component={Link}
                  to="/"
                  variant="contained"
                  color="primary"
                  sx={{
                    margin: 2,
                    backgroundColor: 'green',
                    transition: 'background-color 0.3s',
                    '&:hover': {
                      backgroundColor: 'lightgreen',
                    },
                  }}
                >
                  Home
                </Button>
                <Button
                  component={Link}
                  to="/slideshow"
                  variant="contained"
                  color="secondary"
                  sx={{
                    margin: 2,
                    backgroundColor: 'blue',
                    transition: 'background-color 0.3s',
                    '&:hover': {
                      backgroundColor: 'lightblue',
                    },
                  }}
                >
                  Slideshow
                </Button>
                <Button
                  component={Link}
                  to="/log"
                  variant="contained"
                  color="secondary"
                  sx={{
                    margin: 2,
                    backgroundColor: 'red',
                    transition: 'background-color 0.3s',
                    '&:hover': {
                      backgroundColor: 'pink',
                    },
                  }}
                >
                  Activity Logs
                </Button>
                <Button
                  onClick={logout}
                  variant="contained"
                  color="secondary"
                  sx={{
                    margin: 2,
                    backgroundColor: 'gray',
                    transition: 'background-color 0.3s',
                    '&:hover': {
                      backgroundColor: 'lightgray',
                    },
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/login"
                  variant="contained"
                  color="primary"
                  sx={{
                    margin: 2,
                    backgroundColor: 'green',
                    transition: 'background-color 0.3s',
                    '&:hover': {
                      backgroundColor: 'lightgreen',
                    },
                  }}
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  to="/signup"
                  variant="contained"
                  color="secondary"
                  sx={{
                    margin: 2,
                    backgroundColor: 'blue',
                    transition: 'background-color 0.3s',
                    '&:hover': {
                      backgroundColor: 'lightblue',
                    },
                  }}
                >
                  Signup
                </Button>
                <Button
                  component={Link}
                  to="/slideshow"
                  variant="contained"
                  color="secondary"
                  sx={{
                    margin: 2,
                    backgroundColor: 'purple',
                    transition: 'background-color 0.3s',
                    '&:hover': {
                      backgroundColor: 'lavender',
                    },
                  }}
                >
                  Slideshow
                </Button>
              </>
            )}
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
