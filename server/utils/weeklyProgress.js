const Activity = require("../models/Activity"); // Import your Activity model

// Function to calculate the start and end dates of the current week
const getCurrentWeekDates = () => {
  const currentDate = new Date();
  const firstDayOfWeek = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() - currentDate.getDay()
  );
  const lastDayOfWeek = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() + (6 - currentDate.getDay())
  );
  return [firstDayOfWeek, lastDayOfWeek];
};

// Function to fetch and calculate weekly progress for a specific user's activity with a specific category
const getWeeklyProgress = async (userId, categoryName) => {
  try {
    const [startDate, endDate] = getCurrentWeekDates();
    // Find the user's activity for the current week with a specific category
    const activity = await Activity.findOne({
      user: userId,
      name: categoryName,
      dailyAchievements: {
        $elemMatch: {
          // 'categoryName': categoryName,
          date: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
    });
    // console.log("activity&&&&&&&&&&&", activity);
    if (activity) {
      // Filter and sum the progress values for the current week
      const weeklyProgress = activity.dailyAchievements
        .filter((achievement) => {
          const achievementDate = achievement.date;
          return achievementDate >= startDate && achievementDate <= endDate;
        })
        .reduce((total, achievement) => total + achievement.value, 0);

      return weeklyProgress;
    }

    // If no activity is found for the current week with the specified category, return 0 progress
    return 0;
  } catch (error) {
    console.error("Error fetching weekly progress:", error);
    throw error;
  }
};

module.exports = { getWeeklyProgress };
