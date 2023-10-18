import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import {
  GET_WEEKLY_PROGRESS,
  GET_USER_WEEKLY_GOAL,
} from '../utils/queries';
import CalendarComponent from '../components/CalenderComponent';
import AuthService from '../utils/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setWeekGoal, updateWeeklyProgress, resetState } from '../Reducers/actions';
import { SET_GOAL_MUTATION } from '../utils/mutations';
import useActivityData from '../components/Category/CategoryDetailsUtilFunctions';
import '../components/Category/CategoryDetails.css';


const CategoryDetail = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [categoryName, setCategoryName] = useState('');
  const { name } = useParams(); // Extract categoryName from the URL

  useEffect(() => {
    if (name) {
      setCategoryName(name);
    }
  }, [name]);

  const userProfile = AuthService.getProfile();
   // Inside your authentication logic, after a new user logs in
const handleNewUserLogin = (userProfile) => {
  const dispatch = useDispatch();

  // Reset the Redux state when a new user logs in
  dispatch(resetState());

  // Perform any other actions related to the new user
  // For example, you might set the user profile in Redux or perform other initialization.
  dispatch(setUser(userProfile));
};
  
  

 // Define your GET_WEEKLY_PROGRESS query
const { data: progressData } = useQuery(GET_WEEKLY_PROGRESS, {
  variables: {
    userId: userProfile?.data._id,
    name: categoryName ? categoryName : null,
  },
  onCompleted: (data) => {
    console.log('Data from GET_WEEKLY_PROGRESS query:', data); // Log the data
    dispatch(updateWeeklyProgress(data.weeklyProgress));
  },
});


  
  const { data: goalData, loading: goalLoading} = useQuery(GET_USER_WEEKLY_GOAL, {
    variables: {
      userId: userProfile?.data._id,
      name: categoryName ? categoryName : null,
    },
    onCompleted: (data) => {
      if (data && data.setWeekGoal !== null) {
        
        console.log('GET_USER_WEEKLY_GOAL:', data); // Log the data
        dispatch(setWeekGoal(data.getUserWeeklyGoal));
      }
    },
  });
  

  const [tableData, setTableData] = useState([]);

  const handleCalendarSave = ({ date, value }) => {
    setTableData([
      ...tableData,
      {
        day: date.toLocaleDateString(),
        progress: value,
      },
    ]);
  };

  return (
    <div className="calendar-container">
      <h1>{categoryName}</h1>
      <p>Your Progress: {state.weeklyProgress}</p>

      <div>
        <label htmlFor="weekGoal">Weekly Goal: {state.weekGoal} </label>
      </div>

      <CalendarComponent onSave={handleCalendarSave} name={categoryName} />
      {/* <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Progress</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <tr key={index}>
              <td>{item.day}</td>
              <td>{item.progress}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default CategoryDetail;
