const mongoose = require('mongoose');
const Category = require('./models/Category'); // Import your Category model

// Define an array of sample categories
const sampleCategories = [
  { name: 'Biking' },
  { name: 'Running' },
  { name: 'Swimming' },
  { name: 'Walking' }
];

// Function to seed the database with sample categories
const seedCategories = async () => {
  try {
    // Connect to your MongoDB database
    await mongoose.connect('mongodb://localhost:27017/your-database-name', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Loop through the sample categories and create them in the database
    for (const categoryData of sampleCategories) {
      const category = new Category(categoryData);
      await category.save();
      console.log(`Category "${category.name}" created.`);
    }

    // Disconnect from the database after seeding
    mongoose.disconnect();
    console.log('Database seeding completed.');

  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

// Call the seedCategories function to start seeding
seedCategories();
