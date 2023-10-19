import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '../utils/queries';
import { idbPromise } from '../utils/indexedDB';
import AuthService from '../utils/auth';
import Slider from './Slideshow';
import CreateActivityForm from '../components/CreateActivityComponent'; 
import UserActivities from '../components/UserActivities';

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
  const [userActivities, setUserActivities] = useState([]); // State to store user activities

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

  // Function to update userActivities state when a new activity is added
  const handleActivityAdded = (newActivity) => {
    setUserActivities([...userActivities, newActivity]);
  };

  return (
    <main>
      <div className="home-container">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Slider />
          </Grid>
          <Grid item xs={6}>
            {/* Pass handleActivityAdded function to CreateActivityForm */}
            <CreateActivityForm onActivityAdded={handleActivityAdded} />
            <br />
            <br />
            <UserActivities userActivities={userActivities} />
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
