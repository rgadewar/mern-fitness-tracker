const { User, Activity, Category } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
const { getWeeklyProgress } = require('../utils/weeklyProgress');


const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },

    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },

    activities: async () => {
      try {
        const activities = await Activity.find();
        return activities;
      } catch (error) {
        throw new Error("Failed to fetch activities");
      }
    },
    activityByUserId: async (_, { userId }) => {
      try {
        const activity = await Activity.findOne({ user: userId });
        if (activity) {
          return activity;
        } else {
          throw new Error('Activity not found');
        }
      } catch (error) {
        throw new Error(`Error fetching activity: ${error.message}`);
      }
    },

    categories: async () => {
      try {
        const categories = await Category.find();
        return categories;
      } catch (error) {
        throw new Error("Failed to fetch categories");
      }
    },

    getCategoryName: async (_, { categoryId }) => {
      try {
        const category = await Category.findById(categoryId);
        if (category) {
          return category.name;
        } else {
          throw new Error('Category not found');
        }
      } catch (error) {
        throw new Error('Error fetching category name');
      }
    },

    weeklyProgress: async (parent, args, context) => {
      // Ensure the user is authenticated (you can use your authentication middleware here)
      if (!context.user) {
        throw new AuthenticationError('User not authenticated');
      }

      try {
        const userId = args.userId;
        const activityName = args.name;

        // Call the getWeeklyProgress function to calculate the weekly progress
        const weeklyProgress = await getWeeklyProgress(userId, activityName);
        console.log("weeklyProgress", weeklyProgress)

        return weeklyProgress;
      } catch (error) {
        throw new Error('Error fetching weekly progress: ' + error.message);
      }
    },

    getDailyAchievements: async (parent, { name, startDate, endDate }) => {
      try {
        const activities = await Activity.find({ name }); // Find activities with the specified name
    
        if (!activities || activities.length === 0) {
          throw new Error('No activities found with the provided name');
        }
    
        const filteredAchievements = [];
        
        activities.forEach(activity => {
          const achievements = activity.dailyAchievements.filter(achievement => {
            const achievementDate = new Date(achievement.date);
            return achievementDate >= new Date(startDate) && achievementDate <= new Date(endDate);
          });
    
          // Convert Unix timestamps to "YYYY-MM-DD" format
          const formattedAchievements = achievements.map(achievement => ({
            date: new Date(achievement.date).toISOString().split('T')[0],
            value: achievement.value,
          }));
    
          filteredAchievements.push(...formattedAchievements);
        });
    
        return filteredAchievements;
      } catch (error) {
        console.error('Error fetching daily achievements:', error);
        throw new Error('Server error');
      }
    },
    
    
    activityIdByName: async (_, { name }) => {
      try {
        // Find the activity by its name and return its ID
        const activity = await Activity.findOne({ name });
        if (activity) {
          return activity._id;
        } else {
          throw new Error('Activity not found');
        }
      } catch (error) {
        throw new Error(`Error fetching activity ID by name: ${error.message}`);
      }
    },

    
  },

  Mutation: {
    addUser: async (parent, { name, email, password }) => {
      const user = await User.create({ name, email, password });
      const token = signToken(user);

      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError("User not found");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password");
      }

      const token = signToken(user);
      return { token, user };
    },

    removeUser: async (parent, { userId }) => {
      return User.findOneAndDelete({ _id: userId });
    },

    updateDailyAchievement: async (parent, args, context) => {
      console.log(context);
    
      if (!context.user) {
        throw new AuthenticationError('Not logged in');
      }
    
      try {
        const { name, date, value, _id } = args;
    
        if (!name) {
          return {
            success: false,
            message: 'Name is required',
          };
        }
    
        let activity = await Activity.findById(_id);
    
        if (!activity) {
          activity = await Activity.findOne({
            name,
            user: context.user._id,
          });
    
          if (!activity) {
            activity = new Activity({
              name: name,
              goal: 0,
              user: context.user._id,
            });
    
            console.log(`Created a new activity: ${activity.name} for user ID ${context.user._id}`);
          }
        }
    
        const existingAchievement = activity.dailyAchievements.find(
          (achievement) => achievement.date.toISOString() === date
        );
    
        if (!existingAchievement) {
          activity.dailyAchievements.push({
            date: new Date(date),
            value,
            name: name,
          });
    
          console.log('Created a new daily achievement:', date);
        } else {
          existingAchievement.value = value;
          console.log('Updated daily achievement:', date);
        }
    
        activity.user = context.user._id;
    
        const savedActivity = await activity.save();
    
        console.log('Activity saved successfully:', savedActivity);
    
        return {
          success: true,
          message: 'Daily achievement updated successfully',
        };
      } catch (error) {
        console.error('Error updating daily achievement:', error);
        return {
          success: false,
          message: 'Error updating daily achievement',
        };
      }
    },
    
    setGoal: async (_, { activityId, goal }) => {
      try {
        // Find the activity by its ID and update the "goal" field
        const updatedActivity = await Activity.findOneAndUpdate(
          { _id: activityId },
          { $set: { goal: goal } }, // Use an object to specify the field and its new value
          { new: true }
        );
    
        if (!updatedActivity) {
          throw new Error('Activity not found');
        }
    
        return updatedActivity;
      } catch (error) {
        throw new Error(`Error setting goal: ${error.message}`);
      }
    },
    


  },
};





module.exports = resolvers;