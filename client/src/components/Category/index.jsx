import React from 'react';

const Category = ({ _id, name }) => {
  return (
    <div className="category">
      <h3>{name}</h3>
      {/* You can add more content or styling here */}
    </div>
  );
};

export default Category;
