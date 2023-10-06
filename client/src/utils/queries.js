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

export const GET_BIKES = gql`
  query GetBikes {
    bikes {
      _id
      name
      price
      rating
      image
      details {
        capacity
        productInfo
      }
    }
  }
`;

export const QUERY_SINGLE_BIKE = gql`
query singleBike($bikeId: ID!) {
  bike(_id: $bikeId) {
    _id
    rating
    price
    name
    image
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
