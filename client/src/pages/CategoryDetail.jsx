import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '../utils/queries';
import CalendarComponent from "./CalenderComponent.jsx"; // Note the correct spelling of "CalenderComponent"
import { ActivityProvider, useActivity } from '../utils/ActivityContext'; // Import the ActivityProvider

 // Import the CalendarComponent

const CategoryDetail = () => {
  const { categoryId } = useParams();
  const { loading, error, data } = useQuery(GET_CATEGORIES);
  const [categoryName, setCategoryName] = useState('');
  const { state, dispatch } = useActivity(); // Access the activity state and dispatch
  useEffect(() => {
    if (!loading && !error && data) {
      const category = data.categories.find((cat) => cat._id === categoryId);

      if (category) {
        setCategoryName(category.name);
      }
    }
  }, [categoryId, data, loading, error]);

  // State variables for form input
  const [weekGoal, setWeekGoal] = useState('');
  const [dailyProgress, setDailyProgress] = useState('');

  // State variable for the table data (replace with your data retrieval logic)
  const [tableData, setTableData] = useState([]);

  // Function to handle form input changes
  const handleWeekGoalChange = (e) => {
    setWeekGoal(e.target.value);
  };

  const handleDailyProgressChange = (e) => {
    setDailyProgress(e.target.value);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Week Goal:', weekGoal);
    console.log('Daily Progress:', dailyProgress);

    // Update tableData with new data (replace this logic with your data update)
    setTableData([
      ...tableData,
      {
        day: 'Monday',
        progress: dailyProgress,
      },
      {
        day: 'Tuesday',
        progress: dailyProgress,
      },
      // Add data for other days of the week
    ]);

    // Clear form inputs
    setWeekGoal('');
    setDailyProgress('');
  };

  // Function to handle saving data from CalendarComponent
  const handleCalendarSave = ({ date, value }) => {
    // Update the tableData with the selected date and value
    setTableData([
      ...tableData,
      {
        day: date.toLocaleDateString(), // Convert the date to a string
        progress: value,
      },
    ]);
  };

  return (
    <div className="category-detail">
      <h1>{categoryName}</h1>
      {/* <form onSubmit={handleSubmit}>
        <label>
          Week Goal:
          <input
            type="number"
            value={weekGoal}
            onChange={handleWeekGoalChange}
          />
        </label>
        <label>
          Daily Progress:
          <input
            type="number"
            value={dailyProgress}
            onChange={handleDailyProgressChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form> */}

      {/* Add the CalendarComponent here */}
      <CalendarComponent onSave={handleCalendarSave} />

      {/* Table to display data for the current week */}
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
