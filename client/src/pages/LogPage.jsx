import React, { useEffect, useState } from 'react';
import AuthService from '../utils/auth';
import { useQuery } from '@apollo/client';
import { GetDailyAchievements } from '../utils/queries.js';
import DatePickerComponent from '../components/DatePicker';

function TestShowPage() {
  const [userProfile, setUserProfile] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searching, setSearching] = useState(false); // State for searching
  const [searchResults, setSearchResults] = useState(null); // State to store search results

  const name = 'Biking';

  const { loading, error, data } = useQuery(GetDailyAchievements, {
    variables: {
      name,
      startDate: startDate ? startDate.toISOString().split('T')[0] : '',
      endDate: endDate ? endDate.toISOString().split('T')[0] : '',
    },
  });
  console.log("data", data);

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

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const performSearch = () => {
    // Perform search logic here
    // Set searching to true while the search is in progress
    setSearching(true);

    // Simulate a delay to mimic an API call
    setTimeout(() => {
      // Replace this with your actual search logic
      // For now, let's assume the search results are in an array called `filteredData`
      const filteredData = data?.getDailyAchievements || [];

      // Set searchResults to the filtered data
      setSearchResults(filteredData);

      // After the search is complete, you can set searching to false
      setSearching(false);
    }, 1000); // Simulate a 1-second delay
  };

  return (
    <div className="App">
      {userProfile ? (
        <h1>Welcome, {userProfile.data._id}</h1>
      ) : (
        <h1>Welcome!</h1>
      )}
      <h1>Your Daily Achievements</h1>
      <DatePickerComponent
        selectedDate={startDate}
        handleDateChange={handleStartDateChange}
        label="Select Start Date"
      />
      <DatePickerComponent
        selectedDate={endDate}
        handleDateChange={handleEndDateChange}
        label="Select End Date"
      />
      <button onClick={performSearch}>Search</button>
      <ul>
        {searching ? (
          <li>Searching...</li>
        ) : (
          searchResults?.map((item, index) => (
            <li key={index}>
              Date: {item.date}, Value: {item.value}
            </li>
          ))
        )}
        {!searching && searchResults && searchResults.length === 0 && (
          <li>No activities found</li>
        )}
      </ul>
    </div>
  );
}

export default TestShowPage;
