// Import your action types here (make sure they match your actual action types)
import {
  FETCH_ACTIVITIES,
  ADD_ACTIVITY,
  UPDATE_ACTIVITY,
  DELETE_ACTIVITY,
} from './actions';

// Define your initial state
const initialState = {
  activities: [], // Initialize with an empty array
};

// Create your reducer function (rename it to activityReducer)
const activityReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ACTIVITIES:
      return {
        ...state,
        activities: action.payload, // Update the activities array in the state
      };

    case ADD_ACTIVITY:
      return {
        ...state,
        activities: [...state.activities, action.payload], // Add a new activity to the activities array
      };

    case UPDATE_ACTIVITY:
      const updatedActivities = state.activities.map((activity) =>
        activity.id === action.payload.id ? action.payload : activity
      );
      return {
        ...state,
        activities: updatedActivities, // Update an existing activity in the activities array
      };

    case DELETE_ACTIVITY:
      const filteredActivities = state.activities.filter(
        (activity) => activity.id !== action.payload
      );
      return {
        ...state,
        activities: filteredActivities, // Remove an activity from the activities array
      };

    // Add other cases for different actions if needed

    default:
      return state; // Return the unchanged state for unrecognized actions
  }
};

// Export the activityReducer function
export default activityReducer;
