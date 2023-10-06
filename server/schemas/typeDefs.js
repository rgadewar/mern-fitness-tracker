const typeDefs = `
type User {
  _id: ID
  name: String
  email: String
  password: String
  activities: [Activity]!
}

type Auth {
  token: ID!
  user: User
}

type Activity {
  _id: ID!
  name: String!
  goal: Float!
  dailyAchievements: [DailyAchievement]!
  user: User!
}
type UpdateDailyAchievementResponse {
  message: String
  success: Boolean
}

type DailyAchievement {
  date: String!
  value: Float!
}

type Category {
  _id: ID!
  name: String!
}
type Query {
  users: [User]!
  user(userId: ID!): User
  activities: [Activity]!  # Add this line to define the 'activities' query
  categories: [Category]!
  getCategoryName(categoryId: ID!): String
  me: User
}

type Mutation {
  addUser(name: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  removeUser(userId: ID!): User
  updateDailyAchievement(categoryId: ID!, date: String!, value: Float!): UpdateDailyAchievementResponse
}
`;

module.exports = typeDefs;
