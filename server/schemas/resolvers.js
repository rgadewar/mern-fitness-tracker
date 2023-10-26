const { User, Activity, Category } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
const { getWeeklyProgress } = require("../utils/weeklyProgress");
const { ActivityName } = require("./typeDefs");
const moment = require("moment");


const resolvers = {
  Query: {
    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("activities");
      }
      throw AuthenticationError;
    },

    getActivityNames: () => {
      // Return an array of possible enum values
      return Object.values(ActivityName);
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
          throw new Error("Activity not found");
        }
      } catch (error) {
        throw new Error(`Error fetching activity: ${error.message}`);
      }
    },

    getCategoryForActivity: async (_, { activityId }) => {
      try {
        // First, retrieve the activity based on the provided activityId
        const activity = await Activity.findById(activityId);
    
        if (!activity) {
          return null; // Handle the case where the activity is not found.
        }
    
        // Check if the activity has a category
        if (activity.category) {
          return activity.category;
        } else {
          return null; // Handle the case where the activity has no category.
        }
      } catch (error) {
        console.error('Error while fetching data:', error);
        return null; // Handle any errors during the data retrieval.
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
          throw new Error("Category not found");
        }
      } catch (error) {
        throw new Error("Error fetching category name");
      }
    },

    weeklyProgress: async (parent, args, context) => {
      // Ensure the user is authenticated (you can use your authentication middleware here)
      if (!context.user) {
        throw new AuthenticationError('User not authenticated');
      }
    
      try {
        const userId = args.userId;
        const activityId = args.activityId;
    
        // Call the getWeeklyProgress function to calculate the weekly progress
        const weeklyProgress = await getWeeklyProgress(userId, activityId);
        console.log("weeklyProgress", weeklyProgress);
    
        return weeklyProgress;
      } catch (error) {
        throw new Error("Error fetching weekly progress: " + error.message);
      }
    },
    
    getDailyAchievements: async (
      parent,
      { userId, activityId, startDate, endDate }
    ) => {
      try {
        const activity = await Activity.findOne({
          user: userId,
          _id: activityId,
        });
    
        if (!activity) {
          throw new Error("Activity not found");
        }
    
        const filteredAchievements = activity.dailyAchievements.filter(
          (achievement) => {
            const achievementDate = new Date(achievement.date);
            return (
              achievementDate >= new Date(startDate) &&
              achievementDate <= new Date(endDate)
            );
          }
        );
    
        // Convert Unix timestamps to "YYYY-MM-DD" format
        const formattedAchievements = filteredAchievements.map((achievement) => ({
          date: new Date(achievement.date).toISOString().split("T")[0],
          value: achievement.value,
        }));
    
        return formattedAchievements;
      } catch (error) {
        console.error("Error fetching daily achievements:", error);
        throw new Error("Server error");
      }
    },
    

    activityIdByName: async (_, { userId, name }) => {
      // Check if the user with the provided userId exists
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      const activity = await Activity.findOne({ name, user: userId });

      if (!activity) {
        throw new Error("Activity not found");
      }

      return activity._id;
    },

    getUserActivities: async (_, { userId }, context) => {
      try {
        if (!context.user) {
          throw new AuthenticationError("Not logged in");
        }
    
        const user = await User.findById(userId).populate({
          path: 'activities',
          populate: {
            path: 'category',
            model: 'Category',
          },
        });
    
        if (!user || !user.activities) {
          return null;
        }
    
        // Log user activities for debugging
        console.log('User Activities:', user.activities);
    
        return user;
      } catch (error) {
        throw new Error('Failed to get user activities: ' + error.message);
      }
    },
    
    

    getUserWeeklyGoal: async (_, { userId, activityId }, context) => {
      try {
        // Query the Activity table to find the activity by user ID and activity ID
        const activity = await Activity.findOne({ user: userId, _id: activityId });
    
        if (!activity) {
          throw new Error("Activity not found");
        }
    
        return activity.goal; // Assuming that the goal is the weekly goal
      } catch (error) {
        throw new Error("Failed to fetch user weekly goal: " + error.message);
      }
    },

    getTrackedActivitiesForCurrentWeek: async (_, { userId }, context) => {
      try {
        const currentDate = moment(); // Get the current date
        const startOfWeek = currentDate.startOf("week"); // Calculate the start of the current week
        const endOfWeek = currentDate.endOf("week"); // Calculate the end of the current week

        const activities = await Activity.find({
          user: userId,
          "dailyAchievements.date": {
            $gte: startOfWeek.toDate(),
            $lte: endOfWeek.toDate(),
          },
        });

        // Define a function to format daily achievements
        const formatAchievements = (achievements) => {
          return achievements.map((achievement) => ({
            date: achievement.date.toISOString().split("T")[0],
            value: achievement.value,
          }));
        };

        // Extract and format daily achievements from the activities
        const trackedAchievements = activities.flatMap((activity) =>
          formatAchievements(
            activity.dailyAchievements.filter((achievement) =>
              moment(achievement.date).isBetween(startOfWeek, endOfWeek)
            )
          )
        );

        return trackedAchievements;
      } catch (error) {
        console.error(
          "Error fetching tracked activities for the current week:",
          error
        );
        throw new Error("Server error");
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
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token, user };
    },

    removeUser: async (parent, { userId }) => {
      return User.findOneAndDelete({ _id: userId });
    },

    updateDailyAchievement: async (parent, args, context) => {
      console.log("args", args);
      if (!context.user) {
        throw new AuthenticationError('Not logged in');
      }
    
      try {
        const { date, value, _id, category } = args;
    
        if ( !date || value === undefined) {
          return {
            success: false,
            message: 'Invalid input data',
          };
        }
    
        let activity = _id
          ? await Activity.findById(_id)
          : await Activity.findOne({ user: context.user._id });
    
        if (!activity) {
          activity = new Activity({
           
            goal: 0, // You may want to set a default goal here.
            user: context.user._id,
          });
    
          console.log(
            `Created a new activity: for user ID ${context.user._id}`
          );
        }
    
        const existingAchievement = activity.dailyAchievements.find(
          (achievement) => achievement.date.toISOString() === date
        );
    
        if (!existingAchievement) {
          activity.dailyAchievements.push({
            date: new Date(date),
            value,
            
          });
    
          console.log('Created a new daily achievement:', date);
        } else {
          existingAchievement.value = value;
          console.log('Updated daily achievement:', date);
        }
    
        activity.category = category; // Set the category for the activity.
    
        const savedActivity = await activity.save();
    
        // Update the user's activities with the newly created or updated activity ID
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { activities: activity._id } }, // Use $addToSet to avoid duplicate entries
          { new: true }
        );
    
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
    
    setGoal: async (_, { userId, activityId, goal }) => {
      try {
        // First, find the user by their ID
        const user = await User.findById(userId);

        if (!user) {
          throw new Error("User not found");
        }

        // Then, find the activity by its ID
        const activity = await Activity.findById(activityId);

        if (!activity) {
          throw new Error("Activity not found");
        }

        // Update the activity's goal
        activity.goal = goal;

        // Save the updated activity
        await activity.save();

        return activity;
      } catch (error) {
        throw new Error(`Error setting goal: ${error.message}`);
      }
    },

    createActivity: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError("Not logged in");
      }
    console.log("args", args)
      try {
        const { name, categoryID, goal } = args.input;
        const userId = context.user._id;
    
        // Check if a category with the given ID exists
        const category = await Category.findById(categoryID);
    
        if (!category) {
          throw new Error("Category not found");
        }
    
        // Check if an activity with the given name, category, and user ID already exists
        let activity = await Activity.findOne({
          name,
          category: categoryID,
          user: userId,
        });
    
        if (activity) {
          // Activity with the same name, category, and user ID already exists; update its goal
          activity.goal = goal;
    
          // Save the updated activity to the database
          const updatedActivity = await activity.save();
    
          // Update the user's record to include the updated activity
          const updatedUser = await User.findByIdAndUpdate(
            { _id: userId },
            { $addToSet: { activities: activity._id } }, // Use $addToSet to avoid duplicates
            { new: true }
          );
    
          return updatedActivity;
        }
    
        // Create a new activity if it doesn't exist
        activity = new Activity({
          name,
          category: categoryID, // Category ID as a string
          goal,
          user: userId, // Set the user ID from the context
          dailyAchievements: [], // You can initialize with an empty array
        });
    
        // Save the new activity to the database
        const createdActivity = await activity.save();
    
        // Update the user's record to include the newly created activity
        const updatedUser = await User.findByIdAndUpdate(
          { _id: userId },
          { $addToSet: { activities: activity._id } }, // Use $addToSet to avoid duplicates
          { new: true }
        );
    
        // Include the category name in the response
        createdActivity.category = category;
    
        return createdActivity;
      } catch (error) {
        throw new Error("Failed to create/update the activity: " + error.message);
      }
    },
    
  
    deleteActivity: async (_, { activityId }, context) => {
      try {
        if (!context.user) {
          throw new AuthenticationError('Not logged in');
        }

        // Find the activity by its ID
        const activity = await Activity.findById(activityId);

        if (!activity) {
          throw new UserInputError('Activity not found');
        }

        // Ensure the logged-in user is the owner of the activity
        if (activity.user.toString() !== context.user._id.toString()) {
          throw new AuthenticationError('You are not the owner of this activity');
        }

        // Delete the activity
        await Activity.findByIdAndDelete(activityId);

        return activity;
      } catch (error) {
        throw new Error('Failed to delete activity: ' + error.message);
      }
    },
    
  },
};

module.exports = resolvers;
