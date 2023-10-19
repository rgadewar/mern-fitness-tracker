import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { GET_USER_ACTIVITIES } from '../../utils/queries';
import AuthService from '../../utils/auth';
import { DELETE_ACTIVITY } from '../../utils/mutations';
import { useDispatch, useSelector } from 'react-redux'; // Import both useDispatch and useSelector from react-redux
import { fetchActivities } from '../../Reducers/actions'; 

const UserActivities = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [userActivities, setUserActivities] = useState([]); 
  const dispatch = useDispatch();

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

  console.log("userProfile", userProfile);

  useEffect(() => {
    // Update userActivities when data changes
    if (data?.getUserActivities?.activities) {
      setUserActivities(data.getUserActivities.activities);
    }
  }, [data]);

  const [deleteActivityMutation] = useMutation(DELETE_ACTIVITY);
  const handleDeleteActivity = async (activityId) => {
    try {
      const response = await deleteActivityMutation({ variables: { activityId } });
  
      if (response.data && response.data.deleteActivity) {
        // Assuming the deletion was successful, update the userActivities state
        const updatedUserActivities = userActivities.filter(
          (activity) => activity._id !== activityId
        );
        setUserActivities(updatedUserActivities);
      } else {
        // Handle other success cases or provide feedback
        console.log("Deletion was not successful");
      }
    } catch (error) {
      // Handle errors and provide feedback to the user
      console.error("Error deleting activity:", error);
    }
  };
  

  if (loading) return <p>Loading...</p>;

  

  return (
    <div>
      <h2>User Activities</h2>
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
              <TableRow key={activity._id}>
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
