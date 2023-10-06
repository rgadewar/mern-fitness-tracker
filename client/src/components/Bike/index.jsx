import React, { useState } from 'react';

export default function Bike({ name, price, rating, image, id, details }) {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="Bike BikeCard">
      <div className="CardHeader">
        <h2 className="BikeTitle">{name}</h2>
      </div>
      <div className="CardBody">
        <img src={`../assets/${image}`} alt={name} />
        <h3>${price} a night</h3>
        <h4>{rating}⭐️⭐️⭐️⭐️⭐️⭐️</h4>
        <button className="ViewDetailsButton" onClick={toggleDetails}>
          {showDetails ? 'Hide Details' : 'View Details'}
        </button>
        {showDetails && (
          <div className="BikeDetails">
            <p>Capacity: {details.capacity}</p>
            <p>Product Information: {details.productInfo}</p>
          </div>
        )}
      </div>
    </div>
  );
}
