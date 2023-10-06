const { User, Activity, Category } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

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

    // updateDailyAchievement: async (parent, args, context) => {
    //   try {
    //     // Check if the user is authenticated (You may have a different authentication mechanism)
    //     console.log("const user = context.user;", context.user)
    //     if (!context.user) {
    //       throw AuthenticationError("User not authenticated");
    //     }
    
    //     // Extract relevant variables from the args
    //     const { categoryId, date, value } = args;
    
    //     // Find the category with the provided ID
    //     const category = await Category.findById(categoryId);
    
    //     if (!category) {
    //       throw Error("Category not found");
    //     }
    
    //     // Check if the user owns the category (assuming there's a user ID associated with the category)
    //     if (category.user.toString() !== context.user._id.toString()) {
    //       throw AuthenticationError(
    //         "You do not have permission to update achievements in this category"
    //       );
    //     }
    
    //     // Find or create the daily achievement for the specified date within the category
    //     const dailyAchievement = category.dailyAchievements.find(
    //       (achievement) => achievement.date.toISOString() === date
    //     );
    
    //     if (!dailyAchievement) {
    //       // If not found, create a new daily achievement
    //       category.dailyAchievements.push({
    //         date: new Date(date),
    //         value,
    //       });
    //     } else {
    //       // If found, update the existing daily achievement
    //       dailyAchievement.value = value;
    //     }
    
    //     // Save the updated category
    //     await category.save();
    
    //     return {
    //       success: true,
    //       message: "Daily achievement updated successfully",
    //     };
    //   } catch (error) {
    //     // Handle errors and return an appropriate response
    //     return {
    //       success: false,
    //       message: error.message, // You can customize the error message here
    //     };
    //   }
    // },
    updateDailyAchievement: async (parent, args, context) => {
      try {
        // Check if the user is authenticated in the context
        if (!context.user) {
          return {
            success: false,
            message: "User not authenticated",
          };
        }
    
        const { name, date, value } = args;
    
        // Find the activity with the provided name
        let activity = await Activity.findOne({ name: name });
    
        if (!activity) {
          // If the activity doesn't exist, create a new one
          activity = new Activity({
            name: name,
            goal: 0, // Set an initial goal if needed
            user: context.user.id, // Set the user ID from the context
          });
        }
    
        // Find or create the daily achievement for the specified date within the activity
        const dailyAchievement = activity.dailyAchievements.find(
          (achievement) => achievement.date.toISOString() === date
        );
    
        if (!dailyAchievement) {
          // If not found, create a new daily achievement
          activity.dailyAchievements.push({
            date: new Date(date),
            value,
          });
        } else {
          // If found, update the existing daily achievement
          dailyAchievement.value = value;
        }
    
        // Save the updated activity (which may be a new one)
        await activity.save();
    
        return {
          success: true,
          message: "Daily achievement updated successfully",
        };
      } catch (error) {
        // Handle errors and return an appropriate response
        return {
          success: false,
          message: error.message, // You can customize the error message here
        };
      }
    },
    
  },
};

module.exports = resolvers;
