const mongoose = require('mongoose');
const Bike = require('../models/bike'); // Adjust the import path based on your project structure

const bikesData = [
  {
    name: "Mountain Bike 1",
    rating: 4.9,
    price: 150,
    image: "2-Wheel-Bike-Comfort-Hybrid.png",
    details: {
      capacity: "1 Person",
      productInfo: "A rugged mountain bike for off-road adventures."
    }
  },
  {
    "id": 2,
    "name": "Road Bike 1",
    "rating": 4.8,
    "price": 250,
    "image": "2-Wheel-Bike-Roubaix-Road-Bike.png", // Updated image filename
    "details": {
      "capacity": "1 Person",
      "productInfo": "A high-speed road bike for enthusiasts."
    }
  },
  {
    id: 3,
    name: "City Bike 1",
    rating: 4.75,
    price: 300,
    image: "Electric-Bike.png", // Updated image filename
    "details": {
      "capacity": "1 Person",
      "productInfo": "A high-speed road bike for enthusiasts."
    }
  },
  {
    id: 4,
    name: "Electric Bike 1",
    rating: 4.9,
    price: 120,
    image: "Surrey-Single-Surrey-Green-1.png", // Updated image filename
    "details": {
      "capacity": "1 Person",
      "productInfo": "A high-speed road bike for enthusiasts."
    }
  },
  {
    id: 5,
    name: "Hybrid Bike 1",
    rating: 4.7,
    price: 140,
    image: "e-bike-w-child-seat-SB.png", // Updated image filename
    "details": {
      "capacity": "1 Person",
      "productInfo": "A high-speed road bike for enthusiasts."
    }
  },
  {
    id: 6,
    name: "Cruiser Bike 1",
    rating: 4.69,
    price: 96,
    image: "Surrey-Triple-Surrey-Red.png", // Updated image filename
    "details": {
      "capacity": "1 Person",
      "productInfo": "A high-speed road bike for enthusiasts."
    }
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect('mongodb://localhost:27017/tech-friends'); // Adjust the MongoDB connection URL
    // Clear existing data
    await Bike.deleteMany({});
    

    // Insert bike data into the database
    await Bike.insertMany(bikesData);PeriodicWave

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.disconnect();
  }
}

seedDatabase();
