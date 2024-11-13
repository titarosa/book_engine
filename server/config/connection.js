require('dotenv').config();  // Ensure environment variables are loaded

const mongoose = require('mongoose');

// Use the MONGODB_URI from the .env file (which has your MongoDB Atlas connection string)
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.log('MongoDB connection error: ', err);
});

module.exports = mongoose.connection;

