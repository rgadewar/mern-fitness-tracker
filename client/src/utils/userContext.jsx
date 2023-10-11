import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_WEEKLY_PROGRESS } from './queries'; // Import the query

// Define your initial state
const initialState = {
  user: null,
  activities: [],
  initialWeeklyProgress: 0,
};

// Create a context for your global state
const GlobalStateContext = createContext();

// Create a reducer function to handle state updates
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_ACTIVITIES':
      return { ...state, activities: action.payload };
    case 'SET_INITIAL_WEEKLY_PROGRESS':
      return { ...state, initialWeeklyProgress: state.initialWeeklyProgress + action.payload };
    case 'ADD_TO_PROGRESS':
      return {
        ...state,
        initialWeeklyProgress: state.initialWeeklyProgress + action.payload,
      };
      
        
    default:
      return state;
  }
};

// Create a custom hook to access the global state and dispatch
export const useGlobalState = () => {
  return useContext(GlobalStateContext);
};

// Create a provider component to wrap your app
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [user, setUser] = useState(null); // User state

  // Fetch the initial weekly progress using the GET_WEEKLY_PROGRESS query
  const { data: weeklyProgressData, loading } = useQuery(GET_WEEKLY_PROGRESS, {
    variables: {
      userId: user?.id, // Replace with your user ID logic
      name: null, // Replace with the desired category name
    },
    skip: !user, // Skip the query if the user is not available
  });

  useEffect(() => {
    if (!loading && weeklyProgressData) {
      // Set the initial weekly progress in the global state
      dispatch({
        type: 'SET_INITIAL_WEEKLY_PROGRESS',
        payload: weeklyProgressData.weeklyProgress,
      });
    }
  }, [weeklyProgressData, loading]);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch, user, setUser }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
