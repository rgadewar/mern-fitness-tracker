// Import your action types here (make sure they match your actual action types)
import {
  FETCH_ACTIVITIES,
  ADD_ACTIVITY,
  UPDATE_ACTIVITY,
  DELETE_ACTIVITY,
  SET_WEEK_GOAL,
  UPDATE_WEEKLY_PROGRESS,
  SET_TABLE_DATA,
} from "./actions";

// Define your initial state
const initialState = {
  activities: [], // Initialize with an empty array
  weekGoal: 100,
  initialWeeklyProgress: 0,
  weeklyProgress: 0,
  tableData: [],
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
      const activityName = action.payload.name;
      const existingActivity = state.activities.find(
        (activity) => activity.name === activityName
      );

      if (existingActivity) {
        // Activity with the same name already exists, update its goal
        existingActivity.goal = action.payload.goal;
        return {
          ...state,
          activities: [...state.activities],
        };
      } else {
        // Activity with a unique name, add it to the activities array
        return {
          ...state,
          activities: [...state.activities, action.payload],
        };
      }

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

    case SET_WEEK_GOAL:
      return { ...state, weekGoal: action.payload };

    case UPDATE_WEEKLY_PROGRESS:
      return {
        ...state,
        weeklyProgress: state.weeklyProgress + action.payload,
      };
    case "RESET":
      return initialState;

    default:
      return state; // Return the unchanged state for unrecognized actions
  }
};

// Export the activityReducer function
export default activityReducer;
