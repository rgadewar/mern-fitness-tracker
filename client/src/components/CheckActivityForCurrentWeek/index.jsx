import React, { useEffect, useState } from 'react';
import AuthService from '../utils/auth';

// Assuming you have a way to fetch user data and their activities
import { getUserActivities, getCurrentUser } from './api'; // Replace with actual API functions

function CheckActivityForCurrentWeek() {
  const [userActivities, setUserActivities] = useState([]);
  const currentUser = getCurrentUser(); // Replace with how you retrieve the current user
  const [userProfile, setUserProfile] = useState(null);
  useEffect(() => {
    if (AuthService.loggedIn()) {
      // Get the user's profile data from the JWT token
      const userProfile = AuthService.getProfile();
      
      // Access the username
      const username = userProfile.username;

      // Update the userProfile state
      setUserProfile(userProfile);
      console.log('User Profile:', userProfile);
      console.log('userProfile.data._id:', userProfile.data._id);
    } else {
      // User is not logged in
      console.log('User is not logged in');
    }
  }, []);


  useEffect(() => {
    // Fetch the user's activities
    getUserActivities(currentUser.id) // Replace with actual user ID
      .then((activities) => {
        setUserActivities(activities);
      })
      .catch((error) => {
        console.error('Error fetching activities:', error);
      });
  }, [currentUser.id]);

  // Function to check if the user has activity for the current week
  const hasActivityForCurrentWeek = () => {
    // Calculate the start and end dates for the current week
    const currentDate = new Date();
    const currentWeekStart = new Date(currentDate);
    currentWeekStart.setHours(0, 0, 0, 0);
    currentWeekStart.setDate(currentDate.getDate() - currentDate.getDay()); // Go to the previous Sunday

    const currentWeekEnd = new Date(currentWeekStart);
    currentWeekEnd.setDate(currentWeekStart.getDate() + 7); // End of the week (7 days later)

    // Check if any of the user's activities have achievements for the current week
    for (const activity of userActivities) {
      for (const achievement of activity.dailyAchievements) {
        if (
          new Date(achievement.date) >= currentWeekStart &&
          new Date(achievement.date) < currentWeekEnd
        ) {
          return true; // User has an activity for the current week
        }
      }
    }

    return false; // No activity for the current week
  };

  return (
    <div>
      <button onClick={() => console.log(hasActivityForCurrentWeek())}>
        Check Activity for Current Week
      </button>
    </div>
  );
}

export default CheckActivityForCurrentWeek;
