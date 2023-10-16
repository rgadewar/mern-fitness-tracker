import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '../utils/queries';
import { idbPromise } from '../utils/indexedDB'; // Import the function
import AuthService from '../utils/auth';

import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Button,
  Typography,
} from '@mui/material';

const Home = () => {
  const { loading, data } = useQuery(GET_CATEGORIES);
  const categories = data?.categories || [];
  const [userProfile, setUserProfile] = useState(null);

  const cardStyle = {
    marginBottom: '16px',
  };


  useEffect(() => {
    if (AuthService.loggedIn()) {
      // Get the user's profile data from the JWT token
      const userProfile = AuthService.getProfile();
      const username = userProfile.username;
      setUserProfile(userProfile);
    }
  }, []);

  return (
    <main>
      <div className="home-container">
        <div className="category-list">
        {userProfile ? (
          <Typography variant="h4">Welcome, {userProfile.data.email}</Typography>
        ) : (
          <Typography variant="h4">Welcome!</Typography>
        )}
     
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
                  <Button
                    component="a"
                    href={`/category/${category.name}`}
                    variant="contained"
                    color="primary"
                  >
                    Track Category
                  </Button>
                </CardActions>
              </Card>
            ))
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
