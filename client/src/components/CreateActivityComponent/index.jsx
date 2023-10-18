import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_NEW_ACTIVITY } from '../../utils/mutations';
import AuthService from '../../utils/auth';

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
  Typography,
  CircularProgress,
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
      <Typography variant="h4">Create New Activity</Typography>
      {loading && <CircularProgress />}
      {error && <Typography color="error">Error: {error.message}</Typography>}
      {data && data.createActivity ? (
        <Typography variant="body1" color="success">
          Activity created successfully
        </Typography>
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
        <br />
        <TextField
          fullWidth
          label="Goal"
          name="goal"
          type="number"
          value={activityData.goal}
          onChange={handleChange}
        />
        <br />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: '1rem' }}
        >
          {loading ? 'Creating Activity...' : 'Create Activity'}
        </Button>
      </form>
    </div>
  );
}

export default CreateActivityForm;
