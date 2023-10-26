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

enum ActivityName {
  Swimming
  Running
  Biking
  Walking
}

type Activity {
  _id: ID!
  name: String
  category: Category  # Define categoryID field
  goal: Float!
  dailyAchievements: [DailyAchievement]!
  user: User!
}

type UpdateDailyAchievementResponse {
  message: String
  success: Boolean
}

type DailyAchievement {
  date: String
  value: Int
}

type Category {
  _id: ID!
  name: String
}

input CreateActivityInput {
  name: String
  categoryID: ID  # Define categoryID field
  goal: Float!
  userId: ID
}


type Query {
  users: [User]!
  user(userId: ID!): User
  Activity: [Activity]!
  activities: [Activity]!
  categories: [Category]!
  getActivityNames: [ActivityName]
  getCategoryName(categoryId: ID!): String
  me: User
  weeklyProgress(userId: ID!, activityId: ID!): Int
  activityByUserId(userId: ID!): Activity
  getDailyAchievements(userId: ID!, activityId: ID!, startDate: String!, endDate: String!): [DailyAchievement]
  activityIdByName(userId: ID!, name: String!): ID
  getTrackedActivitiesForCurrentWeek: [Activity]
  getUserWeeklyGoal(userId: ID!, activityId: ID!): Int
  getUserActivities(userId: ID!): User
  getActivity(id: ID!): Activity
  getCategoryForActivity(activityId: ID!): Category
}

type Mutation {
  users: [User]!
  user(userId: ID!): User
  me: User
  addUser(name: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  removeUser(userId: ID!): User
  updateDailyAchievement(
    date: String!
    value: Float!
    userId: ID!
    category: ID!
  ): UpdateDailyAchievementResponse
  setGoal(userId: ID!, activityId: ID!, goal: Float!): Activity
  createActivity(input: CreateActivityInput!): Activity
  deleteActivity(activityId: ID!): Activity
}

`;

module.exports = typeDefs;
