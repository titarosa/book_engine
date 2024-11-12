const mongoose = require('mongoose');

// Use the MONGODB_URI from the .env file if it's defined, else fallback to local connection (for development)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks');

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.log('MongoDB connection error: ', err);
});

module.exports = mongoose.connection;
