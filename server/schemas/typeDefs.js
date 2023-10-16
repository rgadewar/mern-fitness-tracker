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
    name: ActivityName! # Use the ActivityName enum here
    goal: Float!
    dailyAchievements: [DailyAchievement]!
    user: User!
  }

  type UpdateDailyAchievementResponse {
    message: String
    success: Boolean
  }

  type DailyAchievement {
    name: ActivityName!
    date: String
    value: Int
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
    getActivityNames: [ActivityName]
    getCategoryName(categoryId: ID!): String
    me: User
    weeklyProgress(userId: ID!, name: String!): Int
    activityByUserId(userId: ID!): Activity
    getDailyAchievements(userId: ID!, name: String!, startDate: String!, endDate: String!): [DailyAchievement]
    activityIdByName(userId: ID!, name: String!): ID
    getUserActivities(userId: ID!): [Activity]!
  
    getUserWeeklyGoal(userId: ID!, name: ActivityName!): Int # Use the ActivityName enum here
    
    
  }

  type Mutation {
    users: [User]!
    user(userId: ID!): User
    me: User
    addUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    removeUser(userId: ID!): User
    updateDailyAchievement(
      name: ActivityName!
      date: String!
      value: Float!
      userId: ID!
    ): UpdateDailyAchievementResponse
    setGoal(userId: ID!, activityId: ID!, goal: Float!): Activity
    createActivity(name: ActivityName!, goal: Float!): Activity # Use the ActivityName enum here
  }
  
 
`;



module.exports = typeDefs;
