import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { GET_USER_ACTIVITIES } from '../../utils/queries';
import AuthService from '../../utils/auth';
import { DELETE_ACTIVITY } from '../../utils/mutations';
import { useDispatch, useSelector } from 'react-redux';
import { fetchActivities } from '../../Reducers/actions';

const UserActivities = () => {
  const [userProfile, setUserProfile] = useState(null);
  const dispatch = useDispatch();
  const userActivities = useSelector((state) => state.activities);
  const [updatedActivity, setUpdatedActivity] = useState(null); // State to track updated activity

  const { loading, data, refetch } = useQuery(GET_USER_ACTIVITIES, {
    variables: { userId: userProfile ? userProfile.data._id : null },
  });

  useEffect(() => {
    if (data && data.getUserActivities) {
      dispatch(fetchActivities(data.getUserActivities.activities));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (AuthService.loggedIn()) {
      const userProfile = AuthService.getProfile();
      setUserProfile(userProfile);
    }
  }, []);

  useEffect(() => {
    if (userProfile) {
      refetch();
    }
  }, [userProfile, refetch]);

  useEffect(() => {
    refetch(); // Trigger a refetch when 'userActivities' change
  }, [userActivities]);

  const [deleteActivityMutation] = useMutation(DELETE_ACTIVITY);
  const handleDeleteActivity = async (activityId) => {
    try {
      const response = await deleteActivityMutation({ variables: { activityId } });

      if (response.data && response.data.deleteActivity) {
        const updatedUserActivities = userActivities.filter((activity) => activity._id !== activityId);
        dispatch(fetchActivities(updatedUserActivities)); // Dispatch the updated activities to the store

        // Set the updated activity in the state
        const deletedActivity = userActivities.find((activity) => activity._id === activityId);
        setUpdatedActivity(deletedActivity);

        // You can also reset the message after a timeout
        setTimeout(() => setUpdatedActivity(null), 5000);
      } else {
        console.log("Deletion was not successful");
      }
    } catch (error) {
      console.error("Error deleting activity:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>User Activities</h2>
      {updatedActivity && <p>Updated activity: {updatedActivity.name}</p>} {/* Render the updated activity message */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Goal</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userActivities.map((activity) => (
              <TableRow key={activity.name}>
                <TableCell>{activity.name}</TableCell>
                <TableCell>{activity.goal}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleDeleteActivity(activity._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserActivities;
