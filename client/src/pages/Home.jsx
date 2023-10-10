import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '../utils/queries'; // Import the new query
import Category from '../components/Category'; // Import the Category component
import '../components/Home/Home.css'; // Import the external CSS file
import { useDispatch, useSelector } from 'react-redux';
import { RESET_STATE } from '../Reducers/actions'; 


const Home = () => {
  const { loading, error, data } = useQuery(GET_CATEGORIES); // Use GET_CATEGORIES query
  const categories = data?.categories || [];
  const [selectedCategory, setSelectedCategory] = useState(null);
  const state = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();

  const handleCategoryChange = (event) => {
    const selectedCategoryId = event.target.value;
    setSelectedCategory(selectedCategoryId);
    // Dispatch the "reset" action to reset the Redux store
    const dispatch = useDispatch();
    dispatch(RESET_STATE);
  };

  return (
    <main>
      
      <div className="home-container">
        <div className="category-selection">
          <label htmlFor="categoryDropdown">Select a Category:</label>
          <select
            id="categoryDropdown"
            name="categoryDropdown"
            value={selectedCategory || ''}
            onChange={handleCategoryChange}
          >
            <option value="">-- Select Category --</option>
            {categories.map((category) => (
              <option value={category._id} key={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        {selectedCategory && ( // Conditionally render category list only if a category is selected
          <div className="category-list">
            {loading ? (
              <div className="loading-message">Loading...</div>
            ) : categories.length === 0 ? (
              <div className="no-categories-message">No categories available.</div>
            ) : (
              categories
                .filter((category) => category._id === selectedCategory)
                .map((category) => (
                  <Link to={`/category/${category._id}`} key={category._id} className="category-link">
                    <Category {...category} />
                  </Link>
                ))
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
