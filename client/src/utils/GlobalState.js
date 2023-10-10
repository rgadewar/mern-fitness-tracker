import React, { createContext, useContext, useReducer, useState } from 'react';

// Define your initial state
const initialState = {
  user: null,
  activities: [],
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
    default:
      return state;
  }
};

// Create a custom hook to access the global state and dispatch
export const useGlobalState = () => {
  return useContext(GlobalStateContext);
};

// Create a provider component to wrap your app
export const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [user, setUser] = useState(null); // User state

  return (
    <GlobalStateContext.Provider value={{ state, dispatch, user, setUser }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
