import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import Calendar styles
// import './CalendarComponent.css'; // Import your custom CSS file
import { useMutation } from '@apollo/client';
import { UPDATE_DAILY_ACHIEVEMENT } from '../utils/mutations'; // Import the mutation
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '../utils/queries';
import AuthService from '../utils/auth';



const CalendarComponent = ({ onSave }) => {
  const [date, setDate] = useState(new Date());
  const [value, setValue] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [entryData, setEntryData] = useState({});
  const [goal, setGoal] = useState(100); // Define your weekly goal here
  const [categoryName, setCategoryName] = useState('');
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


  const { categoryId } = useParams(); // Extract categoryId from URL

  const [updateDailyAchievement] = useMutation(UPDATE_DAILY_ACHIEVEMENT);
   // Fetch categories using the useQuery hook
   const { data, loading, error } = useQuery(GET_CATEGORIES);
  useEffect(() => {
    // Check if data is available before using it
    if (!loading && !error && data) {
      const category = data.categories.find((cat) => cat._id === categoryId);
  
      if (category) {
        setCategoryName(category.name);
      }
    }
  }, [categoryId, data, loading, error]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleValueChange = (e) => {
    setValue(e.target.value);
  };

const handleSave = async () => {
  console.log('Selected Date:', selectedDate);
  console.log('categoryId:', categoryId);
  console.log('value:', value);
  if (selectedDate) {
    const currentDate = new Date();
    const firstDayOfWeek = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - currentDate.getDay()
    );
    const lastDayOfWeek = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + (6 - currentDate.getDay())
    );

    if (selectedDate >= firstDayOfWeek && selectedDate <= lastDayOfWeek) {
      if (!AuthService.loggedIn()) {
        console.error('User not authenticated.');
        return;
      }
      try {
        const response = await updateDailyAchievement({
          variables: {
            name: categoryName, // Include categoryName in the variables
            date: selectedDate.toISOString(),
            value: parseFloat(value),
            userId: userProfile.data._id, // Provide the user's ID here
          },
        });
        console.log('Received response:', response);
        if (response.data && response.data.updateDailyAchievement) {
          const updatedEntryData = { ...entryData };
          updatedEntryData[selectedDate.toDateString()] = {
            progress: value,
          };
          setEntryData(updatedEntryData);

          onSave({ date: selectedDate, value: parseFloat(value) });
          setDate(new Date());
          setValue('');
          setSelectedDate(null);
        } else {
          console.error(
            'Daily achievement update failed:',
            response.data?.updateDailyAchievement?.message
          );
        }
      } catch (error) {
        console.error(
          'An error occurred while updating daily achievement:',
          error
        );
      }
    } else {
      console.error('Selected date is not within the current week.');
    }
  } else {
    console.error('Selected date is not defined.');
  }
};


  const handleSelectDate = (date) => {
    setSelectedDate(date);
    setValue(entryData[date.toDateString()]?.progress || '');
  };

  const calculateWeeklyProgress = () => {
    let weeklyTotal = 0;
    for (const date in entryData) {
      weeklyTotal += parseFloat(entryData[date].progress) || 0;
    }
    return weeklyTotal;
  };

  const weeklyProgress = calculateWeeklyProgress();

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const currentDate = new Date();
      const firstDayOfWeek = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - currentDate.getDay()
      );
      const lastDayOfWeek = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + (6 - currentDate.getDay())
      );

      if (date >= firstDayOfWeek && date <= lastDayOfWeek) {
        return 'highlighted-week';
      }
    }
    return '';
  };

  return (
    <div>
      <h2>Calendar</h2>
      <div>
        <Calendar
          onChange={handleDateChange}
          value={date}
          onClickDay={handleSelectDate}
          tileContent={({ date }) => {
            return <div>{/* You can add content here */}</div>;
          }}
          tileClassName={tileClassName}
        />
      </div>
      <div>
        {selectedDate && (
          <div>
            <p>Selected Date: {selectedDate.toLocaleDateString()}</p>
            <input
              type="text"
              placeholder="Enter value"
              value={value}
              onChange={handleValueChange}
              style={{
                border: '1px solid #ccc',
                padding: '5px',
                borderRadius: '4px',
              }}
            />
            <button
              onClick={handleSave}
              style={{
                backgroundColor: '#007bff',
                color: '#fff',
                padding: '5px 10px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Save
            </button>
          </div>
        )}
      </div>
      <div>
        <h3>Weekly Progress</h3>
        <div>
          <p>Goal: {goal}</p>
          <p>Your Progress: {weeklyProgress}</p>
          <progress max={goal} value={weeklyProgress} style={{ width: '100%' }} />
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;
