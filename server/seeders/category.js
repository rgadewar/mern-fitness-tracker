const mongoose = require('mongoose');
const Activity = require('../models/Activity');
const User = require('../models/User');
const Category = require('../models/Category'); // Import the Category model

const mongoURI = 'mongodb://localhost:27017/mern-fitness-tracker';

async function seedDatabase() {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Clear existing data (optional)
    await Activity.deleteMany();
    
    // Find or create categories and associate activities with them
    const categories = await Category.findOrCreate(sampleCategories);
    
    // Find a user to associate the activities with (replace 'your_user_id' with an actual user ID)
    const user = await User.findOne({ _id: 'your_user_id' });

    if (!user) {
      console.error('User not found. Please provide a valid user ID.');
      return;
    }

    // Define sample activity data with the associated user and categories
    const sampleActivities = [
      {
        name: 'Activity 1',
        goal: 1000,
        user: user._id, // Associate the activity with the user
        categories: [categories[0]._id], // Associate with the first category
        dailyAchievements: [
          {
            date: new Date('2023-01-01'),
            value: 250,
          },
          {
            date: new Date('2023-01-02'),
            value: 300,
          },
        ],
      },
      {
        name: 'Activity 2',
        goal: 1500,
        user: user._id, // Associate the activity with the user
        categories: [categories[1]._id], // Associate with the second category
        dailyAchievements: [
          {
            date: new Date('2023-01-01'),
            value: 350,
          },
          {
            date: new Date('2023-01-02'),
            value: 400,
          },
        ],
      },
      // Add more sample activities as needed
    ];

    // Insert sample activities into the database
    await Activity.insertMany(sampleActivities);

    console.log('Database seeded successfully.');

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

seedDatabase();
