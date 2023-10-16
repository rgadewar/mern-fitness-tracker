import { useQuery, useMutation } from '@apollo/client';
import { GET_ACTIVITY_ID_BY_NAME, GET_USER_WEEKLY_GOAL } from '../../utils/queries';
import { setWeekGoal } from '../../Reducers/actions';
import { SET_GOAL_MUTATION } from '../../utils/mutations';

export default function useActivityData(userProfile, categoryName, dispatch) {
  const { data: activityIdData, loading: activityIdLoading } = useQuery(GET_ACTIVITY_ID_BY_NAME, {
    variables: {
      userId: userProfile?.data._id,
      name: categoryName,
    },
  });

  if (!activityIdLoading) {
    console.log("activityIdData", activityIdData);
  }

  const { data, loading: activityGoalLoading } = useQuery(GET_USER_WEEKLY_GOAL, {
    variables: {
      userId: userProfile?.data._id,
      name: categoryName,
    },
    onCompleted: (data) => {
      if (data && data.getUserWeeklyGoal !== null) {
        const weeklyGoal = data.getUserWeeklyGoal;
        dispatch(setWeekGoal(weeklyGoal));
      }
    },
  });

  const [setGoalMutation] = useMutation(SET_GOAL_MUTATION);

  return {
    activityIdData,
    activityIdLoading,
    data,
    activityGoalLoading,
    setGoalMutation,
  };
}


