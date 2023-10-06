import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '../utils/queries'; // Import the new query
import Category from '../components/Category'; // Import the Category component

const Home = () => {
  const { loading, error, data } = useQuery(GET_CATEGORIES); // Use GET_CATEGORIES query
  const categories = data?.categories || [];

  return (
    <main>
      <div className="home-container">
        <div className="category-list">
          {loading ? (
            <div className="loading-message">Loading...</div>
          ) : categories.length === 0 ? (
            <div className="no-categories-message">No categories available.</div>
          ) : (
            categories.map((category) => (
              <Link to={`/category/${category?._id}`} key={category?._id} className="category-link">
                <Category {...category} />
              </Link>
            ))
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
