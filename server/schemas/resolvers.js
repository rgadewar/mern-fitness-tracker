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
        throw AuthenticationError;
      }

      try {
        const userId = args.userId;
        const activityName = args.name;

        // Call the getWeeklyProgress function to calculate the weekly progress
        const weeklyProgress = await getWeeklyProgress(userId, activityName);
        console.log("weeklyProgress", weeklyProgress);

        return weeklyProgress;
      } catch (error) {
        throw new Error("Error fetching weekly progress: " + error.message);
      }
    },

    getDailyAchievements: async (
      parent,
      { userId, name, startDate, endDate }
    ) => {
      try {
        const activities = await Activity.find({ user: userId, name });

        if (!activities || activities.length === 0) {
          throw new Error("No activities found with the provided name");
        }

        const filteredAchievements = [];

        activities.forEach((activity) => {
          const achievements = activity.dailyAchievements.filter(
            (achievement) => {
              const achievementDate = new Date(achievement.date);
              return (
                achievementDate >= new Date(startDate) &&
                achievementDate <= new Date(endDate)
              );
            }
          );

          // Convert Unix timestamps to "YYYY-MM-DD" format
          const formattedAchievements = achievements.map((achievement) => ({
            date: new Date(achievement.date).toISOString().split("T")[0],
            value: achievement.value,
          }));

          filteredAchievements.push(...formattedAchievements);
        });

        return filteredAchievements;
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

    getUserActivities: async (parent, args, context, info) => {
      try {
        const user = await User.findById(args.userId).populate("activities");
        if (!user) {
          throw new Error("User not found");
        }
        console.log("user.activities", user.activities);
        return user.activities;
      } catch (error) {
        throw new Error(`Error fetching user activities: ${error.message}`);
      }
    },

    getUserWeeklyGoal: async (_, { userId, name }, context) => {
      try {
        // Query the Activity table to find the activity by name and user ID
        const activity = await Activity.findOne({ user: userId, name });

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

            console.log(
              `Created a new activity: ${name} for user ID ${context.user._id}`
            );
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
    
      try {
        const { name, goal } = args.input;
        const userId = context.user._id;
    
        // Check if an activity with the given name already exists for the user
        let activity = await Activity.findOne({ name, user: userId });
    
        if (activity) {
          // Activity with the same name already exists; update its goal
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
          goal,
          user: userId,
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
    
        return createdActivity;
      } catch (error) {
        throw new Error("Failed to create/update the activity: " + error.message);
      }
    }
    
  },
};

module.exports = resolvers;
