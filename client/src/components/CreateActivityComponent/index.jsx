import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_NEW_ACTIVITY } from '../../utils/mutations'; // Import your mutations and query
import { GET_CATEGORIES } from '../../utils/queries'; 
import AuthService from '../../utils/auth';
import { useDispatch, useSelector } from 'react-redux';
import { addActivity } from '../../Reducers/actions';
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
import { gql } from '@apollo/client'; // Import the gql tag

function CreateActivityForm() {
  const userProfile = AuthService.getProfile();
  const [activityData, setActivityData] = useState({
    name: '',
    categoryID: '', // Update field name to categoryID
    goal: 0,
    userId: userProfile ? userProfile.data._id : null,
  });
  console.log('Initial activityData:', activityData);
  
  const activities = useSelector((state) => state.activities);
  const [createActivity, { loading, error }] = useMutation(CREATE_NEW_ACTIVITY);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'goal') {
      setActivityData({
        ...activityData,
        [name]: parseFloat(value),
      });
    } else {
      setActivityData({
        ...activityData,
        [name]: value,
      });
    };
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createActivity({
      variables: { input: activityData },
    }).then((response) => {
      if (response.data) {
        const newActivity = response.data.createActivity;
        dispatch(addActivity(newActivity));
      }
      setSnackbarMsg('Added activity');
      setOpenSnackbar(true);

      setTimeout(() => {
        setOpenSnackbar(false);
      }, 3000);

      // Log activityData after the form is submitted
      console.log('Activity Data after form submission:', activityData);
    });
  };

  // Fetch the categories using the useQuery hook
  const { data: categoriesData, loading: categoriesLoading, error: categoriesError } = useQuery(GET_CATEGORIES);

  // Define a function to render the category options
  const renderCategoryOptions = () => {
    if (categoriesLoading) {
      return <MenuItem value="">Loading Categories...</MenuItem>;
    }
    if (categoriesError) {
      return <MenuItem value="">Error Loading Categories</MenuItem>;
    }
    if (categoriesData && categoriesData.categories) {
      return categoriesData.categories.map((category) => (
        <MenuItem key={category._id} value={category._id}>
          {category.name}
        </MenuItem>
      ));
    }
    return null;
  };

  return (
    <div>
      <Typography variant="h4">Create New Activity</Typography>
      {loading && <CircularProgress />}
      {error && <Typography color="error">Error: {error.message}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Activity Name"
          name="name"
          value={activityData.name}
          onChange={handleChange}
        />
        <br />
        <br />
       
        <FormControl fullWidth>
          <InputLabel>Select Category</InputLabel>
          <Select
            name="categoryID" // Update the name to categoryID
            value={activityData.categoryID} // Update the value to categoryID
            onChange={handleChange}
          >
            {renderCategoryOptions()}
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
