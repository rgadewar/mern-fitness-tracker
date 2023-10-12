import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '../utils/queries';
import { idbPromise } from '../utils/indexedDB'; // Import the function

import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Button,
  Typography,
} from '@mui/material';

const Home = () => {
  const { loading, error, data } = useQuery(GET_CATEGORIES);
  const categories = data?.categories || [];
  console.log("categories****", categories)

  const cardStyle = {
    marginBottom: '16px',
  };

  useEffect(() => {
    function addCategoryToIndexedDB(name, categoryId) {
      const category = { name, _id: categoryId };
      return idbPromise('categories', 'put', category);
    }

    if (categories.length > 0) {
      categories.forEach((category) => {
        addCategoryToIndexedDB(category.name, category._id)
          .then(() => {
            console.log('Category added to IndexedDB:', category);
          })
          .catch((error) => {
            console.error('Error adding category to IndexedDB:', error);
          });
      });
    }
  }, [categories]);

  return (
    <main>
      <div className="home-container">
        <div className="category-list">
          {loading ? (
            <div className="loading-message">Loading...</div>
          ) : error ? (
            <div className="error-message">Error loading categories.</div>
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
                    href={`/category/${category._id}`}
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
