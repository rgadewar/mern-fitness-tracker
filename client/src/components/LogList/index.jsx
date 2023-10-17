import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '../utils/queries';
import { Table, Input, Select } from 'reactstrap'; // Import Select

const LogList = ({ logs }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Fetch categories using Apollo Client
  const { loading, error, data } = useQuery(GET_CATEGORIES);

  if (loading) {
    return <p>Loading categories...</p>;
  }

  if (error) {
    return <p>Error loading categories: {error.message}</p>;
  }

  const categories = data.categories; // Adjust this based on the actual shape of your data
  console.log("categories", categories);


  // Filter logs based on the selected category
  const filteredLogs = selectedCategory === 'All'
    ? logs
    : logs.filter((log) => log.category === selectedCategory);

  return (
    <div>
      <label>Select Category: </label>
      <Select // Use Select component
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="All">All</option>
        {categories.map((category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </Select>

      <Table responsive>
        <thead>
          <tr>
            <th>Date</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {filteredLogs.map((log, index) => (
            <tr key={index}>
              <td>{log.date}</td>
              <td>{log.value}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default LogList;
