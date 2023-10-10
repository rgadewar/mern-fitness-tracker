const mongoose = require('mongoose');

// Set up your database connection here
mongoose.connect('mongodb://127.0.0.1:27017/mern-fitness-tracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose; // Export the mongoose connection
