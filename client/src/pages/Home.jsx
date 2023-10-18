import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '../utils/queries';
import { idbPromise } from '../utils/indexedDB';
import AuthService from '../utils/auth';
import Slider from './Slideshow';
import CreateActivityForm from '../components/CreateActivityComponent'; // Import the CreateActivityForm component
// import CreateCategoryComponent from './CreateCategoryComponent'; // Import the CreateCategoryComponent component

import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Button,
} from '@mui/material';

const Home = () => {
  const { loading, data } = useQuery(GET_CATEGORIES);
  const categories = data?.categories || [];
  const [userProfile, setUserProfile] = useState(null);
  const [createCategoryVisible, setCreateCategoryVisible] = useState(false);

  useEffect(() => {
    if (AuthService.loggedIn()) {
      const userProfile = AuthService.getProfile();
      setUserProfile(userProfile);
    }
  }, []);

  const cardStyle = {
    marginBottom: '16px',
  };

  const toggleCreateCategory = () => {
    setCreateCategoryVisible(!createCategoryVisible);
  };

  return (
    <main>
      <div className="home-container">
        <Grid container spacing={3}>
          {/* First row for the slider */}
          <Grid item xs={12}>
            <Slider />
          </Grid>
          {/* Second row with two columns */}
          <Grid item xs={6}>
            <CreateActivityForm />
          </Grid>
          <Grid item xs={6}>
            <div className="category-list">
              {userProfile ? (
                <Typography variant="h4">Welcome, {userProfile.data.email}</Typography>
              ) : (
                <Typography variant="h4">Welcome!</Typography>
              )}
              <Typography variant="body1">Please select a category to track your activities:</Typography>
              {createCategoryVisible && <CreateCategoryComponent />}
              {loading ? (
                <div className="loading-message">Loading...</div>
              ) : categories.length === 0 ? (
                <div className="no-categories-message">No categories available.</div>
              ) : (
                categories.map((category) => (
                  <Card key={category._id} style={cardStyle}>
                    <CardHeader title={category.name} />
                    <CardContent>
                      <Typography variant="body2" color="textSecondary">
                        Category Description: {category.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button component="a" href={`/category/${category.name}`} variant="contained" color="primary">
                        Track Category
                      </Button>
                    </CardActions>
                  </Card>
                ))
              )}
            </div>
          </Grid>
        </Grid>
      </div>
    </main>
  );
};

export default Home;
