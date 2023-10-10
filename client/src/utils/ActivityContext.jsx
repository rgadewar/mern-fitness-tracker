import React, { createContext, useContext, useReducer } from 'react';

// Define your initial state here
const initialState = {
  weekGoal: '',
  dailyProgress: '',
  tableData: [],
};

// Create a context for your activity state
const ActivityContext = createContext();

// Define actions to update the state
const SET_WEEK_GOAL = 'SET_WEEK_GOAL';
const SET_DAILY_PROGRESS = 'SET_DAILY_PROGRESS';
const SET_TABLE_DATA = 'SET_TABLE_DATA';

// Create a reducer to handle state updates
const activityReducer = (state, action) => {
  switch (action.type) {
    case SET_WEEK_GOAL:
      return { ...state, weekGoal: action.payload };
    case SET_DAILY_PROGRESS:
      return { ...state, dailyProgress: action.payload };
    // case SET_TABLE_DATA:
    //   return { ...state, tableData: action.payload };
    default:
      return state;
  }
};

// Create a custom hook to access the activity state and dispatch functions
export const useActivity = () => {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error('useActivity must be used within an ActivityProvider');
  }
  return context;
};

// Create an ActivityProvider component to wrap your app with
export const ActivityProvider = ({ children }) => {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  return (
    <ActivityContext.Provider value={{ state, dispatch }}>
      {children}
    </ActivityContext.Provider>
  );
};
