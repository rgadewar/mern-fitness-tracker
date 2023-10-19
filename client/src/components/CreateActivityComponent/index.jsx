import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_NEW_ACTIVITY } from '../../utils/mutations';
import AuthService from '../../utils/auth';
import { useDispatch, useSelector } from 'react-redux'; // Import both useDispatch and useSelector from react-redux
import { addActivity } from '../../Reducers/actions'; // Import your addActivity action creator
import { Snackbar, Alert } from '@mui/material';
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
  const activities = useSelector((state) => state.activities);
  const [createActivity, { loading, error }] = useMutation(CREATE_NEW_ACTIVITY);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');

  const dispatch = useDispatch(); // Get access to the dispatch function

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
    }).then((response) => {
      if (response.data) {
        const newActivity = response.data.createActivity; // Adjust this based on your GraphQL response structure
        dispatch(addActivity(newActivity)); // Dispatch the addActivity action
      }
      setSnackbarMsg('Added activity');
      setOpenSnackbar(true);

      setTimeout(() => {
        setOpenSnackbar(false);
      }, 3000);
    });
  }

  return (
    <div>
      <Typography variant="h4">Create New Activity</Typography>
      {loading && <CircularProgress />}
      {error && <Typography color="error">Error: {error.message}</Typography>}
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
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity="success" onClose={() => setOpenSnackbar(false)}>
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CreateActivityForm;
