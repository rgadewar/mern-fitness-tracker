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
    name: String
    date: String
    value: Int
    category: String
    # other fields
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
    getDailyAchievements(userId: ID!, name: String!, startDate: String!, endDate: String!): [DailyAchievement]
    activityIdByName(userId: ID!, name: String!): ID
    getUserActivities(userId: ID!): [Activity]!
    
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
    setGoal(userId: ID!, activityId: ID!, goal: Int!): Activity
  }
 
`;



module.exports = typeDefs;
