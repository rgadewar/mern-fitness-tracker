import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { useUserContext } from '../utils/userContext';

import { QUERY_SINGLE_BIKE } from '../utils/queries';
import { ADD_TO_CART } from '../utils/mutations';

const BikeProfile = () => {
  const { bikeId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_BIKE, {
    variables: { bikeId: bikeId },
  });

  const bike = data?.bike || {};
  const { user } = useUserContext(); // Get the user object from the context

  // Add these lines to check user and userId
  console.log('user:', user); // Check the value of user
  const userId = user ? user._id : null;
  console.log('userId:', userId); // Check the value of userId

  const [quantity, setQuantity] = useState(1);

  const [addToCart] = useMutation(ADD_TO_CART);

  const handleAddToCart = async () => {
    try {
      if (!user || !userId) { // Check userId
        // Handle the case where the user is not authenticated or the user ID is missing
        console.error('User is not authenticated or user ID is missing.');
        return;
      }
  
      await addToCart({
        variables: {
          userId: userId, // Use userId
          bikeId: bike._id,
          quantity: quantity,
        },
      });
  
      alert(`Added ${quantity} ${bike.name}(s) to the cart`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      // Handle error, e.g., show an error message to the user
    }
  };

  useEffect(() => {
    console.log('user:', user); // Check the value of user
    console.log('userId:', userId); // Check the value of userId
  }, [user, userId]); // Include user and userId in the dependencies

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Bike BikeCard">
      <div className="CardHeader">
        <h2 className="BikeTitle">{bike.name}</h2>
      </div>
      <div className="CardBody">
        <img src={`../assets/${bike.image}`} alt={bike.name} />
        <h3>${bike.price} a night</h3>
        <h4>{bike.rating}⭐️⭐️⭐️⭐️⭐️⭐️</h4>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          min="1"
        />
        <button className="AddToCartButton" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default BikeProfile;
