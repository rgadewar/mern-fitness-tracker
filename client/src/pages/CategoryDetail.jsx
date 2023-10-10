import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CATEGORIES, GET_WEEKLY_PROGRESS, GET_ACTIVITY_ID_BY_NAME } from '../utils/queries';
import CalendarComponent from '../components/CalenderComponent';
import AuthService from '../utils/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setWeekGoal, updateWeeklyProgress } from '../Reducers/actions';
import { SET_GOAL_MUTATION } from '../utils/mutations';

const CategoryDetail = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { categoryId } = useParams();
  const { loading: categoriesLoading, error: categoriesError, data: categoriesData } = useQuery(GET_CATEGORIES); // Renamed variables to avoid conflicts
  const [categoryName, setCategoryName] = useState('');
  const userProfile = AuthService.getProfile();

  // Retrieve the initial weekly progress and weeklyProgress from the global state
  const initialWeeklyProgress = useSelector((state) => state.initialWeeklyProgress);
  const weeklyProgress = useSelector((state) => state.weeklyProgress);
  console.log("categoryName ************", categoryName);

  // Define your GET_ACTIVITY_ID_BY_NAME query
  const { data: activityIdData, loading: activityIdLoading, error: activityIdError } = useQuery(GET_ACTIVITY_ID_BY_NAME, {
    variables: {
      name: categoryName, // Use the categoryName or modify as needed
    },
  });
  
  if (activityIdLoading) {
    // Handle loading state (optional)
  } else if (activityIdError) {
    console.error("Error fetching activityIdData:", activityIdError);
  } else {
    // Now you can access activityIdData safely
    console.log("activityIdData", activityIdData);
  }
  console.log("activityIdData", activityIdData);

  // Define a function to handle goal submission
  const [setGoalMutation] = useMutation(SET_GOAL_MUTATION); // Initialize the mutation

  const handleGoalSubmit = async () => {
    try {
      // Check if categoryName is available
      if (!categoryName) {
        console.log('Category name is not available yet...');
        return;
      }
  
      // Check if activityIdData is available and contains the necessary data
      if (!activityIdData || !activityIdData.activityIdByName) {
        console.log('Activity ID is not available yet...');
        return;
      }
  
      // Execute the mutation to set the goal
      const { data } = await setGoalMutation({
        variables: {
          activityId: activityIdData.activityIdByName,
          goal: state.weekGoal,
        },
      });
  
      // Handle the mutation result if needed
      console.log('Mutation result:', data);
  
      // Optionally, you can reset the form or take other actions
      // ...
  
    } catch (error) {
      console.error('Mutation error:', error);
    }
  };
  
  

  // Define your GET_WEEKLY_PROGRESS query
  const { data: progressData } = useQuery(GET_WEEKLY_PROGRESS, {
    variables: {
      userId: userProfile?.data._id,
      name: categoryName ? categoryName : null,
    },
    // Add an onCompleted callback to handle the retrieved data
    onCompleted: (data) => {
      // Dispatch an action to set the initialWeeklyProgress in the global state
      dispatch(updateWeeklyProgress(data.weeklyProgress));
    },
  });

  useEffect(() => {
    if (!categoriesLoading && !categoriesError && categoriesData) {
      const category = categoriesData.categories.find((cat) => cat._id === categoryId);

      if (category) {
        setCategoryName(category.name);
      }
    }
  }, [categoryId, categoriesData, categoriesLoading, categoriesError]);

  const handleWeeklyProgressChange = (e) => {
    // Dispatch an action to set the weekly progress in the global state
    dispatch(updateWeeklyProgress(e.target.value));
  };

  const [tableData, setTableData] = useState([]);

  const handleCalendarSave = ({ date, value }) => {
    setTableData([
      ...tableData,
      {
        day: date.toLocaleDateString(),
        weeklyProgress: value,
      },
    ]);
  };

  // Remove the local weekGoal state and use state.weekGoal from Redux
  return (
    <div className="category-detail">
      <h1>{categoryName}</h1>
      <p>Your Progress: {weeklyProgress}</p>
      <div>
        <label htmlFor="weekGoal">Weekly Goal:</label>
        <input
          type="number"
          id="weekGoal"
          value={state.weekGoal}
          onChange={(e) => dispatch(setWeekGoal(Number(e.target.value)))}
        />
        <button onClick={handleGoalSubmit}>Set Goal</button>
      </div>

      <CalendarComponent onSave={handleCalendarSave} name={categoryName} />
      <table>
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
      </table>
    </div>
  );
};

export default CategoryDetail;
