import { gql } from '@apollo/client';

// ... (your existing mutations)

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
  mutation updateDailyAchievement($categoryId: ID!, $date: String!, $value: Float!) {
    updateDailyAchievement(categoryId: $categoryId, date: $date, value: $value) {
      message
      success
    }
  }
`;

