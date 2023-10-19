import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import './CalenderComponent.css'; // Import the CSS file
import { useMutation } from '@apollo/client';
import { UPDATE_DAILY_ACHIEVEMENT } from '../../utils/mutations';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_WEEKLY_PROGRESS } from '../../utils/queries';
import AuthService from '../../utils/auth';
import { useDispatch, useSelector } from 'react-redux';
import { updateWeeklyProgress, updateActivity } from '../../Reducers/actions';
import { useCalendarFunctions } from './CalendarUtilFunctions';

const CalendarComponent = ({ onSave, name }) => {
  const [date, setDate] = useState(new Date());
  const [value, setValue] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [entryData, setEntryData] = useState({});
  const [goal, setGoal] = useState(100); // Initialize goal with 0
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    if (AuthService.loggedIn()) {
      const userProfile = AuthService.getProfile();
      setUserProfile(userProfile);
    } else {
      console.log('User is not logged in');
    }
  }, []);

 

  const [updateDailyAchievement] = useMutation(UPDATE_DAILY_ACHIEVEMENT);
  const { data: progressData } = useQuery(GET_WEEKLY_PROGRESS, {
    variables: { userId: userProfile?.data._id, name: name }, // Use optional chaining to prevent null error
  });

  const state = useSelector((state) => {
    return state;
  });

  const dispatch = useDispatch();
  const weekGoal = state.weekGoal || 0;
  const initialWeeklyProgress = state.initialWeeklyProgress || 0;
  const activities = state.activities || [];

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleValueChange = (e) => {
    setValue(e.target.value);
  };

  const handleSave = async () => {
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
              name: name,
              date: selectedDate.toISOString(),
              value: parseFloat(value),
              userId: userProfile.data._id,
            },
          });
          if (response.data && response.data.updateDailyAchievement) {
            const updatedWeeklyProgress =
              parseFloat(weeklyProgress) + parseFloat(value);

            const updatedEntryData = { ...entryData };
            updatedEntryData[selectedDate.toDateString()] = {
              progress: value,
            };
            setEntryData(updatedEntryData);

            onSave({ date: selectedDate, value: parseFloat(value) });
            setDate(new Date());
            setValue('');
            setSelectedDate(null);

            const newDailyAchievement = {
              date: new Date(selectedDate.toDateString()),
              value: parseFloat(value),
              name: name,
            };

            dispatch(updateActivity(newDailyAchievement));
            dispatch({
              type: 'UPDATE_WEEKLY_PROGRESS',
              payload: parseFloat(value),
            });
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
    let weeklyTotal = parseFloat(initialWeeklyProgress);
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
      {userProfile ? (
        <div>
          <h2>Calendar</h2>
          <p style={{ color: 'blue' }}>Please click the date to track the activity for the current week</p>
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
                />
                <button onClick={handleSave}>Save</button>
              </div>
            )}
          </div>
          <div>
            <h3>Weekly Progress</h3>
            <div>
              <p>Goal: {weekGoal}</p>
              <p>Your Progress: {state.weeklyProgress}</p>
              <progress className="custom-progress" max={weekGoal} value={state.weeklyProgress} />
            </div>
          </div>
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
};

export default CalendarComponent;
