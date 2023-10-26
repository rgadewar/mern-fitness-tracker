import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query allUsers {
    users {
      _id
      name
      skills
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query singleUser($userId: ID!) {
    user(userId: $userId) {
      _id
      name
      skills
    }
  }
`;


export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      _id
      name
    }
  }
`;


export const GET_WEEKLY_PROGRESS = gql`
query Query($userId: ID!, $activityId: ID!) {
  weeklyProgress(userId: $userId, activityId: $activityId)
}
`;

export const GetDailyAchievements = gql`
query GetDailyAchievements($userId: ID!, $activityId: ID!, $startDate: String!, $endDate: String!) {
  getDailyAchievements(userId: $userId, activityId: $activityId, startDate: $startDate, endDate: $endDate) {
    date
    value
  }
}

`;
export const GET_ACTIVITY_ID_BY_NAME = gql`
query Query($userId: ID!, $name: ActivityName!) {
  getUserWeeklyGoal(userId: $userId, name: $name)
}
`;

export const GET_USER_WEEKLY_GOAL = gql`
query Query($userId: ID!, $activityId: ID!) {
  getUserWeeklyGoal(userId: $userId, activityId: $activityId)
}
`;

// export const GET_USER_ACTIVITIES = gql`
// query($userId: ID!) {
//   getUserActivities(userId: $userId) {
//     activities {
//       category {
//         name
//       }
//       goal
//       name
//     }
//   }
// }
// `;

export const GET_USER_ACTIVITIES = gql`
query($userId: ID!) {
  getUserActivities(userId: $userId) {
    _id
    activities {
      _id
      name
      goal
      category {
                name
              }
    }
  }
}
`;

export const GET_CATEGORY_FOR_ACTIVITY = gql`
query GetCategoryForActivity($activityId: ID!) {
  getCategoryForActivity(activityId: $activityId) {
    _id
    name
  }
}
`;