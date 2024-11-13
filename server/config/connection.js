const mongoose = require('mongoose');

// Use the MongoDB URI from the environment variable, or fallback to a local connection if not set
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks', {
  ssl: true,  // Ensure SSL is enabled (required for MongoDB Atlas)
})
.then(() => {
  console.log('Successfully connected to MongoDB!');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

module.exports = mongoose.connection;
