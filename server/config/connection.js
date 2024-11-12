require('dotenv').config();  // Ensure env variables are loaded
<<<<<<< HEAD

const mongoose = require('mongoose');

// Use the MONGODB_URI from the .env file if it's defined, else fallback to local connection (for development)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks', {
  useNewUrlParser: true,
  useUnifiedTopology: true
=======
const mongoose = require('mongoose');

// Connect to the MongoDB URI from .env, or fallback to a local connection for development (using 'booksearch21' locally)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/booksearch21', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
>>>>>>> f91b704 (Finxinf Monog URI)
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.log('MongoDB connection error: ', err);
});

module.exports = mongoose.connection;
