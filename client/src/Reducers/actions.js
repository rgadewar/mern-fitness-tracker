// actions.js

// Define action types
export const FETCH_ACTIVITIES = 'FETCH_ACTIVITIES';
export const ADD_ACTIVITY = 'ADD_ACTIVITY';
export const UPDATE_ACTIVITY = 'UPDATE_ACTIVITY';
export const DELETE_ACTIVITY = 'DELETE_ACTIVITY';
export const SET_WEEK_GOAL = 'SET_WEEK_GOAL';
export const UPDATE_WEEKLY_PROGRESS = 'UPDATE_WEEKLY_PROGRESS';
export const SET_TABLE_DATA = 'SET_TABLE_DATA';
export const RESET_STATE = 'RESET_STATE';
export const GET_WEEK_GOAL = 'SET_WEEK_GOAL';

// Action creators
export const fetchActivities = (activities) => ({
  type: FETCH_ACTIVITIES,
  payload: activities,
});

export const addActivity = (activity) => ({
  type: ADD_ACTIVITY,
  payload: activity,
});

export const updateActivity = (activity) => ({
  type: UPDATE_ACTIVITY,
  payload: activity,
});

export const deleteActivity = (activityId) => ({
  type: DELETE_ACTIVITY,
  payload: activityId,
});

export const updateWeeklyProgress = (value) => ({
  type: UPDATE_WEEKLY_PROGRESS,
  payload: value ,
});


// Action creator for setting week goal
export const setWeekGoal = (goal) => ({
  type: SET_WEEK_GOAL,
  payload: goal,
});

export const getWeekGoal = (goal) => ({
  type: GET_WEEK_GOAL,
  payload: goal,
});

export const resetState = () => ({
  type: RESET_STATE,
});