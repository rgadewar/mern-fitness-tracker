import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      token
      user {
        _id
        name
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
      }
    }
  }
`;

export const UPDATE_DAILY_ACHIEVEMENT = gql`
mutation UpdateDailyAchievement($name: ActivityName!, $date: String!, $value: Float!, $userId: ID!) {
  updateDailyAchievement(name: $name, date: $date, value: $value, userId: $userId) {
    message
    success
  }
}


`;

export const SET_GOAL_MUTATION = gql`
mutation SetGoal($userId: ID!, $activityId: ID!, $goal: Float!) {
  setGoal(userId: $userId, activityId: $activityId, goal: $goal) {
    goal
    name
  }
}
`;

