import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CATEGORIES, GET_WEEKLY_PROGRESS, GET_ACTIVITY_ID_BY_NAME } from '../utils/queries';
import CalendarComponent from '../components/CalenderComponent';
import AuthService from '../utils/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setWeekGoal, updateWeeklyProgress } from '../Reducers/actions';
import { SET_GOAL_MUTATION } from '../utils/mutations';
import { idbPromise,getCategoriesFromIndexedDB } from '../utils/indexedDB'; // Import the function


const CategoryDetail = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { categoryId } = useParams();
  // const { loading: categoriesLoading, error: categoriesError, data: categoriesData } = useQuery(GET_CATEGORIES);
  const [categoryName, setCategoryName] = useState('');
  const userProfile = AuthService.getProfile();

  // Retrieve the initial weekly progress and weeklyProgress from the global state
  const initialWeeklyProgress = useSelector((state) => state.initialWeeklyProgress);
  useEffect(() => {
    getCategoriesFromIndexedDB() // Call the function to fetch categories from IndexedDB
      .then((categories) => {
        // Process the categories data
        const category = categories.find((cat) => cat._id === categoryId);

        if (category) {
          setCategoryName(category.name);
        }
      })
      .catch((error) => {
        console.error('Error fetching categories from IndexedDB:', error);
      });
  }, [categoryId]);



  // Define your GET_ACTIVITY_ID_BY_NAME query
  const { data: activityIdData, loading: activityIdLoading, error: activityIdError } = useQuery(GET_ACTIVITY_ID_BY_NAME, {
    variables: {
      userId: userProfile?.data._id,
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

  // Define a function to handle goal submission
  const [setGoalMutation] = useMutation(SET_GOAL_MUTATION);

  const handleGoalSubmit = async () => {
    try {
      if (!categoryName) {
        console.log('Category name is not available yet...');
        return;
      }

      if (!activityIdData || !activityIdData.activityIdByName) {
        console.log('Activity ID is not available yet...');
        return;
      }

      const { data } = await setGoalMutation({
        variables: {
          userId: userProfile?.data._id,
          activityId: activityIdData.activityIdByName,
          goal: state.weekGoal,
        },
      });

      console.log('Mutation result:', data);
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
    onCompleted: (data) => {
      dispatch(updateWeeklyProgress(data.weeklyProgress));
    },
  });

  // useEffect(() => {
  //   if (!categoriesLoading && !categoriesError && categoriesData) {
  //     const category = categoriesData.categories.find((cat) => cat._id === categoryId);

  //     if (category) {
  //       setCategoryName(category.name);
  //     }
  //   }
  // }, [categoryId, categoriesData, categoriesLoading, categoriesError]);

  const handleWeeklyProgressChange = (e) => {
    dispatch(updateWeeklyProgress(e.target.value));
  };

  const [tableData, setTableData] = useState([]);

  const handleCalendarSave = ({ date, value }) => {
    setTableData([
      ...tableData,
      {
        day: date.toLocaleDateString(),
        progress: value, // Fixed the variable name here
      },
    ]);
  };


  // Remove the local weekGoal state and use state.weekGoal from Redux
  return (
    <div className="category-detail">
      <h1>{categoryName}</h1>
      <p>Your Progress: {state.weeklyProgress}</p>

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
