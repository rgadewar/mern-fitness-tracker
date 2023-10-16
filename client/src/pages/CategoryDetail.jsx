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
import { setWeekGoal, updateWeeklyProgress } from '../Reducers/actions';
import { SET_GOAL_MUTATION } from '../utils/mutations';
import useActivityData from '../components/Category/CategoryDetailsUtilFunctions';

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

  // Use the custom hook to get the required data
  const {
    activityIdData,
    activityIdLoading,
    data: activityGoalData,
    activityGoalLoading,
    setGoalMutation,
  } = useActivityData(userProfile, categoryName, dispatch);

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
          goal: parseFloat(state.weekGoal),
        },
      });

      console.log('Mutation result:', data);
    } catch (error) {
      console.error('Mutation error:', error);
    }
  };

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
    <div className="category-detail">
      <h1>{categoryName}</h1>
      <p>Your Progress: {state.weeklyProgress}</p>

      <div>
        <label htmlFor="weekGoal">Weekly Goal: </label>
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
