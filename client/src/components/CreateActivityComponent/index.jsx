import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_NEW_ACTIVITY } from '../../utils/mutations';
import AuthService from "../../utils/auth";

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

function CreateActivityForm() {
  const userProfile = AuthService.getProfile();
  const [activityData, setActivityData] = useState({
    name: '',
    goal: 0,
    userId: userProfile ? userProfile.data._id : null,
  });

  const [createActivity, { loading, error, data }] = useMutation(CREATE_NEW_ACTIVITY);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setActivityData({
      ...activityData,
      [name]: name === 'goal' ? parseFloat(value) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createActivity({
      variables: { input: activityData },
    });
  };

  return (
    <div>
      <h2>Create New Activity</h2>
      {loading && <p>Creating activity...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && data.createActivity ? (
        <p>Activity created successfully</p>
      ) : null}
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth>
          <InputLabel>Select Activity Name</InputLabel>
          <Select
            name="name"
            value={activityData.name}
            onChange={handleChange}
          >
            <MenuItem value="Biking">Biking</MenuItem>
            <MenuItem value="Running">Running</MenuItem>
            <MenuItem value="Walking">Walking</MenuItem>
            <MenuItem value="Swimming">Swimming</MenuItem>
          </Select>
        </FormControl>
        <br />
        <label>
          Goal:
          <input
            type="number"
            name="goal"
            value={activityData.goal}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Create Activity</button>
      </form>
    </div>
  );
}

export default CreateActivityForm;