const mongoose = require('mongoose');
const Activity = require('../models/Activity');
const User = require('../models/User');
const Category = require('../models/Category');

const mongoURI = 'mongodb://localhost:27017/mern-fitness-tracker';

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Handle MongoDB connection errors
mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

// Handle MongoDB connection success
mongoose.connection.once('open', async () => {
  try {
    // Clear existing activity data (optional)
    await Activity.deleteMany();

    // Find a user to associate the activities with (replace 'your_user_id' with an actual user ID)
    const user = await User.findOne({ _id: '651d7c424e26bfb676af35c0' });

    if (!user) {
      console.error('User not found. Please provide a valid user ID.');
      mongoose.connection.close();
      return;
    }

    // Fetch available categories
    const categories = await Category.find();

    // Define sample activity data with the associated user and randomly assigned categories
    const sampleActivities = [
      {
        name: 'Activity 1',
        goal: 1000,
        user: user._id, // Associate the activity with the user
        category: categories[Math.floor(Math.random() * categories.length)]._id,
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
        category: categories[Math.floor(Math.random() * categories.length)]._id,
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

    console.log('Activities seeded successfully.');

    // Close the MongoDB connection
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding activities:', error);
    // Close the MongoDB connection in case of an error
    mongoose.connection.close();
  }
});
