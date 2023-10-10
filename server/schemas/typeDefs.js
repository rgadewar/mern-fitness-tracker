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
    value: Int!
  }

  type Category {
    _id: ID!
    name: String!
  }

  type Query {
    users: [User]!
    user(userId: ID!): User
    activities: [Activity]!
    categories: [Category]!
    getCategoryName(categoryId: ID!): String
    me: User
    weeklyProgress(userId: ID!, name: String!): Int
    activityByUserId(userId: ID!): Activity
    getDailyAchievements(name: String!, startDate: String!, endDate: String!): [DailyAchievement]
    activityIdByName(name: String!): ID
    
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    removeUser(userId: ID!): User
    updateDailyAchievement(
      name: String!
      date: String!
      value: Float!
      userId: ID!
    ): UpdateDailyAchievementResponse
    setGoal(activityId: ID!, goal: Int!): Activity
  }
 
`;



module.exports = typeDefs;
