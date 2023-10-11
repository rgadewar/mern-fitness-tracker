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
query Query($userId: ID!, $name: String!) {
  weeklyProgress(userId: $userId, name: $name)
}
`;

export const GetDailyAchievements = gql`
query GetDailyAchievements($name: String!, $startDate: String!, $endDate: String!) {
  getDailyAchievements(name: $name, startDate: $startDate, endDate: $endDate) {
    date
    value
  }
}
`;
export const GET_ACTIVITY_ID_BY_NAME = gql`
query activityIdByName($name: String!) {
  activityIdByName(name: $name)
}
`;